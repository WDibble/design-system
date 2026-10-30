/**
 * Perceptual OKLCH Gradient Token System
 * Conforms to Directive 11 (Perceptual Gradient Engineering & Anti-Slop Contrast Invariant)
 * and skills/craft-philosophy/SKILL.md Section 18.
 *
 * Eliminates sRGB muddy midpoints by enforcing modern perceptual colour space interpolation
 * (linear-gradient(in oklch, ...) / radial-gradient(in oklch, ...)).
 */

export interface GradientDefinition {
  id: string;
  name: string;
  origin: string; // Heritage reference (e.g., uiGradients / Apple Spatial)
  css: string;
  stops: {
    l: number; // OKLCH Lightness [0, 1]
    c: number; // OKLCH Chroma [0, 0.4]
    h: number; // OKLCH Hue [0, 360]
    alpha?: number;
  }[];
  description: string;
}

/**
 * 1. Atmospheric Ambient Occlusion & Deep Grounds
 * Deep OKLCH canvas grounds that eliminate flat banding and anchor layouts.
 */
export const groundGradients = {
  obsidian: {
    id: "ground-obsidian",
    name: "Obsidian Canvas",
    origin: "Deep Ground Invariant",
    css: "linear-gradient(180deg in oklch, oklch(0.14 0.01 260) 0%, oklch(0.10 0.005 260) 100%)",
    description: "Subtle vertical ambient decay for dark mode grounds.",
  },
  abyss: {
    id: "ground-abyss",
    name: "Abyssal Navy",
    origin: "Midnight City (Adapted)",
    css: "linear-gradient(180deg in oklch, oklch(0.15 0.03 240) 0%, oklch(0.09 0.02 240) 100%)",
    description: "Deep oceanic dark ground with verified text contrast.",
  },
  slateZen: {
    id: "ground-slate",
    name: "Slate Quietude",
    origin: "Quiet Chrome Doctrine",
    css: "linear-gradient(180deg in oklch, oklch(0.98 0.002 240) 0%, oklch(0.94 0.005 240) 100%)",
    description: "Ultra-clean light mode canvas grounding.",
  },
} as const;

/**
 * 2. Specular Rim Lighting (The 1px Bevel Highlight)
 * Directional light reflection simulating physical glass, anodized metal, or elevated acrylic.
 */
export const rimHighlights = {
  glassTop: {
    id: "rim-glass-top",
    name: "Glass Top Specular",
    css: "linear-gradient(to bottom in oklch, oklch(1 0 0 / 0.18) 0%, oklch(1 0 0 / 0.02) 100%)",
    boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.15)",
  },
  anodizedRim: {
    id: "rim-anodized",
    name: "Anodized Metal Rim",
    css: "linear-gradient(to bottom in oklch, oklch(1 0 0 / 0.25) 0%, oklch(1 0 0 / 0.05) 50%, oklch(0 0 0 / 0.2) 100%)",
    boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.2), inset 0 -1px 0 0 oklch(0 0 0 / 0.3)",
  },
  subtleCard: {
    id: "rim-subtle-card",
    name: "Subtle Card Ambient",
    boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.08)",
  },
} as const;

/**
 * 3. Directional Alpha Masks
 * Seamless content fade-out masks for scrollable containers and shimmer skeletons.
 */
export const alphaMasks = {
  fadeRight: {
    id: "mask-fade-right",
    name: "Right Overflow Fade",
    css: "linear-gradient(to right, black calc(100% - 48px), transparent 100%)",
  },
  fadeLeft: {
    id: "mask-fade-left",
    name: "Left Overflow Fade",
    css: "linear-gradient(to left, black calc(100% - 48px), transparent 100%)",
  },
  fadeBottom: {
    id: "mask-fade-bottom",
    name: "Bottom Scroll Fade",
    css: "linear-gradient(to bottom, black calc(100% - 64px), transparent 100%)",
  },
  shimmerWave: {
    id: "mask-shimmer",
    name: "Kinetic Shimmer Wave",
    css: "linear-gradient(90deg in oklch, transparent 0%, oklch(1 0 0 / 0.15) 50%, transparent 100%)",
  },
} as const;

/**
 * 4. Ambient Lensing under Liquid Glass (Curated from uiGradients)
 * Chromatic colour harmonies adapted from uiGradients into perceptual OKLCH coordinates.
 * Strictly intended for soft blurred background orbs (blur >= 60px, opacity <= 25%)
 * or behind glass panels (backdrop-filter: blur(20px)).
 * NEVER apply as solid foreground text or buttons without contrast protection.
 */
export const ambientGradients = {
  cosmicFusion: {
    id: "ambient-cosmic-fusion",
    name: "Cosmic Fusion",
    heritage: "uiGradients: #ff00cc ➔ #333399",
    // Converted to OKLCH perceptual space
    css: "linear-gradient(135deg in oklch, oklch(0.65 0.28 335) 0%, oklch(0.35 0.18 280) 100%)",
    subtleCss: "linear-gradient(135deg in oklch, oklch(0.65 0.28 335 / 0.18) 0%, oklch(0.35 0.18 280 / 0.18) 100%)",
    category: "Atmospheric Glass Orb",
    dominantHues: ["Magenta", "Indigo"],
  },
  sublimeLight: {
    id: "ambient-sublime-light",
    name: "Sublime Light",
    heritage: "uiGradients: #FC5C7D ➔ #6A82FB",
    css: "linear-gradient(135deg in oklch, oklch(0.68 0.22 15) 0%, oklch(0.64 0.20 265) 100%)",
    subtleCss: "linear-gradient(135deg in oklch, oklch(0.68 0.22 15 / 0.18) 0%, oklch(0.64 0.20 265 / 0.18) 100%)",
    category: "Atmospheric Glass Orb",
    dominantHues: ["Coral Rose", "Periwinkle Blue"],
  },
  quepal: {
    id: "ambient-quepal",
    name: "Quepal",
    heritage: "uiGradients: #11998e ➔ #38ef7d",
    css: "linear-gradient(135deg in oklch, oklch(0.60 0.16 185) 0%, oklch(0.85 0.22 145) 100%)",
    subtleCss: "linear-gradient(135deg in oklch, oklch(0.60 0.16 185 / 0.18) 0%, oklch(0.85 0.22 145 / 0.18) 100%)",
    category: "Atmospheric Glass Orb",
    dominantHues: ["Deep Teal", "Spring Emerald"],
  },
  shroomHaze: {
    id: "ambient-shroom-haze",
    name: "Shroom Haze",
    heritage: "uiGradients: #5C258D ➔ #4389A2",
    css: "linear-gradient(135deg in oklch, oklch(0.38 0.18 310) 0%, oklch(0.58 0.10 215) 100%)",
    subtleCss: "linear-gradient(135deg in oklch, oklch(0.38 0.18 310 / 0.18) 0%, oklch(0.58 0.10 215 / 0.18) 100%)",
    category: "Atmospheric Glass Orb",
    dominantHues: ["Deep Violet", "Muted Cyan"],
  },
  emeraldWater: {
    id: "ambient-emerald-water",
    name: "Emerald Water",
    heritage: "uiGradients: #348F50 ➔ #56B4D3",
    css: "linear-gradient(135deg in oklch, oklch(0.58 0.14 150) 0%, oklch(0.72 0.12 215) 100%)",
    subtleCss: "linear-gradient(135deg in oklch, oklch(0.58 0.14 150 / 0.18) 0%, oklch(0.72 0.12 215 / 0.18) 100%)",
    category: "Atmospheric Glass Orb",
    dominantHues: ["Forest Jade", "Cerulean"],
  },
  bourbon: {
    id: "ambient-bourbon",
    name: "Bourbon Dusk",
    heritage: "uiGradients: #EC6F66 ➔ #F3A183",
    css: "linear-gradient(135deg in oklch, oklch(0.66 0.18 30) 0%, oklch(0.77 0.12 50) 100%)",
    subtleCss: "linear-gradient(135deg in oklch, oklch(0.66 0.18 30 / 0.18) 0%, oklch(0.77 0.12 50 / 0.18) 100%)",
    category: "Atmospheric Glass Orb",
    dominantHues: ["Warm Terracotta", "Peach Amber"],
  },
} as const;

export type AmbientGradientKey = keyof typeof ambientGradients;
