import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";

describe("Toggle and ToggleGroup Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants for standalone toggle", async () => {
    const { container } = render(
      <Toggle aria-label="Toggle mute">
        <span>Mute</span>
      </Toggle>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("handles pressed state and keyboard interactions", async () => {
    const user = userEvent.setup();
    render(
      <Toggle aria-label="Pin message">
        <span>Pin</span>
      </Toggle>
    );

    const toggle = screen.getByRole("button", { name: "Pin message" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("satisfies WCAG 2.2 accessibility invariants for toggle group", async () => {
    const { container } = render(
      <ToggleGroup aria-label="Text formatting">
        <Toggle value="bold" aria-label="Bold text">
          Bold
        </Toggle>
        <Toggle value="italic" aria-label="Italic text">
          Italic
        </Toggle>
        <Toggle value="underline" aria-label="Underline text">
          Underline
        </Toggle>
      </ToggleGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
