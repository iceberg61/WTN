"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Stars = dynamic(() => import("../../../../components/Stars"), {
  ssr: false,
});

interface Material {
  title: string;
  subject: string;
  level: string;
  type: "pdf" | "video" | "quiz";
  isPremium: boolean;
}

export default function EditMaterialPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Material | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/materials/${id}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(setForm)
      .catch(() => setError("Failed to load material"));
  }, [id]);

  if (!form) {
    return (
      <div className="relative min-h-screen bg-black text-gray-400 flex items-center justify-center overflow-hidden">
        <Stars />
        <div className="relative z-10">Loading material…</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Stars />

      <div className="relative z-10 px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          Edit Material
        </h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg"
          />

          <input
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg"
          />

          <input
            value={form.level}
            onChange={e => setForm({ ...form, level: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg"
          />

          <select
            value={form.type}
            onChange={e =>
              setForm({ ...form, type: e.target.value as Material['type'] })
            }
            className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-lg"
          >
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="quiz">Quiz</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isPremium}
              onChange={e =>
                setForm({ ...form, isPremium: e.target.checked })
              }
            />
            Premium material
          </label>

          <button
            onClick={async () => {
              setSaving(true);
              await fetch(`/api/admin/materials/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
              });
              router.push("/admin/materials");
            }}
            disabled={saving}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
