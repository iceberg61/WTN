"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const sync = async () => {
      await refreshUser(); // 🔥 THIS IS THE KEY
      router.replace("/library");
    };

    sync();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400">Activating subscription…</p>
    </div>
  );
}
