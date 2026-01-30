import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  console.log("[SUB STATUS] checking subscription from DB");

  await connectDB();

  const userId = await getUserFromToken();
  console.log("[SUB STATUS] userId:", userId);

  // 🔒 Not logged in
  if (!userId) {
    console.log("[SUB STATUS] ❌ no auth");
    return NextResponse.json({ status: "none" });
  }

  const user = await User.findById(userId).lean();
  console.log("[SUB STATUS] user:", user);

  if (!user || !user.subscription) {
    console.log("[SUB STATUS] ❌ no subscription object");
    return NextResponse.json({ status: "none" });
  }

  const subscription = user.subscription;
  const now = new Date();

  console.log("[SUB STATUS] raw status:", subscription.status);
  console.log("[SUB STATUS] expiresAt:", subscription.expiresAt);
  console.log("[SUB STATUS] now:", now);

  let finalStatus: "none" | "active" | "expired" = "none";

  if (subscription.status === "active") {
    if (subscription.expiresAt && new Date(subscription.expiresAt) > now) {
      finalStatus = "active";
    } else {
      finalStatus = "expired";
    }
  } else {
    finalStatus = "none";
  }

  console.log("[SUB STATUS] ✅ final status:", finalStatus);

  return NextResponse.json({ status: finalStatus });
}
