import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Badge } from "@/components/ui/badge";

describe("Badge Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Badge variant="outline" dot>
        Production Active
      </Badge>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("enforces shrink-0 and whitespace-nowrap invariant", () => {
    render(<Badge data-testid="status-pill">Operational</Badge>);
    const badge = screen.getByTestId("status-pill");
    expect(badge).toHaveClass("shrink-0");
    expect(badge).toHaveClass("whitespace-nowrap");
  });
});
