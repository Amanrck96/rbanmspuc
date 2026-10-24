/**
 * Monochrome Design System — Black & White Only
 */

export interface ColorPalette {
  id: string;
  name: string;
  tag: string;
  light: {
    primary: string;
    primaryDark: string;
    secondary: string;
    secondarySoft: string;
    accent: string;
    bg: string;
    surface: string;
    tint: string;
    text: string;
    muted: string;
    border: string;
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
  default: {
    id: "default",
    name: "Monochrome",
    tag: "Black & White",
    light: {
      primary: "#000000",
      primaryDark: "#000000",
      secondary: "#333333",
      secondarySoft: "#555555",
      accent: "#000000",
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      tint: "#F5F5F5",
      text: "#000000",
      muted: "#666666",
      border: "#E0E0E0",
    },
    dark: {
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      text: "#000000",
      primary: "#000000",
      secondary: "#333333",
      accent: "#000000",
      border: "#E0E0E0",
    },
  },
  paletteA: {
    id: "paletteA",
    name: "Monochrome",
    tag: "Black & White",
    light: {
      primary: "#000000",
      primaryDark: "#000000",
      secondary: "#333333",
      secondarySoft: "#555555",
      accent: "#000000",
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      tint: "#F5F5F5",
      text: "#000000",
      muted: "#666666",
      border: "#E0E0E0",
    },
    dark: {
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      text: "#000000",
      primary: "#000000",
      secondary: "#333333",
      accent: "#000000",
      border: "#E0E0E0",
    },
  },
  paletteB: {
    id: "paletteB",
    name: "Monochrome",
    tag: "Black & White",
    light: {
      primary: "#000000",
      primaryDark: "#000000",
      secondary: "#333333",
      secondarySoft: "#555555",
      accent: "#000000",
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      tint: "#F5F5F5",
      text: "#000000",
      muted: "#666666",
      border: "#E0E0E0",
    },
    dark: {
      bg: "#FFFFFF",
      surface: "#FFFFFF",
      text: "#000000",
      primary: "#000000",
      secondary: "#333333",
      accent: "#000000",
      border: "#E0E0E0",
    },
  },
};
