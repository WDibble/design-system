# Progress

> Deterministic linear progress bar and radial gauge with smooth spring interpolation.

- **Category**: Data & Feedback
- **Import**: `import { CircularProgress, Progress } from "@/components/ui/progress";`
- **Source**: `src/components/ui/progress.tsx`
- **Dependencies**: `@base-ui/react`, `motion`, `react`

## Defining Constraint

Translates percentage progress linearly or radially using compositor transforms rather than width reflows across smooth spring updates.

## When to Use

- File uploads, build pipeline stages, and bounded completion indicators (`0` to `100`).
- Compact radial completion indicators using CircularProgress beside status labels.

## When Not to Use (Use Instead)

| Alternative             | Reason                                                                                     |
| :---------------------- | :----------------------------------------------------------------------------------------- |
| [skeleton](skeleton.md) | Use Skeleton when awaiting unknown layout content instead of tracking percentage progress. |
| [slider](slider.md)     | Use Slider for user-controllable value selection.                                          |

## Anatomy

```tsx
<Progress value={72} aria-label="Bundle compilation" />
```

## Verified Example

```tsx
import { CircularProgress, Progress } from "@/components/ui/progress";

export function ProgressExample() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <div className="min-w-0 flex-1">
        <Progress value={84} aria-label="AST documentation compilation progress" />
      </div>
      <CircularProgress value={84} aria-label="Circular compilation completion" />
    </div>
  );
}
```

## Props Reference

| Prop          | Type                        | Required | Description                         |
| :------------ | :-------------------------- | :------- | :---------------------------------- |
| `showValue`   | `boolean`                   | No       | Configures showValue on Progress.   |
| `size`        | `"sm" \| "default" \| "lg"` | No       | Configures size on Progress.        |
| `strokeWidth` | `number`                    | No       | Configures strokeWidth on Progress. |
| `value`       | `number \| null`            | No       | Configures value on Progress.       |

## Accessibility Contract

- Exposes role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax.
- Every Progress and CircularProgress instance must provide aria-label or aria-labelledby.

## Do and Don't

| Do                                                                                        | Don't                                                                          |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| Clamp values cleanly between 0 and max, or pass null/undefined for indeterminate loading. | Render Progress without an accessible label identifying the running operation. |
| Use CircularProgress inside compact telemetry indicators and badges.                      | Spin static icons manually when CircularProgress indeterminate state exists.   |

## Slots & Pairing

Exports linear Progress and CircularProgress side by side with tabular percentage text.
