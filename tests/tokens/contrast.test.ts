import { describe, it, expect } from "vitest";
import { converter } from "culori";
import { calcAPCA } from "apca-w3";

const toRgb = converter("rgb");

function colorToInteger(colorString: string): number {
  const rgb = toRgb(colorString);
  if (!rgb) throw new Error(`Could not parse colour: ${colorString}`);
  const r = Math.round(Math.max(0, Math.min(1, rgb.r)) * 255);
  const g = Math.round(Math.max(0, Math.min(1, rgb.g)) * 255);
  const b = Math.round(Math.max(0, Math.min(1, rgb.b)) * 255);
  return ((r & 255) << 16) | ((g & 255) << 8) | (b & 255);
}

function calculateWcag2Ratio(foreground: string, background: string): number {
  const fg = toRgb(foreground)!;
  const bg = toRgb(background)!;

  const toLuminance = (c: { r: number; g: number; b: number }) => {
    const channel = (v: number) => {
      const clamped = Math.max(0, Math.min(1, v));
      return clamped <= 0.04045 ? clamped / 12.92 : Math.pow((clamped + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
  };

  const l1 = toLuminance(fg);
  const l2 = toLuminance(bg);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function calculateApca(text: string, background: string): number {
  const fg = colorToInteger(text);
  const bg = colorToInteger(background);
  return Math.abs(calcAPCA(fg, bg));
}

// Light Mode Token Pairs
const lightModeTokens = [
  { name: "Default Text", fg: "oklch(0.145 0 0)", bg: "oklch(1 0 0)", isBody: true },
  { name: "Primary Button", fg: "oklch(0.985 0 0)", bg: "oklch(0.205 0 0)", isBody: false },
  { name: "Secondary Button", fg: "oklch(0.205 0 0)", bg: "oklch(0.97 0 0)", isBody: false },
  {
    name: "Destructive Button",
    fg: "oklch(0.985 0 0)",
    bg: "oklch(0.577 0.245 27.325)",
    isBody: false,
  },
];

// Dark Mode Token Pairs
const darkModeTokens = [
  { name: "Default Text (Dark)", fg: "oklch(0.985 0 0)", bg: "oklch(0.145 0 0)", isBody: true },
  { name: "Primary Button (Dark)", fg: "oklch(0.145 0 0)", bg: "oklch(0.985 0 0)", isBody: false },
  {
    name: "Destructive Button (Dark)",
    fg: "oklch(0.985 0 0)",
    bg: "oklch(0.577 0.245 27.325)",
    isBody: false,
  },
];

describe("Dual-Engine Contrast Verification (WCAG 2.2 AA + WCAG 3 APCA)", () => {
  [...lightModeTokens, ...darkModeTokens].forEach((token) => {
    it(`enforces contrast invariants for ${token.name}`, () => {
      const wcag2Ratio = calculateWcag2Ratio(token.fg, token.bg);
      const apcaScore = calculateApca(token.fg, token.bg);

      // WCAG 2.2 AA: 4.5:1 for body reading text, 3:1 for interactive controls
      const minWcag = token.isBody ? 4.5 : 3.0;
      expect(wcag2Ratio).toBeGreaterThanOrEqual(minWcag);

      // WCAG 3 APCA: |Lc| >= 75 for body text, |Lc| >= 60 for interactive controls
      const minApca = token.isBody ? 75 : 60;
      expect(apcaScore).toBeGreaterThanOrEqual(minApca);
    });
  });
});
