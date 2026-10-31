import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Tree, type TreeNodeData } from "@/components/ui/tree";

describe("Tree Primitive Accessibility and Invariants", () => {
  const treeData: TreeNodeData[] = [
    {
      id: "src",
      label: "src",
      children: [
        { id: "components", label: "components" },
        { id: "lib", label: "lib" },
      ],
    },
    { id: "readme", label: "README.md" },
  ];

  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(<Tree data={treeData} defaultExpandedIds={["src"]} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("triggers onSelect callback when clicking a file node", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<Tree data={treeData} onSelect={onSelect} />);

    const readmeNode = screen.getByText("README.md");
    await user.click(readmeNode);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "readme" }));
  });
});
