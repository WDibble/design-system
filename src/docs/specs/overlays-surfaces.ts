import type { ComponentSpec } from "@/docs/schema";

const EXAMPLE_FILE = "src/docs/examples/overlays-surfaces.tsx";

export const overlaysSurfacesSpecs: Record<string, ComponentSpec> = {
  "alert-dialog": {
    slug: "alert-dialog",
    definingConstraint:
      "Forces explicit user acknowledgement via high-friction modal focus trapping that blocks accidental backdrop dismissal.",
    whenToUse: [
      "Irreversible destructive operations such as deleting repositories, revoking production API keys, or discarding unsaved work.",
      "High-consequence billing or security actions requiring explicit Cancel vs Confirm choice.",
    ],
    whenNotToUse: [
      {
        primitive: "dialog",
        reason:
          "Use Dialog for general forms or inspectable modals where outside-click dismissal is safe.",
      },
      {
        primitive: "toast",
        reason: "Use Toast with an undo button for recoverable actions.",
      },
    ],
    anatomy: `<AlertDialog>\n  <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>Revoke Key</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Revoke key?</AlertDialogTitle>\n      <AlertDialogDescription>Traffic using this token stops immediately.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Revoke Key</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
    a11yContract: [
      'Exposes role="alertdialog" with mandatory AlertDialogTitle and AlertDialogDescription.',
      "Traps focus inside Content and dismisses on Escape via AlertDialogCancel.",
    ],
    doAndDont: [
      {
        do: "Style AlertDialogTrigger directly with buttonVariants() instead of nesting a Button element.",
        dont: "Use AlertDialog for passive tips or non-destructive announcements.",
      },
      {
        do: "Name AlertDialogAction specifically (e.g. Revoke Key) rather than vague OK labels.",
        dont: "Omit AlertDialogCancel inside the footer action pair.",
      },
    ],
    slotsAndPairing:
      "Pairs AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, and AlertDialogAction.",
    exampleExport: "AlertDialogExample",
    exampleFile: EXAMPLE_FILE,
  },

  command: {
    slug: "command",
    definingConstraint:
      "Indexes searchable keyboard actions inside either an inline panel or a global focus-trapped CommandDialog (⌘K) with tabular keycap hints.",
    whenToUse: [
      "Application-wide ⌘K command palettes, quick navigation jumps, and action search.",
      "Filtering structured commands grouped under headings with keyboard arrows.",
    ],
    whenNotToUse: [
      {
        primitive: "combobox",
        reason: "Use Combobox when binding a selected option value inside a form field.",
      },
      {
        primitive: "select",
        reason: "Use Select for compact fixed option lists without global actions.",
      },
    ],
    anatomy: `<Command aria-label="Quick actions">\n  <CommandInput placeholder="Search commands..." />\n  <CommandList>\n    <CommandEmpty>No matching commands.</CommandEmpty>\n    <CommandGroup heading="Navigation">\n      <CommandItem>Open Docs<CommandShortcut>⌘D</CommandShortcut></CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
    a11yContract: [
      "Manages keyboard arrow traversal and Enter execution across CommandItem rows.",
      "Pair CommandDialog with ⌘K global shortcut and include CommandEmpty feedback.",
    ],
    doAndDont: [
      {
        do: "Display keyboard shortcuts right-aligned using CommandShortcut.",
        dont: "Hide primary navigation exclusively inside Command without visible UI links.",
      },
      {
        do: "Always include CommandEmpty so failed queries announce cleanly.",
        dont: "Trigger navigation without closing CommandDialog inside onSelect.",
      },
    ],
    slotsAndPairing:
      "Pairs CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, and CommandShortcut.",
    exampleExport: "CommandExample",
    exampleFile: EXAMPLE_FILE,
  },

  "context-menu": {
    slug: "context-menu",
    definingConstraint:
      "Attaches a secondary pointer contextmenu surface with keyboard arrow traversal, checkboxes, radio groups, and submenu support.",
    whenToUse: [
      "Desktop canvas nodes, file trees, or table rows needing contextual right-click power actions.",
      "Compact secondary command lists preserving screen space across dense workbenches.",
    ],
    whenNotToUse: [
      {
        primitive: "dropdown-menu",
        reason: "Use DropdownMenu when actions must also be discoverable via a visible button.",
      },
      {
        primitive: "popover",
        reason: "Use Popover for structured forms or rich non-menu widgets.",
      },
    ],
    anatomy: `<ContextMenu>\n  <ContextMenuTrigger><div>Inspectable canvas surface</div></ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Copy Path</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem>Duplicate</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
    a11yContract: [
      "Never place essential-only workflows inside ContextMenu without an accessible visible button alternative.",
      'Menu items declare role="menuitem" and support Escape dismissal.',
    ],
    doAndDont: [
      {
        do: "Mirror critical ContextMenu actions inside visible row menus or keyboard shortcuts.",
        dont: "Attach ContextMenu to plain body copy where users expect browser Copy/Inspect tools.",
      },
      {
        do: "Separate destructive menu items with ContextMenuSeparator.",
        dont: "Crowd more than two nested submenus inside a context menu.",
      },
    ],
    slotsAndPairing:
      "Composes ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, and ContextMenuRadioGroup.",
    exampleExport: "ContextMenuExample",
    exampleFile: EXAMPLE_FILE,
  },

  dialog: {
    slug: "dialog",
    definingConstraint:
      "Renders a focus-trapped liquid backdrop modal dialogue with Apple spring scaling and reliable Escape/backdrop dismissal.",
    whenToUse: [
      "Focused secondary forms, inspector modals, or expanded media/diagram inspection.",
      "Multi-field edits needing temporary focus isolation without navigating away from context.",
    ],
    whenNotToUse: [
      {
        primitive: "alert-dialog",
        reason:
          "Use AlertDialog when outside-click dismissal must be blocked for destructive confirmation.",
      },
      {
        primitive: "sheet",
        reason:
          "Use Sheet for wide filter panels, settings drawers, or side-by-side detail editors.",
      },
      {
        primitive: "drawer",
        reason: "Use Drawer for swipeable compact mobile bottom sheets.",
      },
    ],
    anatomy: `<Dialog>\n  <DialogTrigger className={buttonVariants({ variant: "outline" })}>Edit Spec</DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Edit Token Preset</DialogTitle>\n      <DialogDescription>Adjust base hue and contrast thresholds.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter><DialogClose>Done</DialogClose></DialogFooter>\n  </DialogContent>\n</Dialog>`,
    a11yContract: [
      "Must contain DialogTitle (linked via aria-labelledby) and DialogDescription inside DialogContent.",
      "Traps keyboard focus while open and returns focus to DialogTrigger upon close.",
    ],
    doAndDont: [
      {
        do: "Apply buttonVariants() directly to DialogTrigger instead of wrapping another Button.",
        dont: "Render Dialog without a DialogTitle header.",
      },
      {
        do: "Reserve Dialog for bounded tasks rather than multi-page workflows.",
        dont: "Stack multiple simultaneous Dialog modals on top of one another.",
      },
    ],
    slotsAndPairing:
      "Composes Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, and DialogClose.",
    exampleExport: "DialogExample",
    exampleFile: EXAMPLE_FILE,
  },

  drawer: {
    slug: "drawer",
    definingConstraint:
      "Provides a swipeable edge drawer with tactile drag handle chrome tailored to thumb-reach compact viewports.",
    whenToUse: [
      "Mobile action sheets, compact filters, or contextual forms originating from the bottom viewport edge.",
      "Touch-first pickers where drag-down gesture dismissal feels natural.",
    ],
    whenNotToUse: [
      {
        primitive: "sheet",
        reason: "Use Sheet for persistent left or right desktop slide-over panels.",
      },
      {
        primitive: "dialog",
        reason: "Use Dialog for centred desktop modal tasks.",
      },
    ],
    anatomy: `<Drawer>\n  <DrawerTrigger className={buttonVariants({ variant: "outline" })}>Open Drawer</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHandle />\n    <DrawerHeader>\n      <DrawerTitle>Filter Results</DrawerTitle>\n      <DrawerDescription>Narrow dataset by severity.</DrawerDescription>\n    </DrawerHeader>\n  </DrawerContent>\n</Drawer>`,
    a11yContract: [
      "Traps focus while open and requires DrawerTitle and DrawerDescription.",
      "Dismisses cleanly on Escape key as well as swipe drag gestures.",
    ],
    doAndDont: [
      {
        do: "Include DrawerHandle inside DrawerContent to signal swipe dismissal affordance.",
        dont: "Nest a Button directly inside DrawerTrigger.",
      },
      {
        do: "Keep primary dismissal actions reachable via DrawerClose buttons for non-pointer users.",
        dont: "Hide critical confirmation state off-screen without scroll containment.",
      },
    ],
    slotsAndPairing:
      "Includes DrawerHandle, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, and DrawerClose.",
    exampleExport: "DrawerExample",
    exampleFile: EXAMPLE_FILE,
  },

  "dropdown-menu": {
    slug: "dropdown-menu",
    definingConstraint:
      "Preserves zero-jitter anchor alignment by keeping trigger buttons unscaled while presenting liquid glass action, checkbox, and radio menus.",
    whenToUse: [
      'Compact overflow "More" menus, row action buttons, or profile menu actions.',
      "Hierarchical action lists supporting toggleable checkboxes and radio view modes.",
    ],
    whenNotToUse: [
      {
        primitive: "select",
        reason: "Use Select when picking a value stored in form state.",
      },
      {
        primitive: "popover",
        reason: "Use Popover when rendering interactive inputs, sliders, or custom panels.",
      },
    ],
    anatomy: `<DropdownMenu>\n  <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>Actions</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Workspace</DropdownMenuLabel>\n    <DropdownMenuItem>Export JSON</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
    a11yContract: [
      'Manages aria-haspopup="menu", arrow-key menu traversal, and Escape closing.',
      "Icon-only trigger buttons must carry an explicit aria-label.",
    ],
    doAndDont: [
      {
        do: "Disable tap scaling on DropdownMenu triggers or use DropdownMenuTrigger directly with buttonVariants().",
        dont: "Put text inputs or multi-field forms inside DropdownMenuContent.",
      },
      {
        do: "Group checkboxes and radio choices using DropdownMenuCheckboxItem and DropdownMenuRadioGroup.",
        dont: "Abuse DropdownMenu as a substitute for Select inside validated forms.",
      },
    ],
    slotsAndPairing:
      "Supports DropdownMenuGroup, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, and DropdownMenuShortcut.",
    exampleExport: "DropdownMenuExample",
    exampleFile: EXAMPLE_FILE,
  },

  "hover-card": {
    slug: "hover-card",
    definingConstraint:
      "Displays passive, non-essential supplementary reference details on pointer hover or link focus with gentle timing hysteresis.",
    whenToUse: [
      "User profile cards, git commit previews, or token definitions hovering over inline anchors.",
      "Read-only reference summaries enrichment over navigation links.",
    ],
    whenNotToUse: [
      {
        primitive: "tooltip",
        reason: "Use Tooltip for short plain-text key hints or icon button labels.",
      },
      {
        primitive: "popover",
        reason:
          "Use Popover whenever content needs reliable click-open persistence on touch screens.",
      },
    ],
    anatomy: `<HoverCard>\n  <HoverCardTrigger href="#spec">@design-system</HoverCardTrigger>\n  <HoverCardContent>\n    <p className="text-xs">57 verified primitives in OKLCH.</p>\n  </HoverCardContent>\n</HoverCard>`,
    a11yContract: [
      "Trigger is always a focusable anchor link leading to the full target resource.",
      "Do not gate critical required information exclusively inside hover cards.",
    ],
    doAndDont: [
      {
        do: "Pass a real href target on HoverCardTrigger for touch and keyboard visitors.",
        dont: "Put critical form buttons inside HoverCardContent; use Popover instead.",
      },
      {
        do: "Keep HoverCard body brief and scannable.",
        dont: "Trigger nested HoverCards from within HoverCardContent.",
      },
    ],
    slotsAndPairing: "Pairs HoverCardTrigger and HoverCardContent with Avatar or Badge summaries.",
    exampleExport: "HoverCardExample",
    exampleFile: EXAMPLE_FILE,
  },

  popover: {
    slug: "popover",
    definingConstraint:
      "Anchors non-modal interactive overlays with automatic viewport collision avoidance while letting outside clicks dismiss naturally.",
    whenToUse: [
      "Date pickers, inline filter panels, share dialogues, or compact configuration forms.",
      "Trigger-anchored interactive mini-panels that keep surrounding context visible.",
    ],
    whenNotToUse: [
      {
        primitive: "tooltip",
        reason: "Use Tooltip for static single-line micro-hints without interactive widgets.",
      },
      {
        primitive: "dropdown-menu",
        reason: "Use DropdownMenu for uniform lists of commands.",
      },
      {
        primitive: "dialog",
        reason: "Use Dialog when background interaction should be blocked modally.",
      },
    ],
    anatomy: `<Popover>\n  <PopoverTrigger className={buttonVariants({ variant: "outline" })}>Configure</PopoverTrigger>\n  <PopoverContent>\n    <PopoverHeader>\n      <PopoverTitle>Grid Snap</PopoverTitle>\n      <PopoverDescription>Adjust snapping granularity.</PopoverDescription>\n    </PopoverHeader>\n  </PopoverContent>\n</Popover>`,
    a11yContract: [
      "Connects PopoverTitle and PopoverDescription for screen readers upon opening.",
      "Dismisses on Escape and returns focus cleanly to PopoverTrigger.",
    ],
    doAndDont: [
      {
        do: "Style PopoverTrigger directly with buttonVariants() to avoid nested button elements.",
        dont: "Overflow narrow popovers across viewport edges; rely on Base UI positioning.",
      },
      {
        do: "Keep PopoverContent widths explicit (e.g. w-72 or w-80) to avoid auto-width grid collapse.",
        dont: "Use Popover for irreversible destructive confirmation warnings; use AlertDialog.",
      },
    ],
    slotsAndPairing: "Hosts Slider, Switch, Calendar, or Field controls inside PopoverContent.",
    exampleExport: "PopoverExample",
    exampleFile: EXAMPLE_FILE,
  },

  sheet: {
    slug: "sheet",
    definingConstraint:
      "Slides an edge-docked panel (top, right, bottom, or left) over the viewport while trapping focus and keeping liquid backdrop blur coherent.",
    whenToUse: [
      "Theme Studios, audit inspectors, notification feeds, or responsive mobile navigation drawers.",
      "Detail views requiring full viewport height alongside scrollable bodies and pinned footers.",
    ],
    whenNotToUse: [
      {
        primitive: "dialog",
        reason: "Use Dialog for compact centred confirmation or creation forms.",
      },
      {
        primitive: "drawer",
        reason: "Use Drawer specifically for swipe-gestured bottom sheets on touch devices.",
      },
    ],
    anatomy: `<Sheet>\n  <SheetTrigger className={buttonVariants({ variant: "outline" })}>Inspect Logs</SheetTrigger>\n  <SheetContent side="right">\n    <SheetHeader>\n      <SheetTitle>Cluster Telemetry</SheetTitle>\n      <SheetDescription>Live event stream across edge regions.</SheetDescription>\n    </SheetHeader>\n  </SheetContent>\n</Sheet>`,
    a11yContract: [
      "Requires SheetTitle and SheetDescription inside SheetContent for ARIA dialog compliance.",
      "Traps focus while open and dismisses cleanly on Escape.",
    ],
    doAndDont: [
      {
        do: 'Choose side="right" for inspector/detail panels and side="left" for navigation menus.',
        dont: "Nest a Button element inside SheetTrigger.",
      },
      {
        do: "Provide scrollable internal overflow on tall SheetContent bodies while pinning actions in SheetFooter.",
        dont: "Omit visible close affordance (`SheetClose`) inside crowded mobile sheets.",
      },
    ],
    slotsAndPairing:
      "Combines SheetHeader, SheetTitle, SheetDescription, SheetFooter, and SheetClose.",
    exampleExport: "SheetExample",
    exampleFile: EXAMPLE_FILE,
  },

  toast: {
    slug: "toast",
    definingConstraint:
      "Delivers non-blocking status feedback anchored outside flow layout with an optional 5-second reversible undo trigger via ToastProvider and useToast.",
    whenToUse: [
      "Confirming background saves, exports, copies, or reversible item removals.",
      "Surfacing asynchronous deployment completion without interrupting active typing.",
    ],
    whenNotToUse: [
      {
        primitive: "alert-dialog",
        reason:
          "Use AlertDialog before irreversible actions rather than apologising in a Toast afterwards.",
      },
      {
        primitive: "callout",
        reason: "Use Callout for persistent inline page guidance or validation rules.",
      },
    ],
    anatomy: `<ToastProvider>\n  <ConsumerUsingUseToast />\n</ToastProvider>`,
    a11yContract: [
      "Announces status updates politely via live region semantics without stealing keyboard focus.",
      "Close buttons expose explicit aria-label and undo triggers remain keyboard reachable.",
    ],
    doAndDont: [
      {
        do: "Mount ToastProvider once near your app root before calling useToast().",
        dont: "Put blocking multi-line instructions or required form errors exclusively in fleeting Toasts.",
      },
      {
        do: "Keep toast titles concise (2 to 5 words) with concrete action outcomes.",
        dont: "Fire duplicate Toasts on every keystroke.",
      },
    ],
    slotsAndPairing:
      "Consumed via `const { toast } = useToast()` inside any component wrapped by `<ToastProvider>`.",
    exampleExport: "ToastExample",
    exampleFile: EXAMPLE_FILE,
  },

  tooltip: {
    slug: "tooltip",
    definingConstraint:
      "Presents micro plain-text clarifications on icon buttons and keyboard shortcuts within a shared TooltipProvider warmup window.",
    whenToUse: [
      "Explaining icon-only controls, displaying keyboard shortcuts (`⌘K`), or clarifying truncated telemetry codes.",
      "Lightweight micro-hints on hover or keyboard focus without adding visible chrome.",
    ],
    whenNotToUse: [
      {
        primitive: "popover",
        reason: "Use Popover if the overlay contains clickable links, buttons, or controls.",
      },
      {
        primitive: "hover-card",
        reason: "Use HoverCard for rich multi-line preview panels anchored to links.",
      },
    ],
    anatomy: `<TooltipProvider delay={150}>\n  <Tooltip>\n    <TooltipTrigger aria-label="Show help" className={buttonVariants({ size: "icon-sm", variant: "ghost" })}>?</TooltipTrigger>\n    <TooltipContent>Inspect shortcut</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
    a11yContract: [
      "Appears on both hover and keyboard focus-visible and dismisses on Escape.",
      "Icon-only triggers must still declare an explicit aria-label directly on the trigger.",
    ],
    doAndDont: [
      {
        do: "Wrap icon toolbar clusters inside TooltipProvider so sequential hovers open smoothly.",
        dont: "Place buttons, links, or interactive inputs inside TooltipContent.",
      },
      {
        do: "Keep tooltip copy short (under 8 words).",
        dont: "Repeat the visible button text verbatim inside its TooltipContent.",
      },
    ],
    slotsAndPairing:
      "Pairs TooltipProvider, Tooltip, TooltipTrigger, and TooltipContent with Kbd hints.",
    exampleExport: "TooltipExample",
    exampleFile: EXAMPLE_FILE,
  },
};
