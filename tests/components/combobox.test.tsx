import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

describe("Combobox Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants", async () => {
    const { container } = render(
      <label>
        Framework
        <Combobox items={["React", "Vue", "Svelte"]}>
          <ComboboxInput placeholder="Choose framework..." aria-label="Select framework" />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem item="React">React</ComboboxItem>
              <ComboboxItem item="Vue">Vue</ComboboxItem>
              <ComboboxItem item="Svelte">Svelte</ComboboxItem>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders input field and accepts typing", async () => {
    const user = userEvent.setup();
    render(
      <Combobox items={["Next.js", "Vite"]}>
        <ComboboxInput aria-label="Build tool" placeholder="Select tool..." />
      </Combobox>
    );

    const input = screen.getByRole("combobox", { name: "Build tool" });
    await user.type(input, "Vite");
    expect(input).toHaveValue("Vite");
  });
});
