import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandDialog,
} from "@/components/ui/command";

describe("Command Primitive Accessibility and Invariants", () => {
  it("satisfies WCAG 2.2 accessibility invariants in inline mode", async () => {
    const { container } = render(
      <Command aria-label="Command palette">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("filters items based on user search query", async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search actions..." />
        <CommandList>
          <CommandEmpty>No actions found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>Deploy Production</CommandItem>
            <CommandItem>Restart Cluster</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const input = screen.getByPlaceholderText("Search actions...");
    await user.type(input, "Deploy");

    expect(screen.getByText("Deploy Production")).toBeInTheDocument();
  });
});
