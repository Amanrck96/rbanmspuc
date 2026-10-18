"use client";

import { useEffect } from "react";

interface ThemeProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
}

export default function ThemeInjector({
  primaryColor = "#800000",
  secondaryColor = "#5A0F1B",
  accentColor = "#D17B2F",
  fontFamily,
}: ThemeProps) {
  useEffect(() => {
    const root = document.documentElement;

    // 1. Royal / Dark Blue — Headings & Badges (#1E3A8A)
    root.style.setProperty("--heading", "#1E3A8A");
    root.style.setProperty("--blue", "#1E3A8A");
    root.style.setProperty("--royal-blue", "#1E3A8A");

    // 2. White — Main Background & Cards (#FFFFFF)
    root.style.setProperty("--white", "#FFFFFF");
    root.style.setProperty("--bg", "#FFFFFF");
    root.style.setProperty("--card", "#FFFFFF");
    root.style.setProperty("--cream", "#FFFFFF");

    // 3. Maroon — Primary Brand Color (#800000)
    root.style.setProperty("--maroon", primaryColor || "#800000");
    root.style.setProperty("--maroon-dark", secondaryColor || "#5A0F1B");
    root.style.setProperty("--maroon-light", "#A33B48");
    root.style.setProperty("--maroon-tint", "#F7E9EB");

    // 4. Burnt Orange — Accent Color (#D17B2F)
    root.style.setProperty("--accent", accentColor || "#D17B2F");
    root.style.setProperty("--burnt-orange", accentColor || "#D17B2F");

    // 5. Gold — Hover Highlight (Brochure Button Hover) (#FFD700)
    root.style.setProperty("--gold", "#FFD700");
    root.style.setProperty("--gold-hover", "#FFD700");

    // 6. Black — Body Text (#000000)
    root.style.setProperty("--text", "#000000");
    root.style.setProperty("--body-text", "#000000");

    // 7. Light Slate Gray — Inactive Tabs (#F1F5F9)
    root.style.setProperty("--tab-inactive-bg", "#F1F5F9");

    // 8. Border Gray — Borders around Inactive Tabs (#CBD5E1)
    root.style.setProperty("--border-gray", "#CBD5E1");

    if (fontFamily) {
      root.style.setProperty("--font-sans", fontFamily);
    }
  }, [primaryColor, secondaryColor, accentColor, fontFamily]);

  return (
    <style jsx global>{`
      :root {
        /* 1. Royal / Dark Blue — Headings */
        --heading: #1E3A8A;
        --blue: #1E3A8A;
        --royal-blue: #1E3A8A;

        /* 2. White — Main Background */
        --cream: #FFFFFF;
        --white: #FFFFFF;
        --bg: #FFFFFF;
        --card: #FFFFFF;

        /* 3. Maroon — Primary Brand Color */
        --maroon: ${primaryColor || "#800000"};
        --maroon-dark: ${secondaryColor || "#5A0F1B"};
        --maroon-light: #A33B48;
        --maroon-tint: #F7E9EB;

        /* 4. Burnt Orange — Accent Color */
        --accent: ${accentColor || "#D17B2F"};
        --burnt-orange: ${accentColor || "#D17B2F"};

        /* 5. Gold — Hover Highlight */
        --gold: #FFD700;
        --gold-hover: #FFD700;

        /* 6. Black — Body Text */
        --text: #000000;
        --body-text: #000000;

        /* 7. Light Slate Gray — Inactive Tabs */
        --tab-inactive-bg: #F1F5F9;

        /* 8. Border Gray — Borders around Inactive Tabs */
        --border-gray: #CBD5E1;

        --color-primary: var(--maroon);
        --color-secondary: var(--maroon-dark);
        --color-accent: var(--accent);
        --color-heading: var(--heading);
      }

      .dark, html.dark {
        --bg: #0B1120;
        --card: #1E293B;
        --text: #FFFFFF;
        --heading: #60A5FA;
        --blue: #60A5FA;
        --royal-blue: #60A5FA;
        --maroon: #991B1B;
        --maroon-dark: #5A0F1B;
        --maroon-light: #C44F5D;
        --maroon-tint: #1E293B;
        --accent: #E68A3E;
        --burnt-orange: #E68A3E;
        --gold: #FFD700;
        --gold-hover: #FFD700;
        --tab-inactive-bg: #1E293B;
        --border-gray: #334155;
        --white: #FFFFFF;
        --cream: #0B1120;

        --color-primary: var(--maroon);
        --color-secondary: var(--maroon-dark);
        --color-accent: var(--accent);
        --color-heading: var(--heading);
      }
    `}</style>
  );
}
