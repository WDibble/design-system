# Field

> Compound form field wrapper coordinating labels, hints, and min-h-[1lh] error slots.

- **Category**: Forms & Input
- **Import**: `import { Field, FieldControl, FieldDescription, FieldError } from "@/components/ui/field";`
- **Source**: `src/components/ui/field.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Connects accessible label, input control, helper description, and min-h-[1lh] error slots under shared Base UI invalid state IDs.

## When to Use

- Every form control requiring a visible label, validation message, or supporting hint.
- Preventing vertical page jumps when error states toggle between valid and invalid.

## When Not to Use (Use Instead)

| Alternative           | Reason                                                               |
| :-------------------- | :------------------------------------------------------------------- |
| [callout](callout.md) | Use Callout for page-level banners rather than per-input validation. |

## Anatomy

```tsx
<Field invalid={Boolean(error)}>
  <FieldLabel requiredIndicator>Workspace Slug</FieldLabel>
  <Input value={slug} onChange={...} />
  <FieldDescription>Lowercase URL identifier.</FieldDescription>
  <FieldError match={Boolean(error)}>{error}</FieldError>
</Field>
```

## Verified Example

```tsx
import * as React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function FieldExample() {
  const [slug, setSlug] = React.useState("edge-gateway");
  const isInvalid = slug.trim().length < 3;

  return (
    <div className="w-full max-w-sm">
      <Field invalid={isInvalid}>
        <FieldLabel requiredIndicator>Workspace Slug</FieldLabel>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="workspace-slug"
          error={isInvalid}
        />
        <FieldDescription>Used inside stable documentation routes.</FieldDescription>
        <FieldError match={isInvalid}>Minimum 3 characters required.</FieldError>
      </Field>
    </div>
  );
}
```

## Props Reference

| Prop                | Type      | Required | Description                            |
| :------------------ | :-------- | :------- | :------------------------------------- |
| `optional`          | `boolean` | No       | Configures optional on Field.          |
| `requiredIndicator` | `boolean` | No       | Configures requiredIndicator on Field. |

## Accessibility Contract

- Binds label htmlFor and aria-describedby automatically between FieldLabel, control, and FieldError.
- Reserves vertical baseline height via min-h-[1lh] so dynamic errors avoid CLS.

## Do and Don't

| Do                                                                                        | Don't                                                                                   |
| :---------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| Pass requiredIndicator on FieldLabel rather than appending raw colour asterisks manually. | Place unrelated submit buttons directly inside the Field column without spacing.        |
| Use FieldError match={true} (or boolean condition) for synchronous validation copy.       | Hide invalid state solely with red borders; always supply descriptive FieldError prose. |

## Slots & Pairing

Coordinates Input, Textarea, Select, Combobox, and Checkbox with FieldLabel, FieldDescription, and FieldError.
