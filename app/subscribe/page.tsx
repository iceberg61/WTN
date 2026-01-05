"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSubscription } from "../context/SubscriptionContext";
import dynamic from "next/dynamic";

const Stars = dynamic(() => import("../components/Stars"), { ssr: false });

export default function SubscribePage() {
  const { isSubscribed, loading } = useSubscription();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Loading…</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      <Stars />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-yellow-500">Premium Access</h1>
          <p className="text-gray-400 mt-3">
            Get unlimited access to all learning materials
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
          {isSubscribed ? (
            <div className="text-center space-y-4">
              <p className="text-green-400 text-lg font-medium">
                You already have an active subscription ✅
              </p>
              <Link
                href="/library"
                className="inline-block bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg font-medium"
              >
                Go to Library →
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-500 w-5 h-5 mt-1" />
                  Full access to all premium PDFs and materials
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-500 w-5 h-5 mt-1" />
                  Downloadable study resources
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-500 w-5 h-5 mt-1" />
                  Exclusive premium-only content
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-500 w-5 h-5 mt-1" />
                  New materials added regularly
                </li>
              </ul>

              <div className="my-8 border-t border-zinc-800" />

              <div className="text-center space-y-2">
                <p className="text-gray-400 text-sm">Subscription</p>
                <p className="text-5xl font-bold">₦5,000</p>
                <p className="text-gray-500 text-sm">
                  One-time access (for now)
                </p>
              </div>

              <div className="mt-8">
                <button
                  disabled
                  className="w-full bg-yellow-500/20 text-yellow-500 cursor-not-allowed py-4 rounded-xl font-semibold"
                >
                  Payments coming soon
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  You’ll be able to subscribe directly on this page
                </p>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Secure access • Learn at your pace • Cancel anytime
        </p>
      </div>
    </div>
  );
}
