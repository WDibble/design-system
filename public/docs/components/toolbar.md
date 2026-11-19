# Toolbar

> Compound desktop toolbar housing aligned button groups and separators.

- **Category**: Actions & Toggles
- **Import**: `import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarLink } from "@/components/ui/toolbar";`
- **Source**: `src/components/ui/toolbar.tsx`
- **Dependencies**: `@base-ui/react`, `class-variance-authority`, `react`
- **Variants**: `default`, `floating`, `outline`, `surface`, `ghost`
- **Sizes**: `sm`, `default`, `lg`, `xs`

## Defining Constraint

Unifies multiple button groups, links, and toggle clusters into a single composite ARIA toolbar with single-tab-stop arrow navigation.

## When to Use

- Desktop canvas action rails combining standalone action buttons, separators, and inline toggles.
- Editor headers grouping related formatting and alignment controls.

## When Not to Use (Use Instead)

| Alternative                             | Reason                                                            |
| :-------------------------------------- | :---------------------------------------------------------------- |
| [markdown-toolbar](markdown-toolbar.md) | Use MarkdownToolbar specifically when editing Markdown strings.   |
| [navigation-bar](navigation-bar.md)     | Use NavigationBar for global site route headers and flyout menus. |

## Anatomy

```tsx
<Toolbar aria-label="Canvas actions">
  <ToolbarGroup>
    <ToolbarButton aria-label="Inspect">Inspect</ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarToggleGroup>
    <ToolbarToggleItem value="grid">Grid</ToolbarToggleItem>
  </ToolbarToggleGroup>
</Toolbar>
```

## Verified Example

```tsx
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/components/ui/toolbar";

export function ToolbarExample() {
  return (
    <Toolbar aria-label="Canvas inspector tools" variant="floating">
      <ToolbarGroup>
        <ToolbarButton aria-label="Inspect layer bounds">Inspect</ToolbarButton>
        <ToolbarButton aria-label="Toggle grid snap">Snap</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label="Export token bundle">Export</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}
```

## Props Reference

| Prop       | Type      | Required | Description                     |
| :--------- | :-------- | :------- | :------------------------------ |
| `isActive` | `boolean` | No       | Configures isActive on Toolbar. |

## Accessibility Contract

- Declares role="toolbar" with horizontal or vertical arrow navigation via Base UI.
- Include an explicit aria-label describing the toolbar scope.

## Do and Don't

| Do                                                                         | Don't                                                                            |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| Divide unrelated control clusters using ToolbarSeparator inside Flex rows. | Cram full form inputs inside compact floating toolbars without labels.           |
| Use variant="floating" with glass styling only above active work canvases. | Use raw native button tags inside Toolbar when ToolbarButton keeps focus roving. |

## Slots & Pairing

Houses ToolbarGroup, ToolbarButton, ToolbarLink, ToolbarSeparator, ToolbarToggleGroup, and ToolbarToggleItem.
