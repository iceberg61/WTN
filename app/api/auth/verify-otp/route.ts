// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { email, otp } = await req.json();

  const user = await User.findOne({
    email,
    resetOtp: otp,                    // plain text
    resetOtpExpires: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  // ✅ Clear OTP after successful verification (prevents reuse)
  user.resetOtp = undefined;
  user.resetOtpExpires = undefined;
  await user.save();

  return NextResponse.json({ message: "OTP verified" });
}