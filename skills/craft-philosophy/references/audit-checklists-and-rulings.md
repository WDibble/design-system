# Audit Checklists, Defence Matrix & Autonomous Rulings

Quality gates, engineering rationalisation defences, problem-isolation discipline, and code review output rules.

---

## The 7-Point Component Quality Checklist

Run through all seven checks when authoring or auditing any UI primitive:

### 1. Typography & Optical Icon Balance

- **Icon Scale**: Match icon size to text scale (`14px` / `text-sm` -> `16px` / `size-4`; `16px` / `text-base` -> `18px–20px` / `size-4.5` or `size-5`; `12px` / `text-xs` -> `14px` / `size-3.5`), or `40%` to `50%` of container height.
- **Explicit Size Prop on Motion Icons**: Components importing animated glyphs from `@/components/icons` **must** pass explicit `size={12}`, `size={14}`, `size={16}`, or `size={18}` alongside `[&_svg]:size-3.5 [&_svg]:shrink-0 [&>div]:size-3.5` descendant bounds.
- **Shrink Guard & Optical Centring**: Always include `shrink-0` on icons inside flex rows, align baselines (`flex items-center gap-2`), and keep stroke weight consistent (`stroke-[1.5]` or `stroke-[2]`).

### 2. Touch & Mobile Ergonomics

- **`44 x 44px` Minimum Touch Target**: Expand compact icon triggers cleanly via pseudo-elements without layout bloat:
  ```css
  .touch-target::after {
    content: "";
    position: absolute;
    inset: -8px; /* Expands a 28px control to 44px */
  }
  ```
- **iOS Font Zoom Prevention**: Set input and textarea font sizes `>= 16px` on mobile breakpoints to prevent Safari auto-zoom.
- **Tap Highlight Replacement**: Apply `-webkit-tap-highlight-color: transparent` and provide instant `scale(0.97)` feedback on `pointerdown`.

### 3. Text Overflow & Layout Resilience

Test every primitive against a short label (`"OK"`), an unbroken German compound noun (`"Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz"`), and multi-paragraph copy. Apply `min-w-0` on flex children and wrap truncated titles (`truncate max-w-[200px]`) with `<Tooltip>` inspection where non-navigation labels truncate. Primary navigation and dropdown titles must never truncate.

### 4. Dimension-Stable Loading States

Lock intrinsic dimensions during async work so siblings never shift:

- Preserve widest label geometry using a CSS Grid stack (`col-start-1 row-start-1`) or `opacity-0` text + centred spinner.
- Render structural skeletons matching the exact target bounding box and corner radius.

### 5. Form & DOM Boundaries

- Declare `type="button"` on all non-submit buttons explicitly.
- Never block paste on `<input>` or `<textarea>` fields.
- Wrap inputs in `<form>` for native Enter-key submission.
- Position input leading/trailing icons with absolute offsets over padding (`pl-10`), never shifting focus ring outlines.

### 6. Themed Browser Surfaces

Define custom styles explicitly for `::selection` (`var(--primary)` / `var(--primary-foreground)`), `caret-color: var(--primary)`, and thin themed `scrollbar-color` controls.

### 7. Dual-Engine Accessibility (WCAG 2.2 AA + WCAG 3 APCA)

- Declare explicit `aria-label` on every icon-only trigger.
- Modals trap focus inside open portals, dismiss on `Escape`, and restore focus to triggers.
- **WCAG 2.2 AA**: Contrast ratio `>= 4.5:1` for body text and `>= 3:1` for large text and graphical UI borders/rings (SC `1.4.11`).
- **WCAG 3 APCA**: Perceptual lightness contrast `|Lc| >= 60` on interactive controls and `|Lc| >= 75` on body copy; enforce obsidian ink foregrounds over high-luminance amber/yellow/gold fills.
- Link validation errors via `aria-describedby`, `aria-invalid="true"`, and a reserved `min-h-[1lh]` slot.

---

## Design Engineering Rationalisation Defence Matrix

Reject these predictable shortcuts when pressured by task speed:

| Internal Excuse                       | Engineering Reality & Mandatory Fix                                                                                 |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------ |
| **"Just a small visual tweak."**      | Visual tweaks routinely shift box geometry. Check `border-transparent` bases and compositor purity.                 |
| **"Should work now / looks good."**   | Confidence is not evidence. Execute `npm run check`, `npm run invariants`, and verify exit code `0`.                |
| **"The icon looks small enough."**    | Motion icons default to `28px` SVG attributes. Pass explicit `size={...}` matching the container ratio.             |
| **"Looks accessible on screen."**     | Verify keyboard `Tab` focus traps, `aria-label` attributes, and WCAG 3 APCA scores objectively.                     |
| **"I'll clean layout shifts later."** | Shifts compound across grids and flicker glass layers. Enforce fixed bases and `tabular-nums` immediately.          |
| **"It's only a demo fixture."**       | Workbenches and demos serve as canonical templates copied by downstream engineers and agents. Keep fixtures strict. |
| **"Linter passed so build is fine."** | Linters check syntax only, not TypeScript types or Vite bundling. Run `tsc -b && vite build`.                       |
| **"Symptom fixed, task complete."**   | Trace propagation across compound boundaries first; fix root cause before committing.                               |

---

## Autonomous Rulings & Problem Isolation Protocol

### 1. Autonomous Rulings Standard

Never stall autonomous implementation to ask trivial formatting or token questions. Deliver principled engineering rulings and log decisions transparently:

```text
Ruling: [Decision made] | Justification: [Physical or craft rationale] | Consequence if reversed: [Cost to alter]
```

**Halt execution only upon encountering**:

1. Irreversible or destructive data operations.
2. Security, secret, or credential boundaries.
3. Shared remote side-effects outside approved local branches (production merges or unapproved pushes).
4. Fundamentally contradictory specifications leaving only guesswork.

### 2. Systematic Problem Isolation

1. **Root Cause First**: Identify structural causes before editing styles or handlers.
2. **Boundary Tracing**: Trace state, context, and focus flow across parent/child boundaries in compound components.
3. **Red-Green Verification**: Reproduce the defect cleanly, apply the minimal fix, and re-run the verification gate.

---

## Required Code Review Table Format

When auditing UI code, report findings in a concise markdown table:

| Violation                           | Craft Solution                                                                                   | Impact                                                 |
| :---------------------------------- | :----------------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| `transition: all 0.2s`              | `transition-[transform,opacity] duration-150 ease-out`                                           | Prevents unintended layout transition reflows          |
| `scale(0)` modal entry              | `scale(0.95); opacity: 0`                                                                        | Physical emergence from existing space                 |
| Missing `:active` yield             | `active:scale-[0.98] transition-transform`                                                       | Instant tactile feedback on `pointerdown`              |
| `<button><XIcon /></button>`        | `<button type="button" aria-label="Close dialog"><XIcon className="size-4 shrink-0" /></button>` | Blocks unintended form submit and sets accessible name |
| `<BoldIcon className="size-3.5" />` | Pass `size={14}` + `[&_svg]:size-3.5 [&>div]:size-3.5`                                           | Prevents 28px SVG blowout in motion icons              |
| `h-screen`                          | `h-dvh`                                                                                          | Prevents mobile viewport bar reflow                    |
| Small 28px icon button              | `relative after:absolute after:-inset-2`                                                         | Expands hit target to `44 x 44px`                      |
| Hover changes `font-weight`         | Keep `font-medium`, change tint/pill only                                                        | Eliminates horizontal glyph jitter                     |
| Hover adds border width             | Base declares `border border-transparent`                                                        | Prevents `2px` box displacement                        |
| Accordion `max-height: 500px`       | `grid-rows-[0fr]` to `grid-rows-[1fr]` + `min-h-0`                                               | True easing velocity with zero lag                     |
| Same radius inside `p-3` card       | `R_inner = 16 - 12 = 4px` (`rounded-xs`)                                                         | Eliminates pinched, lumpy nested corners               |
| Standard `rounded-3xl` hero card    | `60%` corner smoothing (`corner-shape: squircle`)                                                | Removes `G^1` tangent corner kinks                     |
| Single-layer `box-shadow`           | Key + ambient + `1px` specular inner rim                                                         | Replicates natural multi-source lighting               |
| `truncate` flex child               | Add `min-w-0` on parent flex item                                                                | Enables ellipsis calculation inside flexbox            |
| Symmetrical `p-3` button            | Asymmetrical `px-4 py-2` (`1.5x–2x` width)                                                       | Matches wide optical measure of text labels            |
| `z-[9999]` override                 | Semantic scale (`z-50` dialog, `z-60` toast)                                                     | Eliminates modal/tooltip layering collisions           |
| Modal jump on open                  | `scrollbar-gutter: stable` on root                                                               | Reserves scrollbar track width statically              |
| Gradient text (`bg-clip-text`)      | Solid text + OKLCH ambient glass lensing                                                         | Eliminates boilerplate and preserves sharpness         |
| Legacy `srgb` linear gradient       | `linear-gradient(in oklch, ...)`                                                                 | Avoids muddy grey interpolation midpoints              |
| Unchecked gradient contrast         | `>= 4.5:1` across all stops (`<= 25%` ambient)                                                   | Guarantees WCAG 2.2 AA contrast everywhere             |
