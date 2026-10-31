import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 structural accessibility invariants", async () => {
    const { container } = render(<Button variant="default">Save Changes</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("enforces explicit accessible name on icon-only buttons", async () => {
    const { container } = render(
      <Button size="icon-sm" aria-label="Close dialogue">
        <span aria-hidden="true">✕</span>
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.getByRole("button", { name: "Close dialogue" })).toBeInTheDocument();
  });

  it("handles keyboard focus and activation without errors", async () => {
    const user = userEvent.setup();
    render(<Button>Press Me</Button>);

    const button = screen.getByRole("button", { name: "Press Me" });
    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
  });
});
