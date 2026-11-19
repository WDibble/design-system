# MarkdownToolbar

> Rich Markdown formatting toolbar with 20 actions and list/table generators.

- **Category**: Actions & Toggles
- **Import**: `import { ActionButton, MarkdownToolbar, applyTextMutation, stripStructuralPrefix } from "@/components/ui/markdown-toolbar";`
- **Source**: `src/components/ui/markdown-toolbar/index.ts`
- **Dependencies**: `lucide-react`, `react`

## Defining Constraint

Coordinates rich Markdown insertion, line-prefix toggling, and table scaffolding while sanitising heading levels against existing line structures.

## When to Use

- Paired above a Markdown Textarea for technical notes, issue composers, or changelog editors.
- When writers need keyboard-accessible heading, list, quote, link, and table formatting actions.

## When Not to Use (Use Instead)

| Alternative                     | Reason                                                                       |
| :------------------------------ | :--------------------------------------------------------------------------- |
| [toolbar](toolbar.md)           | Use generic Toolbar for non-Markdown canvas tools or custom app button rows. |
| [toggle-group](toggle-group.md) | Use ToggleGroup for a small set of inline formatting flags.                  |

## Anatomy

```tsx
<MarkdownToolbar
  textareaRef={textareaRef}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  aria-label="Markdown formatting"
/>
```

## Verified Example

```tsx
import * as React from "react";
import { MarkdownToolbar } from "@/components/ui/markdown-toolbar";
import { Textarea } from "@/components/ui/textarea";

export function MarkdownToolbarExample() {
  const [markdown, setMarkdown] = React.useState(
    "## Release Summary\n\nAll 57 primitives pass WCAG 2.2 AA and APCA gates."
  );
  const editorRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <MarkdownToolbar textareaRef={editorRef} aria-label="Release notes formatting toolbar" />
      <Textarea
        ref={editorRef}
        rows={3}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        aria-label="Release notes Markdown editor"
      />
    </div>
  );
}
```

## Props Reference

| Prop               | Type                                             | Required | Description                                                   |
| :----------------- | :----------------------------------------------- | :------- | :------------------------------------------------------------ |
| `hideHistory`      | `boolean`                                        | No       | Allows consumers to hide specific action clusters.            |
| `hideInserts`      | `boolean`                                        | No       | Configures hideInserts on MarkdownToolbar.                    |
| `hideViewMode`     | `boolean`                                        | No       | Configures hideViewMode on MarkdownToolbar.                   |
| `onAction`         | `(actionName: string) => void`                   | No       | Callback fired whenever any markdown action is executed.      |
| `onViewModeChange` | `(mode: "edit" \| "split" \| "preview") => void` | No       | Callback fired when view mode changes.                        |
| `textareaRef`      | `React.RefObject<HTMLTextAreaElement \| null>`   | No       | Reference to the controlled or uncontrolled textarea element. |
| `viewMode`         | `"edit" \| "split" \| "preview"`                 | No       | Current active view mode when paired with a preview panel.    |

## Accessibility Contract

- Exposes role="toolbar" with arrow-key roving focus across formatting controls.
- Requires a descriptive aria-label distinguishing multiple editors on one screen.

## Do and Don't

| Do                                                                                                    | Don't                                                                            |
| :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| Pass textareaRef bound to the controlled Textarea so cursor selection and undo history work natively. | Omit viewMode and onViewModeChange if exposing split Preview/Write mode buttons. |
| Keep Markdown preview panes beside the textarea on desktop viewports.                                 | Hide primary save actions inside the formatting toolbar itself.                  |

## Slots & Pairing

Pairs directly above Textarea or inside Resizable split panes alongside Markdown preview panels.
