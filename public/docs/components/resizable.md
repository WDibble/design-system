# Resizable

> Keyboard and drag split-pane layout controller for workbench interfaces.

- **Category**: Data & Feedback
- **Import**: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";`
- **Source**: `src/components/ui/resizable.tsx`
- **Dependencies**: `react`

## Defining Constraint

Coordinates keyboard-adjustable (Arrow keys) and pointer-draggable split panes with percentage persistence inside zero-scroll layout boundaries.

## When to Use

- Side-by-side code and preview editors, log inspectors, and configurable split studios.
- Desktop engineering workbenches where users adjust panel proportions interactively.

## When Not to Use (Use Instead)

| Alternative                 | Reason                                                                    |
| :-------------------------- | :------------------------------------------------------------------------ |
| [doc-layout](doc-layout.md) | Use DocLayout for structured fixed-measure reading documentation columns. |

## Anatomy

```tsx
<ResizablePanelGroup direction="horizontal" defaultSizes={[45, 55]}>
  <ResizablePanel order={0} defaultSize={45}>
    Controls
  </ResizablePanel>
  <ResizableHandle handleIndex={0} withHandle />
  <ResizablePanel order={1} defaultSize={55}>
    Stage
  </ResizablePanel>
</ResizablePanelGroup>
```

## Verified Example

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export function ResizableExample() {
  return (
    <div className="h-28 w-full max-w-md overflow-hidden rounded-xl border border-border/70">
      <ResizablePanelGroup direction="horizontal" defaultSizes={[45, 55]}>
        <ResizablePanel order={0} defaultSize={45}>
          <div className="flex h-full items-center justify-center bg-muted/40 p-3 text-xs text-muted-foreground">
            Inspector
          </div>
        </ResizablePanel>
        <ResizableHandle handleIndex={0} withHandle />
        <ResizablePanel order={1} defaultSize={55}>
          <div className="flex h-full items-center justify-center bg-card p-3 text-xs text-foreground">
            Canvas Stage
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## Props Reference

| Prop           | Type                         | Required | Description                           |
| :------------- | :--------------------------- | :------- | :------------------------------------ |
| `defaultSize`  | `number`                     | No       | Configures defaultSize on Resizable.  |
| `defaultSizes` | `number[]`                   | No       | Configures defaultSizes on Resizable. |
| `direction`    | `"horizontal" \| "vertical"` | No       | Configures direction on Resizable.    |
| `handleIndex`  | `number`                     | No       | Configures handleIndex on Resizable.  |
| `minSize`      | `number`                     | No       | Configures minSize on Resizable.      |
| `onLayout`     | `(sizes: number[]) => void`  | No       | Configures onLayout on Resizable.     |
| `order`        | `number`                     | No       | Configures order on Resizable.        |
| `withHandle`   | `boolean`                    | No       | Configures withHandle on Resizable.   |

## Accessibility Contract

- ResizableHandle renders role="separator" supporting focusable keyboard Arrow resizing.
- Always pair sequential order indices with matching handleIndex values.

## Do and Don't

| Do                                                                                 | Don't                                                                          |
| :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| Include withHandle prop on primary workspace dividers for clear visual affordance. | Set defaultSizes arrays that do not sum to 100 across sibling ResizablePanels. |
| Constrict minimum panel bounds cleanly to prevent crushed text below 30% width.    | Force horizontal split panes below sm viewports without responsive stacking.   |

## Slots & Pairing

Composes ResizablePanelGroup, ResizablePanel, and ResizableHandle.
