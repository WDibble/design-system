# Command

> Global command palette modal with instant filtering and keycap hints.

- **Category**: Overlays & Surfaces
- **Import**: `import { Command, CommandDialog, CommandEmpty, CommandGroup } from "@/components/ui/command";`
- **Source**: `src/components/ui/command.tsx`
- **Dependencies**: `@base-ui/react`, `lucide-react`, `react`

## Defining Constraint

Indexes searchable keyboard actions inside either an inline panel or a global focus-trapped CommandDialog (⌘K) with tabular keycap hints.

## When to Use

- Application-wide ⌘K command palettes, quick navigation jumps, and action search.
- Filtering structured commands grouped under headings with keyboard arrows.

## When Not to Use (Use Instead)

| Alternative             | Reason                                                                 |
| :---------------------- | :--------------------------------------------------------------------- |
| [combobox](combobox.md) | Use Combobox when binding a selected option value inside a form field. |
| [select](select.md)     | Use Select for compact fixed option lists without global actions.      |

## Anatomy

```tsx
<Command aria-label="Quick actions">
  <CommandInput placeholder="Search commands..." />
  <CommandList>
    <CommandEmpty>No matching commands.</CommandEmpty>
    <CommandGroup heading="Navigation">
      <CommandItem>
        Open Docs<CommandShortcut>⌘D</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## Verified Example

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandExample() {
  return (
    <div className="w-full max-w-md rounded-xl border border-border/70 bg-card shadow-xs">
      <Command aria-label="Workspace actions">
        <CommandInput placeholder="Filter workspace commands..." />
        <CommandList>
          <CommandEmpty>No commands matched.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem>
              <span>Documentation Portal</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Theme Studio</span>
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
```

## Props Reference

| Prop           | Type                      | Required | Description                         |
| :------------- | :------------------------ | :------- | :---------------------------------- |
| `children`     | `React.ReactNode`         | Yes      | Configures children on Command.     |
| `onOpenChange` | `(open: boolean) => void` | No       | Configures onOpenChange on Command. |
| `open`         | `boolean`                 | No       | Configures open on Command.         |

## Accessibility Contract

- Manages keyboard arrow traversal and Enter execution across CommandItem rows.
- Pair CommandDialog with ⌘K global shortcut and include CommandEmpty feedback.

## Do and Don't

| Do                                                              | Don't                                                                        |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Display keyboard shortcuts right-aligned using CommandShortcut. | Hide primary navigation exclusively inside Command without visible UI links. |
| Always include CommandEmpty so failed queries announce cleanly. | Trigger navigation without closing CommandDialog inside onSelect.            |

## Slots & Pairing

Pairs CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, and CommandShortcut.
