import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Slider } from "@/components/ui/slider";

describe("Slider Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Slider aria-label="Volume level" defaultValue={50} min={0} max={100} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders with correct ARIA attributes", () => {
    render(<Slider aria-label="Screen brightness" value={75} min={0} max={100} />);

    const sliderThumb = screen.getByRole("slider", { hidden: true });
    expect(sliderThumb).toBeInTheDocument();
    expect(sliderThumb).toHaveAttribute("aria-valuenow", "75");
  });
});
