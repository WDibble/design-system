import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

describe("Drawer Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants when open", async () => {
    const { container } = render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Mobile Navigation Drawer</DrawerTitle>
            <DrawerDescription>Quick navigation anchors</DrawerDescription>
          </DrawerHeader>
          <DrawerClose>Dismiss</DrawerClose>
        </DrawerContent>
      </Drawer>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("opens drawer upon trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Bottom Sheet Menu</DrawerTitle>
            <DrawerDescription>Contextual options</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByRole("button", { name: "Open Drawer" });
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
