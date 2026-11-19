import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { DiagramFrame } from "@/components/ui/diagram-frame";

function SampleSvgDiagram() {
  return (
    <svg aria-label="Pipeline diagram" viewBox="0 0 320 80" width="320" height="80">
      <title>Pipeline diagram</title>
      <desc>Connects primitive source to verified output.</desc>
      <rect x="10" y="20" width="100" height="40" rx="8" fill="none" stroke="currentColor" />
      <text x="60" y="45" textAnchor="middle" fill="currentColor" fontSize="12">
        Source
      </text>
      <path d="M 110 40 L 210 40" stroke="currentColor" />
      <rect x="210" y="20" width="100" height="40" rx="8" fill="none" stroke="currentColor" />
      <text x="260" y="45" textAnchor="middle" fill="currentColor" fontSize="12">
        Verified
      </text>
    </svg>
  );
}

describe("DiagramFrame Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <DiagramFrame
        title="Build Pipeline Schematic"
        description="Illustrates orthogonal routing between source and verified stages."
      >
        <SampleSvgDiagram />
      </DiagramFrame>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("opens full-width dialogue on Expand click and closes on Escape", async () => {
    const user = userEvent.setup();
    render(
      <DiagramFrame
        title="Build Pipeline Schematic"
        description="Illustrates orthogonal routing between source and verified stages."
      >
        <SampleSvgDiagram />
      </DiagramFrame>
    );

    await user.click(
      screen.getByRole("button", { name: "Inspect Build Pipeline Schematic in expanded view" })
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
