/**
 * Calibrated Apple HIG spring physics configurations for motion/react.
 * Follows the 4 laws of fluid interface motion codified in skills/motion-physics/SKILL.md.
 */

export const springs = {
  /**
   * Tactile Button & Toggle Press
   * High stiffness, moderate damping. Instant physical yield on touch.
   */
  tactile: {
    type: "spring",
    stiffness: 600,
    damping: 30,
    mass: 0.8,
  },

  /**
   * Dialog, Sheet, and Modal Overlays
   * Controlled, smooth descent without jarring overshoot.
   */
  dialog: {
    type: "spring",
    stiffness: 350,
    damping: 35,
    mass: 1.0,
  },

  /**
   * Snappy Layout Transitions & Tab Indicators
   * Fast, responsive tracking of active state switches (layoutId).
   */
  snappy: {
    type: "spring",
    stiffness: 550,
    damping: 35,
    mass: 0.6,
  },

  /**
   * Micro-Interactions (Tooltips, Badges, Dropdown Arrows)
   * Crisp and immediate; completes within ~150ms.
   */
  micro: {
    type: "spring",
    stiffness: 700,
    damping: 40,
  },

  /**
   * Squishy Fluid Morph (Expanding/Collapsing Action Buttons, Dynamic Island)
   * Moderate stiffness, slight underdamping for organic rubbery micro-rebound.
   */
  squishy: {
    type: "spring",
    stiffness: 420,
    damping: 24,
    mass: 0.8,
  },
} as const;

export type SpringPreset = keyof typeof springs;

/**
 * Modern CSS spring fallback curve using the linear() generator
 * for pure CSS transitions where JavaScript animation is not required.
 */
export const CSS_EASE_SPRING =
  "linear(0, 0.006, 0.025 2.8%, 0.101 6.1%, 0.539 18.9%, 0.721 25.3%, 0.849 31.5%, 0.937 38.1%, 0.968 41.8%, 0.991 45.7%, 1.002 50.1%, 1.003 56.4%, 1)";
