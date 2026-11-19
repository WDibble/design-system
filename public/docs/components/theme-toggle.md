# ThemeToggle

> Instant light/dark switcher suppressing cross-theme transition flashes.

- **Category**: Actions & Toggles
- **Import**: `import { ThemeToggle } from "@/components/ui/theme-toggle";`
- **Source**: `src/components/ui/theme-toggle.tsx`
- **Dependencies**: `react`

## Defining Constraint

Switches document light and dark colour classes while temporarily disabling CSS transitions so sibling surfaces do not smear across themes.

## When to Use

- Top navigation bars, settings headers, or workbench rails offering instant polarity switching.
- Restoring persistent dark or light class selection synchronised across sessions.

## When Not to Use (Use Instead)

| Alternative                               | Reason                                                                          |
| :---------------------------------------- | :------------------------------------------------------------------------------ |
| [switch](switch.md)                       | Use Switch for generic boolean preferences inside forms.                        |
| [segmented-control](segmented-control.md) | Use SegmentedControl when exposing three modes such as Light, Dark, and System. |

## Anatomy

```tsx
<ThemeToggle isDark={isDark} onToggleDark={setIsDark} />
```

## Verified Example

```tsx
import * as React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function ThemeToggleExample() {
  const [previewDark, setPreviewDark] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle isDark={previewDark} onToggleDark={setPreviewDark} />
      <span className="text-xs text-muted-foreground">
        Active polarity: {previewDark ? "Dark" : "Light"}
      </span>
    </div>
  );
}
```

## Props Reference

| Prop           | Type                          | Required | Description                                                                                                                                           |
| :------------- | :---------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isDark`       | `boolean`                     | No       | Controlled dark state. If omitted, ThemeToggle automatically manages state and synchronises with localStorage and document.documentElement.classList. |
| `onToggleDark` | `(nextDark: boolean) => void` | No       | Callback fired when theme changes.                                                                                                                    |
| `showLabel`    | `boolean`                     | No       | Whether to display text label alongside icon.                                                                                                         |

## Accessibility Contract

- Declares explicit descriptive aria-label reflecting the next colour theme action.
- Supports keyboard Space/Enter toggling with clear focus ring visibility.

## Do and Don't

| Do                                                                       | Don't                                                                  |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| Connect onToggleDark to a root theme controller managing the dark class. | Render ThemeToggle without synchronising initial dark class state.     |
| Place in consistent top-right utility chrome alongside command triggers. | Repeat multiple conflicting ThemeToggle instances on the same toolbar. |

## Slots & Pairing

Pairs beside Command triggers inside NavigationBar actions with matching height (size-9).
