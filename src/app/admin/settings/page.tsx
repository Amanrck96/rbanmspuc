"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Settings,
  Palette,
  Globe,
  Phone,
  Mail,
  MapPin,
  Save,
  CheckCircle2,
  Loader2,
  Sparkles,
  Megaphone,
} from "lucide-react";

export default function ThemeSettingsPage() {
  const [settings, setSettings] = useState<any>({
    collegeName: "RBANM's Pre-University College",
    tagline: "Empowering Minds, Enriching Character Since 1883",
    founderName: "Dharmarathnakara Rai Bahadur Arcot Narrainswamy Mudaliar",
    establishedYear: "1883",
    address: "12, Annaswamy Mudaliar Road, Near Ulsoor Lake, Bengaluru, Karnataka 560042",
    phone: "+91 80 2551 2911 / +91 80 2554 4452",
    email: "principal@rbanmspuc.edu.in",
    admissionsEmail: "admissions@rbanmspuc.edu.in",
    primaryColor: "#1e3a8a",
    secondaryColor: "#b45309",
    accentColor: "#0284c7",
    logoUrl: "/images/rbanms-logo.svg",
    bannerActive: true,
    bannerText: "Admissions Open for 2025-2026 Academic Year | Apply Online Today!",
    bannerLink: "/admissions/apply",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8926946633633!2d77.6163339748414!3d12.978712987337326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1684c47f5bc7%3A0xbcf239b6b7123aa1!2sRBANM's%20Pre%20University%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    facebookUrl: "https://facebook.com/rbanmspuc",
    twitterUrl: "https://twitter.com/rbanmspuc",
    instagramUrl: "https://instagram.com/rbanmspuc",
    youtubeUrl: "https://youtube.com/@rbanmspuc",
    metaTitle: "RBANMS PU College Bengaluru | Leading Pre-University Education",
    metaDescription: "Welcome to RBANM's Pre-University College Bengaluru. Established in 1883.",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error("Failed to fetch settings:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update settings");
      }

      setMessage("Settings and theme skin updated! Website revalidated instantly.");
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const applyPalette = (primary: string, secondary: string, accent: string) => {
    setSettings({ ...settings, primaryColor: primary, secondaryColor: secondary, accentColor: accent });
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs text-slate-400">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Branding & Configurations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Site Skin & College Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Modifying theme colors, logos, banner alerts, or contact numbers changes the whole website instantly.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving Skin...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save & Update Skin
            </>
          )}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
            message.startsWith("Error")
              ? "bg-red-950/60 border border-red-800/80 text-red-300"
              : "bg-emerald-950/60 border border-emerald-800/80 text-emerald-300"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Dynamic Theme Skin & Colors */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Palette className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-white font-serif">
              Live Theme Skin & Color Palette
            </h2>
          </div>

          {/* Quick Palettes */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">Recommended Institutional Palettes:</span>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => applyPalette("#1e3a8a", "#b45309", "#0284c7")}
                className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-[#1e3a8a]" />
                <div className="w-3 h-3 rounded-full bg-[#b45309]" />
                <span>Royal Navy & Amber (Default)</span>
              </button>
              <button
                type="button"
                onClick={() => applyPalette("#881337", "#b45309", "#be123c")}
                className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-[#881337]" />
                <div className="w-3 h-3 rounded-full bg-[#b45309]" />
                <span>Imperial Crimson</span>
              </button>
              <button
                type="button"
                onClick={() => applyPalette("#064e3b", "#b45309", "#059669")}
                className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-[#064e3b]" />
                <div className="w-3 h-3 rounded-full bg-[#b45309]" />
                <span>Emerald Heritage</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Brand Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 font-mono text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Secondary / Heritage Accent
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 font-mono text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Highlight Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={settings.accentColor}
                  onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 font-mono text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Admissions Alert Banner */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-base text-white font-serif">
                Top Notice / Admission Alert Banner
              </h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200">
              <input
                type="checkbox"
                checked={settings.bannerActive}
                onChange={(e) => setSettings({ ...settings, bannerActive: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Announcement Text
              </label>
              <input
                type="text"
                value={settings.bannerText || ""}
                onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Call-to-Action Link
              </label>
              <input
                type="text"
                value={settings.bannerLink || ""}
                onChange={(e) => setSettings({ ...settings, bannerLink: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 3: College Identity & Information */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Globe className="w-5 h-5 text-blue-400" />
            <h2 className="font-bold text-base text-white font-serif">
              College Identity & Address
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official College Name
              </label>
              <input
                type="text"
                value={settings.collegeName || ""}
                onChange={(e) => setSettings({ ...settings, collegeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline || ""}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Campus Postal Address
              </label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Numbers</label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admissions Email
              </label>
              <input
                type="email"
                value={settings.admissionsEmail || ""}
                onChange={(e) => setSettings({ ...settings, admissionsEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 4: SEO Metadata */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="font-bold text-base text-white font-serif">
              Search Engine Optimization (SEO)
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Meta Title (Appears in Google search & browser tabs)
              </label>
              <input
                type="text"
                value={settings.metaTitle || ""}
                onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.metaDescription || ""}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Site Settings & Update Skin
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
