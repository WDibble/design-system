import type { ComponentSpec } from "@/docs/schema";

const EXAMPLE_FILE = "src/docs/examples/data-feedback.tsx";

export const dataFeedbackSpecs: Record<string, ComponentSpec> = {
  accordion: {
    slug: "accordion",
    definingConstraint:
      "Expands and collapses vertical disclosure panels smoothly via CSS height transitions under Base UI ARIA keyboard controls.",
    whenToUse: [
      "FAQs, collapsible inspector subsections, or compact mobile configuration groups.",
      "Progressive disclosure blocks allowing multiple peer panels open simultaneously.",
    ],
    whenNotToUse: [
      {
        primitive: "tabs",
        reason: "Use Tabs when switching horizontally across parallel content views.",
      },
    ],
    anatomy: `<Accordion defaultValue={["item-1"]}>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Quiet Chrome</AccordionTrigger>\n    <AccordionContent>Typography and whitespace replace card noise.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    a11yContract: [
      "Trigger manages aria-expanded and links aria-controls to AccordionContent automatically.",
      "Arrow Up/Down and Home/End navigate cleanly across AccordionItem headers.",
    ],
    doAndDont: [
      {
        do: "Provide unique string value keys on every AccordionItem.",
        dont: "Place full primary forms inside deeply nested accordions where validation errors hide when collapsed.",
      },
      {
        do: "Use AccordionHeader inside custom item compositions to preserve heading structure.",
        dont: "Trigger abrupt layout height changes with custom display:none overrides on AccordionContent.",
      },
    ],
    slotsAndPairing:
      "Composes Accordion, AccordionItem, AccordionHeader, AccordionTrigger, and AccordionContent.",
    exampleExport: "AccordionExample",
    exampleFile: EXAMPLE_FILE,
  },

  avatar: {
    slug: "avatar",
    definingConstraint:
      "Deterministically computes harmonious OKLCH fallback colours from initials while cleanly supporting presence pips and overlapping AvatarGroup stacks.",
    whenToUse: [
      "Team member identity badges, commit actor nodes, comment headers, and presence bars.",
      "Compact collaborator groups with deterministic fallback monograms.",
    ],
    whenNotToUse: [
      {
        primitive: "badge",
        reason: "Use Badge for short system status pills rather than user identity.",
      },
      {
        primitive: "image",
        reason: "Use ProgressiveImage for rectangular content imagery and hero frames.",
      },
    ],
    anatomy: `<Avatar size="default">\n  <AvatarFallback autoColor>WD</AvatarFallback>\n  <AvatarBadge status="online" />\n</Avatar>`,
    a11yContract: [
      "AvatarImage must supply meaningful alt text naming the person or organisation.",
      "AvatarBadge exposes status meaning without relying solely on colour.",
    ],
    doAndDont: [
      {
        do: "Enable autoColor on AvatarFallback for consistent per-user OKLCH background hue.",
        dont: "Squeeze full full-name sentences into two-letter fallback initials.",
      },
      {
        do: "Use AvatarGroup when rendering 2 to 5 overlapping team collaborators.",
        dont: "Render Avatar without fallback initials when image URLs can fail or lag.",
      },
    ],
    slotsAndPairing: "Pairs AvatarImage, AvatarFallback, AvatarBadge, and AvatarGroup.",
    exampleExport: "AvatarExample",
    exampleFile: EXAMPLE_FILE,
  },

  badge: {
    slug: "badge",
    definingConstraint:
      "Locks shrink-0 whitespace-nowrap operational pills with tabular numerals and optional resting-plateau pulse indicators; banned above titles as decorative eyebrow kickers.",
    whenToUse: [
      "Operational telemetry (`healthy`, `degraded`, version numbers, active counts, or Required form flags).",
      "Inline metadata tags pinned cleanly beside card titles or table row states.",
    ],
    whenNotToUse: [
      {
        primitive: "callout",
        reason: "Use Callout for multi-line rules or section notices rather than oversized pills.",
      },
      {
        primitive: "button",
        reason: "Use Button or Toggle when clicking triggers an action.",
      },
    ],
    anatomy: `<Badge variant="success" dot>Operational</Badge>`,
    a11yContract: [
      "Pairs colour intent (`success`, `warning`, `destructive`) with explicit text words.",
      'Pulse dot carries aria-hidden="true" so screen readers announce status text cleanly.',
    ],
    doAndDont: [
      {
        do: "Reserve Badge strictly for live status telemetry, versions, and compact counts.",
        dont: "Place decorative rounded-full eyebrow kicker pills above page or section headings.",
      },
      {
        do: "Keep title blocks min-w-0 flex-1 alongside Badge clusters so titles never squeeze badges.",
        dont: "Put long multi-word sentences inside a single Badge.",
      },
    ],
    slotsAndPairing:
      "Accepts variant (default, secondary, destructive, outline, success, warning), size (default, sm), and dot boolean.",
    exampleExport: "BadgeExample",
    exampleFile: EXAMPLE_FILE,
  },

  calendar: {
    slug: "calendar",
    definingConstraint:
      "Renders keyboard-navigable month grids with spring horizontal slide transitions and tabular-nums date cells, pairing directly with DatePicker popovers.",
    whenToUse: [
      "Scheduling views, release windows, filter date selection, and inline month calendars.",
      "Forms requiring visual day-of-week awareness via Calendar or DatePicker.",
    ],
    whenNotToUse: [
      {
        primitive: "input",
        reason:
          "Use Input for memorable dates like birth years where typing is faster than stepping backward by month.",
      },
    ],
    anatomy: `<Calendar selected={selectedDate} onSelect={setSelectedDate} />`,
    a11yContract: [
      "Exposes semantic calendar grid markup with full arrow-key date traversal.",
      "Month previous/next buttons declare explicit accessible aria-label attributes.",
    ],
    doAndDont: [
      {
        do: "Use DatePicker when date selection lives compactly inside a multi-field form.",
        dont: "Instantiate fresh new Date() inside React render props; hoist reference dates cleanly.",
      },
      {
        do: "Format tabular date labels consistently inside surrounding tables.",
        dont: "Remove contrast boundaries on the selected date cell.",
      },
    ],
    slotsAndPairing: "Exports both inline Calendar and popover-backed DatePicker.",
    exampleExport: "CalendarExample",
    exampleFile: EXAMPLE_FILE,
  },

  card: {
    slug: "card",
    definingConstraint:
      "Enforces mathematical concentric corner continuity via CardInner inside Card alongside subtle 1px specular rim lighting; avoid defaulting every layout to 3-card grids.",
    whenToUse: [
      "Bounded workspace modules, detail inspectors, or distinct nested settings panels.",
      "Bento showcase items pairing CardHeader chrome with concentric CardInner nesting.",
    ],
    whenNotToUse: [
      {
        primitive: "table",
        reason: "Use Table or ruled divide-y lists when presenting repetitive comparable entities.",
      },
      {
        primitive: "callout",
        reason: "Use Callout for semantic notices, warnings, and constraints.",
      },
    ],
    anatomy: `<Card>\n  <CardHeader>\n    <CardTitle>Cluster Node</CardTitle>\n    <CardDescription>Edge configuration status.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <CardInner>Inner concentric container</CardInner>\n  </CardContent>\n</Card>`,
    a11yContract: [
      "Preserve heading hierarchy by choosing valid heading levels around CardTitle (h3).",
      "Keep container query @container layout resilient down to 340px column width.",
    ],
    doAndDont: [
      {
        do: "Use CardInner for nested sub-surfaces so inner radius honours R_inner = max(0, R_outer - Padding).",
        dont: "Wrap every feature or metric inside reflexive 3-column bordered cards.",
      },
      {
        do: "Keep header badge clusters shrink-0 beside min-w-0 flex-1 titles.",
        dont: "Drop CardHeader padding arbitrarily when composing with CardContent.",
      },
    ],
    slotsAndPairing:
      "Composes Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, and CardInner.",
    exampleExport: "CardExample",
    exampleFile: EXAMPLE_FILE,
  },

  chart: {
    slug: "chart",
    definingConstraint:
      "Renders zero-dependency perceptual OKLCH SVG Sparklines, AreaCharts, and BarCharts scaled crisply with tabular metric axes.",
    whenToUse: [
      "Latency sparklines, throughput trendlines, contrast bounds, and daily activity bars.",
      "Telemetry panels needing lightweight OKLCH SVGs without external chart library overhead.",
    ],
    whenNotToUse: [
      {
        primitive: "table",
        reason: "Use Table when readers must look up and sort exact raw rows.",
      },
      {
        primitive: "diagram-frame",
        reason: "Use DiagramFrame for architecture flowcharts rather than quantitative charts.",
      },
    ],
    anatomy: `<AreaChart data={series} height={120} valueFormatter={(v) => \`\${v} ms\`} />`,
    a11yContract: [
      "Attach descriptive aria-label and readable axis valueFormatter units on charts.",
      "Do not convey trend meaning solely by colour; combine trend arrows, labels, or formatted tooltips.",
    ],
    doAndDont: [
      {
        do: "Supply consistent numeric valueFormatter units across tooltips and axis labels.",
        dont: "Import heavy external charting packages when Sparkline, AreaChart, or BarChart suffices.",
      },
      {
        do: "Keep data label strings concise so horizontal bars and ticks stay legible.",
        dont: "Omit height bounds on containers holding SVG charts.",
      },
    ],
    slotsAndPairing:
      "Exports Sparkline, AreaChart, and BarChart styled via semantic OKLCH CSS variables.",
    exampleExport: "ChartExample",
    exampleFile: EXAMPLE_FILE,
  },

  image: {
    slug: "image",
    definingConstraint:
      "Eliminates cumulative layout shift by locking aspectRatio geometry upfront and cross-fading smoothly once decoded.",
    whenToUse: [
      "Editorial photography, product screenshots, and media thumbnails inside cards or hero banners.",
      "Aspect-locked media panels guaranteeing zero layout shift during async image decoding.",
    ],
    whenNotToUse: [
      {
        primitive: "avatar",
        reason: "Use Avatar for circular user or organisation portraits.",
      },
      {
        primitive: "diagram-frame",
        reason: "Use DiagramFrame for interactive vector SVGs.",
      },
    ],
    anatomy: `<ProgressiveImage src={assetSrc} alt="Verified surface specimen" aspectRatio="16/9" />`,
    a11yContract: [
      'Always provide descriptive alt text explaining meaningful imagery, or empty alt="" with aria-hidden when decorative.',
      "Reserves intrinsic aspectRatio box prior to load for zero CLS.",
    ],
    doAndDont: [
      {
        do: "Specify explicit aspectRatio matching natural media framing.",
        dont: "Render broken external hotlinks or empty unlabelled <img> elements.",
      },
      {
        do: "Respect rounded concentric corners when embedding inside Card or CardInner.",
        dont: "Distort image proportions without object-cover clipping.",
      },
    ],
    slotsAndPairing:
      "Accepts aspectRatio, priority loading options, and concentric rounded container classes.",
    exampleExport: "ImageExample",
    exampleFile: EXAMPLE_FILE,
  },

  kbd: {
    slug: "kbd",
    definingConstraint:
      "Styles tactile hardware keycap hints with uniform baseline height and tabular monospace glyph spacing.",
    whenToUse: [
      "Documenting global keyboard shortcuts (`⌘K`, `⌘D`, `Escape`) inside buttons, menus, and docs.",
      "Communicating hotkeys alongside CommandPalette or NavigationBar triggers.",
    ],
    whenNotToUse: [
      {
        primitive: "badge",
        reason: "Use Badge for runtime status pills such as Active or v2.0.",
      },
      {
        primitive: "button",
        reason: "Use Button for clickable actions; Kbd is strictly non-interactive notation.",
      },
    ],
    anatomy: `<div className="inline-flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>D</Kbd></div>`,
    a11yContract: [
      "Renders semantic HTML <kbd> element for assistive tech shortcut discovery.",
      "Do not attach click handlers directly to bare Kbd spans.",
    ],
    doAndDont: [
      {
        do: "Place modifier and character keys in individual adjacent Kbd elements for clean alignment.",
        dont: "Mix operational status labels into Kbd pills.",
      },
      {
        do: "Verify documented keyboard shortcuts actually work in App key listeners.",
        dont: "Invent conflicting global shortcut bindings across features.",
      },
    ],
    slotsAndPairing: "Embeds cleanly inside CommandShortcut, Button hints, and DocArticle tables.",
    exampleExport: "KbdExample",
    exampleFile: EXAMPLE_FILE,
  },

  "number-ticker": {
    slug: "number-ticker",
    definingConstraint:
      "Interpolates numeric changes via calibrated spring deceleration while enforcing font-variant-numeric: tabular-nums so column digits never vibrate.",
    whenToUse: [
      "Live KPI telemetry counters, build pass totals, contrast score indicators, and odometer readouts.",
      "Tabular metric cards or Stepper value displays requiring smooth spring transitions.",
    ],
    whenNotToUse: [
      {
        primitive: "stepper",
        reason: "Use Stepper when users actively increment or decrement a numeric input.",
      },
      {
        primitive: "progress",
        reason: "Use Progress when visualising completion towards a 100% bound.",
      },
    ],
    anatomy: `<NumberTicker value={99.4} decimalPlaces={1} suffix="%" />`,
    a11yContract: [
      "Ensure the surrounding context or label states what metric the animated number measures.",
      "Respects prefers-reduced-motion automatically via CSS/Motion reduced motion rules.",
    ],
    doAndDont: [
      {
        do: "Pass consistent decimalPlaces matching the unit precision of the metric.",
        dont: "Drop tabular-nums around rolling counters placed beside action buttons.",
      },
      {
        do: "Pair synthetic demo counters strictly inside component tests or explicitly labelled workbench previews.",
        dont: "Fabricate unverified production marketing stats on landing pages.",
      },
    ],
    slotsAndPairing:
      "Combines with Table cells (numeric={true}), Card telemetry headers, and Stepper.",
    exampleExport: "NumberTickerExample",
    exampleFile: EXAMPLE_FILE,
  },

  progress: {
    slug: "progress",
    definingConstraint:
      "Translates percentage progress linearly or radially using compositor transforms rather than width reflows across smooth spring updates.",
    whenToUse: [
      "File uploads, build pipeline stages, and bounded completion indicators (`0` to `100`).",
      "Compact radial completion indicators using CircularProgress beside status labels.",
    ],
    whenNotToUse: [
      {
        primitive: "skeleton",
        reason:
          "Use Skeleton when awaiting unknown layout content instead of tracking percentage progress.",
      },
      {
        primitive: "slider",
        reason: "Use Slider for user-controllable value selection.",
      },
    ],
    anatomy: `<Progress value={72} aria-label="Bundle compilation" />`,
    a11yContract: [
      'Exposes role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax.',
      "Every Progress and CircularProgress instance must provide aria-label or aria-labelledby.",
    ],
    doAndDont: [
      {
        do: "Clamp values cleanly between 0 and max, or pass null/undefined for indeterminate loading.",
        dont: "Render Progress without an accessible label identifying the running operation.",
      },
      {
        do: "Use CircularProgress inside compact telemetry indicators and badges.",
        dont: "Spin static icons manually when CircularProgress indeterminate state exists.",
      },
    ],
    slotsAndPairing:
      "Exports linear Progress and CircularProgress side by side with tabular percentage text.",
    exampleExport: "ProgressExample",
    exampleFile: EXAMPLE_FILE,
  },

  resizable: {
    slug: "resizable",
    definingConstraint:
      "Coordinates keyboard-adjustable (Arrow keys) and pointer-draggable split panes with percentage persistence inside zero-scroll layout boundaries.",
    whenToUse: [
      "Side-by-side code and preview editors, log inspectors, and configurable split studios.",
      "Desktop engineering workbenches where users adjust panel proportions interactively.",
    ],
    whenNotToUse: [
      {
        primitive: "doc-layout",
        reason: "Use DocLayout for structured fixed-measure reading documentation columns.",
      },
    ],
    anatomy: `<ResizablePanelGroup direction="horizontal" defaultSizes={[45, 55]}>\n  <ResizablePanel order={0} defaultSize={45}>Controls</ResizablePanel>\n  <ResizableHandle handleIndex={0} withHandle />\n  <ResizablePanel order={1} defaultSize={55}>Stage</ResizablePanel>\n</ResizablePanelGroup>`,
    a11yContract: [
      'ResizableHandle renders role="separator" supporting focusable keyboard Arrow resizing.',
      "Always pair sequential order indices with matching handleIndex values.",
    ],
    doAndDont: [
      {
        do: "Include withHandle prop on primary workspace dividers for clear visual affordance.",
        dont: "Set defaultSizes arrays that do not sum to 100 across sibling ResizablePanels.",
      },
      {
        do: "Constrict minimum panel bounds cleanly to prevent crushed text below 30% width.",
        dont: "Force horizontal split panes below sm viewports without responsive stacking.",
      },
    ],
    slotsAndPairing: "Composes ResizablePanelGroup, ResizablePanel, and ResizableHandle.",
    exampleExport: "ResizableExample",
    exampleFile: EXAMPLE_FILE,
  },

  "scroll-area": {
    slug: "scroll-area",
    definingConstraint:
      "Provides uniform minimal custom scrollbars without disturbing content gutter symmetry across macOS, Windows, and Linux browsers.",
    whenToUse: [
      "Bounded lists, command drawers, preview trees, and sticky sidebar navigation panels.",
      "Compact scrollable regions preserving visual scrollbar styling across browsers.",
    ],
    whenNotToUse: [
      {
        primitive: "doc-layout",
        reason: "Let top-level document prose scroll naturally with the main browser viewport.",
      },
    ],
    anatomy: `<ScrollArea className="h-36 w-full rounded-xl border p-3">\n  <div className="space-y-2">...</div>\n  <ScrollBar orientation="vertical" />\n</ScrollArea>`,
    a11yContract: [
      "Preserves native wheel, touch, and keyboard scrollability without trapping page focus.",
      "Include explicit height/width constraints on ScrollArea so overflow activates cleanly.",
    ],
    doAndDont: [
      {
        do: "Pair matching ScrollBar orientation with vertical or horizontal scroll content.",
        dont: "Nest multiple nested ScrollArea containers directly inside each other unless necessary.",
      },
      {
        do: "Keep padding symmetrical inside scrollable containers.",
        dont: "Lock full-page primary articles inside tiny scrollable boxes.",
      },
    ],
    slotsAndPairing: "Pairs ScrollArea with optional horizontal or vertical ScrollBar tracks.",
    exampleExport: "ScrollAreaExample",
    exampleFile: EXAMPLE_FILE,
  },

  skeleton: {
    slug: "skeleton",
    definingConstraint:
      "Mirrors the exact target component geometry before hydration or async data resolves to maintain zero Cumulative Layout Shift (CLS).",
    whenToUse: [
      "Initial loading states matching exact card, text row, or avatar proportions.",
      "Async route transitions needing zero-CLS placeholders until streamed data arrives.",
    ],
    whenNotToUse: [
      {
        primitive: "progress",
        reason:
          "Use Progress when exact completion percentage of a known operation can be reported.",
      },
    ],
    anatomy: `<div className="flex items-center gap-3">\n  <Skeleton className="size-10 rounded-full" />\n  <div className="space-y-2">\n    <Skeleton className="h-4 w-40" />\n    <Skeleton className="h-3 w-24" />\n  </div>\n</div>`,
    a11yContract: [
      "Declares subtle loading semantics without flooding screen readers with redundant repetitive alerts.",
      "Honours prefers-reduced-motion automatically.",
    ],
    doAndDont: [
      {
        do: "Match skeleton dimensions identically to loaded UI baselines.",
        dont: "Render vague pulsing rectangles that fail to resemble final text/avatar rhythm.",
      },
      {
        do: "Replace skeletons cleanly without shifting adjacent controls.",
        dont: "Show Skeleton indicators for synchronous local computations.",
      },
    ],
    slotsAndPairing:
      "Sizes via utility classes matching Avatar, Badge, and text line-heights (`h-4`, `size-10`).",
    exampleExport: "SkeletonExample",
    exampleFile: EXAMPLE_FILE,
  },

  table: {
    slug: "table",
    definingConstraint:
      "Pairs quiet hairline row dividers and subtle sticky headers with numeric={true} right-aligned tabular-nums cells so dense columns align accurately.",
    whenToUse: [
      "Comparable multi-column datasets, token ledgers, telemetry metrics, and API audit trails.",
      "Structured rows combining tabular-nums metrics with aligned status badges.",
    ],
    whenNotToUse: [
      {
        primitive: "prop-table",
        reason: "Use PropTable when documenting component TypeScript props specifically.",
      },
      {
        primitive: "timeline",
        reason: "Use Timeline for narrative chronological event streams.",
      },
    ],
    anatomy: `<Table>\n  <TableHeader><TableRow><TableHead>Region</TableHead><TableHead numeric>Latency</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>eu-west-2</TableCell><TableCell numeric>14 ms</TableCell></TableRow></TableBody>\n</Table>`,
    a11yContract: [
      'Uses native <table>, <th scope="col">, and optional <TableCaption> landmarks.',
      "Outer wrapper declares overflow-x-auto for responsive horizontal safety without crushing columns.",
    ],
    doAndDont: [
      {
        do: "Pass numeric prop on both TableHead and matching TableCell columns holding numbers or metrics.",
        dont: "Mix variable-width proportional numbers inside numeric comparison columns.",
      },
      {
        do: "Keep Badge clusters shrink-0 inside table status cells.",
        dont: "Replace clean tables with cluttered 3-column card grids.",
      },
    ],
    slotsAndPairing:
      "Composes Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, and TableCaption.",
    exampleExport: "TableExample",
    exampleFile: EXAMPLE_FILE,
  },

  timeline: {
    slug: "timeline",
    definingConstraint:
      "Connects chronological milestones using compositor-pure pulse nodes and continuous vertical connector stems with zero paint-filter repaints.",
    whenToUse: [
      "Deployment pipelines, git commit histories, audit logs, and workflow execution traces.",
      "Ordered milestone feeds mixing avatar actors, commit hashes, and live status nodes.",
    ],
    whenNotToUse: [
      {
        primitive: "table",
        reason: "Use Table when comparing flat tabular fields across many uniform records.",
      },
      {
        primitive: "accordion",
        reason: "Use Accordion for static Q&A disclosure sections.",
      },
    ],
    anatomy: `<Timeline>\n  <TimelineItem>\n    <TimelineIndicator status="success" />\n    <TimelineConnector />\n    <TimelineContent>\n      <TimelineTitle>Checks Passed</TimelineTitle>\n      <TimelineDescription>61 test suites green.</TimelineDescription>\n    </TimelineContent>\n  </TimelineItem>\n</Timeline>`,
    a11yContract: [
      "Uses semantic list hierarchy connecting TimelineTitle and TimelineDescription cleanly.",
      "Avoids cramming dense multi-word strings into 28px indicator circles.",
    ],
    doAndDont: [
      {
        do: "Pair TimelineAvatarNode or TimelineCommitNode for rich actor/sha attribution cleanly inside stems.",
        dont: "Omit TimelineConnector between intermediate sequential steps.",
      },
      {
        do: "Place detailed logs in TimelineBody/TimelineDescription rather than inside indicator circles.",
        dont: "Animate non-compositor filter or layout properties on active pulse nodes.",
      },
    ],
    slotsAndPairing:
      "Exports TimelineItem, TimelineIndicator, TimelineConnector, TimelineContent, TimelineTitle, TimelineDescription, and node variants.",
    exampleExport: "TimelineExample",
    exampleFile: EXAMPLE_FILE,
  },

  tree: {
    slug: "tree",
    definingConstraint:
      "Renders recursive hierarchical file and symbol trees with spring branch expansion, explicit ARIA treeitem levels, and full arrow-key navigation.",
    whenToUse: [
      "File explorers, design token hierarchy browsers, and nested symbol directories.",
      "Expandable directory structures navigable with keyboard arrow keys.",
    ],
    whenNotToUse: [
      {
        primitive: "accordion",
        reason: "Use Accordion for flat one-level disclosure panels.",
      },
      {
        primitive: "breadcrumb",
        reason: "Use Breadcrumb for linear active path breadcrumbs.",
      },
    ],
    anatomy: `<Tree data={nodes} defaultExpandedIds={["src"]} onSelectNode={handleSelect} />`,
    a11yContract: [
      'Implements WAI-ARIA role="tree" and role="treeitem" with aria-expanded and aria-level attributes.',
      "Supports Arrow Up/Down/Left/Right keyboard node navigation.",
    ],
    doAndDont: [
      {
        do: "Pass stable unique id strings on every TreeNodeData item.",
        dont: "Reconstruct fresh random node IDs on every render cycle.",
      },
      {
        do: "Pre-expand critical first-level root folders via defaultExpandedIds for immediate orientation.",
        dont: "Deep-nest interactive controls recursively inside Tree node labels.",
      },
    ],
    slotsAndPairing:
      "Accepts TreeNodeData[] hierarchies with optional selection and expansion handlers.",
    exampleExport: "TreeExample",
    exampleFile: EXAMPLE_FILE,
  },
};
