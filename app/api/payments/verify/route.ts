import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const txId = searchParams.get("transaction_id");

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

  if (
    data.status !== "success" ||
    data.data.status !== "successful" ||
    data.data.amount !== 1000
  ) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const email = data.data.customer.email;

  await connectDB();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await User.findOneAndUpdate(
    { email },
    {
      subscription: true,
      subscriptionExpiresAt: expiresAt,
    }
  );

  return NextResponse.json({ success: true });
}
