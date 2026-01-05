"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const Stars = dynamic(() => import("@/app/components/Stars"), { ssr: false });

export default function AdminUploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "Mathematics",
    level: "Beginner",
    type: "PDF",
    isPremium: false,
    driveUrl: "",
    quizUrl: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ✅ FIX: redirect must happen in an effect
  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      router.replace("/");
    }
  }, [loading, user, router]);

  // ⏳ Loading / unauthorized placeholder
  if (loading || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Checking admin access…
      </div>
    );
  }

  const submit = async () => {
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/materials", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to upload material");
      }

      setSuccess(true);
      setForm({
        title: "",
        description: "",
        subject: "Mathematics",
        level: "Beginner",
        type: "PDF",
        isPremium: false,
        driveUrl: "",
        quizUrl: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-16 overflow-hidden">
      <Stars />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          Upload New Material
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Title"
            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              className="bg-black border border-zinc-700 rounded-lg px-4 py-3"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            >
              <option>Mathematics</option>
              <option>English</option>
              <option>Biology</option>
              <option>Chemistry</option>
              <option>Physics</option>
            </select>

            <select
              className="bg-black border border-zinc-700 rounded-lg px-4 py-3"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="bg-black border border-zinc-700 rounded-lg px-4 py-3"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>PDF</option>
              <option>Video</option>
            </select>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.isPremium}
                onChange={(e) =>
                  setForm({ ...form, isPremium: e.target.checked })
                }
              />
              Premium material
            </label>
          </div>

          <input
            placeholder="Google Drive URL"
            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
            value={form.driveUrl}
            onChange={(e) => setForm({ ...form, driveUrl: e.target.value })}
          />

          <input
            placeholder="Quiz URL (optional)"
            className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3"
            value={form.quizUrl}
            onChange={(e) => setForm({ ...form, quizUrl: e.target.value })}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && (
            <p className="text-green-400 text-sm">
              Material uploaded successfully
            </p>
          )}

          <button
            onClick={submit}
            disabled={submitting}
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Uploading…" : "Upload Material"}
          </button>
        </div>
      </div>
    </div>
  );
}
