# Checkbox

> Tri-state accessible checkbox with 44px touch hit target expansion.

- **Category**: Forms & Input
- **Import**: `import { Checkbox } from "@/components/ui/checkbox";`
- **Source**: `src/components/ui/checkbox.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Expands hit area with an invisible 44px touch target around a crisp rounded indicator supporting checked, unchecked, and indeterminate states.

## When to Use

- Multi-select option lists, table row selection, or opt-in policy acknowledgements inside forms.
- Parent-child selection trees requiring an indeterminate mixed state.

## When Not to Use (Use Instead)

| Alternative                   | Reason                                                                           |
| :---------------------------- | :------------------------------------------------------------------------------- |
| [switch](switch.md)           | Use Switch for immediate system settings that take effect without a Save button. |
| [radio-group](radio-group.md) | Use RadioGroup when only one option from a small list can be selected.           |

## Anatomy

```tsx
<label className="inline-flex items-center gap-2.5">
  <Checkbox checked={agreed} onCheckedChange={setAgreed} />
  <span>Accept terms</span>
</label>
```

## Verified Example

```tsx
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);

  return (
    <label className="inline-flex items-center gap-2.5 text-sm text-foreground">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <span>Enforce APCA contrast check on build</span>
    </label>
  );
}
```

## Props Reference

| Prop   | Type                | Required | Description                  |
| :----- | :------------------ | :------- | :--------------------------- |
| `size` | `"sm" \| "default"` | No       | Configures size on Checkbox. |

## Accessibility Contract

- Always pair Checkbox with a wrapping <label>, aria-labelledby, or explicit aria-label.
- Supports Space key toggling and indeterminate aria-checked="mixed" state.

## Do and Don't

| Do                                                                                 | Don't                                                            |
| :--------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| Provide an explicit indeterminate prop on select-all parent checkboxes.            | Render bare Checkbox inputs without clickable label association. |
| Preserve generous vertical spacing (gap-2.5+) so 44px touch targets never overlap. | Use Checkbox when only one mutual exclusion choice is permitted. |

## Slots & Pairing

Composes naturally inside Field wrappers alongside FieldLabel and FieldDescription.
