import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Textarea } from "@/components/ui/textarea";

describe("Textarea Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <label>
        Feedback
        <Textarea placeholder="Share your feedback..." />
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles multi-line typing without layout jitter", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Notes" placeholder="Write notes" />);

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    await user.type(textarea, "Line 1\nLine 2");
    expect(textarea).toHaveValue("Line 1\nLine 2");
  });
});
