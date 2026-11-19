# Dialog

> Focus-trapped modal dialogue with liquid backdrop blur and Escape dismissal.

- **Category**: Overlays & Surfaces
- **Import**: `import { Dialog, DialogBackdrop, DialogClose, DialogContent } from "@/components/ui/dialog";`
- **Source**: `src/components/ui/dialog.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Renders a focus-trapped liquid backdrop modal dialogue with Apple spring scaling and reliable Escape/backdrop dismissal.

## When to Use

- Focused secondary forms, inspector modals, or expanded media/diagram inspection.
- Multi-field edits needing temporary focus isolation without navigating away from context.

## When Not to Use (Use Instead)

| Alternative                     | Reason                                                                                     |
| :------------------------------ | :----------------------------------------------------------------------------------------- |
| [alert-dialog](alert-dialog.md) | Use AlertDialog when outside-click dismissal must be blocked for destructive confirmation. |
| [sheet](sheet.md)               | Use Sheet for wide filter panels, settings drawers, or side-by-side detail editors.        |
| [drawer](drawer.md)             | Use Drawer for swipeable compact mobile bottom sheets.                                     |

## Anatomy

```tsx
<Dialog>
  <DialogTrigger className={buttonVariants({ variant: "outline" })}>Edit Spec</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Token Preset</DialogTitle>
      <DialogDescription>Adjust base hue and contrast thresholds.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>Done</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Verified Example

```tsx
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Edit OKLCH Seed
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calibrate Primary Accent</DialogTitle>
          <DialogDescription>
            Adjust OKLCH chroma and lightness while keeping APCA contrast above Lc 60.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className={buttonVariants({ variant: "default", size: "sm" })}>
            Apply Seed
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Props Reference

| Prop              | Type      | Required | Description                           |
| :---------------- | :-------- | :------- | :------------------------------------ |
| `showCloseButton` | `boolean` | No       | Configures showCloseButton on Dialog. |

## Accessibility Contract

- Must contain DialogTitle (linked via aria-labelledby) and DialogDescription inside DialogContent.
- Traps keyboard focus while open and returns focus to DialogTrigger upon close.

## Do and Don't

| Do                                                                                   | Don't                                                            |
| :----------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| Apply buttonVariants() directly to DialogTrigger instead of wrapping another Button. | Render Dialog without a DialogTitle header.                      |
| Reserve Dialog for bounded tasks rather than multi-page workflows.                   | Stack multiple simultaneous Dialog modals on top of one another. |

## Slots & Pairing

Composes Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, and DialogClose.
