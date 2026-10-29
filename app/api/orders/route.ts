import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import OrderModel from "@/models/Order";

async function getUserId(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get("kd_session")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );

    if (typeof payload.userId !== "string") return null;

    return payload.userId;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);

    if (!userId) {
      return NextResponse.json(
        { message: "Please log in to view your orders." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    await connectDB();

    const user = await UserModel.findById(userId).select("_id isActive").lean();

    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: "Your account is unavailable." },
        { status: 403 },
      );
    }

    const orders = await OrderModel.find({ userId: user._id })
      .select(
        "orderNumber items total status paymentMethod paymentStatus createdAt",
      )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { orders },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("GET /api/orders error:", error);

    return NextResponse.json(
      { message: "Could not load your orders." },
      { status: 500 },
    );
  }
}
