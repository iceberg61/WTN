"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Stars = dynamic(() => import("../../components/Stars"), {
  ssr: false,
});

interface Material {
  _id: string;
  title: string;
  subject: string;
  level: string;
  type: string;
  isPremium: boolean;
  createdAt: string;
}

export default function AdminMaterialsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && user && user.role !== "admin") {
      router.replace("/");
    }
  }, [loading, user, router]);

  useEffect(() => {
    fetch("/api/admin/materials", { credentials: "include" })
      .then(res => res.json())
      .then(setMaterials)
      .finally(() => setFetching(false));
  }, []);

  if (loading || fetching) {
    return (
      <div className="relative min-h-screen bg-black text-gray-400 flex items-center justify-center overflow-hidden">
        <Stars />
        <div className="relative z-10">Loading materials…</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Stars />

      <div className="relative z-10 px-6 py-10">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">
          Materials
        </h1>

        <div className="space-y-4">
          {materials.map(m => (
            <div
              key={m._id}
              className="flex justify-between items-center bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >
              <div>
                <p className="font-semibold">{m.title}</p>
                <p className="text-sm text-gray-400">
                  {m.subject} • {m.level} • {m.type}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() =>
                    router.push(`/admin/materials/edit/${m._id}`)
                  }
                  className="text-yellow-400"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    setMaterials(x =>
                      x.filter(i => i._id !== m._id)
                    )
                  }
                  className="text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
