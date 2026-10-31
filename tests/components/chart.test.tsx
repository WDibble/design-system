import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Sparkline, AreaChart, BarChart } from "@/components/ui/chart";

describe("Chart Primitives Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants on Sparkline", async () => {
    const { container } = render(<Sparkline data={[10, 20, 15, 30, 25, 40]} trend="up" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders AreaChart with data points and formatting", () => {
    const data = [
      { label: "00:00", value: 40 },
      { label: "04:00", value: 65 },
      { label: "08:00", value: 90 },
    ];

    render(<AreaChart data={data} height={100} valueFormatter={(v) => `${v} MB/s`} />);

    expect(screen.getByText("00:00")).toBeInTheDocument();
    expect(screen.getByText("08:00")).toBeInTheDocument();
  });

  it("renders BarChart with items", () => {
    const data = [
      { label: "Mon", value: 50 },
      { label: "Tue", value: 80 },
    ];

    render(<BarChart data={data} height={100} />);
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
  });
});
