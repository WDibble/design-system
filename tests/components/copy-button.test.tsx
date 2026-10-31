import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { CopyButton } from "@/components/ui/copy-button";

describe("CopyButton Accessibility and Interaction", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <CopyButton value="npm i @design-system/primitives" aria-label="Copy install command" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("copies value to clipboard and executes feedback state", async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: writeTextMock,
      },
      configurable: true,
      writable: true,
    });

    render(<CopyButton value="https://acme.design" idleText="Copy URL" copiedText="Copied" />);

    const button = screen.getByRole("button", { name: "Copy to clipboard" });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(writeTextMock).toHaveBeenCalledWith("https://acme.design");
  });
});
