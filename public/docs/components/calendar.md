# Calendar

> Interactive month calendar grid with spring transition paging.

- **Category**: Data & Feedback
- **Import**: `import { Calendar, DatePicker } from "@/components/ui/calendar";`
- **Source**: `src/components/ui/calendar.tsx`
- **Dependencies**: `lucide-react`, `motion`, `react`

## Defining Constraint

Renders keyboard-navigable month grids with spring horizontal slide transitions and tabular-nums date cells, pairing directly with DatePicker popovers.

## When to Use

- Scheduling views, release windows, filter date selection, and inline month calendars.
- Forms requiring visual day-of-week awareness via Calendar or DatePicker.

## When Not to Use (Use Instead)

| Alternative       | Reason                                                                                                 |
| :---------------- | :----------------------------------------------------------------------------------------------------- |
| [input](input.md) | Use Input for memorable dates like birth years where typing is faster than stepping backward by month. |

## Anatomy

```tsx
<Calendar selected={selectedDate} onSelect={setSelectedDate} />
```

## Verified Example

```tsx
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

const INITIAL_CALENDAR_DATE = new Date(2026, 9, 31);

export function CalendarExample() {
  const [date, setDate] = React.useState<Date | null>(INITIAL_CALENDAR_DATE);

  return <Calendar selected={date ?? undefined} onSelect={(next) => setDate(next)} />;
}
```

## Props Reference

| Prop            | Type                      | Required | Description                           |
| :-------------- | :------------------------ | :------- | :------------------------------------ |
| `className`     | `string`                  | No       | Configures className on Calendar.     |
| `disabled`      | `boolean`                 | No       | Configures disabled on Calendar.      |
| `disabledDates` | `(date: Date) => boolean` | No       | Configures disabledDates on Calendar. |
| `maxDate`       | `Date`                    | No       | Configures maxDate on Calendar.       |
| `minDate`       | `Date`                    | No       | Configures minDate on Calendar.       |
| `onSelect`      | `(date: Date) => void`    | No       | Configures onSelect on Calendar.      |
| `placeholder`   | `string`                  | No       | Configures placeholder on Calendar.   |
| `selected`      | `Date \| null`            | No       | Configures selected on Calendar.      |

## Accessibility Contract

- Exposes semantic calendar grid markup with full arrow-key date traversal.
- Month previous/next buttons declare explicit accessible aria-label attributes.

## Do and Don't

| Do                                                                            | Don't                                                                                  |
| :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| Use DatePicker when date selection lives compactly inside a multi-field form. | Instantiate fresh new Date() inside React render props; hoist reference dates cleanly. |
| Format tabular date labels consistently inside surrounding tables.            | Remove contrast boundaries on the selected date cell.                                  |

## Slots & Pairing

Exports both inline Calendar and popover-backed DatePicker.
