"use client";

import { useState } from "react";
import axios from "axios";
import { Mail, Hash, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* STEP 1 */
  const handleRequestOtp = async () => {
    if (!email) return setMessage("Please enter your email");

    setLoading(true);
    setMessage("");

    try {
      await axios.post("/api/auth/forgot-password", { email });
      setStep(2);
      setMessage("OTP sent to your email");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* STEP 2 */
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      return setMessage("Enter a valid 6-digit OTP");
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("/api/auth/verify-otp", { email, otp });
      setStep(3);
      setMessage("OTP verified");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* STEP 3 ✅ FIXED */
  const handleResetPassword = async () => {
    if (password.length < 6) {
      return setMessage("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("/api/auth/reset-password", {
        email,
        otp,        // ✅ REQUIRED
        password,
      });

      setMessage("Password reset successful. Redirecting...");

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 p-6">
      <div className="bg-neutral-800 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {step === 3 ? "Set New Password" : "Forgot Password"}
        </h1>

        {message && (
          <p className="mb-4 text-center text-sm text-yellow-400">
            {message}
          </p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="flex items-center gap-2 bg-neutral-700 px-4 py-3 rounded-xl mb-6">
              <Mail size={20} />
              <input
                type="email"
                className="bg-transparent text-white outline-none w-full"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleRequestOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="flex items-center gap-2 bg-neutral-700 px-4 py-3 rounded-xl mb-6">
              <Hash size={20} />
              <input
                type="text"
                maxLength={6}
                className="bg-transparent text-white outline-none w-full text-center tracking-widest"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="flex items-center gap-2 bg-neutral-700 px-4 py-3 rounded-xl mb-4">
              <Lock size={20} />
              <input
                type="password"
                className="bg-transparent text-white outline-none w-full"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 bg-neutral-700 px-4 py-3 rounded-xl mb-6">
              <Lock size={20} />
              <input
                type="password"
                className="bg-transparent text-white outline-none w-full"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-xl"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
