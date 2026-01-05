"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Stars = dynamic(() => import("../components/Stars"), {
  ssr: false,
});

interface Stats {
  total: number;
  premium: number;
  free: number;
  recent: number;
}

interface Material {
  _id: string;
  title: string;
  isPremium: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/dashboard", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecent(data.recent);
      }

      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black text-gray-400 flex items-center justify-center overflow-hidden">
        <Stars />
        <div className="relative z-10">Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Stars />

      <div className="relative z-10 px-6 py-10 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-zinc-400">
            Overview of your learning materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Total Materials" value={stats?.total} />
          <StatCard label="Premium" value={stats?.premium} />
          <StatCard label="Free" value={stats?.free} />
          <StatCard label="Added (7 days)" value={stats?.recent} />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Materials</h2>

          {recent.length === 0 ? (
            <p className="text-gray-400 text-sm">No recent uploads</p>
          ) : (
            <div className="space-y-3">
              {recent.map(m => (
                <div
                  key={m._id}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{m.title}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      m.isPremium
                        ? "bg-yellow-400 text-black"
                        : "bg-zinc-800 text-gray-300"
                    }`}
                  >
                    {m.isPremium ? "Premium" : "Free"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => router.push("/admin/materials")}
          className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-semibold"
        >
          View Materials
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value?: number }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <p className="text-sm text-zinc-400 mb-2">{label}</p>
      <p className="text-3xl font-bold text-yellow-400">
        {value ?? 0}
      </p>
    </div>
  );
}
