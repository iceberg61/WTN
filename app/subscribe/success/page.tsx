"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txId = searchParams.get("transaction_id");

  useEffect(() => {
    const verifyAndRedirect = async () => {
      if (!txId) {
        console.log("[SUCCESS] ❌ no transaction_id");
        router.replace("/library");
        return;
      }

      console.log("[SUCCESS] verifying tx:", txId);

      await fetch(`/api/payments/verify?transaction_id=${txId}`, {
        cache: "no-store",
      });

      console.log("[SUCCESS] verification done, redirecting");

      router.replace("/library");
    };

    verifyAndRedirect();
  }, [txId, router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold">Payment successful 🎉</h1>
      <p>Finalizing your subscription…</p>
    </div>
  );
}
