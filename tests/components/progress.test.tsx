import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Progress, CircularProgress } from "@/components/ui/progress";

describe("Progress Primitives Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants on linear progress", async () => {
    const { container } = render(<Progress value={65} aria-label="Upload progress" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("satisfies WCAG 2.2 accessibility invariants on circular progress", async () => {
    const { container } = render(<CircularProgress value={80} aria-label="Sync progress" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders with correct ARIA progressbar role and value", () => {
    render(<Progress value={45} aria-label="Processing" />);
    const bar = screen.getByRole("progressbar", { name: "Processing" });
    expect(bar).toHaveAttribute("aria-valuenow", "45");
  });
});
