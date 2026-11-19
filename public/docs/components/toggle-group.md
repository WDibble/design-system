# ToggleGroup

> Grouped toggle toolbar supporting single and multi-select roving focus.

- **Category**: Actions & Toggles
- **Import**: `import { ToggleGroup, useToggleGroup } from "@/components/ui/toggle-group";`
- **Source**: `src/components/ui/toggle-group.tsx`
- **Dependencies**: `@base-ui/react`, `class-variance-authority`, `react`

## Defining Constraint

Distributes shared variant and size context plus roving arrow-key navigation across a related set of Toggle buttons.

## When to Use

- Grouping 2 to 5 compact formatting or alignment options (left, centre, right).
- Allowing either single or multiple simultaneous active toggle flags in a compact bar.

## When Not to Use (Use Instead)

| Alternative                               | Reason                                                       |
| :---------------------------------------- | :----------------------------------------------------------- |
| [segmented-control](segmented-control.md) | Use SegmentedControl for sliding pill single-view switchers. |
| [radio-group](radio-group.md)             | Use RadioGroup inside labelled forms.                        |

## Anatomy

```tsx
<ToggleGroup value={align} onValueChange={setAlign} variant="surface">
  <Toggle value="left" aria-label="Align left" />
  <Toggle value="center" aria-label="Align centre" />
</ToggleGroup>
```

## Verified Example

```tsx
import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";

export function ToggleGroupExample() {
  const [selection, setSelection] = React.useState<string[]>(["bold"]);

  return (
    <ToggleGroup value={selection} onValueChange={setSelection} variant="surface" multiple>
      <Toggle value="bold" aria-label="Bold formatting">
        Bold
      </Toggle>
      <Toggle value="italic" aria-label="Italic formatting">
        Italic
      </Toggle>
      <Toggle value="code" aria-label="Inline code formatting">
        Code
      </Toggle>
    </ToggleGroup>
  );
}
```

## Props Reference

Inherits standard React HTML or Base UI primitive attributes with zero required custom props.

## Accessibility Contract

- Provides arrow-key roving focus across child Toggle items inside one tab stop.
- Every icon-only child Toggle must declare an explicit aria-label.

## Do and Don't

| Do                                                                           | Don't                                                |
| :--------------------------------------------------------------------------- | :--------------------------------------------------- |
| Pass string value keys to each child Toggle inside ToggleGroup.              | Mix unrelated navigation links inside a ToggleGroup. |
| Set variant="surface" to frame subtle groups cleanly inside inspector panes. | Omit aria-label on text-free formatting buttons.     |

## Slots & Pairing

Children read size and variant automatically through ToggleGroup context.
