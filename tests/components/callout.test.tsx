import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { Callout } from "@/components/ui/callout";

describe("Callout Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants across variants", async () => {
    const { container } = render(
      <div className="space-y-4">
        <Callout variant="note" title="Architecture Note">
          All interactive controls yield on pointerdown.
        </Callout>
        <Callout variant="tip" title="Verification Tip">
          Run the invariant script before opening a pull request.
        </Callout>
        <Callout variant="warning" title="Contrast Warning">
          Lightness below 0.72 requires dark ink polarity.
        </Callout>
        <Callout variant="caution" title="Destructive Operation">
          Purging generated manifests removes cached artifacts.
        </Callout>
        <Callout variant="defining-constraint" title="Zero Layout Shift">
          Never alter padding or border width on hover states.
        </Callout>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("assigns alert role for warning and caution variants", () => {
    render(
      <>
        <Callout variant="warning" title="Contrast Notice">
          Verify APCA contrast ratios.
        </Callout>
        <Callout variant="note" title="Info Notice">
          Uses semantic OKLCH colour tokens.
        </Callout>
      </>
    );

    expect(screen.getByRole("alert", { name: "Contrast Notice" })).toBeInTheDocument();
    expect(screen.getByRole("note", { name: "Info Notice" })).toBeInTheDocument();
  });
});
