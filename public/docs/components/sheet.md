# Sheet

> Slide-over side panel supporting top, right, bottom, and left edges.

- **Category**: Overlays & Surfaces
- **Import**: `import { Sheet, SheetBackdrop, SheetClose, SheetContent } from "@/components/ui/sheet";`
- **Source**: `src/components/ui/sheet.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Slides an edge-docked panel (top, right, bottom, or left) over the viewport while trapping focus and keeping liquid backdrop blur coherent.

## When to Use

- Theme Studios, audit inspectors, notification feeds, or responsive mobile navigation drawers.
- Detail views requiring full viewport height alongside scrollable bodies and pinned footers.

## When Not to Use (Use Instead)

| Alternative         | Reason                                                                     |
| :------------------ | :------------------------------------------------------------------------- |
| [dialog](dialog.md) | Use Dialog for compact centred confirmation or creation forms.             |
| [drawer](drawer.md) | Use Drawer specifically for swipe-gestured bottom sheets on touch devices. |

## Anatomy

```tsx
<Sheet>
  <SheetTrigger className={buttonVariants({ variant: "outline" })}>Inspect Logs</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Cluster Telemetry</SheetTitle>
      <SheetDescription>Live event stream across edge regions.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

## Verified Example

```tsx
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetExample() {
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Inspect Telemetry Sheet
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Compiler Audit Stream</SheetTitle>
          <SheetDescription>Recent invariant checks and AST sync results.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose className={buttonVariants({ variant: "outline", size: "sm" })}>
            Dismiss
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Props Reference

| Prop              | Type                                     | Required | Description                          |
| :---------------- | :--------------------------------------- | :------- | :----------------------------------- |
| `showCloseButton` | `boolean`                                | No       | Configures showCloseButton on Sheet. |
| `side`            | `"top" \| "bottom" \| "left" \| "right"` | No       | Configures side on Sheet.            |

## Accessibility Contract

- Requires SheetTitle and SheetDescription inside SheetContent for ARIA dialog compliance.
- Traps focus while open and dismisses cleanly on Escape.

## Do and Don't

| Do                                                                                                     | Don't                                                                      |
| :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Choose side="right" for inspector/detail panels and side="left" for navigation menus.                  | Nest a Button element inside SheetTrigger.                                 |
| Provide scrollable internal overflow on tall SheetContent bodies while pinning actions in SheetFooter. | Omit visible close affordance (`SheetClose`) inside crowded mobile sheets. |

## Slots & Pairing

Combines SheetHeader, SheetTitle, SheetDescription, SheetFooter, and SheetClose.
