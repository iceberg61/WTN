import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";import SellerProfile from "@/models/SellerProfile";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const token = await verifyToken(req);

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { storeName, bio } = await req.json();

    const exists = await SellerProfile.findOne({ userId: token.id });

    if (exists) {
      return NextResponse.json(
        { message: "You already have a seller account" },
        { status: 400 }
      );
    }

    const seller = await SellerProfile.create({
      userId: token.id,
      storeName,
      bio,
    });

    return NextResponse.json(
      { message: "Seller account created", seller },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
