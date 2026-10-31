import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Input } from "@/components/ui/input";

describe("Input Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <label>
        Username
        <Input placeholder="Enter username" />
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles user typing and value updates", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" aria-label="Comment input" />);

    const input = screen.getByRole("textbox", { name: "Comment input" });
    await user.type(input, "Design Engineering");
    expect(input).toHaveValue("Design Engineering");
  });

  it("enforces disabled state when requested", () => {
    render(<Input disabled placeholder="Disabled input" aria-label="Disabled" />);
    const input = screen.getByRole("textbox", { name: "Disabled" });
    expect(input).toBeDisabled();
  });
});
