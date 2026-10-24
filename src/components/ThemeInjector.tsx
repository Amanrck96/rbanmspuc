"use client";

import { useEffect, useState } from "react";
import { colorPalettes, ColorPalette } from "@/config/theme.config";

interface ThemeProps {
  initialPaletteId?: string;
  fontFamily?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function ThemeInjector({
  initialPaletteId = "default",
  primaryColor,
  secondaryColor,
  accentColor,
}: ThemeProps) {
  const [activePalette, setActivePalette] = useState<ColorPalette>(
    colorPalettes[initialPaletteId] || colorPalettes.default
  );

  useEffect(() => {
    // Listen for custom palette switch events
    const handlePaletteChange = (e: CustomEvent<string>) => {
      const selected = colorPalettes[e.detail];
      if (selected) {
        setActivePalette(selected);
        localStorage.setItem("selected_theme_palette", e.detail);
      }
    };

    const saved = localStorage.getItem("selected_theme_palette");
    if (saved && colorPalettes[saved]) {
      setActivePalette(colorPalettes[saved]);
    }

    window.addEventListener(
      "theme-palette-change" as any,
      handlePaletteChange as any
    );
    return () => {
      window.removeEventListener(
        "theme-palette-change" as any,
        handlePaletteChange as any
      );
    };
  }, []);

  const p = activePalette.light;
  const d = activePalette.dark;

  return (
    <style jsx global>{`
      :root {
        /* Section 7C: Design System Primary Tokens */
        --primary: ${p.primary};
        --primary-dark: ${p.primaryDark};
        --secondary: ${p.secondary};
        --secondary-soft: ${p.secondarySoft};
        --accent: ${p.accent};
        --bg: ${p.bg};
        --surface: ${p.surface};
        --card: ${p.surface};
        --tint: ${p.tint};
        --text: ${p.text};
        --muted: ${p.muted};
        --border: ${p.border};

        /* Headings & Brand Elements */
        --heading: ${p.primary};
        --font-heading: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        --font-body: 'Inter', system-ui, -apple-system, sans-serif;

        /* Backwards-compatible aliases for existing components */
        --maroon: ${p.primary};
        --maroon-dark: ${p.primaryDark};
        --maroon-light: ${p.secondary};
        --maroon-tint: ${p.tint};
        --gold: ${p.accent};
        --cream: ${p.bg};
        --white: #FFFFFF;
      }

      .dark, html.dark {
        --primary: ${d.primary};
        --primary-dark: #000000;
        --secondary: ${d.secondary};
        --secondary-soft: #555555;
        --accent: ${d.accent};
        --bg: ${d.bg};
        --surface: ${d.surface};
        --card: ${d.surface};
        --tint: #F5F5F5;
        --text: ${d.text};
        --muted: #666666;
        --border: ${d.border};

        --heading: ${d.primary};

        /* Backwards-compatible aliases */
        --maroon: ${d.primary};
        --maroon-dark: #000000;
        --maroon-light: ${d.secondary};
        --maroon-tint: #F5F5F5;
        --gold: ${d.accent};
        --cream: ${d.bg};
        --white: #FFFFFF;
      }

      body {
        background-color: var(--bg);
        color: var(--text);
        font-family: var(--font-body);
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
      }
    `}</style>
  );
}
