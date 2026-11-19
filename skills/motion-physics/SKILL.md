---
name: motion-physics
description: Use when animating UI transitions, gestures, modals, or active states with motion/react. Enforces calibrated spring physics, pointerdown yield, and velocity.
license: MIT
metadata:
  author: William Dibble
  version: "1.0.0"
  tags: [motion, spring-physics, animation, gestures, hig]
---

# Motion Physics: Apple Fluid Interface Specification

This skill codifies fluid, physical motion for the web using **`motion`** (`motion/react`) and CSS spring approximations.

**The Core Law**: An interface feels alive when motion begins from the current on-screen value, responds instantaneously on press, inherits pointer velocity, and remains interruptible at any millisecond.

---

## Purpose

Govern spring curves, tactile `pointerdown` compression, gesture velocity inheritance, reduced-motion accessibility, and zero-layout-shift compositor transitions across all interactive components.

---

## Prerequisites

- **`motion` (`motion/react` / `motion/react-client`)** for physics-driven springs, `layout`, and `layoutId` shared element transitions.
- **`src/tokens/motion.ts`** exporting calibrated `springs` presets (`tactile`, `dialog`, `snappy`, `micro`, `squishy`).
- **`prefers-reduced-motion` hook**: Always read `useReducedMotion()` and fall back cleanly when motion reduction is active or invalid spring parameters occur.

---

## Instructions

Follow this sequence whenever authoring or auditing interactive motion:

1. **Use `pointerdown` feedback with zero delay**: Configure `whileTap={{ scale: 0.975 }}` using `springs.tactile` (`delay = 0`); reserve micro-staggers (`<= 30ms`) strictly for initial passive entrance sequences.
2. **Pass calibrated spring tokens**: Import presets from `src/tokens/motion.ts` rather than writing linear timers or arbitrary cubic-bezier curves.
3. **Set explicit transform origins on overlays**: Anchor popovers with `origin-(--transform-origin)` scaling between `scale-95` and `scale-100` (never `scale-0`).
4. **Keep compositor purity strict**: Animate only `transform` and `opacity` (or `motion` `layout` FLIP projection); never keyframe `width`, `height`, `top`, `left`, `margin`, or `filter`.
5. **Validate error states and reduced motion**: Check `useReducedMotion()` before dispatching spatial displacement and keep interactive animations interruptible on pointer release or error cancellation.

---

## 🏎️ The 5 Laws of Fluid Interface Motion

1. **Kill Latency on Press**: Yield instantaneously on `pointerdown` (`scale(0.97)` to `0.98`), never on `click`. Keep interactive triggers at `delay = 0`.
2. **Direct Manipulation & Rubber Banding**: Track gestures `1:1` with Pointer Events (`setPointerCapture`). Apply logarithmic resistance beyond boundaries (`dx_visual = dx_pull * 0.35`) and snap back via `springs.snappy`.
3. **Momentum & Velocity Inheritance**: Spring models inherit exit gesture velocity smoothly via continuous energy (`Energy = 0.5 * m * v^2 + 0.5 * k * x^2`).
4. **Instant Interruptibility**: Any transition in flight must remain grabbable and reversible without state desync or artificial input locks.
5. **Component-Unified Kinetic Affinity**: Icons inside controls are intrinsic organs. The entire parent button hit area drives nested icon motion via `pointer-events-none` SVG paths and `group-hover` / `group-active`.

---

## 🎛️ Standard Spring Physics Tokens (`src/tokens/motion.ts`)

```typescript
export const springs = {
  // Tactile Button & Toggle Press: instant physical yield on touch
  tactile: { type: "spring", stiffness: 600, damping: 30, mass: 0.8 },
  // Dialog, Sheet, and Modal Overlays: controlled descent without jarring overshoot
  dialog: { type: "spring", stiffness: 350, damping: 35, mass: 1.0 },
  // Snappy Layout Transitions & Tab Indicators (layoutId)
  snappy: { type: "spring", stiffness: 550, damping: 35, mass: 0.6 },
  // Micro-Interactions (Tooltips, Badges, Dropdown Arrows)
  micro: { type: "spring", stiffness: 700, damping: 40 },
  // Squishy Fluid Morph (Expanding/Collapsing Action Buttons)
  squishy: { type: "spring", stiffness: 420, damping: 24, mass: 0.8 },
} as const;
```

---

## 📐 Scale & Origin Invariants (Overlays & Tabs)

- **Trigger-Anchored Overlays (`Popover`, `Menu`, `Select`, `Tooltip`)**: Bind `origin-(--transform-origin)`, transition `scale-95 <-> scale-100` and `opacity-0 <-> opacity-100` over `duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]` via `data-[starting-style]` and `data-[ending-style]`.
- **Centered Modals (`Dialog`, `AlertDialog`, `CommandDialog`)**: Scale between `scale-95` and `scale-100` over `duration-200`, paired with `backdrop-blur-md` fade.
- **Edge Drawers (`Sheet`)**: Translate monotonically along the anchored edge (`translate-x-full` / `translate-y-full`) with `pb-[env(safe-area-inset-bottom)]`.
- **Sliding Tab Pills**: Attach `layoutId="active-indicator"` with `springs.snappy` rather than cross-fading active backgrounds.

---

## 🎬 State Transition Mechanics (Kinetic Storytelling)

Detailed implementation specs and edge-case invariants live in [references/kinetic-storytelling.md](references/kinetic-storytelling.md):

| Mechanic                            | Core Constraint                                                                                                                      |
| :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Async Button Feedback Loop**      | `Idle -> Loading -> Success -> Idle`, preserve 100% surface opacity under `aria-busy`, use `mode="popLayout"`, minimum `400ms` dwell |
| **Rolling Odometer Ticker**         | Independent vertical digit columns using `y: -${digit}em` (never percentage shifts) and `tabular-nums`                               |
| **Directional & Specular Feedback** | Hover vectors (`2px to 4px`), cursor-tracked ambient radial highlights                                                               |
| **Hold-to-Repeat Stepper**          | `0ms` initial tick, `400ms` dwell gate, exponential cadence ramp (`140ms` down to `35ms`), window cleanup                            |
| **Reversible Mechanical Icons**     | Icons animate only along physical rails/hinges returning cleanly to origin; static defaults for `+`, `-`, `Check`, arrows            |

---

## Examples

### 1. Tactile Button with Reduced-Motion Fallback

```tsx
import * as m from "motion/react-client";
import { useReducedMotion } from "motion/react";
import { springs } from "@/tokens/motion";

export function TactileButton({ children, ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? { duration: 0 } : springs.tactile;

  return (
    <m.button
      whileTap={shouldReduceMotion ? undefined : { scale: 0.975 }}
      transition={transition}
      {...props}
    >
      {children}
    </m.button>
  );
}
```

### 2. Shared Layout Segmented Tabs & FLIP Layout Morph

```tsx
import * as m from "motion/react-client";
import { springs } from "@/tokens/motion";

export function SegmentedTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="relative inline-flex items-center rounded-lg bg-muted p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="relative z-10 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            data-active={isActive}
          >
            {isActive && (
              <m.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-md bg-card shadow-sm"
                transition={springs.snappy}
              />
            )}
            <span className="relative z-20">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
```

### 3. CSS Spring Fallback & Theme-Switch Suppression

For static HTML/SSR fallbacks without JS runtime overhead, approximate springs with CSS `linear()`, and always suppress transitions briefly during theme switches to avoid rainbow colour smears:

```css
:root {
  --ease-spring: linear(
    0,
    0.006,
    0.025 2.8%,
    0.101 6.1%,
    0.539 18.9%,
    0.721 25.3%,
    0.849 31.5%,
    0.937 38.1%,
    0.968 41.8%,
    0.991 45.7%,
    1.002 50.1%,
    1.003 56.4%,
    1
  );
}
.button-press {
  transition: transform 120ms var(--ease-spring);
}
.button-press:active {
  transform: scale(0.975);
}
```

```typescript
export function disableTransitionsTemporarily() {
  const css = document.createElement("style");
  css.textContent = "* { transition: none !important; -webkit-transition: none !important; }";
  document.head.appendChild(css);
  return () => {
    void window.getComputedStyle(document.body);
    document.head.removeChild(css);
  };
}
```

---

## 🚫 Compositing Invariants & Review Checklist

- **Only animate `transform` and `opacity`**: Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, or `filter`. Use `layout` FLIP projection on morphing buttons so dimensions invert cleanly into GPU `scale()` matrices.
- [ ] Replace any `transition: all` with explicit properties (`transition-[transform,opacity]`).
- [ ] Confirm immediate physical yield on `pointerdown`, never delayed by `click` or artificial `delay`.
- [ ] Verify modals open from `scale(0.95)`, tabs animate via `layoutId`, and theme toggles suppress global transitions.
- [ ] Confirm `useReducedMotion()` is respected and operational glyphs (`+`, `-`, `Check`, arrows) remain static.

---

## Limitations

- **Client runtime requirement for springs**: `motion/react` `layout` projection and `useReducedMotion` require `"use client";` components and client hydration; CSS-only SSR surfaces should use the `--ease-spring` `linear()` fallback above.
- **CPU cost of layout invalidation**: Even with GPU transforms, animating `backdrop-filter` nodes inside continuously scrolling or flexing parents degrades frame pacing unless promoted cleanly (`isolation: isolate`).

---

## Troubleshooting

| Symptom                                                                  | Cause                                                                              | Solution                                                                                                          |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| Button flashes bright/dark right before green success state settles      | `disabled:opacity-50` applied during active `aria-busy="true"` loading             | Scope disabled dimming using `[&:disabled:not([aria-busy='true'])]:opacity-50` so async buttons hold 100% opacity |
| Rolling digits render clipped or half-shifted vertically                 | Percentage translation `y: -${digit * 10}%` evaluates against `1em` flex container | Set `shrink-0 h-[1em] w-full leading-none` on digits and translate by `y: -${digit}em`                            |
| Theme toggle produces slow grey/muddy smear across cards                 | Global CSS colour transitions animate over 150ms–300ms simultaneously              | Wrap theme class mutations in `disableTransitionsTemporarily()` and force body style computation before cleanup   |
| Hold-to-repeat stepper continues incrementing after cursor leaves button | Pointer release listener attached only to element instead of `window`              | Register `pointerup` and `pointercancel` cleanup handlers on `window` and validate bounds on every tick           |
