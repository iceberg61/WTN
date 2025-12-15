"use client";

import { useState } from "react";
import Link from "next/link";
import Stars from "../../components/Stars";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setError("");
    setLoading(true);

    // backend later
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setSuccess("OTP sent to your email");
    }, 1200);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const resetPassword = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Password reset successfully");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-4">
      <Stars />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-yellow-400/40 bg-black/60 p-8 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-yellow-400 mb-2">
          Reset Password
        </h1>

        <p className="text-sm text-white/70 mb-6">
          Secure your account using one-time password verification
        </p>

        {/* STEP 1 – EMAIL */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email address"
              className="w-full mb-4 rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none focus:border-yellow-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 – OTP */}
        {step === 2 && (
          <>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className="w-full mb-4 text-center tracking-widest text-lg rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none focus:border-yellow-400"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 – NEW PASSWORD */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New password"
              className="w-full mb-3 rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none focus:border-yellow-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full mb-4 rounded-lg bg-black border border-yellow-400/30 px-4 py-3 outline-none focus:border-yellow-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-400 text-sm mt-4">{success}</p>}

        <div className="mt-6 text-center text-sm">
          <Link href="/auth/login" className="text-yellow-400 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
