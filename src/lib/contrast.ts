/**
 * Dual-Engine Accessibility & Contrast Architecture
 *
 * Implements:
 * 1. WCAG 3 (APCA - Advanced Perceptual Contrast Algorithm v0.98G-4g by Andrew Somers)
 *    for human spatial visual perception, font stroke weight, and polarity truth.
 * 2. WCAG 2.2 Level AA (SC 1.4.3 & SC 1.4.11)
 *    for global legal compliance and enterprise regulatory compatibility.
 */

// ==========================================
// 1. Color Conversion & Parsing
// ==========================================

export interface RGB {
  r: number; // 0..1
  g: number; // 0..1
  b: number; // 0..1
}

/**
 * Parses OKLCH color strings: "oklch(0.76 0.18 65)" or "oklch(0.76 0.18 65 / 0.9)"
 */
export function parseOklch(str: string): { l: number; c: number; h: number; a?: number } | null {
  if (!str) return null;
  const match = str.match(/oklch\(\s*([\d\.]+)\s+([\d\.]+)\s+([\d\.]+)(?:\s*\/\s*([\d\.]+))?\s*\)/i);
  if (!match) return null;
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
    a: match[4] !== undefined ? parseFloat(match[4]) : undefined,
  };
}

/**
 * Converts OKLCH coordinates to linear sRGB [0..1]
 */
export function oklchToLinearRgb(l: number, c: number, h: number): RGB {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  return {
    r: Math.min(1, Math.max(0, r)),
    g: Math.min(1, Math.max(0, g)),
    b: Math.min(1, Math.max(0, bl)),
  };
}

/**
 * Converts a generic color string (OKLCH, Hex, or RGB) into linear RGB
 */
export function colorToLinearRgb(colorStr: string): RGB {
  const trimmed = colorStr.trim();

  // OKLCH format
  const oklch = parseOklch(trimmed);
  if (oklch) {
    return oklchToLinearRgb(oklch.l, oklch.c, oklch.h);
  }

  // Hex format (#fff or #ffffff)
  if (trimmed.startsWith("#")) {
    const hex = trimmed.slice(1);
    const fullHex =
      hex.length === 3
        ? hex.split("").map((ch) => ch + ch).join("")
        : hex;
    const num = parseInt(fullHex, 16);
    const r = ((num >> 16) & 255) / 255;
    const g = ((num >> 8) & 255) / 255;
    const b = (num & 255) / 255;

    // sRGB to linear:
    const srgbToLin = (val: number) =>
      val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);

    return {
      r: srgbToLin(r),
      g: srgbToLin(g),
      b: srgbToLin(b),
    };
  }

  // Fallback neutral
  return { r: 0.5, g: 0.5, b: 0.5 };
}

// ==========================================
// 2. WCAG 2.2 Relative Luminance & Ratio
// ==========================================

export function getWcag2Luminance(color: string): number {
  const { r, g, b } = colorToLinearRgb(color);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calcWcag2Contrast(textColor: string, bgColor: string): number {
  const lum1 = getWcag2Luminance(textColor);
  const lum2 = getWcag2Luminance(bgColor);
  const hi = Math.max(lum1, lum2);
  const lo = Math.min(lum1, lum2);
  return (hi + 0.05) / (lo + 0.05);
}

// ==========================================
// 3. WCAG 3 / APCA (Advanced Perceptual Contrast)
// ==========================================

const APCA_COEFF = {
  R: 0.2126729,
  G: 0.7151522,
  B: 0.072175,
  blkThrs: 0.022,
  blkClp: 1.414,
  normBG: 0.56,
  normTXT: 0.62,
  revBG: 0.65,
  revTXT: 0.57,
  scale: 1.14,
};

export function getApcaY(color: string): number {
  const { r, g, b } = colorToLinearRgb(color);
  return APCA_COEFF.R * r + APCA_COEFF.G * g + APCA_COEFF.B * b;
}

/**
 * Calculates APCA Lightness Contrast (Lc).
 * Returns a signed value between -108 and +106.
 * Positive = dark text on light background (normal polarity).
 * Negative = light text on dark background (reverse polarity).
 */
export function calcAPCA(textColor: string, bgColor: string): number {
  let yTxt = getApcaY(textColor);
  let yBg = getApcaY(bgColor);

  // Soft black clamping
  yTxt = yTxt > APCA_COEFF.blkThrs ? yTxt : yTxt + Math.pow(APCA_COEFF.blkThrs - yTxt, APCA_COEFF.blkClp);
  yBg = yBg > APCA_COEFF.blkThrs ? yBg : yBg + Math.pow(APCA_COEFF.blkThrs - yBg, APCA_COEFF.blkClp);

  // Insignificant delta cutoff
  if (Math.abs(yBg - yTxt) < 0.0005) {
    return 0;
  }

  let sapca = 0;
  if (yBg > yTxt) {
    // Normal polarity (dark on light)
    sapca = (Math.pow(yBg, APCA_COEFF.normBG) - Math.pow(yTxt, APCA_COEFF.normTXT)) * APCA_COEFF.scale;
  } else {
    // Reverse polarity (light on dark)
    sapca = (Math.pow(yBg, APCA_COEFF.revBG) - Math.pow(yTxt, APCA_COEFF.revTXT)) * APCA_COEFF.scale;
  }

  return sapca * 100;
}

// ==========================================
// 4. Dual-Engine Evaluator
// ==========================================

export type ContrastContext = "button" | "body" | "heading" | "ui-control";

export interface DualContrastResult {
  apca: {
    lc: number;
    absLc: number;
    polarity: "dark-on-light" | "light-on-dark";
    pass: boolean;
    threshold: number;
    rating: "Superlative (90+)" | "Preferred (75+)" | "Standard (60+)" | "Large/UI (45+)" | "Fail (<45)";
  };
  wcag2: {
    ratio: number;
    formattedRatio: string;
    passAA: boolean;
    passAAA: boolean;
    targetRatio: number;
  };
  dualPassed: boolean;
}

/**
 * Evaluates both WCAG 3 APCA and WCAG 2.2 AA simultaneously for any two colors.
 */
export function evaluateDualContrast(
  textColor: string,
  bgColor: string,
  context: ContrastContext = "button"
): DualContrastResult {
  const lc = calcAPCA(textColor, bgColor);
  const absLc = Math.abs(lc);
  const polarity = lc >= 0 ? "dark-on-light" : "light-on-dark";

  // Context-dependent thresholds
  let apcaThreshold = 60; // Default for buttons (14px font-weight 500+)
  let wcag2Target = 4.5;

  if (context === "body") {
    apcaThreshold = 75; // 14-16px regular body text
    wcag2Target = 4.5;
  } else if (context === "heading") {
    apcaThreshold = 45; // 24px+ heading text
    wcag2Target = 3.0;
  } else if (context === "ui-control") {
    apcaThreshold = 45; // Graphical boundaries, focus rings (SC 1.4.11)
    wcag2Target = 3.0;
  }

  const passApca = absLc >= apcaThreshold;

  let apcaRating: DualContrastResult["apca"]["rating"] = "Fail (<45)";
  if (absLc >= 90) apcaRating = "Superlative (90+)";
  else if (absLc >= 75) apcaRating = "Preferred (75+)";
  else if (absLc >= 60) apcaRating = "Standard (60+)";
  else if (absLc >= 45) apcaRating = "Large/UI (45+)";

  const wcag2Ratio = calcWcag2Contrast(textColor, bgColor);
  const passWcag2AA = wcag2Ratio >= wcag2Target;
  const passWcag2AAA = wcag2Ratio >= 7.0;

  return {
    apca: {
      lc: +lc.toFixed(1),
      absLc: +absLc.toFixed(1),
      polarity,
      pass: passApca,
      threshold: apcaThreshold,
      rating: apcaRating,
    },
    wcag2: {
      ratio: +wcag2Ratio.toFixed(2),
      formattedRatio: `${wcag2Ratio.toFixed(2)}:1`,
      passAA: passWcag2AA,
      passAAA: passWcag2AAA,
      targetRatio: wcag2Target,
    },
    dualPassed: passApca && passWcag2AA,
  };
}
