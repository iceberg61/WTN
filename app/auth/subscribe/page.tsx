"use client";

import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function SubscribePage() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="text-center mt-20 text-white">
        Please login first
      </p>
    );
  }

  const subscribe = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/subscribe", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setLoading(false);

    alert(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="w-full max-w-md border border-gold rounded-xl p-8 bg-black/60">
        <h1 className="text-2xl font-bold text-gold text-center mb-4">
          Subscription
        </h1>

        <p className="text-center mb-6">
          ₦30,000 / month
          <br />
          Access full library resources
        </p>

        <button
          onClick={subscribe}
          className="w-full bg-gold text-black py-3 rounded font-bold"
        >
          {loading ? "Processing..." : "Subscribe Now"}
        </button>
      </div>
    </div>
  );
}
