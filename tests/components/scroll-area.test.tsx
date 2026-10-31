import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

describe("ScrollArea Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <ScrollArea className="h-32 w-48">
        <div>Long scrollable content lines that flow smoothly.</div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders children elements within viewport", () => {
    render(
      <ScrollArea>
        <p>Telemetry stream logs</p>
      </ScrollArea>
    );

    expect(screen.getByText("Telemetry stream logs")).toBeInTheDocument();
  });
});
