import Product from "@/models/Product";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const products = await Product.find().sort({ createdAt: -1 });

  return NextResponse.json(products);
}
