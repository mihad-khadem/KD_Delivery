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

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone =
      typeof body.phone === "string" ? normalizePhone(body.phone.trim()) : "";
    const password = typeof body.password === "string" ? body.password : "";

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

    if (password.length < 8 || password.length > 72) {
      return NextResponse.json(
        { message: "Password must be 8–72 characters long." },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ phone }).lean();

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this phone number already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      phone,
      passwordHash,
      role: "customer",
      isActive: true,
    });

    const token = await new SignJWT({
      role: user.role,
      phone: user.phone,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user._id.toString())
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(getJwtSecret());

    const response = NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: user._id.toString(),
          name: user.name,
          phone: user.phone,
          role: user.role,
        },
      },
      { status: 201 },
    );

    response.cookies.set("kd_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { message: "An account with this phone number already exists." },
        { status: 409 },
      );
    }

    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Unable to create your account right now." },
      { status: 500 },
    );
  }
}
