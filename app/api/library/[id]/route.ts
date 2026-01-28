import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";
import Material from "@/models/Material";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const userId = await getUserFromToken();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(userId).lean();
  if (!user) {
    return NextResponse.json({ message: "Invalid user" }, { status: 401 });
  }

  const material = await Material.findById(id).lean();
  if (!material) {
    return NextResponse.json(
      { message: "Material not found" },
      { status: 404 }
    );
  }

  // 🔒 Premium gate
  if (material.isPremium) {
    const sub = user.subscription;

    if (!sub) {
      return NextResponse.json(
        { message: "Subscription required" },
        { status: 403 }
      );
    }

    const now = new Date();
    const expiresAt = new Date(sub.expiresAt);

    if (sub.status !== "active" || expiresAt <= now) {
      return NextResponse.json(
        { message: "Subscription expired" },
        { status: 403 }
      );
    }
  }

  return NextResponse.json(material);
}
