import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";
import Material from "@/models/Material";

type Context = {
  params: Promise<{ id: string }>;
};

// 🔐 Shared admin guard
async function requireAdmin() {
  const userId = await getUserFromToken();
  if (!userId) return null;

  const user = await User.findById(userId).lean();
  if (!user || user.role !== "admin") return null;

  return user;
}

// 📄 GET single material (edit page)
export async function GET(_: Request, context: Context) {
  await connectDB();

  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ✅ FIX

  const material = await Material.findById(id).lean();
  if (!material) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(material);
}

// ✏️ UPDATE material
export async function PUT(req: Request, context: Context) {
  await connectDB();

  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ✅ FIX
  const body = await req.json();

  const updated = await Material.findByIdAndUpdate(
    id,
    {
      title: body.title,
      description: body.description,
      subject: body.subject,
      level: body.level,
      type: body.type,
      isPremium: body.isPremium,
      driveUrl: body.driveUrl,
      quizUrl: body.quizUrl,
    },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// 🗑 DELETE material
export async function DELETE(_: Request, context: Context) {
  await connectDB();

  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ✅ FIX

  const deleted = await Material.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
