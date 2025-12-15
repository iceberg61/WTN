"use client";

import Link from "next/link";
import { useState } from "react";
import Stars from "../../components/Stars";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordValid =
    form.password.length >= 8 &&
    /[A-Za-z]/.test(form.password) &&
    /\d/.test(form.password);

  const submit = async () => {
    if (!passwordValid) return;

    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Failed to create account");
      return;
    }

    window.location.href = "/auth/login";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-4">
      <Stars />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-yellow-400/40 bg-black/60 p-8 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-yellow-400 mb-2">
          Create account
        </h1>

        <p className="text-sm text-white/70 mb-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>

        {/* Name */}
        <input
          placeholder="Full name"
          className="w-full mb-4 rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none focus:border-yellow-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-4 rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none focus:border-yellow-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className={`w-full mb-2 rounded-lg bg-black px-4 py-3 outline-none border ${
            form.password && !passwordValid
              ? "border-red-400"
              : "border-yellow-400/30 focus:border-yellow-400"
          }`}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Password rules */}
        <ul className="text-xs mb-4 space-y-1">
          <li className={form.password.length >= 8 ? "text-green-400" : "text-white/60"}>
            • At least 8 characters
          </li>
          <li className={/[A-Za-z]/.test(form.password) ? "text-green-400" : "text-white/60"}>
            • Contains a letter
          </li>
          <li className={/\d/.test(form.password) ? "text-green-400" : "text-white/60"}>
            • Contains a number
          </li>
        </ul>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          onClick={submit}
          disabled={loading || !passwordValid}
          className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}
