# Master Implementation Plan: Agent-Native Holistic Design System

> **The Movement & Standard**: This repository is not merely a component library; it is a movement and living philosophy for high-craft, human-centric design engineering. Grounded in [PHILOSOPHY.md](PHILOSOPHY.md) and synthesized from foundational design engineering traditions.

---

## 🏛️ The Five Philosophical Pillars

1. **Physical Truth**: Interfaces obey the physical laws of the universe: inertia, mass, calibrated springs, and immediate `pointerdown` tactile feedback.
2. **Quiet Chrome**: Software is a gallery for human work; decorative noise, card-in-card nesting, and gratuitous gradients are rejected.
3. **Spatial & Typographic Harmony**: Whitespace is breathing room; typography has gravitas without screaming kickers; numbers are tabular (`tabular-nums`).
4. **Emotional Dignity**: Interfaces grant safety, clarity, forgiveness, and micro-delight to the human nervous system.
5. **The Anti-Slop Conviction**: AI coding agents are taught human taste, strict negative constraints, and uncompromising craft floors.

---

## 🎯 Architectural Invariants & Tech Stack

- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`, `@theme inline`, OKLCH variables).
- **Headless Primitives**: Base UI (`@base-ui/react`) for accessible, unstyled compound primitives.
- **Motion Engine**: `motion` (`motion/react`) for fluid springs, layout transitions, and tactile feedback.
- **Semantic Theming**: Two-way interoperable semantic theme token JSON and CSS variable schema.
- **Component Model**: Modular compound structure (`components/ui/*`), copy-paste friendly.
- **Demo Workbench**: Interactive Vite + React workbench with live theme switching, token import/export, and component state matrix.
- **AI-Native Skills**: Embedded repository skills (`skills/`) codifying fluid motion, WCAG 2.2 accessibility, and anti-slop rules.

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
- [x] Synthesised craft floor criteria, anti-slop rules, and OKLCH perceptual palettes.
- [x] Synthesised fluid motion principles, WWDC guidelines, and physics-based spring curves.
- [x] Synthesised micro-interaction invariants, touch/iOS safeguards, and gesture boundaries.
- [x] Synthesised semantic theme token schemas, Zod validation, and light/dark OKLCH tokens.
- [x] Evaluated headless accessible primitives, ARIA compound models, and keyboard navigation.
- [x] Synthesised perceptual color gradients, atmospheric grounds, and specular highlights.
- [x] Audited production design system guidelines across modern software engineering standards.

### Phase 1: Codifying the Living Design Skills & Cognitive Rules (Completed & Stress-Tested)
- [x] Create `AGENTS.md` universal entry point for all AI coding harnesses.
- [x] Streamline skills architecture (single canonical `skills/` directory following the open standard, DRY, vendor-clutter free).
- [x] Create `skills/craft-philosophy/SKILL.md`:
  - The Human Thought Process: Designing for human sensory intuition, eye fatigue, cognitive load, and dignity.
  - The Anti-Slop Directive: Deterministic bans on AI cliches (identical 3-card grids, section eyebrows, fake glassmorphism, linear easing).
  - Tactile yield on `pointerdown`, spring physics, typography rhythms.
  - The Mandatory 9-State Matrix.
  - Concentric Corner Radii ($R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$) and Corner Smoothing (Apple Squircle curvature).
  - CSS Grid Accordion Standard (`grid-template-rows: 0fr ➔ 1fr` with `min-h-0 overflow-hidden`).
- [x] Create `skills/base-ui-primitives/SKILL.md`:
  - Headless composition patterns, ARIA mechanics, compound slot anatomy, keyboard focus traps.
  - WCAG 2.2 accessibility checklist, Outside-Click / Escape parity law, Concealed Interactive Focus Invariant (`inert` law).
- [x] Create `skills/motion-physics/SKILL.md`:
  - Calibrated spring curves (`tactile`, `dialog`, `snappy`, `micro`), velocity inheritance, interruptibility, zero-delay on interactive triggers, and `prefers-reduced-motion`.
- [x] Create `skills/semantic-theming/SKILL.md`:
  - Semantic token schema, light/dark/OLED OKLCH variables, two-way import/export specifications, and mandatory `color-mix(in oklch, ...)`.
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
- [x] Configure Tailwind v4 `@theme inline` and root semantic CSS variables (Light, Dark, OLED) in `src/index.css`.
- [x] Configure strict TypeScript path aliasing (`@/*` -> `./src/*`).
- [x] Implement core utilities: `src/lib/utils.ts` (`cn`), `src/tokens/motion.ts` (calibrated springs), and `src/lib/theme.ts` (Zod validation & runtime theme applier).
- [x] Verified 100% clean production build (`npm run build`, 0 errors, 0 warnings).

### Phase 3: Core Design Tokens & Motion Physics Engine
- [x] Define motion springs (`tokens/motion.ts`).
- [x] Define materials & optical border layers (`tokens/materials.css`).
- [x] Configure typographic tracking & scale.

### Phase 4: Foundational Component Library (The 9-State Matrix)
- [x] **Batch 1 (Core Action & Surface Primitives)**:
  - `Button` (`src/components/ui/button.tsx`): All variants (`default`, `secondary`, `destructive`, `outline`, `ghost`, `link`), sizes (`sm`, `default`, `lg`, `icon` with 44px touch targets), tactile spring press on `pointerdown` (`scale(0.975)`), zero-dimension-shift loading states, animated compositor underline on links, dual `iconTrigger` (`hover` vs `press`), explicit `type="button"`.
  - `Badge` (`src/components/ui/badge.tsx`): All variants (`default`, `secondary`, `destructive`, `outline`, `success`), optical baseline centering, tabular numerals, live pulsing status dot.
  - `Card` (`src/components/ui/card.tsx`): Compound slots (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardInner`), concentric corner radii math ($R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$), 1px specular top rim highlight, multi-layer physical elevation, container query context (`@container`).
  - `Stepper` (`src/components/ui/stepper.tsx`): Compound plug-and-play stepper with press-and-hold momentum acceleration (`useHoldToStep`), boundary clamping, and tabular digit odometer.
  - `NumberTicker` (`src/components/ui/number-ticker.tsx`): Exact unit-height (`1em`) rolling odometer number ticker with tabular figures.
  - `SegmentedControl` (`src/components/ui/segmented-control.tsx`): Zero-layout-shift multi-segment toggle with sliding pill (`layoutId`), locked `font-medium`, and isolated GPU text layers.
  - `Icons` (`src/components/icons/`): Animated icons governed by Directive #8 (Reversible Mechanical Affordance Doctrine).
- [x] **Batch 2 (Form & Input Primitives)**:
  - `Input` & `Textarea` (`src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`): Built on Base UI `@base-ui/react/input` and native HTML textarea, with prefix/suffix addons, left/right icons, 16px iOS font-zoom prevention (`text-base sm:text-sm`), 1px specular lighting, and vertical-only resize.
  - `Field` (`src/components/ui/field.tsx`): Headless compound field anatomy (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldControl`) wrapping `@base-ui/react/field` for automatic ARIA error/description linkage.
  - `Switch` (`src/components/ui/switch.tsx`): Built on `@base-ui/react/switch` with fluid spring easing (`cubic-bezier(0.16,1,0.3,1)`), 44px touch target expansion (`after:-inset-2`), and active press squish.
  - `Checkbox` (`src/components/ui/checkbox.tsx`): Built on `@base-ui/react/checkbox` with concentric radii (`rounded-[5px]`), 44px touch target, physical yield on pointerdown (`active:scale-90`), with checked (`CheckIcon`) and indeterminate (`MinusIcon`) states.
  - `Slider` (`src/components/ui/slider.tsx`): Built on `@base-ui/react/slider` with continuous thumb tracking (`active:scale-115`), 44px touch target, and tabular numeral readout (`tabular-nums`).
- [x] **Batch 3 (Overlays & Floating Surfaces)**:
  - `Dialog` & `AlertDialog` (`src/components/ui/dialog.tsx`, `src/components/ui/alert-dialog.tsx`): Built on `@base-ui/react/dialog` and `@base-ui/react/alert-dialog` with fluid spring curves (`cubic-bezier(0.16,1,0.3,1)`), focus trapping, outside-click and Escape parity, 1px specular lighting, and safe default focus on Cancel for destructive alerts.
  - `Sheet` (`src/components/ui/sheet.tsx`): Built on Base UI Dialog with 4-way directional slide physics (`side="right" | "left" | "top" | "bottom"`), trapped focus, and accessible close button.
  - `Popover` (`src/components/ui/popover.tsx`): Built on `@base-ui/react/popover` with trigger-anchored origin (`origin-(--transform-origin)`), auto-collision positioning, and micro-spring entrance.
  - `Tooltip` (`src/components/ui/tooltip.tsx`): Built on `@base-ui/react/tooltip` with `TooltipProvider` shared warm-up delay, micro-spring easing, and non-blocking layout.
  - `DropdownMenu` (`src/components/ui/dropdown-menu.tsx`): Built on `@base-ui/react/menu` with trigger-anchored origin, keyboard arrow navigation, submenus, checkbox items, radio groups, and zero-shift shortcut indicators.
- [x] **Batch 4 (Navigation, Tabs & Data Display)**:
  - `Tabs` with sliding layout indicator via `motion/react`.
  - `Accordion` with CSS Grid `0fr ➔ 1fr` standard and `inert`.
  - `Table` with tabular numerals.

### Phase 5: Interactive Demo Workbench (Completed)
- [x] Scaffold workbench with live component playground.
- [x] Build **Live Preview Canvas** (dashboard, settings, billing).
- [x] Build **Theme Customizer Toolbar** (radius, typography, OKLCH sliders).
- [x] Build **Theme JSON Importer/Exporter Modal** (instant JSON/CSS sync).
- [x] Build **State Matrix Inspector** (inspect all 9 states live).

### Phase 6: Polish & Verification (Active)
- [x] Complete WCAG 2.2 accessibility audit.
- [x] Complete origin anonymity audit.
