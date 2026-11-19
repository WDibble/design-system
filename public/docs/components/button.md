# Button

> Tactile action primitive with 9 visual variants, pointerdown yield, and async promise lifecycle.

- **Category**: Actions & Toggles
- **Import**: `import { Button, buttonVariants } from "@/components/ui/button";`
- **Source**: `src/components/ui/button.tsx`
- **Dependencies**: `class-variance-authority`, `motion`, `react`
- **Variants**: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`, `success`, `warning`, `glass`
- **Sizes**: `xs`, `sm`, `default`, `lg`, `xl`, `icon-xs`, `icon-sm`, `icon`, `icon-lg`

## Defining Constraint

Locks horizontal button footprint with an invisible ghost sizer across idle, loading, success, and error states while compressing immediately on pointerdown.

## When to Use

- Triggering immediate actions, form submissions, or asynchronous mutations with Promise lifecycle feedback.
- Presenting primary, secondary, destructive, outline, ghost, or warning actions with proportional icon affinity.

## When Not to Use (Use Instead)

| Alternative                               | Reason                                                                       |
| :---------------------------------------- | :--------------------------------------------------------------------------- |
| [toggle](toggle.md)                       | Use Toggle for persistent two-state pressed controls.                        |
| [copy-button](copy-button.md)             | Use CopyButton for one-click clipboard copy with morphing checkmark timing.  |
| [segmented-control](segmented-control.md) | Use SegmentedControl when switching between 2 to 5 mutually exclusive views. |

## Anatomy

```tsx
<Button variant="default" size="default" leftIcon={<SparklesIcon size={16} />}>
  Publish
</Button>
```

## Verified Example

```tsx
import { ShieldCheckIcon, SparklesIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function ButtonExample() {
  const handleAsyncAction = () => new Promise<void>((resolve) => setTimeout(resolve, 400));

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="default"
        loadingText="Deploying..."
        successText="Deployed"
        leftIcon={<SparklesIcon size={16} />}
        onClick={handleAsyncAction}
      >
        Deploy Release
      </Button>
      <Button variant="outline" leftIcon={<ShieldCheckIcon size={16} />}>
        Inspect Diff
      </Button>
      <Button variant="success">Verified</Button>
    </div>
  );
}
```

## Props Reference

| Prop              | Type                                                  | Required | Description                                                                                                                                                                                                                      |
| :---------------- | :---------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`        | `React.ReactNode`                                     | No       | Configures children on Button.                                                                                                                                                                                                   |
| `disableTapScale` | `boolean`                                             | No       | When true, disables the tactile scale down on tap. By default, buttons used as popup or menu triggers automatically suppress tap scaling to guarantee the anchored surface has a zero-jitter, non-moving reference bounding box. |
| `errorDuration`   | `number`                                              | No       | Configures errorDuration on Button.                                                                                                                                                                                              |
| `errorText`       | `string`                                              | No       | Configures errorText on Button.                                                                                                                                                                                                  |
| `fluidMorph`      | `boolean`                                             | No       | Configures fluidMorph on Button.                                                                                                                                                                                                 |
| `fullWidth`       | `boolean`                                             | No       | Responsive helper to stretch the button to 100% width of its parent container.                                                                                                                                                   |
| `iconTrigger`     | `IconAnimationTrigger`                                | No       | Configures iconTrigger on Button.                                                                                                                                                                                                |
| `isLoading`       | `boolean`                                             | No       | Configures isLoading on Button.                                                                                                                                                                                                  |
| `leftIcon`        | `React.ReactNode`                                     | No       | Configures leftIcon on Button.                                                                                                                                                                                                   |
| `loadingText`     | `string`                                              | No       | Configures loadingText on Button.                                                                                                                                                                                                |
| `onClick`         | `(e: React.MouseEvent<HTMLButtonElement>) => unknown` | No       | Standard click handler. If an async function or Promise is returned, the button automatically drives the 9-state kinetic feedback loop (Idle -> Loading -> Success -> Idle).                                                     |
| `rightIcon`       | `React.ReactNode`                                     | No       | Configures rightIcon on Button.                                                                                                                                                                                                  |
| `state`           | `ButtonState`                                         | No       | Configures state on Button.                                                                                                                                                                                                      |
| `successDuration` | `number`                                              | No       | Configures successDuration on Button.                                                                                                                                                                                            |
| `successText`     | `string`                                              | No       | Configures successText on Button.                                                                                                                                                                                                |

## Accessibility Contract

- Icon-only sizes (icon, icon-xs, icon-sm, icon-lg) must declare an explicit aria-label.
- Async loading locks aria-busy without dropping opacity so focus contrast remains intact.

## Do and Don't

| Do                                                                            | Don't                                                                                        |
| :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Pass numeric size props on nested icons matching 40% to 50% of button height. | Merge size-full or p-0 after Button variant props inside className.                          |
| Return a Promise from onClick to drive automatic loading and success states.  | Place a Button inside a Base UI Trigger such as DialogTrigger, which renders its own button. |

## Slots & Pairing

Supports leftIcon and rightIcon slots with synchronous group hover animation. Pair buttonVariants() directly onto custom links or overlay triggers.
