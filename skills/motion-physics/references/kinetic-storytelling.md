# State Transition Mechanics & Kinetic Icon Affordances

Interfaces must not snap abruptly between states; they maintain kinetic continuity so the user preserves spatial orientation across async lifecycles, numeric updates, and pointer interactions.

---

## 1. The Morphing Feedback Loop (Idle -> Loading -> Success -> Idle)

When executing an asynchronous trigger (Save, Deploy, Copy, Submit), complete the kinetic narrative inside the button rather than relying on detached toast popups:

- **Idle**: Regular label and icon.
- **Loading**: Intrinsic width locked, label cross-fades to centred spinning loader.
- **Success**: Button surface tints affirmative green (`bg-emerald-500/15 border-emerald-500/30`), an SVG checkmark springs in with elastic overshoot (`scale: [0, 1.2, 1]`), and the label confirms _"Saved!"_ or _"Copied!"_.
- **Auto-Restoration**: Holds the success state for `1.5s to 2.0s`, then glides back to Idle.
- **Cohesive Parallel Staging & Invariant Opacity**: Label copy, colour, and sizing animate in unified lockstep:
  1. **Zero Disabled Brightness Strobe**: An active async button (`aria-busy="true"`) must NEVER apply `disabled:opacity-50` while loading. Dimming to 50% and removing `disabled` on success causes a 0ms brightness jump right before colour interpolation finishes. Always preserve 100% surface opacity during operational async states (`[&:disabled:not([aria-busy='true'])]:opacity-50`).
  2. **Synchronised State Transitions (`mode="popLayout"`)**: Avoid blank empty-button delays (`mode="wait"`). Animate exiting and entering content in parallel using `mode="popLayout"` paired with an invisible ghost footprint sizer.
  3. **Root Stem Isolation & Checkmark Spring**: When transitioning between states sharing a morphological prefix (such as _"Deploy"_ in _"Deploying"_ and _"Deployed"_), pair subtle scale-fading (`initial: scale: 0.95, opacity: 0; animate: scale: 1, opacity: 1; exit: scale: 0.95, opacity: 0`) with a sprung checkmark (`scale: [0.5, 1.0]`) and a crisp `duration-150` background tint transition.
- **Minimum State Dwell Time**: Keep async loading states visible for at least `400ms to 500ms`. Sub-`100ms` responses that flash a spinner read as visual glitches.

---

## 2. The Rolling Odometer Number Ticker (Spring Digit Flip)

When numeric metrics, prices, countdowns, or counters update:

- Never pop digits abruptly between integers.
- Translate each individual numeric digit column vertically (`translateY`) using `springs.snappy`.
- **Invariants**:
  - Enforce `tabular-nums font-mono` inside `overflow-hidden` wrappers with fixed `leading-none` so horizontal bounding width stays locked during rolling.
  - **Exact Unit-Height Step Invariant**: Never use percentage translation (`y: -${digit * 10}%`) on digit columns. Inside flex layouts, percentage transforms evaluate against the `1em` parent frame instead of the 10-digit stack (translating by `1/10th` of a digit and slicing numbers halfway). Always enforce `shrink-0 h-[1em] w-full leading-none` on every digit child and translate via `y: -${digit}em` for exact `1:1` baseline indexing.

---

## 3. Directional Micro-Kinetic Icon Intent

Interactive controls leading to destinations or file transfers communicate direction on hover:

- **Forward navigation actions** (e.g. "Continue", "Explore"): Icon translates `2px to 4px` along the motion vector (`group-hover:translate-x-1`) with spring recoil.
- **Download / Save actions**: Icon dips downward (`2px`) on hover and rebounds.
- **Dismiss / Close actions**: Icon rotates slightly (for example `90deg`) on hover only when asymmetrical or hinged; symmetrical crosshairs remain static.

---

## 4. Specular Pointer Tracking (Ambient Surface Illumination)

High-craft surfaces and primary buttons may track relative pointer coordinates `(x, y)` on `pointermove` and render an understated ambient radial gradient (`radial-gradient(circle at ${x}px ${y}px, oklch(1 0 0 / 0.08), transparent 60%)`) to ground surfaces in physical directional light without neon glow.

---

## 5. Shared Layout Indicators (`layoutId`)

When switching between segmented buttons, tabs, or radio pills, attach `layoutId="active-indicator"` to the selection pill so the active indicator glides and settles into the new position via `springs.snappy`.

---

## 6. Kinetic Stepper Hold-to-Repeat (The Momentum Ramp)

Numeric steppers and quantity controls wrap stepping behaviour inside self-contained compound primitives following the **4 Laws of Press-and-Hold**:

1. **Immediate Initial Tick (`0ms`)**: The first increment or decrement executes synchronously on `pointerdown` (instant physical yield).
2. **Dwell Threshold (`400ms`)**: Single clicks never trigger auto-repeat; continuous stepping begins only after holding for a `400ms` dwell period.
3. **Kinetic Acceleration Ramp**: Repeat intervals start at `140ms` and decay smoothly toward a `35ms` ceiling using an exponential factor (`~0.88` per tick).
4. **Window-Level Pointer Cleanup**: Attach `pointerup` and `pointercancel` listeners to `window` so dragging out of the button cancels the loop cleanly without runaway counts.
5. **Self-Contained Encapsulation**: Expose `<Stepper>` as a compound primitive packaging clamping (`min`/`max`), rolling odometer digits, and hold-to-repeat triggers.

---

## 7. Kinetic Icon Invariants: The Reversible Mechanical Affordance Doctrine

Only animate an icon when it embodies a true physical mechanism:

1. **The Reversible Mechanical Test**: An icon may animate **only if** it exhibits a reversible mechanical affordance that moves along a rail or hinge and **returns smoothly to its exact resting origin** on pointer leave (`onMouseLeave`) or release (`onPointerUp`).
   - **Permitted Kinetic Affordances**:
     - _Sliders / Filter (`SlidersHorizontalIcon`)_: Knobs slide along rails on spring dynamics, then glide back.
     - _Vehicle / Delivery (`SendIcon`)_: Paper plane banks up-right along its vector, then settles back to origin.
     - _Physical Lids / Hinges (`Trash2Icon` / `DeleteIcon`)_: Lid lifts cleanly on hover/press and closes on release.
     - _Depth / Separation (`CopyIcon`)_: Foreground sheet lifts with tactile depth and springs back into alignment.
2. **Negative Bans on Gimmick Icon Motion**:
   - **No Vanishing / Path Redrawing from Nothing**: Never animate `opacity: [0, 1]` or `pathLength: [0, 1]` on steady-state or interactive glyphs.
   - **No Symmetrical Spinning in Circles**: Never spin symmetrical operational icons (such as rotating `+` by `180deg` or `360deg`).
   - **No Path Shriveling / Twitching**: Never shrink arrow shafts backwards on forward CTAs.
3. **Static Default for Operational Glyphs**: Operational, arithmetic, confirmation, and badge glyphs (`Check`, `Plus`, `Minus`, `ArrowRight`, `Sun`, `Moon`, `Zap`, `Sparkles`) **must remain static**. Tactile response comes from the parent control's `whileTap={{ scale: 0.975 }}` compression and tabular numeric ticks.
4. **Choice of Trigger (`hover` vs `press`)**: Support explicit `iconTrigger?: "hover" | "press" | "both"`. When set to `"press"`, run the icon animation synchronously on `pointerdown` alongside button yield.
