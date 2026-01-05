"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import dynamic from "next/dynamic";

const Stars = dynamic(() => import("../../components/Stars"), {
  ssr: false,
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // 🔑 important for cookies
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Invalid login details");
      return;
    }

    // ✅ Cookie is now set → AuthProvider will pick it up
    window.location.href = "/admin"; // or "/"
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

        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-4 rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-2">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-3 text-yellow-400"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

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
          className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
