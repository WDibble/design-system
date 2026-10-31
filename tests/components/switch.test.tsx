import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "@/components/ui/switch";

describe("Switch Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <label>
        <Switch aria-label="Notifications" />
        <span>Enable notifications</span>
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles toggling on user click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(<Switch aria-label="Airplane mode" onCheckedChange={onCheckedChange} />);

    const switchControl = screen.getByRole("switch", { name: "Airplane mode" });
    expect(switchControl).not.toBeChecked();

    await user.click(switchControl);
    expect(onCheckedChange).toHaveBeenCalled();
  });
});
