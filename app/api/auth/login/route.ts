import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters.");
  }

  return new TextEncoder().encode(secret);
}

function normalizePhone(phone: string) {
  return phone.replace(/[\s()-]/g, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const phone =
      typeof body.phone === "string" ? normalizePhone(body.phone.trim()) : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!/^\+?[0-9]{10,15}$/.test(phone) || !password) {
      return NextResponse.json(
        { message: "Enter your phone number and password." },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ phone }).select("+passwordHash");

    // Use the same message for an unknown phone and a wrong password.
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json(
        { message: "Incorrect phone number or password." },
        { status: 401 },
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: "This account is currently disabled." },
        { status: 403 },
      );
    }

    const token = await new SignJWT({
      role: user.role,
      phone: user.phone,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user._id.toString())
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(getJwtSecret());

    const response = NextResponse.json({
      message: "Login successful.",
      user: {
        id: user._id.toString(),
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });

    response.cookies.set("kd_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Unable to log in right now. Please try again." },
      { status: 500 },
    );
  }
}
