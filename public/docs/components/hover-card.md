# HoverCard

> Rich contextual preview popover triggered on pointer hover or keyboard focus.

- **Category**: Overlays & Surfaces
- **Import**: `import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from "@/components/ui/hover-card";`
- **Source**: `src/components/ui/hover-card.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Displays passive, non-essential supplementary reference details on pointer hover or link focus with gentle timing hysteresis.

## When to Use

- User profile cards, git commit previews, or token definitions hovering over inline anchors.
- Read-only reference summaries enrichment over navigation links.

## When Not to Use (Use Instead)

| Alternative           | Reason                                                                               |
| :-------------------- | :----------------------------------------------------------------------------------- |
| [tooltip](tooltip.md) | Use Tooltip for short plain-text key hints or icon button labels.                    |
| [popover](popover.md) | Use Popover whenever content needs reliable click-open persistence on touch screens. |

## Anatomy

```tsx
<HoverCard>
  <HoverCardTrigger href="#spec">@design-system</HoverCardTrigger>
  <HoverCardContent>
    <p className="text-xs">57 verified primitives in OKLCH.</p>
  </HoverCardContent>
</HoverCard>
```

## Verified Example

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function HoverCardExample() {
  return (
    <HoverCard>
      <HoverCardTrigger
        href="#docs"
        className="font-mono text-xs font-medium text-primary underline underline-offset-4"
      >
        @antigravity/primitives
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-xs leading-relaxed text-muted-foreground">
          57 accessible primitives verified against WCAG 2.2 AA and APCA perceptual contrast.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Props Reference

| Prop         | Type                                             | Required | Description                         |
| :----------- | :----------------------------------------------- | :------- | :---------------------------------- |
| `align`      | `PreviewCardPrimitive.Positioner.Props["align"]` | No       | Configures align on HoverCard.      |
| `side`       | `PreviewCardPrimitive.Positioner.Props["side"]`  | No       | Configures side on HoverCard.       |
| `sideOffset` | `number`                                         | No       | Configures sideOffset on HoverCard. |

## Accessibility Contract

- Trigger is always a focusable anchor link leading to the full target resource.
- Do not gate critical required information exclusively inside hover cards.

## Do and Don't

| Do                                                                           | Don't                                                                   |
| :--------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| Pass a real href target on HoverCardTrigger for touch and keyboard visitors. | Put critical form buttons inside HoverCardContent; use Popover instead. |
| Keep HoverCard body brief and scannable.                                     | Trigger nested HoverCards from within HoverCardContent.                 |

## Slots & Pairing

Pairs HoverCardTrigger and HoverCardContent with Avatar or Badge summaries.
