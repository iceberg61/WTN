import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";
import Material from "@/models/Material";

// ✅ GET — list materials (admin)
export async function GET() {
  await connectDB();

  const userId = await getUserFromToken();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(userId).lean();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const materials = await Material.find()
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(materials);
}

// ✅ POST — create material (admin)
export async function POST(req: Request) {
  await connectDB();

  const userId = await getUserFromToken();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(userId).lean();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const material = await Material.create({
    title: body.title,
    description: body.description,
    subject: body.subject,
    level: body.level,
    type: body.type,
    isPremium: body.isPremium,
    driveUrl: body.driveUrl,
    quizUrl: body.quizUrl,
  });

  return NextResponse.json(material, { status: 201 });
}
