// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password required" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    // Don't reveal if email exists
    return NextResponse.json(
      { message: "Password reset failed" },
      { status: 400 }
    );
  }

  user.password = await bcrypt.hash(password, 10);
  // OTP fields already cleared in verify step

  await user.save();

  return NextResponse.json({ message: "Password reset successful" });
}