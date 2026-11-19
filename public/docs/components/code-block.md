# CodeBlock

> Concentric syntax viewport with tabular line numbers, line highlights, and multi-tab switcher.

- **Category**: Documentation & Schematics
- **Import**: `import { CodeBlock } from "@/components/ui/code-block";`
- **Source**: `src/components/ui/code-block.tsx`
- **Dependencies**: `react`

## Defining Constraint

Frames concentric code viewports (`rounded-2xl` outer, `rounded-[10px]` inner) with tabular-nums line gutters, focus line highlights, SegmentedControl tabs, and CopyButton.

## When to Use

- Presenting verified source snippets, CLI command tabs (Install / Verify), and highlighted config blocks.
- Side-by-side multi-framework installation tabs powered by SegmentedControl.

## When Not to Use (Use Instead)

| Alternative                               | Reason                                                                                |
| :---------------------------------------- | :------------------------------------------------------------------------------------ |
| [component-preview](component-preview.md) | Use ComponentPreview when pairing runnable interactive output alongside its TSX code. |
| [kbd](kbd.md)                             | Use Kbd for inline physical keycaps.                                                  |

## Anatomy

```tsx
<CodeBlock
  filename="verify.sh"
  language="bash"
  highlightLines={[2]}
  code="npm run docs:build
npm run check"
/>
```

## Verified Example

```tsx
import { CodeBlock } from "@/components/ui/code-block";

export function CodeBlockExample() {
  return (
    <div className="w-full max-w-lg">
      <CodeBlock
        tabs={[
          {
            id: "docs",
            label: "Sync Docs",
            language: "bash",
            highlightLines: [1],
            code: "npm run docs:build\nnpm run docs:check",
          },
          {
            id: "verify",
            label: "Full Gate",
            language: "bash",
            code: "npm run invariants\nnpm run check",
          },
        ]}
      />
    </div>
  );
}
```

## Props Reference

| Prop              | Type                      | Required | Description                                                        |
| :---------------- | :------------------------ | :------- | :----------------------------------------------------------------- |
| `caption`         | `string`                  | No       | Optional caption rendered below the concentric code frame          |
| `code`            | `string`                  | No       | Single-snippet code content (ignored when tabs are supplied)       |
| `copyable`        | `boolean`                 | No       | Display clipboard CopyButton in the header bar                     |
| `defaultTab`      | `string`                  | No       | Uncontrolled initial tab ID when tabs are supplied                 |
| `filename`        | `string`                  | No       | Optional filename or path label shown in the header bar            |
| `highlightLines`  | `number[]`                | No       | 1-indexed line numbers to emphasise in single-snippet mode         |
| `language`        | `string`                  | No       | Language badge string for single-snippet mode                      |
| `maxHeight`       | `string`                  | No       | Optional CSS max-height constraint on the scrollable code viewport |
| `onValueChange`   | `(tabId: string) => void` | No       | Callback fired when active tab changes                             |
| `showLineNumbers` | `boolean`                 | No       | Display tabular line numbers in a non-selectable gutter            |
| `tabs`            | `CodeBlockTab[]`          | No       | Multi-tab snippet definitions rendered via SegmentedControl        |
| `value`           | `string`                  | No       | Controlled active tab ID when tabs are supplied                    |

## Accessibility Contract

- Marks decorative line-number gutters aria-hidden="true" so copy selection and screen readers skip line indices.
- Integrated CopyButton exposes dynamic aria-label and keyboard activation.

## Do and Don't

| Do                                                                                      | Don't                                                                         |
| :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Pass tabs array with distinct ids for multi-variant snippets (Install, Import, Verify). | Keep outdated uncompiled snippets when a typechecked ComponentPreview exists. |
| Use highlightLines to call attention to crucial props such as size={16}.                | Dump 200-line raw files inline without maxHeight constraints.                 |

## Slots & Pairing

Supports single snippet props (`code`, `language`, `filename`, `highlightLines`) or multi-tab `tabs` arrays.
