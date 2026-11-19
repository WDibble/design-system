import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { PropTable } from "@/components/ui/prop-table";

describe("PropTable Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <PropTable
        title="ButtonProps"
        caption="Extends standard native HTML button attributes."
        props={[
          {
            name: "variant",
            type: '"default" | "outline" | "ghost"',
            defaultValue: '"default"',
            description: "Selects visual button emphasis.",
          },
          {
            name: "onClick",
            type: "(e: MouseEvent) => unknown",
            required: true,
            description: "Triggers action or async 9-state loading transition.",
          },
        ]}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders required badges without crush and formats tabular defaults", () => {
    render(
      <PropTable
        props={[
          {
            name: "size",
            type: '"sm" | "default" | "lg"',
            defaultValue: '"default"',
            required: true,
            description: "Locks canonical height and optical icon scale.",
          },
        ]}
      />
    );

    const badge = screen.getByText("Required").closest("div");
    expect(badge).toHaveClass("shrink-0");
    expect(badge).toHaveClass("whitespace-nowrap");
  });
});
