import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";
import Material from "@/models/Material";

export async function GET() {
  try {
    await connectDB();

    // 🔐 AUTH
    const userId = await getUserFromToken();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).lean();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // 📊 STATS
    const total = await Material.countDocuments();
    const premium = await Material.countDocuments({ isPremium: true });
    const free = await Material.countDocuments({ isPremium: false });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentCount = await Material.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // 🕒 RECENT MATERIALS
    const recent = await Material.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title isPremium createdAt")
      .lean();

    return NextResponse.json({
      stats: {
        total,
        premium,
        free,
        recent: recentCount,
      },
      recent,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
