# Popover

> Collision-aware floating overlay anchored cleanly to its trigger.

- **Category**: Overlays & Surfaces
- **Import**: `import { Popover, PopoverClose, PopoverContent, PopoverDescription } from "@/components/ui/popover";`
- **Source**: `src/components/ui/popover.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Anchors non-modal interactive overlays with automatic viewport collision avoidance while letting outside clicks dismiss naturally.

## When to Use

- Date pickers, inline filter panels, share dialogues, or compact configuration forms.
- Trigger-anchored interactive mini-panels that keep surrounding context visible.

## When Not to Use (Use Instead)

| Alternative                       | Reason                                                                      |
| :-------------------------------- | :-------------------------------------------------------------------------- |
| [tooltip](tooltip.md)             | Use Tooltip for static single-line micro-hints without interactive widgets. |
| [dropdown-menu](dropdown-menu.md) | Use DropdownMenu for uniform lists of commands.                             |
| [dialog](dialog.md)               | Use Dialog when background interaction should be blocked modally.           |

## Anatomy

```tsx
<Popover>
  <PopoverTrigger className={buttonVariants({ variant: "outline" })}>Configure</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Grid Snap</PopoverTitle>
      <PopoverDescription>Adjust snapping granularity.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

## Verified Example

```tsx
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Inspect Thresholds
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Contrast Floors</PopoverTitle>
          <PopoverDescription>
            Body prose requires Lc 75+; controls require Lc 60+.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
```

## Props Reference

| Prop                    | Type                                                         | Required | Description                                  |
| :---------------------- | :----------------------------------------------------------- | :------- | :------------------------------------------- |
| `align`                 | `PopoverPrimitive.Positioner.Props["align"]`                 | No       | Configures align on Popover.                 |
| `alignOffset`           | `PopoverPrimitive.Positioner.Props["alignOffset"]`           | No       | Configures alignOffset on Popover.           |
| `anchor`                | `PopoverPrimitive.Positioner.Props["anchor"]`                | No       | Configures anchor on Popover.                |
| `collisionAvoidance`    | `PopoverPrimitive.Positioner.Props["collisionAvoidance"]`    | No       | Configures collisionAvoidance on Popover.    |
| `disableAnchorTracking` | `PopoverPrimitive.Positioner.Props["disableAnchorTracking"]` | No       | Configures disableAnchorTracking on Popover. |
| `portalProps`           | `PopoverPrimitive.Portal.Props`                              | No       | Configures portalProps on Popover.           |
| `side`                  | `PopoverPrimitive.Positioner.Props["side"]`                  | No       | Configures side on Popover.                  |
| `sideOffset`            | `PopoverPrimitive.Positioner.Props["sideOffset"]`            | No       | Configures sideOffset on Popover.            |

## Accessibility Contract

- Connects PopoverTitle and PopoverDescription for screen readers upon opening.
- Dismisses on Escape and returns focus cleanly to PopoverTrigger.

## Do and Don't

| Do                                                                                         | Don't                                                                            |
| :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| Style PopoverTrigger directly with buttonVariants() to avoid nested button elements.       | Overflow narrow popovers across viewport edges; rely on Base UI positioning.     |
| Keep PopoverContent widths explicit (e.g. w-72 or w-80) to avoid auto-width grid collapse. | Use Popover for irreversible destructive confirmation warnings; use AlertDialog. |

## Slots & Pairing

Hosts Slider, Switch, Calendar, or Field controls inside PopoverContent.
