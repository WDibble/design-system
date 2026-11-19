# SegmentedControl

> Sliding pill mode switcher with compositor spring glide and frozen text metrics.

- **Category**: Actions & Toggles
- **Import**: `import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";`
- **Source**: `src/components/ui/segmented-control.tsx`
- **Dependencies**: `motion`, `react`

## Defining Constraint

Animates a single shared spring background pill across mutually exclusive tabs while keeping text weight frozen so labels never twitch horizontally.

## When to Use

- Switching immediately between 2 to 5 compact modes such as Preview/Code, Light/Dark, or billing cadence.
- High-frequency view filters where all options remain visible at once.

## When Not to Use (Use Instead)

| Alternative                   | Reason                                                                      |
| :---------------------------- | :-------------------------------------------------------------------------- |
| [tabs](tabs.md)               | Use Tabs when switching full content panels with keyboard arrow activation. |
| [radio-group](radio-group.md) | Use RadioGroup inside forms when choices submit with form data.             |
| [select](select.md)           | Use Select when there are more than 5 options.                              |

## Anatomy

```tsx
<SegmentedControl value={mode} onValueChange={setMode} aria-label="View mode">
  <SegmentedControlItem value="preview">Preview</SegmentedControlItem>
  <SegmentedControlItem value="code">Code</SegmentedControlItem>
</SegmentedControl>
```

## Verified Example

```tsx
import * as React from "react";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";

export function SegmentedControlExample() {
  const [viewMode, setViewMode] = React.useState("preview");

  return (
    <SegmentedControl
      value={viewMode}
      onValueChange={setViewMode}
      aria-label="Documentation display mode"
    >
      <SegmentedControlItem value="preview">Preview</SegmentedControlItem>
      <SegmentedControlItem value="code">Code</SegmentedControlItem>
      <SegmentedControlItem value="tokens">Tokens</SegmentedControlItem>
    </SegmentedControl>
  );
}
```

## Props Reference

| Prop            | Type                      | Required | Description                                   |
| :-------------- | :------------------------ | :------- | :-------------------------------------------- |
| `children`      | `React.ReactNode`         | Yes      | Configures children on SegmentedControl.      |
| `onValueChange` | `(value: string) => void` | Yes      | Configures onValueChange on SegmentedControl. |
| `value`         | `string`                  | Yes      | Configures value on SegmentedControl.         |
| `size`          | `"sm" \| "default"`       | No       | Configures size on SegmentedControl.          |

## Accessibility Contract

- Renders role="tablist" with aria-selected on each Segment button.
- Provide an aria-label on SegmentedControl describing what the mode switch controls.

## Do and Don't

| Do                                                                   | Don't                                                    |
| :------------------------------------------------------------------- | :------------------------------------------------------- |
| Keep option labels concise (1 to 2 words) so items stay single-line. | Change font-weight on the selected SegmentedControlItem. |
| Keep item count between 2 and 5 options per control.                 | Wrap multi-row tag clouds into SegmentedControl.         |

## Slots & Pairing

Uses unique layoutId per instance so multiple switchers on one page never collide during spring transitions.
