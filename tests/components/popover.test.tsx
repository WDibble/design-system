import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";

describe("Popover Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants when open", async () => {
    const { container } = render(
      <Popover defaultOpen>
        <PopoverTrigger>Open Info</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Telemetry Configuration</PopoverTitle>
            <PopoverDescription>Metrics collection rate</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("opens popover floating surface on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent>
          <p>Surface payload</p>
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Toggle Popover" });
    await user.click(trigger);

    expect(screen.getByText("Surface payload")).toBeInTheDocument();
  });
});
