# DropdownMenu

> Anchored menu surface with keyboard navigation, checkboxes, and shortcuts.

- **Category**: Overlays & Surfaces
- **Import**: `import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup } from "@/components/ui/dropdown-menu";`
- **Source**: `src/components/ui/dropdown-menu.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Preserves zero-jitter anchor alignment by keeping trigger buttons unscaled while presenting liquid glass action, checkbox, and radio menus.

## When to Use

- Compact overflow "More" menus, row action buttons, or profile menu actions.
- Hierarchical action lists supporting toggleable checkboxes and radio view modes.

## When Not to Use (Use Instead)

| Alternative           | Reason                                                                    |
| :-------------------- | :------------------------------------------------------------------------ |
| [select](select.md)   | Use Select when picking a value stored in form state.                     |
| [popover](popover.md) | Use Popover when rendering interactive inputs, sliders, or custom panels. |

## Anatomy

```tsx
<DropdownMenu>
  <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>
    Actions
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Workspace</DropdownMenuLabel>
    <DropdownMenuItem>Export JSON</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Verified Example

```tsx
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Release Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Distribution</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Rebuild Docs Manifest</DropdownMenuItem>
        <DropdownMenuItem>Verify Invariants</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Props Reference

| Prop                    | Type                                                      | Required | Description                                       |
| :---------------------- | :-------------------------------------------------------- | :------- | :------------------------------------------------ |
| `align`                 | `MenuPrimitive.Positioner.Props["align"]`                 | No       | Configures align on DropdownMenu.                 |
| `alignOffset`           | `MenuPrimitive.Positioner.Props["alignOffset"]`           | No       | Configures alignOffset on DropdownMenu.           |
| `anchor`                | `MenuPrimitive.Positioner.Props["anchor"]`                | No       | Configures anchor on DropdownMenu.                |
| `collisionAvoidance`    | `MenuPrimitive.Positioner.Props["collisionAvoidance"]`    | No       | Configures collisionAvoidance on DropdownMenu.    |
| `disableAnchorTracking` | `MenuPrimitive.Positioner.Props["disableAnchorTracking"]` | No       | Configures disableAnchorTracking on DropdownMenu. |
| `inset`                 | `boolean`                                                 | No       | Configures inset on DropdownMenu.                 |
| `portalProps`           | `MenuPrimitive.Portal.Props`                              | No       | Configures portalProps on DropdownMenu.           |
| `side`                  | `MenuPrimitive.Positioner.Props["side"]`                  | No       | Configures side on DropdownMenu.                  |
| `sideOffset`            | `MenuPrimitive.Positioner.Props["sideOffset"]`            | No       | Configures sideOffset on DropdownMenu.            |
| `variant`               | `"default" \| "destructive"`                              | No       | Configures variant on DropdownMenu.               |

## Accessibility Contract

- Manages aria-haspopup="menu", arrow-key menu traversal, and Escape closing.
- Icon-only trigger buttons must carry an explicit aria-label.

## Do and Don't

| Do                                                                                                      | Don't                                                                 |
| :------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| Disable tap scaling on DropdownMenu triggers or use DropdownMenuTrigger directly with buttonVariants(). | Put text inputs or multi-field forms inside DropdownMenuContent.      |
| Group checkboxes and radio choices using DropdownMenuCheckboxItem and DropdownMenuRadioGroup.           | Abuse DropdownMenu as a substitute for Select inside validated forms. |

## Slots & Pairing

Supports DropdownMenuGroup, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, and DropdownMenuShortcut.
