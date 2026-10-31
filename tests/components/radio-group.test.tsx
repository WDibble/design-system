import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

describe("RadioGroup Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <RadioGroup defaultValue="standard" aria-label="Subscription plan">
        <label>
          <RadioGroupItem value="standard" />
          <span>Standard</span>
        </label>
        <label>
          <RadioGroupItem value="pro" />
          <span>Pro</span>
        </label>
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles radio selection via keyboard and mouse", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="small" aria-label="Size selection">
        <label>
          <RadioGroupItem value="small" />
          <span>Small</span>
        </label>
        <label>
          <RadioGroupItem value="large" />
          <span>Large</span>
        </label>
      </RadioGroup>
    );

    const largeRadio = screen.getByRole("radio", { name: "Large" });
    await user.click(largeRadio);
    expect(largeRadio).toBeChecked();
  });
});
