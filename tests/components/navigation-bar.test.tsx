import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { NavigationBar, type NavItemConfig } from "@/components/ui/navigation-bar";

describe("NavigationBar Primitive Accessibility and Invariants", () => {
  const items: NavItemConfig[] = [
    { label: "Overview", href: "#overview" },
    { label: "Components", href: "#components" },
    { label: "Documentation", href: "#docs" },
  ];

  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <NavigationBar
        brand={<span className="font-bold">Antigravity</span>}
        items={items}
        actions={<button type="button">Sign In</button>}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders navigation landmarks and direct links", () => {
    render(<NavigationBar brand={<span>Design Standard</span>} items={items} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Components" })).toBeInTheDocument();
  });
});
