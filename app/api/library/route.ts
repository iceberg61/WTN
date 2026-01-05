import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Material from "@/models/Material";

export async function GET() {
  await connectDB();

  const materials = await Material.find().lean();

  return NextResponse.json(materials);
}
