import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { ComponentPreview } from "@/components/ui/component-preview";

function StatefulCounterFixture() {
  const [count, setCount] = React.useState(0);
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  );
}

describe("ComponentPreview Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <ComponentPreview
        title="Stateful Counter"
        description="Demonstrates pointerdown yield and viewport switching."
        code={`<button type="button">Count: 0</button>`}
      >
        <StatefulCounterFixture />
      </ComponentPreview>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("toggles Preview/Code views, updates viewport presets, and resets state", async () => {
    const user = userEvent.setup();
    render(
      <ComponentPreview title="Counter Fixture" code={`export const fixture = "demo-source";`}>
        <StatefulCounterFixture />
      </ComponentPreview>
    );

    const counterButton = screen.getByRole("button", { name: "Count: 0" });
    await user.click(counterButton);
    expect(screen.getByRole("button", { name: "Count: 1" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Mobile 375px viewport" }));
    expect(document.querySelector('[data-viewport="mobile"]')).toHaveClass("max-w-[375px]");

    await user.click(screen.getByRole("button", { name: "Reset preview state" }));
    expect(screen.getByRole("button", { name: "Count: 0" })).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Code" }));
    expect(screen.getByText(`export const fixture = "demo-source";`)).toBeInTheDocument();
  });
});
