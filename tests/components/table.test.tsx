import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

describe("Table Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Table>
        <TableCaption>Edge Nodes Status</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Node</TableHead>
            <TableHead numeric>Latency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>us-east-1</TableCell>
            <TableCell numeric>14.2ms</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("applies tabular numerals class when numeric prop is specified", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell numeric data-testid="latency-cell">
              24.5ms
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const cell = screen.getByTestId("latency-cell");
    expect(cell).toHaveClass("tabular-nums");
  });
});
