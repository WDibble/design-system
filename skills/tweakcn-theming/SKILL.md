---
name: tweakcn-theming
description: Semantic design token architecture and theme specification interoperable with tweakcn (jnsahaj/tweakcn) and Tailwind CSS v4. Governs OKLCH color spaces, CSS custom properties, @theme inline compilation, Zod validation schema, and two-way import/export. Use when creating, modifying, styling, or auditing themes, colors, radiuses, or visual tokens.
---

# tweakcn Theming: Semantic Token Architecture & Tailwind v4

This skill codifies the semantic design token architecture for the design system. It maintains **100% two-way compatibility with [tweakcn](https://github.com/jnsahaj/tweakcn)** and compiles directly into **Tailwind CSS v4** using the modern `@theme inline` directive.

---

## 🎨 Why OKLCH Color Spaces?

Traditional color spaces (sRGB, HSL, Hex) suffer from **non-uniform perceptual lightness**:
- In HSL, pure yellow (`hsl(60, 100%, 50%)`) has a perceptual lightness of ~95%, while pure blue (`hsl(240, 100%, 50%)`) has a perceptual lightness of ~30%.
- Adjusting hues in HSL distorts contrast ratios and breaks WCAG accessibility without warning.

**OKLCH solves this fundamentally:**
- Lightness (`L`), Chroma (`C`), and Hue (`H`) are perceptually uniform.
- An OKLCH lightness of `0.20` is equally dark regardless of whether the hue is emerald, sapphire, or amber.
- Themes can be generated, tinted, and inverted mathematically with zero contrast drift.

---

## 📐 The Complete Semantic Token Schema

Every theme defines its variables in `:root` (light) and `.dark` (dark/OLED) using standard CSS custom properties:

```css
@import "tailwindcss";

/* Tailwind CSS v4 dark variant mapping */
@custom-variant dark (&:is(.dark *));

@layer base {
  :root {
    /* Surfaces & Text */
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);

    /* Brand & Role */
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);

    /* Neutral & Muted */
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);

    /* Feedback Intents */
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.985 0 0);
    --success: oklch(0.51 0.16 145);
    --success-foreground: oklch(0.985 0 0);
    --warning: oklch(0.75 0.16 70);
    --warning-foreground: oklch(0.205 0 0);
    --info: oklch(0.52 0.18 245);
    --info-foreground: oklch(0.985 0 0);

    /* Borders, Inputs, Focus Rings & Radii (WCAG 2.2 SC 1.4.11 >= 3:1 focus ring) */
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.60 0 0);
    --radius: 0.625rem;

    /* Sidebar Hierarchy */
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);

    /* Chart Data Visualization */
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);

    /* Typography Defaults */
    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

    /* Apple Materials & Vibrancy Extensions */
    --material-glass: oklch(1 0 0 / 0.72);
    --material-glass-border: oklch(1 0 0 / 0.12);
  }

  .dark {
    /* Dark / OLED Canvas */
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.17 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.17 0 0);
    --popover-foreground: oklch(0.985 0 0);

    --primary: oklch(0.985 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);

    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);

    /* Feedback Intents */
    --destructive: oklch(0.396 0.141 25.723);
    --destructive-foreground: oklch(0.985 0 0);
    --success: oklch(0.42 0.14 145);
    --success-foreground: oklch(0.985 0 0);
    --warning: oklch(0.48 0.14 70);
    --warning-foreground: oklch(0.985 0 0);
    --info: oklch(0.42 0.14 245);
    --info-foreground: oklch(0.985 0 0);

    --border: oklch(0.269 0 0);
    --input: oklch(0.269 0 0);
    --ring: oklch(0.52 0 0);

    --sidebar: oklch(0.17 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.985 0 0);
    --sidebar-primary-foreground: oklch(0.205 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(0.269 0 0);
    --sidebar-ring: oklch(0.439 0 0);

    --material-glass: oklch(0.145 0 0 / 0.75);
    --material-glass-border: oklch(1 0 0 / 0.08);
  }
}
```

---

## ⚡ Tailwind CSS v4 `@theme inline` Integration

Tailwind CSS v4 introduces `@theme inline`. It tells Tailwind to **reference existing CSS variables directly** inside generated utility classes rather than compiling to hardcoded values.

This is what allows hot-swapping themes in real time without rebuilding CSS:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);

  /* Relative Radius Token Scale (aligned with tweakcn / shadcn Tailwind v4) */
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-xs: calc(var(--radius) - 6px);
}
```

### The Concentric Radius Hierarchy in Practice
When building nested UI (e.g. an image inside a card, or a badge inside a dialog), always obey the Concentric Corner Radius formula $R_{\text{inner}} = \max(0\text{px}, R_{\text{outer}} - \text{Padding})$:
- If an outer container uses `rounded-2xl` (`calc(var(--radius) + 8px)`) with `p-2` (`8px` padding), the inner child must use `rounded-lg` (`var(--radius)`), because $(\text{radius} + 8\text{px}) - 8\text{px} = \text{radius}$.
- For custom padding values, compute the exact concentric radius dynamically via `rounded-[max(0px,calc(var(--radius-2xl)-var(--spacing)*3))]`.

---

## 🎨 Perceptual Color Mixing & Alpha Interpolation (`color-mix`)

When authoring dynamic tints, surface overlays, or translucent borders in CSS:
- **Mandatory `in oklch`**: Always declare `in oklch` whenever using `color-mix()`.
- **Banned `in srgb`**: Mixing colors in `srgb` passes through the "gray dead zone," resulting in desaturated, muddy alpha blends.
- **Canonical Patterns**:
  ```css
  /* ✅ Clean OKLCH alpha mixing against transparent */
  background-color: color-mix(in oklch, var(--primary) 15%, transparent);
  border-color: color-mix(in oklch, var(--foreground) 12%, transparent);

  /* ✅ Modern CSS Color Level 4 Relative Syntax */
  color: oklch(from var(--foreground) l c h / 0.65);
  ```

---

## 📦 Zod Validation Schema for Runtime Theme Imports

Use this schema in the theme customizer to validate JSON imported from `tweakcn.com`:

```typescript
import { z } from "zod";

export const themeStylePropsSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  card: z.string(),
  "card-foreground": z.string(),
  popover: z.string(),
  "popover-foreground": z.string(),
  primary: z.string(),
  "primary-foreground": z.string(),
  secondary: z.string(),
  "secondary-foreground": z.string(),
  muted: z.string(),
  "muted-foreground": z.string(),
  accent: z.string(),
  "accent-foreground": z.string(),
  destructive: z.string(),
  "destructive-foreground": z.string(),
  border: z.string(),
  input: z.string(),
  ring: z.string(),
  radius: z.string().default("0.625rem"),
  "chart-1": z.string().optional(),
  "chart-2": z.string().optional(),
  "chart-3": z.string().optional(),
  "chart-4": z.string().optional(),
  "chart-5": z.string().optional(),
  sidebar: z.string().optional(),
  "sidebar-foreground": z.string().optional(),
  "sidebar-primary": z.string().optional(),
  "sidebar-primary-foreground": z.string().optional(),
  "sidebar-accent": z.string().optional(),
  "sidebar-accent-foreground": z.string().optional(),
  "sidebar-border": z.string().optional(),
  "sidebar-ring": z.string().optional(),
  "font-sans": z.string().optional(),
  "font-serif": z.string().optional(),
  "font-mono": z.string().optional(),
});

export const tweakcnExportSchema = z.object({
  name: z.string().default("Custom Theme"),
  styles: z.object({
    light: themeStylePropsSchema,
    dark: themeStylePropsSchema,
  }),
});

export type TweakcnTheme = z.infer<typeof tweakcnExportSchema>;
```

---

## 🔄 Dynamic Theme Applier Utility

```typescript
export function applyTweakcnTheme(theme: TweakcnTheme) {
  const root = document.documentElement;

  // Apply light properties to :root
  Object.entries(theme.styles.light).forEach(([key, value]) => {
    if (value) root.style.setProperty(`--${key}`, value);
  });

  // Dynamically update dark mode CSS rule in head
  let darkStyleSheet = document.getElementById("tweakcn-dark-theme") as HTMLStyleElement;
  if (!darkStyleSheet) {
    darkStyleSheet = document.createElement("style");
    darkStyleSheet.id = "tweakcn-dark-theme";
    document.head.appendChild(darkStyleSheet);
  }

  const darkRules = Object.entries(theme.styles.dark)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `--${key}: ${value};`)
    .join(" ");

  darkStyleSheet.textContent = `.dark { ${darkRules} }`;
}
```
