import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

describe("Tooltip Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <TooltipProvider delay={0}>
        <Tooltip defaultOpen>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful context</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("reveals tooltip content on trigger focus", async () => {
    render(
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger>Focusable action</TooltipTrigger>
          <TooltipContent>Keyboard shortcut (⌘K)</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const button = screen.getByRole("button", { name: "Focusable action" });
    button.focus();

    expect(await screen.findByText("Keyboard shortcut (⌘K)")).toBeInTheDocument();
  });
});
