import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "Order submission is not configured yet. Connect MongoDB before placing orders.",
    },
    { status: 501 },
  );
}
