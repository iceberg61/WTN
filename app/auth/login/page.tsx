"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Stars from "../../components/Stars";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Invalid login details");
      return;
    }

    login(data.user);
    window.location.href = "/";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-4">
      <Stars />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-yellow-400/40 bg-black/60 p-8 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-yellow-400 mb-2">
          Welcome back
        </h1>

        <p className="text-sm text-white/70 mb-6">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-4 rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none focus:border-yellow-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none focus:border-yellow-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end mb-4">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-yellow-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          onClick={submit}
          disabled={loading || !email || !password}
          className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
