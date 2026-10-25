---
name: base-ui-primitives
description: Architecture, compound slot composition, and accessibility standards for headless UI primitives using Base UI (@base-ui/react). Governs ARIA state machines, keyboard navigation contracts, focus traps, form controls, and WCAG 2.2 invariants. Use when wrapping, creating, or auditing headless primitives.
---

# Base UI Primitives: Accessible Headless Architecture

This repository adopts **Base UI (`@base-ui/react`)** as the headless unstyled foundation for all interactive components, replacing Radix UI. Base UI provides cleaner DOM output, zero redundant wrappers, and native alignment with modern CSS transitions (`@starting-style`) while delivering 100% WCAG 2.2-compliant accessible state machines.

---

## 🏛️ Anatomy & Compound Component Standard

Every interactive component is authored using compound slot composition. Never hand-roll custom keyboard handlers or focus traps when a Base UI primitive exists.

### 1. The Standard Dialog Pattern

```tsx
import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function AccessibleDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger render={trigger} />}
      <Dialog.Portal>
        {/* Backdrop with Apple-grade blur and subtle darkening */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        
        {/* Popup with Apple spring scale and optical border */}
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-2xl transition-[transform,opacity] duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close dialog"
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring"
            >
              <XIcon className="size-4" />
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description className="mt-2 text-sm text-muted-foreground">
              {description}
            </Dialog.Description>
          )}
          <div className="mt-4">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

---

### 2. The Form Field Pattern (`Field.Root`)

Base UI's `<Field.Root>` automatically coordinates `htmlFor`, `id`, `aria-describedby`, and `aria-invalid` between labels, inputs, and validation errors:

```tsx
import * as React from "react";
import { Field } from "@base-ui/react/field";
import { cn } from "@/lib/utils";

export interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  description?: string;
  error?: string;
}

export function FormFieldInput({
  label,
  description,
  error,
  id,
  className,
  ...props
}: FormInputProps) {
  return (
    <Field.Root invalid={!!error} className="flex flex-col gap-1.5">
      <Field.Label className="text-sm font-medium tracking-tight text-foreground">
        {label}
      </Field.Label>
      <input
        id={id}
        className={cn(
          "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
      {description && !error && (
        <Field.Description className="text-xs text-muted-foreground">
          {description}
        </Field.Description>
      )}
      {error && (
        <Field.Error className="text-xs font-medium text-destructive">
          {error}
        </Field.Error>
      )}
    </Field.Root>
  );
}
```

---

### 3. Tactile Switch Pattern (`Switch.Root`)

A switch that yields physically on press, snaps smoothly into position via spring physics, and supports keyboard toggle:

```tsx
import * as React from "react";
import { Switch } from "@base-ui/react/switch";

export function TactileSwitch({ checked, onCheckedChange, disabled, "aria-label": ariaLabel }) {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary"
    >
      <Switch.Thumb className="pointer-events-none block size-5 rounded-full bg-background shadow-md ring-0 transition-transform duration-200 group-active:scale-90 data-[checked]:translate-x-5 data-[unchecked]:translate-x-0" />
    </Switch.Root>
  );
}
```

---

### 4. Dropdown Menu Pattern (`Menu.Root`)

```tsx
import * as React from "react";
import { Menu } from "@base-ui/react/menu";

export function DropdownMenu({ trigger, children }) {
  return (
    <Menu.Root>
      <Menu.Trigger render={trigger} />
      <Menu.Portal>
        <Menu.Positioner sideOffset={6}>
          <Menu.Popup className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg transition-[transform,opacity] duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            {children}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
```

---

### 5. Stepper & Counter Pattern (`Stepper`)

Numeric counters and steppers must be entirely self-contained so consumers do not need to orchestrate timers or button listeners.

```tsx
// 1. Zero-config Plug & Play
<Stepper value={count} onValueChange={setCount} step={1} min={0} max={100} />

// 2. Compound Composition
<Stepper value={balance} onValueChange={setBalance} step={25} min={0} prefix="$" decimalPlaces={2}>
  <Stepper.Value className="text-3xl font-bold font-mono" />
  <Stepper.Controls>
    <Stepper.Increment aria-label="Increase balance" />
    <Stepper.Decrement aria-label="Decrease balance" />
  </Stepper.Controls>
</Stepper>
```

- **Invariants**:
  - Automatically locks boundary states (`disabled={value >= max}` / `disabled={value <= min}`).
  - Encapsulates `useHoldToStep` within `Stepper.Increment` and `Stepper.Decrement` for kinetic press-and-hold acceleration.
  - Formats digits with `NumberTicker` using tabular numerals.

---

## ⌨️ Keyboard Navigation Contracts

Every headless primitive must adhere strictly to the WAI-ARIA keyboard interaction specification:

| Primitive | Trigger Key | Navigation Keys | Dismiss / Exit |
| :--- | :--- | :--- | :--- |
| **Menu / Dropdown** | `Enter`, `Space`, `ArrowDown` | `ArrowDown`, `ArrowUp` (cycles items), Type-ahead jump | `Escape` (closes menu, returns focus to trigger) |
| **Tabs** | Click or Focus | `ArrowLeft`, `ArrowRight` (horizontal); `ArrowUp`, `ArrowDown` (vertical); `Home`, `End` | `Tab` (moves focus into selected TabPanel) |
| **Dialog / Modal** | Click or Programmatic | `Tab`, `Shift+Tab` (strictly trapped within dialog) | `Escape` (dismisses, restores focus to trigger) |
| **Switch / Checkbox**| `Space`, `Enter` | `Tab` into control | Native blur |
| **Slider** | Focus | `ArrowLeft`/`ArrowDown` (-step), `ArrowRight`/`ArrowUp` (+step), `PageDown`/`PageUp` (10%), `Home`/`End` | Native blur |

---

## ♿ WCAG 2.2 Accessibility Invariants

### 1. Accessible Names (Critical)
- Every icon-only button **MUST** carry an explicit `aria-label`.
- Bad: `<button><SearchIcon /></button>`
- Good: `<button type="button" aria-label="Search documents"><SearchIcon className="size-4 shrink-0" /></button>`

### 2. Focus Traps & Restoration
- Modals, Drawers, and Sheets **MUST**:
  1. Trap keyboard `Tab` focus within the open surface.
  2. Dismiss on the `Escape` key.
  3. Restore keyboard focus back to the triggering element upon closure.

### 3. Native `disabled` vs `aria-disabled`
- When a button is blocked due to incomplete form requirements, prefer `aria-disabled="true"` with pointer events suppressed, but **preserve keyboard focusability**. This allows screen readers to focus the button and hear why it is inactive (e.g. linked via `aria-describedby`).
- Use native HTML `disabled` when the button is permanently irrelevant to the user.

### 4. Zero Layout Shift on Loading (Dimension Stability)
- Loading states must not reflow the page.
- Skeletons and spinners must hold the exact intrinsic dimensions of the resolved element.
- Mark loading regions with `aria-busy="true"` and announce status via `aria-live="polite"`.

### 5. Contrast Floor
- Body copy and input placeholders must achieve a contrast ratio $\ge 4.5:1$ against the surface ground.
- Large display text ($\ge 24\text{px}$ or $\ge 18.5\text{px}$ bold) must achieve $\ge 3:1$.
- In dark themes, avoid pure white `#ffffff` on `#000000` which causes halation/astigmatism glare; use soft high-contrast whites (`oklch(0.985 0 0)` on `oklch(0.145 0 0)`).

### 6. Outside-Click & Escape Parity Law
Any interactive component, popover, or expandable surface that collapses or dismisses on an **outside pointer click** MUST also dismiss when the user presses **`Escape`**. Keyboard and screen-reader users cannot "click outside the element"; parity between pointer and keyboard dismissal is non-negotiable.

### 7. Concealed Interactive Focus Invariant (`inert` Law)
When an interactive section (accordion, mobile navigation drawer, collapsible tree branch, unmounted carousel slide) is collapsed or visually hidden:
- All child focusable elements (`<button>`, `<a>`, `<input>`, `<select>`) **MUST be excluded from the keyboard tab sequence**.
- Never allow keyboard users to tab into invisible or zero-height collapsed elements.
- **Implementation**:
  - Prefer the standard HTML `inert` attribute: `<div inert={!isOpen || undefined}>`.
  - Or conditionally set `tabIndex={isOpen ? 0 : -1}` on every focusable child.
  - Or use standard HTML `hidden` / `display: none` when animations complete.
