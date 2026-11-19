# Stepper

> Tactile numeric stepper with hold-to-accelerate progression.

- **Category**: Forms & Input
- **Import**: `import { Stepper, StepperControls, StepperDecrement, StepperIncrement } from "@/components/ui/stepper";`
- **Source**: `src/components/ui/stepper.tsx`
- **Dependencies**: `react`

## Defining Constraint

Combines hold-to-accelerate increment/decrement repeat buttons with a tabular sliding NumberTicker readout so multi-digit transitions never shift layout.

## When to Use

- Adjusting discrete counts such as seat count, retry attempts, or replica counts.
- Spin-button numeric inputs benefiting from hold-to-accelerate progression.

## When Not to Use (Use Instead)

| Alternative         | Reason                                                               |
| :------------------ | :------------------------------------------------------------------- |
| [slider](slider.md) | Use Slider for fast continuous percentage or coordinate tuning.      |
| [input](input.md)   | Use Input when users type arbitrary numbers such as ports or prices. |

## Anatomy

```tsx
<Stepper value={replicas} onValueChange={setReplicas} min={1} max={16}>
  <Stepper.Decrement aria-label="Decrease replicas" />
  <Stepper.Value />
  <Stepper.Increment aria-label="Increase replicas" />
</Stepper>
```

## Verified Example

```tsx
import * as React from "react";
import { Stepper } from "@/components/ui/stepper";

export function StepperExample() {
  const [replicas, setReplicas] = React.useState(4);

  return (
    <Stepper value={replicas} onValueChange={setReplicas} min={1} max={12}>
      <Stepper.Decrement aria-label="Decrease replicas" />
      <Stepper.Value />
      <Stepper.Increment aria-label="Increase replicas" />
    </Stepper>
  );
}
```

## Props Reference

| Prop            | Type                      | Required | Description                           |
| :-------------- | :------------------------ | :------- | :------------------------------------ |
| `value`         | `number`                  | Yes      | Configures value on Stepper.          |
| `children`      | `React.ReactNode`         | No       | Configures children on Stepper.       |
| `decimalPlaces` | `number`                  | No       | Configures decimalPlaces on Stepper.  |
| `disabled`      | `boolean`                 | No       | Configures disabled on Stepper.       |
| `max`           | `number`                  | No       | Configures max on Stepper.            |
| `min`           | `number`                  | No       | Configures min on Stepper.            |
| `onStep`        | `() => void`              | No       | Optional override for stepping action |
| `onValueChange` | `(value: number) => void` | No       | Configures onValueChange on Stepper.  |
| `prefix`        | `string`                  | No       | Configures prefix on Stepper.         |
| `step`          | `number`                  | No       | Configures step on Stepper.           |
| `suffix`        | `string`                  | No       | Configures suffix on Stepper.         |

## Accessibility Contract

- Both Stepper.Decrement and Stepper.Increment must carry explicit aria-label strings.
- Disables boundary buttons automatically when value hits min or max limits.

## Do and Don't

| Do                                                                                 | Don't                                                   |
| :--------------------------------------------------------------------------------- | :------------------------------------------------------ |
| Set realistic min, max, and step bounds matching domain validation.                | Omit aria-label on icon increment/decrement buttons.    |
| Use compound Stepper.Decrement / Stepper.Value / Stepper.Increment sub-components. | Replace Stepper.Value with unaligned non-tabular spans. |

## Slots & Pairing

Supports compound dot notation (`Stepper.Decrement`, `Stepper.Value`, `Stepper.Increment`).
