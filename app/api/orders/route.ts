import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
// Order route
async function getUserId(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get("kd_session")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );

    return typeof payload.userId === "string" ? payload.userId : null;
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
        { status: 401 },
      );
    }

    await connectDB();

    const user = await User.findById(userId).select("_id isActive").lean();

    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: "Your account is unavailable." },
        { status: 403 },
      );
    }

    const orders = await Order.find({ customer: user._id })
      .select(
        "orderNumber items orderType deliveryAddress deliveryArea paymentMethod paymentStatus orderStatus subtotal deliveryFee discount total createdAt",
      )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { orders },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("GET /api/orders:", error);

    return NextResponse.json(
      { message: "Failed to load your orders." },
      { status: 500 },
    );
  }
}
