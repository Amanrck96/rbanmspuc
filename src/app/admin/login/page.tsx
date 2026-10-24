"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Shield, Lock, Mail, Loader2, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6 relative overflow-hidden">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-gray-200 p-8 shadow-xl space-y-6 text-black">
        {/* Emblem & Title */}
        <div className="text-center space-y-2">
          <div className="relative w-28 h-16 mx-auto mb-3 bg-white rounded-2xl p-1.5 border border-gray-200 shadow-xs overflow-hidden">
            <Image
              src="/images/rbanms-logo.png"
              alt="RBANMS Logo"
              fill
              className="object-contain p-1 grayscale"
              priority
            />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-black text-[10px] font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-black" /> Staff & Admin CRM Portal
          </span>
          <h1 className="text-2xl font-extrabold text-black font-serif tracking-tight">
            RBANMS PU College
          </h1>
          <p className="text-xs text-gray-700">
            Secure administrative control panel & admissions CRM
          </p>
        </div>

        {error && (
          <div data-testid="login-error" className="p-3.5 rounded-2xl bg-gray-100 border border-black text-black text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Email or Username
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-black absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rbanmspuc.edu.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 text-xs sm:text-sm focus:ring-2 focus:ring-black focus:border-black focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-black absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 text-xs sm:text-sm focus:ring-2 focus:ring-black focus:border-black focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-wider shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border-2 border-black"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" /> Authenticating...
              </>
            ) : (
              <>
                <span>Sign In to Admin CRM</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-700 text-[11px] text-center">
          <span>Authorized personnel only. Access is monitored and logged in the system audit trail.</span>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-black hover:underline transition">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
