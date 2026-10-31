import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Calendar, DatePicker } from "@/components/ui/calendar";

describe("Calendar and DatePicker Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(<Calendar selected={new Date(2026, 9, 31)} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles date selection callback on day click", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<Calendar selected={new Date(2026, 9, 15)} onSelect={onSelect} />);

    const dayButton = screen.getByRole("button", { name: /Oct 15 2026/i });
    await user.click(dayButton);
    expect(onSelect).toHaveBeenCalled();
  });

  it("satisfies accessibility on DatePicker trigger", async () => {
    const { container } = render(<DatePicker selected={new Date(2026, 9, 31)} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
