import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

describe("Dialog Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants when opened", async () => {
    const { container } = render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Make changes to your public profile.</DialogDescription>
          </DialogHeader>
          <DialogClose>Cancel</DialogClose>
        </DialogContent>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("opens modal and displays title on trigger activation", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open Dialogue</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deploy Settings</DialogTitle>
            <DialogDescription>Configure environment targets.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByRole("button", { name: "Open Dialogue" });
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Deploy Settings")).toBeInTheDocument();
  });
});
