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
  console.log("[LIB] material id:", id);

  // 1️⃣ Auth
  const userId = await getUserFromToken();
  console.log("[LIB] userId:", userId);

  if (!userId) {
    console.log("[LIB] ❌ unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ User
  const user = await User.findById(userId).lean();
  console.log("[LIB] user from DB:", user);

  if (!user) {
    console.log("[LIB] ❌ invalid user");
    return NextResponse.json({ message: "Invalid user" }, { status: 401 });
  }

  // 3️⃣ Material
  const material = await Material.findById(id).lean();
  console.log("[LIB] material:", material);

  if (!material) {
    console.log("[LIB] ❌ material not found");
    return NextResponse.json(
      { message: "Material not found" },
      { status: 404 }
    );
  }

  // 4️⃣ Premium check
  if (material.isPremium) {
    const sub = user.subscription;

    console.log("[LIB] premium material");
    console.log("[LIB] subscription:", sub);

    if (!sub) {
      console.log("[LIB] ❌ BLOCK: no subscription");
      return NextResponse.json(
        { message: "Subscription required" },
        { status: 403 }
      );
    }

    console.log("[LIB] sub.status:", sub.status);
    console.log("[LIB] sub.expiresAt:", sub.expiresAt);
    console.log("[LIB] now:", new Date());
    console.log(
      "[LIB] expired:",
      new Date(sub.expiresAt) <= new Date()
    );

    if (
      sub.status !== "active" ||
      !sub.expiresAt ||
      new Date(sub.expiresAt) <= new Date()
    ) {
      console.log("[LIB] ❌ BLOCK: subscription expired/invalid");
      return NextResponse.json(
        { message: "Subscription expired" },
        { status: 403 }
      );
    }

    console.log("[LIB] ✅ subscription valid");
  }

  console.log("[LIB] ✅ access granted");
  return NextResponse.json(material);
}
