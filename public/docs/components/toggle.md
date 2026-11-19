# Toggle

> Two-state pressed action button adhering to zero-shift geometry.

- **Category**: Actions & Toggles
- **Import**: `import { Toggle, toggleVariants } from "@/components/ui/toggle";`
- **Source**: `src/components/ui/toggle.tsx`
- **Dependencies**: `@base-ui/react`, `class-variance-authority`, `react`
- **Variants**: `default`, `outline`, `surface`
- **Sizes**: `sm`, `default`, `lg`

## Defining Constraint

Maintains identical perimeter geometry across pressed and unpressed states using background surface contrast and aria-pressed semantics.

## When to Use

- Independent two-state toolbar buttons such as Bold, Italic, Pin, or Mute.
- Immediate active/inactive mode switches without form submit steps.

## When Not to Use (Use Instead)

| Alternative         | Reason                                                                   |
| :------------------ | :----------------------------------------------------------------------- |
| [switch](switch.md) | Use Switch when labelling a settings option row with on/off meaning.     |
| [button](button.md) | Use Button for one-shot commands rather than stateful latching controls. |

## Anatomy

```tsx
<Toggle pressed={muted} onPressedChange={setMuted} variant="outline" aria-label="Mute alerts">
  Muted
</Toggle>
```

## Verified Example

```tsx
import * as React from "react";
import { Toggle } from "@/components/ui/toggle";

export function ToggleExample() {
  const [pinned, setPinned] = React.useState(true);

  return (
    <Toggle
      pressed={pinned}
      onPressedChange={setPinned}
      variant="outline"
      aria-label="Pin status rail"
    >
      {pinned ? "Pinned to Rail" : "Pin to Rail"}
    </Toggle>
  );
}
```

## Props Reference

Inherits standard React HTML or Base UI primitive attributes with zero required custom props.

## Accessibility Contract

- Communicates boolean latched state automatically via Base UI aria-pressed.
- Requires explicit aria-label when rendering icon-only toggle content.

## Do and Don't

| Do                                                                               | Don't                                                                      |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Use outline or surface variants on busy backgrounds for clear active separation. | Shift padding or border width between pressed and unpressed visual states. |
| Supply controlled pressed + onPressedChange props when synced to external state. | Use Toggle as a primary page navigation link.                              |

## Slots & Pairing

Combines cleanly inside ToggleGroup or Toolbar containers with explicit size={14} or size={16} icons.
