"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Sparkles, Mail, Lock, AlertCircle, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/admin");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (
        code === "auth/invalid-credential" ||
        code === "auth/user-not-found" ||
        code === "auth/wrong-password"
      ) {
        setError("Invalid email or password. Please try again.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Login failed. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "w-full h-[50px] px-4 pl-11 rounded-[14px] border text-[#2B1D14] text-sm bg-[#FAFAFA] placeholder:text-[#c4b5a8] outline-none transition-all duration-200 border-[#E8D8C8] focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/10 focus:bg-white";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FDF3E8] to-[#F3E2D0] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[400px]">

        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(43,29,20,0.12)] border border-[#E8D8C8] p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#8B5E3C] flex items-center justify-center shadow-soft mb-4">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#2B1D14]">Admin Portal</h1>
            <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#8B5E3C] bg-[#FFE3D3] px-3 py-1 rounded-full">
              <Lock className="w-3 h-3" />
              Owner Access Only
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 bg-[#FDE8E8] border border-[#f5bcbc] text-[#B42318] rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} noValidate className="space-y-4">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2B1D14] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B5E3C]" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="owner@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={inputBase}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2B1D14] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B5E3C]" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className={inputBase}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B5E3C] hover:bg-[#70492E] disabled:opacity-60 text-white font-semibold py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,94,60,0.35)] flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#7A6A5D] mt-6">
          This page is restricted to the business owner only.
        </p>
      </div>
    </main>
  );
}
