import { colorPalettes } from "../src/config/theme.config";

// Relative luminance calculation per WCAG 2.1
function getLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

console.log("=== WCAG 2.1 AA COLOR CONTRAST AUDIT ===");

let hasFailures = false;

for (const [id, palette] of Object.entries(colorPalettes)) {
  console.log(`\nPalette: [${palette.name}]`);

  // Check 1: Text on Background (Normal text requires >= 4.5:1)
  const textBgRatio = getContrastRatio(palette.light.text, palette.light.bg);
  const textBgPass = textBgRatio >= 4.5;
  console.log(`  Light Text (${palette.light.text}) on Bg (${palette.light.bg}): ${textBgRatio.toFixed(2)}:1 ${textBgPass ? "✅ PASS (AA)" : "❌ FAIL"}`);
  if (!textBgPass) hasFailures = true;

  // Check 2: Primary on White/Surface (Headings/Buttons require >= 3:1 for large, 4.5:1 for normal)
  const primSurfaceRatio = getContrastRatio(palette.light.primary, palette.light.surface);
  const primSurfacePass = primSurfaceRatio >= 4.5;
  console.log(`  Primary (${palette.light.primary}) on Surface (${palette.light.surface}): ${primSurfaceRatio.toFixed(2)}:1 ${primSurfacePass ? "✅ PASS (AA)" : "❌ FAIL"}`);
  if (!primSurfacePass) hasFailures = true;

  // Check 3: White text on Primary button
  const whiteOnPrimaryRatio = getContrastRatio("#FFFFFF", palette.light.primary);
  const whiteOnPrimaryPass = whiteOnPrimaryRatio >= 4.5;
  console.log(`  White (#FFFFFF) on Primary (${palette.light.primary}): ${whiteOnPrimaryRatio.toFixed(2)}:1 ${whiteOnPrimaryPass ? "✅ PASS (AA)" : "❌ FAIL"}`);
  if (!whiteOnPrimaryPass) hasFailures = true;

  // Check 4: Dark text on Accent (Amber/Gold buttons)
  const darkOnAccentRatio = getContrastRatio(palette.light.primaryDark, palette.light.accent);
  const darkOnAccentPass = darkOnAccentRatio >= 4.5;
  console.log(`  Dark text (${palette.light.primaryDark}) on Accent (${palette.light.accent}): ${darkOnAccentRatio.toFixed(2)}:1 ${darkOnAccentPass ? "✅ PASS (AA)" : "❌ FAIL"}`);
  if (!darkOnAccentPass) hasFailures = true;
}

if (!hasFailures) {
  console.log("\n🎉 ALL COLOR PALETTES FULLY COMPLY WITH WCAG 2.1 AA STANDARDS!");
} else {
  console.error("\n⚠️ Some contrast ratios failed WCAG AA threshold.");
  process.exit(1);
}
