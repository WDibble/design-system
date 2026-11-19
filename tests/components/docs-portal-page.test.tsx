import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { DocsPortalPage } from "@/pages/docs";

describe("DocsPortalPage Accessibility and Integration", () => {
  it("satisfies WCAG 2.2 accessibility invariants on default Quickstart view", async () => {
    const { container } = render(<DocsPortalPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("navigates between Component Catalogue, OKLCH Contrast Ledger, and Architecture", async () => {
    const user = userEvent.setup();
    render(<DocsPortalPage />);

    await user.click(screen.getByRole("button", { name: /Component Catalogue/i }));
    expect(screen.getByRole("heading", { name: /Component Catalogue/i })).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", { name: "Filter component catalogue" });
    await user.type(searchInput, "Callout");
    await user.click(screen.getByRole("button", { name: "Callout" }));
    expect(screen.getByRole("heading", { name: "Callout" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /OKLCH Contrast Ledger/i }));
    expect(screen.getByRole("heading", { name: "OKLCH Contrast Ledger" })).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Dark Polarity" }));
    expect(screen.getByText("Body Text on Canvas")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /System Architecture/i }));
    expect(
      screen.getByRole("figure", { name: "Automated Agent and Docs Pipeline" })
    ).toBeInTheDocument();
  });

  it("satisfies WCAG 2.2 accessibility invariants across System Architecture and Components views", async () => {
    const user = userEvent.setup();
    const { container } = render(<DocsPortalPage />);
    await user.click(screen.getByRole("button", { name: /System Architecture/i }));
    expect(await axe(container)).toHaveNoViolations();
    await user.click(screen.getByRole("button", { name: /Component Catalogue/i }));
    expect(await axe(container)).toHaveNoViolations();
    await user.click(screen.getByRole("button", { name: /OKLCH Contrast Ledger/i }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
