"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect AFTER auth is resolved
    if (!loading && user === null) {
      router.replace("/");
    }

    if (!loading && user && user.role !== "admin") {
      router.replace("/");
    }
  }, [loading, user, router]);

  // 🔄 Auth still resolving
  if (loading || user === undefined) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Loading admin panel…
      </div>
    );
  }

  // ❌ Not allowed
  if (!user || user.role !== "admin") {
    return null;
  }

  // ✅ Admin confirmed
  return (
    <div className="min-h-screen flex bg-black text-white">
      <AdminSidebar />
      <main className="flex-1 px-8 py-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
