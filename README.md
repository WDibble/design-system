# Design System

> A personal front-end design system crafted at the intersection of visual precision, interaction design, and robust engineering.

This repository serves as a living portfolio, laboratory, and workbench for my personal design system as a **Design Engineer**. It codifies my visual language, interaction patterns, design tokens, and modular UI components.

While currently private, it is designed from the ground up to be **modular and copy-paste friendly** (in the spirit of modern component architectures like shadcn/ui)—making it effortless to lift individual tokens, primitives, or recipes directly into other projects without heavyweight dependency lock-in.

---

## 🎯 Core Principles

1. **Craft & Intentionality**: Every pixel, micro-interaction, transition curve, and elevation step has a deliberate rationale.
2. **Accessible by Default**: Keyboard navigation, screen-reader semantics, high-contrast support, and reduced-motion preferences built into the baseline.
3. **Copy-Paste Over Dogmatic Monoliths**: Rather than enforcing strict, rigid package imports, components are self-contained and clean so you (or others) can pluck out single components or tokens with minimal glue code.
4. **Token-Driven Consistency**: Semantic design tokens form a single source of truth across themes (light, dark, system) and viewports.
5. **Progressive Enhancement**: Resilient foundations that function smoothly across modern browsers and device form factors.

---

## 🧱 Architecture & Structure

```text
design-system/
├── tokens/              # Design tokens (colors, typography, spacing, motion, shadows)
│   ├── colors.json
│   ├── typography.json
│   └── tokens.css       # Exported CSS custom properties
├── components/          # Standalone UI components (atomic & composed)
│   ├── primitives/      # Unstyled, accessible primitives (dialog, tooltip, dropdown, etc.)
│   ├── buttons/
│   ├── inputs/
│   ├── surfaces/
│   └── feedback/
├── hooks/               # Reusable React / UI interaction hooks
├── styles/              # Global styles, resets, and utility layer
└── docs/                # Architecture notes, interactive previews, and guidelines
```

---

## 🎨 Design Tokens

Tokens are defined semantically so themes can be switched seamlessly via CSS variables or utility classes.

### Token Layers
- **Global / Primitive Tokens**: Raw values (e.g., `palette-slate-900`, `scale-16`).
- **Semantic Tokens**: Contextual roles (e.g., `surface-base`, `text-primary`, `border-subtle`, `accent-interactive`).
- **Component Tokens**: Targeted overrides for specific component states.

---

## 🚀 Grabbing & Reusing Components

Components are authored to be **independent and self-contained**:

1. **Pick the component** you need from `components/<name>/`.
2. **Copy the file(s)** (`ComponentName.tsx` and accompanying style/token definitions).
3. **Import necessary tokens** from `tokens/` or map them to your project's Tailwind config / CSS variables.

Each component folder will include:
- `Component.tsx` — Clean, well-typed TypeScript implementation.
- `Component.module.css` or Tailwind classes — Zero-fuss styling.
- `Component.stories.tsx` / `Component.demo.tsx` — Interactive playground & edge-case states.
- `README.md` — Quick copy-paste snippet and API props table.

---

## 🛠️ Tech Stack & Tooling

- **Language**: TypeScript
- **Framework**: React 19 / 18 + Vite
- **Primitives**: Base UI (`@base-ui-components/react`) for accessible, unstyled headless primitives
- **Styling**: Tailwind CSS v4 (`@theme inline`) + `tweakcn` semantic token schema
- **Motion Engine**: `motion` (`motion/react`) with Apple HIG calibrated spring physics
- **Documentation & Sandbox**: Interactive tweakcn-style workbench with live theme customization

---

## 📋 Roadmap

- [ ] Core Design Tokens (colors, typography, spacing, elevation, motion)
- [ ] Base Primitives (Button, Input, Checkbox, Badge, Avatar)
- [ ] Overlay Primitives (Modal/Dialog, Popover, Tooltip, Dropdown Menu)
- [ ] Navigation & Layout (Tabs, Navigation Bar, Command Menu / Palette)
- [ ] Data Display & Feedback (Card, Toast, Callout, Skeleton)
- [ ] Interactive Showcase / Documentation Site
