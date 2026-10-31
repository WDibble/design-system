import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { MarkdownToolbar } from "@/components/ui/markdown-toolbar";

describe("MarkdownToolbar Accessibility and Transforms", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <MarkdownToolbar value="Hello world" onChange={() => {}} aria-label="Editor toolbar" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("triggers bold formatting on action", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(<MarkdownToolbar onAction={onAction} />);

    const boldButton = screen.getByRole("button", { name: /bold/i });
    await user.click(boldButton);
    expect(onAction).toHaveBeenCalledWith("bold");
  });
});
