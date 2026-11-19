# ScrollArea

> Cross-browser custom scrollbar viewport preserving layout gutter parity.

- **Category**: Data & Feedback
- **Import**: `import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";`
- **Source**: `src/components/ui/scroll-area.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Provides uniform minimal custom scrollbars without disturbing content gutter symmetry across macOS, Windows, and Linux browsers.

## When to Use

- Bounded lists, command drawers, preview trees, and sticky sidebar navigation panels.
- Compact scrollable regions preserving visual scrollbar styling across browsers.

## When Not to Use (Use Instead)

| Alternative                 | Reason                                                                        |
| :-------------------------- | :---------------------------------------------------------------------------- |
| [doc-layout](doc-layout.md) | Let top-level document prose scroll naturally with the main browser viewport. |

## Anatomy

```tsx
<ScrollArea className="h-36 w-full rounded-xl border p-3">
  <div className="space-y-2">...</div>
  <ScrollBar orientation="vertical" />
</ScrollArea>
```

## Verified Example

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function ScrollAreaExample() {
  return (
    <ScrollArea className="h-28 w-full max-w-sm rounded-xl border border-border/70 p-3">
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <p>Directive 01: Physical yield on pointerdown</p>
        <p>Directive 02: Zero layout shifts across states</p>
        <p>Directive 03: Tabular numerals on numeric columns</p>
        <p>Directive 06: Concentric nested corner radii</p>
        <p>Directive 11: Perceptual OKLCH contrast gates</p>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
```

## Props Reference

| Prop                | Type                        | Required | Description                                 |
| :------------------ | :-------------------------- | :------- | :------------------------------------------ |
| `viewportClassName` | `string`                    | No       | Configures viewportClassName on ScrollArea. |
| `viewportRef`       | `React.Ref<HTMLDivElement>` | No       | Configures viewportRef on ScrollArea.       |

## Accessibility Contract

- Preserves native wheel, touch, and keyboard scrollability without trapping page focus.
- Include explicit height/width constraints on ScrollArea so overflow activates cleanly.

## Do and Don't

| Do                                                                              | Don't                                                                                   |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------- |
| Pair matching ScrollBar orientation with vertical or horizontal scroll content. | Nest multiple nested ScrollArea containers directly inside each other unless necessary. |
| Keep padding symmetrical inside scrollable containers.                          | Lock full-page primary articles inside tiny scrollable boxes.                           |

## Slots & Pairing

Pairs ScrollArea with optional horizontal or vertical ScrollBar tracks.
