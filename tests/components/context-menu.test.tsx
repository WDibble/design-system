import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

describe("ContextMenu Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div data-testid="target-surface">Right click here</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Inspect Element</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>View Source</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("opens context menu on secondary click (contextmenu event)", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div data-testid="target-surface">Trigger surface</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Export Data</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const surface = screen.getByTestId("target-surface");
    fireEvent.contextMenu(surface);

    expect(screen.getByRole("menuitem", { name: "Export Data" })).toBeInTheDocument();
  });
});
