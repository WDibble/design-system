# Design Engineering Invariants & Anti-Slop Rules

Complete negative heuristics and mathematical/optical engineering specifications enforced across every primitive and screen.

---

## Deterministic Anti-Slop Bans (Negative Heuristics)

When auditing or writing UI, **strictly reject** these 29 generative failure modes:

- **Identical 3-Card Grids**: Flattens hierarchy as a lazy fallback. _Do instead_: Vary layout composition with hero statements, index lists, or asymmetrical master-detail splits.
- **Section Eyebrow Kickers**: Decorative clutter above headlines. _Do instead_: Delete the eyebrow and write a heading strong enough to stand alone.
- **Hero-Metric Boilerplate**: Giant number paired with tiny grey label repeated blindly. _Do instead_: Embed metrics inside structured narrative tables or tabular sparklines.
- **Neon / Glow Halos**: Synthetic neon aesthetic causing eye strain. _Do instead_: Ground components using multi-layer ambient shadows and 1px optical inner highlights.
- **Linear / Sluggish Transitions**: Feels mechanical and frozen. _Do instead_: Use calibrated spring physics (`motion/react`) or crisp `ease-out` (`<= 200ms`).
- **Layout-Shifting States**: Altering borders (`border-2` on hover) or font weights (`font-semibold`) shifts adjacent geometry. _Do instead_: Keep font-weight and border widths frozen; signal selection with contrast, pills, or outline rings.
- **Hard Block Neobrutalism**: Hard black `4px` offset shadows act as visual costume noise. _Do instead_: Use soft, directional elevation matching ambient light sources.
- **Emoji as Icons**: Renders inconsistently across OS engines. _Do instead_: Use crisp Lucide or authored SVGs with uniform `1.5px` or `2px` strokes.
- **Sticky Touch Hovers**: Touch devices leave tapped elements illuminated in `:hover`. _Do instead_: Scope hover styles inside `@media (hover: hover)`.
- **Fake Glassmorphism**: Unanchored blur filters without physical framing. _Do instead_: Add 1px optical borders (`border-white/10`) and ground backdrop blurs over clear hierarchy.
- **Unconstrained Text Overflow**: Dynamic labels breaking layout widths. _Do instead_: Enforce `truncate`, `line-clamp`, and `min-w-0` paired with tooltip reveal.
- **Default Button `type` in Forms**: Missing `type="button"` triggers accidental form submission. _Do instead_: Set `type="button"` on all non-submit buttons explicitly.
- **Gimmick Icon Animations**: Spinning `+` glyphs, disappearing/redrawing `Check` marks, or twitching arrow shafts. _Do instead_: Enforce the Reversible Mechanical Affordance Doctrine; keep operational glyphs (`+`, `-`, `Check`, arrows) static by default.
- **Shorthand Class Purging (`size-full` on Sized Primitives)**: Passing `size-full` or `p-0` after single-axis classes (`h-9`, `px-4`) in `cn()` strips explicit heights via `twMerge`. _Do instead_: Apply layout width rules (`w-full`, `flex-1`) to outer shells and keep variant heights intact on visual buttons.
- **Isolated Icon Hover Traps**: Requiring pointer accuracy over a 16px SVG icon instead of the whole button. _Do instead_: Bind icon motion synchronously to parent `group-hover`, `group-active`, and keyboard focus states.
- **Saturated Gradient Text Cliché**: Multi-colour `-webkit-background-clip: text` gradients ruin antialiasing. _Do instead_: Keep headlines solid (`text-foreground`) and reserve gradients for soft glass ambient lensing.
- **Muddy sRGB Midpoints**: Interpolating gradients in legacy sRGB creates brownish-grey dead zones at 50%. _Do instead_: Declare `linear-gradient(in oklch, ...)` or `in oklab` on all multi-stop ramps.
- **Unchecked Gradient Surface Contrast**: Text placed over multi-stop gradients dipping below WCAG `4.5:1`. _Do instead_: Verify `>= 4.5:1` across every coordinate stop or keep background ambiance subtle (`<= 25%` opacity).
- **Continuous Non-Resting Kinetic Loops**: Endless `0%` to `100%` indicator pulses erasing resting legibility. _Do instead_: Spend at least `60%` of each cycle at rest (`opacity: 0` on outer pulse halo).
- **Non-Compositor Layout & Filter Keyframes**: Animating `top`, `left`, `margin`, or `filter: drop-shadow` causes full-page reflows and flickers sibling `backdrop-filter` surfaces. _Do instead_: Animate exclusively `transform` and `opacity` with `transform-gpu` and promote glass layers via `isolation: isolate`.
- **Indicator Data Cramming**: Stuffing currency pairs, emoji, or multi-char strings into 28px indicator circles. _Do instead_: Keep indicators strictly as structural anchors; display telemetry values in adjacent badge/text blocks.
- **AI Rebuttal Cadence**: Pseudo-poetic phrases ("Not a tool. A revolution."). _Do instead_: State concrete system actions using specific nouns and active verbs.
- **Generic Situational Openers**: Filler intros ("Built for the modern team", "In today's fast-paced landscape"). _Do instead_: Open directly with capability, workflow, or measured proof.
- **AI Buzzword Soup**: Empty marketing superlatives (`seamless`, `robust`, `empower`, `supercharge`, `elevate`, `effortless`, `unlock`, `unleash`, `next-generation`, `world-class`, `best-in-class`, `mission-critical`, `future-proof`, `game-changer`, `journey`, `reinvent`, `reimagined`). _Do instead_: Describe verifiable mechanics and concrete behaviour.
- **Template Punctuation & Meta-Dot Clutter**: Joining labels with `A · B · C` dots or gluing `→` to buttons. _Do instead_: Structure clauses with hairline dividers, columns, or distinct operational badges.
- **Fake Form Sends & Mock Success**: Printing "Sent!" or "Subscribed!" without a real backend mutation or error path. _Do instead_: Wire real request handlers or show explicit unconfigured state; validate failures honestly.
- **Mock Browser Divs & Fake Screenshots**: Styling fake browser window bars with red/yellow/green circles in HTML. _Do instead_: Render genuine interactive component fixtures or real captured screenshots.
- **Hallucinated Brand Tokens**: Guessing company hex values or fonts from LLM memory. _Do instead_: Extract exact tokens from project stylesheets or explicit user rules.
- **Unstable Helper & Error Slots**: Mounting validation errors without reserved line height, causing vertical jump. _Do instead_: Reserve `min-h-[1lh]` on every form description and error container.

---

## Mathematical & Optical Design Engineering Rules

### 1. The Concentric Corner Radius Formula

When nesting rounded surfaces inside padded containers, identical corner radii pinch awkwardly. Match concentric centres mathematically:

`R_inner = max(0px, R_outer - Padding)`

- Card outer `16px` (`rounded-2xl`), padding `12px` (`p-3`): inner radius must be `4px` (`16 - 12 = 4`).
- Modal outer `24px`, padding `8px`: inner radius must be `16px` (`24 - 8 = 16`).
- If `Padding >= R_outer`, inner child radius resets to `0px` (or `2px` to `4px` if standalone).

```tsx
{
  /* Outer radius 16px (rounded-2xl), padding 8px (p-2) */
}
<div className="rounded-2xl bg-muted p-2">
  {/* Inner child: 16 - 8 = 8px (rounded-lg) */}
  <div className="rounded-lg bg-card p-4">Concentric curve with uniform optical padding.</div>
</div>;
```

### 2. Corner Smoothing & Squircles (`G^2` Continuous Curvature)

Standard CSS circular arcs (`G^1` continuity) jump instantaneously from `0` curvature to `1/R` at tangents. Smooth curves via superellipses (`|x/a|^r + |y/b|^r = 1`, `r` around `4` to `5`):

- **`0%` Smoothing**: Micro-elements (`<= 8px` radius: badges, tags, compact inputs).
- **`60%` Smoothing (iOS Standard)**: Macro surfaces (hero cards, dialogs, drawers, prominent dock CTAs) using CSS `corner-shape: squircle` where supported or authored SVG clip masks.
- Never run `feGaussianBlur` SVG goo filters over text containers because rasterisation ruins subpixel font sharpness.
- Inner nested squircles must also inherit the `60%` smoothing curve to keep margins parallel.

### 3. The Spatial Proximity Inequality

Group related items tighter than unrelated groups:

`G_internal < P_component < G_group < M_section`

- `G_internal` (icon to label): `4px` to `8px` (`gap-1.5` or `gap-2`).
- `P_component` (internal padding): `8px` to `16px` (`px-3 py-2` or `p-3`).
- `G_group` (sibling controls): `12px` to `24px` (`gap-3` or `gap-6`).
- `M_section` (major bands): `32px` to `64px` (`my-8` or `my-16`).

### 4. Multi-Layer Physical Shadow & Dark Elevation

Replace flat single shadows with three optical lighting layers: Key Light (sharp contact), Ambient Light (soft scatter), and `1px` Specular Rim Highlight (`inset 0 1px 0 0 oklch(1 0 0 / 0.12)`):

```css
.elevation-card {
  box-shadow:
    0 1px 2px 0 oklch(0 0 0 / 0.04),
    0 4px 16px -2px oklch(0 0 0 / 0.08),
    inset 0 1px 0 0 oklch(1 0 0 / 0.12);
}
```

In dark mode, convey elevation by **raising surface lightness** (`+2%` to `+4%` lightness per step) paired with `1px` translucent borders (`border-white/10`).

### 5. Typographic Leading & Optical Centring

- **Display Headings (`>= 28px`)**: Tight leading (`1.1` to `1.2`, `leading-tight`) and negative tracking (`-0.02em` to `-0.04em`).
- **Body Prose (`14px` to `18px`)**: Relaxed leading (`1.5` to `1.6`, `leading-relaxed`) constrained to `65ch` to `75ch`.
- **Single-Line Controls (Buttons, Badges, Tabs)**: Enforce `leading-none` (`1.0`) so vertical padding dictates symmetric optical centring.
- **Optical Offsets**: Nudge asymmetric glyphs (`translate-x-[1px]` or `pl-0.5` on triangular play icons; `top-[0.5px]` inside compact cap-height pills).

### 6. Colour Tinting & Alpha Harmony

Never render uncalibrated `#888888` grey on coloured or dark grounds. Tint secondary surfaces and borders cleanly via OKLCH relative syntax:

```css
color: oklch(from var(--foreground) l c h / 0.65);
border-color: oklch(from var(--border) l c h / 0.5);
```

### 7. Asymmetric Button Padding Ratio

Text labels need `1.5x` to `2.0x` more horizontal flank padding than vertical padding (`px-4 py-2` or `px-3 py-1.5`). Circular pill controls (`rounded-full`) need `2.0x` to `2.5x` horizontal room (`px-5 py-2`).

### 8. Flexbox & Grid Overflow Shield (`min-w-0`)

CSS flex and grid children default to `min-width: auto`, blocking `truncate` and breaking horizontal bounds. Always add `min-w-0` (or `min-h-0` vertically) on flex children wrapping text or dynamic IDs:

```tsx
<div className="flex items-center gap-3">
  <Avatar className="size-8 shrink-0" />
  <div className="min-w-0 flex-1">
    <p className="truncate text-sm font-medium">{user.name}</p>
    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
  </div>
</div>
```

### 9. Semantic Z-Index Scale (Zero Arbitrary `z-[9999]`)

- `z-0`: Canvas, base cards
- `z-10`: Sticky table/section headers, card hover lifts
- `z-20`: Dropdowns, popovers, selects, combobox popups
- `z-30`: Top navigation bars, floating command palettes
- `z-40`: Modal backdrops, drawer scrims
- `z-50`: Dialog popups, sheet panels, drawers
- `z-60`: Alert toasts and live notifications
- `z-70`: Tooltips (highest non-system layer)

### 10. Scroll Jitter Prevention & Overscroll Containment

Declare `scrollbar-gutter: stable` on scrollable roots so modal scroll-locks never cause a `15px` layout jump. Apply `overscroll-behavior: contain` inside modal bodies and dropdown menus to stop scroll chaining into background pages.

### 11. Container-Query Responsiveness (`@container`)

Couple card internals to their container via `@container` (`@sm:flex-row @sm:items-center`) rather than viewport breakpoints so components adapt identically inside narrow `300px` sidebars or wide `800px` columns.

### 12. Media Shielding & Aspect Ratio Locking

Wrap `<img>` and `<video>` inside explicit aspect-ratio frames (`aspect-video w-full overflow-hidden rounded-lg bg-muted`) with `size-full object-cover` so hydration causes zero CLS.

### 13. CSS Grid Accordion Standard (`0fr -> 1fr`)

Never animate `max-height` or read `scrollHeight` in layout effects. Use CSS Grid row fraction transitions paired with `min-h-0 overflow-hidden` and `inert={!isOpen || undefined}`:

```tsx
<div
  className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none"
  data-open={isOpen}
>
  <div className="min-h-0 overflow-hidden" inert={!isOpen || undefined}>
    <div className="py-2">{children}</div>
  </div>
</div>
```

### 14. Numeric Kinetic Continuity (Rolling Odometer)

Animate live numeric updates (`counters`, `balances`, `totals`, `prices`) vertically via `springs.snappy` inside `overflow-hidden leading-none tabular-nums font-mono` wrappers so widths stay stationary.

### 15. Button State Dimension Locking (CSS Grid Stack)

Layer `idle`, `loading`, and `success` labels inside the exact same CSS grid cell (`col-start-1 row-start-1`) with inactive layers marked `opacity-0 pointer-events-none select-none invisible`. The browser locks the button width to its widest state automatically (`Save` -> `Saving...` -> `Saved!`), guaranteeing zero sibling jitter. Use `motion` `layout` FLIP projection only for intentional hero pill morphs.

### 16. Anti-Crush Page Architecture (`>= 340px` Columns)

Verify multi-column grids preserve minimum viable column width:

`W_column = (W_container - (N - 1) * Gap) / N >= 340px`

- **The 3-Card Trap**: Placing `lg:grid-cols-3` inside `max-w-4xl` (`896px`) yields `(896 - 48) / 3 = 282px`, leaving just `202px` inside card padding and crushing steppers/tables. Cap containers `<= 1024px` (`max-w-4xl`, `max-w-5xl`) at **2 columns maximum** (`md:grid-cols-2`); reserve 3 columns (`xl:grid-cols-3`) strictly for `>= 1150px` (`max-w-6xl`, `max-w-7xl`).
- **Adaptive Headers**: Pair card titles with compact chips (`shrink-0 whitespace-nowrap`) or stack vertically (`flex-col md:flex-row`). Never squeeze long title descriptions beside multi-badge clusters.
- **Ghost Sizers & Steppers**: Bound ghost labels with `max-w-full overflow-hidden truncate` (skip on icon buttons) and wrap compound steppers below `220px`.

### 17. Segmented Controls (Zero Glyphic Expansion)

Never alter `font-weight`, `letter-spacing`, `padding`, or `border-width` on active tabs/segments. Keep typography identical (`font-medium text-xs`) across states; signal selection solely via `text-foreground`, `bg-background shadow-xs`, and `motion.span` `layoutId` pills (`src/components/ui/segmented-control.tsx`).

### 18. Perceptual Gradient Engineering

- Keep typography solid (`text-foreground`); `-webkit-background-clip: text` gradients are prohibited.
- Always interpolate ramps in `in oklch` (`linear-gradient(in oklch to right, ...)`).
- Sample WCAG `>= 4.5:1` contrast at every stop, or limit ambient lensing behind translucent `backdrop-blur` glass to `>= 60px` blur and `<= 25%` opacity.
- Sanctioned gradient roles: deep ground occlusion (`180deg in oklch`), `1px` specular bevel rim (`border-image` / `inset 0 1px 0`), ambient chromatic lensing behind Liquid Glass, and directional alpha scroll masks (`mask-image`).
