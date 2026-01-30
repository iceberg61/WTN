import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  console.log("[SUB STATUS] checking subscription from DB");

  await connectDB();

  const userId = await getUserFromToken();
  console.log("[SUB STATUS] userId:", userId);

  if (!userId) {
    console.log("[SUB STATUS] ❌ no auth");
    return NextResponse.json({ isSubscribed: false });
  }

  const user = await User.findById(userId).lean();
  console.log("[SUB STATUS] user:", user);

  if (!user || !user.subscription) {
    console.log("[SUB STATUS] ❌ no subscription field");
    return NextResponse.json({ isSubscribed: false });
  }

  const { status, expiresAt } = user.subscription;

  console.log("[SUB STATUS] status:", status);
  console.log("[SUB STATUS] expiresAt:", expiresAt);
  console.log("[SUB STATUS] now:", new Date());

  const isSubscribed =
    status === "active" &&
    expiresAt &&
    new Date(expiresAt) > new Date();

  console.log("[SUB STATUS] ✅ isSubscribed:", isSubscribed);

  return NextResponse.json({ isSubscribed });
}
