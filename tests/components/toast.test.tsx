import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { ToastProvider, useToast } from "@/components/ui/toast";

function TestToastConsumer() {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() =>
        toast({
          title: "File Saved",
          description: "Changes committed successfully.",
          type: "success",
        })
      }
    >
      Trigger Toast
    </button>
  );
}

describe("Toast Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants when toast is displayed", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );

    const button = screen.getByRole("button", { name: "Trigger Toast" });
    await user.click(button);

    expect(await screen.findByText("File Saved")).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
