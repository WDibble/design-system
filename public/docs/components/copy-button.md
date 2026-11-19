# CopyButton

> Clipboard action control with spring state transition feedback.

- **Category**: Actions & Toggles
- **Import**: `import { CopyButton } from "@/components/ui/copy-button";`
- **Source**: `src/components/ui/copy-button.tsx`
- **Dependencies**: `motion`, `react`

## Defining Constraint

Encapsulates clipboard write handling and spring morph transitions between idle copy and temporary confirmation states without shifting adjacent controls.

## When to Use

- Copying CLI commands, API keys, token values, or generated code blocks to the clipboard.
- Inline copy triggers inside tables, headers, and developer toolbars.

## When Not to Use (Use Instead)

| Alternative         | Reason                                            |
| :------------------ | :------------------------------------------------ |
| [button](button.md) | Use Button for general actions or mutations.      |
| [toggle](toggle.md) | Use Toggle for persistent boolean state switches. |

## Anatomy

```tsx
<CopyButton value="npm run check" idleText="Copy" copiedText="Copied" variant="outline" size="sm" />
```

## Verified Example

```tsx
import { CopyButton } from "@/components/ui/copy-button";

export function CopyButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CopyButton
        value="npm run docs:build && npm run check"
        idleText="Copy Command"
        copiedText="Copied"
        variant="outline"
        size="sm"
      />
      <CopyButton
        value="oklch(0.62 0.18 145)"
        variant="pill"
        size="sm"
        aria-label="Copy OKLCH success token"
      />
    </div>
  );
}
```

## Props Reference

| Prop             | Type                                            | Required | Description                                                                  |
| :--------------- | :---------------------------------------------- | :------- | :--------------------------------------------------------------------------- |
| `copied`         | `boolean`                                       | No       | Controlled copied state                                                      |
| `copiedText`     | `React.ReactNode`                               | No       | Label to display when copied (defaults to "Copied!" if idleText is provided) |
| `iconSize`       | `number`                                        | No       | Custom icon size (pixels)                                                    |
| `idleText`       | `React.ReactNode`                               | No       | Label to display when idle (leave empty for icon-only button)                |
| `onCopiedChange` | `(copied: boolean) => void`                     | No       | Callback fired when copied state changes                                     |
| `size`           | `"sm" \| "default" \| "lg" \| "icon"`           | No       | Size variant                                                                 |
| `timeout`        | `number`                                        | No       | Auto-reset timeout in milliseconds (default 1800ms)                          |
| `value`          | `string`                                        | No       | The text string to copy to clipboard                                         |
| `variant`        | `"outline" \| "ghost" \| "secondary" \| "pill"` | No       | Visual variant                                                               |

## Accessibility Contract

- Automatically toggles accessible aria-label between Copy and Copied feedback states.
- Keyboard activatable via Enter or Space with visible focus-visible ring.

## Do and Don't

| Do                                                                               | Don't                                                             |
| :------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| Supply the exact string payload in the value prop even when idleText is omitted. | Hardcode manual checkmark icons inside CopyButton children.       |
| Use size="sm" inside compact headers such as CodeBlock or Input rows.            | Trigger duplicate Toast alerts for routine inline snippet copies. |

## Slots & Pairing

Embeds directly inside CodeBlock headers and Card action rows with configurable timeout reset.
