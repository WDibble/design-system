import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

describe("Resizable Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal" defaultSizes={[40, 60]}>
        <ResizablePanel order={0} defaultSize={40}>
          Left Sidebar
        </ResizablePanel>
        <ResizableHandle handleIndex={0} withHandle />
        <ResizablePanel order={1} defaultSize={60}>
          Main Viewport
        </ResizablePanel>
      </ResizablePanelGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders separator handle with correct separator role", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel order={0}>Panel A</ResizablePanel>
        <ResizableHandle handleIndex={0} />
        <ResizablePanel order={1}>Panel B</ResizablePanel>
      </ResizablePanelGroup>
    );

    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
  });
});
