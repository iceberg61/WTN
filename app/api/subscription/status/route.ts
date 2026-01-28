import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const userId = await getUserFromToken();

  if (!userId) {
    return NextResponse.json({ isSubscribed: false });
  }

  const user = await User.findById(userId).lean();

  if (!user || !user.subscription) {
    return NextResponse.json({ isSubscribed: false });
  }

  const { status, expiresAt } = user.subscription;

  const now = new Date();
  const expired = new Date(expiresAt) <= now;

  if (status !== "active" || expired) {
    return NextResponse.json({ isSubscribed: false });
  }

  return NextResponse.json({
    isSubscribed: true,
    expiresAt,
  });
}
