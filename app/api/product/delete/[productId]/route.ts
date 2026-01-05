import Product from "@/models/Product";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

interface Params {
  params: { productId: string };
}

export async function DELETE(_: Request, { params }: Params) {
  await connectDB();

  await Product.findByIdAndDelete(params.productId);

  return NextResponse.json({ success: true });
}
