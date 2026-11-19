---
name: semantic-theming
description: Use when creating, styling, or auditing design tokens and themes. Enforces perceptual OKLCH colour spaces, Tailwind CSS v4 @theme inline, and APCA contrast.
license: MIT
metadata:
  author: William Dibble
  version: "1.0.0"
  tags: [theming, oklch, design-tokens, tailwind-v4, contrast]
---

# Semantic Theming: Token Architecture & Tailwind v4

This skill codifies the semantic design token architecture for the design system. It maintains **100% two-way compatibility with standard JSON design tokens** and compiles directly into **Tailwind CSS v4** using `@theme inline`.

---

## Purpose

Provide a deterministic, perceptually uniform OKLCH colour and surface architecture that supports real-time theme switching, WCAG 2.2 AA and WCAG 3 APCA contrast compliance, and Zod-validated runtime token imports without CSS rebuilds.

---

## Prerequisites

- **Tailwind CSS v4** supporting `@theme inline` and `@custom-variant`.
- **`zod`** for validating external theme JSON payloads at runtime.
- **Browser surface baseline**: Explicit `::selection`, `caret-color`, and `scrollbar-color` token bindings in global CSS (`src/index.css`).

---

## Instructions

Follow these steps when authoring, extending, or validating a theme:

1. **Use OKLCH perceptual colour values**: Declare `--background`, `--foreground`, `--primary`, semantic feedback tokens, and materials in `:root` and `.dark` using OKLCH (`oklch(L C H)`).
2. **Map CSS variables via `@theme inline`**: Bind every `--color-*`, `--font-*`, and relative `--radius-*` token inside `@theme inline` so runtime variable swaps update live without recompilation.
3. **Pass `in oklch` to `color-mix()`**: Always use `color-mix(in oklch, ...)` for alpha tinting or overlays; never blend gradients or surfaces in `srgb`.
4. **Keep negative-polarity foregrounds on luminous fills**: On high-luminance amber, yellow, or gold fills (`--warning` in light mode), enforce dark `--warning-foreground` (`oklch(0.205 0 0)`) to satisfy WCAG 3 APCA (`|Lc| >= 60`).
5. **Validate external theme JSON before applying**: Run `themeExportSchema.safeParse(payload)` to catch malformed or missing tokens before mutating `document.documentElement.style`.

---

## 🎨 Why OKLCH Colour Spaces?

Traditional colour spaces (sRGB, HSL, Hex) suffer from **non-uniform perceptual lightness**:

- In HSL, pure yellow (`hsl(60, 100%, 50%)`) has ~95% perceptual lightness, whereas pure blue (`hsl(240, 100%, 50%)`) has ~30%.
- **OKLCH solves this**: Lightness (`L`), Chroma (`C`), and Hue (`H`) are perceptually uniform. An OKLCH lightness of `0.20` is equally dark across emerald, sapphire, and amber, eliminating contrast drift during hue shifts.

---

## 📐 The Complete Semantic Token Schema

Define `:root` (light) and `.dark` (dark/OLED) CSS custom properties in `src/index.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.985 0 0);
    --success: oklch(0.51 0.16 145);
    --success-foreground: oklch(0.985 0 0);
    --warning: oklch(0.75 0.16 70);
    --warning-foreground: oklch(0.205 0 0);
    --info: oklch(0.52 0.18 245);
    --info-foreground: oklch(0.985 0 0);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.6 0 0);
    --radius: 0.625rem;
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    --material-glass: oklch(1 0 0 / 0.72);
    --material-glass-border: oklch(1 0 0 / 0.12);
  }

  .dark {
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

## ⚡ Tailwind CSS v4 `@theme inline` & Mixing

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
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-xs: calc(var(--radius) - 6px);
}
```

- **Concentric Radius Formula**: Compute nested corners using `R_inner = max(0px, R_outer - Padding)`. For custom padding, use `rounded-[max(0px,calc(var(--radius-2xl)-var(--spacing)*3))]`.
- **Perceptual `color-mix()`**: Always interpolate in `oklch` (`color-mix(in oklch, var(--primary) 15%, transparent)` or `oklch(from var(--foreground) l c h / 0.65)`). Blending in `srgb` creates desaturated grey midpoints.

---

## Examples

Validate imported theme JSON payloads with Zod and handle invalid tokens safely before updating CSS variables:

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

export const themeExportSchema = z.object({
  name: z.string().default("Custom Theme"),
  styles: z.object({
    light: themeStylePropsSchema,
    dark: themeStylePropsSchema,
  }),
});

export type ThemeTokenPayload = z.infer<typeof themeExportSchema>;

export function applyValidatedTheme(rawInput: unknown) {
  const parsed = themeExportSchema.safeParse(rawInput);
  if (!parsed.success) {
    throw new Error(`Invalid theme token payload: ${parsed.error.message}`);
  }

  const theme = parsed.data;
  const root = document.documentElement;
  Object.entries(theme.styles.light).forEach(([key, value]) => {
    if (value) root.style.setProperty(`--${key}`, value);
  });

  let darkSheet = document.getElementById("theme-custom-style") as HTMLStyleElement | null;
  if (!darkSheet) {
    darkSheet = document.createElement("style");
    darkSheet.id = "theme-custom-style";
    document.head.appendChild(darkSheet);
  }

  const darkRules = Object.entries(theme.styles.dark)
    .filter(([, value]) => !!value)
    .map(([key, value]) => `--${key}: ${value};`)
    .join(" ");
  darkSheet.textContent = `.dark { ${darkRules} }`;
}
```

---

## Limitations

- **Tailwind CSS v4 requirement**: `@theme inline` requires Tailwind CSS v4 (`@tailwindcss/vite` or v4 CLI). Legacy Tailwind v3 setups must map `var(--token)` strings manually inside `tailwind.config.js`.
- **Gamut clipping on legacy displays**: High-chroma OKLCH colours (`C > 0.25`) may clip to sRGB gamut boundaries on non-P3 displays; always run contrast validation via `src/lib/contrast.ts`.

---

## Troubleshooting

| Symptom                                                     | Cause                                                                    | Solution                                                                                        |
| :---------------------------------------------------------- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| Gradients show a grey/brown dead zone in the middle         | Browser interpolated the gradient across legacy `srgb` coordinates       | Replace `linear-gradient(...)` with `linear-gradient(in oklch, ...)`                            |
| White text on bright yellow or amber badges is hard to read | High-luminance hues (`L >= 0.72`) fail WCAG 3 APCA with light text       | Enforce dark foreground tokens (`oklch(0.205 0 0)`) on luminous backgrounds                     |
| Runtime theme toggle causes sluggish UI flicker             | Global CSS `* { transition: ... }` animates colours across all DOM nodes | Apply `.disable-transitions` temporarily on theme toggle (`src/components/ui/theme-toggle.tsx`) |
| Invalid JSON import breaks styling silently                 | Unchecked partial object injected into CSS variables                     | Validate with `themeExportSchema.safeParse(raw)` before mutating `document.documentElement`     |
