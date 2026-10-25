# Master Research Synthesis: Grounding Our Design System

> **Comprehensive Research Grounding**: This document synthesizes all research and reference repositories cloned into `inspiration/` to establish the definitive standards, rules, and components for our agent-native design system.

---

## 📚 Complete Staging Directory Inventory (`inspiration/`)

| Directory | Author / Source | Key Focus & Assets |
| :--- | :--- | :--- |
| **`inspiration/impeccable/`** | [Paul Bakaus (`pbakaus/impeccable`)](https://github.com/pbakaus/impeccable) | **Anti-Slop & Craft Floor**: Rules against lazy card grids, hero-metrics, section eyebrows, fake glassmorphism. OKLCH palette definitions. |
| **`inspiration/emilkowalski/`** | [Emil Kowalski (`emilkowalski/skills`)](https://github.com/emilkowalski/skills) | **Apple Fluid Motion**: WWDC *Designing Fluid Interfaces*, spring curves, 1:1 direct tracking, response on `pointerdown` (`scale(0.97)`). |
| **`inspiration/raunofreiberg/`** | [Rauno Freiberg (`raunofreiberg/interfaces`)](https://github.com/raunofreiberg/interfaces) | **Micro-Interactions**: Tabular numbers (`tabular-nums`), `@media (hover: hover)`, tap-highlight removal, iOS input zoom prevention. |
| **`inspiration/tweakcn/`** | [Sahaj Jain (`jnsahaj/tweakcn`)](https://github.com/jnsahaj/tweakcn) | **Semantic Theming Schema**: Zod validation, OKLCH light/dark token sets, dynamic `--radius`, and theme export/import mechanics. |
| **`inspiration/base-ui/`** | [MUI Core Team (`mui/base-ui`)](https://github.com/mui/base-ui) | **Headless Primitives (Replacing Radix)**: 38+ unstyled primitives with compound slot anatomy and modern CSS animation hooks. |
| **`inspiration/ibelick-ui-skills/`**| [Julien Thibeaut (`ibelick/ui-skills`)](https://github.com/ibelick/ui-skills) | **Baseline UI & Accessibility Matrix**: Enforcing `motion/react`, Base UI, `h-dvh` over `h-screen`, WCAG 2.2 priority ranking. |
| **`inspiration/uiGradients/`** | [Indrasish Ghosh (`ghosh/uiGradients`)](https://github.com/ghosh/uiGradients) | **Curated Gradients**: Hundreds of balanced, non-slop color ramps and gradient pairs. |
| **`inspiration/awesome-design-md/`**| [VoltAgent (`VoltAgent/awesome-design-md`)](https://github.com/VoltAgent/awesome-design-md) | **86 Production `DESIGN.md` Files**: Architectural specs from Apple (SF Pro, parchment canvas, Action Blue), Linear, Figma, and Vercel. |
| **`inspiration/ui-ux-pro-max-skill/`**| [NextLevelBuilder (`nextlevelbuilder/ui-ux-pro-max-skill`)](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | **Data Catalogs**: Color psychology, typography pairing, motion curves, React performance guidelines, and app interface datasets. |
| **`inspiration/vercel-labs-skills/`**| [Vercel Labs (`vercel-labs/skills`)](https://github.com/vercel-labs/skills) | **Agent Skills**: AI design engineering workflows and automated audit patterns. |
| **`inspiration/originui/`** | [Origin Space (`origin-space/originui`)](https://github.com/origin-space/originui) | **600+ Component Variants**: Production-tested micro-interactions, input states, sliders, switches, and tactile details in Tailwind + Motion. |

---

## 🎯 Distilled Design Engineering Invariants

### 1. Motion & Physics Directives
- **Zero Linear Transitions**: Always use physical springs from `motion/react` (`tactile`, `dialog`, `snappy`, `micro`).
- **Response Latency**: Trigger visual active feedback on **`pointerdown`**, never on click or mouse-up.
- **Scale Limits**: Modals enter from `0.95` → `1.0` (never `0`). Buttons compress to `0.97` or `0.98` on press.
- **Compositor Only**: Animate exclusively `transform` and `opacity`. Never animate `width`, `height`, `margin`, or `padding`.

### 2. Typographic Rules
- **Anti-Aliased Text**: Enforce `-webkit-font-smoothing: antialiased` globally.
- **Prose Bounds**: Body text constrained to `65–75ch`.
- **Tabular Figures**: Counters, timestamps, and table numbers must specify `font-variant-numeric: tabular-nums` to eliminate jitter.
- **No Layout Shift on Hover**: Never change `font-weight` on hover or selection.

### 3. Anti-Slop Bans (Negative Heuristics)
- **No Nested / Identical Card Grids**: Reject 3-column identical card rows without distinct content hierarchy.
- **No Eyebrow / Kicker Labels**: Banned above section headings.
- **No Fake Glassmorphism**: Blurs require optical borders (`inset 0 1px 0 rgba(255,255,255,0.1)`) and functional hierarchy.
- **No Block Neobrutalism**: Reject zero-blur hard offset shadows unless explicitly requested.
- **No Sticky Touch Hover**: All hover states must be scoped within `@media (hover: hover)`.

### 4. Accessibility Hierarchy (WCAG 2.2)
1. **Accessible Names**: All icon-only buttons require explicit `aria-label`.
2. **Keyboard Traps & Escape**: Dialogs trap focus, restore focus on close, and dismiss on Escape.
3. **Contrast Ratios**: Body text $\ge 4.5:1$, large text $\ge 3:1$.
4. **Form Association**: Labels always linked to inputs via `htmlFor`/`id`, error messages linked via `aria-describedby`.
5. **No Layout Shift on Loading**: Skeletons and spinners must preserve exact intrinsic dimensions (`aria-busy="true"`).

### 5. Semantic Tokens & Theming (tweakcn + Tailwind v4)
- Bind all semantic tokens using Tailwind v4 `@theme inline`.
- Support seamless two-way import and export with `tweakcn.com`.
- Light, Dark, and OLED/True Black presets built in.
