# Toast

> Non-blocking feedback toast with timed auto-dismiss and undo trigger.

- **Category**: Overlays & Surfaces
- **Import**: `import { ToastProvider, useToast } from "@/components/ui/toast";`
- **Source**: `src/components/ui/toast.tsx`
- **Dependencies**: `lucide-react`, `motion`, `react`

## Defining Constraint

Delivers non-blocking status feedback anchored outside flow layout with an optional 5-second reversible undo trigger via ToastProvider and useToast.

## When to Use

- Confirming background saves, exports, copies, or reversible item removals.
- Surfacing asynchronous deployment completion without interrupting active typing.

## When Not to Use (Use Instead)

| Alternative                     | Reason                                                                                     |
| :------------------------------ | :----------------------------------------------------------------------------------------- |
| [alert-dialog](alert-dialog.md) | Use AlertDialog before irreversible actions rather than apologising in a Toast afterwards. |
| [callout](callout.md)           | Use Callout for persistent inline page guidance or validation rules.                       |

## Anatomy

```tsx
<ToastProvider>
  <ConsumerUsingUseToast />
</ToastProvider>
```

## Verified Example

```tsx
import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";

function ToastDemoTrigger() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast({
          title: "Snapshot Exported",
          description: "Token manifest synchronised across edge targets.",
          type: "success",
        })
      }
    >
      Trigger Notification
    </Button>
  );
}

export function ToastExample() {
  return (
    <ToastProvider>
      <ToastDemoTrigger />
    </ToastProvider>
  );
}
```

## Props Reference

Inherits standard React HTML or Base UI primitive attributes with zero required custom props.

## Accessibility Contract

- Announces status updates politely via live region semantics without stealing keyboard focus.
- Close buttons expose explicit aria-label and undo triggers remain keyboard reachable.

## Do and Don't

| Do                                                                      | Don't                                                                                        |
| :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Mount ToastProvider once near your app root before calling useToast().  | Put blocking multi-line instructions or required form errors exclusively in fleeting Toasts. |
| Keep toast titles concise (2 to 5 words) with concrete action outcomes. | Fire duplicate Toasts on every keystroke.                                                    |

## Slots & Pairing

Consumed via `const { toast } = useToast()` inside any component wrapped by `<ToastProvider>`.
