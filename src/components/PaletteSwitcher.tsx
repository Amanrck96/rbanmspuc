"use client";

import { useState, useEffect } from "react";
import { Paintbrush, Moon, Sun, Check } from "lucide-react";
import { colorPalettes } from "@/config/theme.config";

export default function PaletteSwitcher() {
  const [selectedId, setSelectedId] = useState("default");
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selected_theme_palette");
    if (saved && colorPalettes[saved]) {
      setSelectedId(saved);
    }
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const changePalette = (id: string) => {
    setSelectedId(id);
    localStorage.setItem("selected_theme_palette", id);
    const event = new CustomEvent("theme-palette-change", { detail: id });
    window.dispatchEvent(event);
  };

  const toggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 transition"
        title="Switch Design System Palette"
      >
        <Paintbrush className="w-3.5 h-3.5 text-[var(--accent)]" />
        <span className="hidden sm:inline">Theme:</span>
        <span className="font-bold text-[var(--accent)]">
          {colorPalettes[selectedId]?.name.split("+")[0]}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl p-3 z-50 text-[var(--text)] text-xs animate-in fade-in zoom-in-95 space-y-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <span className="font-bold text-[11px] uppercase tracking-wider text-[var(--muted)]">
              Design System Palette
            </span>
            <button
              onClick={toggleDark}
              className="p-1 rounded-lg bg-[var(--tint)] hover:bg-[var(--border)] text-[var(--text)] flex items-center gap-1 text-[10px] font-bold"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>

          <div className="space-y-1.5">
            {Object.values(colorPalettes).map((palette) => (
              <button
                key={palette.id}
                onClick={() => {
                  changePalette(palette.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition cursor-pointer ${
                  selectedId === palette.id
                    ? "bg-[var(--tint)] border border-[var(--secondary)] font-bold text-[var(--primary)]"
                    : "hover:bg-[var(--tint)]/50 text-[var(--text)]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block border border-black/10"
                      style={{ backgroundColor: palette.light.primary }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block border border-black/10"
                      style={{ backgroundColor: palette.light.secondary }}
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block border border-black/10"
                      style={{ backgroundColor: palette.light.accent }}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold leading-tight">{palette.name}</div>
                    <div className="text-[10px] text-[var(--muted)]">{palette.tag}</div>
                  </div>
                </div>
                {selectedId === palette.id && <Check className="w-4 h-4 text-[var(--secondary)] shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
