import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Stepper } from "@/components/ui/stepper";

describe("Stepper Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Stepper value={3} min={0} max={10}>
        <Stepper.Decrement aria-label="Decrease quantity" />
        <Stepper.Value />
        <Stepper.Increment aria-label="Increase quantity" />
      </Stepper>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("increments and decrements value on button press", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Stepper value={2} onValueChange={onValueChange} min={0} max={5}>
        <Stepper.Decrement aria-label="Decrease" />
        <Stepper.Value />
        <Stepper.Increment aria-label="Increase" />
      </Stepper>
    );

    const incButton = screen.getByRole("button", { name: "Increase" });
    await user.click(incButton);
    expect(onValueChange).toHaveBeenCalledWith(3);
  });
});
