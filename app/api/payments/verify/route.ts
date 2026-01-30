import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const txId = searchParams.get("transaction_id");

  console.log("[VERIFY] txId:", txId);

  if (!txId) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const res = await fetch(
    `https://api.flutterwave.com/v3/transactions/${txId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      },
    }
  );

  const data = await res.json();
  console.log("[VERIFY] flutterwave response:", data);

  if (
    data.status !== "success" ||
    data.data.status !== "successful" ||
    data.data.amount !== 1000
  ) {
    console.log("[VERIFY] ❌ verification failed");
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // ✅ extract YOUR userId from tx_ref
  const txRef: string = data.data.tx_ref;
  const userId = txRef.split("_")[1];

  console.log("[VERIFY] extracted userId:", userId);

  await connectDB();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      subscription: {
        status: "active",
        expiresAt,
      },
    },
    { new: true }
  );

  console.log("[VERIFY] updated user:", updatedUser);

  if (!updatedUser) {
    console.log("[VERIFY] ❌ user not found");
    return NextResponse.json({ success: false }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}




