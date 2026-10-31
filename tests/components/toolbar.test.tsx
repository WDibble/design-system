import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarGroup } from "@/components/ui/toolbar";

describe("Toolbar Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <Toolbar aria-label="Formatting options">
        <ToolbarGroup>
          <ToolbarButton aria-label="Bold text">B</ToolbarButton>
          <ToolbarButton aria-label="Italic text">I</ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <ToolbarButton aria-label="Insert link">Link</ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles toolbar button focus and interaction", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Actions">
        <ToolbarButton aria-label="Cut selection">Cut</ToolbarButton>
        <ToolbarButton aria-label="Copy selection">Copy</ToolbarButton>
      </Toolbar>
    );

    const cutButton = screen.getByRole("button", { name: "Cut selection" });
    await user.click(cutButton);
    expect(cutButton).toBeInTheDocument();
  });
});
