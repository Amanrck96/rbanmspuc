/**
 * Multi-Palette Institutional Design System (Section 7C)
 * 
 * Supports dynamic CSS variable injection and switching between:
 * 1. Default: "Midnight Indigo + Teal + Amber" (Cool, modern institutional aesthetic)
 * 2. Palette A: "Royal Maroon & Gold" (Classic RBANMS heritage palette)
 * 3. Palette B: "Emerald & Slate" (Prestige collegiate green & warm coral)
 */

export interface ColorPalette {
  id: string;
  name: string;
  tag: string;
  light: {
    primary: string;        // Header, buttons, headings
    primaryDark: string;    // Utility bar, footer, admin sidebar
    secondary: string;      // Links, icons, secondary buttons
    secondarySoft: string;  // Decorative gradients only (NOT body text)
    accent: string;         // "Enquire Now", alert banner, highlights
    bg: string;             // Page background
    surface: string;        // Cards, modals, containers
    tint: string;           // Section backgrounds
    text: string;           // High-contrast primary body text
    muted: string;          // Secondary captions and labels
    border: string;         // Card & input borders
  };
  dark: {
    bg: string;
    surface: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
  };
}

export const colorPalettes: Record<string, ColorPalette> = {
  // Default: Midnight Indigo + Teal + Amber (Modern & High-Trust)
  default: {
    id: "default",
    name: "Midnight Indigo + Teal + Amber",
    tag: "Modern Institutional (Default)",
    light: {
      primary: "#1E2A5A",
      primaryDark: "#121A3D",
      secondary: "#0B7A75",
      secondarySoft: "#14B8A6",
      accent: "#F4B942",
      bg: "#F6F8FC",
      surface: "#FFFFFF",
      tint: "#E8EEFB",
      text: "#1B2033",
      muted: "#5B6480",
      border: "#DCE3F2",
    },
    dark: {
      bg: "#0C1024",
      surface: "#151B3A",
      text: "#EAEEFB",
      primary: "#8EA2FF",
      secondary: "#2DD4BF",
      accent: "#F4B942",
      border: "#28345E",
    },
  },

  // Palette A: Royal Maroon & Gold (RBANMS Heritage)
  paletteA: {
    id: "paletteA",
    name: "Royal Maroon & Gold",
    tag: "Heritage Classic (Palette A)",
    light: {
      primary: "#800000",
      primaryDark: "#5A0F1B",
      secondary: "#A33B48",
      secondarySoft: "#C9A227",
      accent: "#C9A227",
      bg: "#FFF9F2",
      surface: "#FFFFFF",
      tint: "#F7E9EB",
      text: "#2B2B2B",
      muted: "#6B5B5E",
      border: "#EAD5D8",
    },
    dark: {
      bg: "#1A0B0E",
      surface: "#2A1216",
      text: "#F5E9EA",
      primary: "#B03A48",
      secondary: "#E0B93A",
      accent: "#E0B93A",
      border: "#4A1E25",
    },
  },

  // Palette B: Emerald & Slate
  paletteB: {
    id: "paletteB",
    name: "Emerald & Slate",
    tag: "Collegiate Campus (Palette B)",
    light: {
      primary: "#0F5132",
      primaryDark: "#08331F",
      secondary: "#1F2937",
      secondarySoft: "#10B981",
      accent: "#FF7A59",
      bg: "#F4F7F5",
      surface: "#FFFFFF",
      tint: "#E6F0EB",
      text: "#111827",
      muted: "#4B5563",
      border: "#CFDFD6",
    },
    dark: {
      bg: "#0B1A12",
      surface: "#122B1E",
      text: "#EDF5F0",
      primary: "#34D399",
      secondary: "#9CA3AF",
      accent: "#FF7A59",
      border: "#1E4732",
    },
  },
};
