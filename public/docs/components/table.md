# Table

> Quiet chrome data table with strict tabular numerals.

- **Category**: Data & Feedback
- **Import**: `import { Table, TableBody, TableCaption, TableCell } from "@/components/ui/table";`
- **Source**: `src/components/ui/table.tsx`
- **Dependencies**: `react`

## Defining Constraint

Pairs quiet hairline row dividers and subtle sticky headers with numeric={true} right-aligned tabular-nums cells so dense columns align accurately.

## When to Use

- Comparable multi-column datasets, token ledgers, telemetry metrics, and API audit trails.
- Structured rows combining tabular-nums metrics with aligned status badges.

## When Not to Use (Use Instead)

| Alternative                 | Reason                                                                  |
| :-------------------------- | :---------------------------------------------------------------------- |
| [prop-table](prop-table.md) | Use PropTable when documenting component TypeScript props specifically. |
| [timeline](timeline.md)     | Use Timeline for narrative chronological event streams.                 |

## Anatomy

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Region</TableHead>
      <TableHead numeric>Latency</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>eu-west-2</TableCell>
      <TableCell numeric>14 ms</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Verified Example

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cluster Region</TableHead>
          <TableHead numeric>P95 Latency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>eu-west-2 (London)</TableCell>
          <TableCell numeric>14 ms</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>us-east-1 (Virginia)</TableCell>
          <TableCell numeric>19 ms</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Props Reference

Inherits standard React HTML or Base UI primitive attributes with zero required custom props.

## Accessibility Contract

- Uses native <table>, <th scope="col">, and optional <TableCaption> landmarks.
- Outer wrapper declares overflow-x-auto for responsive horizontal safety without crushing columns.

## Do and Don't

| Do                                                                                             | Don't                                                                      |
| :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Pass numeric prop on both TableHead and matching TableCell columns holding numbers or metrics. | Mix variable-width proportional numbers inside numeric comparison columns. |
| Keep Badge clusters shrink-0 inside table status cells.                                        | Replace clean tables with cluttered 3-column card grids.                   |

## Slots & Pairing

Composes Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, and TableCaption.
