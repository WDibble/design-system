---
name: base-ui-primitives
description: Use when building or auditing accessible headless UI primitives with @base-ui/react, compound slots, keyboard roving navigation, focus traps, and WCAG 2.2 states.
license: MIT
metadata:
  author: William Dibble
  version: "1.0.0"
  tags: [base-ui, accessibility, wcag, primitives, react]
---

# Base UI Primitives: Accessible Headless Architecture

This repository adopts **Base UI (`@base-ui/react`)** as the headless unstyled foundation for all interactive components. Base UI provides clean DOM output, zero redundant wrappers, and native alignment with modern CSS transitions (`@starting-style`) while delivering 100% WCAG 2.2-compliant accessible state machines.

---

## Purpose

Define strict composition, state-machine, and accessibility standards for headless React primitives built on `@base-ui/react`. Use this skill when wrapping new UI controls, auditing ARIA attributes and keyboard bindings, or enforcing zero-layout-shift transitions on interactive states.

---

## Prerequisites

- **React 18 or React 19** (`forwardRef` and client component compatibility via `"use client";`).
- **`@base-ui/react`** for unstyled headless primitives (`Dialog`, `Field`, `Menu`, `Switch`, `Tabs`, `Select`).
- **Styling helpers**: `clsx`, `tailwind-merge`, and `class-variance-authority` paired with `cn()` from `@/lib/utils`.
- **Visual and motion pairs**: Apply semantic tokens from the theming specification and spring curves (`springs.snappy`, `springs.tactile`) from `src/tokens/motion.ts`.

---

## Instructions

Follow this workflow whenever authoring or modifying a headless component primitive:

1. **Use compound slot exports**: Expose sub-parts (`Root`, `Trigger`, `Portal`, `Backdrop`, `Popup`, `Title`, `Description`, `Close`) rather than monolithic configuration props, and forward `ref` cleanly.
2. **Set explicit button semantics**: Always pass `type="button"` on non-submit triggers and icon controls (`Dialog.Close`, `Stepper.Increment`, toolbar actions) so controls never submit parent forms accidentally.
3. **Add `data-slot` attributes and `cn()` safely**: Attach `data-slot` on root and child parts, keep single-axis variant heights (`h-9`, `size-9`) separate from multi-axis shorthands (`size-full`), and pass callers' `className` to the visual element.
4. **Keep transitions interruptible with attribute hooks**: Style mount and unmount animations against Base UI attributes (`data-[starting-style]`, `data-[ending-style]`, `data-[checked]`, `data-[open]`) rather than boolean visibility flags that unmount prematurely.
5. **Run invariant and test validation**: Execute `vitest-axe` accessibility assertions alongside keyboard interaction tests (`Tab`, `Arrow`, `Escape`, `Enter`, `Space`) before finishing any primitive change.

---

## Examples

### 1. Standard Modal Dialog Pattern (`Dialog.Root`)

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
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-2xl transition-[transform,opacity] duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          <div className="flex items-center justify-between gap-2">
            <Dialog.Title className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </Dialog.Title>
            <Dialog.Close
              type="button"
              aria-label="Close dialog"
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]"
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

### 2. Form Field & Validation Slot (`Field.Root`)

Base UI `<Field.Root>` coordinates `htmlFor`, `id`, `aria-describedby`, and `aria-invalid` between labels, inputs, descriptions, and validation errors. Reserve a `min-h-[1lh]` slot so error toggles never cause layout reflow:

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
          "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
      <div className="min-h-[1lh]">
        {error ? (
          <Field.Error className="text-xs font-medium text-destructive">{error}</Field.Error>
        ) : (
          description && (
            <Field.Description className="text-xs text-muted-foreground">
              {description}
            </Field.Description>
          )
        )}
      </div>
    </Field.Root>
  );
}
```

### 3. Tactile Switch (`Switch.Root`)

Yields physically on press, slides cleanly across the track, and binds `Space` / `Enter`:

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
      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary"
    >
      <Switch.Thumb className="pointer-events-none block size-5 rounded-full bg-background shadow-md ring-0 transition-transform duration-200 group-active:scale-90 data-[checked]:translate-x-5 data-[unchecked]:translate-x-0" />
    </Switch.Root>
  );
}
```

### 4. Dropdown Menu (`Menu.Root`)

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

### 5. Stepper & Counter (`Stepper`)

Self-contained compound primitive handling boundaries (`disabled={value >= max}` / `disabled={value <= min}`), `useHoldToStep` press-and-hold acceleration, and `NumberTicker` tabular numerals:

```tsx
<Stepper value={balance} onValueChange={setBalance} step={25} min={0} prefix="$" decimalPlaces={2}>
  <Stepper.Value className="font-mono text-2xl font-bold" />
  <Stepper.Controls>
    <Stepper.Increment aria-label="Increase balance" />
    <Stepper.Decrement aria-label="Decrease balance" />
  </Stepper.Controls>
</Stepper>
```

### 6. Segmented Control (`SegmentedControl`)

Active and inactive items share identical `font-medium text-xs` typography for zero horizontal jitter, pairing `role="tablist"` / `role="tab"` (`aria-selected`) with a `motion.span` `layoutId` pill (`springs.snappy`):

```tsx
<SegmentedControl value={mode} onValueChange={setMode}>
  <SegmentedControlItem value="preview">Preview</SegmentedControlItem>
  <SegmentedControlItem value="code">Code</SegmentedControlItem>
</SegmentedControl>
```

---

## ⌨️ Keyboard Navigation Contracts

Every headless primitive adheres strictly to the WAI-ARIA keyboard interaction pattern:

| Primitive             | Trigger Key                   | Navigation Keys                                                                                          | Dismiss / Exit                                   |
| :-------------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| **Menu / Dropdown**   | `Enter`, `Space`, `ArrowDown` | `ArrowDown`, `ArrowUp` (cycles items), Type-ahead jump                                                   | `Escape` (closes menu, returns focus to trigger) |
| **Tabs**              | Click or Focus                | `ArrowLeft`, `ArrowRight` (horizontal); `ArrowUp`, `ArrowDown` (vertical); `Home`, `End`                 | `Tab` (moves focus into selected TabPanel)       |
| **Dialog / Modal**    | Click or Programmatic         | `Tab`, `Shift+Tab` (strictly trapped within dialog)                                                      | `Escape` (dismisses, restores focus to trigger)  |
| **Switch / Checkbox** | `Space`, `Enter`              | `Tab` into control                                                                                       | Native blur                                      |
| **Slider**            | Focus                         | `ArrowLeft`/`ArrowDown` (-step), `ArrowRight`/`ArrowUp` (+step), `PageDown`/`PageUp` (10%), `Home`/`End` | Native blur                                      |

---

## ♿ WCAG 2.2 Accessibility Invariants

1. **Accessible Names**: Every icon-only button **MUST** carry an explicit `aria-label` (for example `<button type="button" aria-label="Search documents"><SearchIcon className="size-4 shrink-0" /></button>`).
2. **Focus Traps & Restoration**: Modals, Drawers, and Sheets trap `Tab` focus within the open surface, dismiss on `Escape`, and restore focus to the triggering element on close.
3. **Native `disabled` vs `aria-disabled`**: When an action is temporarily blocked by incomplete inputs, prefer `aria-disabled="true"` with suppressed pointer events while keeping keyboard focusability so screen readers can read the linked `aria-describedby` reason.
4. **Dimension Stability During Loading**: Lock intrinsic dimensions on loading skeletons and async buttons (`aria-busy="true"`, `aria-live="polite"`) to eliminate layout shift.
5. **Contrast Floor**: Body text and placeholders require at least `4.5:1` contrast (large display text `>= 24px` or `>= 18.5px` bold requires `>= 3:1`). In dark mode, avoid pure `#ffffff` on `#000000` halation glare; use `oklch(0.985 0 0)` on `oklch(0.145 0 0)`.
6. **Outside-Click & Escape Parity Law**: Any popover, dropdown, or expandable surface that collapses on outside pointer click **MUST** also close on `Escape`.
7. **Concealed Interactive Focus Invariant (`inert` Law)**: When accordions, drawers, or collapsed panels are hidden, exclude all inner focusables from tab order using HTML `inert={!isOpen || undefined}`, `tabIndex={isOpen ? 0 : -1}`, or `hidden`.

---

## Limitations

- **Unstyled behavioural layer only**: `@base-ui/react` provides DOM structure, ARIA attributes, and focus management; visual contrast tokens (`semantic-theming`) and calibrated spring curves (`motion-physics`) must be applied alongside it.
- **No synthetic test skipping**: Accessibility (`axe`) and portal focus tests require real DOM mounting (`jsdom` or browser) because CSS `@starting-style` and portal focus restoration depend on attached document trees.

---

## Troubleshooting

| Symptom                                                      | Cause                                                                           | Solution                                                                                                                                               |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error message causes vertical layout jump on form validation | Validation slot mounts dynamically without reserved line height                 | Wrap `<Field.Error>` and `<Field.Description>` in a fixed `min-h-[1lh]` baseline container                                                             |
| Clicking secondary action inside a form submits the page     | Missing `type="button"` defaults `<button>` to `type="submit"`                  | Pass `type="button"` explicitly on all non-submit buttons and `Dialog.Close` controls                                                                  |
| Popup unmount animation cuts off instantaneously             | Base UI removes the DOM node before exit keyframes finish                       | Style `data-[ending-style]` with explicit `transition-[transform,opacity]` or wrap with Framer Motion `AnimatePresence`                                |
| Button height collapses to `16px` when merging utilities     | Passing `size-full` after `h-9` causes `twMerge` to strip the height constraint | Apply single-axis sizing tokens (`w-full`, `flex-1`) separately on outer layout boxes and preserve explicit variant classes on the interactive surface |
