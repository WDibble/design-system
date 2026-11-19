# Tooltip

> Compact contextual hint surface with configurable hover delay.

- **Category**: Overlays & Surfaces
- **Import**: `import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider } from "@/components/ui/tooltip";`
- **Source**: `src/components/ui/tooltip.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Presents micro plain-text clarifications on icon buttons and keyboard shortcuts within a shared TooltipProvider warmup window.

## When to Use

- Explaining icon-only controls, displaying keyboard shortcuts (`⌘K`), or clarifying truncated telemetry codes.
- Lightweight micro-hints on hover or keyboard focus without adding visible chrome.

## When Not to Use (Use Instead)

| Alternative                 | Reason                                                                     |
| :-------------------------- | :------------------------------------------------------------------------- |
| [popover](popover.md)       | Use Popover if the overlay contains clickable links, buttons, or controls. |
| [hover-card](hover-card.md) | Use HoverCard for rich multi-line preview panels anchored to links.        |

## Anatomy

```tsx
<TooltipProvider delay={150}>
  <Tooltip>
    <TooltipTrigger
      aria-label="Show help"
      className={buttonVariants({ size: "icon-sm", variant: "ghost" })}
    >
      ?
    </TooltipTrigger>
    <TooltipContent>Inspect shortcut</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Verified Example

```tsx
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipExample() {
  return (
    <TooltipProvider delay={100}>
      <Tooltip>
        <TooltipTrigger
          aria-label="Inspect build gate hint"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Hover for Shortcut
        </TooltipTrigger>
        <TooltipContent>Open Documentation Portal (⌘D)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Props Reference

| Prop          | Type                                              | Required | Description                        |
| :------------ | :------------------------------------------------ | :------- | :--------------------------------- |
| `align`       | `TooltipPrimitive.Positioner.Props["align"]`      | No       | Configures align on Tooltip.       |
| `portalProps` | `TooltipPrimitive.Portal.Props`                   | No       | Configures portalProps on Tooltip. |
| `showArrow`   | `boolean`                                         | No       | Configures showArrow on Tooltip.   |
| `side`        | `TooltipPrimitive.Positioner.Props["side"]`       | No       | Configures side on Tooltip.        |
| `sideOffset`  | `TooltipPrimitive.Positioner.Props["sideOffset"]` | No       | Configures sideOffset on Tooltip.  |

## Accessibility Contract

- Appears on both hover and keyboard focus-visible and dismisses on Escape.
- Icon-only triggers must still declare an explicit aria-label directly on the trigger.

## Do and Don't

| Do                                                                                    | Don't                                                              |
| :------------------------------------------------------------------------------------ | :----------------------------------------------------------------- |
| Wrap icon toolbar clusters inside TooltipProvider so sequential hovers open smoothly. | Place buttons, links, or interactive inputs inside TooltipContent. |
| Keep tooltip copy short (under 8 words).                                              | Repeat the visible button text verbatim inside its TooltipContent. |

## Slots & Pairing

Pairs TooltipProvider, Tooltip, TooltipTrigger, and TooltipContent with Kbd hints.
