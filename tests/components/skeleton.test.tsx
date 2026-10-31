import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Skeleton } from "@/components/ui/skeleton";

describe("Skeleton Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("declares role status and accessible loading label", () => {
    render(<Skeleton data-testid="skeleton-pulse" />);
    const skeleton = screen.getByTestId("skeleton-pulse");
    expect(skeleton).toHaveAttribute("role", "status");
    expect(skeleton).toHaveAttribute("aria-label", "Loading content...");
  });
});
