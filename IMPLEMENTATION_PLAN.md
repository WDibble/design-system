# Master Implementation Plan: Agent-Native Holistic Design System

> **The Movement & Standard**: This repository is not merely a component library; it is a movement and living philosophy for high-craft, human-centric design engineering. Grounded in [PHILOSOPHY.md](PHILOSOPHY.md) and synthesized from world-class designers (Emil Kowalski, Paul Bakaus, Rauno Freiberg, Apple, Julien Thibeaut).

---

## 🏛️ The Five Philosophical Pillars

1. **Physical Truth**: Interfaces obey the physical laws of the universe—inertia, mass, calibrated springs, and immediate `pointerdown` tactile feedback.
2. **Quiet Chrome**: Software is a gallery for human work; decorative noise, card-in-card nesting, and gratuitous gradients are rejected.
3. **Spatial & Typographic Harmony**: Whitespace is breathing room; typography has gravitas without screaming kickers; numbers are tabular (`tabular-nums`).
4. **Emotional Dignity**: Interfaces grant safety, clarity, forgiveness, and micro-delight to the human nervous system.
5. **The Anti-Slop Conviction**: AI coding agents are taught human taste, strict negative constraints, and uncompromising craft floors.

---

## 🎯 Architectural Invariants & Tech Stack

- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`, `@theme inline`, OKLCH variables).
- **Headless Primitives**: Base UI (`@base-ui/react`) replacing Radix UI.
- **Motion Engine**: `motion` (`motion/react`) for Apple HIG springs, layout transitions, and tactile feedback.
- **Semantic Theming**: 100% two-way interoperable with `tweakcn` (`jnsahaj/tweakcn`) CSS variable schema.
- **Component Model**: shadcn-compatible modular structure (`components/ui/*`), copy-paste friendly.
- **Demo Workbench**: Interactive Vite + React app structured like tweakcn with live theme switching, import/export, and component state matrix.
- **AI-Native Skills**: Embedded repo skills (`skills/`) codifying Apple/Impeccable standards, WCAG 2.2 accessibility, and anti-slop rules.
- **Inspiration Workbench**: Dedicated staging ground (`inspiration/`) for Emil Kowalski, Impeccable, Apple, and Vercel references (to be purged on completion).

---

## 🚦 Component State Machine Requirements

Every interactive component MUST implement and visually handle the complete state spectrum:
- [x] **Default (`idle`)**: Optical baseline alignment, calibrated typography tracking, subtle inner highlight (`inset 0 1px 0 rgba(255,255,255,0.08)`).
- [x] **Hovered (`hover`)**: Subtle luminance shift, optical elevation lift without layout shift.
- [x] **Pressed / Active (`pressed`)**: Tactile spring compression (`scale-[0.98]` via `motion`), haptic visual feedback.
- [x] **Focused (`focus-visible`)**: Crisp 2px offset ring (`ring-2 ring-ring ring-offset-2 ring-offset-background`), keyboard-only trigger.
- [x] **Loading (`loading`)**: Layout-stable spinner/skeleton, intrinsic dimensions locked, `aria-busy="true"`.
- [x] **Disabled (`disabled`)**: Reduced opacity, `pointer-events-none`, `aria-disabled="true"`.
- [x] **Selected / Checked (`selected`)**: Fluid layout transitions via `motion` (`layoutId`).
- [x] **Invalid / Error (`error`)**: Destructive border, contextual aria descriptions, subtle shake alert.

---

## 📋 Phased Execution Tracker

### Phase 0: Research & Reference Staging (Completed)
- [x] Clone and inspect Paul Bakaus's `pbakaus/impeccable` (craft floor, anti-slop rules, OKLCH palettes).
- [x] Clone and inspect Emil Kowalski's `emilkowalski/skills` (Apple fluid motion, WWDC principles, spring curves).
- [x] Clone and inspect Rauno Freiberg's `raunofreiberg/interfaces` (micro-interaction invariants, touch/iOS safeguards).
- [x] Clone and inspect Sahaj Jain's `jnsahaj/tweakcn` (semantic theme schema, Zod validation, light/dark OKLCH tokens).
- [x] Clone and inspect MUI's `mui/base-ui` (headless accessible primitives replacing Radix UI).
- [x] Clone and inspect Julien Thibeaut's `ibelick/ui-skills` (Baseline UI, accessibility matrix, Base UI preference).
- [x] Clone and inspect Indrasish Ghosh's `ghosh/uiGradients` (300+ curated color gradients).
- [x] Clone and inspect VoltAgent's `VoltAgent/awesome-design-md` (86 real-world DESIGN.md files including Apple, Linear, Figma).
- [x] Clone and inspect NextLevelBuilder's `nextlevelbuilder/ui-ux-pro-max-skill` (data catalogs for typography, motion, colors).
- [x] Clone and inspect Vercel Labs' `vercel-labs/skills` (design engineering audit skills).
- [x] Clone and inspect Origin Space's `origin-space/originui` (600+ micro-crafted Tailwind + Motion component variants).
- [x] Compile master research synthesis in `inspiration/RESEARCH_SYNTHESIS.md`.

### Phase 1: Codifying the Living Design Skills & Cognitive Rules (Completed & Stress-Tested)
- [x] Create `AGENTS.md` universal entry point for all AI coding harnesses.
- [x] Streamline skills architecture (single canonical `skills/` directory following the open standard, DRY, vendor-clutter free).
- [x] Create `skills/craft-philosophy/SKILL.md`:
  - The Human Thought Process: Designing for human sensory intuition, eye fatigue, cognitive load, and dignity.
  - The Anti-Slop Directive: Deterministic bans on AI cliches (identical 3-card grids, section eyebrows, fake glassmorphism, linear easing).
  - Apple HIG & Impeccable standards: tactile yield on `pointerdown`, spring physics, typography rhythms.
  - The Mandatory 9-State Matrix.
  - Concentric Corner Radii ($R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$) and Figma Corner Smoothing (60% Apple Squircle $G^2$ curvature).
  - CSS Grid Accordion Standard (`grid-template-rows: 0fr ➔ 1fr` with `min-h-0 overflow-hidden`).
- [x] Create `skills/base-ui-primitives/SKILL.md`:
  - Headless composition patterns, ARIA mechanics, compound slot anatomy, keyboard focus traps.
  - WCAG 2.2 accessibility checklist, Outside-Click / Escape parity law, Concealed Interactive Focus Invariant (`inert` law).
- [x] Create `skills/motion-physics/SKILL.md`:
  - Calibrated spring curves (`tactile`, `dialog`, `snappy`, `micro`), velocity inheritance, interruptibility, zero-delay on interactive triggers, and `prefers-reduced-motion`.
- [x] Create `skills/tweakcn-theming/SKILL.md`:
  - Semantic token schema, light/dark/OLED OKLCH variables, two-way import/export specifications for tweakcn.com, and mandatory `color-mix(in oklch, ...)`.
- [x] Stress-tested against complex real-world components (`ExpandableTabs`, `Web3Bento`, `BranchedMenu`) and patched all uncovered edge cases.

### Phase 2: Workspace & Tooling Setup (Completed)
- [x] Initialize clean unified workspace structure (`src/`, `src/components/ui/`, `src/tokens/`, `src/lib/`).
- [x] Install latest production dependencies:
  - React 19 (`19.3.1`) + TypeScript 5.7 + Vite 8 (`8.3.5`)
  - Tailwind CSS v4 (`4.3.3`) + `@tailwindcss/vite` (`4.3.3`)
  - `@base-ui/react` (`1.9.0`)
  - `motion` (`14.6.0`, `motion/react`)
  - `clsx` (`2.1.1`) & `tailwind-merge` v3 (`3.7.0`) (`cn` utility)
  - `lucide-react` (`1.61.0`)
  - `zod` (`4.6.7`)
- [x] Configure Tailwind v4 `@theme inline` and root tweakcn semantic CSS variables (Light, Dark, OLED) in `src/index.css`.
- [x] Configure strict TypeScript path aliasing (`@/*` -> `./src/*`).
- [x] Implement core utilities: `src/lib/utils.ts` (`cn`), `src/tokens/motion.ts` (Apple springs), and `src/lib/theme.ts` (Zod validation & runtime theme applier).
- [x] Verified 100% clean production build (`npm run build` in 1.51s, 0 errors, 0 warnings).

### Phase 3: Core Design Tokens & Motion Physics Engine
- [ ] Define motion springs (`tokens/motion.ts`).
- [ ] Define Apple materials & optical border layers (`tokens/materials.css`).
- [ ] Configure typographic tracking & scale.

### Phase 4: Foundational Component Library (The 9-State Matrix)
- [x] **Batch 1 (Core Action & Surface Primitives)**:
  - `Button` (`src/components/ui/button.tsx`): All variants (`default`, `secondary`, `destructive`, `outline`, `ghost`, `link`), sizes (`sm`, `default`, `lg`, `icon` with 44px touch targets), tactile spring press on `pointerdown` (`scale(0.975)`), zero-dimension-shift loading states, animated compositor underline on links, dual `iconTrigger` (`hover` vs `press`), explicit `type="button"`.
  - `Badge` (`src/components/ui/badge.tsx`): All variants (`default`, `secondary`, `destructive`, `outline`, `success`), optical baseline centering, tabular numerals, live pulsing status dot.
  - `Card` (`src/components/ui/card.tsx`): Compound slots (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardInner`), concentric corner radii math ($R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$), 1px specular top rim highlight, multi-layer physical elevation, container query context (`@container`).
  - `Stepper` (`src/components/ui/stepper.tsx`): Compound plug-and-play stepper with press-and-hold momentum acceleration (`useHoldToStep`), boundary clamping, and tabular digit odometer.
  - `NumberTicker` (`src/components/ui/number-ticker.tsx`): Exact unit-height (`1em`) rolling odometer number ticker with tabular figures.
  - `SegmentedControl` (`src/components/ui/segmented-control.tsx`): Zero-layout-shift multi-segment toggle with Apple spring sliding pill (`layoutId`), locked `font-medium`, and isolated GPU text layers.
  - `Icons` (`src/components/icons/`): 470 animated icons from `pqoqubbw/icons` governed by Directive #8 (Reversible Mechanical Affordance Doctrine).
- [x] **Batch 2 (Form & Input Primitives)**:
  - `Input` & `Textarea` (`src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`): Built on Base UI `@base-ui/react/input` and native HTML textarea, with prefix/suffix addons, left/right icons, 16px iOS font-zoom prevention (`text-base sm:text-sm`), 1px specular lighting, and vertical-only resize.
  - `Field` (`src/components/ui/field.tsx`): Headless compound field anatomy (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldControl`) wrapping `@base-ui/react/field` for automatic ARIA error/description linkage.
  - `Switch` (`src/components/ui/switch.tsx`): Built on `@base-ui/react/switch` with Apple HIG fluid spring easing (`cubic-bezier(0.16,1,0.3,1)`), 44px touch target expansion (`after:-inset-2`), and active press squish.
  - `Checkbox` (`src/components/ui/checkbox.tsx`): Built on `@base-ui/react/checkbox` with concentric radii (`rounded-[5px]`), 44px touch target, physical yield on pointerdown (`active:scale-90`), with checked (`CheckIcon`) and indeterminate (`MinusIcon`) states.
  - `Slider` (`src/components/ui/slider.tsx`): Built on `@base-ui/react/slider` with continuous thumb tracking (`active:scale-115`), 44px touch target, and tabular numeral readout (`tabular-nums`).
- [x] **Batch 3 (Overlays & Floating Surfaces)**:
  - `Dialog` & `AlertDialog` (`src/components/ui/dialog.tsx`, `src/components/ui/alert-dialog.tsx`): Built on `@base-ui/react/dialog` and `@base-ui/react/alert-dialog` with Apple HIG spring curves (`cubic-bezier(0.16,1,0.3,1)`), focus trapping, outside-click and Escape parity, 1px specular lighting, and safe default focus on Cancel for destructive alerts.
  - `Sheet` (`src/components/ui/sheet.tsx`): Built on Base UI Dialog with 4-way directional slide physics (`side="right" | "left" | "top" | "bottom"`), trapped focus, and accessible close button.
  - `Popover` (`src/components/ui/popover.tsx`): Built on `@base-ui/react/popover` with trigger-anchored origin (`origin-(--transform-origin)`), auto-collision positioning, and micro-spring entrance.
  - `Tooltip` (`src/components/ui/tooltip.tsx`): Built on `@base-ui/react/tooltip` with `TooltipProvider` shared warm-up delay, micro-spring easing, and non-blocking layout.
  - `DropdownMenu` (`src/components/ui/dropdown-menu.tsx`): Built on `@base-ui/react/menu` with trigger-anchored origin, keyboard arrow navigation, submenus, checkbox items, radio groups, and zero-shift shortcut indicators.
- [ ] **Batch 4 (Navigation, Tabs & Data Display)**:
  - `Tabs` with sliding layout indicator via `motion/react`.
  - `Accordion` with CSS Grid `0fr ➔ 1fr` standard and `inert`.
  - `Table` with tabular numerals.

### Phase 5: tweakcn-Style Interactive Demo Workbench
- [ ] Scaffold `apps/demo` with live component playground.
- [ ] Build **Live Preview Canvas** (dashboard, settings, billing).
- [ ] Build **Theme Customizer Toolbar** (radius, typography, OKLCH sliders).
- [ ] Build **tweakcn Importer/Exporter Modal** (instant JSON/CSS sync).
- [ ] Build **State Matrix Inspector** (inspect all 9 states live).
- [ ] Build **Mock Backend Playground** (simulate latency, optimistic updates, and server errors).

### Phase 6: Polish & Staging Purge
- [ ] Complete WCAG 2.2 accessibility audit.
- [ ] Remove temporary `inspiration/` folder prior to final commit.
