# PropTable

> Anti-crush TypeScript API reference table displaying props, types, defaults, and required pills.

- **Category**: Documentation & Schematics
- **Import**: `import { PropTable } from "@/components/ui/prop-table";`
- **Source**: `src/components/ui/prop-table.tsx`
- **Dependencies**: `react`

## Defining Constraint

Renders anti-crush TypeScript prop specifications inside a responsive Table using shrink-0 Required badges and tabular default indicators.

## When to Use

- Documenting exported TypeScript *Props interfaces extracted by AST or authored manually.
- Comparing prop names, union type strings, default values, and Required flags cleanly.

## When Not to Use (Use Instead)

| Alternative       | Reason                                                                    |
| :---------------- | :------------------------------------------------------------------------ |
| [table](table.md) | Use Table directly for operational datasets, metrics, or cluster ledgers. |

## Anatomy

```tsx
<PropTable
  title="ButtonProps"
  props={[
    {
      name: "variant",
      type: '"default" | "outline"',
      defaultValue: '"default"',
      description: "Selects visual button role.",
    },
  ]}
/>
```

## Verified Example

```tsx
import { PropTable, type PropDefinition } from "@/components/ui/prop-table";

const SAMPLE_PROPS: PropDefinition[] = [
  {
    name: "variant",
    type: '"default" | "outline" | "destructive"',
    defaultValue: '"default"',
    description: "Selects visual button role without shifting border width.",
  },
  {
    name: "leftIcon",
    type: "React.ReactNode",
    required: false,
    description: "Optional kinetic icon bound to parent button lifecycle.",
  },
];

export function PropTableExample() {
  return (
    <div className="w-full max-w-xl">
      <PropTable title="SampleProps" props={SAMPLE_PROPS} />
    </div>
  );
}
```

## Props Reference

| Prop           | Type               | Required | Description                                          |
| :------------- | :----------------- | :------- | :--------------------------------------------------- |
| `props`        | `PropDefinition[]` | Yes      | Component prop rows to document                      |
| `caption`      | `string`           | No       | Optional caption describing inherited DOM attributes |
| `emptyMessage` | `string`           | No       | Fallback text displayed when props array is empty    |
| `title`        | `string`           | No       | Optional table heading label                         |

## Accessibility Contract

- Preserves semantic `<th scope="col">` headers and optional `<TableCaption>` context.
- Required pills declare shrink-0 whitespace-nowrap so prop names never wrap awkwardly.

## Do and Don't

| Do                                                                                | Don't                                                                                   |
| :-------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| Populate props directly from docsManifest.primitives to guarantee zero API drift. | Squeeze long union signatures into narrow fixed-pixel columns without min-w-[140px].    |
| Use accurate TypeScript notation inside type signatures.                          | Leave empty unlabelled tables when props array is empty; rely on emptyMessage fallback. |

## Slots & Pairing

Built atop Table and Badge primitives and paired inside DocArticle reference pages.
