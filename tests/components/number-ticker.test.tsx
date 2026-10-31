import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { NumberTicker } from "@/components/ui/number-ticker";

describe("NumberTicker Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(<NumberTicker value={14820.75} decimalPlaces={2} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("enforces tabular numerals to prevent layout shifts", () => {
    render(<NumberTicker value={42} data-testid="ticker" />);
    const ticker = screen.getByTestId("ticker");
    expect(ticker).toHaveClass("tabular-nums");
  });
});
