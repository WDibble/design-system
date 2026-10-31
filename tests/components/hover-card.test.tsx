import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

describe("HoverCard Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <HoverCard defaultOpen>
        <HoverCardTrigger href="https://github.com/design-system">@design-system</HoverCardTrigger>
        <HoverCardContent>
          <p>The movement and living standard for agent-native design.</p>
        </HoverCardContent>
      </HoverCard>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders trigger link with correct anchor attributes", () => {
    render(
      <HoverCard>
        <HoverCardTrigger href="#team">Team</HoverCardTrigger>
        <HoverCardContent>
          <p>Core engineers</p>
        </HoverCardContent>
      </HoverCard>
    );

    const trigger = screen.getByRole("link", { name: "Team" });
    expect(trigger).toHaveAttribute("href", "#team");
  });
});
