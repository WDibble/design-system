import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Kbd } from "@/components/ui/kbd";

describe("Kbd Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(<Kbd>⌘K</Kbd>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("enforces tabular numerals and monospace font", () => {
    render(<Kbd data-testid="keycap">⌘P</Kbd>);
    const kbd = screen.getByTestId("keycap");
    expect(kbd).toHaveClass("tabular-nums");
    expect(kbd).toHaveClass("font-mono");
  });
});
