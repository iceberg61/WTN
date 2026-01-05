import Product from "@/models/Product";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

interface Params {
  params: { category: string };
}

export async function GET(_: Request, { params }: Params) {
  await connectDB();

  const products = await Product.find({ category: params.category });

  return NextResponse.json(products);
}
