import type { ComponentSpec } from "@/docs/schema";

const EXAMPLE_FILE = "src/docs/examples/forms-input.tsx";

export const formsInputSpecs: Record<string, ComponentSpec> = {
  checkbox: {
    slug: "checkbox",
    definingConstraint:
      "Expands hit area with an invisible 44px touch target around a crisp rounded indicator supporting checked, unchecked, and indeterminate states.",
    whenToUse: [
      "Multi-select option lists, table row selection, or opt-in policy acknowledgements inside forms.",
      "Parent-child selection trees requiring an indeterminate mixed state.",
    ],
    whenNotToUse: [
      {
        primitive: "switch",
        reason: "Use Switch for immediate system settings that take effect without a Save button.",
      },
      {
        primitive: "radio-group",
        reason: "Use RadioGroup when only one option from a small list can be selected.",
      },
    ],
    anatomy: `<label className="inline-flex items-center gap-2.5">\n  <Checkbox checked={agreed} onCheckedChange={setAgreed} />\n  <span>Accept terms</span>\n</label>`,
    a11yContract: [
      "Always pair Checkbox with a wrapping <label>, aria-labelledby, or explicit aria-label.",
      'Supports Space key toggling and indeterminate aria-checked="mixed" state.',
    ],
    doAndDont: [
      {
        do: "Provide an explicit indeterminate prop on select-all parent checkboxes.",
        dont: "Render bare Checkbox inputs without clickable label association.",
      },
      {
        do: "Preserve generous vertical spacing (gap-2.5+) so 44px touch targets never overlap.",
        dont: "Use Checkbox when only one mutual exclusion choice is permitted.",
      },
    ],
    slotsAndPairing:
      "Composes naturally inside Field wrappers alongside FieldLabel and FieldDescription.",
    exampleExport: "CheckboxExample",
    exampleFile: EXAMPLE_FILE,
  },

  combobox: {
    slug: "combobox",
    definingConstraint:
      "Pairs a filterable text input with a headless Base UI listbox popup supporting keyboard type-ahead and empty state feedback.",
    whenToUse: [
      "Choosing one or more options from large sets (more than 10 items) where users type to filter.",
      "Country pickers, model selectors, or filterable tag selectors.",
    ],
    whenNotToUse: [
      {
        primitive: "select",
        reason:
          "Use Select when there are 5 to 12 familiar options that do not need text filtering.",
      },
      {
        primitive: "command",
        reason: "Use Command for global modal application command palettes (⌘K).",
      },
    ],
    anatomy: `<Combobox items={frameworks} value={value} onValueChange={setValue}>\n  <ComboboxInput aria-label="Select framework" placeholder="Search..." />\n  <ComboboxContent>\n    <ComboboxList>\n      <ComboboxItem value="React">React</ComboboxItem>\n      <ComboboxEmpty>No matches found.</ComboboxEmpty>\n    </ComboboxList>\n  </ComboboxContent>\n</Combobox>`,
    a11yContract: [
      'ComboboxInput exposes role="combobox" with aria-expanded and aria-controls managed by Base UI.',
      "Provide a visible label or aria-label directly on ComboboxInput.",
    ],
    doAndDont: [
      {
        do: "Include ComboboxEmpty inside ComboboxList so filtered zero-result states are announced.",
        dont: "Omit the value prop on ComboboxItem when binding array options.",
      },
      {
        do: "Use ComboboxGroup and ComboboxGroupLabel when options span distinct categories.",
        dont: "Render Combobox for a binary choice where Switch or RadioGroup is clearer.",
      },
    ],
    slotsAndPairing:
      "Accepts string arrays or structured objects passed via items alongside Field validation wrappers.",
    exampleExport: "ComboboxExample",
    exampleFile: EXAMPLE_FILE,
  },

  field: {
    slug: "field",
    definingConstraint:
      "Connects accessible label, input control, helper description, and min-h-[1lh] error slots under shared Base UI invalid state IDs.",
    whenToUse: [
      "Every form control requiring a visible label, validation message, or supporting hint.",
      "Preventing vertical page jumps when error states toggle between valid and invalid.",
    ],
    whenNotToUse: [
      {
        primitive: "callout",
        reason: "Use Callout for page-level banners rather than per-input validation.",
      },
    ],
    anatomy: `<Field invalid={Boolean(error)}>\n  <FieldLabel requiredIndicator>Workspace Slug</FieldLabel>\n  <Input value={slug} onChange={...} />\n  <FieldDescription>Lowercase URL identifier.</FieldDescription>\n  <FieldError match={Boolean(error)}>{error}</FieldError>\n</Field>`,
    a11yContract: [
      "Binds label htmlFor and aria-describedby automatically between FieldLabel, control, and FieldError.",
      "Reserves vertical baseline height via min-h-[1lh] so dynamic errors avoid CLS.",
    ],
    doAndDont: [
      {
        do: "Pass requiredIndicator on FieldLabel rather than appending raw colour asterisks manually.",
        dont: "Place unrelated submit buttons directly inside the Field column without spacing.",
      },
      {
        do: "Use FieldError match={true} (or boolean condition) for synchronous validation copy.",
        dont: "Hide invalid state solely with red borders; always supply descriptive FieldError prose.",
      },
    ],
    slotsAndPairing:
      "Coordinates Input, Textarea, Select, Combobox, and Checkbox with FieldLabel, FieldDescription, and FieldError.",
    exampleExport: "FieldExample",
    exampleFile: EXAMPLE_FILE,
  },

  "file-upload": {
    slug: "file-upload",
    definingConstraint:
      "Validates accepted MIME types and maximum byte size client-side inside an accessible drag-and-drop region backed by a visually hidden file input.",
    whenToUse: [
      "Uploading JSON token themes, CSV datasets, images, or PDF reports with client validation.",
      "Accepting dropped assets alongside explicit file dialogue fallback buttons.",
    ],
    whenNotToUse: [
      {
        primitive: "input",
        reason: "Use standard Input for short text strings or URLs.",
      },
    ],
    anatomy: `<FileUpload title="Drop token preset" description="JSON files up to 5MB" accept=".json" onFilesSelected={handleFiles} />`,
    a11yContract: [
      "Provides keyboard-focusable button/dropzone activation plus explicit aria-label support.",
      "Validation errors announce clearly without silently swallowing rejected files.",
    ],
    doAndDont: [
      {
        do: "Specify concrete accept filters and maxSize limits matching backend limits.",
        dont: "Leave uploaded file names invisible after selection.",
      },
      {
        do: "Display explicit unit constraints in description copy.",
        dont: "Require drag-and-drop only; always preserve click/keyboard file dialogue fallback.",
      },
    ],
    slotsAndPairing:
      "Pairs with Progress bars when uploading multi-megabyte bundles asynchronously.",
    exampleExport: "FileUploadExample",
    exampleFile: EXAMPLE_FILE,
  },

  input: {
    slug: "input",
    definingConstraint:
      "Maintains a minimum 16px base font size on mobile viewports (<640px) to stop iOS Safari auto-zoom while hugging focus rings cleanly at 1px.",
    whenToUse: [
      "Single-line text, email, search, API key, or numeric form entry.",
      "Search fields enhanced with leftIcon, rightIcon, prefixText, or suffixText add-ons.",
    ],
    whenNotToUse: [
      {
        primitive: "textarea",
        reason: "Use Textarea for multi-line prose, notes, or JSON payloads.",
      },
      {
        primitive: "input-otp",
        reason: "Use InputOTP for fixed-length SMS or authenticator verification codes.",
      },
      {
        primitive: "stepper",
        reason: "Use Stepper when users increment small integer counters step by step.",
      },
    ],
    anatomy: `<Input inputSize="default" leftIcon={<SearchIcon size={16} />} placeholder="Search tokens..." />`,
    a11yContract: [
      "Bind an explicit FieldLabel or aria-label; never rely solely on placeholder text as a label.",
      "Sets aria-invalid automatically when error prop is true.",
    ],
    doAndDont: [
      {
        do: "Pass numeric size={16} (default) or size={14} (sm) on leftIcon and rightIcon icons.",
        dont: "Force text-xs on mobile inputs where 16px zoom protection is required.",
      },
      {
        do: "Wrap with Field and FieldError for structured validation.",
        dont: "Combine prefixText with cramped padding that clips long prefixes.",
      },
    ],
    slotsAndPairing:
      "Supports inputSize (sm, default, lg), leftIcon, rightIcon, prefixText, and suffixText.",
    exampleExport: "InputExample",
    exampleFile: EXAMPLE_FILE,
  },

  "input-otp": {
    slug: "input-otp",
    definingConstraint:
      "Renders visual individual PIN character boxes over a single hidden accessible text input supporting one-paste autofill across all slots.",
    whenToUse: [
      "Two-factor authenticator codes, email verification PINs, or SMS 6-digit passcodes.",
      "Structured fixed-length token verification flows supporting clipboard auto-fill.",
    ],
    whenNotToUse: [
      {
        primitive: "input",
        reason: "Use standard Input for freeform passwords, usernames, or promo codes.",
      },
    ],
    anatomy: `<InputOTP maxLength={6} aria-label="Verification code">\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    <InputOTPSlot index={1} />\n    <InputOTPSlot index={2} />\n  </InputOTPGroup>\n  <InputOTPSeparator />\n  <InputOTPGroup>\n    <InputOTPSlot index={3} />\n    <InputOTPSlot index={4} />\n    <InputOTPSlot index={5} />\n  </InputOTPGroup>\n</InputOTP>`,
    a11yContract: [
      "Single underlying textbox exposes complete value for screen readers and password managers.",
      "Requires explicit aria-label or wrapping <label>.",
    ],
    doAndDont: [
      {
        do: "Match total InputOTPSlot indices sequentially from 0 to maxLength - 1.",
        dont: "Render separate HTML <input> tags that break clipboard paste and backspace stepping.",
      },
      {
        do: "Separate 6-digit groups visually with InputOTPSeparator for scannability.",
        dont: "Use InputOTP for variable-length secrets or recovery passphrases.",
      },
    ],
    slotsAndPairing: "Group slots inside InputOTPGroup pairs divided by InputOTPSeparator.",
    exampleExport: "InputOTPExample",
    exampleFile: EXAMPLE_FILE,
  },

  "radio-group": {
    slug: "radio-group",
    definingConstraint:
      "Enforces single-choice mutual exclusion across visible options with arrow-key roving focus and a smooth spring indicator dot.",
    whenToUse: [
      "Comparing 2 to 5 mutually exclusive choices where seeing all option descriptions side by side helps.",
      "Billing tier selection, export formats, or deployment regions inside forms.",
    ],
    whenNotToUse: [
      {
        primitive: "select",
        reason: "Use Select when more than 5 options would clutter the layout.",
      },
      {
        primitive: "segmented-control",
        reason: "Use SegmentedControl for immediate UI view switching outside form submission.",
      },
    ],
    anatomy: `<RadioGroup value={plan} onValueChange={setPlan} aria-label="Plan tier">\n  <label className="flex items-center gap-2">\n    <RadioGroupItem value="starter" />\n    <span>Starter</span>\n  </label>\n</RadioGroup>`,
    a11yContract: [
      "Arrow Up/Down/Left/Right keys move selection cleanly within one tab stop.",
      "Declare aria-label or FieldLabel on RadioGroup and pair every RadioGroupItem with a label.",
    ],
    doAndDont: [
      {
        do: "Wrap each RadioGroupItem and its caption in a clickable <label>.",
        dont: "Allow unselected empty initial state unless no sensible default exists.",
      },
      {
        do: "Use Checkbox instead when multiple items may be selected simultaneously.",
        dont: "Nest clickable links inside clickable radio row labels.",
      },
    ],
    slotsAndPairing: "Works smoothly inside Field wrappers or Card option rows.",
    exampleExport: "RadioGroupExample",
    exampleFile: EXAMPLE_FILE,
  },

  select: {
    slug: "select",
    definingConstraint:
      "Built on headless Base UI Select primitives with liquid glass overlay elevation and keyboard type-ahead selection without native browser inconsistencies.",
    whenToUse: [
      "Selecting one fixed value from 5 to 15 compact choices inside forms or toolbars.",
      "Choosing environment targets, locales, or categorical form fields without text search.",
    ],
    whenNotToUse: [
      {
        primitive: "combobox",
        reason: "Use Combobox when users need live text filtering over long option lists.",
      },
      {
        primitive: "radio-group",
        reason: "Use RadioGroup when 2 to 4 choices benefit from being visible upfront.",
      },
      {
        primitive: "dropdown-menu",
        reason: "Use DropdownMenu for triggering commands rather than picking a form value.",
      },
    ],
    anatomy: `<Select value={region} onValueChange={setRegion}>\n  <SelectTrigger aria-label="Deployment region">\n    <SelectValue placeholder="Choose region" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="lon">London (eu-west-2)</SelectItem>\n  </SelectContent>\n</Select>`,
    a11yContract: [
      'Trigger exposes aria-haspopup="listbox" and active item selection.',
      "Supply explicit aria-label or associated FieldLabel on SelectTrigger.",
    ],
    doAndDont: [
      {
        do: "Group large categories cleanly with SelectGroup and SelectGroupLabel.",
        dont: "Nest a custom <Button> inside SelectTrigger; SelectTrigger renders its own button.",
      },
      {
        do: "Provide concise placeholders inside SelectValue when uncontrolled or nullable.",
        dont: "Use Select for 2 boolean choices where Switch or SegmentedControl fits better.",
      },
    ],
    slotsAndPairing:
      "Composes with SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectGroupLabel, and SelectItem.",
    exampleExport: "SelectExample",
    exampleFile: EXAMPLE_FILE,
  },

  slider: {
    slug: "slider",
    definingConstraint:
      "Locks track height while gliding single or dual thumbs along direct pointer scrub gestures with tabular numeric value readouts.",
    whenToUse: [
      "Adjusting continuous numeric coordinates such as OKLCH lightness, chroma, opacity, or min/max price ranges.",
      "Interactive visual inspection controls where live preview feedback responds immediately.",
    ],
    whenNotToUse: [
      {
        primitive: "stepper",
        reason: "Use Stepper when users increment discrete integer quantities accurately by +1/-1.",
      },
      {
        primitive: "input",
        reason: "Use Input when exact typed digits matter more than visual scrub speed.",
      },
    ],
    anatomy: `<Slider aria-label="Chroma intensity" value={chroma} onValueChange={setChroma} min={0} max={100} />`,
    a11yContract: [
      'Exposes role="slider" with aria-valuemin, aria-valuemax, and aria-valuenow.',
      "Keyboard arrow keys increment cleanly by step size; requires aria-label or FieldLabel.",
    ],
    doAndDont: [
      {
        do: "Pair numeric displays alongside Sliders with tabular-nums to prevent jitter while dragging.",
        dont: "Use Slider for massive ranges (0 to 1,000,000) without coarse steps or numeric input.",
      },
      {
        do: "Pass two-element tuple array for dual-thumb range selection.",
        dont: "Alter track height across hover or active drag states.",
      },
    ],
    slotsAndPairing:
      "Pairs naturally with FieldLabel + tabular-nums telemetry readout inside split studios.",
    exampleExport: "SliderExample",
    exampleFile: EXAMPLE_FILE,
  },

  stepper: {
    slug: "stepper",
    definingConstraint:
      "Combines hold-to-accelerate increment/decrement repeat buttons with a tabular sliding NumberTicker readout so multi-digit transitions never shift layout.",
    whenToUse: [
      "Adjusting discrete counts such as seat count, retry attempts, or replica counts.",
      "Spin-button numeric inputs benefiting from hold-to-accelerate progression.",
    ],
    whenNotToUse: [
      {
        primitive: "slider",
        reason: "Use Slider for fast continuous percentage or coordinate tuning.",
      },
      {
        primitive: "input",
        reason: "Use Input when users type arbitrary numbers such as ports or prices.",
      },
    ],
    anatomy: `<Stepper value={replicas} onValueChange={setReplicas} min={1} max={16}>\n  <Stepper.Decrement aria-label="Decrease replicas" />\n  <Stepper.Value />\n  <Stepper.Increment aria-label="Increase replicas" />\n</Stepper>`,
    a11yContract: [
      "Both Stepper.Decrement and Stepper.Increment must carry explicit aria-label strings.",
      "Disables boundary buttons automatically when value hits min or max limits.",
    ],
    doAndDont: [
      {
        do: "Set realistic min, max, and step bounds matching domain validation.",
        dont: "Omit aria-label on icon increment/decrement buttons.",
      },
      {
        do: "Use compound Stepper.Decrement / Stepper.Value / Stepper.Increment sub-components.",
        dont: "Replace Stepper.Value with unaligned non-tabular spans.",
      },
    ],
    slotsAndPairing:
      "Supports compound dot notation (`Stepper.Decrement`, `Stepper.Value`, `Stepper.Increment`).",
    exampleExport: "StepperExample",
    exampleFile: EXAMPLE_FILE,
  },

  switch: {
    slug: "switch",
    definingConstraint:
      "Pairs an instant spring thumb travel inside a 44px accessible touch target with subtle active pill elongation on pointerdown.",
    whenToUse: [
      "Immediate on/off settings toggles that apply live without submitting a form.",
      "Preference rows pairing concise labels with binary system feature flags.",
    ],
    whenNotToUse: [
      {
        primitive: "checkbox",
        reason: "Use Checkbox inside forms that commit only on submit or in multi-select lists.",
      },
      {
        primitive: "toggle",
        reason: "Use Toggle inside compact icon toolbars.",
      },
    ],
    anatomy: `<label className="inline-flex items-center gap-3">\n  <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Live contrast gate" />\n  <span>Live Contrast Gate</span>\n</label>`,
    a11yContract: [
      'Exposes role="switch" and aria-checked state via Base UI.',
      "Always pair with a visible label and explicit aria-label.",
    ],
    doAndDont: [
      {
        do: 'Name the setting clearly so "on" vs "off" state is unmistakable without reading "Disabled".',
        dont: "Pair Switch with a Save button when changes take effect later; use Checkbox instead.",
      },
      {
        do: "Keep label wording positive rather than negated phrases like Disable telemetry.",
        dont: "Shrink Switch hit targets below 44px touch clearance.",
      },
    ],
    slotsAndPairing: "Works well inside Card rows, Sheet preference drawers, and settings tables.",
    exampleExport: "SwitchExample",
    exampleFile: EXAMPLE_FILE,
  },

  textarea: {
    slug: "textarea",
    definingConstraint:
      "Preserves flush 1px border-hugging focus contrast and mobile 16px zoom protection across arbitrary multi-line prose heights.",
    whenToUse: [
      "Comments, system prompts, multi-line release notes, or structured descriptions.",
      "Markdown authoring areas paired directly beneath MarkdownToolbar.",
    ],
    whenNotToUse: [
      {
        primitive: "input",
        reason: "Use Input for single-line values such as titles or email addresses.",
      },
    ],
    anatomy: `<Field>\n  <FieldLabel>Release Summary</FieldLabel>\n  <Textarea rows={4} placeholder="Summarise architectural changes..." />\n</Field>`,
    a11yContract: [
      "Bind an explicit FieldLabel or aria-label; never use placeholder alone as the field label.",
      "Respects aria-invalid and disabled attributes directly via native and Base UI attributes.",
    ],
    doAndDont: [
      {
        do: "Specify sensible initial rows (3 to 6) matching expected input length.",
        dont: "Disable vertical manual resize unless the container layout strictly manages height.",
      },
      {
        do: "Pair directly below MarkdownToolbar when editing rich Markdown.",
        dont: "Force users into a tiny one-line Input when multi-sentence input is expected.",
      },
    ],
    slotsAndPairing: "Composes directly with Field, FieldLabel, FieldError, and MarkdownToolbar.",
    exampleExport: "TextareaExample",
    exampleFile: EXAMPLE_FILE,
  },
};
