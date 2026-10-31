import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { ProgressiveImage } from "@/components/ui/image";

describe("ProgressiveImage Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants with alt text", async () => {
    const { container } = render(
      <ProgressiveImage
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
        alt="Refraction crystal"
        aspectRatio="16/9"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("enforces explicit alt text on rendered image", () => {
    render(
      <ProgressiveImage
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
        alt="Abstract glass fluidity"
      />
    );

    const img = screen.getByRole("img", { name: "Abstract glass fluidity" });
    expect(img).toBeInTheDocument();
  });
});
