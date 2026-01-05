import Product from "@/models/Product";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

interface Params {
  params: { productId: string };
}

export async function GET(_: Request, { params }: Params) {
  await connectDB();

  const product = await Product.findById(params.productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
