# Combobox

> Searchable autocomplete selector with keyboard roving navigation.

- **Category**: Forms & Input
- **Import**: `import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup } from "@/components/ui/combobox";`
- **Source**: `src/components/ui/combobox.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Pairs a filterable text input with a headless Base UI listbox popup supporting keyboard type-ahead and empty state feedback.

## When to Use

- Choosing one or more options from large sets (more than 10 items) where users type to filter.
- Country pickers, model selectors, or filterable tag selectors.

## When Not to Use (Use Instead)

| Alternative           | Reason                                                                              |
| :-------------------- | :---------------------------------------------------------------------------------- |
| [select](select.md)   | Use Select when there are 5 to 12 familiar options that do not need text filtering. |
| [command](command.md) | Use Command for global modal application command palettes (⌘K).                     |

## Anatomy

```tsx
<Combobox items={frameworks} value={value} onValueChange={setValue}>
  <ComboboxInput aria-label="Select framework" placeholder="Search..." />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="React">React</ComboboxItem>
      <ComboboxEmpty>No matches found.</ComboboxEmpty>
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

## Verified Example

```tsx
import * as React from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";

const FRAMEWORK_ITEMS = ["React 19", "Next.js", "Vite", "Astro", "Remix"];

export function ComboboxExample() {
  const [framework, setFramework] = React.useState<string | null>("Vite");

  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel>Target Runtime</FieldLabel>
        <Combobox items={FRAMEWORK_ITEMS} value={framework} onValueChange={setFramework}>
          <ComboboxInput placeholder="Search runtime..." aria-label="Select target runtime" />
          <ComboboxContent>
            <ComboboxList>
              {FRAMEWORK_ITEMS.map((item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              ))}
              <ComboboxEmpty>No matching runtime.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  );
}
```

## Props Reference

| Prop         | Type                        | Required | Description                        |
| :----------- | :-------------------------- | :------- | :--------------------------------- |
| `clearable`  | `boolean`                   | No       | Configures clearable on Combobox.  |
| `icon`       | `React.ReactNode`           | No       | Configures icon on Combobox.       |
| `portal`     | `boolean`                   | No       | Configures portal on Combobox.     |
| `sideOffset` | `number`                    | No       | Configures sideOffset on Combobox. |
| `size`       | `"sm" \| "default" \| "lg"` | No       | Configures size on Combobox.       |

## Accessibility Contract

- ComboboxInput exposes role="combobox" with aria-expanded and aria-controls managed by Base UI.
- Provide a visible label or aria-label directly on ComboboxInput.

## Do and Don't

| Do                                                                                      | Don't                                                                      |
| :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Include ComboboxEmpty inside ComboboxList so filtered zero-result states are announced. | Omit the value prop on ComboboxItem when binding array options.            |
| Use ComboboxGroup and ComboboxGroupLabel when options span distinct categories.         | Render Combobox for a binary choice where Switch or RadioGroup is clearer. |

## Slots & Pairing

Accepts string arrays or structured objects passed via items alongside Field validation wrappers.
