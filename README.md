# Design System

> A human-centric, agent-native design system built with **React 19**, **Base UI (`@base-ui/react`)**, **Tailwind CSS v4**, and **Motion (`motion/react`)**.
> 
> Crafted at the intersection of visual precision, tactile physics, and zero-shift layout stability. 100% accessible (WCAG 2.2 AA / AAA), copy-paste friendly (in the spirit of shadcn/ui), with zero heavy npm package lock-in.

---

## 🚀 60-Second Quick Start (Explore the Interactive Demo)

If you have Node.js installed, you can launch the living interactive workbench right now:

```bash
# 1. Clone this repository
git clone https://github.com/WDibble/design-system.git
cd design-system

# 2. Install dependencies
npm install

# 3. Start the local dev server
npm run dev
```

Open [`http://localhost:5173`](http://localhost:5173) in your browser. You will see all 35 components, the real-time Theme Studio (⌘T), 470+ animated icons, and living interactive state transitions.

To verify TypeScript and bundle a production build:
```bash
npm run build
```

---

## 👶 Day 1 with React? Start Here!

Welcome to React! If you have never used a component library before, don't worry. This design system doesn't require complex configurations or black-box npm packages. You own the code.

### What is a "Component"?
In React, a component is like a custom LEGO brick. Instead of writing raw HTML `<button class="...">` with hundreds of styling classes everywhere, you simply import `<Button>` and use it:

```tsx
import { Button } from "@/components/ui/button";

export default function MyFirstApp() {
  return (
    <div className="p-8 flex gap-3">
      <Button variant="default">Get Started</Button>
      <Button variant="outline">Learn More</Button>
    </div>
  );
}
```

---

## 📋 How to Add These Components to Your Own Project

Whether you are using **Next.js (App Router / Pages)**, **Vite**, **Remix**, or **Astro**, here is the 4-step guide to dropping any component into your project:

### Step 1: Install the Dependencies
In your project folder, open your terminal and install these helper packages:

```bash
npm install @base-ui/react motion clsx tailwind-merge class-variance-authority lucide-react
```

| Package | What it does |
| :--- | :--- |
| `@base-ui/react` | Accessible, headless primitives (menus, popovers, dialogs) by the creators of MUI. |
| `motion` | Apple HIG fluid spring physics for smooth presses, sliding tabs, and enters. |
| `class-variance-authority` | Manages component variants (e.g. `variant="default" \| "outline" \| "destructive"`). |
| `clsx` & `tailwind-merge` | Safely combines Tailwind CSS classes without style conflicts. |
| `lucide-react` | Clean, modern vector icons. |

---

### Step 2: Add the Two Helper Files

Every component uses two tiny helper files. Copy them into your project:

#### 1. Class Utility (`src/lib/utils.ts`)
Creates the `cn()` helper used to merge Tailwind classes cleanly:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### 2. Motion Physics Constants (`src/tokens/motion.ts`)
Contains the calibrated Apple HIG spring physics settings:

```ts
export const springs = {
  tactile: { type: "spring", stiffness: 600, damping: 30, mass: 0.8 },
  dialog:  { type: "spring", stiffness: 350, damping: 35, mass: 1.0 },
  snappy:  { type: "spring", stiffness: 550, damping: 35, mass: 0.6 },
  micro:   { type: "spring", stiffness: 700, damping: 40 },
  squishy: { type: "spring", stiffness: 420, damping: 24, mass: 0.8 },
} as const;
```

---

### Step 3: Add the Theme Colors to Your CSS (`src/index.css`)

Copy the theme tokens from [`src/index.css`](src/index.css) into your project's main stylesheet. 

These use modern perceptual **OKLCH color spaces** and are 100% compatible with [tweakcn.com](https://tweakcn.com):

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.54 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.985 0 0);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.50 0 0);
    --radius: 0.625rem;
  }

  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.17 0 0);
    --card-foreground: oklch(0.985 0 0);
    --primary: oklch(0.985 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --destructive: oklch(0.396 0.141 25.723);
    --destructive-foreground: oklch(0.985 0 0);
    --border: oklch(0.269 0 0);
    --input: oklch(0.269 0 0);
    --ring: oklch(0.58 0 0);
  }
}
```

> **Using Tailwind CSS v3 instead of v4?**
> If your project uses `tailwind.config.js`, simply map the colors under `theme.extend.colors`:
> `colors: { primary: "var(--primary)", background: "var(--background)", ... }`.

---

### Step 4: Copy Any Component and Use It!

Copy the component file you want from [`src/components/ui/`](src/components/ui/) into your project's `src/components/ui/` folder.

#### Example: Button with Loading & Success Feedback
```tsx
import { Button } from "@/components/ui/button";

export function SubmitButton() {
  return (
    <Button 
      variant="default"
      onClick={() => alert("Button clicked!")}
    >
      Click Me
    </Button>
  );
}
```

#### Example: Accessible Text Input with Label & Error
```tsx
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function EmailForm() {
  return (
    <Field>
      <FieldLabel requiredIndicator>Work Email</FieldLabel>
      <Input placeholder="you@company.com" type="email" />
      <FieldDescription>We will send your account verification link here.</FieldDescription>
    </Field>
  );
}
```

---

## 🧩 Complete Component Catalog (All 36 Primitives)

All components are located in [`src/components/ui/`](src/components/ui/) and exported through [`src/components/ui/index.ts`](src/components/ui/index.ts):

### 1. Actions & Feedback
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Button`** | [`src/components/ui/button.tsx`](src/components/ui/button.tsx) | 9-state interactive matrix, automatic async Promise lifecycle, loading spinner, success checkmark, 44px touch target, physical `pointerdown` yield. |
| **`Badge`** | [`src/components/ui/badge.tsx`](src/components/ui/badge.tsx) | Status pills with live pulsing indicators (`shrink-0 whitespace-nowrap`). |
| **`CopyButton`** | [`src/components/ui/copy-button.tsx`](src/components/ui/copy-button.tsx) | Clipboard copy button with spring state morph (`"Copy"` ➔ `"Copied!"`). |
| **`ThemeToggle`** | [`src/components/ui/theme-toggle.tsx`](src/components/ui/theme-toggle.tsx) | Turnkey dark/light mode toggle with transition flash suppression and localStorage sync. |
| **`Toast`** | [`src/components/ui/toast.tsx`](src/components/ui/toast.tsx) | Accessible notification toasts with undo action support and countdown dismissal. |

### 2. Forms & Inputs
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Input`** | [`src/components/ui/input.tsx`](src/components/ui/input.tsx) | High-precision text input with left/right icons, prefix/suffix chips, and iOS font-zoom prevention. |
| **`Textarea`** | [`src/components/ui/textarea.tsx`](src/components/ui/textarea.tsx) | Multiline text area with subtle 1px border-hugging focus ring. |
| **`Field`** | [`src/components/ui/field.tsx`](src/components/ui/field.tsx) | Accessible form control compound component binding labels, descriptions, and error states. |
| **`Select`** | [`src/components/ui/select.tsx`](src/components/ui/select.tsx) | Base UI dropdown select with keyboard navigation, checkmarks, and liquid glass popup. |
| **`Checkbox`** | [`src/components/ui/checkbox.tsx`](src/components/ui/checkbox.tsx) | Tri-state checkbox (checked, unchecked, indeterminate) with 44px hit-slop expansion. |
| **`Switch`** | [`src/components/ui/switch.tsx`](src/components/ui/switch.tsx) | Apple HIG toggle switch with tactile spring travel and physical active elongation. |
| **`Slider`** | [`src/components/ui/slider.tsx`](src/components/ui/slider.tsx) | Direct manipulation slider with 1:1 pointer scrubbing, value bubble, and locked track height. |
| **`Stepper`** | [`src/components/ui/stepper.tsx`](src/components/ui/stepper.tsx) | Number stepper with hold-to-accelerate speed and integrated odometer ticker. |
| **`SegmentedControl`** | [`src/components/ui/segmented-control.tsx`](src/components/ui/segmented-control.tsx) | Sliding pill segmented toggle with layout animation and arrow key navigation. |
| **`InputOTP`** | [`src/components/ui/input-otp.tsx`](src/components/ui/input-otp.tsx) | One-time password PIN boxes with SMS autofill, clipboard paste regex, and blinking caret. |

### 3. Overlays & Dialogs (Base UI)
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Dialog`** | [`src/components/ui/dialog.tsx`](src/components/ui/dialog.tsx) | Modal dialog with focus trapping, backdrop blur, specular rim lighting, and Escape dismissal. |
| **`AlertDialog`** | [`src/components/ui/alert-dialog.tsx`](src/components/ui/alert-dialog.tsx) | Destructive action confirmation dialog with safe initial focus on Cancel. |
| **`Sheet`** | [`src/components/ui/sheet.tsx`](src/components/ui/sheet.tsx) | Slide-over drawer anchoring to any screen edge (`right`, `left`, `bottom`, `top`). |
| **`Popover`** | [`src/components/ui/popover.tsx`](src/components/ui/popover.tsx) | Trigger-anchored floating popup with automatic collision detection. |
| **`Tooltip`** | [`src/components/ui/tooltip.tsx`](src/components/ui/tooltip.tsx) | Instant micro-tooltip with delay warmup to prevent hovering visual noise. |
| **`DropdownMenu`** | [`src/components/ui/dropdown-menu.tsx`](src/components/ui/dropdown-menu.tsx) | Contextual menu with submenus, checkboxes, radio items, and keyboard navigation. |
| **`Command`** | [`src/components/ui/command.tsx`](src/components/ui/command.tsx) | Global command palette (`⌘K` / `Ctrl+K`) with fuzzy search and keyboard shortcuts. |

### 4. Navigation & Data Layout
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Tabs`** | [`src/components/ui/tabs.tsx`](src/components/ui/tabs.tsx) | Sliding tabs across 3 variants (`default`, `pills`, `line`) with zero layout shift. |
| **`Breadcrumb`** | [`src/components/ui/breadcrumb.tsx`](src/components/ui/breadcrumb.tsx) | Semantic hierarchical page path navigation with kinetic chevrons. |
| **`Pagination`** | [`src/components/ui/pagination.tsx`](src/components/ui/pagination.tsx) | Mathematically locked 7-slot pagination with zero horizontal jumping, worded or icon-only Previous/Next buttons (`variant="worded" \| "icon"`), and turnkey auto-mode. |
| **`Accordion`** | [`src/components/ui/accordion.tsx`](src/components/ui/accordion.tsx) | Smooth expanding disclosure panels with reversible chevron rotation and inert hidden focus. |
| **`Table`** | [`src/components/ui/table.tsx`](src/components/ui/table.tsx) | Responsive tabular data table with quiet borders, captions, and `tabular-nums`. |
| **`Resizable`** | [`src/components/ui/resizable.tsx`](src/components/ui/resizable.tsx) | Split-view workspace handles with tactile dragging and keyboard arrow resizing. |

### 5. Media, Numbers & Structure
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Card` & `CardInner`** | [`src/components/ui/card.tsx`](src/components/ui/card.tsx) | Quiet surface with mathematically concentric inner radii ($R_{\text{inner}} = R_{\text{outer}} - P$). |
| **`NumberTicker`** | [`src/components/ui/number-ticker.tsx`](src/components/ui/number-ticker.tsx) | Rolling odometer number counter with spring physics and zero horizontal jitter. |
| **`Progress`** | [`src/components/ui/progress.tsx`](src/components/ui/progress.tsx) | Linear and circular progress indicators with smooth spring width travel. |
| **`Avatar`** | [`src/components/ui/avatar.tsx`](src/components/ui/avatar.tsx) | User image/initials avatar with deterministic OKLCH pastel hashing and presence dots. |
| **`Skeleton`** | [`src/components/ui/skeleton.tsx`](src/components/ui/skeleton.tsx) | Dimension-stable skeleton placeholder to prevent cumulative layout shift (CLS). |
| **`ProgressiveImage`** | [`src/components/ui/image.tsx`](src/components/ui/image.tsx) | Zero-CLS media container with low-resolution blur crossfade on hydration. |
| **`Chart` & `Sparkline`**| [`src/components/ui/chart.tsx`](src/components/ui/chart.tsx) | Theme-reactive vector charts with automatic trend coloring and interactive tooltips. |

### 6. Animated Kinetic Icons (470+ Icons)
All icons located in [`src/components/icons/`](src/components/icons/) feature reversible mechanical physics on hover/press with zero stroke-erasure gimmicks.

---

## ⚡ The Eleven Design Engineering Directives

Every line of code in this repository enforces these core design engineering invariants:

1. **Physical Yield on `pointerdown`**: Interactive controls compress (`scale(0.97)` to `0.98`) the exact millisecond touch or mouse down occurs. Never wait for pointer release (`click`).
2. **Zero Layout Shifts**: Dynamic states (`hover`, `focus`, `active`, `selected`) never change `border-width`, `font-weight`, `margin`, or `padding`. Outline states alter color only. Selection is signaled via color luminance or background pills—never by switching font weight.
3. **Tabular Numerals**: All counters, prices, timestamps, metrics, and data tables declare `font-variant-numeric: tabular-nums` (`tabular-nums`) to prevent horizontal digit jitter.
4. **Accessible Invariants**: 100% WCAG 2.2 AA / AAA compliance. Every icon-only button carries an explicit `aria-label`. Dialogs trap focus, maintain focus guards, and dismiss on `Escape`.
5. **Quiet Chrome**: Avoid the lazy reflex of putting everything in bordered cards. Rely first on spatial rhythm, typographic hierarchy, and optical alignment.
6. **Concentric Corner Radii**: Nested rounded surfaces compute their inner curve mathematically: $R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{Padding})$ to eliminate bulging, lumpy corners.
7. **Anti-Crush Responsive Page Architecture**: Minimum viable column width ($W_{\text{col}} \ge 340\text{px}$). Flex child titles declare `min-w-0 flex-1 truncate` while adjacent badge clusters declare `shrink-0 whitespace-nowrap`, breaking into responsive vertical stacks on small viewports.
8. **Reversible Kinetic Affordances (No Gimmick Icon Animation)**: Icons only animate if they have a reversible mechanical affordance that glides back to its resting origin on pointer leave (e.g. sliding filter knobs, gliding paper plane, separating sheets). Confirmation icons (`+`, `-`, `✓`) remain rock-solid and static.
9. **Component Dimension Invariants & Atomic Class Collision Defense**: Never merge multi-axis shorthand utilities (`size-full`, `p-0`) after single-axis variant sizes (`h-9`, `px-4`) inside `cn()` / `twMerge()`.
10. **Component-Unified Kinetic Affinity**: Icons inside interactive components trigger synchronously with the parent component on hover, press, or focus (`group-hover`/`group-active`).
11. **Perceptual Gradient Engineering & Dual-Engine Contrast**: No neon gradient-clipped text. All CSS gradient ramps interpolate in modern perceptual color spaces (`linear-gradient(in oklch, ...)`). Text and interactive boundaries satisfy both WCAG 2.2 Level AA ($\ge 4.5:1$) and WCAG 3 APCA ($|L_c| \ge 60/75$).

---

## ❓ Frequently Asked Questions (Beginner Troubleshooting)

#### Q: Why am I getting `Cannot find module '@/components/ui/button'`?
In TypeScript, `@/` is a shortcut (alias) that points to your `src/` folder. To enable it, make sure your `tsconfig.json` has `baseUrl` and `paths` configured:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
*(If you are using Vite, you can also install `vite-tsconfig-paths` in your `vite.config.ts`)*.

#### Q: Does this work with Next.js App Router Server Components?
**Yes!** Every interactive component and icon declares `"use client";` at the top of the file. You can import them directly into any Server Component or Client Component page without error.

#### Q: Can I use this with React 18?
**Yes.** All components use standard `React.forwardRef` and support React 18 and React 19 equally.

#### Q: How do I change the primary color?
Open your `src/index.css` and change `--primary` under `:root`. You can use any hex, rgb, or oklch color. You can also press **⌘T** in the demo app to launch the real-time Theme Studio and test color contrasts live.

---

## 📄 License

MIT. Free to use, adapt, and build upon for personal and commercial projects.
