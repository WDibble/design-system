---
name: craft-philosophy
description: Use when designing, building, or reviewing UI components and screens. Enforces human-centric craft, 9-state interactive matrices, and anti-slop geometry.
license: MIT
metadata:
  author: William Dibble
  version: "1.0.0"
  tags: [design-system, craft, ui, layout, architecture]
---

# Craft Philosophy: Human-Centric Design Engineering Standard

Design is the disciplined intersection of human psychology, physical intuition, typographic harmony, and kinetic grace. Reject statistical AI boilerplate and craft interfaces that respect visual calm, instantaneous physical response, and structural precision.

---

## Purpose

Establish the non-negotiable engineering axioms, negative heuristics, mathematical optics, and anti-convergence page standards governing every component and layout in the design system.

---

## Prerequisites

- **Core directives**: Review the semantic theming palette (`oklch`), spring physics tokens (`src/tokens/motion.ts`), and `@base-ui/react` accessible state machines before building new primitives.
- **Verification suite**: Node.js workspace configured with `npm run invariants`, `npm run spellcheck`, and `npm run check`.

---

## Instructions

Follow this workflow when conceiving, implementing, or reviewing UI components and layouts:

1. **Use the Five Tenets as structural guardrails**: Anchor layout hierarchy with spatial rhythm and typographic weight before adding borders or containers.
2. **Pass every interactive control through the 9-state matrix**: Guarantee stable `border-transparent` box geometry across `idle`, `hover`, `pressed`, `focus-visible`, `loading`, `disabled`, `selected`, `error`, and `success`.
3. **Keep detailed reference docs nearby when implementing or auditing**:
   - Read [references/design-engineering-invariants.md](references/design-engineering-invariants.md) for all 29 anti-slop bans and 18 geometric/optical formulas.
   - Read [references/macrostructures-and-editorial.md](references/macrostructures-and-editorial.md) for the 21 page archetypes, 10 visitor jobs, Editorial Swap Test, and copy hygiene.
   - Read [references/audit-checklists-and-rulings.md](references/audit-checklists-and-rulings.md) for the 7-point QA checklist, rationalisation defences, autonomous rulings, and required review table format.
4. **Add mathematical safeguards directly in JSX**: Set `min-w-0` on flex children, `shrink-0 whitespace-nowrap` on pills, explicit `size={...}` on motion icons, and `min-h-[1lh]` on form error slots.
5. **Run verification before claiming completion**: Execute `npm run invariants`, `npm run check`, and `npm run spellcheck`, confirming exit code `0` and handling any validation or layout errors before finishing.

---

## 🏛️ The Five Core Tenets

1. **Physical Truth (Kinetic Intuition)**: Nothing teleports from `scale(0)`. Modals emerge from `scale(0.95)`, buttons yield instantaneously on `pointerdown` (`scale(0.97)` to `0.98`), calibrated springs govern all travel, and animations stay interruptible.
2. **Radical Restraint (Quiet Chrome)**: Cards are a last resort. Rely on spatial proximity (`G_internal < P_component < G_group < M_section`), directional multi-layer elevation with `1px` specular inner rims, and dark mode surface luminance steps (`+2%` to `+4%`). Never nest cards inside cards.
3. **Typographic Decorum & Spatial Silence**: Section eyebrow kickers are banned. Tighten display tracking (`-0.02em` to `-0.04em`), cap reading measure (`65ch` to `75ch`), and enforce `tabular-nums` on every counter, price, metric, and timestamp.
4. **Emotional Dignity (Safety & Forgiveness)**: Destructive actions require tactile confirmation (`AlertDialog`) and safe default focus. Dimension-locked skeletons (`aria-busy="true"`) prevent twitching during loading, and errors sit inline with a direct recovery path.
5. **The Anti-Slop Conviction**: Fulfil all 9 interactive states, freeze `border-width`, `font-weight`, and `letter-spacing` across dynamic states, and style native browser surfaces (`::selection`, `caret-color`, scrollbars).

---

## 🎯 The Mandatory 9-State Interactive Matrix

Every interactive primitive must handle the complete state spectrum without layout shift:

1. **Default (`idle`)**: Optical baseline alignment, `border-transparent`, subtle inner rim highlight.
2. **Hovered (`hover`)**: Subtle luminance lift scoped cleanly inside `@media (hover: hover)`.
3. **Pressed (`pressed`)**: Tactile compression (`scale(0.97)` to `0.98`) triggered on `pointerdown`.
4. **Focused (`focus-visible`)**: Keyboard-only `2px` offset ring (`ring-2 ring-ring ring-offset-2`).
5. **Loading (`loading`)**: Dimension-locked grid stack or skeleton with `aria-busy="true"` and 100% active opacity.
6. **Disabled (`disabled`)**: Clear `opacity-50`, `pointer-events-none`, and `aria-disabled="true"` / `disabled`.
7. **Selected (`selected`)**: Background tint, indicator contrast, or sliding `layoutId` pill with invariant font weight.
8. **Invalid / Error (`error`)**: `border-destructive`, `aria-invalid="true"`, and contextual feedback in a `min-h-[1lh]` slot.
9. **Success (`success`)**: Inline affirmative state transition (Idle -> Loading -> Sprung Checkmark -> Idle) without detached popup toasts.

---

## 📐 Core Mathematical, Optical & Layout Invariants

Summary of high-impact mathematical rules (complete formulas and examples live in `references/`):

| Invariant Domain            | Enforced Rule & Quantitative Target                                                                                                                                  |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Concentric Radii**        | Compute `R_inner = max(0px, R_outer - Padding)`; apply `60%` iOS squircle smoothing on large cards                                                                   |
| **Dual-Engine Contrast**    | Pass both WCAG 2.2 AA (`>= 4.5:1` text, `>= 3:1` controls) and WCAG 3 APCA (`\|Lc\| >= 60` controls, `\|Lc\| >= 75` body); flip amber/gold text to dark obsidian     |
| **Anti-Crush Grids**        | Enforce `W_column >= 340px`; cap containers `<= 1024px` at 2 columns max; declare `min-w-0` on text flex items and `shrink-0 whitespace-nowrap` on pills             |
| **Navigation Integrity**    | Primary menu titles never truncate (`whitespace-nowrap font-semibold`); minimum column width `>= 220px`; automatic overflow menus                                    |
| **Class Collision Defence** | Never merge multi-axis shorthands (`size-full`, `p-0`) after single-axis heights (`h-9`) inside `cn()`; center preview frames symmetrically                          |
| **Icon Kinetic Affinity**   | Bind icon triggers to parent `group-hover` / `group-active`; pass explicit `size={12\|14\|16\|18}` (`40%`–`50%` height ratio); keep `+`, `-`, `Check`, arrows static |
| **Perceptual Gradients**    | Zero gradient text (`bg-clip-text`); interpolate ramps in `in oklch`; verify `>= 4.5:1` across every stop                                                            |
| **Telemetry Cadence**       | Calm resting indicator state spending `>= 60%` of each pulse cycle at rest; compositor-only keyframes (`transform`, `opacity`)                                       |
| **Copy & Truth**            | British English only; zero em dashes; max `7` words hero headline / `80` words viewport / `450` words page; no fake metrics or mock browser divs                     |
| **Verification Gate**       | Fresh passing run of `npm run invariants` and `npm run check` (`0` errors) before reporting completion                                                               |

---

## Examples

Canonical fixture combining concentric radii (`16px - 8px = 8px`), invariant `border-transparent` controls, `tabular-nums`, explicit motion icon `size={16}`, and a `min-h-[1lh]` validation error slot:

```tsx
import { ActivityIcon } from "@/components/icons";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function BudgetQuotaCard({ quota, error }: { quota: string; error?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-2">
      <div className="rounded-lg bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <ActivityIcon size={16} className="shrink-0 text-primary" />
            <h3 className="text-sm font-semibold [text-wrap:balance] text-foreground">
              Monthly Compute Limit
            </h3>
          </div>
          <span className="shrink-0 font-mono text-sm font-semibold text-foreground tabular-nums">
            {quota}
          </span>
        </div>

        <Field className="mt-4">
          <FieldLabel htmlFor="quota-input">Allocation Cap (USD)</FieldLabel>
          <Input
            id="quota-input"
            defaultValue="250.00"
            aria-invalid={!!error}
            className="tabular-nums"
          />
          <div className="min-h-[1lh]">
            {error ? (
              <FieldError>{error}</FieldError>
            ) : (
              <FieldDescription className="[text-wrap:pretty]">
                Applies at the start of the next billing cycle.
              </FieldDescription>
            )}
          </div>
        </Field>
      </div>
    </div>
  );
}
```

---

## Limitations

- **Code verification stays authoritative**: Static skill rules cannot detect CSS specificity overrides or runtime DOM overlap without running TypeScript, `npm run invariants`, Vitest, and real browser checks.
- **Balanced progressive disclosure**: Deep reference catalogues (the 29 negative heuristics, 21 layout archetypes, and code review rubric) live in `references/` and must be opened selectively to conserve context window budget.

---

## Troubleshooting

| Symptom                                                       | Cause                                                                    | Solution                                                                                                                  |
| :------------------------------------------------------------ | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Nested image or inner card corners look pinched               | Inner panel uses the same radius as its outer padded card                | Apply `R_inner = max(0px, R_outer - Padding)` (for `rounded-2xl` + `p-2`, use `rounded-lg`)                               |
| Card title squeezes adjacent status badge onto two lines      | Title column lacks `min-w-0` or badge lacks `shrink-0 whitespace-nowrap` | Wrap header text in `min-w-0 flex-1`, enforce `shrink-0 whitespace-nowrap` on pills, or stack with `flex-col md:flex-row` |
| Error message makes the form below jump downward              | Validation `<FieldError>` renders without reserved vertical line height  | Wrap helper and error copy in a persistent `min-h-[1lh]` slot                                                             |
| Animated Lucide icon blows up to `28px` inside a small button | Caller used `className="size-3.5"` without passing explicit `size={14}`  | Always pass `size={14}` / `size={16}` alongside `[&_svg]:size-3.5 [&>div]:size-3.5` on the button                         |
