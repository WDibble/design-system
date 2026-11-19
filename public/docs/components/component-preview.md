# ComponentPreview

> Symmetric live fixture stage with preview/code switcher, viewport presets, and state reset.

- **Category**: Documentation & Schematics
- **Import**: `import { ComponentPreview } from "@/components/ui/component-preview";`
- **Source**: `src/components/ui/component-preview.tsx`
- **Dependencies**: `react`

## Defining Constraint

Provides a symmetric centred stage (`min-h-[180px]`) with live Preview/Code toggling, `375px`/`768px`/`100%` viewport presets, and stateful component reset.

## When to Use

- Documenting interactive primitives with live runnable fixtures backed by verified source code.
- Verifying component anti-crush responsiveness live across 375px, 768px, and 100% widths.

## When Not to Use (Use Instead)

| Alternative                       | Reason                                                                                 |
| :-------------------------------- | :------------------------------------------------------------------------------------- |
| [code-block](code-block.md)       | Use CodeBlock for pure CLI commands, CSS tokens, or TypeScript configuration snippets. |
| [diagram-frame](diagram-frame.md) | Use DiagramFrame for vector SVG architecture schematics.                               |

## Anatomy

```tsx
<ComponentPreview title="Tactile Button" code={snippet}>
  <ButtonExample />
</ComponentPreview>
```

## Verified Example

```tsx
import * as React from "react";
import { ComponentPreview } from "@/components/ui/component-preview";

export function ComponentPreviewExample() {
  const [clicks, setClicks] = React.useState(0);

  return (
    <div className="w-full max-w-lg">
      <ComponentPreview
        title="Nested Interactive Stage"
        code={`<button type="button">Clicked {clicks} times</button>`}
      >
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          className="rounded-lg border border-border/80 bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-xs active:scale-[0.98]"
        >
          Interactive count: {clicks}
        </button>
      </ComponentPreview>
    </div>
  );
}
```

## Props Reference

| Prop                   | Type                  | Required | Description                                                        |
| :--------------------- | :-------------------- | :------- | :----------------------------------------------------------------- |
| `children`             | `React.ReactNode`     | Yes      | Live interactive component fixture                                 |
| `code`                 | `string`              | Yes      | Source code string revealed in Code view and copied via CopyButton |
| `allowReset`           | `boolean`             | No       | Display state reset button to remount interactive children         |
| `defaultView`          | `"preview" \| "code"` | No       | Initial view tab                                                   |
| `description`          | `string`              | No       | Concise summary describing what the fixture demonstrates           |
| `filename`             | `string`              | No       | Optional filename shown inside Code view                           |
| `language`             | `string`              | No       | Language tag passed to CodeBlock when inspecting source            |
| `showViewportControls` | `boolean`             | No       | Display 375px / 768px / 100% viewport switcher buttons             |
| `title`                | `string`              | No       | Heading displayed above the preview control bar                    |

## Accessibility Contract

- Viewport buttons declare explicit aria-label and aria-pressed state.
- Reset button exposes aria-label="Reset preview state" and remounts fixture state cleanly.

## Do and Don't

| Do                                                                         | Don't                                                                             |
| :------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Pass verified compiling JSX in code matching the rendered fixture.         | Hardcode conflicting cramped heights inside children that crush component tokens. |
| Include showViewportControls when testing responsive anti-crush behaviour. | Nest full-page multi-modal portals default-open inside ComponentPreview.          |

## Slots & Pairing

Automatically delegates source inspection to CodeBlock and CopyButton.
