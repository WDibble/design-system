# Input

> 16px iOS zoom-safe text field with specular border and prefix/suffix slots.

- **Category**: Forms & Input
- **Import**: `import { Input, inputVariants } from "@/components/ui/input";`
- **Source**: `src/components/ui/input.tsx`
- **Dependencies**: `@base-ui/react`, `class-variance-authority`, `react`

## Defining Constraint

Maintains a minimum 16px base font size on mobile viewports (<640px) to stop iOS Safari auto-zoom while hugging focus rings cleanly at 1px.

## When to Use

- Single-line text, email, search, API key, or numeric form entry.
- Search fields enhanced with leftIcon, rightIcon, prefixText, or suffixText add-ons.

## When Not to Use (Use Instead)

| Alternative               | Reason                                                                 |
| :------------------------ | :--------------------------------------------------------------------- |
| [textarea](textarea.md)   | Use Textarea for multi-line prose, notes, or JSON payloads.            |
| [input-otp](input-otp.md) | Use InputOTP for fixed-length SMS or authenticator verification codes. |
| [stepper](stepper.md)     | Use Stepper when users increment small integer counters step by step.  |

## Anatomy

```tsx
<Input inputSize="default" leftIcon={<SearchIcon size={16} />} placeholder="Search tokens..." />
```

## Verified Example

```tsx
import * as React from "react";
import { SearchIcon } from "@/components/icons";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function InputExample() {
  const [query, setQuery] = React.useState("");

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>Filter Primitives</FieldLabel>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search buttons, forms, tokens..."
          leftIcon={<SearchIcon size={16} aria-hidden="true" />}
        />
      </Field>
    </div>
  );
}
```

## Props Reference

| Prop         | Type              | Required | Description                     |
| :----------- | :---------------- | :------- | :------------------------------ |
| `error`      | `boolean`         | No       | Configures error on Input.      |
| `leftIcon`   | `React.ReactNode` | No       | Configures leftIcon on Input.   |
| `prefixText` | `string`          | No       | Configures prefixText on Input. |
| `rightIcon`  | `React.ReactNode` | No       | Configures rightIcon on Input.  |
| `suffixText` | `string`          | No       | Configures suffixText on Input. |

## Accessibility Contract

- Bind an explicit FieldLabel or aria-label; never rely solely on placeholder text as a label.
- Sets aria-invalid automatically when error prop is true.

## Do and Don't

| Do                                                                                  | Don't                                                                  |
| :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| Pass numeric size={16} (default) or size={14} (sm) on leftIcon and rightIcon icons. | Force text-xs on mobile inputs where 16px zoom protection is required. |
| Wrap with Field and FieldError for structured validation.                           | Combine prefixText with cramped padding that clips long prefixes.      |

## Slots & Pairing

Supports inputSize (sm, default, lg), leftIcon, rightIcon, prefixText, and suffixText.
