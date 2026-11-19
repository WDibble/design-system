import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { DocArticle, DocLayout, DocSidebar, DocToc } from "@/components/ui/doc-layout";

describe("DocLayout Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <DocLayout>
        <DocSidebar
          activeId="quickstart"
          onSelect={() => {}}
          groups={[
            {
              title: "Getting Started",
              items: [
                { id: "quickstart", label: "Quickstart", badge: "Step 1" },
                { id: "architecture", label: "Architecture" },
              ],
            },
          ]}
        />
        <DocArticle markdownSource="# Quickstart\nVerify primitives." llmsHref="/llms.txt">
          <section id="overview">
            <h2>Overview</h2>
            <p>Documentation prose stays within optimal line measure.</p>
          </section>
        </DocArticle>
        <DocToc
          headings={[{ id: "overview", label: "Overview" }]}
          verificationChecks={[
            { label: "All invariant gates pass.", command: "npm run invariants" },
          ]}
        />
      </DocLayout>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("invokes onSelect when navigating sidebar items and renders verification checklist", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DocLayout>
        <DocSidebar
          activeId="quickstart"
          onSelect={handleSelect}
          groups={[
            {
              title: "Reference",
              items: [
                { id: "quickstart", label: "Quickstart" },
                { id: "tokens", label: "OKLCH Tokens" },
              ],
            },
          ]}
        />
        <DocArticle markdownSource="# Guide">
          <p>Sample article body</p>
        </DocArticle>
        <DocToc
          headings={[{ id: "tokens", label: "Tokens" }]}
          verificationChecks={[
            { label: "Contrast audit exits zero.", command: "npm run docs:check" },
          ]}
        />
      </DocLayout>
    );

    await user.click(screen.getByRole("button", { name: "OKLCH Tokens" }));
    expect(handleSelect).toHaveBeenCalledWith("tokens");
    expect(screen.getByText("It's Working If")).toBeInTheDocument();
    expect(screen.getByText("npm run docs:check")).toBeInTheDocument();
  });
});
