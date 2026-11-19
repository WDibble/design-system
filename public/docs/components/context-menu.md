# ContextMenu

> Secondary pointer context menu supporting nested groups and radio selections.

- **Category**: Overlays & Surfaces
- **Import**: `import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup } from "@/components/ui/context-menu";`
- **Source**: `src/components/ui/context-menu.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Attaches a secondary pointer contextmenu surface with keyboard arrow traversal, checkboxes, radio groups, and submenu support.

## When to Use

- Desktop canvas nodes, file trees, or table rows needing contextual right-click power actions.
- Compact secondary command lists preserving screen space across dense workbenches.

## When Not to Use (Use Instead)

| Alternative                       | Reason                                                                        |
| :-------------------------------- | :---------------------------------------------------------------------------- |
| [dropdown-menu](dropdown-menu.md) | Use DropdownMenu when actions must also be discoverable via a visible button. |
| [popover](popover.md)             | Use Popover for structured forms or rich non-menu widgets.                    |

## Anatomy

```tsx
<ContextMenu>
  <ContextMenuTrigger>
    <div>Inspectable canvas surface</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy Path</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Duplicate</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Verified Example

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="rounded-xl border border-dashed border-border/80 bg-muted/40 px-6 py-5 text-xs text-muted-foreground">
          Secondary click this canvas surface for context actions
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy Primitive Path</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Run Contrast Audit</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Props Reference

| Prop          | Type      | Required | Description                            |
| :------------ | :-------- | :------- | :------------------------------------- |
| `alignOffset` | `number`  | No       | Configures alignOffset on ContextMenu. |
| `inset`       | `boolean` | No       | Configures inset on ContextMenu.       |
| `sideOffset`  | `number`  | No       | Configures sideOffset on ContextMenu.  |

## Accessibility Contract

- Never place essential-only workflows inside ContextMenu without an accessible visible button alternative.
- Menu items declare role="menuitem" and support Escape dismissal.

## Do and Don't

| Do                                                                                  | Don't                                                                                |
| :---------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| Mirror critical ContextMenu actions inside visible row menus or keyboard shortcuts. | Attach ContextMenu to plain body copy where users expect browser Copy/Inspect tools. |
| Separate destructive menu items with ContextMenuSeparator.                          | Crowd more than two nested submenus inside a context menu.                           |

## Slots & Pairing

Composes ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, and ContextMenuRadioGroup.
