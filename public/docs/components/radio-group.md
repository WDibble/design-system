# RadioGroup

> WAI-ARIA compliant mutual exclusion selector with animated indicator.

- **Category**: Forms & Input
- **Import**: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`
- **Source**: `src/components/ui/radio-group.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Enforces single-choice mutual exclusion across visible options with arrow-key roving focus and a smooth spring indicator dot.

## When to Use

- Comparing 2 to 5 mutually exclusive choices where seeing all option descriptions side by side helps.
- Billing tier selection, export formats, or deployment regions inside forms.

## When Not to Use (Use Instead)

| Alternative                               | Reason                                                                        |
| :---------------------------------------- | :---------------------------------------------------------------------------- |
| [select](select.md)                       | Use Select when more than 5 options would clutter the layout.                 |
| [segmented-control](segmented-control.md) | Use SegmentedControl for immediate UI view switching outside form submission. |

## Anatomy

```tsx
<RadioGroup value={plan} onValueChange={setPlan} aria-label="Plan tier">
  <label className="flex items-center gap-2">
    <RadioGroupItem value="starter" />
    <span>Starter</span>
  </label>
</RadioGroup>
```

## Verified Example

```tsx
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupExample() {
  const [tier, setTier] = React.useState("standard");

  return (
    <RadioGroup
      value={tier}
      onValueChange={(next) => setTier(String(next))}
      aria-label="Contrast verification threshold"
      className="flex flex-col gap-2"
    >
      <label className="inline-flex items-center gap-2.5 text-sm text-foreground">
        <RadioGroupItem value="standard" />
        <span>WCAG 2.2 AA + APCA Standard</span>
      </label>
      <label className="inline-flex items-center gap-2.5 text-sm text-foreground">
        <RadioGroupItem value="strict" />
        <span>WCAG 2.2 AAA + APCA 75+ Editorial</span>
      </label>
    </RadioGroup>
  );
}
```

## Props Reference

| Prop   | Type                | Required | Description                    |
| :----- | :------------------ | :------- | :----------------------------- |
| `size` | `"sm" \| "default"` | No       | Configures size on RadioGroup. |

## Accessibility Contract

- Arrow Up/Down/Left/Right keys move selection cleanly within one tab stop.
- Declare aria-label or FieldLabel on RadioGroup and pair every RadioGroupItem with a label.

## Do and Don't

| Do                                                                       | Don't                                                                   |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| Wrap each RadioGroupItem and its caption in a clickable <label>.         | Allow unselected empty initial state unless no sensible default exists. |
| Use Checkbox instead when multiple items may be selected simultaneously. | Nest clickable links inside clickable radio row labels.                 |

## Slots & Pairing

Works smoothly inside Field wrappers or Card option rows.
