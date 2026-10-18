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
  accentColor = "#C9A227",
  fontFamily,
}: ThemeProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--maroon", primaryColor || "#800000");
    root.style.setProperty("--maroon-dark", secondaryColor || "#5A0F1B");
    root.style.setProperty("--maroon-light", "#A33B48");
    root.style.setProperty("--maroon-tint", "#F7E9EB");
    root.style.setProperty("--gold", accentColor || "#C9A227");

    // 2. White — Main Background & Cards (#FFFFFF)
    root.style.setProperty("--white", "#FFFFFF");
    root.style.setProperty("--bg", "#FFFFFF");
    root.style.setProperty("--card", "#FFFFFF");
    root.style.setProperty("--cream", "#FFFFFF");

    // 1. Royal / Dark Blue — Headings & Badges (#1E3A8A)
    root.style.setProperty("--heading", "#1E3A8A");
    root.style.setProperty("--blue", "#1E3A8A");
    root.style.setProperty("--royal-blue", "#1E3A8A");

    if (fontFamily) {
      root.style.setProperty("--font-sans", fontFamily);
    }
  }, [primaryColor, secondaryColor, accentColor, fontFamily]);

  return (
    <style jsx global>{`
      :root {
        --maroon: ${primaryColor || "#800000"};
        --maroon-dark: ${secondaryColor || "#5A0F1B"};
        --maroon-light: #A33B48;
        --maroon-tint: #F7E9EB;
        --gold: ${accentColor || "#C9A227"};

        /* 2. White — Main Background */
        --cream: #FFFFFF;
        --text: #1E293B;
        --white: #FFFFFF;
        --bg: #FFFFFF;
        --card: #FFFFFF;

        /* 1. Royal / Dark Blue — Headings */
        --heading: #1E3A8A;
        --blue: #1E3A8A;
        --royal-blue: #1E3A8A;

        --color-primary: var(--maroon);
        --color-secondary: var(--maroon-dark);
        --color-accent: var(--gold);
        --color-heading: var(--heading);
      }

      .dark, html.dark {
        --bg: #0B1120;
        --card: #1E293B;
        --text: #F1F5F9;
        --heading: #60A5FA;
        --blue: #60A5FA;
        --royal-blue: #60A5FA;
        --maroon: #991B1B;
        --maroon-dark: #5A0F1B;
        --maroon-light: #C44F5D;
        --maroon-tint: #1E293B;
        --gold: ${accentColor && accentColor !== "#C9A227" ? accentColor : "#E0B93A"};
        --white: #FFFFFF;
        --cream: #0B1120;

        --color-primary: var(--maroon);
        --color-secondary: var(--maroon-dark);
        --color-accent: var(--gold);
        --color-heading: var(--heading);
      }
    `}</style>
  );
}
