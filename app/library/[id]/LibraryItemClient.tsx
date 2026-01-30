"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LibraryMaterial } from "../../types/library";
import { useSubscription } from "@/app/context/SubscriptionContext";

interface Props {
  material: LibraryMaterial | null;
  requiresSubscription?: boolean;
}

export default function LibraryItemClient({
  material,
  requiresSubscription,
}: Props) {
  const router = useRouter();
  const { isSubscribed, loading } = useSubscription();

  useEffect(() => {
    if (requiresSubscription && !loading && !isSubscribed) {
      // give time for subscription to sync after payment
      const timer = setTimeout(() => {
        router.push("/subscribe?expired=true");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [requiresSubscription, loading, isSubscribed, router]);

  // While checking subscription
  if (requiresSubscription) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">
          Checking subscription…
        </p>
      </div>
    );
  }

  // Safety fallback
  if (!material) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-400">Material unavailable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-3xl font-bold text-yellow-500">
        {material.title}
      </h1>

      <p className="mt-2 opacity-70">
        {material.subject} • {material.level}
      </p>

      <div className="mt-8 border border-yellow-500 rounded-xl p-6">
        <a
          href={material.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-500 underline"
        >
          Open Material
        </a>

        {material.quizUrl && (
          <div className="mt-4">
            <a
              href={material.quizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 underline"
            >
              Take Quiz
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
