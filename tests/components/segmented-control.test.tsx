import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";

describe("SegmentedControl Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <SegmentedControl value="monthly" onValueChange={() => {}} aria-label="Billing cycle">
        <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
        <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
      </SegmentedControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles selection changes on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <SegmentedControl value="preview" onValueChange={onValueChange} aria-label="Mode">
        <SegmentedControlItem value="preview">Preview</SegmentedControlItem>
        <SegmentedControlItem value="code">Code</SegmentedControlItem>
      </SegmentedControl>
    );

    const codeOption = screen.getByRole("tab", { name: "Code" });
    await user.click(codeOption);
    expect(onValueChange).toHaveBeenCalledWith("code");
  });
});
