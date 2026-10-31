# Contributing to the Design System

Thank you for your interest in contributing to this design system. We welcome contributions that uphold our design engineering invariants, visual precision, physical intuition, and accessibility standards.

Please review this guide before submitting issues, ideas, or pull requests.

---

## 🏛️ Grounding Philosophies & Invariants

This design system is built at the intersection of visual precision, tactile physics, and zero-shift layout stability. Every contribution must strictly satisfy our core engineering directives:

1. **Physical Yield on `pointerdown`**: Interactive controls must compress (`scale(0.97)` to `0.98`) the millisecond touch or mouse down occurs. Never wait for pointer release (`click`).
2. **Zero Layout Shifts**: Dynamic states (`hover`, `focus`, `active`, `selected`, `pressed`) must never alter `border-width`, `font-weight`, `letter-spacing`, `margin`, or `padding`. Always declare `border border-transparent` on base controls so outline states alter colour only, never geometry. Animate exclusively compositor properties (`transform`, `opacity`).
3. **Tabular Numerals**: All counters, metrics, prices, and tabular data columns must declare `tabular-nums` (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter.
4. **Accessible Invariants**: Every interactive control must comply with WCAG 2.2 Level AA and AAA standards. Icon-only buttons must have an explicit `aria-label`. Dialogs must trap focus, maintain focus guards, and dismiss on `Escape`.
5. **Quiet Chrome & Anti-Pill Proliferation**: Avoid the reflex of placing every element in a bordered card. Rely first on spatial rhythm, typographic hierarchy, and baseline alignment. Decorative eyebrow pills above headings are strictly banned. Badges and pills are reserved exclusively for functional operational telemetry.
6. **Concentric Corner Radii**: Nested rounded surfaces must compute their inner curve mathematically: $R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{Padding})$ to prevent bulging corners.
7. **Anti-Crush Responsive Page Architecture**: Enforce minimum viable column widths ($W_{\text{col}} \ge 340\text{px}$). All badges, chips, and pills must declare `shrink-0 whitespace-nowrap`. Primary navigation titles, dropdown menu labels, and command palette items must never truncate primary text labels.
8. **Reversible Kinetic Affordances**: Animated icons must feature a reversible mechanical affordance that glides back to its resting origin on pointer release or leave. Never use rotating plus signs, vanishing checks, or cartoon gimmicks.
9. **Atomic Class Collision Defence**: Never merge multi-axis shorthand utilities (such as `size-full`, `size-auto`, `p-0`) after single-axis variant dimensions (`h-9`, `px-4`) inside `cn()` / `twMerge()`.
10. **Component-Unified Kinetic Affinity**: Icons nested inside interactive controls must trigger synchronously with the parent control lifecycle on hover, press, or focus (`group-hover`, `group-active`). Always specify an explicit `size={...}` parameter on kinetic motion icons matching the parent container target.
11. **Perceptual Gradient Engineering & Dual-Engine Contrast**: Linear gradient text with neon fills is strictly banned. CSS gradient ramps must interpolate in modern perceptual colour spaces (`linear-gradient(in oklch, ...)`). All surfaces must satisfy WCAG 2.2 Level AA ($\ge 4.5:1$ body, $\ge 3:1$ graphics) and WCAG 3 APCA ($|L_c| \ge 60$ for controls, $|L_c| \ge 75$ for reading text).
12. **British English Spelling & Prose Cadence**: All user-facing prose, document headings, code comments, interface descriptions, tooltips, and commit messages must strictly adhere to British English spelling (`prioritise`, `synchronised`, `colour`, `centre`, `behaviour`, `grey`, `dialogue`, `fulfil`, `judgement`). Never use em dashes in prose or titles; use commas, colons, semicolons, or separate sentences instead.
13. **Origin Anonymity & Self-Contained Integrity**: Present all primitives, tokens, and architectures as autonomous, self-contained standards of this design system.
14. **Telemetry Indicator Cadence**: Kinetic status beacons must maintain an optically quiet resting state (`bg-background`, soft borders, zero static halo blobs). Pulsing keyframes must enforce a periodic resting window ($\ge 60\%$ of cycle duration at `opacity: 0`). Keyframes must animate exclusively compositor properties (`transform`, `opacity`) with `transform-gpu` and `will-change-transform`.

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+
- npm 10+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/WDibble/design-system.git
cd design-system

# Install dependencies
npm install

# Start the interactive development workbench
npm run dev
```

The workbench runs locally at `http://localhost:5173`.

---

## 🧪 Verification Commands

Every pull request must pass the automated verification suite before merging:

```bash
# 1. Verify design engineering invariants (concentric radii, tabular-nums, British English, no em dashes)
npm run invariants

# 2. Fast code linting via Oxlint
npm run lint

# 3. Comprehensive test suite via Vitest & React Testing Library (54 files, 117 tests)
npm run test

# 4. TypeScript compilation and production bundle check
npm run build

# Or run all checks in a single command
npm run check
```

---

## 📐 Component Architecture Guidelines

When authoring or modifying components in `src/components/ui/`:

1. **Headless Foundation**: Build complex interactive primitives on top of Base UI (`@base-ui/react`). Do not reinvent focus management, keyboard roving tabs, or popover positioning.
2. **File Size Budget**: Keep individual component files under 250 lines. For complex primitives (such as `navigation-bar`, `timeline`, or `markdown-toolbar`), deconstruct them into a subfolder (`src/components/ui/<component-name>/`) with modular sub-components and provide a clean re-export barrel file.
3. **Compound Export Pattern**: Export both the top-level compound component and its sub-components:
   ```tsx
   export {
     Dialog,
     DialogTrigger,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogDescription,
     DialogClose,
   };
   ```
4. **Mandatory Test File**: Every component in `src/components/ui/` must have a corresponding test file in `tests/components/<component-name>.test.tsx` verifying:
   - Automated WCAG 2.2 accessibility invariants via `vitest-axe`.
   - Keyboard interaction and roving focus.
   - Screen reader attributes (`aria-*`, `role`).
   - Clean unmounting and zero memory leaks.

---

## 📝 Pull Request Workflow

1. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/accessible-control
   ```
2. **Make Focused Changes**: Follow single responsibility principles. Keep changes clean and self-contained.
3. **Write or Update Tests**: Ensure test coverage for all new interactive states and accessibility attributes.
4. **Run Verification**: Ensure `npm run check` succeeds with zero errors.
5. **Craft a British English Commit Message**:
   ```bash
   git commit -m "feat(ui): add accessible combobox primitive with keyboard roving focus"
   ```
6. **Open a Pull Request**: Fill out the pull request template with screenshots or recordings of the interactive behaviour.
