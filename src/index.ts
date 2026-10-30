/**
 * Design System: Canonical Library Entry Point
 * Conforms to Directive 13 (Origin Anonymity & Self-Contained Integrity).
 */

// UI Component Primitives (48 Accessible Headless Primitives)
export * from "./components/ui";

// Kinetic Icons (470 Reversible Spring Icons)
export * from "./components/icons";

// Physical Motion Physics (Apple HIG Springs & Micro Curves)
export * from "./tokens/motion";

// Perceptual OKLCH Gradients & Materials
export * from "./tokens/gradients";

// Semantic Theme Token Engine & Runtime Applier
export * from "./lib/theme";
export * from "./lib/theme-presets";

// Dual-Engine Contrast Verification (WCAG 2.2 Level AA + WCAG 3 APCA)
export * from "./lib/contrast";

// General Utilities (cn / clsx / tailwind-merge)
export * from "./lib/utils";
