import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

async function getUserId(request: NextRequest) {
  const token = request.cookies.get("kd_session")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    return payload.sub || null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);

    if (!userId) {
      return NextResponse.json({ message: "Please sign in." }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(userId)
      .select("name phone addresses isActive")
      .lean();

    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: "Account not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        profile: {
          id: user._id.toString(),
          name: user.name,
          phone: user.phone,
          addresses: user.addresses.map((item) => ({
            _id: item._id.toString(),
            label: item.label,
            address: item.address,
            area: item.area,
            city: item.city,
            phone: item.phone,
          })),
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { message: "Could not load your profile." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserId(request);

    if (!userId) {
      return NextResponse.json({ message: "Please sign in." }, { status: 401 });
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone =
      typeof body.phone === "string" ? body.phone.replace(/[\s()-]/g, "") : "";

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { message: "Name must be between 2 and 80 characters." },
        { status: 400 },
      );
    }

    if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      return NextResponse.json(
        { message: "Enter a valid phone number." },
        { status: 400 },
      );
    }

    await connectDB();

    const duplicate = await User.findOne({
      phone,
      _id: { $ne: userId },
    })
      .select("_id")
      .lean();

    if (duplicate) {
      return NextResponse.json(
        { message: "That phone number is already registered." },
        { status: 409 },
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, phone } },
      { new: true, runValidators: true },
    ).select("name phone addresses isActive");

    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: "Account not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      profile: {
        id: user._id.toString(),
        name: user.name,
        phone: user.phone,
        addresses: user.addresses.map((item) => ({
          _id: item._id.toString(),
          label: item.label,
          address: item.address,
          area: item.area,
          city: item.city,
          phone: item.phone,
        })),
      },
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { message: "That phone number is already registered." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Could not update your profile." },
      { status: 500 },
    );
  }
}
