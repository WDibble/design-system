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

## 🎬 The 5 State Transition Mechanics (Kinetic Storytelling)

Interfaces must not abruptly snap between states; they must maintain kinetic continuity so the human brain preserves spatial orientation.

### 1. The Morphing Feedback Loop (Idle ➔ Loading ➔ Success ➔ Idle)
When executing an async trigger (e.g. Save, Deploy, Copy, Submit), do not leave the user wondering if the request resolved. Complete the kinetic narrative within the button:
- **Idle**: Regular label and icon.
- **Loading**: Intrinsic width locked, label cross-fades to centered spinning loader.
- **Success**: Button surface tints affirmative green (`bg-emerald-500/15 border-emerald-500/30`), an SVG checkmark springs in with elastic overshoot (`scale: [0, 1.2, 1]`), and label confirms *"Saved!"* or *"Copied!"*.
- **Auto-Restoration**: Holds the success state for $1.5\text{--}2.0\text{s}$, then gently glides back to Idle.
- **Cohesive Parallel Staging & Invariant Opacity**: Writing, coloring, and sizing must always animate in unified lockstep:
  1. **Zero Disabled Brightness Strobe**: An active async button (`aria-busy="true"`) must NEVER have `disabled:opacity-50` applied while loading. Dimming to 50% and then removing `disabled` on success causes an instantaneous 0ms snap from 50% to 100% brightness, which strobes the original dark idle appearance right before the color finishes interpolating. Always preserve 100% surface opacity during operational async states (`[&:disabled:not([aria-busy='true'])]:opacity-50`).
  2. **Synchronized State Transitions (`mode="popLayout"`)**: Never make the user stare at an empty button with a blank delay (the `mode="wait"` anti-pattern). Instead, animate exiting and entering content in parallel (`mode="popLayout"` paired with an invisible ghost footprint sizer).
  3. **Root Stem Isolation & Checkmark Spring**: When transitioning between states sharing a common morphological prefix (e.g. *"Deploy"* in *"Deploying"* and *"Deployed"*), use subtle scale-fading (`initial: scale: 0.95, opacity: 0; animate: scale: 1, opacity: 1; exit: scale: 0.95, opacity: 0`) and spring the checkmark (`scale: [0.5, 1.0]`) into place alongside a crisp `duration-150` background tint transition so the user's eye immediately registers the affirmative green confirmation without any prefix ghosting or lingering idle impressions.
- **Minimum State Dwell Time**: Async loading states must remain active for a minimum of $400\text{--}500\text{ms}$. Instantaneous network responses that flash a spinner for $<100\text{ms}$ look like broken visual flickers.

### 2. The Rolling Odometer Number Ticker (Spring Digit Flip)
When numeric metrics, prices, countdowns, or counter badges update:
- Never let numbers pop abruptly from one integer to another.
- Use a vertical **rolling digit ticker** where each individual numeric column translates vertically (`translateY`) using `springs.snappy`.
- **Invariants**:
  - Must enforce `tabular-nums font-mono` and wrap digits in `overflow-hidden` with a fixed line height (`leading-none`) so the width of the number remains strictly invariant during rolling.
  - **Exact Unit-Height Step Invariant**: Never use percentage translation (`y: -${digit * 10}%`) for digit columns. In CSS Flexbox, flex items stretch or shrink to match parent container constraints, causing percentage transforms to evaluate against the parent's `1em` height rather than the 10-digit stack (translating by $1/10\text{th}$ of a digit and leaving numbers visually sliced and stuck halfway). Always enforce `shrink-0 h-[1em] w-full leading-none` on every digit child and translate the column via `y: -${digit}em`, guaranteeing mathematically exact 1-to-1 digit baseline indexing.

### 3. Directional Micro-Kinetic Icon Intent
Interactive controls that lead to a destination or trigger an action must communicate intent on hover:
- Forward actions (e.g. "Continue", "Explore"): Icon translates $2\text{--}4\text{px}$ in the direction of action (`group-hover:translate-x-1`) with spring recoil.
- Download / Save actions: Icon dips downward ($2\text{px}$) on hover and rebounds.
- Dismiss / Close actions: Icon rotates slightly (e.g. $90^\circ$) on hover.

### 4. Specular Pointer Tracking (Ambient Surface Illumination)
High-craft cards and primary action buttons can track cursor coordinates on mousemove:
- Computes relative mouse position $(x, y)$ inside the container.
- Renders an ultra-subtle ambient radial highlight (`radial-gradient(circle at ${x}px ${y}px, oklch(1 0 0 / 0.08), transparent 60%)`).
- Grounds the surface with physical, directional light without artificial neon glow.

### 5. Shared Layout Indicators (`layoutId`)
When toggling between segmented buttons, tabs, or radio options, never fade the active indicator in and out:
- Attach `layoutId="active-indicator"` to the selection pill.
- The indicator physically slides, squishes slightly during flight, and settles into the new position via `springs.snappy`.

### 6. Kinetic Stepper Hold-to-Repeat (The Momentum Ramp)
When designing numeric steppers, counters, or quantity controls, clicking dozens of times causes interaction fatigue. Wrap stepping logic into self-contained primitives adhering to the **4 Laws of Press-and-Hold**:
1. **Immediate Initial Tick (`0ms`)**: The first increment/decrement executes synchronously on `pointerdown` (Directive #1: instant physical yield).
2. **Dwell Threshold ($400\text{ms}$)**: Single clicks never trigger auto-repeat; continuous stepping only initiates after holding for a $400\text{ms}$ dwell period.
3. **Kinetic Acceleration Ramp**: The repeat loop begins with a deliberate, precision cadence ($140\text{ms}$) and smoothly accelerates down to peak speed ($35\text{ms}$) via an exponential decay factor ($\approx 0.88$ per tick).
4. **Window-Level Pointer Cleanup**: Release listeners (`pointerup`, `pointercancel`) must attach to `window`. If the user drags their finger or mouse outside the control boundary, the stepping loop cancels immediately, preventing runaway counts.
5. **Self-Contained Encapsulation**: Expose the stepper as a plug-and-play compound component (`<Stepper>`) that packages state management, boundary clamping (`min`/`max`), rolling odometer physics, and hold-to-repeat buttons natively.

### 7. Kinetic Icon Invariants: The Reversible Mechanical Affordance Doctrine
Never animate an icon simply because it is technically possible. Most animated icons in the wild feel like cheap gimmicks. Enforce high-taste kinetic selection:

1. **The Reversible Mechanical Test**:
   - An icon is permitted to be kinetic **only if** it exhibits a physical, mechanical affordance that glides along an axis or hinges open, and **smoothly returns to its exact resting position** upon pointer leave (`onMouseLeave`) or release (`onPointerUp`).
   - ✅ **Permitted Kinetic Affordances**:
     - *Sliders / Filter (`SlidersHorizontalIcon`)*: Knobs physically slide along rails on spring dynamics, then glide back.
     - *Vehicle / Delivery (`SendIcon`)*: Paper plane banks up-right on trajectory, then returns smoothly to resting position.
     - *Physical Lids / Hinges (`Trash2Icon` / `DeleteIcon`)*: Can lid pops open on hover/press and snaps shut on release.
     - *Depth / Separation (`CopyIcon`)*: Foreground sheet lifts away with tactile depth and springs back into place.
2. **Strict Negative Bans on Gimmick Icon Motion**:
   - 🚫 **No Vanishing / Path Redrawing from Nothing**: Never animate `opacity: [0, 1]` or `pathLength: [0, 1]` on steady-state or interactive icons (e.g. checkmarks disappearing into thin air and redrawing themselves). This looks like a visual glitch, not high craft.
   - 🚫 **No Symmetrical Spinning in Circles**: Never rotate symmetrical operational glyphs (e.g. spinning a plus icon `+` $180^\circ$ or $360^\circ$). Spinning a crosshair or plus sign flips its arms pointlessly and creates visual noise.
   - 🚫 **No Path Shriveling / Twitching**: Never morph or shrink geometry stems (e.g. arrow shafts shortening or compressing backwards on forward CTAs).
3. **Static Default for Operational & Numerical Glyphs**:
   - Operational, arithmetic, confirmation, and decorative badge icons (`Check`, `Plus`, `Minus`, `ArrowRight`, `Sun`, `Moon`, `Zap`, `Sparkles`) **must be rock-solid and static**.
   - Tactile feedback on these controls must come strictly from the button's physical yield (`whileTap={{ scale: 0.975 }}`) and typography motion (rolling odometer), never from glyph gymnastics.
4. **Choice of Trigger (`hover` vs `press`)**:
   - On interactive buttons, support explicit choice via `iconTrigger?: "hover" | "press" | "both"`.
   - When set to `"press"`, the mechanical animation executes on `pointerdown` synchronously with the button yield (Directive #1), providing instant physical feedback under the fingertip.

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
- [ ] Does any animated icon violate the Reversible Mechanical Affordance Doctrine? *(Reject spinning plus signs, disappearing checkmarks, and path-shriveling arrows; ensure static operational glyphs).*
