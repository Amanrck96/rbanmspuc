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
    <div className="min-h-screen flex items-center justify-center bg-[var(--maroon-dark)] p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--maroon)]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#2A1216]/95 backdrop-blur-xl rounded-3xl border border-[var(--gold)]/30 p-8 shadow-2xl space-y-6 text-white">
        {/* Emblem & Title */}
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 mx-auto mb-3 bg-white/10 rounded-full p-2 border border-[var(--gold)]/40">
            <Image
              src="/images/rbanms-logo.svg"
              alt="RBANMS Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--maroon)] border border-[var(--gold)]/30 text-[var(--gold)] text-[10px] font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-[var(--gold)]" /> Staff & Admin CRM Portal
          </span>
          <h1 className="text-2xl font-extrabold text-white font-serif tracking-tight">
            RBANMS PU College
          </h1>
          <p className="text-xs text-white/80">
            Secure administrative control panel & admissions CRM
          </p>
        </div>

        {error && (
          <div data-testid="login-error" className="p-3.5 rounded-2xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/90 mb-1">
              Email or Username
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-[var(--gold)] absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rbanmspuc.edu.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-[var(--maroon-light)]/40 text-white placeholder-white/40 text-xs sm:text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:border-[var(--gold)] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/90 mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-[var(--gold)] absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/40 border border-[var(--maroon-light)]/40 text-white placeholder-white/40 text-xs sm:text-sm focus:ring-2 focus:ring-[var(--maroon)] focus:border-[var(--gold)] focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-light)] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[var(--gold)]/40"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[var(--gold)]" /> Authenticating...
              </>
            ) : (
              <>
                <span>Sign In to Admin CRM</span>
                <ArrowRight className="w-4 h-4 text-[var(--gold)]" />
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="p-3.5 rounded-2xl bg-black/20 border border-white/10 text-white/70 text-[11px] text-center">
          <span>Authorized personnel only. Access is monitored and logged in the system audit trail.</span>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-white/70 hover:text-[var(--gold)] transition">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
