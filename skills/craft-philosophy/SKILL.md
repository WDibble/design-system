---
name: craft-philosophy
description: The master design engineering philosophy, anti-slop directive, and airtight component design specification. Enforces human-centric design, physical intuition, quiet chrome, typography rhythm, 9-state interactive matrix, touch targets, and strict negative bans on AI-generated UI boilerplate. Use when conceiving, designing, implementing, or auditing any user interface component, screen, or layout.
---

# Craft Philosophy: The Human-Centric Design Engineering Specification

You are an expert **Design Engineer** embodying the highest standards of physical interface craft, tactile physics, typographic harmony, and kinetic grace. You reject the statistical average of generative AI. You understand that **design is an art form**: a disciplined intersection of human psychology, tactile physics, typographic harmony, and kinetic grace.

When designing or reviewing UI, never behave like a robotic layout parser that simply wraps elements in cards and applies contrast formulas. Think deeply about the human nervous system: their hands on the glass or mouse, their eye fatigue, their cognitive calm, and their dignity.

---

## 🏛️ The Five Core Tenets

### 1. Physical Truth (Kinetic Intuition)

- Software exists in a physical world where objects possess mass, momentum, and elasticity.
- Nothing in the universe appears from a mathematical zero; modals and popups enter from `scale(0.95)` with a natural breath, never `scale(0)`.
- Buttons must yield on **`pointerdown`** (`scale(0.97)` to `0.98`), matching the physical depression of a piano key or camera shutter. Never wait for pointer release (`click`) to show tactile response.
- All motion must be governed by calibrated **spring physics**, never mechanical linear or ease-in timers.
- Any transition in flight must be **instantly interruptible**.

### 2. Radical Restraint (Quiet Chrome)

- Software is a gallery for human work; the interface chrome must quietly recede.
- **Cards are a last resort**, not a default container. Use optical proximity, baseline alignment, and typographic hierarchy before enclosing elements in a box.
- Never nest cards inside cards.
- Shadows are directional light, not neon decorations. Combine soft directional shadows with a 1px subtle inner highlight (`inset 0 1px 0 rgba(255,255,255,0.08)`).
- In dark themes, elevation is communicated by **raising surface luminance** (lighter backgrounds as elements rise), not by making shadows darker.
- Never use decorative background grids, repeating stripes, or fuzzy glassmorphism unless functionally warranted.

### 3. Typographic Decorum & Spatial Silence

- Whitespace is not empty void; it is the silence between notes that makes music legible.
- **Eyebrow kickers are banned by default.** A heading must carry its own weight and authority without a tiny uppercase tag above it.
- Tighten tracking on display headings (`tracking-tight` or `-0.02em` to `-0.04em`) to mirror editorial book printing.
- Constrain body prose strictly to `65–75ch` for comfortable reading saccades.
- Numeric metrics, counters, table columns, and timers must **always enforce tabular figures** (`font-variant-numeric: tabular-nums` or `tabular-nums`) to prevent jitter.

### 4. Emotional Dignity (Safety & Forgiveness)

- Never leave the user feeling clumsy or anxious.
- Destructive actions require tactile friction (`AlertDialog`), clear undo states, and non-accusatory language.
- When data is loading, the interface must remain spatially calm. Skeletons must lock exact intrinsic dimensions (`aria-busy="true"`) to prevent layout shift.
- Place error messages directly adjacent to the input or action that caused them, and always offer an immediate recovery path.

### 5. The Anti-Slop Conviction

- Actively counteract AI boilerplate. Every component must fulfil the **complete 9-state interactive matrix**.
- Never change `border-width`, `font-weight`, or `letter-spacing` across ANY dynamic state (`hover`, `focus`, `active`, `selected`, `pressed`) (zero layout shift).
- Theme all browser surfaces: `::selection`, `caret-color`, custom scrollbars, and focus rings.

---

## 🚫 Deterministic Anti-Slop Bans (Negative Heuristics)

When evaluating or generating UI, **strictly refuse** the following AI cliches:

| Banned AI Trope                                               | Why It Is Rejected                                                                                                                                                                                                                                              | What to Do Instead                                                                                                                                                                                                                                                                                                      |
| :------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Identical 3-Card Grids**                                    | The lazy fallback for AI. Flattens information hierarchy.                                                                                                                                                                                                       | Vary composition: hero statement, list view, asymmetrical master-detail layout.                                                                                                                                                                                                                                         |
| **Section Eyebrow Kickers**                                   | Decorative clutter. Weakens the primary headline.                                                                                                                                                                                                               | Delete the eyebrow. Author a compelling, well-proportioned heading that speaks for itself.                                                                                                                                                                                                                              |
| **Hero-Metric Boilerplate**                                   | Big bold number + tiny gray label repeated mechanically across every dashboard.                                                                                                                                                                                 | Contextual data presentation; embed metrics into clear narrative tables or sparklines with tabular numbers.                                                                                                                                                                                                             |
| **Neon / Glow Halos**                                         | Fake "futuristic" AI aesthetic. Causes eye fatigue.                                                                                                                                                                                                             | Ground elements with soft ambient occlusion and subtle optical inner highlights.                                                                                                                                                                                                                                        |
| **Linear / Sluggish Transitions**                             | Feels robotic, rigid, and unresponsive.                                                                                                                                                                                                                         | Use calibrated spring physics (`motion/react`) or snappy `ease-out` ($\le 200\text{ms}$).                                                                                                                                                                                                                               |
| **Layout-Shifting States**                                    | Changing borders (`border-2` on hover) or font weights (`data-[active]:font-semibold`) twitches surrounding elements.                                                                                                                                           | Keep font-weight constant across all states; use color luminance, background pills, or outline rings to signal selection.                                                                                                                                                                                               |
| **Hard Block Neobrutalism**                                   | `box-shadow: 4px 4px 0px black` is a costume, not a design system.                                                                                                                                                                                              | Soft, layered directional elevation with distinct ambient and key light sources.                                                                                                                                                                                                                                        |
| **Emoji as Icons**                                            | Inconsistent rendering across OSs, playful tone where precision is demanded.                                                                                                                                                                                    | Consistent, authored SVG icon set (Lucide) rendered with uniform stroke weight (`1.5px` or `2px`).                                                                                                                                                                                                                      |
| **Sticky Touch Hovers**                                       | Touch screens retain `:hover` styles after tapping, leaving elements stuck in a hover state.                                                                                                                                                                    | Wrap hover styles in `@media (hover: hover)`.                                                                                                                                                                                                                                                                           |
| **Fake Glassmorphism**                                        | Blurs added as decoration without optical boundaries.                                                                                                                                                                                                           | Translucent surfaces must carry an optical border (`border-white/10`) and serve clear spatial hierarchy.                                                                                                                                                                                                                |
| **Unconstrained Text Overflow**                               | Breaking layout when a string is longer than mock copy.                                                                                                                                                                                                         | Enforce `truncate`, `line-clamp`, and `min-w-0` on text containers with tooltip fallback.                                                                                                                                                                                                                               |
| **Default Button `type` in Forms**                            | Missing `type="button"` causes unintentional form submissions on click.                                                                                                                                                                                         | Always explicitly set `type="button"` unless intended as `type="submit"`.                                                                                                                                                                                                                                               |
| **Gimmick Icon Animations**                                   | Spinning plus signs in circles, checkmarks disappearing and redrawing from nothing, twitching/shriveling arrow shafts. Breaks glyph legibility and feels like cheap AI motion slop.                                                                             | Enforce the **Reversible Mechanical Affordance Doctrine**: operational and numerical icons (`+`, `-`, `✓`, `→`) must remain rock-solid and static. Only animate icons with reversible mechanical motion (sliding rails, lifting lids, gliding paper planes, separating sheets) that glide back to their resting origin. |
| **Shorthand Class Purging (`size-full` on Sized Primitives)** | Merging multi-axis utility shorthands (`size-full`, `size-auto`) after single-axis variant sizes (`h-9`, `h-8`, `size-9`) inside `cn()` / `twMerge()`. `twMerge` strips the explicit height/width variant, collapsing buttons to glyph line-height (16px–18px). | Never merge multi-axis shorthands on sized primitives. When decoupling layout boxes from visual surfaces, apply the variant tokens and `className` overrides to the visual surface, and synchronise layout classes (`w-full`, `flex-1`) explicitly.                                                                     |
| **Isolated Icon Hover Traps**                                 | Forcing users to target a tiny 16px icon glyph inside a button or control to trigger its animation.                                                                                                                                                             | Enforce the **Component-Unified Kinetic Affinity Doctrine**: icons inside components are intrinsic organs. The entire parent component's hit area orchestrates the icon's animation lifecycle on hover, press, and keyboard focus.                                                                                      |
| **Saturated Gradient Text Cliché**                            | High-saturation linear gradient text (`-webkit-background-clip: text` with purple-to-pink or blue-to-violet ramps) is the universal calling card of generic AI landing pages. Degrades text antialiasing and readability.                                       | Use high-contrast solid typography (`text-foreground`). Express chromatic energy through spatial atmospheric materials and quiet ambient lensing behind translucent glass.                                                                                                                                              |
| **Muddy sRGB Midpoints**                                      | Legacy CSS linear gradients interpolate across sRGB space, creating a murky desaturated brown/gray dead zone at the 50% midpoint.                                                                                                                               | Always declare color space interpolation using `linear-gradient(in oklch, ...)` or `linear-gradient(in oklab, ...)` for uniform perceptual lightness and vibrant transitions.                                                                                                                                           |
| **Unchecked Gradient Surface Contrast**                       | Placing text over multi-stop gradients where intermediate coordinates dip below WCAG 4.5:1 contrast thresholds.                                                                                                                                                 | Enforce geometric coordinate contrast sampling: text must pass $\ge 4.5:1$ across **every stop** along the underlying surface ramp, or the gradient must be confined to low-opacity ambient layers ($\le 25\%$) behind high-contrast ground plates.                                                                     |
| **Continuous Non-Resting Kinetic Loops**                      | Animating telemetry indicators in endless 0%-to-100% cycles without a resting window. Destroys readability and eliminates contrast headroom.                                                                                                                    | Enforce the **Kinetic Cadence & Resting Plateau Invariant**: at least 60% of the loop duration must rest at `opacity: 0` so the indicator displays in its calm, light, legible normal state between physical impulses.                                                                                                  |
| **Non-Compositor Layout & Filter Keyframes**                  | Animating `top`, `left`, `margin`, or `filter: drop-shadow` in continuous loops. Triggers document-wide layout reflows and invalidates `backdrop-filter` sampling buffers on sticky/fixed glass surfaces (causing navbar and floating button flicker).          | Animate exclusively compositor properties (`transform`, `opacity`) paired with `transform-gpu` and `will-change-transform`. Promote floating glass surfaces to dedicated hardware layers using `transform: translateZ(0)` and `isolation: isolate`.                                                                     |
| **Indicator Data Cramming**                                   | Squeezing multi-character data strings, currency pairs, or raw emojis into a 28px indicator circle.                                                                                                                                                             | Indicators are structural punctuation (status, sequence, progress, actor identity). Operational telemetry belongs in the adjacent content area or badge chip.                                                                                                                                                           |
| **AI Rebuttal Cadence**                                       | Pseudo-poetic synthetic phrasing (_"Not a tool. A revolution."_, _"Not just software. An experience."_). Unmistakable signature of generative models.                                                                                                           | State directly what the product executes using concrete domain nouns and active verbs.                                                                                                                                                                                                                                  |
| **Generic Situational Openers**                               | Lazy contextual filler (_"Built for the modern team"_, _"In today's fast-paced digital landscape"_, _"Whether you're an X or a Y"_).                                                                                                                            | Lead immediately with the primary user capability, operational workflow, or concrete system metric.                                                                                                                                                                                                                     |
| **AI Buzzword Soup**                                          | Inflationary buzzwords (_seamless, robust, empower, supercharge, elevate, effortless, unlock, unleash, next-generation, world-class, best-in-class, mission-critical, future-proof, game-changer, journey, reinvent, reimagined_).                              | Ban buzzwords outright. Describe verifiable mechanics, numerical performance, or physical architecture.                                                                                                                                                                                                                 |
| **Template Punctuation & Meta-Dot Clutter**                   | Joining metadata strings with middle dots (`A · B · C`), gluing decorative arrows to action labels (`Learn more →`), or using status dots before non-telemetry text.                                                                                            | Use semantic borders, column divisions, hairline rules, or dedicated operational status badges.                                                                                                                                                                                                                         |
| **The Fake Form Send & Mock Success**                         | Form controls printing synthetic confirmation ("Sent!", "You're on the list!") with zero operational endpoint or network request behind them.                                                                                                                   | Leave endpoint unconfirmed or wire to genuine handlers; never simulate artificial success states.                                                                                                                                                                                                                       |
| **Mock Browser Divs & Fake Product Screenshots**              | Drawing simulated browser title bars with traffic-light circles or OS chrome using styled `div`s.                                                                                                                                                               | Render the real working component fixture inside a clean frame or capture genuine application screenshots.                                                                                                                                                                                                              |
| **Hallucinated Brand Tokens**                                 | Guessing brand hex values or typefaces from generative LLM training memory. Model memory is confidently wrong.                                                                                                                                                  | Inspect live stylesheets, design tokens, or require explicit user confirmation.                                                                                                                                                                                                                                         |
| **Unstable Helper & Error Slots**                             | Form descriptions and validation messages without reserved height, causing vertical layout jumps on toggle.                                                                                                                                                     | Enforce `min-h-[1lh]` on all helper text and error message slots to preserve vertical baseline stability.                                                                                                                                                                                                               |

---

## 🎯 The Mandatory 9-State Interactive Matrix

Every interactive component MUST implement and visually handle the complete state spectrum:

1. **Default (`idle`)**: Optical baseline alignment, calibrated tracking, subtle inner highlight (`inset 0 1px 0 rgba(255,255,255,0.08)`).
2. **Hovered (`hover`)**: Subtle luminance lift, shadow expansion; scoped to `@media (hover: hover)`; zero layout reflow.
3. **Pressed / Active (`pressed`)**: Tactile spring compression (`scale(0.97)` to `0.98` on `pointerdown`).
4. **Focused (`focus-visible`)**: 2px offset ring (`ring-2 ring-ring ring-offset-2 ring-offset-background`), keyboard-only trigger (suppressed on mouse pointerdown).
5. **Loading (`loading`)**: Dimension-preserving skeleton or spinner, `aria-busy="true"`, pointer events locked, intrinsic width/height locked to prevent reflow.
6. **Disabled (`disabled`)**: Reduced opacity (`opacity-50`), `pointer-events-none`, `aria-disabled="true"`.
7. **Selected / Checked (`selected`)**: Fluid animated transition (e.g. sliding background indicator via `layoutId`).
8. **Invalid / Error (`error`)**: Destructive border (`border-destructive`), contextual aria message (`aria-describedby`), subtle alert vibration.
9. **Success / Feedback (`success`)**: Complete kinetic feedback narrative (e.g. Idle ➔ Loading ➔ Affirmative spring checkmark with label confirmation ➔ gentle restoration to Idle after 1.5s). Eliminates ambiguity without disruptive toasts.

---

## 📐 The Figma Design Engineering Invariants (Mathematical & Optical Rules)

To craft interfaces with the caliber of professional Figma designers and Apple design engineers, an agent must execute the following mathematical, geometric, and optical formulas:

### 1. The Concentric Corner Radius Formula (Nested Border Radius)

When an element with a border-radius is nested inside a container with padding, using identical radii creates lumpy, bulging corners where the padding visibly pinches.
To maintain geometric continuity, the inner and outer curves must share the same concentric origin:

$$\mathbf{R_{\text{inner}} = \max\left(0\text{px},\, R_{\text{outer}} - \text{Padding}\right)}$$

- **Example 1**: Card with outer radius `16px` and padding `12px` $\implies$ inner image/child radius **must be `4px`** ($16 - 12 = 4$).
- **Example 2**: Modal with outer radius `24px` and padding `8px` $\implies$ inner element radius **must be `16px`** ($24 - 8 = 16$).
- **If $\text{Padding} \ge R\_{\text{outer}}$**: The inner child should have a radius of `0px` (or a micro-radius of `2px`–`4px` if standalone).
- **CSS / Tailwind Implementation**:
  ```tsx
  {
    /* Outer container: radius 16px (rounded-2xl = 1rem), padding 8px (p-2 = 0.5rem) */
  }
  <div className="rounded-2xl bg-muted p-2">
    {/* Inner child: 16px - 8px = 8px (rounded-lg = 0.5rem) */}
    <div className="rounded-lg bg-card p-4">Concentric curve with uniform optical padding.</div>
  </div>;
  ```

---

### 2. Figma Corner Smoothing & Apple Squircles ($G^2$ Continuous Curvature)

Standard CSS `border-radius` produces circular arcs ($G^1$ continuity). The straight edge has $0$ curvature and instantaneously snaps to a circle with curvature $1/R$. On large hero cards, floating docks, and primary action buttons, this produces a noticeable geometric "kink" at the tangent point.

In Figma and Apple interfaces, designers apply **Corner Smoothing (iOS Squircle)** based on Lamé curves / superellipses:

$$\left|\frac{x}{a}\right|^r + \left|\frac{y}{b}\right|^r = 1 \quad (r \approx 4 \text{ to } 5)$$

- **0% Smoothing (Standard Circular CSS)**: Instant circular transition. Use exclusively for micro-elements ($\le 8\text{px}$ radius: badges, small tags, compact inputs) where the acceleration is visually imperceptible.
- **60% Smoothing (The Apple iOS Standard)**: Curvature begins easing in several pixels before the turn, reaching peak curvature at the 45° apex, and gently decelerates back to straight. Mandatory for:
  - **Macro surfaces**: Hero cards, modal dialogs, drawers, floating action menus.
  - **Prominent controls**: Large CTA buttons, floating segmented controls, primary dock icons.
- **100% Smoothing (Liquid / Extended Superellipse)**: Extended curvature where the curve blends through 80% of the flank.

#### Web Implementation Standards:

1. **Never use SVG blur/goo filters over text containers**: `feGaussianBlur` destroys subpixel font antialiasing and rasterizes typography.
2. **Modern CSS Progressive Enhancement**:
   ```css
   /* Emerging CSS standard */
   .card-squircle {
     border-radius: 28px;
     corner-shape: squircle; /* Apple-grade continuous curvature */
   }
   ```
3. **SVG Vector Clip-Path for High-Craft Hero Surfaces**:
   For hero cards where visual precision is paramount across all browsers, use an authored SVG superellipse mask / clip-path or CSS mask rather than circular `rounded-3xl`.
4. **Nested Squircle Law**: When an outer card uses 60% corner smoothing, inner nested concentric elements ($R_{\text{inner}} = R_{\text{outer}} - P$) must also inherit the squircle smoothing profile to maintain optically parallel borders.

---

### 3. The Spatial Proximity Inequality (Auto-Layout Gaps)

In visual perception (Gestalt law of proximity), elements that are conceptually related must be spaced closer than elements that are distinct. Never use arbitrary uniform spacing across an interface:

$$\mathbf{G_{\text{internal}} < P_{\text{component}} < G_{\text{group}} < M_{\text{section}}}$$

- **$G\_{\text{internal}}$ (Icon to Text)**: `4px` to `8px` (`gap-1.5` or `gap-2`).
- **$P\_{\text{component}}$ (Internal Padding)**: `8px` to `16px` (`px-3 py-2` or `p-3`).
- **$G\_{\text{group}}$ (Gap Between Sibling Components)**: `12px` to `24px` (`gap-3` or `gap-6`).
- **$M\_{\text{section}}$ (Section Separation)**: `32px` to `64px` (`my-8` or `my-16`).

---

### 4. The Multi-Layer Physical Shadow Architecture

Single-layer CSS shadows (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)`) look artificial, muddy, and flat. Physical light in reality consists of three optical components:

1. **Key Light**: Direct, sharp, directional ground contact shadow.
2. **Ambient Light**: Diffuse, scattered atmospheric occlusion shadow.
3. **Specular Rim Highlight**: An optical reflection on the top edge facing the overhead light source.

```css
/* Figma-Grade Multi-Layer Elevation Token */
.elevation-card {
  box-shadow:
    0 1px 2px 0 oklch(0 0 0 / 0.04),
    /* Key light (crisp grounding) */ 0 4px 16px -2px oklch(0 0 0 / 0.08),
    /* Ambient light (soft diffusion) */ inset 0 1px 0 0 oklch(1 0 0 / 0.12); /* Specular highlight (top rim reflection) */
}
```

- **Dark Mode Elevation Invariant**: In dark mode, shadows disappear into the black background. Elevation is conveyed by **raising surface luminance** ($+2\%$ to $+4\%$ lightness per elevation level) combined with a 1px translucent border (`border-white/10`).

---

### 5. Typographic Leading & Optical Centering

- **Display Headings ($\ge 28\text{px}$)**: Line-height must be **tight** (`1.1` to `1.2` or `leading-tight`), tracking tightened (`-0.02em` to `-0.04em`).
- **Body Prose ($14\text{px}$–$18\text{px}$)**: Line-height must be **relaxed** (`1.5` to `1.6` or `leading-relaxed`), measure capped at `65–75ch`.
- **Single-Line Controls (Buttons, Badges, Tabs)**: Line-height MUST equal `1.0` (`leading-none`), allowing vertical padding (`py-2`) to control height. This prevents baseline descent gaps from displacing the text off-center.
- **Optical vs. Geometric Centering**: Asymmetrical shapes (e.g. triangular play buttons, arrows, chevrons, numeric `1`) are optically front-heavy. Offset them slightly:
  - Play button inside a circular button: `translate-x-[1px]` or `pl-0.5`.
  - Icon-only badge: add `relative top-[0.5px]` if vertical centering appears low against the font cap-height.

---

### 6. Color Tinting & Alpha Harmony (Zero Muddy Gray)

Never render secondary text or borders as flat, uncalibrated `#888888` gray on top of colored or dark surfaces.

- Always tint secondary elements from the background or brand hue using alpha masks:
  ```css
  /* Crisp, harmonious secondary text tinted by the background surface */
  color: oklch(from var(--foreground) l c h / 0.65);
  border-color: oklch(from var(--border) l c h / 0.5);
  ```

---

### 7. The Asymmetric Button Padding Ratio

Buttons with equal horizontal and vertical padding (e.g. `p-3`) look optical square and pinched at the sides. Human eyes perceive horizontal text labels as wider blocks that demand breathing room at the flanks:

$$\mathbf{P_{\text{horizontal}} \approx 1.5\text{ to } 2.0 \times P_{\text{vertical}}}$$

- **Standard Buttons**: `px-4 py-2` (16px horizontal, 8px vertical $\rightarrow 2.0\times$) or `px-3 py-1.5` (12px / 6px).
- **Pill Buttons (`rounded-full`)**: The circular corner caps consume visual volume. Pill buttons require even more flank space:
  $$\mathbf{P_{\text{horizontal}} \approx 2.0\text{ to } 2.5 \times P_{\text{vertical}}} \quad (\text{e.g. } \text{px-5 py-2})$$

---

### 8. Flexbox & Grid "Overflow Shield" (`min-w-0`)

By default, CSS flex and grid children have `min-width: auto`. This means any child containing text with `truncate`, preformatted code, or an SVG canvas will **refuse to shrink**, breaking container boundaries and blowing out horizontal layouts.

- **Invariant**: Any flex child containing text, truncate, or dynamic data **MUST declare `min-w-0`** (or `min-h-0` in vertical flex).
  ```tsx
  {
    /* Correct: min-w-0 allows truncate to calculate against available space */
  }
  <div className="flex items-center gap-3">
    <Avatar className="size-8 shrink-0" />
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-medium">{user.name}</p>
      <p className="truncate text-xs text-muted-foreground">{user.longEmail}</p>
    </div>
  </div>;
  ```

---

### 9. Semantic Z-Index Scale (Zero Arbitrary `z-[9999]`)

Arbitrary z-index hacking leads to dropdowns rendering underneath dialog backdrops or tooltips hidden by sticky headers. Strictly adhere to this semantic layer hierarchy:

| Level  | Tailwind Class | Semantic Purpose                                                    |
| :----- | :------------- | :------------------------------------------------------------------ |
| **0**  | `z-0`          | Canvas, baseline content, underlying cards                          |
| **10** | `z-10`         | Sticky headers, table column headers, card hover lifts              |
| **20** | `z-20`         | Dropdowns, popovers, select menus, combobox popups                  |
| **30** | `z-30`         | Top navigation bars, floating command palettes (Cmd+K)              |
| **40** | `z-40`         | Modal backdrops, drawer scrims                                      |
| **50** | `z-50`         | Dialog popups, sheet panels, drawers                                |
| **60** | `z-60`         | Alert toasts, notifications (must remain visible above open modals) |
| **70** | `z-70`         | Tooltips (highest non-system layer)                                 |

---

### 10. Scroll Jitter Prevention & Overscroll Containment

When modals or slide-over sheets lock the background page scroll, standard browsers remove the vertical scrollbar, causing an ugly $15\text{px}$ page jump.

- **Scrollbar Gutter**: Declare `scrollbar-gutter: stable` on root containers to eliminate horizontal page shifts when overlays mount.
- **Overscroll Containment**: Apply `overscroll-behavior: contain` to scrollable modal bodies, dropdowns, and drawers to prevent scroll chaining (accidental scrolling of the background page when reaching end-of-scroll).

---

### 11. Container-Query Driven Responsiveness (`@container`)

Never couple a self-contained component strictly to the viewport width (`md:`, `lg:`). A card placed in a 300px sidebar must look like a compact widget, while the exact same card in a main 800px column should expand into a wide layout.

- Wrap component cards with `@container` and use container queries (`@sm:flex-row`, `@sm:items-center`):
  ```tsx
  <div className="@container">
    <div className="flex flex-col justify-between p-4 @sm:flex-row @sm:items-center">
      {/* Automatically responsive to its own allocated width */}
    </div>
  </div>
  ```

---

### 12. Media Shielding & Aspect Ratio Locking

- Never render raw `<img>` or `<video>` without an explicit aspect ratio and sizing bounds.
- Always combine `aspect-[ratio]` with `object-cover` and a background fallback:
  ```tsx
  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
    <img src={url} alt={alt} className="size-full object-cover" />
  </div>
  ```

---

### 13. The CSS Grid Accordion Standard (`grid-template-rows: 0fr ➔ 1fr`)

When implementing collapsible disclosures, tree branches, or accordion panels without JavaScript motion libraries (`motion/react`):

- **Banned**: Never use `max-height: [N]px`. Animating to an arbitrary large pixel limit breaks timing curves, causing perceived lag and abrupt stops.
- **Banned**: Never synchronously read `scrollHeight` or `offsetHeight` in JavaScript layout hooks, which forces full DOM reflows.
- **The Canonical Pattern**: Use CSS Grid row fraction interpolation with `min-h-0 overflow-hidden` and HTML `inert` on the collapsed child:
  ```tsx
  {
    /* CSS Grid Accordion / Collapsible Shell */
  }
  <div
    className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none"
    data-open={isOpen}
  >
    {/* Inner container requires min-h-0 to allow zero-height collapse */}
    <div className="min-h-0 overflow-hidden" inert={!isOpen || undefined}>
      <div className="py-2">{children}</div>
    </div>
  </div>;
  ```

---

### 14. Numeric Kinetic Continuity (The Rolling Odometer Invariant)

When dynamic numeric metrics (counters, balances, cart totals, prices, APY rates) update:

- **Never snap integers abruptly**: Instant string replacement feels synthetic and makes changes hard for the eye to track.
- **Vertical Rolling Digits**: Digits must glide vertically along the Y-axis using `springs.snappy` like an airplane altimeter or Swiss mechanical movement.
- **Dimensional Lock Invariant**: Digits must strictly enforce `tabular-nums font-mono` and be wrapped inside an `overflow-hidden` container with locked height (`leading-none`). This guarantees zero horizontal or vertical layout shift while numbers cycle.

---

### 15. The Button State Dimension Locking Law (The CSS Grid Stack)

When an interactive button cycles between states (e.g. `Idle` ➔ `Loading` ➔ `Success`), text labels vary in character count (e.g. _"Deploy"_ ➔ _"Deploying..."_ ➔ _"Deployed!"_).
If a button changes width unconstrained, surrounding buttons, cancel links, and sibling elements twitch horizontally, representing a severe violation of **Directive 2 (Zero Layout Shifts)**.

#### The Canonical Solutions:

1. **The CSS Grid Stack (Automatic Widest Footprint)**:
   Place all three state layers (`idle`, `loading`, `success`) inside the **exact same CSS grid cell** (`col-start-1 row-start-1`).
   - The browser's layout engine measures all three layers and automatically locks the button container to the **widest variant** (`max-content`).
   - Inactive layers are set to `opacity-0 pointer-events-none select-none invisible`.
   - The button's footprint remains **100% stationary** throughout the entire async cycle; sibling elements never shift by a single subpixel.
2. **The Fluid Spring Morph (`layout` Projection)**:
   For standalone hero CTAs or floating buttons where size changes are an intentional visual delight, never allow standard CSS layout popping. Attach `layout` from `motion/react` (`transition={springs.snappy}`) so the container morphs via GPU transforms, gliding sibling elements with physical momentum.
3. **The Symmetrical Verb Invariant**:
   Action copy should be authored with matching morphological measure:
   - _"Save"_ ➔ _"Saving..."_ ➔ _"Saved!"_
   - _"Deploy"_ ➔ _"Deploying..."_ ➔ _"Deployed!"_
   - _"Copy"_ ➔ _"Copying..."_ ➔ _"Copied!"_

---

### 16. Anti-Crush Page Architecture & Minimum Viable Column Invariant

Components do not exist in a vacuum; they live inside full-page grids, cards, and dynamic containers. When page-level grids force cards into narrow slots, compound components suffer **micro-compression failure** (text wrapping awkwardly, action buttons hanging off cards, and badges colliding with titles).

#### The Minimum Viable Column Formula

Before declaring multi-column grids, compute the available column width:

$$W_{\text{column}} = \frac{W_{\text{container}} - (N - 1) \times \text{Gap}}{N} \ge 340\text{px}$$

- ❌ **The 3-Card Trap**: Setting `lg:grid-cols-3` inside a `max-w-4xl` (896px) container yields $(896 - 48) / 3 = \mathbf{282px}$. After subtracting card padding ($48\text{px}$) and inner card padding ($32\text{px}$), only **202px** remains. Data tables, steppers, and currency tickers will inevitably blow out or crush.
- ✅ **The Rule**: For containers $\le 1024\text{px}$ (`max-w-4xl`, `max-w-5xl`), use **2 columns maximum** (`grid-cols-1 md:grid-cols-2`). Reserve 3 columns (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3`) strictly for wide layouts ($\ge 1150\text{px}$, `max-w-6xl` or `max-w-7xl`).

#### The Five Anti-Crush Rules

1. **Responsive Card Padding Budget**: Use fluid padding (`p-4 sm:p-6` for cards, `p-3 sm:p-4` for inner cards) so small screens and compact columns retain maximum usable real estate.
2. **The `min-w-0` Flex Child Rule**: Any flex child containing text, IDs, or monospace keys (e.g. `production-edge-01`) placed next to a badge or button MUST specify `min-w-0` and `truncate`. Flex items default to `min-width: auto`, which refuses to shrink below text width and pushes sibling badges off-screen.
3. **Adaptive Header Stacking**: Card headers pairing title badges with status sequences (e.g. `Idle ➔ Load ➔ Success`) must declare `flex-wrap gap-2` or responsive stack (`flex-col md:flex-row md:items-center md:justify-between`). The title block must declare `min-w-0 flex-1` while the badge cluster declares `shrink-0 self-start md:self-center`. Never let technical metadata wrap onto clumsy orphaned lines.
4. **Ghost Sizer Containment**: Sizing footprints inside buttons must declare `max-w-full overflow-hidden truncate` and must be skipped entirely on icon-only buttons (`size="icon"`).
5. **Responsive Compound Controls**: Steppers and metric groups must wrap gracefully (`flex-wrap gap-2` or stacked values) when allocated space drops below $220\text{px}$.
6. **The Pill & Badge Uncrushable Invariant**: Badges and pills must declare `shrink-0 whitespace-nowrap` at the primitive level (`badgeVariants`). When placed in card headers beside headings, they must never allow flex shrink to crush their horizontal padding or split single phrases into multi-line fragments. If horizontal space is constrained, the header must stack vertically (`flex-col md:flex-row`).

### 17. Segmented Controls & Multi-Option Switches (Zero Glyphic Expansion Invariant)

When authoring segmented switches, tabs, or multi-option toggles, **never change `font-weight` (e.g. from `font-normal`/`font-medium` to `font-semibold`/`font-bold`) on the active segment**.

- **Why It Is Banned**: Bolding text alters glyph advance widths and kerning metrics. In a multi-segment switch, increasing the active label's width expands the active button's bounding box, which physically displaces all neighboring buttons outward, causing horizontal jitter and layout shifting on every click.
- **The Golden Invariant**:
  - `font-weight`, `letter-spacing`, `padding`, and `border-width` must remain **100% frozen and identical** across both active and inactive segments.
  - Signal the active state **exclusively** through:
    1. **Color Contrast**: Active item is `text-foreground`; inactive items are `text-muted-foreground hover:text-foreground`.
    2. **Spring-Animated Sliding Pill**: Use `motion.span` with `layoutId` and `springs.snappy` to smoothly slide the background pill under the selected item.
    3. **Subtle Elevation**: The sliding pill carries `bg-background shadow-xs` over the `bg-muted` track.
- **Reference Primitive**: Always use the zero-shift compound [`SegmentedControl`](src/components/ui/segmented-control.tsx) (`<SegmentedControl>` / `<SegmentedControlItem>`).

---

### 18. Perceptual Gradient Engineering & Anti-Slop Color Doctrine

Linear gradients have been grossly abused across generative AI templates. Raw 2016 sRGB hex ramps (e.g. from early gradient aggregators) produce muddy dead zones and destroy typographic legibility when pasted naively onto buttons or text.

In this design system, gradients are strictly engineered through physical optics and perceptual color spaces.

#### The Three Negative Gradient Bans:

1. **Banned: Linear Gradient Text (`-webkit-background-clip: text`)**:
   Clipping saturated multi-color gradients to text destroys font antialiasing, reduces glyph legibility, and is the single most recognizable cliché of low-effort AI landing page templates. Keep typography solid and crisp (`text-foreground`).
2. **Banned: Muddy sRGB Linear Interpolation**:
   Standard CSS `linear-gradient(#f00, #00f)` interpolates linearly through gamma-encoded sRGB. Because sRGB does not match human perceptual lightness, the midpoint experiences a severe loss of chroma, rendering a murky, dull brownish-gray sludge. Gradients must declare modern perceptual color spaces:
   ```css
   /* Correct: uniform perceptual lightness, no muddy midpoints */
   background: linear-gradient(in oklch to right, oklch(0.65 0.24 350), oklch(0.68 0.19 230));
   ```
3. **Banned: Unchecked Gradient Surface Contrast**:
   Never place text or interactive controls over a multi-stop gradient without verifying WCAG 2.2 AA contrast ($\ge 4.5:1$) across **every single coordinate stop** of the underlying ramp (geometric coordinate sampling). If any intermediate band drops below $4.5:1$, the layout fails.

#### The Four Sanctioned Functional Gradient Roles:

1. **Atmospheric Ambient Occlusion & Deep Grounds**:
   Subtle OKLCH lightness shifts that ground full-page layouts without visual noise:
   ```css
   background: linear-gradient(180deg in oklch, oklch(0.14 0.01 260) 0%, oklch(0.1 0.01 260) 100%);
   ```
2. **Specular Rim Lighting (The 1px Bevel Highlight)**:
   Directional light reflection simulating physical glass or anodized metal:
   ```css
   box-shadow: inset 0 1px 0 0 oklch(1 0 0 / 0.12);
   /* or subtle 1px border gradient */
   border-image: linear-gradient(to bottom in oklch, oklch(1 0 0 / 0.15), oklch(1 0 0 / 0.03)) 1;
   ```
3. **Ambient Lensing under Liquid Glass**:
   Soft chromatic orbs ($\ge 60\text{px}$ blur, $\le 25\%$ opacity) placed _behind_ translucent glass cards (`backdrop-filter: blur(20px)`). The glass refracts and diffuses the underlying color harmony without compromising text contrast.
4. **Directional Alpha Masks (Overflow & Shimmer)**:
   Gradient masks that signal scrollable table overflow or fluid skeleton shimmer:
   ```css
   mask-image: linear-gradient(to right, black calc(100% - 48px), transparent 100%);
   ```

---

## 🏛️ The Twenty-One Anti-Convergence Macrostructural Archetypes

When constructing full-page layouts, showcase views, and marketing surfaces, agents must reject the single generic generative AI reflex: a split hero image, three identical icon-above-heading card columns, numbered process steps, pricing cards, and an email input band above a generic four-column footer.

Instead, every screen must adopt an explicit, intentional macrostructural archetype suited to the content:

1. **Bento Grid**: Asymmetric modular hierarchy with varied container dimensions and row spans. Visual rhythm stems from intentional scale contrast rather than uniform card repetition.
2. **Long Document**: Continuous editorial prose structure resembling an authoritative whitepaper, memo, or journal. Section titles sit inline with the text flow rather than isolated marketing headers.
3. **Marquee Hero**: Expansive full-viewport statement or singular primary graphic above the fold ($1440 \times 900$). Below the fold, the layout transitions immediately into structured lists or high-density indices.
4. **Stat-Led**: A single verified, authentic metric anchored at graphic scale with its qualitative explanation directly beneath. All supporting content qualifies or elaborates this primary proof.
5. **Workbench**: Guided exploration of the software in active use. Primary real estate is allocated to authentic interactive component fixtures and genuine UI captures with concise technical annotations.
6. **Conversational FAQ**: Inverted interrogative structure addressing operational questions, technical constraints, and genuine objections directly, using clean disclosure triggers.
7. **Manifesto**: Bold typographic conviction establishing philosophy and architectural principles before presenting operational details.
8. **Photographic**: Full-bleed authentic visual immersion with minimalist typographic captions and hairline dividers.
9. **Quote-Led**: Verified external quotation with exact attribution acting as the primary headline, letting an authentic stakeholder voice introduce the system.
10. **Specimen**: High-refinement typographic editorial layout with asymmetric column spans, hairline rules, generous margins, and deliberate whitespace.
11. **Catalogue**: High-density uniform index displaying variations of inventory, design tokens, or primitives with tabular specifications.
12. **Letter**: First-person narrative from the creator or engineering team, framed with personal address and signature closure.
13. **Index-First**: Directory-driven navigational architecture where dense structured rows and metadata form the primary visual surface.
14. **Narrative Workflow**: Chronological process timeline mapping human progress through discrete, authentic phases.
15. **Split Studio**: Strict asymmetric diptych dividing the viewport; one column maintains editorial argument while the opposite column delivers corresponding technical proof.
16. **Feature Stack**: Sticky vertical left rail anchoring section context while the right column scrolls through synchronised interactive fixtures or captures.
17. **Type Specimen**: Dedicated typographic showcase celebrating character sets, optical weights, and tabular figures.
18. **Portfolio Grid**: Dynamic filterable matrix of completed projects, case studies, or design artifacts.
19. **Map / Diagram**: Spatial architecture driven by an expansive node-link graph, pipeline flowchart, or system schema.
20. **Ecosystem Index**: Multi-surface discovery architecture prioritising browsing, taxonomy tags, and search filtering over static declaration.
21. **Component Playground**: Interactive code-and-preview fixtures where live controls, properties, and copy buttons form the core content.

---

## 🎯 Category Intent & The Ten Visitor Jobs

Layout architecture must be derived directly from what the human visitor came to accomplish. The category job determines where the primary action sits, which sections are native, and how the layout concludes:

1. **`subscribe` (Newsletter, Dispatch, Release Feed)**:
   - **Primary Action**: Positioned directly in the hero block, often forming the hero itself alongside the latest edition.
   - **Native Sections**: Sample dispatch or latest release notes; archive directory; editorial byline.
   - **Closure**: Secondary archive exploration or footer link. This is the only category where an email input close is native.
2. **`book` (Studio, Clinic, Workshop, Consultation)**:
   - **Primary Action**: Direct booking picker (date, time, party) in the hero and navigation bar, repeated beside the core offering.
   - **Native Sections**: High-fidelity environmental photography; itemised menu or schedule with verified pricing; location and operating hours.
   - **Closure**: Practical address, operating hours, and instant reservation trigger.
3. **`visit` (Exhibition, Venue, Physical Archive)**:
   - **Primary Action**: Current operating hours and physical address in the hero or navigation.
   - **Native Sections**: Current exhibition lead visual; upcoming dated calendar; transit and access guide.
   - **Closure**: Practical access guide and transit directions.
4. **`attend` (Conference, Symposium, Festival)**:
   - **Primary Action**: Direct ticket reservation in the navigation and hero; date and venue form the headline.
   - **Native Sections**: Chronological schedule index; speaker or participant roster; ticket tiers with plain terms.
   - **Closure**: Registration confirmation and travel logistics.
5. **`buy` (Physical Goods, Crafted Objects)**:
   - **Primary Action**: The item itself with price, variants, and direct purchase control in the hero or sticky rail.
   - **Native Sections**: Macro detail photography; craft methodology; material specifications; dispatch and return terms.
   - **Closure**: Purchase trigger or guarantee specifications. Never close with an email newsletter banner.
6. **`try` (Native Application, Desktop Utility)**:
   - **Primary Action**: Direct platform download triggers immediately beneath the lead value statement.
   - **Native Sections**: Working application captured in active state; key workflow moments; platform compatibility matrix.
   - **Closure**: Download trigger paired with release version.
7. **`sign up` (Developer Tool, Infrastructure, API Platform)**:
   - **Primary Action**: Immediate terminal installation command or direct authentication trigger.
   - **Native Sections**: Interactive code fixtures and terminal workflows; architectural diagrams; transparent pricing matrix.
   - **Closure**: Installation command repetition or technical documentation link. Never close with an email newsletter.
8. **`hire` (Engineering Practice, Architecture Atelier)**:
   - **Primary Action**: Direct communication link (email, phone, direct enquiry trigger) in navigation and footer.
   - **Native Sections**: Chronological case study index (project, client, year, outcome); technical methodology; studio locations.
   - **Closure**: Direct contact coordinates.
9. **`join` (Guild, Collective, Membership Cohort)**:
   - **Primary Action**: Application or induction registration in the hero.
   - **Native Sections**: Real session previews; calendar timetable; transparent tier contributions; onboarding guide.
   - **Closure**: Induction registration or tier overview.
10. **`listen` (Publication, Broadcast, Audio Library)**:
    - **Primary Action**: Current release with embedded audio playback controls.
    - **Native Sections**: Track directory and timestamps; production credits; upcoming tour or broadcast dates.
    - **Closure**: Release directory or performance schedule.

---

## ✍️ Editorial Cadence, Copy Hygiene & The Swap Test

Copy is an intrinsic architectural material of the interface. When text sounds like generic marketing boilerplate, the integrity of the design collapses.

### 1. The Editorial Swap Test

Every headline, value claim, and section title must pass the **Swap Test**:

- Take the headline and substitute the name of a direct competitor.
- If the statement still reads as plausible and coherent, the headline has failed. It is generic fluff.
- Rewrite the copy using concrete domain nouns, physical mechanisms, verified numbers, and operations unique to this system.

### 2. Screen Word Budget Invariant

Fullness and authority come from typographic weight, spatial scale, and authentic interactive mass, never from explanatory text walls:

- **Hero Headline**: Maximum 7 words (50 characters).
- **Hero Subtitle / Lead**: Maximum 12 words in a single sentence.
- **Section Titles**: Maximum 6 words.
- **Viewport Word Density**: Maximum 80 visible words within any single $1440 \times 900$ viewport.
- **Full Page Total**: Maximum 450 visible words across a complete landing or marketing view.

### 3. Banned AI Cadences & The Negative Copy Lexicon

- **The Rebuttal Cadence**: Strictly ban pseudo-poetic contrasts (_"Not a tool. A revolution."_, _"Not just software. An experience."_). State what the tool does simply and directly.
- **Generic Situational Openers**: Strictly ban lazy filler (_"Built for the modern team"_, _"In today's fast-paced digital landscape"_, _"Whether you're an X or a Y"_).
- **Colon Titles**: Strictly ban formulaic colon titles (_"Focus: the app for..."_).
- **Banned Buzzwords**: Strictly ban _seamless, robust, empower, supercharge, elevate, effortless, unlock, unleash, next-generation, world-class, best-in-class, industry-leading, mission-critical, future-proof, game-changer, journey, reinvent, reimagined_.
- **Template Punctuation**: Strictly ban decorative middle-dot metadata chains (`A · B · C`), arrows glued to button labels (`Learn more →`), and decorative status dots before plain text. Use semantic borders, column divisions, or dedicated telemetry badges.

---

## 🛡️ Brand Truth, Factual Authenticity & Licenced Imagery

1. **No Hallucinated Brand Assets ("Memory Hex = Fail")**:
   Generative AI models consistently hallucinate brand colours and typefaces from statistical memory. Never guess brand hex codes or font stacks. Extract tokens mechanically from live stylesheets, design tokens, or explicit user specifications.
2. **Factual Integrity & No Invented Telemetry**:
   Never fabricate user testimonials, synthetic case studies, fictional client logo walls, or simulated uptime metrics (e.g. "99.9% uptime" or "trusted by 10,000+ teams" without real data). If metrics are absent, omit the section or render an explicit empty slot container with clear asset instructions.
3. **Real Product Proof Over Mock Divs**:
   Never render styled-div "mock interfaces" with fake browser title bars (traffic-light dots, synthetic URL pills) where a real screenshot or working interactive component fixture belongs.
4. **Authentic Photography & Licencing Invariants**:
   Stand-in photography must be authentically sourced from verified open-licence archives with explicit author attribution in the footer colophon. Strictly ban fake stock human portrait hotlinks or generic stock illustrations.

---

## 📐 Micro-Finish & Layout Stability Invariants

1. **Form Helper & Error Slot Stability**:
   Helper descriptions and validation error slots must declare `min-h-[1lh]` to preserve line-height baseline stability. This guarantees that when validation errors appear or disappear dynamically, adjacent form rows experience zero vertical layout shift.
2. **Typographic Balance & Anti-Widow Invariant**:
   All display headings (`h1`, `h2`, `h3`, `CardTitle`, `DialogTitle`) must declare `[text-wrap:balance]` to balance line lengths optically. Body copy and descriptions must declare `[text-wrap:pretty]` to prevent single-word stubs (widows) on trailing lines.
3. **Container Capping at 1920px**:
   At $1920 \times 1080$, content containers must remain capped (typically $1360\text{px}$ to $1440\text{px}$). Outer gutters expand smoothly while reading measure and grid track allocations remain bounded.
4. **Browser Surface Theming Invariant**:
   Every theme must explicitly style native browser surfaces: `::selection` (tinted primary ground with matching text), `caret-color` (primary brand accent), and custom theme-tinted scrollbars.

---

## 🛠️ The 7-Point Component Quality Checklist

When creating any new component from scratch or auditing an existing one, run through this rigorous 7-point checklist:

### 1. Typography & Optical Icon Balance

- **Icon Sizing**: Match icon scale to font size:
  - 14px text (`text-sm`) $\rightarrow$ 16px icon (`size-4`).
  - 16px text (`text-base`) $\rightarrow$ 18px–20px icon (`size-4.5` or `size-5`).
  - 12px text (`text-xs`) $\rightarrow$ 14px icon (`size-3.5`).
- **Icon Shrink Protection**: Always add `shrink-0` to icons so long text never crushes the icon.
- **Optical Centering**: Vertical flex alignment (`flex items-center gap-2`). For uppercase or numerical text, check optical baseline.
- **Icon Stroke Weight**: Maintain consistent stroke width across the entire application (`stroke-[1.5]` or `stroke-[2]`).

### 2. Touch & Mobile Ergonomics

- **44x44px Minimum Touch Target**: For small controls (e.g., 28px or 32px icon buttons), expand the touch target using pseudo-elements:
  ```css
  /* Invisible touch target expansion without visual layout bloat */
  .touch-target::after {
    content: "";
    position: absolute;
    inset: -8px; /* Expands 28px element to 44px */
  }
  ```
- **iOS Font Zoom Prevention**: All `<input>` and `<textarea>` elements must have a font size $\ge 16\text{px}$ on mobile viewports to prevent iOS Safari from automatically zooming into the page.
- **Tap Highlight Suppression**: Disable default mobile gray flash with `-webkit-tap-highlight-color: transparent;` and replace it with instant `scale(0.97)` physical press feedback.

### 3. Text Overflow & Layout Resilience

- Test components against:
  - 1 short word ("OK")
  - 1 massive German compound word ("Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz")
  - 3 paragraphs of unexpected prose
- Use `min-w-0` on flex children to allow text truncation.
- For labels that must truncate: `truncate max-w-[200px]` paired with a `<Tooltip>` primitive on hover.

### 4. Dimension-Stable Loading States

- Never collapse a button or card to a tiny spinner box during async operations.
- **Option A (Inline Spinner)**: Maintain original button width; hide text with `opacity-0` while positioning spinner absolutely in the center:
  ```tsx
  <button className="relative inline-flex items-center justify-center">
    <span className={isLoading ? "opacity-0" : "opacity-100"}>{label}</span>
    {isLoading && <Spinner className="absolute size-4 animate-spin" />}
  </button>
  ```
- **Option B (Skeleton)**: Skeletons must mimic the exact bounding box and border radius of the target element.

### 5. Form & DOM Boundaries

- Always declare `type="button"` on interactive buttons unless explicitly handling `type="submit"`.
- Never block paste in `<input>` or `<textarea>` fields.
- Wrap inputs with `<form>` to allow native Enter-key submission.
- Position input decoration icons absolutely over padding (`pl-10`), never inline as flex siblings that displace input focus rings.

### 6. Themed Browser Surfaces

Ensure custom styling applies to surfaces that browsers render by default:

- Text selection: `::selection { background-color: var(--primary); color: var(--primary-foreground); }`
- Caret color: `caret-color: var(--primary);`
- Scrollbars: Thin, rounded, theme-tinted scrollbars (`scrollbar-thin scrollbar-thumb-muted`).

### 7. Dual-Engine Accessibility Invariants (WCAG 2.2 AA + WCAG 3 APCA)

- Explicit `aria-label` for all icon-only buttons.
- Dialogs must trap focus, restore focus on close, and dismiss on `Escape`.
- **Compliance Engine (WCAG 2.2)**: Contrast ratio $\ge 4.5:1$ for normal text, $\ge 3:1$ for large display text and UI controls (SC 1.4.11).
- **Perceptual Engine (WCAG 3 APCA)**: APCA Lightness Contrast $|L_c| \ge 60$ for buttons/controls, $|L_c| \ge 75$ for body text. On high-luminance hues (amber/yellow/gold), enforce dark obsidian text to prevent optical halation.
- Validation errors linked via `aria-describedby` and marked with `aria-invalid="true"`.

---

## 🛡️ Design Engineering Rationalisation Defence Matrix

Autonomous agents and engineers frequently encounter predictable rationalisations when pressured by task velocity. The following table provides an unyielding barrier against compromised craft standards:

| Internal Rationalisation / Excuse                 | Engineering Reality & Mandatory Action                                                                                                                                            |
| :------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **"This is just a small visual tweak."**          | Visual changes routinely introduce horizontal layout shifts. Check box models, ensure `border-transparent` bases, and confirm only compositor properties animate.                 |
| **"Should work now / Looks correct."**            | Confidence is not evidence. Run verification commands (`npm run check`, `npm run test`, `npm run invariants`) and inspect exit code 0 and full output before claiming completion. |
| **"The icon is already small enough."**           | Motion icons default to 28px inline SVG dimensions. Always pass explicit `size={...}` matching the container's optical ratio. Descendant class rules are mandatory.               |
| **"It looks accessible on my screen."**           | Visual rendering does not equal accessibility. Verify keyboard navigation, focus trap isolation, explicit `aria-label`s on icon controls, and WCAG 3 APCA lightness contrast.     |
| **"I will fix the layout shift later."**          | Layout shifts compound across parent container trees and destroy perceived quality. Never commit unconstrained geometry. Base controls must declare `border border-transparent`.  |
| **"Nobody will notice a 1px twitch."**            | A 1px shift triggers full-document layout reflow and invalidates glass sampling buffers. Subconscious human perception registers micro-dissonance instantly.                      |
| **"It is just a demo fixture or showcase."**      | Demo fixtures and workbenches are the canonical reference implementations that downstream consumers and LLMs replicate. Fixtures must be flawless.                                |
| **"Linter passed so compilation is guaranteed."** | Linters inspect AST syntax, not type compatibility or runtime bundle health. Full compilation (`tsc -b && vite build`) is strictly required.                                      |
| **"The user did not ask for tabular numbers."**   | Tabular figures are not an optional decoration. All counters, timers, financial figures, and metrics must declare `tabular-nums` by invariant default.                            |
| **"Symptom fixed, bug is done."**                 | Symptom patching causes recurring regressions. Always isolate the root cause across component boundaries before modifying production code.                                        |

---

## ⚡ Autonomous Rulings & Problem Isolation Protocol

### 1. The Autonomous Rulings Standard

When executing multi-step implementation plans or complex refactors, human engineering velocity collapses if an agent pauses every few minutes to ask trivial preference questions. When facing ambiguities that do not breach safety boundaries, the agent must deliver authoritative rulings:

- **Authoritative Discretion**: The agent makes the principled design engineering call (e.g. semantic token mapping, layout archetype selection, concentric corner radius calculation, responsive breakpoint tuning).
- **Recorded Transparency**: Every non-trivial architectural decision must be logged clearly in commit notes or task records:
  ```text
  Ruling: [Decision made] | Justification: [Physical or craft rationale] | Consequence if reversed: [Cost to alter]
  ```
- **Four Strict Cessation Conditions**: An autonomous execution cycle halts if and only if encountering:
  1. An irreversible or destructive data operation.
  2. A security, secret, or credential boundary.
  3. A shared remote side-effect outside the local branch (merging to production or pushing to external remotes).
  4. A fundamentally contradictory specification where every forward path is guesswork.

### 2. Systematic Problem Isolation

When tests fail, builds break, or interface bugs appear:

1. **Root Cause First**: Never apply speculative cosmetic fixes without identifying why the failure occurred.
2. **Boundary Tracing**: In multi-component systems (forms, dropdowns, contextual popovers), trace data propagation across component boundaries before altering styles or handlers.
3. **Red-Green Verification**: Prove the defect by reproducing the failure, apply the minimal structural fix, and verify that the original symptom is resolved while existing invariants remain green.

---

## 🔍 Code Review Format (Required)

When reviewing code against this craft standard, **always** output your findings in a structured Markdown table:

| Before (Violation)                                                                     | After (Craft Solution)                                                                                      | Why It Matters                                                                                                                       |
| :------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `transition: all 0.2s`                                                                 | `transition: transform 150ms ease-out, opacity 150ms ease-out`                                              | Avoid `all`; target specific compositor properties to prevent unintended layout reflows.                                             |
| `transform: scale(0)` on modal entry                                                   | `transform: scale(0.95); opacity: 0`                                                                        | Objects exist in space; emerging from 0.95 feels natural and physical.                                                               |
| No `:active` press state on button                                                     | `active:scale-[0.98] transition-transform`                                                                  | Visual feedback on press gives immediate tactile confirmation.                                                                       |
| `<button><XIcon /></button>`                                                           | `<button type="button" aria-label="Close dialog"><XIcon className="size-4 shrink-0" /></button>`            | Prevents accidental form submission, prevents icon squishing, provides screen-reader accessible name.                                |
| Motion icon in button without explicit size (e.g. `<BoldIcon className="size-3.5" />`) | Pass explicit `size={14}` and declare `[&_svg]:size-3.5 [&>div]:size-3.5` on the button                     | Motion icons wrap `<svg>` in a `<div>` with default 28px inline SVG attributes; without explicit scaling, icons blow out of buttons. |
| `h-screen`                                                                             | `h-dvh`                                                                                                     | Prevents mobile browser navigation bar jumps and layout shifts.                                                                      |
| Small 28px button without touch target                                                 | `relative after:absolute after:-inset-2`                                                                    | Meets Apple HIG & WCAG 2.5.5 minimum 44x44px touch target without visual bloat.                                                      |
| Font weight changes on hover or active                                                 | Keep `font-medium`, use background luminance or border shadow lift                                          | Eliminates layout shifts, glyph width jumps, and text jitter.                                                                        |
| Border added on hover/state (e.g. `border` on success)                                 | Base class declares `border border-transparent`; states only change color                                   | Adding a border changes box model by 2px, physically displacing surrounding layout.                                                  |
| Accordion animates `max-height: 500px`                                                 | `grid-rows-[0fr]` to `grid-rows-[1fr]` with `min-h-0`                                                       | Eliminates timing lag and broken easing caused by arbitrary max heights.                                                             |
| Nested card: outer `rounded-2xl` (16px), inner `rounded-2xl` with `p-3` (12px)         | Inner card: `rounded-xs` or `rounded-[4px]` ($16 - 12 = 4\text{px}$)                                        | Non-concentric radii cause lumpy, bulging corners where padding visibly pinches.                                                     |
| Circular `rounded-3xl` on hero card / dialog                                           | Figma 60% squircle (`corner-shape: squircle` / SVG superellipse)                                            | Eliminates harsh $G^1$ tangent kinks, producing organic Apple-grade continuous curvature.                                            |
| Flat box-shadow `0 4px 6px rgba(0,0,0,0.1)`                                            | Multi-layer shadow: key light + ambient light + 1px specular inner rim                                      | Physical light in reality is multi-source; single shadows look artificial and muddy.                                                 |
| Flex child `<p className="truncate">` without `min-w-0`                                | Add `min-w-0` to the parent container                                                                       | Without `min-w-0`, CSS flex items refuse to shrink and blow out layouts.                                                             |
| Symmetrical button padding `p-3`                                                       | Asymmetrical padding `px-4 py-2`                                                                            | Text labels require $1.5\times$ to $2\times$ horizontal room to feel balanced.                                                       |
| Arbitrary `z-[9999]` on modal                                                          | Semantic `z-50` adhering to the Z-index scale                                                               | Arbitrary z-indices create layering conflicts with toasts and tooltips.                                                              |
| Page jumps when opening modal                                                          | `scrollbar-gutter: stable` on root container                                                                | Locks scrollbar track width to eliminate horizontal reflow on body scroll lock.                                                      |
| Saturated linear gradient text (`bg-clip-text text-transparent`)                       | Solid typography (`text-foreground`) with chromatic ambient lensing behind glass                            | Eliminates AI landing page slop and antialiasing degradation.                                                                        |
| Legacy sRGB gradient (`linear-gradient(#f00, #00f)`)                                   | Modern perceptual gradient (`linear-gradient(in oklch, ...)`)                                               | Eliminates muddy desaturated midpoint dead zones.                                                                                    |
| Text over gradient failing intermediate contrast                                       | Ensure $\ge 4.5:1$ contrast across every coordinate stop or place gradient in ambient sublayer ($\le 25\%$) | WCAG 2.2 AA geometric contrast invariant.                                                                                            |
