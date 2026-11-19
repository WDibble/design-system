# NumberTicker

> Tabular numeral spring counter preventing horizontal digit jitter.

- **Category**: Data & Feedback
- **Import**: `import { NumberTicker } from "@/components/ui/number-ticker";`
- **Source**: `src/components/ui/number-ticker.tsx`
- **Dependencies**: `motion`, `react`

## Defining Constraint

Interpolates numeric changes via calibrated spring deceleration while enforcing font-variant-numeric: tabular-nums so column digits never vibrate.

## When to Use

- Live KPI telemetry counters, build pass totals, contrast score indicators, and odometer readouts.
- Tabular metric cards or Stepper value displays requiring smooth spring transitions.

## When Not to Use (Use Instead)

| Alternative             | Reason                                                                  |
| :---------------------- | :---------------------------------------------------------------------- |
| [stepper](stepper.md)   | Use Stepper when users actively increment or decrement a numeric input. |
| [progress](progress.md) | Use Progress when visualising completion towards a 100% bound.          |

## Anatomy

```tsx
<NumberTicker value={99.4} decimalPlaces={1} suffix="%" />
```

## Verified Example

```tsx
import { NumberTicker } from "@/components/ui/number-ticker";

export function NumberTickerExample() {
  return (
    <div className="flex items-baseline gap-2 text-2xl font-bold text-foreground tabular-nums">
      <NumberTicker value={100.0} decimalPlaces={1} suffix="%" />
      <span className="text-xs font-medium text-muted-foreground">Quality Score</span>
    </div>
  );
}
```

## Props Reference

| Prop            | Type     | Required | Description                               |
| :-------------- | :------- | :------- | :---------------------------------------- |
| `value`         | `number` | Yes      | Configures value on NumberTicker.         |
| `decimalPlaces` | `number` | No       | Configures decimalPlaces on NumberTicker. |
| `prefix`        | `string` | No       | Configures prefix on NumberTicker.        |
| `suffix`        | `string` | No       | Configures suffix on NumberTicker.        |

## Accessibility Contract

- Ensure the surrounding context or label states what metric the animated number measures.
- Respects prefers-reduced-motion automatically via CSS/Motion reduced motion rules.

## Do and Don't

| Do                                                                                                      | Don't                                                                   |
| :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------- |
| Pass consistent decimalPlaces matching the unit precision of the metric.                                | Drop tabular-nums around rolling counters placed beside action buttons. |
| Pair synthetic demo counters strictly inside component tests or explicitly labelled workbench previews. | Fabricate unverified production marketing stats on landing pages.       |

## Slots & Pairing

Combines with Table cells (numeric={true}), Card telemetry headers, and Stepper.
