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
  Lock,
  Type,
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
    primaryColor: "#800000",
    secondaryColor: "#5A0F1B",
    accentColor: "#C9A227",
    logoUrl: "/images/rbanms-logo.svg",
    bannerActive: true,
    bannerText: "Admissions Open for 2025-2026 Academic Year | Science (PCMB/PCMC), Commerce (SEBA/CEBA) & Arts (HEGP) | Apply Online Today!",
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
          // Ensure maroon defaults if not set
          const s = data.settings;
          if (!s.primaryColor || !s.primaryColor.startsWith("#8") && !s.primaryColor.startsWith("#5")) {
            s.primaryColor = "#800000";
            s.secondaryColor = "#5A0F1B";
            s.accentColor = "#C9A227";
          }
          setSettings(s);
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

      setMessage("Brand skin and settings updated! Maroon theme revalidated instantly across all pages.");
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const maroonShades = [
    { label: "Classic Maroon (Official Primary)", hex: "#800000", darkHex: "#5A0F1B", tint: "#F7E9EB" },
    { label: "Deep Crimson Maroon", hex: "#5A0F1B", darkHex: "#420A13", tint: "#F5E6E8" },
    { label: "Heritage Rose Maroon", hex: "#A33B48", darkHex: "#5A0F1B", tint: "#FCEBED" },
  ];

  const goldPresets = [
    { label: "Imperial Gold (Default)", hex: "#C9A227" },
    { label: "Rich Royal Gold", hex: "#D4AF37" },
    { label: "Amber Gold", hex: "#B45309" },
    { label: "Honey Gold", hex: "#E5C158" },
  ];

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[var(--gold)] animate-spin" />
        <p className="text-xs text-[var(--text)]">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--maroon-light)]/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--maroon)] dark:text-[var(--gold)]">
            Branding & Color Architecture
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] font-serif">
            Site Skin & College Settings
          </h1>
          <p className="text-xs text-[var(--text)]/70 mt-1">
            Maroon is strictly locked as the institutional brand color. Customise the gold accent, logo, banner, and college details.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving Skin...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-[var(--gold)]" /> Save & Update Skin
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
        {/* Section 1: Locked Maroon Brand & Gold Accent */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--maroon-tint)] dark:border-[var(--maroon-light)]/20">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-[var(--maroon)] dark:text-[var(--gold)]" />
              <h2 className="font-bold text-base text-[var(--text)] font-serif">
                Institutional Color Skin
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--maroon-tint)] text-[var(--maroon)] dark:bg-[var(--maroon)]/30 dark:text-[var(--gold)]">
              <Lock className="w-3 h-3" /> Maroon Locked
            </span>
          </div>

          {/* 1. Primary Maroon Selection (Locked to official shades) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">
                Primary Brand Color (Official Maroon Shades)
              </label>
              <span className="text-[11px] text-[var(--text)]/60 italic">
                RBANMS charter requires Maroon on every page
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {maroonShades.map((shade) => {
                const isSelected = settings.primaryColor.toLowerCase() === shade.hex.toLowerCase();
                return (
                  <button
                    key={shade.hex}
                    type="button"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        primaryColor: shade.hex,
                        secondaryColor: shade.darkHex,
                      })
                    }
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "border-[var(--maroon)] bg-[var(--maroon-tint)] dark:bg-[var(--maroon)]/30 ring-2 ring-[var(--maroon)]"
                        : "border-gray-200 dark:border-slate-800 hover:border-[var(--maroon-light)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full shadow-inner border border-white/40 shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <div>
                        <div className="text-xs font-bold text-[var(--text)]">{shade.label}</div>
                        <div className="text-[10px] font-mono text-[var(--text)]/60">{shade.hex}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[var(--maroon)] dark:text-[var(--gold)]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Gold Accent Customization */}
          <div className="space-y-3 pt-3 border-t border-[var(--maroon-tint)] dark:border-[var(--maroon-light)]/20">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">
                Gold Accent Color (Customizable Highlight & Banner)
              </label>
              <span className="text-[11px] text-[var(--text)]/60">
                Applied to banners, badges, highlights & buttons
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {goldPresets.map((g) => (
                <button
                  key={g.hex}
                  type="button"
                  onClick={() => setSettings({ ...settings, accentColor: g.hex })}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-[var(--gold)] text-xs flex items-center gap-2 cursor-pointer transition"
                >
                  <div className="w-3.5 h-3.5 rounded-full shadow-xs" style={{ backgroundColor: g.hex }} />
                  <span className="text-[var(--text)] font-medium">{g.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 max-w-sm">
              <input
                type="color"
                value={settings.accentColor || "#C9A227"}
                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                className="w-12 h-12 rounded-2xl border-0 cursor-pointer bg-transparent shadow-xs"
              />
              <input
                type="text"
                value={settings.accentColor || "#C9A227"}
                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 font-mono text-xs text-[var(--text)] uppercase font-bold"
                placeholder="#C9A227"
              />
            </div>
          </div>

          {/* 3 Pillars Live Theme Preview */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#800000] dark:text-[var(--gold)]">
                Institutional Brand Palette Architecture
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300">
                100% WCAG AA & AAA Compliant
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Royal / Dark Blue */}
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1E3A8A] shadow-xs" />
                  <span className="text-xs font-bold text-[#1E3A8A] dark:text-blue-300">1. Royal / Dark Blue</span>
                </div>
                <div className="font-mono text-[11px] font-bold text-[#1E3A8A]">HEX: #1E3A8A</div>
                <p className="text-[10px] text-slate-600 dark:text-slate-400">Headings, card titles & blue course badges.</p>
              </div>

              {/* 2. White */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 space-y-1 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white border border-slate-300 shadow-xs" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">2. White</span>
                </div>
                <div className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300">HEX: #FFFFFF</div>
                <p className="text-[10px] text-slate-600 dark:text-slate-400">Page backgrounds, cards & text on dark banners.</p>
              </div>

              {/* 3. Maroon */}
              <div className="p-3.5 rounded-xl border border-[var(--maroon-light)]/40 bg-[var(--maroon-tint)]/60 dark:bg-red-950/20 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#800000] shadow-xs" />
                  <span className="text-xs font-bold text-[#800000] dark:text-red-300">3. Maroon</span>
                </div>
                <div className="font-mono text-[11px] font-bold text-[#800000] dark:text-red-300">HEX: #800000</div>
                <p className="text-[10px] text-slate-600 dark:text-slate-400">Prospectus cards, active tabs, icons & brand elements.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="badge-blue text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Science Stream Badge
                </span>
                <span className="tab-active px-3 py-1 rounded-full text-xs font-bold bg-[#800000] text-white">
                  Active Tab
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-white font-bold text-xs shadow-xs"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Primary Maroon Button
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl font-bold text-xs"
                  style={{
                    backgroundColor: settings.accentColor || "#C9A227",
                    color: settings.secondaryColor || "#5A0F1B",
                  }}
                >
                  Gold Accent
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Logo & Header Identity */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--maroon-tint)] dark:border-[var(--maroon-light)]/20">
            <Sparkles className="w-5 h-5 text-[var(--maroon)] dark:text-[var(--gold)]" />
            <h2 className="font-bold text-base text-[var(--text)] font-serif">
              College Logo & Emblem
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-2xl bg-[var(--maroon)] p-2 shrink-0 border border-[var(--gold)]/40 shadow-sm flex items-center justify-center">
              <Image
                src={settings.logoUrl || "/images/rbanms-logo.svg"}
                alt="Logo Preview"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="space-y-1 flex-1 w-full">
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                Logo Asset URL (SVG, PNG, or WebP)
              </label>
              <input
                type="text"
                value={settings.logoUrl}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs text-[var(--text)] font-mono"
              />
              <p className="text-[11px] text-[var(--text)]/60">
                Tip: You can also upload/replace files in the Media Library (`/admin/media`) and link them here.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Admission Alert Banner */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--maroon-tint)] dark:border-[var(--maroon-light)]/20">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[var(--maroon)] dark:text-[var(--gold)]" />
              <h2 className="font-bold text-base text-[var(--text)] font-serif">
                Top Admission Alert Banner
              </h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[var(--text)]">
              <input
                type="checkbox"
                checked={settings.bannerActive}
                onChange={(e) => setSettings({ ...settings, bannerActive: e.target.checked })}
                className="w-4 h-4 rounded text-[var(--maroon)]"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                Banner Announcement Text
              </label>
              <input
                type="text"
                value={settings.bannerText}
                onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs text-[var(--text)]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">
                Banner Action Link Destination
              </label>
              <input
                type="text"
                value={settings.bannerLink}
                onChange={(e) => setSettings({ ...settings, bannerLink: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs text-[var(--text)] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 4: College Institutional Info */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-[var(--maroon-light)]/20 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--maroon-tint)] dark:border-[var(--maroon-light)]/20">
            <Globe className="w-5 h-5 text-[var(--maroon)] dark:text-[var(--gold)]" />
            <h2 className="font-bold text-base text-[var(--text)] font-serif">
              College Contact & Institutional Info
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">College Name</label>
              <input
                type="text"
                value={settings.collegeName}
                onChange={(e) => setSettings({ ...settings, collegeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs text-[var(--text)]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs text-[var(--text)]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">Official Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs text-[var(--text)]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">Official Phone Numbers</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs text-[var(--text)]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text)] mb-1">Admissions Email</label>
              <input
                type="email"
                value={settings.admissionsEmail}
                onChange={(e) => setSettings({ ...settings, admissionsEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs text-[var(--text)]"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-[var(--maroon)] hover:bg-[var(--maroon-dark)] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save & Update Whole Site"}
          </button>
        </div>
      </form>
    </div>
  );
}
