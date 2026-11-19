# Drawer

> Swipeable edge drawer with tactile drag handle for compact viewports.

- **Category**: Overlays & Surfaces
- **Import**: `import { Drawer, DrawerBackdrop, DrawerClose, DrawerContent } from "@/components/ui/drawer";`
- **Source**: `src/components/ui/drawer.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Provides a swipeable edge drawer with tactile drag handle chrome tailored to thumb-reach compact viewports.

## When to Use

- Mobile action sheets, compact filters, or contextual forms originating from the bottom viewport edge.
- Touch-first pickers where drag-down gesture dismissal feels natural.

## When Not to Use (Use Instead)

| Alternative         | Reason                                                            |
| :------------------ | :---------------------------------------------------------------- |
| [sheet](sheet.md)   | Use Sheet for persistent left or right desktop slide-over panels. |
| [dialog](dialog.md) | Use Dialog for centred desktop modal tasks.                       |

## Anatomy

```tsx
<Drawer>
  <DrawerTrigger className={buttonVariants({ variant: "outline" })}>Open Drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHandle />
    <DrawerHeader>
      <DrawerTitle>Filter Results</DrawerTitle>
      <DrawerDescription>Narrow dataset by severity.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

## Verified Example

```tsx
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Open Filter Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHandle />
        <DrawerHeader>
          <DrawerTitle>Filter Component Matrix</DrawerTitle>
          <DrawerDescription>Narrow catalogue entries by category.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className={buttonVariants({ variant: "outline", size: "sm" })}>
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

## Props Reference

| Prop                  | Type      | Required | Description                               |
| :-------------------- | :-------- | :------- | :---------------------------------------- |
| `hideHandle`          | `boolean` | No       | Configures hideHandle on Drawer.          |
| `preventCloseOnClick` | `boolean` | No       | Configures preventCloseOnClick on Drawer. |

## Accessibility Contract

- Traps focus while open and requires DrawerTitle and DrawerDescription.
- Dismisses cleanly on Escape key as well as swipe drag gestures.

## Do and Don't

| Do                                                                                      | Don't                                                                   |
| :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| Include DrawerHandle inside DrawerContent to signal swipe dismissal affordance.         | Nest a Button directly inside DrawerTrigger.                            |
| Keep primary dismissal actions reachable via DrawerClose buttons for non-pointer users. | Hide critical confirmation state off-screen without scroll containment. |

## Slots & Pairing

Includes DrawerHandle, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, and DrawerClose.
