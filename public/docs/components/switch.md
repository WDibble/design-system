# Switch

> 44px accessible toggle switch with fluid thumb spring easing.

- **Category**: Forms & Input
- **Import**: `import { Switch } from "@/components/ui/switch";`
- **Source**: `src/components/ui/switch.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Pairs an instant spring thumb travel inside a 44px accessible touch target with subtle active pill elongation on pointerdown.

## When to Use

- Immediate on/off settings toggles that apply live without submitting a form.
- Preference rows pairing concise labels with binary system feature flags.

## When Not to Use (Use Instead)

| Alternative             | Reason                                                                         |
| :---------------------- | :----------------------------------------------------------------------------- |
| [checkbox](checkbox.md) | Use Checkbox inside forms that commit only on submit or in multi-select lists. |
| [toggle](toggle.md)     | Use Toggle inside compact icon toolbars.                                       |

## Anatomy

```tsx
<label className="inline-flex items-center gap-3">
  <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Live contrast gate" />
  <span>Live Contrast Gate</span>
</label>
```

## Verified Example

```tsx
import * as React from "react";
import { Switch } from "@/components/ui/switch";

export function SwitchExample() {
  const [strictGate, setStrictGate] = React.useState(true);

  return (
    <label className="inline-flex items-center gap-3 text-sm text-foreground">
      <Switch
        checked={strictGate}
        onCheckedChange={setStrictGate}
        aria-label="Automatic AST docs verification"
      />
      <span>Automatic AST docs gate</span>
    </label>
  );
}
```

## Props Reference

| Prop   | Type                | Required | Description                |
| :----- | :------------------ | :------- | :------------------------- |
| `size` | `"sm" \| "default"` | No       | Configures size on Switch. |

## Accessibility Contract

- Exposes role="switch" and aria-checked state via Base UI.
- Always pair with a visible label and explicit aria-label.

## Do and Don't

| Do                                                                                          | Don't                                                                                |
| :------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| Name the setting clearly so "on" vs "off" state is unmistakable without reading "Disabled". | Pair Switch with a Save button when changes take effect later; use Checkbox instead. |
| Keep label wording positive rather than negated phrases like Disable telemetry.             | Shrink Switch hit targets below 44px touch clearance.                                |

## Slots & Pairing

Works well inside Card rows, Sheet preference drawers, and settings tables.
