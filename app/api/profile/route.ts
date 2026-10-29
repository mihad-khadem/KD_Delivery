import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { Types } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

type AddressResponse = {
  _id: string;
  label: string;
  address: string;
  area: string;
  city: string;
  phone: string;
};

type ProfileResponse = {
  id: string;
  name: string;
  phone: string;
  addresses: AddressResponse[];
};

type ApiErrorResponse = {
  message: string;
};

type UpdateProfileBody = {
  name?: unknown;
  phone?: unknown;
};

type LeanAddress = {
  _id: Types.ObjectId;
  label: string;
  address: string;
  area: string;
  city: string;
  phone: string;
};

function toAddressResponse(item: LeanAddress): AddressResponse {
  return {
    _id: item._id.toString(),
    label: item.label,
    address: item.address,
    area: item.area,
    city: item.city,
    phone: item.phone,
  };
}

function errorResponse(message: string, status: number) {
  return NextResponse.json<ApiErrorResponse>({ message }, { status });
}

async function getUserId(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get("kd_session")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );

    // Supports the subject claim used by your existing profile API.
    const id = payload.sub;

    return typeof id === "string" && Types.ObjectId.isValid(id) ? id : null;
  } catch {
    return null;
  }
}

function toProfileResponse(user: {
  _id: Types.ObjectId;
  name: string;
  phone: string;
  addresses: LeanAddress[];
}): ProfileResponse {
  return {
    id: user._id.toString(),
    name: user.name,
    phone: user.phone,
    addresses: user.addresses.map(toAddressResponse),
  };
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);

    if (!userId) {
      return errorResponse("Please sign in.", 401);
    }

    await connectDB();

    const user = await User.findById(userId)
      .select("name phone addresses isActive")
      .lean();

    if (!user || !user.isActive) {
      return errorResponse("Account not found.", 404);
    }

    const profile = toProfileResponse({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      addresses: user.addresses.map((item: LeanAddress) => ({
        _id: item._id,
        label: item.label,
        address: item.address,
        area: item.area,
        city: item.city,
        phone: item.phone,
      })),
    });

    return NextResponse.json(
      { profile },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error: unknown) {
    console.error("GET /api/profile:", error);
    return errorResponse("Could not load your profile.", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserId(request);

    if (!userId) {
      return errorResponse("Please sign in.", 401);
    }

    let body: UpdateProfileBody;

    try {
      body = (await request.json()) as UpdateProfileBody;
    } catch {
      return errorResponse("Invalid JSON request body.", 400);
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone =
      typeof body.phone === "string" ? body.phone.replace(/[\s()-]/g, "") : "";

    if (name.length < 2 || name.length > 80) {
      return errorResponse("Name must be between 2 and 80 characters.", 400);
    }

    if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      return errorResponse("Enter a valid phone number.", 400);
    }

    await connectDB();

    const duplicate = await User.findOne({
      phone,
      _id: { $ne: userId },
    })
      .select("_id")
      .lean();

    if (duplicate) {
      return errorResponse("That phone number is already registered.", 409);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, phone } },
      { new: true, runValidators: true },
    ).select("name phone addresses isActive");

    if (!user || !user.isActive) {
      return errorResponse("Account not found.", 404);
    }

    const profile = toProfileResponse({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      addresses: user.addresses.map((item: LeanAddress) => ({
        _id: item._id,
        label: item.label,
        address: item.address,
        area: item.area,
        city: item.city,
        phone: item.phone,
      })),
    });

    return NextResponse.json(
      { profile },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return errorResponse("That phone number is already registered.", 409);
    }

    console.error("PATCH /api/profile:", error);
    return errorResponse("Could not update your profile.", 500);
  }
}
