"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import AdminSidebar from "./_components/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-4 px-4 py-3 border-b border-zinc-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-zinc-800"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-sm font-semibold text-white">
            Admin Panel
          </h1>
        </header>

        <main className="flex-1 px-6 py-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
