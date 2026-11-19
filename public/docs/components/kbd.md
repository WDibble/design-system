# Kbd

> Tactile keycap micro-primitive styled with tabular monospace proportions.

- **Category**: Data & Feedback
- **Import**: `import { Kbd } from "@/components/ui/kbd";`
- **Source**: `src/components/ui/kbd.tsx`
- **Dependencies**: `react`

## Defining Constraint

Styles tactile hardware keycap hints with uniform baseline height and tabular monospace glyph spacing.

## When to Use

- Documenting global keyboard shortcuts (`⌘K`, `⌘D`, `Escape`) inside buttons, menus, and docs.
- Communicating hotkeys alongside CommandPalette or NavigationBar triggers.

## When Not to Use (Use Instead)

| Alternative         | Reason                                                                      |
| :------------------ | :-------------------------------------------------------------------------- |
| [badge](badge.md)   | Use Badge for runtime status pills such as Active or v2.0.                  |
| [button](button.md) | Use Button for clickable actions; Kbd is strictly non-interactive notation. |

## Anatomy

```tsx
<div className="inline-flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <Kbd>D</Kbd>
</div>
```

## Verified Example

```tsx
import { Kbd } from "@/components/ui/kbd";

export function KbdExample() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        Command Palette <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
      <span className="inline-flex items-center gap-1">
        Documentation <Kbd>⌘</Kbd>
        <Kbd>D</Kbd>
      </span>
    </div>
  );
}
```

## Props Reference

| Prop      | Type                                | Required | Description                |
| :-------- | :---------------------------------- | :------- | :------------------------- |
| `size`    | `"xs" \| "sm" \| "default" \| "lg"` | No       | Configures size on Kbd.    |
| `variant` | `"default" \| "inverted"`           | No       | Configures variant on Kbd. |

## Accessibility Contract

- Renders semantic HTML <kbd> element for assistive tech shortcut discovery.
- Do not attach click handlers directly to bare Kbd spans.

## Do and Don't

| Do                                                                                         | Don't                                                        |
| :----------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| Place modifier and character keys in individual adjacent Kbd elements for clean alignment. | Mix operational status labels into Kbd pills.                |
| Verify documented keyboard shortcuts actually work in App key listeners.                   | Invent conflicting global shortcut bindings across features. |

## Slots & Pairing

Embeds cleanly inside CommandShortcut, Button hints, and DocArticle tables.
