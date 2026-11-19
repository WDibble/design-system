import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { CodeBlock } from "@/components/ui/code-block";

describe("CodeBlock Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <CodeBlock
        filename="src/example.tsx"
        language="tsx"
        highlightLines={[2]}
        code={`import { Button } from "@/components/ui/button";\nexport const Demo = () => <Button>Deploy</Button>;`}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("switches between multi-tab snippets cleanly", async () => {
    const user = userEvent.setup();
    render(
      <CodeBlock
        tabs={[
          { id: "install", label: "Install", language: "bash", code: "npm install @ds/core" },
          { id: "verify", label: "Verify", language: "bash", code: "npm run check" },
        ]}
      />
    );

    expect(screen.getByText("npm install @ds/core")).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Verify" }));
    expect(screen.getByText("npm run check")).toBeInTheDocument();
  });
});
