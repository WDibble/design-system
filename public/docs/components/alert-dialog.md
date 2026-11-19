# AlertDialog

> High-friction confirmation modal requiring explicit user acknowledgement.

- **Category**: Overlays & Surfaces
- **Import**: `import { AlertDialog, AlertDialogAction, AlertDialogBackdrop, AlertDialogCancel } from "@/components/ui/alert-dialog";`
- **Source**: `src/components/ui/alert-dialog.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Forces explicit user acknowledgement via high-friction modal focus trapping that blocks accidental backdrop dismissal.

## When to Use

- Irreversible destructive operations such as deleting repositories, revoking production API keys, or discarding unsaved work.
- High-consequence billing or security actions requiring explicit Cancel vs Confirm choice.

## When Not to Use (Use Instead)

| Alternative         | Reason                                                                                    |
| :------------------ | :---------------------------------------------------------------------------------------- |
| [dialog](dialog.md) | Use Dialog for general forms or inspectable modals where outside-click dismissal is safe. |
| [toast](toast.md)   | Use Toast with an undo button for recoverable actions.                                    |

## Anatomy

```tsx
<AlertDialog>
  <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>
    Revoke Key
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Revoke key?</AlertDialogTitle>
      <AlertDialogDescription>Traffic using this token stops immediately.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Revoke Key</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Verified Example

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "destructive", size: "sm" })}>
        Revoke Deployment Token
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke production token?</AlertDialogTitle>
          <AlertDialogDescription>
            Requests authenticating with this credential fail immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Revoke Token</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Props Reference

Inherits standard React HTML or Base UI primitive attributes with zero required custom props.

## Accessibility Contract

- Exposes role="alertdialog" with mandatory AlertDialogTitle and AlertDialogDescription.
- Traps focus inside Content and dismisses on Escape via AlertDialogCancel.

## Do and Don't

| Do                                                                                           | Don't                                                              |
| :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| Style AlertDialogTrigger directly with buttonVariants() instead of nesting a Button element. | Use AlertDialog for passive tips or non-destructive announcements. |
| Name AlertDialogAction specifically (e.g. Revoke Key) rather than vague OK labels.           | Omit AlertDialogCancel inside the footer action pair.              |

## Slots & Pairing

Pairs AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, and AlertDialogAction.
