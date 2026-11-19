import type { ComponentSpec } from "@/docs/schema";

const EXAMPLE_FILE = "src/docs/examples/actions-toggles.tsx";

export const actionsTogglesSpecs: Record<string, ComponentSpec> = {
  button: {
    slug: "button",
    definingConstraint:
      "Locks horizontal button footprint with an invisible ghost sizer across idle, loading, success, and error states while compressing immediately on pointerdown.",
    whenToUse: [
      "Triggering immediate actions, form submissions, or asynchronous mutations with Promise lifecycle feedback.",
      "Presenting primary, secondary, destructive, outline, ghost, or warning actions with proportional icon affinity.",
    ],
    whenNotToUse: [
      { primitive: "toggle", reason: "Use Toggle for persistent two-state pressed controls." },
      {
        primitive: "copy-button",
        reason: "Use CopyButton for one-click clipboard copy with morphing checkmark timing.",
      },
      {
        primitive: "segmented-control",
        reason: "Use SegmentedControl when switching between 2 to 5 mutually exclusive views.",
      },
    ],
    anatomy: `<Button variant="default" size="default" leftIcon={<SparklesIcon size={16} />}>\n  Publish\n</Button>`,
    a11yContract: [
      "Icon-only sizes (icon, icon-xs, icon-sm, icon-lg) must declare an explicit aria-label.",
      "Async loading locks aria-busy without dropping opacity so focus contrast remains intact.",
    ],
    doAndDont: [
      {
        do: "Pass numeric size props on nested icons matching 40% to 50% of button height.",
        dont: "Merge size-full or p-0 after Button variant props inside className.",
      },
      {
        do: "Return a Promise from onClick to drive automatic loading and success states.",
        dont: "Place a Button inside a Base UI Trigger such as DialogTrigger, which renders its own button.",
      },
    ],
    slotsAndPairing:
      "Supports leftIcon and rightIcon slots with synchronous group hover animation. Pair buttonVariants() directly onto custom links or overlay triggers.",
    exampleExport: "ButtonExample",
    exampleFile: EXAMPLE_FILE,
  },

  "copy-button": {
    slug: "copy-button",
    definingConstraint:
      "Encapsulates clipboard write handling and spring morph transitions between idle copy and temporary confirmation states without shifting adjacent controls.",
    whenToUse: [
      "Copying CLI commands, API keys, token values, or generated code blocks to the clipboard.",
      "Inline copy triggers inside tables, headers, and developer toolbars.",
    ],
    whenNotToUse: [
      { primitive: "button", reason: "Use Button for general actions or mutations." },
      { primitive: "toggle", reason: "Use Toggle for persistent boolean state switches." },
    ],
    anatomy: `<CopyButton value="npm run check" idleText="Copy" copiedText="Copied" variant="outline" size="sm" />`,
    a11yContract: [
      "Automatically toggles accessible aria-label between Copy and Copied feedback states.",
      "Keyboard activatable via Enter or Space with visible focus-visible ring.",
    ],
    doAndDont: [
      {
        do: "Supply the exact string payload in the value prop even when idleText is omitted.",
        dont: "Hardcode manual checkmark icons inside CopyButton children.",
      },
      {
        do: 'Use size="sm" inside compact headers such as CodeBlock or Input rows.',
        dont: "Trigger duplicate Toast alerts for routine inline snippet copies.",
      },
    ],
    slotsAndPairing:
      "Embeds directly inside CodeBlock headers and Card action rows with configurable timeout reset.",
    exampleExport: "CopyButtonExample",
    exampleFile: EXAMPLE_FILE,
  },

  "markdown-toolbar": {
    slug: "markdown-toolbar",
    definingConstraint:
      "Coordinates rich Markdown insertion, line-prefix toggling, and table scaffolding while sanitising heading levels against existing line structures.",
    whenToUse: [
      "Paired above a Markdown Textarea for technical notes, issue composers, or changelog editors.",
      "When writers need keyboard-accessible heading, list, quote, link, and table formatting actions.",
    ],
    whenNotToUse: [
      {
        primitive: "toolbar",
        reason: "Use generic Toolbar for non-Markdown canvas tools or custom app button rows.",
      },
      {
        primitive: "toggle-group",
        reason: "Use ToggleGroup for a small set of inline formatting flags.",
      },
    ],
    anatomy: `<MarkdownToolbar textareaRef={textareaRef} viewMode={viewMode} onViewModeChange={setViewMode} aria-label="Markdown formatting" />`,
    a11yContract: [
      'Exposes role="toolbar" with arrow-key roving focus across formatting controls.',
      "Requires a descriptive aria-label distinguishing multiple editors on one screen.",
    ],
    doAndDont: [
      {
        do: "Pass textareaRef bound to the controlled Textarea so cursor selection and undo history work natively.",
        dont: "Omit viewMode and onViewModeChange if exposing split Preview/Write mode buttons.",
      },
      {
        do: "Keep Markdown preview panes beside the textarea on desktop viewports.",
        dont: "Hide primary save actions inside the formatting toolbar itself.",
      },
    ],
    slotsAndPairing:
      "Pairs directly above Textarea or inside Resizable split panes alongside Markdown preview panels.",
    exampleExport: "MarkdownToolbarExample",
    exampleFile: EXAMPLE_FILE,
  },

  "segmented-control": {
    slug: "segmented-control",
    definingConstraint:
      "Animates a single shared spring background pill across mutually exclusive tabs while keeping text weight frozen so labels never twitch horizontally.",
    whenToUse: [
      "Switching immediately between 2 to 5 compact modes such as Preview/Code, Light/Dark, or billing cadence.",
      "High-frequency view filters where all options remain visible at once.",
    ],
    whenNotToUse: [
      {
        primitive: "tabs",
        reason: "Use Tabs when switching full content panels with keyboard arrow activation.",
      },
      {
        primitive: "radio-group",
        reason: "Use RadioGroup inside forms when choices submit with form data.",
      },
      {
        primitive: "select",
        reason: "Use Select when there are more than 5 options.",
      },
    ],
    anatomy: `<SegmentedControl value={mode} onValueChange={setMode} aria-label="View mode">\n  <SegmentedControlItem value="preview">Preview</SegmentedControlItem>\n  <SegmentedControlItem value="code">Code</SegmentedControlItem>\n</SegmentedControl>`,
    a11yContract: [
      'Renders role="tablist" with aria-selected on each Segment button.',
      "Provide an aria-label on SegmentedControl describing what the mode switch controls.",
    ],
    doAndDont: [
      {
        do: "Keep option labels concise (1 to 2 words) so items stay single-line.",
        dont: "Change font-weight on the selected SegmentedControlItem.",
      },
      {
        do: "Keep item count between 2 and 5 options per control.",
        dont: "Wrap multi-row tag clouds into SegmentedControl.",
      },
    ],
    slotsAndPairing:
      "Uses unique layoutId per instance so multiple switchers on one page never collide during spring transitions.",
    exampleExport: "SegmentedControlExample",
    exampleFile: EXAMPLE_FILE,
  },

  "theme-toggle": {
    slug: "theme-toggle",
    definingConstraint:
      "Switches document light and dark colour classes while temporarily disabling CSS transitions so sibling surfaces do not smear across themes.",
    whenToUse: [
      "Top navigation bars, settings headers, or workbench rails offering instant polarity switching.",
      "Restoring persistent dark or light class selection synchronised across sessions.",
    ],
    whenNotToUse: [
      {
        primitive: "switch",
        reason: "Use Switch for generic boolean preferences inside forms.",
      },
      {
        primitive: "segmented-control",
        reason: "Use SegmentedControl when exposing three modes such as Light, Dark, and System.",
      },
    ],
    anatomy: `<ThemeToggle isDark={isDark} onToggleDark={setIsDark} />`,
    a11yContract: [
      "Declares explicit descriptive aria-label reflecting the next colour theme action.",
      "Supports keyboard Space/Enter toggling with clear focus ring visibility.",
    ],
    doAndDont: [
      {
        do: "Connect onToggleDark to a root theme controller managing the dark class.",
        dont: "Render ThemeToggle without synchronising initial dark class state.",
      },
      {
        do: "Place in consistent top-right utility chrome alongside command triggers.",
        dont: "Repeat multiple conflicting ThemeToggle instances on the same toolbar.",
      },
    ],
    slotsAndPairing:
      "Pairs beside Command triggers inside NavigationBar actions with matching height (size-9).",
    exampleExport: "ThemeToggleExample",
    exampleFile: EXAMPLE_FILE,
  },

  toggle: {
    slug: "toggle",
    definingConstraint:
      "Maintains identical perimeter geometry across pressed and unpressed states using background surface contrast and aria-pressed semantics.",
    whenToUse: [
      "Independent two-state toolbar buttons such as Bold, Italic, Pin, or Mute.",
      "Immediate active/inactive mode switches without form submit steps.",
    ],
    whenNotToUse: [
      {
        primitive: "switch",
        reason: "Use Switch when labelling a settings option row with on/off meaning.",
      },
      {
        primitive: "button",
        reason: "Use Button for one-shot commands rather than stateful latching controls.",
      },
    ],
    anatomy: `<Toggle pressed={muted} onPressedChange={setMuted} variant="outline" aria-label="Mute alerts">\n  Muted\n</Toggle>`,
    a11yContract: [
      "Communicates boolean latched state automatically via Base UI aria-pressed.",
      "Requires explicit aria-label when rendering icon-only toggle content.",
    ],
    doAndDont: [
      {
        do: "Use outline or surface variants on busy backgrounds for clear active separation.",
        dont: "Shift padding or border width between pressed and unpressed visual states.",
      },
      {
        do: "Supply controlled pressed + onPressedChange props when synced to external state.",
        dont: "Use Toggle as a primary page navigation link.",
      },
    ],
    slotsAndPairing:
      "Combines cleanly inside ToggleGroup or Toolbar containers with explicit size={14} or size={16} icons.",
    exampleExport: "ToggleExample",
    exampleFile: EXAMPLE_FILE,
  },

  "toggle-group": {
    slug: "toggle-group",
    definingConstraint:
      "Distributes shared variant and size context plus roving arrow-key navigation across a related set of Toggle buttons.",
    whenToUse: [
      "Grouping 2 to 5 compact formatting or alignment options (left, centre, right).",
      "Allowing either single or multiple simultaneous active toggle flags in a compact bar.",
    ],
    whenNotToUse: [
      {
        primitive: "segmented-control",
        reason: "Use SegmentedControl for sliding pill single-view switchers.",
      },
      {
        primitive: "radio-group",
        reason: "Use RadioGroup inside labelled forms.",
      },
    ],
    anatomy: `<ToggleGroup value={align} onValueChange={setAlign} variant="surface">\n  <Toggle value="left" aria-label="Align left" />\n  <Toggle value="center" aria-label="Align centre" />\n</ToggleGroup>`,
    a11yContract: [
      "Provides arrow-key roving focus across child Toggle items inside one tab stop.",
      "Every icon-only child Toggle must declare an explicit aria-label.",
    ],
    doAndDont: [
      {
        do: "Pass string value keys to each child Toggle inside ToggleGroup.",
        dont: "Mix unrelated navigation links inside a ToggleGroup.",
      },
      {
        do: 'Set variant="surface" to frame subtle groups cleanly inside inspector panes.',
        dont: "Omit aria-label on text-free formatting buttons.",
      },
    ],
    slotsAndPairing: "Children read size and variant automatically through ToggleGroup context.",
    exampleExport: "ToggleGroupExample",
    exampleFile: EXAMPLE_FILE,
  },

  toolbar: {
    slug: "toolbar",
    definingConstraint:
      "Unifies multiple button groups, links, and toggle clusters into a single composite ARIA toolbar with single-tab-stop arrow navigation.",
    whenToUse: [
      "Desktop canvas action rails combining standalone action buttons, separators, and inline toggles.",
      "Editor headers grouping related formatting and alignment controls.",
    ],
    whenNotToUse: [
      {
        primitive: "markdown-toolbar",
        reason: "Use MarkdownToolbar specifically when editing Markdown strings.",
      },
      {
        primitive: "navigation-bar",
        reason: "Use NavigationBar for global site route headers and flyout menus.",
      },
    ],
    anatomy: `<Toolbar aria-label="Canvas actions">\n  <ToolbarGroup>\n    <ToolbarButton aria-label="Inspect">Inspect</ToolbarButton>\n  </ToolbarGroup>\n  <ToolbarSeparator />\n  <ToolbarToggleGroup>\n    <ToolbarToggleItem value="grid">Grid</ToolbarToggleItem>\n  </ToolbarToggleGroup>\n</Toolbar>`,
    a11yContract: [
      'Declares role="toolbar" with horizontal or vertical arrow navigation via Base UI.',
      "Include an explicit aria-label describing the toolbar scope.",
    ],
    doAndDont: [
      {
        do: "Divide unrelated control clusters using ToolbarSeparator inside Flex rows.",
        dont: "Cram full form inputs inside compact floating toolbars without labels.",
      },
      {
        do: 'Use variant="floating" with glass styling only above active work canvases.',
        dont: "Use raw native button tags inside Toolbar when ToolbarButton keeps focus roving.",
      },
    ],
    slotsAndPairing:
      "Houses ToolbarGroup, ToolbarButton, ToolbarLink, ToolbarSeparator, ToolbarToggleGroup, and ToolbarToggleItem.",
    exampleExport: "ToolbarExample",
    exampleFile: EXAMPLE_FILE,
  },
};
