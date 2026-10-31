import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

describe("Sheet Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants when open", async () => {
    const { container } = render(
      <Sheet defaultOpen>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Audit Logs</SheetTitle>
            <SheetDescription>Real-time cluster telemetry feed.</SheetDescription>
          </SheetHeader>
          <SheetClose>Close</SheetClose>
        </SheetContent>
      </Sheet>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("opens slide-over sheet on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>View Logs</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Event Stream</SheetTitle>
            <SheetDescription>Streaming logs</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByRole("button", { name: "View Logs" });
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Event Stream")).toBeInTheDocument();
  });
});
