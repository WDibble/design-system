# Tooling Architecture & Quality Engineering

This document outlines the developer tooling, automated quality gates, and architectural testing infrastructure powering the design system. It details every tool in the pipeline, the design rationale behind its adoption, comparisons against legacy alternatives, and instructions for everyday development.

---

## Architecture Overview

The tooling infrastructure is designed around three core principles:

1. **Sub-Second Feedback**: Quality gates must execute with near-zero latency, ensuring that verification never hinders engineering flow.
2. **Deterministic Invariant Enforcement**: Design principles, accessibility thresholds, and layout constraints must be mathematically and programmatically verified rather than left to manual review.
3. **Unified Vite Ecosystem**: Tooling directly shares Vite configuration, module resolution, and CSS pipeline tokens, avoiding configuration drift.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Developer Interaction                           │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
            Pre-Commit Trigger               Continuous Integration
                    │                                │
    ┌───────────────▼──────────────┐   ┌─────────────▼──────────────────┐
    │ nano-staged                  │   │ GitHub Actions Matrix          │
    │ ├─ cspell (British English)  │   │ ├─ typecheck (tsc)             │
    │ ├─ oxlint (Rust linter)      │   │ ├─ verify-invariants (AST)     │
    │ └─ prettier (Tailwind v4)    │   │ ├─ cspell & oxlint             │
    └───────────────┬──────────────┘   │ ├─ vitest (JSDOM + Axe)        │
                    │                  │ └─ production build (Vite)     │
                    ▼                  └────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                   Verified Design System Artefact                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Tooling Matrix & Justifications

### 1. Oxlint (`oxlint` & `vite-plugin-oxlint`)

- **Role**: Primary linter for TypeScript, React, accessibility (`jsx-a11y`), and code cleanliness.
- **Configuration**: [`.oxlintrc.json`](file:///Users/dibble/Documents/GitHub/design-system/.oxlintrc.json)
- **Vite Integration**: [`vite.config.ts`](file:///Users/dibble/Documents/GitHub/design-system/vite.config.ts)

#### Why Oxlint?

- **Performance**: Oxlint is written in Rust and executes linting passes across the entire codebase in approximately 110ms to 150ms. By comparison, legacy ESLint setups require between 8 and 20 seconds for equivalent checks.
- **React 19 & Compiler Rules**: Oxlint incorporates native React rules that audit hook dependencies, impure function invocations in render bodies, component context memoisation, and state updates inside effects.
- **Integrated Accessibility Rules**: Built-in `jsx-a11y` rules enforce W3C WCAG accessibility standards at the syntax level (such as image alt attributes, interactive role validity, and keyboard handler presence).
- **Live In-Editor Diagnostics**: The `vite-plugin-oxlint` integration surfaces lint diagnostics directly within the terminal during local Vite development without causing Hot Module Replacement (HMR) lag.

#### Legacy Comparison

- _Compared to ESLint_: ESLint requires extensive plugin dependency trees, complex parser layers, and high Node.js memory overhead. Oxlint operates as a single binary with zero configuration overhead and instant execution.

---

### 2. Vitest (`vitest` with `jsdom`)

- **Role**: Unit testing, DOM component interaction testing, and token regression testing.
- **Configuration**: [`vitest.config.ts`](file:///Users/dibble/Documents/GitHub/design-system/vitest.config.ts)
- **Setup File**: [`tests/setup.ts`](file:///Users/dibble/Documents/GitHub/design-system/tests/setup.ts)

#### Why Vitest?

- **Native Vite Synergy**: Vitest shares the exact configuration, `@/` path alias definitions, and module resolution rules used by Vite. There is no requirement for duplicate Babel transforms or secondary module mappers.
- **Fast In-Memory Execution**: Re-runs affected tests in sub-second time on file change, maintaining continuous feedback during component engineering.

#### Why JSDOM instead of Happy-DOM?

- Headless compound components (built with Base UI) rely on full W3C focus management, synthetic event propagation, and DOM tree traversal.
- While Happy-DOM offers minimal performance gains for plain HTML, it lacks complete focus-trapping fidelity and portal tree reconciliation. JSDOM provides the standard browser environment simulation necessary to guarantee that dialogs, popovers, and dropdown menus pass rigorous accessibility tests.

---

### 3. Automated Accessibility Auditing (`vitest-axe`)

- **Role**: Automated accessibility assertions on rendered component DOM trees.
- **Integration**: Configured globally in [`tests/setup.ts`](file:///Users/dibble/Documents/GitHub/design-system/tests/setup.ts) via `toHaveNoViolations()`.

#### Why Vitest-Axe?

- **Continuous WCAG Compliance**: Every component test executes axe-core audits against rendered primitives.
- **Catch Regressions Early**: Identifies missing ARIA attributes, invalid role relationships, orphaned labels, and keyboard accessibility gaps before code reaches pull requests.

---

### 4. Dual-Engine Contrast Verification (`culori` & `apca-w3`)

- **Role**: Mathematical verification of color palette tokens and contrast compliance.
- **Test Suite**: [`tests/tokens/contrast.test.ts`](file:///Users/dibble/Documents/GitHub/design-system/tests/tokens/contrast.test.ts)
- **Contrast Utility**: [`src/lib/contrast.ts`](file:///Users/dibble/Documents/GitHub/design-system/src/lib/contrast.ts)

#### Why Dual-Engine Testing?

Traditional accessibility testing evaluates only WCAG 2.2 simple contrast ratios. However, WCAG 2.2 fails to account for human perceptual lightness non-linearities, spatial frequency, and font weight variations. The design system enforces dual verification:

1. **Compliance Engine (WCAG 2.2 Level AA)**:
   - Body text contrast ratio must be greater than or equal to 4.5:1.
   - UI components, boundaries, and focus rings must be greater than or equal to 3.0:1.
2. **Perceptual Engine (WCAG 3 APCA)**:
   - Interactive controls and buttons (medium to bold weight) must achieve an estimated lightness contrast of $|L_c| \ge 60$.
   - Body text reading blocks must achieve an estimated lightness contrast of $|L_c| \ge 75$.
   - High-luminance hues (such as amber and yellow) automatically enforce deep obsidian foregrounds to prevent optical chromatic vibration and irradiation.

---

### 5. Deterministic Tailwind Formatting (`prettier` & `prettier-plugin-tailwindcss`)

- **Role**: Code formatting and deterministic CSS utility ordering.
- **Configuration**: [`prettier.config.mjs`](file:///Users/dibble/Documents/GitHub/design-system/prettier.config.mjs)

#### Why Prettier with Tailwind Plugin?

- **Elimination of Git Diffs**: Organises Tailwind classes in a consistent, deterministic order across the entire team.
- **Tailwind CSS v4 Compatibility**: Configured with `tailwindStylesheet: "./src/index.css"`, allowing the Prettier plugin to parse the v4 `@theme inline` semantic tokens and correctly order custom utility classes.

---

### 6. Linguistic Quality & British English (`cspell` & `@cspell/dict-en-gb`)

- **Role**: Automated spellchecking and British English dialect enforcement.
- **Configuration**: [`cspell.json`](file:///Users/dibble/Documents/GitHub/design-system/cspell.json)

#### Why CSpell with Custom Rules?

- **Editorial Consistency**: Enforces British English spelling across all user-facing copy, component documentation, tooltips, and code comments (`colour`, `behaviour`, `prioritise`, `synchronised`, `dialogue`, `centre`, `fulfil`).
- **Flagged Words Gate**: Explicitly flags American English variants in `cspell.json` (such as `prioritize`, `behavioral`, `synchronize`, `fulfill`), failing pre-commit hooks and CI runs if American spellings are introduced.
- **Design System Vocabulary**: Maintains an approved dictionary of technical terms (`oklch`, `apca`, `culori`, `radix`, `unocss`, `rolldown`, `vitest`).

---

### 7. Custom Invariant Auditor (`scripts/verify-invariants.mjs`)

- **Role**: Static analysis enforcing design engineering invariants from `AGENTS.md`.
- **Script**: [`scripts/verify-invariants.mjs`](file:///Users/dibble/Documents/GitHub/design-system/scripts/verify-invariants.mjs)

#### Enforced Invariants:

- **Directive 2 (Zero Layout Shifts)**: Scans interactive component source files for forbidden dynamic layout modifications on interactive pseudo-classes (`hover:`, `active:`, `focus:`, `data-[state=open]:`). Bans dynamic changes to height, width, padding, margin, or border width. Interactive outlines must use transparent borders on their base rest state.
- **Directive 12 (AI Em Dash Ban)**: Scans all documentation, markdown files, and component copy for em dashes (the Unicode long dash character, HTML mdash entities, or double hyphens). All prose must use natural clause structures (commas, colons, semicolons, or distinct sentences) to avoid generic boilerplate patterns.

---

### 8. Fast Git Hooks (`simple-git-hooks` & `nano-staged`)

- **Role**: Client-side pre-commit quality gate.
- **Configuration**: Defined in [`package.json`](file:///Users/dibble/Documents/GitHub/design-system/package.json).

#### Why Simple Git Hooks over Husky?

- **Zero Dependency Footprint**: Husky introduces multiple wrapper scripts, runtime overhead, and complex hook lifecycle management. `simple-git-hooks` is a lightweight, zero-dependency alternative configured directly within `package.json`.
- **Selective Pre-Commit Staging (`nano-staged`)**: Only runs formatting, linting, and spellchecking on files actively staged for commit. Pre-commit checks complete in under 200ms.

---

### 9. Continuous Integration (`.github/workflows/ci.yml`)

- **Role**: Automated gatekeeper on pull requests and pushes to `main`.
- **Workflow**: [`.github/workflows/ci.yml`](file:///Users/dibble/Documents/GitHub/design-system/.github/workflows/ci.yml)

The pipeline executes four parallel jobs:

1. **Typecheck**: Verifies TypeScript typing across source and test files (`tsc -b`).
2. **Lint, Spellcheck & Invariants**: Concurrently executes `oxlint src`, `cspell`, and `node scripts/verify-invariants.mjs`.
3. **Vitest Unit & Contrast Suite**: Runs headless component accessibility and mathematical color contrast suites.
4. **Production Build**: Compiles client assets and bundles with Vite to guarantee zero build failures.

---

## Developer Commands Reference

| Command              | Description                                                   | Target Performance |
| :------------------- | :------------------------------------------------------------ | :----------------- |
| `npm run lint`       | Runs Oxlint across all source files                           | ~120ms             |
| `npm run test`       | Executes Vitest with JSDOM and Vitest-Axe                     | ~1.5s              |
| `npm run test:watch` | Starts Vitest in interactive watch mode                       | Instant            |
| `npm run spellcheck` | Audits vocabulary and British English compliance              | ~350ms             |
| `npm run invariants` | Verifies zero layout shifts and em dash bans                  | ~50ms              |
| `npm run format`     | Deterministically formats code and sorts Tailwind classes     | Staged files       |
| `npm run check`      | Executes full quality gate (invariants + lint + test + build) | ~3.0s              |
| `npm run build`      | Compiles production bundle                                    | ~1.3s              |

---

## Summary for Consumers of the Design System

When adopting or extending components from this library:

1. **Accessibility is Built-In**: Primitives come pre-verified against WCAG 2.2 AA and APCA contrast thresholds. You do not need to manually calculate contrast ratios when using standard tokens.
2. **Physical Yield & Kinetic Affinity**: Interactive controls feature tactile `scale(0.98)` feedback on pointer down and zero layout shifting across states.
3. **Rigorous Quality Gate**: Every pull request and release is guarded by Rust-speed linting, invariant scanners, and deterministic formatting, ensuring that changes remain stable, accessible, and performant.
