# Textarea

> Multi-line text input with subtle border-hugging focus contrast.

- **Category**: Forms & Input
- **Import**: `import { Textarea } from "@/components/ui/textarea";`
- **Source**: `src/components/ui/textarea.tsx`
- **Dependencies**: `react`

## Defining Constraint

Preserves flush 1px border-hugging focus contrast and mobile 16px zoom protection across arbitrary multi-line prose heights.

## When to Use

- Comments, system prompts, multi-line release notes, or structured descriptions.
- Markdown authoring areas paired directly beneath MarkdownToolbar.

## When Not to Use (Use Instead)

| Alternative       | Reason                                                              |
| :---------------- | :------------------------------------------------------------------ |
| [input](input.md) | Use Input for single-line values such as titles or email addresses. |

## Anatomy

```tsx
<Field>
  <FieldLabel>Release Summary</FieldLabel>
  <Textarea rows={4} placeholder="Summarise architectural changes..." />
</Field>
```

## Verified Example

```tsx
import * as React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export function TextareaExample() {
  const [notes, setNotes] = React.useState(
    "Concentric card radius calibrated cleanly with zero layout shift."
  );

  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel>Architecture Decision Notes</FieldLabel>
        <Textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Document the structural constraint..."
        />
      </Field>
    </div>
  );
}
```

## Props Reference

| Prop    | Type      | Required | Description                   |
| :------ | :-------- | :------- | :---------------------------- |
| `error` | `boolean` | No       | Configures error on Textarea. |

## Accessibility Contract

- Bind an explicit FieldLabel or aria-label; never use placeholder alone as the field label.
- Respects aria-invalid and disabled attributes directly via native and Base UI attributes.

## Do and Don't

| Do                                                                     | Don't                                                                               |
| :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| Specify sensible initial rows (3 to 6) matching expected input length. | Disable vertical manual resize unless the container layout strictly manages height. |
| Pair directly below MarkdownToolbar when editing rich Markdown.        | Force users into a tiny one-line Input when multi-sentence input is expected.       |

## Slots & Pairing

Composes directly with Field, FieldLabel, FieldError, and MarkdownToolbar.
