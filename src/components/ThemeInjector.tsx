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
    root.style.setProperty("--cream", "#FFF9F2");

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
        --cream: #FFF9F2;
        --text: #2B2B2B;
        --white: #FFFFFF;
        --bg: #FFF9F2;
        --card: #FFFFFF;

        --color-primary: var(--maroon);
        --color-secondary: var(--maroon-dark);
        --color-accent: var(--gold);
      }

      .dark, html.dark {
        --bg: #1A0B0E;
        --card: #2A1216;
        --text: #F5E9EA;
        --maroon: #B03A48;
        --maroon-dark: #5A0F1B;
        --maroon-light: #C44F5D;
        --maroon-tint: #2A1216;
        --gold: ${accentColor && accentColor !== "#C9A227" ? accentColor : "#E0B93A"};
        --white: #FFFFFF;
        --cream: #1A0B0E;

        --color-primary: var(--maroon);
        --color-secondary: var(--maroon-dark);
        --color-accent: var(--gold);
      }
    `}</style>
  );
}
