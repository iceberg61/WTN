console.log("FLW KEY:", process.env.FLW_SECRET_KEY);
console.log("APP URL:", process.env.NEXT_PUBLIC_APP_URL);

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    if (!email || !userId) {
      return NextResponse.json(
        { error: "Missing email or userId" },
        { status: 400 }
      );
    }

    const amount = 1000; // ₦1,000 fixed plan
    const tx_ref = `sub_${userId}_${Date.now()}`;

    const res = await fetch(
      "https://api.flutterwave.com/v3/payments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tx_ref,
          amount,
          currency: "NGN",
          redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
          customer: {
            email,
          },
          customizations: {
            title: "Premium Access",
            description: "One-time premium subscription",
          },
        }),
      }
    );

    const data = await res.json();

    if (!data?.data?.link) {
      return NextResponse.json(
        { error: "Failed to initialize payment" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      checkoutUrl: data.data.link,
    });
  } catch (err) {
    console.error("Payment init error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
