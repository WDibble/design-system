# System Architecture

This document describes the architectural philosophy, technical foundation, and directory organization of the design system.

---

## 🏛️ Architectural Overview

This design system is constructed upon five core architectural pillars:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Design System Architecture                      │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Headless Primitives     Base UI (@base-ui/react)                    │
│    Accessible, unstyled behavior, roving tabindex, focus management   │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Styling & Tokens        Tailwind CSS v4 + OKLCH Token Engine        │
│    Perceptual color spaces, dual-engine contrast, zero runtime CSS     │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Tactile Motion Physics  Motion (motion/react)                       │
│    Apple HIG fluid interface springs, pointerdown active feedback      │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Spatial Materials       Liquid Glass & Concentric Radii Geometry    │
│    Specular rim lighting, ambient occlusion, mathematical concentricity│
├────────────────────────────────────────────────────────────────────────┤
│ 5. Agent-Native Manifests  llms.txt, llms-full.txt, registry.json      │
│    Machine-readable indexes for autonomous developer agents            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Organization

The repository enforces strict separation of concerns and file budgets (keeping source files under 250 lines):

```
design-system/
├── public/                       # Static assets and agent-native manifests
│   ├── llms.txt                  # Standard LLM discovery index
│   ├── llms-full.txt             # Comprehensive machine-readable manual
│   └── registry.json             # Component metadata, imports, and dependencies
├── src/
│   ├── components/
│   │   ├── demo/                 # Showcase and interactive preview frames
│   │   │   ├── advanced-primitives/ # Deconstructed modular showcases
│   │   │   └── icon-gallery.tsx  # Interactive directory for 470+ icons
│   │   ├── icons/                # 470+ kinetic vector icons with mechanical physics
│   │   ├── theme-studio/         # Interactive real-time OKLCH theme editor (⌘T)
│   │   └── ui/                   # 51 accessible UI primitives
│   │       ├── markdown-toolbar/ # Modular rich-text formatting controls
│   │       ├── navigation-bar/   # Modular adaptive navigation architectures
│   │       ├── timeline/         # Modular telemetry and event timeline
│   │       └── ...               # Standalone primitives (<250 lines each)
│   ├── hooks/                    # Reusable React hooks (useHoldToStep, useToast)
│   ├── lib/                      # Core helpers (cn utility)
│   ├── pages/
│   │   └── workbench/            # Deconstructed modular interactive workbench
│   │       └── sections/         # Sub-250-line demo domain sections
│   ├── tokens/                   # Canonical tokens (motion springs, OKLCH scales)
│   ├── App.tsx                   # Top-level shell and keyboard command router
│   ├── index.css                 # OKLCH design tokens and Tailwind v4 theme
│   └── main.tsx                  # Application entry point
├── tests/
│   ├── components/               # Automated test suites for all 51 primitives
│   ├── hooks/                    # Unit tests for custom hooks
│   ├── tokens/                   # Mathematical assertions for contrast and physics
│   └── setup.ts                  # Testing environment polyfills and axe matchers
├── scripts/
│   └── verify-invariants.mjs     # Automated design invariant verification engine
├── CONTRIBUTING.md               # Contribution rules and design engineering matrix
├── ARCHITECTURE.md               # This technical architecture document
└── AGENTS.md                     # Agent directives and non-negotiable invariants
```

---

## 🧩 1. Headless Primitives (Base UI)

Every complex interactive primitive delegates state, accessibility attributes, and keyboard navigation to `@base-ui/react`.

### Why Base UI?

- **Zero Style Presumptions**: Clean separation between DOM structure, accessible behavior, and visual presentation.
- **WAI-ARIA Compliance**: Automatic management of `aria-expanded`, `aria-haspopup`, `aria-controls`, and `aria-selected`.
- **Roving Tabindex**: Standardised keyboard navigation across menus, toolbars, tabs, and radio groups.
- **Portal & Positioning**: Robust floating element positioning with collision detection and viewport flipping without manual coordinate calculations.

---

## 🎨 2. Styling System & Perceptual Color Engine

### Tailwind CSS v4 `@theme inline`

The design system adopts Tailwind CSS v4, utilizing CSS variables bound directly through the `@theme inline` directive in [`src/index.css`](src/index.css). This eliminates JavaScript-based theme configs and delivers instant styling compiles.

### OKLCH Perceptual Color Space

Traditional sRGB and HSL color models suffer from non-uniform perceived brightness, causing yellow to appear blindingly bright and blue to appear dark at identical lightness values.

We construct all design tokens in the **OKLCH** color space:

- **L (Lightness)**: Directly corresponds to human perceptual brightness.
- **C (Chroma)**: Purity and saturation without clipping.
- **H (Hue)**: Cylindrical hue angle.

### Dual-Engine Contrast Invariant

All color pairings must satisfy two distinct contrast engines simultaneously:

1. **Compliance Engine (WCAG 2.2 Level AA)**:
   - Body reading text: $\ge 4.5:1$ contrast ratio.
   - Graphical boundaries and focus rings: $\ge 3:1$ contrast ratio.
2. **Perceptual Engine (WCAG 3 APCA)**:
   - Interactive button and control text: $|L_c| \ge 60$.
   - Body typography: $|L_c| \ge 75$.
   - High-luminance hues (such as amber or gold) automatically map to deep obsidian foregrounds (`oklch(0.145 0 0)`) to eliminate optical irradiation and chromatic vibration.

---

## 🌀 3. Tactile Motion Physics

The system utilizes calibrated physics springs via `motion/react`:

| Spring Preset | Stiffness | Damping | Mass | Primary Use Case                                  |
| :------------ | :-------- | :------ | :--- | :------------------------------------------------ |
| `tactile`     | 600       | 30      | 0.8  | Button presses, segmented toggles, card taps      |
| `snappy`      | 550       | 35      | 0.6  | Dropdown popups, select menus, tooltip warmups    |
| `dialog`      | 350       | 35      | 1.0  | Modal sheets, dialog backdrops, full drawers      |
| `squishy`     | 420       | 24      | 0.8  | Playful badges, organic icons, notification pings |
| `micro`       | 700       | 40      | 1.0  | Subtle 1px focus borders, switch handles          |

### Invariant Rules for Motion

1. **Compositor Exclusivity**: Keyframes animate exclusively `transform` and `opacity` properties. Layout properties (`top`, `left`, `margin`, `padding`) and CPU paint properties (`filter: drop-shadow`) are strictly banned from animation loops.
2. **Physical Yield on `pointerdown`**: Interactive controls register physical compression immediately when pressed down, avoiding sluggish release-dependent delays.
3. **Reversible Mechanical Affordances**: Animated icons maintain static geometry at rest and execute reversible mechanical glides on interaction.

---

## 💎 4. Spatial Materials & Concentric Geometry

### Concentric Corner Radii

To maintain harmonious optical spacing when nesting rounded containers, inner radii must satisfy:
$$R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{Padding})$$

Failure to adjust the inner radius produces lumpy, bulging inner shapes. Our card primitives enforce this rule mathematically via `<Card>` and `<CardInner>`.

### Liquid Glass Surface Tiers

The design system defines four spatial tiers of glass material:

- **Tier 1 (Surface Glass)**: Subtle background transparency with `backdrop-filter: blur(12px)`.
- **Tier 2 (Floating Popover Glass)**: Directional specular rim lighting (`inset 0 1px 0 rgba(255,255,255,0.1)`).
- **Tier 3 (Modal Sheet Glass)**: Deep atmospheric ambient occlusion shadows with chromatic rim highlights.
- **Tier 4 (HUD Glass)**: Ultra-dense micro-blur for floating persistent telemetry pills.

---

## 🤖 5. Agent-Native Architecture

This repository is built for autonomous AI agents and human design engineers alike:

1. **`public/llms.txt`**: Standard machine-readable index referencing core architectural invariants, the 51 primitives catalogue, and 470+ kinetic icons.
2. **`public/llms-full.txt`**: Complete, self-contained implementation manual including token values, spring configs, and copy-paste component usage examples.
3. **`public/registry.json`**: Machine-readable JSON component registry specifying file locations, variants, dependencies, and component boundaries.
4. **`AGENTS.md`**: Directives and non-negotiable invariants evaluated automatically during development.

---

## 🧪 6. Testing & Quality Assurance

Our automated test infrastructure covers:

- **WCAG 2.2 Accessibility Auditing**: Automated evaluation via `vitest-axe` and `axe-core` across every single primitive.
- **Keyboard Navigation**: Verification of Arrow navigation, Enter/Space activation, and Escape dismissals.
- **Layout Shift Invariants**: Zero-shift assertions confirming static geometry across dynamic states.
- **Oxlint**: Sub-100ms ultra-fast static code analysis.
