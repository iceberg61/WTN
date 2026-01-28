"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verify = async () => {
      const txId = searchParams.get("transaction_id");

      if (!txId) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch(`/api/payments/verify?transaction_id=${txId}`);
        const data = await res.json();

        if (data.success) {
          await refreshUser();
          setStatus("success");

          setTimeout(() => {
            router.push("/library");
          }, 2000);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, [searchParams, router, refreshUser]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {status === "loading" && <p className="text-gray-400">Verifying payment…</p>}
      {status === "success" && (
        <p className="text-green-400 text-lg">
          Payment successful 🎉 Redirecting…
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-lg">
          Payment verification failed ❌
        </p>
      )}
    </div>
  );
}
