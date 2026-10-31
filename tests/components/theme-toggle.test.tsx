import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { ThemeToggle } from "@/components/ui/theme-toggle";

describe("ThemeToggle Accessibility and Interaction", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(<ThemeToggle isDark={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("triggers toggle callback on click", async () => {
    const user = userEvent.setup();
    const onToggleDark = vi.fn();
    render(<ThemeToggle isDark={false} onToggleDark={onToggleDark} />);

    const button = screen.getByRole("button", { name: /switch to dark/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(onToggleDark).toHaveBeenCalledWith(true);
  });
});
