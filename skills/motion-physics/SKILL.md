---
name: motion-physics
description: Apple-grade fluid motion and spring physics specification using motion/react. Governs calibrated spring curves, pointerdown tactile response, velocity inheritance, gesture interruptibility, boundary resistance (rubber banding), and reduced motion safety. Use when authoring, animating, or reviewing any transition, gesture, modal, drawer, or interactive state.
---

# Motion Physics: Apple Fluid Interface Specification

This skill codifies Apple's approach to fluid, physical motion (distilled from WWDC *Designing Fluid Interfaces*) and translates it for the modern web using **`motion`** (`motion/react`) and CSS spring approximations.

The core law: **An interface feels alive when motion starts from the current on-screen value, responds instantaneously on press, inherits the user's velocity, projects momentum forward, and can be interrupted or reversed at any millisecond.**

---

## 🏎️ The 4 Laws of Fluid Interface Motion

### 1. Response: Kill Latency on Press
The moment latency appears, directness falls off a cliff.
- **Respond on `pointerdown`, never on pointer release (`click`).** Highlight or compress the button the instant the finger touches the screen or mouse clicks down.
- Compress subtly (`scale(0.97)` to `0.98`) using a stiff spring. Waiting for release feels dead.
- **Zero-Delay on User Action**: Interactive triggers (clicks, taps, toggles) must have **$\mathbf{\text{delay} = 0}$**. Artificial delays (e.g. `delay: 0.1`) on user actions make software feel sluggish and unresponsive. (Micro-staggers $\le 30\text{ms}$ are permitted strictly on passive page-load entrances, never on interactive gestures).
- Audit out any artificial tap delays, debounces, or layout reflows on the input path.

```tsx
// React with motion/react
import * as m from "motion/react-client";

export function TactileButton({ children, ...props }) {
  return (
    <m.button
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.8 }}
      {...props}
    >
      {children}
    </m.button>
  );
}
```

### 2. Direct Manipulation: 1:1 Tracking & Boundary Resistance
When dragging, swiping, or pulling a sheet, slider, or carousel:
- Content must remain glued to the finger or pointer without jumping to center.
- Always use Pointer Events with `setPointerCapture` so tracking persists even if the pointer strays outside element boundaries.
- **Rubber Banding**: When pulled beyond bounds, apply logarithmic resistance rather than a hard stop:
  $$\Delta x_{\text{visual}} = \Delta x_{\text{pull}} \times 0.35$$
  When released, spring snap back to boundary using `springs.snappy`.

### 3. Momentum & Velocity Inheritance
- When the user flings or releases a gesture, the resulting transition must inherit the user's exit velocity rather than resetting to a static velocity curve.
- Springs handle this naturally because they model continuous physical energy:
  $$\text{Energy} = \frac{1}{2}mv^2 + \frac{1}{2}kx^2$$

### 4. Instant Interruptibility
- Any animation in flight can be grabbed, reversed, or redirected mid-motion without visual snapping or state desync.
- Never disable user input while an animation runs unless the action is strictly destructive or awaiting a server lock.

---

## 🎛️ Standard Spring Physics Tokens (`tokens/motion.ts`)

Instead of arbitrary `cubic-bezier()` or linear CSS easing, all UI motion is governed by four calibrated spring configurations:

```typescript
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
} as const;
```

---

## 📐 Scale & Origin Invariants

1. **Modal and Dialog Entry**:
   - **Never animate from `scale(0)`**. Nothing in reality appears from a dimensionless dot.
   - Enter from `scale(0.95)` with `opacity: 0` to `scale(1.0)` with `opacity: 1`.
2. **Popovers and Dropdown Menus**:
   - Anchor `transform-origin` to the trigger element (`transform-origin: var(--transform-origin)`).
   - Enter from `scale(0.96)` and slide $4\text{px}$ in the direction of the popover placement.
3. **Sliding Indicator / Tabs**:
   - Use `layoutId="active-indicator"` in `motion/react` so the visual pill glides seamlessly between active items with zero manual coordinate math:

```tsx
import * as React from "react";
import * as m from "motion/react-client";

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
            className="relative z-10 px-3 py-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
            data-active={isActive}
          >
            {isActive && (
              <m.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-md bg-card shadow-sm"
                transition={{ type: "spring", stiffness: 550, damping: 35, mass: 0.6 }}
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

---

## 🌐 Modern CSS Spring Approximation (CSS-Only Fallback)

When JavaScript motion is not required or when rendering SSR/static HTML, use calibrated CSS `linear()` spring easing:

```css
:root {
  /* Apple-calibrated CSS spring curve */
  --ease-spring: linear(
    0, 0.006, 0.025 2.8%, 0.101 6.1%, 0.539 18.9%,
    0.721 25.3%, 0.849 31.5%, 0.937 38.1%, 0.968 41.8%,
    0.991 45.7%, 1.002 50.1%, 1.003 56.4%, 1
  );
}

.button-press {
  transition: transform 120ms var(--ease-spring);
}
.button-press:active {
  transform: scale(0.975);
}
```

---

## 🚫 Theme-Switching Transition Suppression (Crucial)

When switching between light and dark modes, browsers attempt to animate color properties on all elements if transitions are set globally. This causes a slow, muddy "rainbow smear."

**Always suppress transitions during theme toggling**:

```typescript
export function disableTransitionsTemporarily() {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `* {
         -webkit-transition: none !important;
         -moz-transition: none !important;
         -o-transition: none !important;
         -ms-transition: none !important;
         transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force reflow to commit DOM class changes before restoring transitions
    (() => window.getComputedStyle(document.body))();
    document.head.removeChild(css);
  };
}
```

---

## 🚫 Compositing Invariants (Zero Layout Shifts)

To maintain 60–120 FPS performance:

1. **Only Animate Compositor Properties**:
   - ✅ Allowed: `transform` (`translate`, `scale`, `rotate`), `opacity`.
   - ❌ Strictly Banned: `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`.
2. **Use Layout Projection for Spatial Morphing**:
   - When an element changes size or position (e.g. expandable pills, accordions, dynamic search bars), **never animate `width: auto` or `padding` directly**.
   - Instead, attach the `layout` prop from `motion/react`:
     ```tsx
     {/* Motion's layout projection converts bounding box changes into GPU transforms */}
     <m.button layout transition={springs.snappy}>
       <Icon />
       {isExpanded && <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Label</m.span>}
     </m.button>
     ```
   - Motion uses the FLIP technique (First, Last, Invert, Play) to invert the dimension change into an instantaneous `transform: scale()` matrix, executing the expansion on the GPU at 120 FPS without a single CPU layout reflow.
3. **Respect `prefers-reduced-motion`**:
   - If `prefers-reduced-motion` is enabled, spring animations must instantly resolve or fallback to simple, subtle opacity cross-fades without spatial displacement:

```tsx
import { useReducedMotion } from "motion/react";

const shouldReduceMotion = useReducedMotion();
const transition = shouldReduceMotion
  ? { duration: 0 }
  : { type: "spring", stiffness: 600, damping: 30 };
```

---

## 📋 Motion Review Checklist

When auditing animations in code:
- [ ] Is there any `transition: all`? *(Replace with specific properties).*
- [ ] Is feedback instant on `pointerdown`? *(Ensure active state yields on press).*
- [ ] Does any dialog animate from `scale(0)`? *(Fix to `scale(0.95)`).*
- [ ] Are tabs or segment controls animating via `layoutId`?
- [ ] Does theme switching trigger unintended color transitions? *(Suppress transitions during theme toggle).*
- [ ] Does it respect `prefers-reduced-motion`?
