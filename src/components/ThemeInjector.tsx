"use client";

import { useEffect } from "react";

interface ThemeProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function ThemeInjector({
  primaryColor = "#1e3a8a",
  secondaryColor = "#b45309",
  accentColor = "#0284c7",
}: ThemeProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", primaryColor);
    root.style.setProperty("--color-secondary", secondaryColor);
    root.style.setProperty("--color-accent", accentColor);
  }, [primaryColor, secondaryColor, accentColor]);

  return (
    <style jsx global>{`
      :root {
        --color-primary: ${primaryColor};
        --color-secondary: ${secondaryColor};
        --color-accent: ${accentColor};
      }
      .bg-primary {
        background-color: var(--color-primary);
      }
      .text-primary {
        color: var(--color-primary);
      }
      .border-primary {
        border-color: var(--color-primary);
      }
      .hover\\:bg-primary:hover {
        background-color: var(--color-primary);
      }
      .bg-secondary {
        background-color: var(--color-secondary);
      }
      .text-secondary {
        color: var(--color-secondary);
      }
      .border-secondary {
        border-color: var(--color-secondary);
      }
    `}</style>
  );
}
