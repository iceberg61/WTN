import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  // 1️⃣ Get user ID from token (cookie)
  const userId = await getUserFromToken();

  if (!userId) {
    return NextResponse.json(
      { user: null },
      { status: 200 } // important: NOT 401
    );
  }

  // 2️⃣ Fetch user from DB
  const user = await User.findById(userId)
    .select("_id name email role subscription")
    .lean();

  if (!user) {
    return NextResponse.json(
      { user: null },
      { status: 200 }
    );
  }

  // 3️⃣ Return user
  return NextResponse.json({ user });
}
