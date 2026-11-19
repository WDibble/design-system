# Slider

> Direct-manipulation single and dual-thumb range control with value tooltip.

- **Category**: Forms & Input
- **Import**: `import { Slider } from "@/components/ui/slider";`
- **Source**: `src/components/ui/slider.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Locks track height while gliding single or dual thumbs along direct pointer scrub gestures with tabular numeric value readouts.

## When to Use

- Adjusting continuous numeric coordinates such as OKLCH lightness, chroma, opacity, or min/max price ranges.
- Interactive visual inspection controls where live preview feedback responds immediately.

## When Not to Use (Use Instead)

| Alternative           | Reason                                                                            |
| :-------------------- | :-------------------------------------------------------------------------------- |
| [stepper](stepper.md) | Use Stepper when users increment discrete integer quantities accurately by +1/-1. |
| [input](input.md)     | Use Input when exact typed digits matter more than visual scrub speed.            |

## Anatomy

```tsx
<Slider aria-label="Chroma intensity" value={chroma} onValueChange={setChroma} min={0} max={100} />
```

## Verified Example

```tsx
import * as React from "react";
import { Slider } from "@/components/ui/slider";

export function SliderExample() {
  const [lightness, setLightness] = React.useState(62);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">OKLCH Lightness Target</span>
        <span className="font-mono text-muted-foreground tabular-nums">{lightness}%</span>
      </div>
      <Slider
        aria-label="OKLCH Lightness Target"
        value={lightness}
        onValueChange={(next) => setLightness(Array.isArray(next) ? next[0] : next)}
        min={0}
        max={100}
      />
    </div>
  );
}
```

## Props Reference

| Prop           | Type                 | Required | Description                        |
| :------------- | :------------------- | :------- | :--------------------------------- |
| `defaultValue` | `number \| number[]` | No       | Configures defaultValue on Slider. |
| `label`        | `React.ReactNode`    | No       | Configures label on Slider.        |
| `showTooltip`  | `boolean`            | No       | Configures showTooltip on Slider.  |
| `showValue`    | `boolean`            | No       | Configures showValue on Slider.    |
| `value`        | `number \| number[]` | No       | Configures value on Slider.        |
| `valuePrefix`  | `string`             | No       | Configures valuePrefix on Slider.  |
| `valueSuffix`  | `string`             | No       | Configures valueSuffix on Slider.  |

## Accessibility Contract

- Exposes role="slider" with aria-valuemin, aria-valuemax, and aria-valuenow.
- Keyboard arrow keys increment cleanly by step size; requires aria-label or FieldLabel.

## Do and Don't

| Do                                                                                          | Don't                                                                                 |
| :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| Pair numeric displays alongside Sliders with tabular-nums to prevent jitter while dragging. | Use Slider for massive ranges (0 to 1,000,000) without coarse steps or numeric input. |
| Pass two-element tuple array for dual-thumb range selection.                                | Alter track height across hover or active drag states.                                |

## Slots & Pairing

Pairs naturally with FieldLabel + tabular-nums telemetry readout inside split studios.
