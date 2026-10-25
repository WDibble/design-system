# Agent Directives & Design Engineering Invariants

> **The Movement & Living Standard**: This repository is an agent-native, human-centric design system built at the intersection of visual precision, physical intuition, and robust engineering. When operating in this codebase, you must act as a **Design Engineer with trained taste**, not a generic layout parser.

---

## 🏛️ Grounding Philosophies & Required Reading

Before writing, modifying, or reviewing any user interface code, you MUST adhere to the codified skills in `skills/` and the project manifesto:

1. **[PHILOSOPHY.md](PHILOSOPHY.md)**: The human sensory manifesto, quiet chrome doctrine, and anti-slop mandate.
2. **[skills/craft-philosophy/SKILL.md](skills/craft-philosophy/SKILL.md)**: Negative bans on AI tropes (no 3-card grids, no section eyebrows, no fake glassmorphism) and the mandatory 9-state interactive matrix.
3. **[skills/motion-physics/SKILL.md](skills/motion-physics/SKILL.md)**: Apple HIG fluid interface rules, spring physics (`motion/react`), `pointerdown` active feedback, and velocity inheritance.
4. **[skills/base-ui-primitives/SKILL.md](skills/base-ui-primitives/SKILL.md)**: Headless compound component composition using Base UI (`@base-ui/react`) and WCAG 2.2 accessibility invariants.
5. **[skills/tweakcn-theming/SKILL.md](skills/tweakcn-theming/SKILL.md)**: Semantic token architecture interoperable with `tweakcn.com` and Tailwind CSS v4 `@theme inline`.

---

## ⚡ The Eight Non-Negotiable Directives

1. **Physical Yield on `pointerdown`**: Interactive controls must compress (`scale(0.97)` to `0.98`) the millisecond touch or mouse down occurs. Never wait for `click` (pointer release).
2. **Zero Layout Shifts**: Never change `border-width`, `font-weight`, `letter-spacing`, `margin`, or `padding` across ANY dynamic state (`hover`, `focus`, `active`, `selected`, `pressed`). Always declare `border border-transparent` on base controls so outline or feedback states only alter color, never geometry. Animate exclusively compositor properties (`transform`, `opacity`). Signal selection via color contrast, background pills, or indicators—never by switching font weight or tracking, which alters glyph widths and causes horizontal layout twitching.
3. **Tabular Numerals**: All counters, prices, metrics, and data table columns must specify `font-variant-numeric: tabular-nums` (`tabular-nums`) to prevent horizontal jitter.
4. **Accessible Invariants**: Every icon-only button must have an explicit `aria-label`. Dialogs must trap focus and dismiss on `Escape`.
5. **Quiet Chrome**: Avoid the lazy reflex of putting everything in a bordered card. Rely first on spatial rhythm, typographic hierarchy, and baseline alignment.
6. **Concentric Corner Radii**: When nesting rounded elements, compute the inner radius using $R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{Padding})$ to prevent lumpy, bulging corners.
7. **Anti-Crush Responsive Page Architecture**: Full-page layouts must guarantee minimum viable column widths ($W_{\text{col}} \ge 340\text{px}$). Never force 3-column grids into narrow containers (<1080px). Cards and surfaces must establish container queries (`@container`), flex child containers must specify `min-w-0` to allow truncation, and layout footprint sizers must enforce `max-w-full` with zero bleed on icon controls.
8. **Reversible Kinetic Affordances (No Gimmick Icon Animation)**: Icons must only be animated if they possess a *reversible mechanical affordance* that preserves glyph identity and glides in and out back to its resting origin on pointer leave or release (e.g. sliding filter knobs, lifting trash lid, gliding paper plane, separating copy sheets). Strictly ban gimmick animations: never spin symmetrical operational icons in circles (e.g. rotating `+`), never vanish and redraw glyphs from empty space on hover/press (e.g. disappearing `✓`), and never shrivel geometry. Operational, mathematical, and confirmation icons (`+`, `-`, `✓`, `→`) must remain static by default.
