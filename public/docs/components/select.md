# Select

> Headless Base UI selector with keyboard navigation and liquid glass popup.

- **Category**: Forms & Input
- **Import**: `import { Select, SelectContent, SelectGroup, SelectGroupLabel } from "@/components/ui/select";`
- **Source**: `src/components/ui/select.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Built on headless Base UI Select primitives with liquid glass overlay elevation and keyboard type-ahead selection without native browser inconsistencies.

## When to Use

- Selecting one fixed value from 5 to 15 compact choices inside forms or toolbars.
- Choosing environment targets, locales, or categorical form fields without text search.

## When Not to Use (Use Instead)

| Alternative                       | Reason                                                                     |
| :-------------------------------- | :------------------------------------------------------------------------- |
| [combobox](combobox.md)           | Use Combobox when users need live text filtering over long option lists.   |
| [radio-group](radio-group.md)     | Use RadioGroup when 2 to 4 choices benefit from being visible upfront.     |
| [dropdown-menu](dropdown-menu.md) | Use DropdownMenu for triggering commands rather than picking a form value. |

## Anatomy

```tsx
<Select value={region} onValueChange={setRegion}>
  <SelectTrigger aria-label="Deployment region">
    <SelectValue placeholder="Choose region" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="lon">London (eu-west-2)</SelectItem>
  </SelectContent>
</Select>
```

## Verified Example

```tsx
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectExample() {
  const [region, setRegion] = React.useState("eu-west-2");

  return (
    <div className="w-full max-w-xs">
      <Select value={region} onValueChange={(next) => setRegion(next ?? "eu-west-2")}>
        <SelectTrigger aria-label="Edge region selector">
          <SelectValue placeholder="Choose region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="eu-west-2">London (eu-west-2)</SelectItem>
          <SelectItem value="us-east-1">Virginia (us-east-1)</SelectItem>
          <SelectItem value="ap-northeast-1">Tokyo (ap-northeast-1)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

## Props Reference

| Prop   | Type                        | Required | Description                |
| :----- | :-------------------------- | :------- | :------------------------- |
| `size` | `"default" \| "sm" \| "lg"` | No       | Configures size on Select. |

## Accessibility Contract

- Trigger exposes aria-haspopup="listbox" and active item selection.
- Supply explicit aria-label or associated FieldLabel on SelectTrigger.

## Do and Don't

| Do                                                                             | Don't                                                                              |
| :----------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| Group large categories cleanly with SelectGroup and SelectGroupLabel.          | Nest a custom <Button> inside SelectTrigger; SelectTrigger renders its own button. |
| Provide concise placeholders inside SelectValue when uncontrolled or nullable. | Use Select for 2 boolean choices where Switch or SegmentedControl fits better.     |

## Slots & Pairing

Composes with SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectGroupLabel, and SelectItem.
