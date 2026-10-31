import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <label>
        <Checkbox />
        <span>Accept terms and conditions</span>
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("toggles checked state and triggers callback", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Checkbox aria-label="Subscribe to updates" onCheckedChange={onCheckedChange} />);

    const checkbox = screen.getByRole("checkbox", { name: "Subscribe to updates" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalled();
  });
});
