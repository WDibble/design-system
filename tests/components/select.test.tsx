import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

describe("Select Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <label>
        Fruit
        <Select defaultValue="apple">
          <SelectTrigger aria-label="Select fruit">
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("opens popover content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Select defaultValue="banana">
        <SelectTrigger aria-label="Pick fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="mango">Mango</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole("combobox", { name: "Pick fruit" });
    await user.click(trigger);

    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
  });
});
