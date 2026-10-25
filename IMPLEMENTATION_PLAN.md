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
- **Headless Primitives**: Base UI (`@base-ui-components/react`) replacing Radix UI.
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

### Phase 2: Workspace & Tooling Setup
- [ ] Initialize workspace structure (`apps/demo`, `packages/ui` or unified root architecture).
- [ ] Install dependencies:
  - React 19 / 18 + TypeScript + Vite
  - Tailwind CSS v4 (`@tailwindcss/vite`, `tailwindcss@latest`)
  - `@base-ui-components/react`
  - `motion` (`motion/react`)
  - `clsx` & `tailwind-merge` (`cn` utility)
  - `lucide-react`
- [ ] Configure Tailwind v4 `@theme inline` and root tweakcn semantic CSS variables (Light, Dark, OLED).

### Phase 3: Core Design Tokens & Motion Physics Engine
- [ ] Define motion springs (`tokens/motion.ts`).
- [ ] Define Apple materials & optical border layers (`tokens/materials.css`).
- [ ] Configure typographic tracking & scale.

### Phase 4: Foundational Component Library (The 9-State Matrix)
- [ ] Implement `Button` across all variants (primary, secondary, destructive, outline, ghost) with tactile spring press.
- [ ] Implement `Input` & `Textarea` with zero-shift error states and focus rings.
- [ ] Implement `Dialog` & `Sheet` using Base UI with spring entry/exit physics.
- [ ] Implement `DropdownMenu` & `Popover` with trigger-anchored origins.
- [ ] Implement `Tabs` with sliding layout indicator via `motion/react`.
- [ ] Implement `Switch` & `Checkbox` with physical toggle resistance.
- [ ] Implement `Slider`, `Card`, `Badge`, and `Tooltip`.

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
