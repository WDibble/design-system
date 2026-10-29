# Design System

> An agent-native, human-centric design system crafted at the intersection of visual precision, physical intuition, and robust design engineering.

Built with **React 19**, **Base UI (`@base-ui/react`)**, **Tailwind CSS v4**, and **Motion (`motion/react`)**.

Designed to be consumed both as an **interactive living workbench** and as a **modular, copy-paste component library** (in the spirit of shadcn/ui)—with zero heavyweight package lock-in.

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/design-system.git
cd design-system

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [`http://localhost:5173`](http://localhost:5173) in your browser to explore the interactive workbench, test living state transitions, toggle light/dark modes, and inspect all components.

To verify TypeScript and generate a production build:
```bash
npm run build
```

---

## 🏛️ The Eight Non-Negotiable Directives

Every component in this repository adheres strictly to the codified invariants defined in [`AGENTS.md`](AGENTS.md) and [`PHILOSOPHY.md`](PHILOSOPHY.md):

1. **Physical Yield on `pointerdown`**: Controls compress (`scale(0.97)` to `0.98`) the millisecond touch or mouse down occurs. Never wait for pointer release.
2. **Zero Layout Shifts**: Never alter `border-width`, `font-weight`, `letter-spacing`, `margin`, or `padding` across any dynamic state (`hover`, `focus`, `active`, `selected`, `pressed`). Outline and feedback states alter color only. Font weights never switch on selection.
3. **Tabular Numerals**: All counters, prices, timers, metrics, and numerical data specify `font-variant-numeric: tabular-nums` (`tabular-nums`) to prevent horizontal jitter.
4. **Accessible Invariants**: 100% WCAG 2.2 compliance. Every icon-only control has an explicit `aria-label`. Dialogs trap focus, maintain focus guards, and dismiss on `Escape`.
5. **Quiet Chrome**: Avoid the lazy reflex of boxing everything in heavy bordered cards. Rely first on spatial rhythm, typographic hierarchy, and baseline alignment.
6. **Concentric Corner Radii**: Inner nested elements strictly follow the geometric continuity formula:
   $$R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{Padding})$$
7. **Anti-Crush Responsive Architecture**: Page layouts guarantee minimum viable column widths ($W_{\text{col}} \ge 340\text{px}$). Cards establish container queries (`@container`), flex children declare `min-w-0` for truncation, and button ghost sizers enforce `max-w-full`.
8. **Reversible Kinetic Affordances**: Animated icons possess genuine mechanical affordances that glide back to their resting origin on pointer leave (e.g. gliding paper plane, separating copy sheets). No gimmick spinning plus signs or vanishing checkmarks.

---

## 📦 Component Catalog

All components live in [`src/components/ui/`](src/components/ui/) and are self-contained:

### 1. Core Primitives & State Narratives
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Button`** | [`src/components/ui/button.tsx`](src/components/ui/button.tsx) | 9-state interactive matrix, ghost footprint sizer, fluid morphing, loading/success states, tactile pointerdown yield. |
| **`Badge`** | [`src/components/ui/badge.tsx`](src/components/ui/badge.tsx) | Micro status tags with live pulsing status dots and neutral/success/warning variants. |
| **`CopyButton`** | [`src/components/ui/copy-button.tsx`](src/components/ui/copy-button.tsx) | Squishy spring layout morphing (`"Copy"` ➔ `"Copied!"`), mechanical sheet gliding, and clipboard integration. |
| **`NumberTicker`** | [`src/components/ui/number-ticker.tsx`](src/components/ui/number-ticker.tsx) | Continuous spring-interpolated counter with tabular alignment and zero horizontal layout shift. |

### 2. Form & Data Input Primitives
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Input`** | [`src/components/ui/input.tsx`](src/components/ui/input.tsx) | Quiet 1px border-hugging focus ring, left/right icon slots, clear button, 16px mobile font-zoom prevention. |
| **`Textarea`** | [`src/components/ui/textarea.tsx`](src/components/ui/textarea.tsx) | Auto-expanding / fixed height multiline input with clean focus accents. |
| **`Field`** | [`src/components/ui/field.tsx`](src/components/ui/field.tsx) | Accessible form control wrapper with semantic labels, optional badges, descriptions, and error validation text. |
| **`Switch`** | [`src/components/ui/switch.tsx`](src/components/ui/switch.tsx) | Apple HIG toggle switch with tactile spring thumb travel, active elongation, and keyboard parity. |
| **`Checkbox`** | [`src/components/ui/checkbox.tsx`](src/components/ui/checkbox.tsx) | Accessible checked, unchecked, and indeterminate tri-state checkbox with checkmark pop animation. |
| **`Slider`** | [`src/components/ui/slider.tsx`](src/components/ui/slider.tsx) | Locked 6px track height (zero neighbor push), 300ms spring glide on jumps, 1:1 direct dragging, and animated value bubble. |
| **`Stepper`** | [`src/components/ui/stepper.tsx`](src/components/ui/stepper.tsx) | Tactile increment/decrement stepper with integrated number ticker and continuous pointer hold acceleration. |
| **`SegmentedControl`** | [`src/components/ui/segmented-control.tsx`](src/components/ui/segmented-control.tsx) | iOS-style sliding pill indicator with `layoutId` physics and keyboard arrow key navigation. |

### 3. Overlays & Floating Surfaces (Base UI)
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Dialog`** | [`src/components/ui/dialog.tsx`](src/components/ui/dialog.tsx) | Headless Base UI modal with backdrop blur, 1px specular lighting, focus trapping, and accessible close button. |
| **`AlertDialog`** | [`src/components/ui/alert-dialog.tsx`](src/components/ui/alert-dialog.tsx) | Destructive action confirmation dialog (`role="alertdialog"`) with safe default focus on Cancel. |
| **`Sheet`** | [`src/components/ui/sheet.tsx`](src/components/ui/sheet.tsx) | Directional sliding drawer (`right`, `left`, `top`, `bottom`) with fixed edge anchoring and monotonic physical glide. |
| **`Popover`** | [`src/components/ui/popover.tsx`](src/components/ui/popover.tsx) | Trigger-anchored overlay with scale/opacity micro-spring, collision detection, and zero anchor-drift wiggle. |
| **`Tooltip`** | [`src/components/ui/tooltip.tsx`](src/components/ui/tooltip.tsx) | Micro tooltip with `TooltipProvider` warm-up delay (`150ms`) and trigger-anchored origin. |
| **`DropdownMenu`** | [`src/components/ui/dropdown-menu.tsx`](src/components/ui/dropdown-menu.tsx) | Full keyboard navigation (arrow keys), submenus, radio groups, checkboxes, and zero-shift shortcut indicators. |

### 4. Navigation, Structure & Data Display
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Tabs`** | [`src/components/ui/tabs.tsx`](src/components/ui/tabs.tsx) | Base UI Tabs with Apple HIG spring indicator glide across 3 variants (`default`, `pills`, `line`) and locked font geometry (zero layout shift). |
| **`Accordion`** | [`src/components/ui/accordion.tsx`](src/components/ui/accordion.tsx) | Base UI Accordion with CSS height transitions (`--accordion-panel-height`), reversible rotating chevrons, and concealed focus (`inert`). |
| **`Table`** | [`src/components/ui/table.tsx`](src/components/ui/table.tsx) | Responsive high-density data display with quiet chrome borders, hover states, and strict `tabular-nums` formatting. |

### 5. Spatial Materials, Feedback & Command
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Toast`** | [`src/components/ui/toast.tsx`](src/components/ui/toast.tsx) | Floating liquid glass notification with `role="status"`, auto-countdown timer, and 5-second reversible `Undo` affordance. |
| **`Command`** | [`src/components/ui/command.tsx`](src/components/ui/command.tsx) | Global command palette dialog (`⌘K` / `Ctrl+K`) with keyboard search, action shortcuts, and focus protection. |
| **`Skeleton`** | [`src/components/ui/skeleton.tsx`](src/components/ui/skeleton.tsx) | Dimension-stable skeleton placeholder with `role="status"`, `aria-label`, and zero cumulative layout shift (CLS). |

### 6. Advanced Interaction & Hydration Primitives
| Component | Path | Description |
| :--- | :--- | :--- |
| **`InputOTP`** | [`src/components/ui/input-otp.tsx`](src/components/ui/input-otp.tsx) | Segmented PIN boxes with native SMS autofill parsing (`autocomplete="one-time-code"`), clipboard regex extraction, and active caret animation (Detail #15). |
| **`Select`** | [`src/components/ui/select.tsx`](src/components/ui/select.tsx) | Headless Base UI form select with liquid glass popup, keyboard arrow navigation, checkmark indicators, and 44px hit-slop. |
| **`Avatar`** | [`src/components/ui/avatar.tsx`](src/components/ui/avatar.tsx) | Deterministic OKLCH initials color hashing, concentric masking borders, live presence status pips (`online`, `busy`, `away`), and stacked `AvatarGroup`. |
| **`Progress`** | [`src/components/ui/progress.tsx`](src/components/ui/progress.tsx) | Linear specular progress bar and radial `CircularProgress` SVG meter with tabular number readouts (`tabular-nums`) and smooth spring easing. |
| **`ProgressiveImage`** | [`src/components/ui/image.tsx`](src/components/ui/image.tsx) | Zero-CLS media hydration with low-resolution BlurHash placeholder crossfade and specular skeleton shimmer (Detail #8). |

### 7. Surfaces & Layout
| Component | Path | Description |
| :--- | :--- | :--- |
| **`Card`** | [`src/components/ui/card.tsx`](src/components/ui/card.tsx) | Quiet surface with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, and optional specular lighting. |
| **`CardInner`** | [`src/components/ui/card.tsx`](src/components/ui/card.tsx) | Mathematically concentric nested surface guaranteeing zero bulging or lumpy corners. |

### 8. Animated Micro-Interaction Icons
Over **470+ animated Lucide icons** located in [`src/components/icons/`](src/components/icons/) featuring imperative handles (`startAnimation`, `stopAnimation`) and hover/press triggers.

---

## 📋 Copying Components Into Your Own Project

You can copy individual components directly into any modern React application (Next.js App Router, Vite, Remix, Astro).

### Step 1: Install Peer Dependencies
```bash
npm install @base-ui/react motion clsx tailwind-merge class-variance-authority
```

### Step 2: Add Class Utility (`src/lib/utils.ts`)
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 3: Add Motion Physics Tokens (`src/tokens/motion.ts`)
Copy [`src/tokens/motion.ts`](src/tokens/motion.ts) into your project. It contains calibrated Apple HIG spring physics constants (`springs.tactile`, `springs.dialog`, `springs.snappy`, `springs.micro`, `springs.squishy`).

### Step 4: Configure Tailwind CSS v4 Theme Tokens (`src/index.css`)
Our semantic token schema uses modern **OKLCH color spaces** and is 100% interoperable with [tweakcn.com](https://tweakcn.com):

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
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --radius: 0.625rem;
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
    --border: oklch(0.269 0 0);
    --input: oklch(0.269 0 0);
    --ring: oklch(0.439 0 0);
  }
}

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
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
```

### Step 5: Copy Any Component
Simply copy the desired component from [`src/components/ui/`](src/components/ui/) into your application's components directory and import it:

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

export function SecretKeyWidget() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Reveal Credentials
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs tabular-nums truncate">sk_live_98a...210f</span>
          <CopyButton size="sm" variant="ghost" value="sk_live_98a44b91280f210f" idleText="Copy" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

---

## 🛠️ Tech Stack & Foundations

- **Runtime**: React 19 / 18 + Vite 8 + TypeScript 5.7
- **Primitives**: Base UI (`@base-ui/react`) for accessible, headless, unstyled primitives
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@theme inline`)
- **Motion Engine**: Motion (`motion/react`) calibrated with Apple HIG spring parameters
- **Theming**: Semantic tokens interoperable with `tweakcn.com` (Light, Dark, System)
- **Accessibility**: Strict WCAG 2.2 AA compliance, keyboard navigation, focus trapping, screen-reader parity

---

## 📄 License

MIT. Free to use, adapt, and build upon for personal and commercial projects.
