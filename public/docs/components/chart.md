# Chart

> Zero-dependency OKLCH vector sparklines, area visualisations, and bar charts.

- **Category**: Data & Feedback
- **Import**: `import { AreaChart, BarChart, Sparkline } from "@/components/ui/chart";`
- **Source**: `src/components/ui/chart.tsx`
- **Dependencies**: `motion`, `react`

## Defining Constraint

Renders zero-dependency perceptual OKLCH SVG Sparklines, AreaCharts, and BarCharts scaled crisply with tabular metric axes.

## When to Use

- Latency sparklines, throughput trendlines, contrast bounds, and daily activity bars.
- Telemetry panels needing lightweight OKLCH SVGs without external chart library overhead.

## When Not to Use (Use Instead)

| Alternative                       | Reason                                                                        |
| :-------------------------------- | :---------------------------------------------------------------------------- |
| [table](table.md)                 | Use Table when readers must look up and sort exact raw rows.                  |
| [diagram-frame](diagram-frame.md) | Use DiagramFrame for architecture flowcharts rather than quantitative charts. |

## Anatomy

```tsx
<AreaChart data={series} height={120} valueFormatter={(v) => `${v} ms`} />
```

## Verified Example

```tsx
import { AreaChart, Sparkline } from "@/components/ui/chart";

const LATENCY_SERIES = [
  { label: "00:00", value: 24 },
  { label: "06:00", value: 18 },
  { label: "12:00", value: 21 },
  { label: "18:00", value: 14 },
];

export function ChartExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">Edge Latency Trend</span>
        <Sparkline data={[24, 18, 21, 14]} trend="up" />
      </div>
      <AreaChart data={LATENCY_SERIES} height={110} valueFormatter={(v) => `${v} ms`} />
    </div>
  );
}
```

## Props Reference

| Prop             | Type                                    | Required | Description                         |
| :--------------- | :-------------------------------------- | :------- | :---------------------------------- |
| `data`           | `number[]`                              | Yes      | Configures data on Chart.           |
| `className`      | `string`                                | No       | Configures className on Chart.      |
| `color`          | `string`                                | No       | Configures color on Chart.          |
| `fill`           | `boolean`                               | No       | Configures fill on Chart.           |
| `height`         | `number`                                | No       | Configures height on Chart.         |
| `primaryColor`   | `string`                                | No       | Configures primaryColor on Chart.   |
| `secondaryColor` | `string`                                | No       | Configures secondaryColor on Chart. |
| `showGrid`       | `boolean`                               | No       | Configures showGrid on Chart.       |
| `strokeWidth`    | `number`                                | No       | Configures strokeWidth on Chart.    |
| `trend`          | `"up" \| "down" \| "neutral" \| "auto"` | No       | Configures trend on Chart.          |
| `valueFormatter` | `(val: number) => string`               | No       | Configures valueFormatter on Chart. |
| `width`          | `number`                                | No       | Configures width on Chart.          |

## Accessibility Contract

- Attach descriptive aria-label and readable axis valueFormatter units on charts.
- Do not convey trend meaning solely by colour; combine trend arrows, labels, or formatted tooltips.

## Do and Don't

| Do                                                                              | Don't                                                                                    |
| :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| Supply consistent numeric valueFormatter units across tooltips and axis labels. | Import heavy external charting packages when Sparkline, AreaChart, or BarChart suffices. |
| Keep data label strings concise so horizontal bars and ticks stay legible.      | Omit height bounds on containers holding SVG charts.                                     |

## Slots & Pairing

Exports Sparkline, AreaChart, and BarChart styled via semantic OKLCH CSS variables.
