// AUTO-GENERATED FILE BY scripts/build-docs.mjs. DO NOT EDIT MANUALLY.
// Run `npm run docs:build` after adding or modifying UI primitives, specs, OKLCH tokens, or skills.

export interface DocPropSpec {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface DocSiblingRule {
  primitive: string;
  reason: string;
}

export interface DocDoDontRule {
  do: string;
  dont: string;
}

export interface DocPrimitiveEntry {
  slug: string;
  name: string;
  category: string;
  path: string;
  docPath: string;
  summary: string;
  definingConstraint: string;
  whenToUse: string[];
  whenNotToUse: DocSiblingRule[];
  anatomy: string;
  a11yContract: string[];
  doAndDont: DocDoDontRule[];
  slotsAndPairing: string;
  exampleCode: string;
  dependencies: string[];
  exports: string[];
  variants: string[];
  sizes: string[];
  props: DocPropSpec[];
}

export interface DocTokenContrastPair {
  id: string;
  mode: "light" | "dark";
  label: string;
  foregroundToken: string;
  foregroundValue: string;
  backgroundToken: string;
  backgroundValue: string;
  context: string;
  wcag2Ratio: number;
  wcag2PassAA: boolean;
  apcaLc: number;
  absApcaLc: number;
  apcaPass: boolean;
  dualPassed: boolean;
}

export interface DocSkillEntry {
  name: string;
  path: string;
  version: string;
  description: string;
  tags: string[];
}

export interface DocMarkdownPage {
  slug: string;
  path: string;
  title: string;
  headings: string[];
  wordCount: number;
}

export interface DocsManifest {
  version: string;
  primitiveCount: number;
  iconCount: number;
  skillCount: number;
  categories: string[];
  primitives: DocPrimitiveEntry[];
  contrastPairs: DocTokenContrastPair[];
  skills: DocSkillEntry[];
  docsPages: DocMarkdownPage[];
}

export const docsManifest: DocsManifest = {
  version: "0.1.0",
  primitiveCount: 57,
  iconCount: 470,
  skillCount: 8,
  categories: [
    "Actions & Toggles",
    "Forms & Input",
    "Navigation & Menus",
    "Overlays & Surfaces",
    "Data & Feedback",
    "Documentation & Schematics",
  ],
  primitives: [
    {
      slug: "accordion",
      name: "Accordion",
      category: "Data & Feedback",
      path: "src/components/ui/accordion.tsx",
      docPath: "public/docs/components/accordion.md",
      summary: "Accessible vertical disclosure stack with smooth CSS height reveal.",
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
      anatomy:
        '<Accordion defaultValue={["item-1"]}>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Quiet Chrome</AccordionTrigger>\n    <AccordionContent>Typography and whitespace replace card noise.</AccordionContent>\n  </AccordionItem>\n</Accordion>',
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
      exampleCode:
        'import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";\n\nexport function AccordionExample() {\n  return (\n    <div className="w-full max-w-md">\n      <Accordion defaultValue={["q1"]}>\n        <AccordionItem value="q1">\n          <AccordionTrigger>What prevents button flicker during async loading?</AccordionTrigger>\n          <AccordionContent>\n            An invisible ghost footprint sizer locks horizontal bounds across idle and loading\n            states.\n          </AccordionContent>\n        </AccordionItem>\n        <AccordionItem value="q2">\n          <AccordionTrigger>Why interpolate gradients in OKLCH?</AccordionTrigger>\n          <AccordionContent>\n            Perceptual colour ramps maintain consistent lightness without sRGB grey midpoints.\n          </AccordionContent>\n        </AccordionItem>\n      </Accordion>\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "lucide-react", "react"],
      exports: [
        "Accordion",
        "AccordionContent",
        "AccordionHeader",
        "AccordionItem",
        "AccordionTrigger",
      ],
      variants: [],
      sizes: [],
      props: [],
    },
    {
      slug: "alert-dialog",
      name: "AlertDialog",
      category: "Overlays & Surfaces",
      path: "src/components/ui/alert-dialog.tsx",
      docPath: "public/docs/components/alert-dialog.md",
      summary: "High-friction confirmation modal requiring explicit user acknowledgement.",
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
      anatomy:
        '<AlertDialog>\n  <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>Revoke Key</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Revoke key?</AlertDialogTitle>\n      <AlertDialogDescription>Traffic using this token stops immediately.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Revoke Key</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>',
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
      exampleCode:
        'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";\nimport { buttonVariants } from "@/components/ui/button";\n\nexport function AlertDialogExample() {\n  return (\n    <AlertDialog>\n      <AlertDialogTrigger className={buttonVariants({ variant: "destructive", size: "sm" })}>\n        Revoke Deployment Token\n      </AlertDialogTrigger>\n      <AlertDialogContent>\n        <AlertDialogHeader>\n          <AlertDialogTitle>Revoke production token?</AlertDialogTitle>\n          <AlertDialogDescription>\n            Requests authenticating with this credential fail immediately.\n          </AlertDialogDescription>\n        </AlertDialogHeader>\n        <AlertDialogFooter>\n          <AlertDialogCancel>Cancel</AlertDialogCancel>\n          <AlertDialogAction>Revoke Token</AlertDialogAction>\n        </AlertDialogFooter>\n      </AlertDialogContent>\n    </AlertDialog>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "AlertDialog",
        "AlertDialogAction",
        "AlertDialogBackdrop",
        "AlertDialogCancel",
        "AlertDialogContent",
        "AlertDialogDescription",
        "AlertDialogFooter",
        "AlertDialogHeader",
        "AlertDialogPortal",
        "AlertDialogTitle",
        "AlertDialogTrigger",
      ],
      variants: [],
      sizes: [],
      props: [],
    },
    {
      slug: "avatar",
      name: "Avatar",
      category: "Data & Feedback",
      path: "src/components/ui/avatar.tsx",
      docPath: "public/docs/components/avatar.md",
      summary: "User identity emblem with deterministic OKLCH fallback and status pip.",
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
      anatomy:
        '<Avatar size="default">\n  <AvatarFallback autoColor>WD</AvatarFallback>\n  <AvatarBadge status="online" />\n</Avatar>',
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
      exampleCode:
        'import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";\n\nexport function AvatarExample() {\n  return (\n    <div className="flex items-center gap-4">\n      <Avatar>\n        <AvatarFallback autoColor>WD</AvatarFallback>\n        <AvatarBadge status="online" />\n      </Avatar>\n      <AvatarGroup>\n        <Avatar size="sm">\n          <AvatarFallback autoColor>AR</AvatarFallback>\n        </Avatar>\n        <Avatar size="sm">\n          <AvatarFallback autoColor>MK</AvatarFallback>\n        </Avatar>\n      </AvatarGroup>\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "class-variance-authority", "react"],
      exports: ["Avatar", "AvatarBadge", "AvatarFallback", "AvatarGroup", "AvatarImage"],
      variants: [],
      sizes: ["xs", "sm", "default", "lg", "xl"],
      props: [
        {
          name: "autoColor",
          type: "boolean",
          required: false,
          description: "Configures autoColor on Avatar.",
        },
        {
          name: "max",
          type: "number",
          required: false,
          description: "Configures max on Avatar.",
        },
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          required: false,
          description: "Configures size on Avatar.",
        },
        {
          name: "spacing",
          type: '"sm" | "default" | "lg"',
          required: false,
          description: "Configures spacing on Avatar.",
        },
        {
          name: "status",
          type: "PresenceStatus",
          required: false,
          description: "Configures status on Avatar.",
        },
      ],
    },
    {
      slug: "badge",
      name: "Badge",
      category: "Data & Feedback",
      path: "src/components/ui/badge.tsx",
      docPath: "public/docs/components/badge.md",
      summary: "Shrink-wrapped operational telemetry pill with optional pulse indicator.",
      definingConstraint:
        "Locks shrink-0 whitespace-nowrap operational pills with tabular numerals and optional resting-plateau pulse indicators; banned above titles as decorative eyebrow kickers.",
      whenToUse: [
        "Operational telemetry (`healthy`, `degraded`, version numbers, active counts, or Required form flags).",
        "Inline metadata tags pinned cleanly beside card titles or table row states.",
      ],
      whenNotToUse: [
        {
          primitive: "callout",
          reason:
            "Use Callout for multi-line rules or section notices rather than oversized pills.",
        },
        {
          primitive: "button",
          reason: "Use Button or Toggle when clicking triggers an action.",
        },
      ],
      anatomy: '<Badge variant="success" dot>Operational</Badge>',
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
      exampleCode:
        'import { Badge } from "@/components/ui/badge";\n\nexport function BadgeExample() {\n  return (\n    <div className="flex flex-wrap items-center gap-2">\n      <Badge variant="default">v2.0</Badge>\n      <Badge variant="success" dot>\n        Operational\n      </Badge>\n      <Badge variant="warning">Threshold</Badge>\n      <Badge variant="outline">57 Primitives</Badge>\n    </div>\n  );\n}',
      dependencies: ["class-variance-authority", "react"],
      exports: ["Badge", "badgeVariants"],
      variants: ["default", "secondary", "destructive", "outline", "success", "warning"],
      sizes: ["default", "sm"],
      props: [
        {
          name: "dot",
          type: "boolean",
          required: false,
          description: "Configures dot on Badge.",
        },
      ],
    },
    {
      slug: "breadcrumb",
      name: "Breadcrumb",
      category: "Navigation & Menus",
      path: "src/components/ui/breadcrumb.tsx",
      docPath: "public/docs/components/breadcrumb.md",
      summary: "Hierarchical location trail with kinetic directional separators.",
      definingConstraint:
        'Clarifies hierarchy levels cleanly without overflowing horizontal bars, marking the final destination with aria-current="page" instead of a link.',
      whenToUse: [
        "Deep nested views, component reference pages, or file hierarchy detail screens.",
        "Orienting users two or more levels below top-level navigation.",
      ],
      whenNotToUse: [
        {
          primitive: "navigation-bar",
          reason: "Use NavigationBar for global site-wide primary route links.",
        },
        {
          primitive: "tabs",
          reason: "Use Tabs for switching between peer panels at the same hierarchy level.",
        },
      ],
      anatomy:
        '<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Primitives</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>',
      a11yContract: [
        'Wraps items inside semantic <nav aria-label="Breadcrumb"> and <ol> landmark markup.',
        'Final active leaf uses BreadcrumbPage with aria-current="page" rather than an anchor.',
      ],
      doAndDont: [
        {
          do: "Keep breadcrumb step titles identical to target page headings.",
          dont: "Display a single-level Breadcrumb with only Home on top-level landing pages.",
        },
        {
          do: "Collapse distant middle segments cleanly with BreadcrumbEllipsis when paths exceed 4 steps.",
          dont: "Turn Breadcrumb separators into clickable focusable buttons.",
        },
      ],
      slotsAndPairing:
        "Composes cleanly in DocArticle headerSlot or page titles above detail tables.",
      exampleCode:
        'import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";\n\nexport function BreadcrumbExample() {\n  return (\n    <Breadcrumb>\n      <BreadcrumbList>\n        <BreadcrumbItem>\n          <BreadcrumbLink href="#workbench">Workbench</BreadcrumbLink>\n        </BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem>\n          <BreadcrumbLink href="#docs">Primitives</BreadcrumbLink>\n        </BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem>\n          <BreadcrumbPage>Button</BreadcrumbPage>\n        </BreadcrumbItem>\n      </BreadcrumbList>\n    </Breadcrumb>\n  );\n}',
      dependencies: ["react"],
      exports: [
        "Breadcrumb",
        "BreadcrumbEllipsis",
        "BreadcrumbItem",
        "BreadcrumbLink",
        "BreadcrumbList",
        "BreadcrumbPage",
        "BreadcrumbSeparator",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "asChild",
          type: "boolean",
          required: false,
          description: "Configures asChild on Breadcrumb.",
        },
        {
          name: "separator",
          type: "React.ReactNode",
          required: false,
          description: "Configures separator on Breadcrumb.",
        },
      ],
    },
    {
      slug: "button",
      name: "Button",
      category: "Actions & Toggles",
      path: "src/components/ui/button.tsx",
      docPath: "public/docs/components/button.md",
      summary:
        "Tactile action primitive with 9 visual variants, pointerdown yield, and async promise lifecycle.",
      definingConstraint:
        "Locks horizontal button footprint with an invisible ghost sizer across idle, loading, success, and error states while compressing immediately on pointerdown.",
      whenToUse: [
        "Triggering immediate actions, form submissions, or asynchronous mutations with Promise lifecycle feedback.",
        "Presenting primary, secondary, destructive, outline, ghost, or warning actions with proportional icon affinity.",
      ],
      whenNotToUse: [
        {
          primitive: "toggle",
          reason: "Use Toggle for persistent two-state pressed controls.",
        },
        {
          primitive: "copy-button",
          reason: "Use CopyButton for one-click clipboard copy with morphing checkmark timing.",
        },
        {
          primitive: "segmented-control",
          reason: "Use SegmentedControl when switching between 2 to 5 mutually exclusive views.",
        },
      ],
      anatomy:
        '<Button variant="default" size="default" leftIcon={<SparklesIcon size={16} />}>\n  Publish\n</Button>',
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
      exampleCode:
        'import { ShieldCheckIcon, SparklesIcon } from "@/components/icons";\nimport { Button } from "@/components/ui/button";\n\nexport function ButtonExample() {\n  const handleAsyncAction = () => new Promise<void>((resolve) => setTimeout(resolve, 400));\n\n  return (\n    <div className="flex flex-wrap items-center justify-center gap-3">\n      <Button\n        variant="default"\n        loadingText="Deploying..."\n        successText="Deployed"\n        leftIcon={<SparklesIcon size={16} />}\n        onClick={handleAsyncAction}\n      >\n        Deploy Release\n      </Button>\n      <Button variant="outline" leftIcon={<ShieldCheckIcon size={16} />}>\n        Inspect Diff\n      </Button>\n      <Button variant="success">Verified</Button>\n    </div>\n  );\n}',
      dependencies: ["class-variance-authority", "motion", "react"],
      exports: ["Button", "buttonVariants"],
      variants: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "success",
        "warning",
        "glass",
      ],
      sizes: ["xs", "sm", "default", "lg", "xl", "icon-xs", "icon-sm", "icon", "icon-lg"],
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: false,
          description: "Configures children on Button.",
        },
        {
          name: "disableTapScale",
          type: "boolean",
          required: false,
          description:
            "When true, disables the tactile scale down on tap. By default, buttons used as popup or menu triggers automatically suppress tap scaling to guarantee the anchored surface has a zero-jitter, non-moving reference bounding box.",
        },
        {
          name: "errorDuration",
          type: "number",
          required: false,
          description: "Configures errorDuration on Button.",
        },
        {
          name: "errorText",
          type: "string",
          required: false,
          description: "Configures errorText on Button.",
        },
        {
          name: "fluidMorph",
          type: "boolean",
          required: false,
          description: "Configures fluidMorph on Button.",
        },
        {
          name: "fullWidth",
          type: "boolean",
          required: false,
          description:
            "Responsive helper to stretch the button to 100% width of its parent container.",
        },
        {
          name: "iconTrigger",
          type: "IconAnimationTrigger",
          required: false,
          description: "Configures iconTrigger on Button.",
        },
        {
          name: "isLoading",
          type: "boolean",
          required: false,
          description: "Configures isLoading on Button.",
        },
        {
          name: "leftIcon",
          type: "React.ReactNode",
          required: false,
          description: "Configures leftIcon on Button.",
        },
        {
          name: "loadingText",
          type: "string",
          required: false,
          description: "Configures loadingText on Button.",
        },
        {
          name: "onClick",
          type: "(e: React.MouseEvent<HTMLButtonElement>) => unknown",
          required: false,
          description:
            "Standard click handler. If an async function or Promise is returned, the button automatically drives the 9-state kinetic feedback loop (Idle -> Loading -> Success -> Idle).",
        },
        {
          name: "rightIcon",
          type: "React.ReactNode",
          required: false,
          description: "Configures rightIcon on Button.",
        },
        {
          name: "state",
          type: "ButtonState",
          required: false,
          description: "Configures state on Button.",
        },
        {
          name: "successDuration",
          type: "number",
          required: false,
          description: "Configures successDuration on Button.",
        },
        {
          name: "successText",
          type: "string",
          required: false,
          description: "Configures successText on Button.",
        },
      ],
    },
    {
      slug: "calendar",
      name: "Calendar",
      category: "Data & Feedback",
      path: "src/components/ui/calendar.tsx",
      docPath: "public/docs/components/calendar.md",
      summary: "Interactive month calendar grid with spring transition paging.",
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
      anatomy: "<Calendar selected={selectedDate} onSelect={setSelectedDate} />",
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
      exampleCode:
        'import * as React from "react";\nimport { Calendar } from "@/components/ui/calendar";\n\nconst INITIAL_CALENDAR_DATE = new Date(2026, 9, 31);\n\nexport function CalendarExample() {\n  const [date, setDate] = React.useState<Date | null>(INITIAL_CALENDAR_DATE);\n\n  return <Calendar selected={date ?? undefined} onSelect={(next) => setDate(next)} />;\n}',
      dependencies: ["lucide-react", "motion", "react"],
      exports: ["Calendar", "DatePicker"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "className",
          type: "string",
          required: false,
          description: "Configures className on Calendar.",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          description: "Configures disabled on Calendar.",
        },
        {
          name: "disabledDates",
          type: "(date: Date) => boolean",
          required: false,
          description: "Configures disabledDates on Calendar.",
        },
        {
          name: "maxDate",
          type: "Date",
          required: false,
          description: "Configures maxDate on Calendar.",
        },
        {
          name: "minDate",
          type: "Date",
          required: false,
          description: "Configures minDate on Calendar.",
        },
        {
          name: "onSelect",
          type: "(date: Date) => void",
          required: false,
          description: "Configures onSelect on Calendar.",
        },
        {
          name: "placeholder",
          type: "string",
          required: false,
          description: "Configures placeholder on Calendar.",
        },
        {
          name: "selected",
          type: "Date | null",
          required: false,
          description: "Configures selected on Calendar.",
        },
      ],
    },
    {
      slug: "callout",
      name: "Callout",
      category: "Documentation & Schematics",
      path: "src/components/ui/callout.tsx",
      docPath: "public/docs/components/callout.md",
      summary:
        "Editorial admonition surface with semantic OKLCH variants including defining constraints.",
      definingConstraint:
        "Highlights non-negotiable architectural constraints, semantic tips, or operational warnings in OKLCH-tinted blocks without decorative eyebrow pill clutter.",
      whenToUse: [
        "Calling out defining constraints, breaking invariant rules, tips, or caution notices inside guides.",
        "Surfacing high-signal validation reminders directly alongside runnable code examples.",
      ],
      whenNotToUse: [
        {
          primitive: "badge",
          reason: "Use Badge for short single-value operational telemetry pills.",
        },
        {
          primitive: "toast",
          reason: "Use Toast for transient post-action notifications.",
        },
      ],
      anatomy:
        '<Callout variant="defining-constraint" title="Zero Layout Shift">\n  Reserve border width on resting states.\n</Callout>',
      a11yContract: [
        'Uses role="alert" for warning/caution severities and role="note" for informational variants.',
        "Maintains APCA contrast headroom by pairing subtle translucent backgrounds with crisp foreground text.",
      ],
      doAndDont: [
        {
          do: 'Choose variant="defining-constraint" when introducing a rule that overrides naive defaults.',
          dont: "Stack multiple consecutive Callouts back-to-back inside a short page.",
        },
        {
          do: "Keep callout prose concise (1 to 3 sentences) with [text-wrap:pretty].",
          dont: "Embed full multi-column tables inside a Callout.",
        },
      ],
      slotsAndPairing:
        "Accepts title, variant (note, tip, warning, caution, defining-constraint), and optional custom icon.",
      exampleCode:
        'import { Callout } from "@/components/ui/callout";\n\nexport function CalloutExample() {\n  return (\n    <div className="w-full max-w-lg">\n      <Callout variant="defining-constraint" title="Zero Layout Shift">\n        Declare transparent resting borders so hover and focus states never alter geometry.\n      </Callout>\n    </div>\n  );\n}',
      dependencies: ["class-variance-authority", "react"],
      exports: ["Callout", "calloutVariants"],
      variants: ["note", "tip", "warning", "caution", "defining-constraint"],
      sizes: [],
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Callout body copy or structured guidance",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          required: false,
          description: "Optional custom leading icon overriding the variant default",
        },
        {
          name: "title",
          type: "string",
          required: false,
          description: "Optional heading displayed above the callout body prose",
        },
      ],
    },
    {
      slug: "card",
      name: "Card",
      category: "Data & Feedback",
      path: "src/components/ui/card.tsx",
      docPath: "public/docs/components/card.md",
      summary: "Concentric container surface with specular rim lighting and inner card nesting.",
      definingConstraint:
        "Enforces mathematical concentric corner continuity via CardInner inside Card alongside subtle 1px specular rim lighting; avoid defaulting every layout to 3-card grids.",
      whenToUse: [
        "Bounded workspace modules, detail inspectors, or distinct nested settings panels.",
        "Bento showcase items pairing CardHeader chrome with concentric CardInner nesting.",
      ],
      whenNotToUse: [
        {
          primitive: "table",
          reason:
            "Use Table or ruled divide-y lists when presenting repetitive comparable entities.",
        },
        {
          primitive: "callout",
          reason: "Use Callout for semantic notices, warnings, and constraints.",
        },
      ],
      anatomy:
        "<Card>\n  <CardHeader>\n    <CardTitle>Cluster Node</CardTitle>\n    <CardDescription>Edge configuration status.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <CardInner>Inner concentric container</CardInner>\n  </CardContent>\n</Card>",
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
      exampleCode:
        'import { Card, CardContent, CardDescription, CardHeader, CardInner, CardTitle } from "@/components/ui/card";\n\nexport function CardExample() {\n  return (\n    <div className="w-full max-w-md">\n      <Card>\n        <CardHeader>\n          <CardTitle>Concentric Container</CardTitle>\n          <CardDescription>Inner surface radius calibrated for smooth visual flow.</CardDescription>\n        </CardHeader>\n        <CardContent>\n          <CardInner>\n            <div className="text-xs text-muted-foreground">\n              R_inner equals outer radius minus container padding.\n            </div>\n          </CardInner>\n        </CardContent>\n      </Card>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: [
        "Card",
        "CardContent",
        "CardDescription",
        "CardFooter",
        "CardHeader",
        "CardInner",
        "CardTitle",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "specular",
          type: "boolean",
          required: false,
          description: "Configures specular on Card.",
        },
      ],
    },
    {
      slug: "chart",
      name: "Chart",
      category: "Data & Feedback",
      path: "src/components/ui/chart.tsx",
      docPath: "public/docs/components/chart.md",
      summary: "Zero-dependency OKLCH vector sparklines, area visualisations, and bar charts.",
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
      anatomy: "<AreaChart data={series} height={120} valueFormatter={(v) => `${v} ms`} />",
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
      exampleCode:
        'import { AreaChart, Sparkline } from "@/components/ui/chart";\n\nconst LATENCY_SERIES = [\n  { label: "00:00", value: 24 },\n  { label: "06:00", value: 18 },\n  { label: "12:00", value: 21 },\n  { label: "18:00", value: 14 },\n];\n\nexport function ChartExample() {\n  return (\n    <div className="flex w-full max-w-md flex-col gap-3">\n      <div className="flex items-center justify-between text-xs">\n        <span className="font-medium text-foreground">Edge Latency Trend</span>\n        <Sparkline data={[24, 18, 21, 14]} trend="up" />\n      </div>\n      <AreaChart data={LATENCY_SERIES} height={110} valueFormatter={(v) => `${v} ms`} />\n    </div>\n  );\n}',
      dependencies: ["motion", "react"],
      exports: ["AreaChart", "BarChart", "Sparkline"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "data",
          type: "number[]",
          required: true,
          description: "Configures data on Chart.",
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Configures className on Chart.",
        },
        {
          name: "color",
          type: "string",
          required: false,
          description: "Configures color on Chart.",
        },
        {
          name: "fill",
          type: "boolean",
          required: false,
          description: "Configures fill on Chart.",
        },
        {
          name: "height",
          type: "number",
          required: false,
          description: "Configures height on Chart.",
        },
        {
          name: "primaryColor",
          type: "string",
          required: false,
          description: "Configures primaryColor on Chart.",
        },
        {
          name: "secondaryColor",
          type: "string",
          required: false,
          description: "Configures secondaryColor on Chart.",
        },
        {
          name: "showGrid",
          type: "boolean",
          required: false,
          description: "Configures showGrid on Chart.",
        },
        {
          name: "strokeWidth",
          type: "number",
          required: false,
          description: "Configures strokeWidth on Chart.",
        },
        {
          name: "trend",
          type: '"up" | "down" | "neutral" | "auto"',
          required: false,
          description: "Configures trend on Chart.",
        },
        {
          name: "valueFormatter",
          type: "(val: number) => string",
          required: false,
          description: "Configures valueFormatter on Chart.",
        },
        {
          name: "width",
          type: "number",
          required: false,
          description: "Configures width on Chart.",
        },
      ],
    },
    {
      slug: "checkbox",
      name: "Checkbox",
      category: "Forms & Input",
      path: "src/components/ui/checkbox.tsx",
      docPath: "public/docs/components/checkbox.md",
      summary: "Tri-state accessible checkbox with 44px touch hit target expansion.",
      definingConstraint:
        "Expands hit area with an invisible 44px touch target around a crisp rounded indicator supporting checked, unchecked, and indeterminate states.",
      whenToUse: [
        "Multi-select option lists, table row selection, or opt-in policy acknowledgements inside forms.",
        "Parent-child selection trees requiring an indeterminate mixed state.",
      ],
      whenNotToUse: [
        {
          primitive: "switch",
          reason:
            "Use Switch for immediate system settings that take effect without a Save button.",
        },
        {
          primitive: "radio-group",
          reason: "Use RadioGroup when only one option from a small list can be selected.",
        },
      ],
      anatomy:
        '<label className="inline-flex items-center gap-2.5">\n  <Checkbox checked={agreed} onCheckedChange={setAgreed} />\n  <span>Accept terms</span>\n</label>',
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
      exampleCode:
        'import * as React from "react";\nimport { Checkbox } from "@/components/ui/checkbox";\n\nexport function CheckboxExample() {\n  const [checked, setChecked] = React.useState(true);\n\n  return (\n    <label className="inline-flex items-center gap-2.5 text-sm text-foreground">\n      <Checkbox checked={checked} onCheckedChange={setChecked} />\n      <span>Enforce APCA contrast check on build</span>\n    </label>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["Checkbox"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "size",
          type: '"sm" | "default"',
          required: false,
          description: "Configures size on Checkbox.",
        },
      ],
    },
    {
      slug: "code-block",
      name: "CodeBlock",
      category: "Documentation & Schematics",
      path: "src/components/ui/code-block.tsx",
      docPath: "public/docs/components/code-block.md",
      summary:
        "Concentric syntax viewport with tabular line numbers, line highlights, and multi-tab switcher.",
      definingConstraint:
        "Frames concentric code viewports (`rounded-2xl` outer, `rounded-[10px]` inner) with tabular-nums line gutters, focus line highlights, SegmentedControl tabs, and CopyButton.",
      whenToUse: [
        "Presenting verified source snippets, CLI command tabs (Install / Verify), and highlighted config blocks.",
        "Side-by-side multi-framework installation tabs powered by SegmentedControl.",
      ],
      whenNotToUse: [
        {
          primitive: "component-preview",
          reason:
            "Use ComponentPreview when pairing runnable interactive output alongside its TSX code.",
        },
        {
          primitive: "kbd",
          reason: "Use Kbd for inline physical keycaps.",
        },
      ],
      anatomy:
        '<CodeBlock filename="verify.sh" language="bash" highlightLines={[2]} code="npm run docs:build\nnpm run check" />',
      a11yContract: [
        'Marks decorative line-number gutters aria-hidden="true" so copy selection and screen readers skip line indices.',
        "Integrated CopyButton exposes dynamic aria-label and keyboard activation.",
      ],
      doAndDont: [
        {
          do: "Pass tabs array with distinct ids for multi-variant snippets (Install, Import, Verify).",
          dont: "Keep outdated uncompiled snippets when a typechecked ComponentPreview exists.",
        },
        {
          do: "Use highlightLines to call attention to crucial props such as size={16}.",
          dont: "Dump 200-line raw files inline without maxHeight constraints.",
        },
      ],
      slotsAndPairing:
        "Supports single snippet props (`code`, `language`, `filename`, `highlightLines`) or multi-tab `tabs` arrays.",
      exampleCode:
        'import { CodeBlock } from "@/components/ui/code-block";\n\nexport function CodeBlockExample() {\n  return (\n    <div className="w-full max-w-lg">\n      <CodeBlock\n        tabs={[\n          {\n            id: "docs",\n            label: "Sync Docs",\n            language: "bash",\n            highlightLines: [1],\n            code: "npm run docs:build\\nnpm run docs:check",\n          },\n          {\n            id: "verify",\n            label: "Full Gate",\n            language: "bash",\n            code: "npm run invariants\\nnpm run check",\n          },\n        ]}\n      />\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["CodeBlock"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "caption",
          type: "string",
          required: false,
          description: "Optional caption rendered below the concentric code frame",
        },
        {
          name: "code",
          type: "string",
          required: false,
          description: "Single-snippet code content (ignored when tabs are supplied)",
        },
        {
          name: "copyable",
          type: "boolean",
          required: false,
          description: "Display clipboard CopyButton in the header bar",
        },
        {
          name: "defaultTab",
          type: "string",
          required: false,
          description: "Uncontrolled initial tab ID when tabs are supplied",
        },
        {
          name: "filename",
          type: "string",
          required: false,
          description: "Optional filename or path label shown in the header bar",
        },
        {
          name: "highlightLines",
          type: "number[]",
          required: false,
          description: "1-indexed line numbers to emphasise in single-snippet mode",
        },
        {
          name: "language",
          type: "string",
          required: false,
          description: "Language badge string for single-snippet mode",
        },
        {
          name: "maxHeight",
          type: "string",
          required: false,
          description: "Optional CSS max-height constraint on the scrollable code viewport",
        },
        {
          name: "onValueChange",
          type: "(tabId: string) => void",
          required: false,
          description: "Callback fired when active tab changes",
        },
        {
          name: "showLineNumbers",
          type: "boolean",
          required: false,
          description: "Display tabular line numbers in a non-selectable gutter",
        },
        {
          name: "tabs",
          type: "CodeBlockTab[]",
          required: false,
          description: "Multi-tab snippet definitions rendered via SegmentedControl",
        },
        {
          name: "value",
          type: "string",
          required: false,
          description: "Controlled active tab ID when tabs are supplied",
        },
      ],
    },
    {
      slug: "combobox",
      name: "Combobox",
      category: "Forms & Input",
      path: "src/components/ui/combobox.tsx",
      docPath: "public/docs/components/combobox.md",
      summary: "Searchable autocomplete selector with keyboard roving navigation.",
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
      anatomy:
        '<Combobox items={frameworks} value={value} onValueChange={setValue}>\n  <ComboboxInput aria-label="Select framework" placeholder="Search..." />\n  <ComboboxContent>\n    <ComboboxList>\n      <ComboboxItem value="React">React</ComboboxItem>\n      <ComboboxEmpty>No matches found.</ComboboxEmpty>\n    </ComboboxList>\n  </ComboboxContent>\n</Combobox>',
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
      exampleCode:
        'import * as React from "react";\nimport { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";\nimport { Field, FieldLabel } from "@/components/ui/field";\n\nconst FRAMEWORK_ITEMS = ["React 19", "Next.js", "Vite", "Astro", "Remix"];\n\nexport function ComboboxExample() {\n  const [framework, setFramework] = React.useState<string | null>("Vite");\n\n  return (\n    <div className="w-full max-w-xs">\n      <Field>\n        <FieldLabel>Target Runtime</FieldLabel>\n        <Combobox items={FRAMEWORK_ITEMS} value={framework} onValueChange={setFramework}>\n          <ComboboxInput placeholder="Search runtime..." aria-label="Select target runtime" />\n          <ComboboxContent>\n            <ComboboxList>\n              {FRAMEWORK_ITEMS.map((item) => (\n                <ComboboxItem key={item} value={item}>\n                  {item}\n                </ComboboxItem>\n              ))}\n              <ComboboxEmpty>No matching runtime.</ComboboxEmpty>\n            </ComboboxList>\n          </ComboboxContent>\n        </Combobox>\n      </Field>\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "Combobox",
        "ComboboxContent",
        "ComboboxEmpty",
        "ComboboxGroup",
        "ComboboxGroupLabel",
        "ComboboxInput",
        "ComboboxItem",
        "ComboboxList",
        "ComboboxPortal",
        "ComboboxSeparator",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "clearable",
          type: "boolean",
          required: false,
          description: "Configures clearable on Combobox.",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          required: false,
          description: "Configures icon on Combobox.",
        },
        {
          name: "portal",
          type: "boolean",
          required: false,
          description: "Configures portal on Combobox.",
        },
        {
          name: "sideOffset",
          type: "number",
          required: false,
          description: "Configures sideOffset on Combobox.",
        },
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          required: false,
          description: "Configures size on Combobox.",
        },
      ],
    },
    {
      slug: "command",
      name: "Command",
      category: "Overlays & Surfaces",
      path: "src/components/ui/command.tsx",
      docPath: "public/docs/components/command.md",
      summary: "Global command palette modal with instant filtering and keycap hints.",
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
      anatomy:
        '<Command aria-label="Quick actions">\n  <CommandInput placeholder="Search commands..." />\n  <CommandList>\n    <CommandEmpty>No matching commands.</CommandEmpty>\n    <CommandGroup heading="Navigation">\n      <CommandItem>Open Docs<CommandShortcut>⌘D</CommandShortcut></CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>',
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
      exampleCode:
        'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";\n\nexport function CommandExample() {\n  return (\n    <div className="w-full max-w-md rounded-xl border border-border/70 bg-card shadow-xs">\n      <Command aria-label="Workspace actions">\n        <CommandInput placeholder="Filter workspace commands..." />\n        <CommandList>\n          <CommandEmpty>No commands matched.</CommandEmpty>\n          <CommandGroup heading="Navigation">\n            <CommandItem>\n              <span>Documentation Portal</span>\n              <CommandShortcut>⌘D</CommandShortcut>\n            </CommandItem>\n            <CommandItem>\n              <span>Theme Studio</span>\n              <CommandShortcut>⌘T</CommandShortcut>\n            </CommandItem>\n          </CommandGroup>\n        </CommandList>\n      </Command>\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "lucide-react", "react"],
      exports: [
        "Command",
        "CommandDialog",
        "CommandEmpty",
        "CommandGroup",
        "CommandInput",
        "CommandItem",
        "CommandList",
        "CommandSeparator",
        "CommandShortcut",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Configures children on Command.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          required: false,
          description: "Configures onOpenChange on Command.",
        },
        {
          name: "open",
          type: "boolean",
          required: false,
          description: "Configures open on Command.",
        },
      ],
    },
    {
      slug: "component-preview",
      name: "ComponentPreview",
      category: "Documentation & Schematics",
      path: "src/components/ui/component-preview.tsx",
      docPath: "public/docs/components/component-preview.md",
      summary:
        "Symmetric live fixture stage with preview/code switcher, viewport presets, and state reset.",
      definingConstraint:
        "Provides a symmetric centred stage (`min-h-[180px]`) with live Preview/Code toggling, `375px`/`768px`/`100%` viewport presets, and stateful component reset.",
      whenToUse: [
        "Documenting interactive primitives with live runnable fixtures backed by verified source code.",
        "Verifying component anti-crush responsiveness live across 375px, 768px, and 100% widths.",
      ],
      whenNotToUse: [
        {
          primitive: "code-block",
          reason:
            "Use CodeBlock for pure CLI commands, CSS tokens, or TypeScript configuration snippets.",
        },
        {
          primitive: "diagram-frame",
          reason: "Use DiagramFrame for vector SVG architecture schematics.",
        },
      ],
      anatomy:
        '<ComponentPreview title="Tactile Button" code={snippet}>\n  <ButtonExample />\n</ComponentPreview>',
      a11yContract: [
        "Viewport buttons declare explicit aria-label and aria-pressed state.",
        'Reset button exposes aria-label="Reset preview state" and remounts fixture state cleanly.',
      ],
      doAndDont: [
        {
          do: "Pass verified compiling JSX in code matching the rendered fixture.",
          dont: "Hardcode conflicting cramped heights inside children that crush component tokens.",
        },
        {
          do: "Include showViewportControls when testing responsive anti-crush behaviour.",
          dont: "Nest full-page multi-modal portals default-open inside ComponentPreview.",
        },
      ],
      slotsAndPairing: "Automatically delegates source inspection to CodeBlock and CopyButton.",
      exampleCode:
        'import * as React from "react";\nimport { ComponentPreview } from "@/components/ui/component-preview";\n\nexport function ComponentPreviewExample() {\n  const [clicks, setClicks] = React.useState(0);\n\n  return (\n    <div className="w-full max-w-lg">\n      <ComponentPreview\n        title="Nested Interactive Stage"\n        code={`<button type="button">Clicked {clicks} times</button>`}\n      >\n        <button\n          type="button"\n          onClick={() => setClicks((c) => c + 1)}\n          className="rounded-lg border border-border/80 bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-xs active:scale-[0.98]"\n        >\n          Interactive count: {clicks}\n        </button>\n      </ComponentPreview>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["ComponentPreview"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Live interactive component fixture",
        },
        {
          name: "code",
          type: "string",
          required: true,
          description: "Source code string revealed in Code view and copied via CopyButton",
        },
        {
          name: "allowReset",
          type: "boolean",
          required: false,
          description: "Display state reset button to remount interactive children",
        },
        {
          name: "defaultView",
          type: '"preview" | "code"',
          required: false,
          description: "Initial view tab",
        },
        {
          name: "description",
          type: "string",
          required: false,
          description: "Concise summary describing what the fixture demonstrates",
        },
        {
          name: "filename",
          type: "string",
          required: false,
          description: "Optional filename shown inside Code view",
        },
        {
          name: "language",
          type: "string",
          required: false,
          description: "Language tag passed to CodeBlock when inspecting source",
        },
        {
          name: "showViewportControls",
          type: "boolean",
          required: false,
          description: "Display 375px / 768px / 100% viewport switcher buttons",
        },
        {
          name: "title",
          type: "string",
          required: false,
          description: "Heading displayed above the preview control bar",
        },
      ],
    },
    {
      slug: "context-menu",
      name: "ContextMenu",
      category: "Overlays & Surfaces",
      path: "src/components/ui/context-menu.tsx",
      docPath: "public/docs/components/context-menu.md",
      summary: "Secondary pointer context menu supporting nested groups and radio selections.",
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
      anatomy:
        "<ContextMenu>\n  <ContextMenuTrigger><div>Inspectable canvas surface</div></ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Copy Path</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem>Duplicate</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>",
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
      exampleCode:
        'import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";\n\nexport function ContextMenuExample() {\n  return (\n    <ContextMenu>\n      <ContextMenuTrigger>\n        <div className="rounded-xl border border-dashed border-border/80 bg-muted/40 px-6 py-5 text-xs text-muted-foreground">\n          Secondary click this canvas surface for context actions\n        </div>\n      </ContextMenuTrigger>\n      <ContextMenuContent>\n        <ContextMenuItem>Copy Primitive Path</ContextMenuItem>\n        <ContextMenuSeparator />\n        <ContextMenuItem>Run Contrast Audit</ContextMenuItem>\n      </ContextMenuContent>\n    </ContextMenu>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "ContextMenu",
        "ContextMenuCheckboxItem",
        "ContextMenuContent",
        "ContextMenuGroup",
        "ContextMenuItem",
        "ContextMenuPortal",
        "ContextMenuRadioGroup",
        "ContextMenuRadioItem",
        "ContextMenuSeparator",
        "ContextMenuShortcut",
        "ContextMenuSub",
        "ContextMenuSubTrigger",
        "ContextMenuTrigger",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "alignOffset",
          type: "number",
          required: false,
          description: "Configures alignOffset on ContextMenu.",
        },
        {
          name: "inset",
          type: "boolean",
          required: false,
          description: "Configures inset on ContextMenu.",
        },
        {
          name: "sideOffset",
          type: "number",
          required: false,
          description: "Configures sideOffset on ContextMenu.",
        },
      ],
    },
    {
      slug: "copy-button",
      name: "CopyButton",
      category: "Actions & Toggles",
      path: "src/components/ui/copy-button.tsx",
      docPath: "public/docs/components/copy-button.md",
      summary: "Clipboard action control with spring state transition feedback.",
      definingConstraint:
        "Encapsulates clipboard write handling and spring morph transitions between idle copy and temporary confirmation states without shifting adjacent controls.",
      whenToUse: [
        "Copying CLI commands, API keys, token values, or generated code blocks to the clipboard.",
        "Inline copy triggers inside tables, headers, and developer toolbars.",
      ],
      whenNotToUse: [
        {
          primitive: "button",
          reason: "Use Button for general actions or mutations.",
        },
        {
          primitive: "toggle",
          reason: "Use Toggle for persistent boolean state switches.",
        },
      ],
      anatomy:
        '<CopyButton value="npm run check" idleText="Copy" copiedText="Copied" variant="outline" size="sm" />',
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
      exampleCode:
        'import { CopyButton } from "@/components/ui/copy-button";\n\nexport function CopyButtonExample() {\n  return (\n    <div className="flex flex-wrap items-center gap-3">\n      <CopyButton\n        value="npm run docs:build && npm run check"\n        idleText="Copy Command"\n        copiedText="Copied"\n        variant="outline"\n        size="sm"\n      />\n      <CopyButton\n        value="oklch(0.62 0.18 145)"\n        variant="pill"\n        size="sm"\n        aria-label="Copy OKLCH success token"\n      />\n    </div>\n  );\n}',
      dependencies: ["motion", "react"],
      exports: ["CopyButton"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "copied",
          type: "boolean",
          required: false,
          description: "Controlled copied state",
        },
        {
          name: "copiedText",
          type: "React.ReactNode",
          required: false,
          description:
            'Label to display when copied (defaults to "Copied!" if idleText is provided)',
        },
        {
          name: "iconSize",
          type: "number",
          required: false,
          description: "Custom icon size (pixels)",
        },
        {
          name: "idleText",
          type: "React.ReactNode",
          required: false,
          description: "Label to display when idle (leave empty for icon-only button)",
        },
        {
          name: "onCopiedChange",
          type: "(copied: boolean) => void",
          required: false,
          description: "Callback fired when copied state changes",
        },
        {
          name: "size",
          type: '"sm" | "default" | "lg" | "icon"',
          required: false,
          description: "Size variant",
        },
        {
          name: "timeout",
          type: "number",
          required: false,
          description: "Auto-reset timeout in milliseconds (default 1800ms)",
        },
        {
          name: "value",
          type: "string",
          required: false,
          description: "The text string to copy to clipboard",
        },
        {
          name: "variant",
          type: '"outline" | "ghost" | "secondary" | "pill"',
          required: false,
          description: "Visual variant",
        },
      ],
    },
    {
      slug: "diagram-frame",
      name: "DiagramFrame",
      category: "Documentation & Schematics",
      path: "src/components/ui/diagram-frame.tsx",
      docPath: "public/docs/components/diagram-frame.md",
      summary:
        "Accessible orthogonal SVG schematic container with semantic caption and expanded zoom modal.",
      definingConstraint:
        "Encapsulates accessible SVG diagrams inside semantic `<figure>` and `<figcaption>` landmarks with horizontal scroll safety and a focus-trapped expanded zoom Dialog.",
      whenToUse: [
        "State machines, data-flow pipelines, component hierarchies, and token pipelines drawn as orthogonal SVGs.",
        "Architecture explanations needing accessible `<figcaption>` semantics and full-width modal expansion.",
      ],
      whenNotToUse: [
        {
          primitive: "image",
          reason: "Use ProgressiveImage for photographic raster assets.",
        },
        {
          primitive: "component-preview",
          reason: "Use ComponentPreview for interactive UI widgets.",
        },
      ],
      anatomy:
        '<DiagramFrame title="Pipeline Schematic" description="Connects blueprint to verified output.">\n  <svg aria-label="Pipeline schematic">...</svg>\n</DiagramFrame>',
      a11yContract: [
        "Binds `<figure aria-describedby>` and visible `<figcaption>` alongside `<title>` and `<desc>` inside the SVG.",
        "Expand button opens a focus-trapped Dialog dismissible with Escape.",
      ],
      doAndDont: [
        {
          do: "Style SVG shapes with semantic CSS variables (var(--card), var(--foreground), var(--primary)).",
          dont: "Wrap DiagramFrame headings with mismatched h3 tags that break page heading order.",
        },
        {
          do: "Keep node count bounded (`3` to `12` nodes) with orthogonal connectors.",
          dont: "Draw diagonal crossing wires through overlapping text labels.",
        },
      ],
      slotsAndPairing: "Wraps inline `<svg>` elements using semantic CSS theme tokens.",
      exampleCode:
        'import { DiagramFrame } from "@/components/ui/diagram-frame";\n\nexport function DiagramFrameExample() {\n  return (\n    <div className="w-full max-w-lg">\n      <DiagramFrame\n        title="Spec to Verification Flow"\n        description="Shows orthogonal flow from component spec to static verification gate."\n      >\n        <svg\n          aria-label="Spec to verification diagram"\n          viewBox="0 0 360 80"\n          className="h-auto w-full min-w-[280px]"\n        >\n          <title>Spec to Verification Flow</title>\n          <desc>Connects Component Spec to Verified Markdown and Check Gate.</desc>\n          <rect\n            x="10"\n            y="18"\n            width="130"\n            height="44"\n            rx="8"\n            fill="var(--card)"\n            stroke="var(--border)"\n          />\n          <text\n            x="75"\n            y="44"\n            textAnchor="middle"\n            fill="var(--foreground)"\n            fontSize="11"\n            fontFamily="var(--font-sans)"\n          >\n            Component Spec\n          </text>\n          <path d="M 140 40 L 218 40" stroke="var(--primary)" strokeWidth="1.5" />\n          <rect\n            x="220"\n            y="18"\n            width="130"\n            height="44"\n            rx="8"\n            fill="var(--card)"\n            stroke="var(--primary)"\n          />\n          <text\n            x="285"\n            y="44"\n            textAnchor="middle"\n            fill="var(--foreground)"\n            fontSize="11"\n            fontFamily="var(--font-sans)"\n          >\n            Verified Docs\n          </text>\n        </svg>\n      </DiagramFrame>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["DiagramFrame"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Accessible SVG schematic content",
        },
        {
          name: "description",
          type: "string",
          required: true,
          description: "Accessible description explaining architecture relationships and data flow",
        },
        {
          name: "title",
          type: "string",
          required: true,
          description: "Diagram heading displayed in the chrome bar and modal inspector",
        },
        {
          name: "allowZoom",
          type: "boolean",
          required: false,
          description: "Enable full-width modal zoom dialog for inspecting dense diagrams",
        },
        {
          name: "caption",
          type: "string",
          required: false,
          description:
            "Optional visible figure caption below the SVG canvas (defaults to description)",
        },
      ],
    },
    {
      slug: "dialog",
      name: "Dialog",
      category: "Overlays & Surfaces",
      path: "src/components/ui/dialog.tsx",
      docPath: "public/docs/components/dialog.md",
      summary: "Focus-trapped modal dialogue with liquid backdrop blur and Escape dismissal.",
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
      anatomy:
        '<Dialog>\n  <DialogTrigger className={buttonVariants({ variant: "outline" })}>Edit Spec</DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Edit Token Preset</DialogTitle>\n      <DialogDescription>Adjust base hue and contrast thresholds.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter><DialogClose>Done</DialogClose></DialogFooter>\n  </DialogContent>\n</Dialog>',
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
      exampleCode:
        'import { buttonVariants } from "@/components/ui/button";\nimport { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";\n\nexport function DialogExample() {\n  return (\n    <Dialog>\n      <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>\n        Edit OKLCH Seed\n      </DialogTrigger>\n      <DialogContent>\n        <DialogHeader>\n          <DialogTitle>Calibrate Primary Accent</DialogTitle>\n          <DialogDescription>\n            Adjust OKLCH chroma and lightness while keeping APCA contrast above Lc 60.\n          </DialogDescription>\n        </DialogHeader>\n        <DialogFooter>\n          <DialogClose className={buttonVariants({ variant: "default", size: "sm" })}>\n            Apply Seed\n          </DialogClose>\n        </DialogFooter>\n      </DialogContent>\n    </Dialog>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "Dialog",
        "DialogBackdrop",
        "DialogClose",
        "DialogContent",
        "DialogDescription",
        "DialogFooter",
        "DialogHeader",
        "DialogPortal",
        "DialogTitle",
        "DialogTrigger",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "showCloseButton",
          type: "boolean",
          required: false,
          description: "Configures showCloseButton on Dialog.",
        },
      ],
    },
    {
      slug: "doc-layout",
      name: "DocLayout",
      category: "Documentation & Schematics",
      path: "src/components/ui/doc-layout.tsx",
      docPath: "public/docs/components/doc-layout.md",
      summary:
        "Three-column reference macrostructure with bounded sidebar, 72ch measure, and scroll-spy TOC.",
      definingConstraint:
        "Enforces a 1440px-capped three-column editorial reading layout with zero-shift sidebar active styling, 72ch article measure, Copy Page as Markdown action, and verification TOC.",
      whenToUse: [
        "Product documentation portals, API reference guides, and internal engineering handbooks.",
        "Technical manuals combining navigable group sidebars with copyable Markdown exports.",
      ],
      whenNotToUse: [
        {
          primitive: "navigation-bar",
          reason: "Use NavigationBar for global top-level application headers above DocLayout.",
        },
      ],
      anatomy:
        "<DocLayout>\n  <DocSidebar groups={groups} activeId={id} onSelect={setId} />\n  <DocArticle markdownSource={md}>\n    <section>...</section>\n  </DocArticle>\n  <DocToc headings={headings} verificationChecks={checks} />\n</DocLayout>",
      a11yContract: [
        'Wraps sidebar in `<nav aria-label="Documentation navigation">` with `aria-current="page"` on active item.',
        'Right rail exposes `<aside aria-label="On this page">` and anchor links cleanly.',
      ],
      doAndDont: [
        {
          do: "Supply `markdownSource` to DocArticle so humans and agents can copy clean Markdown in one click.",
          dont: "Truncate long component titles in DocSidebar links.",
        },
        {
          do: "Populate DocToc verificationChecks (`It's Working If`) with runnable commands.",
          dont: "Change font-weight between active and inactive DocSidebar buttons.",
        },
      ],
      slotsAndPairing: "Coordinates DocLayout, DocSidebar, DocArticle, and DocToc.",
      exampleCode:
        'import * as React from "react";\nimport { DocArticle, DocLayout, DocSidebar, DocToc } from "@/components/ui/doc-layout";\n\nexport function DocLayoutExample() {\n  const [section, setSection] = React.useState("overview");\n\n  return (\n    <div className="w-full max-w-2xl rounded-xl border border-border/60 bg-background p-4">\n      <DocLayout>\n        <DocSidebar\n          activeId={section}\n          onSelect={setSection}\n          groups={[\n            {\n              title: "Guide",\n              items: [\n                { id: "overview", label: "Overview" },\n                { id: "api", label: "Props API" },\n              ],\n            },\n          ]}\n        />\n        <DocArticle markdownSource="# Overview\\nGrounded prose specimen." llmsHref="/llms.txt">\n          <div className="text-xs leading-relaxed text-muted-foreground">\n            Reading column bounded to 72ch with zero-shift sidebar selection ({section}).\n          </div>\n        </DocArticle>\n        <DocToc\n          headings={[{ id: "overview", label: "Overview" }]}\n          verificationChecks={[{ label: "Docs check green.", command: "npm run docs:check" }]}\n        />\n      </DocLayout>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["DocArticle", "DocLayout", "DocSidebar", "DocToc"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "activeId",
          type: "string",
          required: true,
          description: "Configures activeId on DocLayout.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Configures children on DocLayout.",
        },
        {
          name: "groups",
          type: "DocNavGroup[]",
          required: true,
          description: "Configures groups on DocLayout.",
        },
        {
          name: "headings",
          type: "DocHeadingItem[]",
          required: true,
          description: "Section headings shown in the table of contents",
        },
        {
          name: "onSelect",
          type: "(id: string) => void",
          required: true,
          description: "Configures onSelect on DocLayout.",
        },
        {
          name: "header",
          type: "React.ReactNode",
          required: false,
          description: "Configures header on DocLayout.",
        },
        {
          name: "headerSlot",
          type: "React.ReactNode",
          required: false,
          description: "Optional left-side breadcrumb or navigation action",
        },
        {
          name: "llmsHref",
          type: "string",
          required: false,
          description: "Optional relative path to machine-readable llms.txt index",
        },
        {
          name: "markdownSource",
          type: "string",
          required: false,
          description:
            "Raw Markdown representation of the active documentation section for LLM clipboard ingestion",
        },
        {
          name: "verificationChecks",
          type: "DocVerificationItem[]",
          required: false,
          description: "Concrete verification checklist items rendered in the confirmation card",
        },
      ],
    },
    {
      slug: "drawer",
      name: "Drawer",
      category: "Overlays & Surfaces",
      path: "src/components/ui/drawer.tsx",
      docPath: "public/docs/components/drawer.md",
      summary: "Swipeable edge drawer with tactile drag handle for compact viewports.",
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
      anatomy:
        '<Drawer>\n  <DrawerTrigger className={buttonVariants({ variant: "outline" })}>Open Drawer</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHandle />\n    <DrawerHeader>\n      <DrawerTitle>Filter Results</DrawerTitle>\n      <DrawerDescription>Narrow dataset by severity.</DrawerDescription>\n    </DrawerHeader>\n  </DrawerContent>\n</Drawer>',
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
      exampleCode:
        'import { buttonVariants } from "@/components/ui/button";\nimport { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHandle, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";\n\nexport function DrawerExample() {\n  return (\n    <Drawer>\n      <DrawerTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>\n        Open Filter Drawer\n      </DrawerTrigger>\n      <DrawerContent>\n        <DrawerHandle />\n        <DrawerHeader>\n          <DrawerTitle>Filter Component Matrix</DrawerTitle>\n          <DrawerDescription>Narrow catalogue entries by category.</DrawerDescription>\n        </DrawerHeader>\n        <DrawerFooter>\n          <DrawerClose className={buttonVariants({ variant: "outline", size: "sm" })}>\n            Close\n          </DrawerClose>\n        </DrawerFooter>\n      </DrawerContent>\n    </Drawer>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "Drawer",
        "DrawerBackdrop",
        "DrawerClose",
        "DrawerContent",
        "DrawerDescription",
        "DrawerFooter",
        "DrawerHandle",
        "DrawerHeader",
        "DrawerPortal",
        "DrawerTitle",
        "DrawerTrigger",
        "DrawerViewport",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "hideHandle",
          type: "boolean",
          required: false,
          description: "Configures hideHandle on Drawer.",
        },
        {
          name: "preventCloseOnClick",
          type: "boolean",
          required: false,
          description: "Configures preventCloseOnClick on Drawer.",
        },
      ],
    },
    {
      slug: "dropdown-menu",
      name: "DropdownMenu",
      category: "Overlays & Surfaces",
      path: "src/components/ui/dropdown-menu.tsx",
      docPath: "public/docs/components/dropdown-menu.md",
      summary: "Anchored menu surface with keyboard navigation, checkboxes, and shortcuts.",
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
      anatomy:
        '<DropdownMenu>\n  <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>Actions</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Workspace</DropdownMenuLabel>\n    <DropdownMenuItem>Export JSON</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>',
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
      exampleCode:
        'import { buttonVariants } from "@/components/ui/button";\nimport { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";\n\nexport function DropdownMenuExample() {\n  return (\n    <DropdownMenu>\n      <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>\n        Release Actions\n      </DropdownMenuTrigger>\n      <DropdownMenuContent>\n        <DropdownMenuLabel>Distribution</DropdownMenuLabel>\n        <DropdownMenuSeparator />\n        <DropdownMenuItem>Rebuild Docs Manifest</DropdownMenuItem>\n        <DropdownMenuItem>Verify Invariants</DropdownMenuItem>\n      </DropdownMenuContent>\n    </DropdownMenu>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "DropdownMenu",
        "DropdownMenuCheckboxItem",
        "DropdownMenuContent",
        "DropdownMenuGroup",
        "DropdownMenuItem",
        "DropdownMenuLabel",
        "DropdownMenuPortal",
        "DropdownMenuRadioGroup",
        "DropdownMenuRadioItem",
        "DropdownMenuSeparator",
        "DropdownMenuShortcut",
        "DropdownMenuSub",
        "DropdownMenuSubContent",
        "DropdownMenuSubTrigger",
        "DropdownMenuTrigger",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "align",
          type: 'MenuPrimitive.Positioner.Props["align"]',
          required: false,
          description: "Configures align on DropdownMenu.",
        },
        {
          name: "alignOffset",
          type: 'MenuPrimitive.Positioner.Props["alignOffset"]',
          required: false,
          description: "Configures alignOffset on DropdownMenu.",
        },
        {
          name: "anchor",
          type: 'MenuPrimitive.Positioner.Props["anchor"]',
          required: false,
          description: "Configures anchor on DropdownMenu.",
        },
        {
          name: "collisionAvoidance",
          type: 'MenuPrimitive.Positioner.Props["collisionAvoidance"]',
          required: false,
          description: "Configures collisionAvoidance on DropdownMenu.",
        },
        {
          name: "disableAnchorTracking",
          type: 'MenuPrimitive.Positioner.Props["disableAnchorTracking"]',
          required: false,
          description: "Configures disableAnchorTracking on DropdownMenu.",
        },
        {
          name: "inset",
          type: "boolean",
          required: false,
          description: "Configures inset on DropdownMenu.",
        },
        {
          name: "portalProps",
          type: "MenuPrimitive.Portal.Props",
          required: false,
          description: "Configures portalProps on DropdownMenu.",
        },
        {
          name: "side",
          type: 'MenuPrimitive.Positioner.Props["side"]',
          required: false,
          description: "Configures side on DropdownMenu.",
        },
        {
          name: "sideOffset",
          type: 'MenuPrimitive.Positioner.Props["sideOffset"]',
          required: false,
          description: "Configures sideOffset on DropdownMenu.",
        },
        {
          name: "variant",
          type: '"default" | "destructive"',
          required: false,
          description: "Configures variant on DropdownMenu.",
        },
      ],
    },
    {
      slug: "field",
      name: "Field",
      category: "Forms & Input",
      path: "src/components/ui/field.tsx",
      docPath: "public/docs/components/field.md",
      summary:
        "Compound form field wrapper coordinating labels, hints, and min-h-[1lh] error slots.",
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
      anatomy:
        "<Field invalid={Boolean(error)}>\n  <FieldLabel requiredIndicator>Workspace Slug</FieldLabel>\n  <Input value={slug} onChange={...} />\n  <FieldDescription>Lowercase URL identifier.</FieldDescription>\n  <FieldError match={Boolean(error)}>{error}</FieldError>\n</Field>",
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
      exampleCode:
        'import * as React from "react";\nimport { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";\nimport { Input } from "@/components/ui/input";\n\nexport function FieldExample() {\n  const [slug, setSlug] = React.useState("edge-gateway");\n  const isInvalid = slug.trim().length < 3;\n\n  return (\n    <div className="w-full max-w-sm">\n      <Field invalid={isInvalid}>\n        <FieldLabel requiredIndicator>Workspace Slug</FieldLabel>\n        <Input\n          value={slug}\n          onChange={(e) => setSlug(e.target.value)}\n          placeholder="workspace-slug"\n          error={isInvalid}\n        />\n        <FieldDescription>Used inside stable documentation routes.</FieldDescription>\n        <FieldError match={isInvalid}>Minimum 3 characters required.</FieldError>\n      </Field>\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["Field", "FieldControl", "FieldDescription", "FieldError", "FieldLabel"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "optional",
          type: "boolean",
          required: false,
          description: "Configures optional on Field.",
        },
        {
          name: "requiredIndicator",
          type: "boolean",
          required: false,
          description: "Configures requiredIndicator on Field.",
        },
      ],
    },
    {
      slug: "file-upload",
      name: "FileUpload",
      category: "Forms & Input",
      path: "src/components/ui/file-upload.tsx",
      docPath: "public/docs/components/file-upload.md",
      summary: "Drag-and-drop asset uploader with client-side validation and progress state.",
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
      anatomy:
        '<FileUpload title="Drop token preset" description="JSON files up to 5MB" accept=".json" onFilesSelected={handleFiles} />',
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
      exampleCode:
        'import { FileUpload } from "@/components/ui/file-upload";\n\nexport function FileUploadExample() {\n  return (\n    <div className="w-full max-w-md">\n      <FileUpload\n        title="Upload OKLCH theme preset"\n        description="JSON token bundles up to 2MB"\n        accept=".json"\n        aria-label="Upload OKLCH theme preset file"\n      />\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["FileUpload", "formatAcceptedTypes", "formatFileSize"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "accept",
          type: "string",
          required: false,
          description: "Configures accept on FileUpload.",
        },
        {
          name: "description",
          type: "React.ReactNode",
          required: false,
          description: "Configures description on FileUpload.",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          description: "Configures disabled on FileUpload.",
        },
        {
          name: "maxFiles",
          type: "number",
          required: false,
          description: "Configures maxFiles on FileUpload.",
        },
        {
          name: "maxSizeMB",
          type: "number",
          required: false,
          description: "Configures maxSizeMB on FileUpload.",
        },
        {
          name: "onChange",
          type: "(files: FileItem[]) => void",
          required: false,
          description: "Configures onChange on FileUpload.",
        },
        {
          name: "title",
          type: "React.ReactNode",
          required: false,
          description: "Configures title on FileUpload.",
        },
        {
          name: "value",
          type: "FileItem[]",
          required: false,
          description: "Configures value on FileUpload.",
        },
      ],
    },
    {
      slug: "hover-card",
      name: "HoverCard",
      category: "Overlays & Surfaces",
      path: "src/components/ui/hover-card.tsx",
      docPath: "public/docs/components/hover-card.md",
      summary: "Rich contextual preview popover triggered on pointer hover or keyboard focus.",
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
      anatomy:
        '<HoverCard>\n  <HoverCardTrigger href="#spec">@design-system</HoverCardTrigger>\n  <HoverCardContent>\n    <p className="text-xs">57 verified primitives in OKLCH.</p>\n  </HoverCardContent>\n</HoverCard>',
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
      slotsAndPairing:
        "Pairs HoverCardTrigger and HoverCardContent with Avatar or Badge summaries.",
      exampleCode:
        'import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";\n\nexport function HoverCardExample() {\n  return (\n    <HoverCard>\n      <HoverCardTrigger\n        href="#docs"\n        className="font-mono text-xs font-medium text-primary underline underline-offset-4"\n      >\n        @antigravity/primitives\n      </HoverCardTrigger>\n      <HoverCardContent>\n        <p className="text-xs leading-relaxed text-muted-foreground">\n          57 accessible primitives verified against WCAG 2.2 AA and APCA perceptual contrast.\n        </p>\n      </HoverCardContent>\n    </HoverCard>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["HoverCard", "HoverCardContent", "HoverCardPortal", "HoverCardTrigger"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "align",
          type: 'PreviewCardPrimitive.Positioner.Props["align"]',
          required: false,
          description: "Configures align on HoverCard.",
        },
        {
          name: "side",
          type: 'PreviewCardPrimitive.Positioner.Props["side"]',
          required: false,
          description: "Configures side on HoverCard.",
        },
        {
          name: "sideOffset",
          type: "number",
          required: false,
          description: "Configures sideOffset on HoverCard.",
        },
      ],
    },
    {
      slug: "image",
      name: "Image",
      category: "Data & Feedback",
      path: "src/components/ui/image.tsx",
      docPath: "public/docs/components/image.md",
      summary: "Zero-CLS progressive media loader with smooth decoding fade.",
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
      anatomy:
        '<ProgressiveImage src={assetSrc} alt="Verified surface specimen" aspectRatio="16/9" />',
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
      exampleCode:
        'import { ProgressiveImage } from "@/components/ui/image";\n\nconst SPECIMEN_IMAGE_URI =\n  "data:image/svg+xml;utf8," +\n  encodeURIComponent(\n    \'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="#171717"/><circle cx="320" cy="180" r="96" fill="none" stroke="#e5e5e5" stroke-width="2"/><rect x="224" y="136" width="192" height="88" rx="16" fill="none" stroke="#a3a3a3" stroke-width="1.5"/></svg>\'\n  );\n\nexport function ImageExample() {\n  return (\n    <div className="w-full max-w-sm">\n      <ProgressiveImage\n        src={SPECIMEN_IMAGE_URI}\n        alt="Geometric design token proportion diagram"\n        aspectRatio="16/9"\n        className="rounded-xl border border-border/60"\n      />\n    </div>\n  );\n}',
      dependencies: ["lucide-react", "motion", "react"],
      exports: ["ProgressiveImage"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "aspectRatio",
          type: "string",
          required: false,
          description: "Configures aspectRatio on Image.",
        },
        {
          name: "containerClassName",
          type: "string",
          required: false,
          description: "Configures containerClassName on Image.",
        },
        {
          name: "placeholderSrc",
          type: "string",
          required: false,
          description: "Configures placeholderSrc on Image.",
        },
      ],
    },
    {
      slug: "input",
      name: "Input",
      category: "Forms & Input",
      path: "src/components/ui/input.tsx",
      docPath: "public/docs/components/input.md",
      summary: "16px iOS zoom-safe text field with specular border and prefix/suffix slots.",
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
      anatomy:
        '<Input inputSize="default" leftIcon={<SearchIcon size={16} />} placeholder="Search tokens..." />',
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
      exampleCode:
        'import * as React from "react";\nimport { SearchIcon } from "@/components/icons";\nimport { Field, FieldLabel } from "@/components/ui/field";\nimport { Input } from "@/components/ui/input";\n\nexport function InputExample() {\n  const [query, setQuery] = React.useState("");\n\n  return (\n    <div className="w-full max-w-sm">\n      <Field>\n        <FieldLabel>Filter Primitives</FieldLabel>\n        <Input\n          value={query}\n          onChange={(e) => setQuery(e.target.value)}\n          placeholder="Search buttons, forms, tokens..."\n          leftIcon={<SearchIcon size={16} aria-hidden="true" />}\n        />\n      </Field>\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "class-variance-authority", "react"],
      exports: ["Input", "inputVariants"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "error",
          type: "boolean",
          required: false,
          description: "Configures error on Input.",
        },
        {
          name: "leftIcon",
          type: "React.ReactNode",
          required: false,
          description: "Configures leftIcon on Input.",
        },
        {
          name: "prefixText",
          type: "string",
          required: false,
          description: "Configures prefixText on Input.",
        },
        {
          name: "rightIcon",
          type: "React.ReactNode",
          required: false,
          description: "Configures rightIcon on Input.",
        },
        {
          name: "suffixText",
          type: "string",
          required: false,
          description: "Configures suffixText on Input.",
        },
      ],
    },
    {
      slug: "input-otp",
      name: "InputOTP",
      category: "Forms & Input",
      path: "src/components/ui/input-otp.tsx",
      docPath: "public/docs/components/input-otp.md",
      summary: "Segmented PIN code input with clipboard autofill and digit focus stepping.",
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
      anatomy:
        '<InputOTP maxLength={6} aria-label="Verification code">\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    <InputOTPSlot index={1} />\n    <InputOTPSlot index={2} />\n  </InputOTPGroup>\n  <InputOTPSeparator />\n  <InputOTPGroup>\n    <InputOTPSlot index={3} />\n    <InputOTPSlot index={4} />\n    <InputOTPSlot index={5} />\n  </InputOTPGroup>\n</InputOTP>',
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
      exampleCode:
        'import * as React from "react";\nimport { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";\n\nexport function InputOTPExample() {\n  const [code, setCode] = React.useState("482910");\n\n  return (\n    <div className="flex flex-col items-center gap-2">\n      <InputOTP\n        maxLength={6}\n        value={code}\n        onChange={setCode}\n        aria-label="Six-digit verification code"\n      >\n        <InputOTPGroup>\n          <InputOTPSlot index={0} />\n          <InputOTPSlot index={1} />\n          <InputOTPSlot index={2} />\n        </InputOTPGroup>\n        <InputOTPSeparator />\n        <InputOTPGroup>\n          <InputOTPSlot index={3} />\n          <InputOTPSlot index={4} />\n          <InputOTPSlot index={5} />\n        </InputOTPGroup>\n      </InputOTP>\n      <span className="font-mono text-xs text-muted-foreground tabular-nums">\n        Entered value: {code || "------"}\n      </span>\n    </div>\n  );\n}',
      dependencies: ["motion", "react"],
      exports: ["InputOTP", "InputOTPGroup", "InputOTPSeparator", "InputOTPSlot"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "index",
          type: "number",
          required: true,
          description: "Configures index on InputOTP.",
        },
        {
          name: "containerClassName",
          type: "string",
          required: false,
          description: "Configures containerClassName on InputOTP.",
        },
        {
          name: "defaultValue",
          type: "string",
          required: false,
          description: "Configures defaultValue on InputOTP.",
        },
        {
          name: "mask",
          type: "boolean",
          required: false,
          description: "Configures mask on InputOTP.",
        },
        {
          name: "maxLength",
          type: "number",
          required: false,
          description: "Configures maxLength on InputOTP.",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          required: false,
          description: "Configures onChange on InputOTP.",
        },
        {
          name: "onComplete",
          type: "(value: string) => void",
          required: false,
          description: "Configures onComplete on InputOTP.",
        },
        {
          name: "value",
          type: "string",
          required: false,
          description: "Configures value on InputOTP.",
        },
      ],
    },
    {
      slug: "kbd",
      name: "Kbd",
      category: "Data & Feedback",
      path: "src/components/ui/kbd.tsx",
      docPath: "public/docs/components/kbd.md",
      summary: "Tactile keycap micro-primitive styled with tabular monospace proportions.",
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
      anatomy: '<div className="inline-flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>D</Kbd></div>',
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
      slotsAndPairing:
        "Embeds cleanly inside CommandShortcut, Button hints, and DocArticle tables.",
      exampleCode:
        'import { Kbd } from "@/components/ui/kbd";\n\nexport function KbdExample() {\n  return (\n    <div className="flex items-center gap-4 text-xs text-muted-foreground">\n      <span className="inline-flex items-center gap-1">\n        Command Palette <Kbd>⌘</Kbd>\n        <Kbd>K</Kbd>\n      </span>\n      <span className="inline-flex items-center gap-1">\n        Documentation <Kbd>⌘</Kbd>\n        <Kbd>D</Kbd>\n      </span>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["Kbd"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "size",
          type: '"xs" | "sm" | "default" | "lg"',
          required: false,
          description: "Configures size on Kbd.",
        },
        {
          name: "variant",
          type: '"default" | "inverted"',
          required: false,
          description: "Configures variant on Kbd.",
        },
      ],
    },
    {
      slug: "markdown-toolbar",
      name: "MarkdownToolbar",
      category: "Actions & Toggles",
      path: "src/components/ui/markdown-toolbar/index.ts",
      docPath: "public/docs/components/markdown-toolbar.md",
      summary: "Rich Markdown formatting toolbar with 20 actions and list/table generators.",
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
      anatomy:
        '<MarkdownToolbar textareaRef={textareaRef} viewMode={viewMode} onViewModeChange={setViewMode} aria-label="Markdown formatting" />',
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
      exampleCode:
        'import * as React from "react";\nimport { MarkdownToolbar } from "@/components/ui/markdown-toolbar";\nimport { Textarea } from "@/components/ui/textarea";\n\nexport function MarkdownToolbarExample() {\n  const [markdown, setMarkdown] = React.useState(\n    "## Release Summary\\n\\nAll 57 primitives pass WCAG 2.2 AA and APCA gates."\n  );\n  const editorRef = React.useRef<HTMLTextAreaElement>(null);\n\n  return (\n    <div className="flex w-full max-w-lg flex-col gap-2">\n      <MarkdownToolbar textareaRef={editorRef} aria-label="Release notes formatting toolbar" />\n      <Textarea\n        ref={editorRef}\n        rows={3}\n        value={markdown}\n        onChange={(e) => setMarkdown(e.target.value)}\n        aria-label="Release notes Markdown editor"\n      />\n    </div>\n  );\n}',
      dependencies: ["lucide-react", "react"],
      exports: [
        "ActionButton",
        "MarkdownToolbar",
        "applyTextMutation",
        "stripStructuralPrefix",
        "useMarkdownToolbar",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "hideHistory",
          type: "boolean",
          required: false,
          description: "Allows consumers to hide specific action clusters.",
        },
        {
          name: "hideInserts",
          type: "boolean",
          required: false,
          description: "Configures hideInserts on MarkdownToolbar.",
        },
        {
          name: "hideViewMode",
          type: "boolean",
          required: false,
          description: "Configures hideViewMode on MarkdownToolbar.",
        },
        {
          name: "onAction",
          type: "(actionName: string) => void",
          required: false,
          description: "Callback fired whenever any markdown action is executed.",
        },
        {
          name: "onViewModeChange",
          type: '(mode: "edit" | "split" | "preview") => void',
          required: false,
          description: "Callback fired when view mode changes.",
        },
        {
          name: "textareaRef",
          type: "React.RefObject<HTMLTextAreaElement | null>",
          required: false,
          description: "Reference to the controlled or uncontrolled textarea element.",
        },
        {
          name: "viewMode",
          type: '"edit" | "split" | "preview"',
          required: false,
          description: "Current active view mode when paired with a preview panel.",
        },
      ],
    },
    {
      slug: "navigation-bar",
      name: "NavigationBar",
      category: "Navigation & Menus",
      path: "src/components/ui/navigation-bar/index.ts",
      docPath: "public/docs/components/navigation-bar.md",
      summary:
        "Responsive top navigation rail with mega menus, columns, and bounded overflow harvesting.",
      definingConstraint:
        "Prevents header text truncation and crowding using container queries, minimum 220px submenu columns, explicit popover width bases, and automatic overflow harvesting.",
      whenToUse: [
        "Global top application headers combining branding, mega-menu flyouts, direct route links, and utility actions.",
        "Responsive headers transitioning smoothly to a Sheet navigation drawer on narrow mobile screens.",
      ],
      whenNotToUse: [
        {
          primitive: "toolbar",
          reason: "Use Toolbar for scoped editor or canvas tool buttons.",
        },
        {
          primitive: "doc-layout",
          reason: "Use DocSidebar inside DocLayout for multi-section vertical documentation trees.",
        },
      ],
      anatomy:
        "<NavigationBar\n  brand={<span>Design System</span>}\n  items={navItems}\n  maxVisibleItems={4}\n  actions={<ThemeToggle isDark={isDark} onToggleDark={setIsDark} />}\n/>",
      a11yContract: [
        "Wraps desktop links in <nav> and supports full keyboard Escape/Tab dismissal on mega menus.",
        "Mobile Sheet trigger button declares explicit aria-label and traps drawer focus cleanly.",
      ],
      doAndDont: [
        {
          do: "Set maxVisibleItems (default 4 to 5) so excess top items automatically fold into More.",
          dont: "Apply truncate or overflow-hidden to primary NavigationBar item labels.",
        },
        {
          do: "Declare explicit width basis on custom flyouts to prevent absolute auto-width collapse.",
          dont: "Stuff search fields, 6 buttons, and 8 links into a narrow sticky bar without maxVisibleItems.",
        },
      ],
      slotsAndPairing:
        "Accepts brand, structured NavItemConfig[] arrays (simple, columns, mega, direct link), and trailing actions slots.",
      exampleCode:
        'import { LayersIcon, ShieldCheckIcon } from "@/components/icons";\nimport { NavigationBar, type NavItemConfig } from "@/components/ui/navigation-bar";\n\nconst SAMPLE_NAV_ITEMS: NavItemConfig[] = [\n  {\n    label: "Platform",\n    type: "simple",\n    links: [\n      {\n        title: "UI Primitives",\n        description: "57 accessible components",\n        href: "#primitives",\n        icon: <LayersIcon size={16} />,\n      },\n      {\n        title: "Compiler Invariants",\n        description: "18 static checks",\n        href: "#invariants",\n        icon: <ShieldCheckIcon size={16} />,\n      },\n    ],\n  },\n  { label: "Documentation", href: "#docs" },\n  { label: "Tokens", href: "#tokens" },\n];\n\nexport function NavigationBarExample() {\n  return (\n    <div className="w-full max-w-xl">\n      <NavigationBar\n        brand={<span className="text-sm font-semibold text-foreground">Design Standard</span>}\n        items={SAMPLE_NAV_ITEMS}\n        maxVisibleItems={3}\n      />\n    </div>\n  );\n}',
      dependencies: ["motion", "react"],
      exports: [
        "NavActions",
        "NavBrand",
        "NavColumnsMenu",
        "NavItem",
        "NavItemLink",
        "NavList",
        "NavMegaMenu",
        "NavMenuLink",
        "NavSimpleMenu",
        "NavigationBar",
        "NavigationContext",
        "useNavigation",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Configures id on NavigationBar.",
        },
        {
          name: "label",
          type: "string",
          required: true,
          description: "Configures label on NavigationBar.",
        },
        {
          name: "title",
          type: "string",
          required: true,
          description: "Configures title on NavigationBar.",
        },
        {
          name: "actions",
          type: "React.ReactNode",
          required: false,
          description: "Configures actions on NavigationBar.",
        },
        {
          name: "align",
          type: '"start" | "center" | "end"',
          required: false,
          description: "Configures align on NavigationBar.",
        },
        {
          name: "badge",
          type: "string",
          required: false,
          description: "Configures badge on NavigationBar.",
        },
        {
          name: "brand",
          type: "React.ReactNode",
          required: false,
          description: "Configures brand on NavigationBar.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: false,
          description: "Configures children on NavigationBar.",
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Configures className on NavigationBar.",
        },
        {
          name: "columns",
          type: "NavMenuColumn[]",
          required: false,
          description: "Configures columns on NavigationBar.",
        },
        {
          name: "containerClassName",
          type: "string",
          required: false,
          description: "Configures containerClassName on NavigationBar.",
        },
        {
          name: "description",
          type: "string",
          required: false,
          description: "Configures description on NavigationBar.",
        },
        {
          name: "featured",
          type: "NavMegaFeatured",
          required: false,
          description: "Configures featured on NavigationBar.",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          required: false,
          description: "Configures icon on NavigationBar.",
        },
        {
          name: "isActive",
          type: "boolean",
          required: false,
          description: "Configures isActive on NavigationBar.",
        },
        {
          name: "isExternal",
          type: "boolean",
          required: false,
          description: "Configures isExternal on NavigationBar.",
        },
        {
          name: "items",
          type: "NavItemConfig[]",
          required: false,
          description: "Configures items on NavigationBar.",
        },
        {
          name: "links",
          type: "NavMenuLinkItem[]",
          required: false,
          description: "Configures links on NavigationBar.",
        },
        {
          name: "maxVisibleItems",
          type: "number",
          required: false,
          description:
            'Maximum number of items rendered directly on desktop before folding into "More ▾". Guarantees zero clashing with actions on the right regardless of how many items exist.',
        },
        {
          name: "mobileBrand",
          type: "React.ReactNode",
          required: false,
          description: "Configures mobileBrand on NavigationBar.",
        },
        {
          name: "mobileFooter",
          type: "React.ReactNode",
          required: false,
          description: "Configures mobileFooter on NavigationBar.",
        },
        {
          name: "moreBadge",
          type: "string",
          required: false,
          description: "Custom badge for the synthesized overflow dropdown trigger.",
        },
        {
          name: "moreLabel",
          type: "string",
          required: false,
          description: "Custom label for the synthesized overflow dropdown trigger.",
        },
        {
          name: "sticky",
          type: "boolean",
          required: false,
          description: "Configures sticky on NavigationBar.",
        },
      ],
    },
    {
      slug: "number-ticker",
      name: "NumberTicker",
      category: "Data & Feedback",
      path: "src/components/ui/number-ticker.tsx",
      docPath: "public/docs/components/number-ticker.md",
      summary: "Tabular numeral spring counter preventing horizontal digit jitter.",
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
      anatomy: '<NumberTicker value={99.4} decimalPlaces={1} suffix="%" />',
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
      exampleCode:
        'import { NumberTicker } from "@/components/ui/number-ticker";\n\nexport function NumberTickerExample() {\n  return (\n    <div className="flex items-baseline gap-2 text-2xl font-bold text-foreground tabular-nums">\n      <NumberTicker value={100.0} decimalPlaces={1} suffix="%" />\n      <span className="text-xs font-medium text-muted-foreground">Quality Score</span>\n    </div>\n  );\n}',
      dependencies: ["motion", "react"],
      exports: ["NumberTicker"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "value",
          type: "number",
          required: true,
          description: "Configures value on NumberTicker.",
        },
        {
          name: "decimalPlaces",
          type: "number",
          required: false,
          description: "Configures decimalPlaces on NumberTicker.",
        },
        {
          name: "prefix",
          type: "string",
          required: false,
          description: "Configures prefix on NumberTicker.",
        },
        {
          name: "suffix",
          type: "string",
          required: false,
          description: "Configures suffix on NumberTicker.",
        },
      ],
    },
    {
      slug: "pagination",
      name: "Pagination",
      category: "Navigation & Menus",
      path: "src/components/ui/pagination.tsx",
      docPath: "public/docs/components/pagination.md",
      summary: "Paged collection controller with compact numeric and worded triggers.",
      definingConstraint:
        "Formats numeric page counters with tabular-nums and frames active pages via colour contrast rather than weight shifts so buttons never jitter across pages.",
      whenToUse: [
        "Stepping through server-backed or large client collections split into deterministic pages.",
        "Icon galleries, audit log tables, and search result sets.",
      ],
      whenNotToUse: [
        {
          primitive: "tabs",
          reason:
            "Use Tabs when switching between named categorical views rather than sequential pages.",
        },
        {
          primitive: "stepper",
          reason: "Use Stepper for selecting numeric input quantities in forms.",
        },
      ],
      anatomy: "<Pagination currentPage={page} totalPages={8} onPageChange={setPage} />",
      a11yContract: [
        'Previous/Next triggers and current active page declare clear accessible labels and aria-current="page".',
        "Disables Previous on page 1 and Next on final page without layout shift.",
      ],
      doAndDont: [
        {
          do: "Display totalPages >= 2 only when collection spans multiple pages.",
          dont: "Alter font-weight or border width on the active page indicator button.",
        },
        {
          do: "Synchronise active page resets cleanly when upstream search filters narrow results.",
          dont: "Leave stale out-of-range page numbers highlighted after filtering.",
        },
      ],
      slotsAndPairing: "Pairs below Table or icon grid collections inside index-first workbenches.",
      exampleCode:
        'import * as React from "react";\nimport { Pagination } from "@/components/ui/pagination";\n\nexport function PaginationExample() {\n  const [page, setPage] = React.useState(2);\n\n  return <Pagination currentPage={page} totalPages={6} onPageChange={setPage} />;\n}',
      dependencies: ["motion", "react"],
      exports: [
        "Pagination",
        "PaginationContent",
        "PaginationEllipsis",
        "PaginationItem",
        "PaginationLink",
        "PaginationNext",
        "PaginationNextIcon",
        "PaginationPrevious",
        "PaginationPreviousIcon",
        "getPaginationItems",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "buttonVariant",
          type: '"worded" | "icon"',
          required: false,
          description:
            'Display variant for Previous/Next buttons in turnkey mode: - "worded": Displays icon and text label ("Previous" / "Next"). - "icon": Compact square icon-only buttons (size-8) matching numerical page pills.',
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: false,
          description: "Configures children on Pagination.",
        },
        {
          name: "currentPage",
          type: "number",
          required: false,
          description: "Configures currentPage on Pagination.",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          description: "Configures disabled on Pagination.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          required: false,
          description: 'Convenience boolean shorthand for variant="icon".',
        },
        {
          name: "isActive",
          type: "boolean",
          required: false,
          description: "Configures isActive on Pagination.",
        },
        {
          name: "label",
          type: "React.ReactNode",
          required: false,
          description:
            'Optional custom text label when rendered in worded mode. Defaults to "Previous" or "Next".',
        },
        {
          name: "layoutId",
          type: "string",
          required: false,
          description: "Configures layoutId on Pagination.",
        },
        {
          name: "onPageChange",
          type: "(page: number) => void",
          required: false,
          description: "Configures onPageChange on Pagination.",
        },
        {
          name: "showButtonLabels",
          type: "boolean",
          required: false,
          description: "Convenience boolean shorthand: setting false enables icon-only buttons.",
        },
        {
          name: "totalPages",
          type: "number",
          required: false,
          description: "Configures totalPages on Pagination.",
        },
        {
          name: "variant",
          type: '"worded" | "icon"',
          required: false,
          description:
            'Display mode for the button: - "worded": Displays icon and text label (e.g. "< Previous" or "Next >"). - "icon": Compact square icon-only button (size-8) matching numerical page pills.',
        },
      ],
    },
    {
      slug: "popover",
      name: "Popover",
      category: "Overlays & Surfaces",
      path: "src/components/ui/popover.tsx",
      docPath: "public/docs/components/popover.md",
      summary: "Collision-aware floating overlay anchored cleanly to its trigger.",
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
      anatomy:
        '<Popover>\n  <PopoverTrigger className={buttonVariants({ variant: "outline" })}>Configure</PopoverTrigger>\n  <PopoverContent>\n    <PopoverHeader>\n      <PopoverTitle>Grid Snap</PopoverTitle>\n      <PopoverDescription>Adjust snapping granularity.</PopoverDescription>\n    </PopoverHeader>\n  </PopoverContent>\n</Popover>',
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
      exampleCode:
        'import { buttonVariants } from "@/components/ui/button";\nimport { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";\n\nexport function PopoverExample() {\n  return (\n    <Popover>\n      <PopoverTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>\n        Inspect Thresholds\n      </PopoverTrigger>\n      <PopoverContent className="w-72">\n        <PopoverHeader>\n          <PopoverTitle>Contrast Floors</PopoverTitle>\n          <PopoverDescription>\n            Body prose requires Lc 75+; controls require Lc 60+.\n          </PopoverDescription>\n        </PopoverHeader>\n      </PopoverContent>\n    </Popover>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "Popover",
        "PopoverClose",
        "PopoverContent",
        "PopoverDescription",
        "PopoverHeader",
        "PopoverPortal",
        "PopoverTitle",
        "PopoverTrigger",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "align",
          type: 'PopoverPrimitive.Positioner.Props["align"]',
          required: false,
          description: "Configures align on Popover.",
        },
        {
          name: "alignOffset",
          type: 'PopoverPrimitive.Positioner.Props["alignOffset"]',
          required: false,
          description: "Configures alignOffset on Popover.",
        },
        {
          name: "anchor",
          type: 'PopoverPrimitive.Positioner.Props["anchor"]',
          required: false,
          description: "Configures anchor on Popover.",
        },
        {
          name: "collisionAvoidance",
          type: 'PopoverPrimitive.Positioner.Props["collisionAvoidance"]',
          required: false,
          description: "Configures collisionAvoidance on Popover.",
        },
        {
          name: "disableAnchorTracking",
          type: 'PopoverPrimitive.Positioner.Props["disableAnchorTracking"]',
          required: false,
          description: "Configures disableAnchorTracking on Popover.",
        },
        {
          name: "portalProps",
          type: "PopoverPrimitive.Portal.Props",
          required: false,
          description: "Configures portalProps on Popover.",
        },
        {
          name: "side",
          type: 'PopoverPrimitive.Positioner.Props["side"]',
          required: false,
          description: "Configures side on Popover.",
        },
        {
          name: "sideOffset",
          type: 'PopoverPrimitive.Positioner.Props["sideOffset"]',
          required: false,
          description: "Configures sideOffset on Popover.",
        },
      ],
    },
    {
      slug: "progress",
      name: "Progress",
      category: "Data & Feedback",
      path: "src/components/ui/progress.tsx",
      docPath: "public/docs/components/progress.md",
      summary:
        "Deterministic linear progress bar and radial gauge with smooth spring interpolation.",
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
      anatomy: '<Progress value={72} aria-label="Bundle compilation" />',
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
      exampleCode:
        'import { CircularProgress, Progress } from "@/components/ui/progress";\n\nexport function ProgressExample() {\n  return (\n    <div className="flex w-full max-w-sm items-center gap-4">\n      <div className="min-w-0 flex-1">\n        <Progress value={84} aria-label="AST documentation compilation progress" />\n      </div>\n      <CircularProgress value={84} aria-label="Circular compilation completion" />\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "motion", "react"],
      exports: ["CircularProgress", "Progress"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "showValue",
          type: "boolean",
          required: false,
          description: "Configures showValue on Progress.",
        },
        {
          name: "size",
          type: '"sm" | "default" | "lg"',
          required: false,
          description: "Configures size on Progress.",
        },
        {
          name: "strokeWidth",
          type: "number",
          required: false,
          description: "Configures strokeWidth on Progress.",
        },
        {
          name: "value",
          type: "number | null",
          required: false,
          description: "Configures value on Progress.",
        },
      ],
    },
    {
      slug: "prop-table",
      name: "PropTable",
      category: "Documentation & Schematics",
      path: "src/components/ui/prop-table.tsx",
      docPath: "public/docs/components/prop-table.md",
      summary:
        "Anti-crush TypeScript API reference table displaying props, types, defaults, and required pills.",
      definingConstraint:
        "Renders anti-crush TypeScript prop specifications inside a responsive Table using shrink-0 Required badges and tabular default indicators.",
      whenToUse: [
        "Documenting exported TypeScript *Props interfaces extracted by AST or authored manually.",
        "Comparing prop names, union type strings, default values, and Required flags cleanly.",
      ],
      whenNotToUse: [
        {
          primitive: "table",
          reason: "Use Table directly for operational datasets, metrics, or cluster ledgers.",
        },
      ],
      anatomy:
        '<PropTable title="ButtonProps" props={[{ name: "variant", type: \'"default" | "outline"\', defaultValue: \'"default"\', description: "Selects visual button role." }]} />',
      a11yContract: [
        'Preserves semantic `<th scope="col">` headers and optional `<TableCaption>` context.',
        "Required pills declare shrink-0 whitespace-nowrap so prop names never wrap awkwardly.",
      ],
      doAndDont: [
        {
          do: "Populate props directly from docsManifest.primitives to guarantee zero API drift.",
          dont: "Squeeze long union signatures into narrow fixed-pixel columns without min-w-[140px].",
        },
        {
          do: "Use accurate TypeScript notation inside type signatures.",
          dont: "Leave empty unlabelled tables when props array is empty; rely on emptyMessage fallback.",
        },
      ],
      slotsAndPairing:
        "Built atop Table and Badge primitives and paired inside DocArticle reference pages.",
      exampleCode:
        'import { PropTable, type PropDefinition } from "@/components/ui/prop-table";\n\nconst SAMPLE_PROPS: PropDefinition[] = [\n  {\n    name: "variant",\n    type: \'"default" | "outline" | "destructive"\',\n    defaultValue: \'"default"\',\n    description: "Selects visual button role without shifting border width.",\n  },\n  {\n    name: "leftIcon",\n    type: "React.ReactNode",\n    required: false,\n    description: "Optional kinetic icon bound to parent button lifecycle.",\n  },\n];\n\nexport function PropTableExample() {\n  return (\n    <div className="w-full max-w-xl">\n      <PropTable title="SampleProps" props={SAMPLE_PROPS} />\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["PropTable"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "props",
          type: "PropDefinition[]",
          required: true,
          description: "Component prop rows to document",
        },
        {
          name: "caption",
          type: "string",
          required: false,
          description: "Optional caption describing inherited DOM attributes",
        },
        {
          name: "emptyMessage",
          type: "string",
          required: false,
          description: "Fallback text displayed when props array is empty",
        },
        {
          name: "title",
          type: "string",
          required: false,
          description: "Optional table heading label",
        },
      ],
    },
    {
      slug: "radio-group",
      name: "RadioGroup",
      category: "Forms & Input",
      path: "src/components/ui/radio-group.tsx",
      docPath: "public/docs/components/radio-group.md",
      summary: "WAI-ARIA compliant mutual exclusion selector with animated indicator.",
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
      anatomy:
        '<RadioGroup value={plan} onValueChange={setPlan} aria-label="Plan tier">\n  <label className="flex items-center gap-2">\n    <RadioGroupItem value="starter" />\n    <span>Starter</span>\n  </label>\n</RadioGroup>',
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
      exampleCode:
        'import * as React from "react";\nimport { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";\n\nexport function RadioGroupExample() {\n  const [tier, setTier] = React.useState("standard");\n\n  return (\n    <RadioGroup\n      value={tier}\n      onValueChange={(next) => setTier(String(next))}\n      aria-label="Contrast verification threshold"\n      className="flex flex-col gap-2"\n    >\n      <label className="inline-flex items-center gap-2.5 text-sm text-foreground">\n        <RadioGroupItem value="standard" />\n        <span>WCAG 2.2 AA + APCA Standard</span>\n      </label>\n      <label className="inline-flex items-center gap-2.5 text-sm text-foreground">\n        <RadioGroupItem value="strict" />\n        <span>WCAG 2.2 AAA + APCA 75+ Editorial</span>\n      </label>\n    </RadioGroup>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["RadioGroup", "RadioGroupItem"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "size",
          type: '"sm" | "default"',
          required: false,
          description: "Configures size on RadioGroup.",
        },
      ],
    },
    {
      slug: "resizable",
      name: "Resizable",
      category: "Data & Feedback",
      path: "src/components/ui/resizable.tsx",
      docPath: "public/docs/components/resizable.md",
      summary: "Keyboard and drag split-pane layout controller for workbench interfaces.",
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
      anatomy:
        '<ResizablePanelGroup direction="horizontal" defaultSizes={[45, 55]}>\n  <ResizablePanel order={0} defaultSize={45}>Controls</ResizablePanel>\n  <ResizableHandle handleIndex={0} withHandle />\n  <ResizablePanel order={1} defaultSize={55}>Stage</ResizablePanel>\n</ResizablePanelGroup>',
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
      exampleCode:
        'import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";\n\nexport function ResizableExample() {\n  return (\n    <div className="h-28 w-full max-w-md overflow-hidden rounded-xl border border-border/70">\n      <ResizablePanelGroup direction="horizontal" defaultSizes={[45, 55]}>\n        <ResizablePanel order={0} defaultSize={45}>\n          <div className="flex h-full items-center justify-center bg-muted/40 p-3 text-xs text-muted-foreground">\n            Inspector\n          </div>\n        </ResizablePanel>\n        <ResizableHandle handleIndex={0} withHandle />\n        <ResizablePanel order={1} defaultSize={55}>\n          <div className="flex h-full items-center justify-center bg-card p-3 text-xs text-foreground">\n            Canvas Stage\n          </div>\n        </ResizablePanel>\n      </ResizablePanelGroup>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["ResizableHandle", "ResizablePanel", "ResizablePanelGroup"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "defaultSize",
          type: "number",
          required: false,
          description: "Configures defaultSize on Resizable.",
        },
        {
          name: "defaultSizes",
          type: "number[]",
          required: false,
          description: "Configures defaultSizes on Resizable.",
        },
        {
          name: "direction",
          type: '"horizontal" | "vertical"',
          required: false,
          description: "Configures direction on Resizable.",
        },
        {
          name: "handleIndex",
          type: "number",
          required: false,
          description: "Configures handleIndex on Resizable.",
        },
        {
          name: "minSize",
          type: "number",
          required: false,
          description: "Configures minSize on Resizable.",
        },
        {
          name: "onLayout",
          type: "(sizes: number[]) => void",
          required: false,
          description: "Configures onLayout on Resizable.",
        },
        {
          name: "order",
          type: "number",
          required: false,
          description: "Configures order on Resizable.",
        },
        {
          name: "withHandle",
          type: "boolean",
          required: false,
          description: "Configures withHandle on Resizable.",
        },
      ],
    },
    {
      slug: "scroll-area",
      name: "ScrollArea",
      category: "Data & Feedback",
      path: "src/components/ui/scroll-area.tsx",
      docPath: "public/docs/components/scroll-area.md",
      summary: "Cross-browser custom scrollbar viewport preserving layout gutter parity.",
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
      anatomy:
        '<ScrollArea className="h-36 w-full rounded-xl border p-3">\n  <div className="space-y-2">...</div>\n  <ScrollBar orientation="vertical" />\n</ScrollArea>',
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
      exampleCode:
        'import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";\n\nexport function ScrollAreaExample() {\n  return (\n    <ScrollArea className="h-28 w-full max-w-sm rounded-xl border border-border/70 p-3">\n      <div className="space-y-1.5 text-xs text-muted-foreground">\n        <p>Directive 01: Physical yield on pointerdown</p>\n        <p>Directive 02: Zero layout shifts across states</p>\n        <p>Directive 03: Tabular numerals on numeric columns</p>\n        <p>Directive 06: Concentric nested corner radii</p>\n        <p>Directive 11: Perceptual OKLCH contrast gates</p>\n      </div>\n      <ScrollBar orientation="vertical" />\n    </ScrollArea>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["ScrollArea", "ScrollBar"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "viewportClassName",
          type: "string",
          required: false,
          description: "Configures viewportClassName on ScrollArea.",
        },
        {
          name: "viewportRef",
          type: "React.Ref<HTMLDivElement>",
          required: false,
          description: "Configures viewportRef on ScrollArea.",
        },
      ],
    },
    {
      slug: "segmented-control",
      name: "SegmentedControl",
      category: "Actions & Toggles",
      path: "src/components/ui/segmented-control.tsx",
      docPath: "public/docs/components/segmented-control.md",
      summary: "Sliding pill mode switcher with compositor spring glide and frozen text metrics.",
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
      anatomy:
        '<SegmentedControl value={mode} onValueChange={setMode} aria-label="View mode">\n  <SegmentedControlItem value="preview">Preview</SegmentedControlItem>\n  <SegmentedControlItem value="code">Code</SegmentedControlItem>\n</SegmentedControl>',
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
      exampleCode:
        'import * as React from "react";\nimport { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";\n\nexport function SegmentedControlExample() {\n  const [viewMode, setViewMode] = React.useState("preview");\n\n  return (\n    <SegmentedControl\n      value={viewMode}\n      onValueChange={setViewMode}\n      aria-label="Documentation display mode"\n    >\n      <SegmentedControlItem value="preview">Preview</SegmentedControlItem>\n      <SegmentedControlItem value="code">Code</SegmentedControlItem>\n      <SegmentedControlItem value="tokens">Tokens</SegmentedControlItem>\n    </SegmentedControl>\n  );\n}',
      dependencies: ["motion", "react"],
      exports: ["SegmentedControl", "SegmentedControlItem"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Configures children on SegmentedControl.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          required: true,
          description: "Configures onValueChange on SegmentedControl.",
        },
        {
          name: "value",
          type: "string",
          required: true,
          description: "Configures value on SegmentedControl.",
        },
        {
          name: "size",
          type: '"sm" | "default"',
          required: false,
          description: "Configures size on SegmentedControl.",
        },
      ],
    },
    {
      slug: "select",
      name: "Select",
      category: "Forms & Input",
      path: "src/components/ui/select.tsx",
      docPath: "public/docs/components/select.md",
      summary: "Headless Base UI selector with keyboard navigation and liquid glass popup.",
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
      anatomy:
        '<Select value={region} onValueChange={setRegion}>\n  <SelectTrigger aria-label="Deployment region">\n    <SelectValue placeholder="Choose region" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="lon">London (eu-west-2)</SelectItem>\n  </SelectContent>\n</Select>',
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
      exampleCode:
        'import * as React from "react";\nimport { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";\n\nexport function SelectExample() {\n  const [region, setRegion] = React.useState("eu-west-2");\n\n  return (\n    <div className="w-full max-w-xs">\n      <Select value={region} onValueChange={(next) => setRegion(next ?? "eu-west-2")}>\n        <SelectTrigger aria-label="Edge region selector">\n          <SelectValue placeholder="Choose region" />\n        </SelectTrigger>\n        <SelectContent>\n          <SelectItem value="eu-west-2">London (eu-west-2)</SelectItem>\n          <SelectItem value="us-east-1">Virginia (us-east-1)</SelectItem>\n          <SelectItem value="ap-northeast-1">Tokyo (ap-northeast-1)</SelectItem>\n        </SelectContent>\n      </Select>\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "Select",
        "SelectContent",
        "SelectGroup",
        "SelectGroupLabel",
        "SelectItem",
        "SelectSeparator",
        "SelectTrigger",
        "SelectValue",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "size",
          type: '"default" | "sm" | "lg"',
          required: false,
          description: "Configures size on Select.",
        },
      ],
    },
    {
      slug: "sheet",
      name: "Sheet",
      category: "Overlays & Surfaces",
      path: "src/components/ui/sheet.tsx",
      docPath: "public/docs/components/sheet.md",
      summary: "Slide-over side panel supporting top, right, bottom, and left edges.",
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
      anatomy:
        '<Sheet>\n  <SheetTrigger className={buttonVariants({ variant: "outline" })}>Inspect Logs</SheetTrigger>\n  <SheetContent side="right">\n    <SheetHeader>\n      <SheetTitle>Cluster Telemetry</SheetTitle>\n      <SheetDescription>Live event stream across edge regions.</SheetDescription>\n    </SheetHeader>\n  </SheetContent>\n</Sheet>',
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
      exampleCode:
        'import { buttonVariants } from "@/components/ui/button";\nimport { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";\n\nexport function SheetExample() {\n  return (\n    <Sheet>\n      <SheetTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>\n        Inspect Telemetry Sheet\n      </SheetTrigger>\n      <SheetContent side="right">\n        <SheetHeader>\n          <SheetTitle>Compiler Audit Stream</SheetTitle>\n          <SheetDescription>Recent invariant checks and AST sync results.</SheetDescription>\n        </SheetHeader>\n        <SheetFooter>\n          <SheetClose className={buttonVariants({ variant: "outline", size: "sm" })}>\n            Dismiss\n          </SheetClose>\n        </SheetFooter>\n      </SheetContent>\n    </Sheet>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: [
        "Sheet",
        "SheetBackdrop",
        "SheetClose",
        "SheetContent",
        "SheetDescription",
        "SheetFooter",
        "SheetHeader",
        "SheetPortal",
        "SheetTitle",
        "SheetTrigger",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "showCloseButton",
          type: "boolean",
          required: false,
          description: "Configures showCloseButton on Sheet.",
        },
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right"',
          required: false,
          description: "Configures side on Sheet.",
        },
      ],
    },
    {
      slug: "skeleton",
      name: "Skeleton",
      category: "Data & Feedback",
      path: "src/components/ui/skeleton.tsx",
      docPath: "public/docs/components/skeleton.md",
      summary: "Zero-CLS dimensionally stable loading placeholder surface.",
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
      anatomy:
        '<div className="flex items-center gap-3">\n  <Skeleton className="size-10 rounded-full" />\n  <div className="space-y-2">\n    <Skeleton className="h-4 w-40" />\n    <Skeleton className="h-3 w-24" />\n  </div>\n</div>',
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
      exampleCode:
        'import { Skeleton } from "@/components/ui/skeleton";\n\nexport function SkeletonExample() {\n  return (\n    <div className="flex items-center gap-3">\n      <Skeleton className="size-10 rounded-full" />\n      <div className="space-y-2">\n        <Skeleton className="h-3.5 w-36" />\n        <Skeleton className="h-3 w-24" />\n      </div>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["Skeleton"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "shimmer",
          type: "boolean",
          required: false,
          description: "Optional specular highlight across the shimmering skeleton surface.",
        },
      ],
    },
    {
      slug: "slider",
      name: "Slider",
      category: "Forms & Input",
      path: "src/components/ui/slider.tsx",
      docPath: "public/docs/components/slider.md",
      summary: "Direct-manipulation single and dual-thumb range control with value tooltip.",
      definingConstraint:
        "Locks track height while gliding single or dual thumbs along direct pointer scrub gestures with tabular numeric value readouts.",
      whenToUse: [
        "Adjusting continuous numeric coordinates such as OKLCH lightness, chroma, opacity, or min/max price ranges.",
        "Interactive visual inspection controls where live preview feedback responds immediately.",
      ],
      whenNotToUse: [
        {
          primitive: "stepper",
          reason:
            "Use Stepper when users increment discrete integer quantities accurately by +1/-1.",
        },
        {
          primitive: "input",
          reason: "Use Input when exact typed digits matter more than visual scrub speed.",
        },
      ],
      anatomy:
        '<Slider aria-label="Chroma intensity" value={chroma} onValueChange={setChroma} min={0} max={100} />',
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
      exampleCode:
        'import * as React from "react";\nimport { Slider } from "@/components/ui/slider";\n\nexport function SliderExample() {\n  const [lightness, setLightness] = React.useState(62);\n\n  return (\n    <div className="flex w-full max-w-sm flex-col gap-2">\n      <div className="flex items-center justify-between text-xs">\n        <span className="font-medium text-foreground">OKLCH Lightness Target</span>\n        <span className="font-mono text-muted-foreground tabular-nums">{lightness}%</span>\n      </div>\n      <Slider\n        aria-label="OKLCH Lightness Target"\n        value={lightness}\n        onValueChange={(next) => setLightness(Array.isArray(next) ? next[0] : next)}\n        min={0}\n        max={100}\n      />\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["Slider"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "defaultValue",
          type: "number | number[]",
          required: false,
          description: "Configures defaultValue on Slider.",
        },
        {
          name: "label",
          type: "React.ReactNode",
          required: false,
          description: "Configures label on Slider.",
        },
        {
          name: "showTooltip",
          type: "boolean",
          required: false,
          description: "Configures showTooltip on Slider.",
        },
        {
          name: "showValue",
          type: "boolean",
          required: false,
          description: "Configures showValue on Slider.",
        },
        {
          name: "value",
          type: "number | number[]",
          required: false,
          description: "Configures value on Slider.",
        },
        {
          name: "valuePrefix",
          type: "string",
          required: false,
          description: "Configures valuePrefix on Slider.",
        },
        {
          name: "valueSuffix",
          type: "string",
          required: false,
          description: "Configures valueSuffix on Slider.",
        },
      ],
    },
    {
      slug: "stepper",
      name: "Stepper",
      category: "Forms & Input",
      path: "src/components/ui/stepper.tsx",
      docPath: "public/docs/components/stepper.md",
      summary: "Tactile numeric stepper with hold-to-accelerate progression.",
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
      anatomy:
        '<Stepper value={replicas} onValueChange={setReplicas} min={1} max={16}>\n  <Stepper.Decrement aria-label="Decrease replicas" />\n  <Stepper.Value />\n  <Stepper.Increment aria-label="Increase replicas" />\n</Stepper>',
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
      exampleCode:
        'import * as React from "react";\nimport { Stepper } from "@/components/ui/stepper";\n\nexport function StepperExample() {\n  const [replicas, setReplicas] = React.useState(4);\n\n  return (\n    <Stepper value={replicas} onValueChange={setReplicas} min={1} max={12}>\n      <Stepper.Decrement aria-label="Decrease replicas" />\n      <Stepper.Value />\n      <Stepper.Increment aria-label="Increase replicas" />\n    </Stepper>\n  );\n}',
      dependencies: ["react"],
      exports: [
        "Stepper",
        "StepperControls",
        "StepperDecrement",
        "StepperIncrement",
        "StepperRoot",
        "StepperValue",
        "useStepperContext",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "value",
          type: "number",
          required: true,
          description: "Configures value on Stepper.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: false,
          description: "Configures children on Stepper.",
        },
        {
          name: "decimalPlaces",
          type: "number",
          required: false,
          description: "Configures decimalPlaces on Stepper.",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          description: "Configures disabled on Stepper.",
        },
        {
          name: "max",
          type: "number",
          required: false,
          description: "Configures max on Stepper.",
        },
        {
          name: "min",
          type: "number",
          required: false,
          description: "Configures min on Stepper.",
        },
        {
          name: "onStep",
          type: "() => void",
          required: false,
          description: "Optional override for stepping action",
        },
        {
          name: "onValueChange",
          type: "(value: number) => void",
          required: false,
          description: "Configures onValueChange on Stepper.",
        },
        {
          name: "prefix",
          type: "string",
          required: false,
          description: "Configures prefix on Stepper.",
        },
        {
          name: "step",
          type: "number",
          required: false,
          description: "Configures step on Stepper.",
        },
        {
          name: "suffix",
          type: "string",
          required: false,
          description: "Configures suffix on Stepper.",
        },
      ],
    },
    {
      slug: "switch",
      name: "Switch",
      category: "Forms & Input",
      path: "src/components/ui/switch.tsx",
      docPath: "public/docs/components/switch.md",
      summary: "44px accessible toggle switch with fluid thumb spring easing.",
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
      anatomy:
        '<label className="inline-flex items-center gap-3">\n  <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Live contrast gate" />\n  <span>Live Contrast Gate</span>\n</label>',
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
      slotsAndPairing:
        "Works well inside Card rows, Sheet preference drawers, and settings tables.",
      exampleCode:
        'import * as React from "react";\nimport { Switch } from "@/components/ui/switch";\n\nexport function SwitchExample() {\n  const [strictGate, setStrictGate] = React.useState(true);\n\n  return (\n    <label className="inline-flex items-center gap-3 text-sm text-foreground">\n      <Switch\n        checked={strictGate}\n        onCheckedChange={setStrictGate}\n        aria-label="Automatic AST docs verification"\n      />\n      <span>Automatic AST docs gate</span>\n    </label>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["Switch"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "size",
          type: '"sm" | "default"',
          required: false,
          description: "Configures size on Switch.",
        },
      ],
    },
    {
      slug: "table",
      name: "Table",
      category: "Data & Feedback",
      path: "src/components/ui/table.tsx",
      docPath: "public/docs/components/table.md",
      summary: "Quiet chrome data table with strict tabular numerals.",
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
      anatomy:
        "<Table>\n  <TableHeader><TableRow><TableHead>Region</TableHead><TableHead numeric>Latency</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>eu-west-2</TableCell><TableCell numeric>14 ms</TableCell></TableRow></TableBody>\n</Table>",
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
      exampleCode:
        'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";\n\nexport function TableExample() {\n  return (\n    <Table>\n      <TableHeader>\n        <TableRow>\n          <TableHead>Cluster Region</TableHead>\n          <TableHead numeric>P95 Latency</TableHead>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        <TableRow>\n          <TableCell>eu-west-2 (London)</TableCell>\n          <TableCell numeric>14 ms</TableCell>\n        </TableRow>\n        <TableRow>\n          <TableCell>us-east-1 (Virginia)</TableCell>\n          <TableCell numeric>19 ms</TableCell>\n        </TableRow>\n      </TableBody>\n    </Table>\n  );\n}',
      dependencies: ["react"],
      exports: [
        "Table",
        "TableBody",
        "TableCaption",
        "TableCell",
        "TableFooter",
        "TableHead",
        "TableHeader",
        "TableRow",
      ],
      variants: [],
      sizes: [],
      props: [],
    },
    {
      slug: "tabs",
      name: "Tabs",
      category: "Navigation & Menus",
      path: "src/components/ui/tabs.tsx",
      docPath: "public/docs/components/tabs.md",
      summary: "Fluid navigation tabs with spring underline indicator and zero geometry shift.",
      definingConstraint:
        "Glides a spring-physics layout indicator across full-panel navigation triggers while locking label font weight across inactive and active states.",
      whenToUse: [
        "Switching between distinct multi-control panels (Account, Billing, Telemetry) at the same hierarchy level.",
        "Organising complex configuration studios without forcing full page navigation.",
      ],
      whenNotToUse: [
        {
          primitive: "segmented-control",
          reason: "Use SegmentedControl for compact inline pills or viewport/mode toggles.",
        },
        {
          primitive: "accordion",
          reason:
            "Use Accordion when users benefit from expanding multiple vertical sections concurrently.",
        },
      ],
      anatomy:
        '<Tabs defaultValue="tokens">\n  <TabsList>\n    <TabsIndicator />\n    <TabsTrigger value="tokens">Tokens</TabsTrigger>\n    <TabsTrigger value="motion">Motion</TabsTrigger>\n  </TabsList>\n  <TabsContent value="tokens">...</TabsContent>\n</Tabs>',
      a11yContract: [
        'Base UI coordinates role="tablist", role="tab", aria-selected, and arrow-key navigation automatically.',
        "Every TabsTrigger value must pair with a matching TabsContent value.",
      ],
      doAndDont: [
        {
          do: "Include <TabsIndicator /> inside TabsList for zero-shift animated underline or pill tracking.",
          dont: "Switch active TabsTrigger text from font-medium to font-bold, which causes horizontal width jitter.",
        },
        {
          do: "Keep tab strip concise on one line with 2 to 6 items.",
          dont: "Use Tabs as top-level URL routing instead of NavigationBar.",
        },
      ],
      slotsAndPairing: "Composes Tabs, TabsList, TabsIndicator, TabsTrigger, and TabsContent.",
      exampleCode:
        'import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs";\n\nexport function TabsExample() {\n  return (\n    <div className="w-full max-w-md">\n      <Tabs defaultValue="tokens">\n        <TabsList>\n          <TabsIndicator />\n          <TabsTrigger value="tokens">OKLCH Tokens</TabsTrigger>\n          <TabsTrigger value="physics">Spring Physics</TabsTrigger>\n        </TabsList>\n        <TabsContent value="tokens" className="pt-3 text-xs text-muted-foreground">\n          All light and dark pairs satisfy WCAG 2.2 AA and APCA thresholds.\n        </TabsContent>\n        <TabsContent value="physics" className="pt-3 text-xs text-muted-foreground">\n          Controls compress on pointerdown using calibrated spring curves.\n        </TabsContent>\n      </Tabs>\n    </div>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["Tabs", "TabsContent", "TabsIndicator", "TabsList", "TabsTrigger"],
      variants: [],
      sizes: [],
      props: [],
    },
    {
      slug: "textarea",
      name: "Textarea",
      category: "Forms & Input",
      path: "src/components/ui/textarea.tsx",
      docPath: "public/docs/components/textarea.md",
      summary: "Multi-line text input with subtle border-hugging focus contrast.",
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
      anatomy:
        '<Field>\n  <FieldLabel>Release Summary</FieldLabel>\n  <Textarea rows={4} placeholder="Summarise architectural changes..." />\n</Field>',
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
      exampleCode:
        'import * as React from "react";\nimport { Field, FieldLabel } from "@/components/ui/field";\nimport { Textarea } from "@/components/ui/textarea";\n\nexport function TextareaExample() {\n  const [notes, setNotes] = React.useState(\n    "Concentric card radius calibrated cleanly with zero layout shift."\n  );\n\n  return (\n    <div className="w-full max-w-md">\n      <Field>\n        <FieldLabel>Architecture Decision Notes</FieldLabel>\n        <Textarea\n          rows={3}\n          value={notes}\n          onChange={(e) => setNotes(e.target.value)}\n          placeholder="Document the structural constraint..."\n        />\n      </Field>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["Textarea"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "error",
          type: "boolean",
          required: false,
          description: "Configures error on Textarea.",
        },
      ],
    },
    {
      slug: "theme-toggle",
      name: "ThemeToggle",
      category: "Actions & Toggles",
      path: "src/components/ui/theme-toggle.tsx",
      docPath: "public/docs/components/theme-toggle.md",
      summary: "Instant light/dark switcher suppressing cross-theme transition flashes.",
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
      anatomy: "<ThemeToggle isDark={isDark} onToggleDark={setIsDark} />",
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
      exampleCode:
        'import * as React from "react";\nimport { ThemeToggle } from "@/components/ui/theme-toggle";\n\nexport function ThemeToggleExample() {\n  const [previewDark, setPreviewDark] = React.useState(false);\n\n  return (\n    <div className="flex items-center gap-3">\n      <ThemeToggle isDark={previewDark} onToggleDark={setPreviewDark} />\n      <span className="text-xs text-muted-foreground">\n        Active polarity: {previewDark ? "Dark" : "Light"}\n      </span>\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["ThemeToggle"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "isDark",
          type: "boolean",
          required: false,
          description:
            "Controlled dark state. If omitted, ThemeToggle automatically manages state and synchronises with localStorage and document.documentElement.classList.",
        },
        {
          name: "onToggleDark",
          type: "(nextDark: boolean) => void",
          required: false,
          description: "Callback fired when theme changes.",
        },
        {
          name: "showLabel",
          type: "boolean",
          required: false,
          description: "Whether to display text label alongside icon.",
        },
      ],
    },
    {
      slug: "timeline",
      name: "Timeline",
      category: "Data & Feedback",
      path: "src/components/ui/timeline/index.ts",
      docPath: "public/docs/components/timeline.md",
      summary: "Chronological event feed with pulse nodes and packet connectors.",
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
      anatomy:
        '<Timeline>\n  <TimelineItem>\n    <TimelineIndicator status="success" />\n    <TimelineConnector />\n    <TimelineContent>\n      <TimelineTitle>Checks Passed</TimelineTitle>\n      <TimelineDescription>61 test suites green.</TimelineDescription>\n    </TimelineContent>\n  </TimelineItem>\n</Timeline>',
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
      exampleCode:
        'import { Timeline, TimelineConnector, TimelineContent, TimelineDescription, TimelineIndicator, TimelineItem, TimelineTitle } from "@/components/ui/timeline";\n\nexport function TimelineExample() {\n  return (\n    <Timeline>\n      <TimelineItem>\n        <TimelineIndicator status="success" />\n        <TimelineConnector />\n        <TimelineContent>\n          <TimelineTitle>AST Specs Verified</TimelineTitle>\n          <TimelineDescription>57 component specs compiled cleanly.</TimelineDescription>\n        </TimelineContent>\n      </TimelineItem>\n      <TimelineItem>\n        <TimelineIndicator status="primary" />\n        <TimelineContent>\n          <TimelineTitle>Invariants Passing</TimelineTitle>\n          <TimelineDescription>18 directives verified at zero warnings.</TimelineDescription>\n        </TimelineContent>\n      </TimelineItem>\n    </Timeline>\n  );\n}',
      dependencies: ["react"],
      exports: [
        "Timeline",
        "TimelineActionNode",
        "TimelineAvatarNode",
        "TimelineBody",
        "TimelineCommitNode",
        "TimelineConnector",
        "TimelineContent",
        "TimelineContext",
        "TimelineDescription",
        "TimelineDotNode",
        "TimelineFooter",
        "TimelineHeader",
        "TimelineHeartbeatNode",
        "TimelineIconNode",
        "TimelineIndicator",
        "TimelineItem",
        "TimelineNode",
        "TimelineProgressNode",
        "TimelinePulseNode",
        "TimelineStepNode",
        "TimelineTime",
        "TimelineTitle",
        "getConnectorTrackClass",
        "useTimeline",
      ],
      variants: [],
      sizes: [],
      props: [
        {
          name: "fallback",
          type: "string",
          required: true,
          description: "Configures fallback on Timeline.",
        },
        {
          name: "label",
          type: "string",
          required: true,
          description: "Configures label on Timeline.",
        },
        {
          name: "activeFlow",
          type: "boolean",
          required: false,
          description: "Configures activeFlow on Timeline.",
        },
        {
          name: "badgeIcon",
          type: "React.ReactNode",
          required: false,
          description: "Configures badgeIcon on Timeline.",
        },
        {
          name: "badgeStatus",
          type: '"default" | "primary" | "success" | "warning" | "destructive"',
          required: false,
          description: "Configures badgeStatus on Timeline.",
        },
        {
          name: "connectorStatus",
          type: "TimelineConnectorStatus",
          required: false,
          description: "Configures connectorStatus on Timeline.",
        },
        {
          name: "connectorVariant",
          type: "TimelineConnectorVariant",
          required: false,
          description: "Configures connectorVariant on Timeline.",
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          description: "Configures disabled on Timeline.",
        },
        {
          name: "dotVariant",
          type: '"solid" | "ring" | "glow"',
          required: false,
          description: "Configures dotVariant on Timeline.",
        },
        {
          name: "heartbeat",
          type: "boolean",
          required: false,
          description: "Configures heartbeat on Timeline.",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          required: false,
          description: "Configures icon on Timeline.",
        },
        {
          name: "interactive",
          type: "boolean",
          required: false,
          description: "Configures interactive on Timeline.",
        },
        {
          name: "isLast",
          type: "boolean",
          required: false,
          description: "Configures isLast on Timeline.",
        },
        {
          name: "onClick",
          type: "(e: React.MouseEvent<HTMLButtonElement>) => void",
          required: false,
          description: "Configures onClick on Timeline.",
        },
        {
          name: "progress",
          type: 'number | "indeterminate"',
          required: false,
          description: "Configures progress on Timeline.",
        },
        {
          name: "pulse",
          type: "boolean",
          required: false,
          description: "Configures pulse on Timeline.",
        },
        {
          name: "size",
          type: "TimelineSize",
          required: false,
          description: "Configures size on Timeline.",
        },
        {
          name: "src",
          type: "string",
          required: false,
          description: "Configures src on Timeline.",
        },
        {
          name: "state",
          type: '"pending" | "current" | "completed"',
          required: false,
          description: "Configures state on Timeline.",
        },
        {
          name: "status",
          type: "TimelineConnectorStatus",
          required: false,
          description: "Configures status on Timeline.",
        },
        {
          name: "step",
          type: "number",
          required: false,
          description: "Configures step on Timeline.",
        },
        {
          name: "variant",
          type: "TimelineConnectorVariant",
          required: false,
          description: "Configures variant on Timeline.",
        },
      ],
    },
    {
      slug: "toast",
      name: "Toast",
      category: "Overlays & Surfaces",
      path: "src/components/ui/toast.tsx",
      docPath: "public/docs/components/toast.md",
      summary: "Non-blocking feedback toast with timed auto-dismiss and undo trigger.",
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
      anatomy: "<ToastProvider>\n  <ConsumerUsingUseToast />\n</ToastProvider>",
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
      exampleCode:
        'import { Button } from "@/components/ui/button";\nimport { ToastProvider, useToast } from "@/components/ui/toast";\n\nfunction ToastDemoTrigger() {\n  const { toast } = useToast();\n\n  return (\n    <Button\n      variant="outline"\n      size="sm"\n      onClick={() =>\n        toast({\n          title: "Snapshot Exported",\n          description: "Token manifest synchronised across edge targets.",\n          type: "success",\n        })\n      }\n    >\n      Trigger Notification\n    </Button>\n  );\n}\n\nexport function ToastExample() {\n  return (\n    <ToastProvider>\n      <ToastDemoTrigger />\n    </ToastProvider>\n  );\n}',
      dependencies: ["lucide-react", "motion", "react"],
      exports: ["ToastProvider", "useToast"],
      variants: [],
      sizes: [],
      props: [],
    },
    {
      slug: "toggle",
      name: "Toggle",
      category: "Actions & Toggles",
      path: "src/components/ui/toggle.tsx",
      docPath: "public/docs/components/toggle.md",
      summary: "Two-state pressed action button adhering to zero-shift geometry.",
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
      anatomy:
        '<Toggle pressed={muted} onPressedChange={setMuted} variant="outline" aria-label="Mute alerts">\n  Muted\n</Toggle>',
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
      exampleCode:
        'import * as React from "react";\nimport { Toggle } from "@/components/ui/toggle";\n\nexport function ToggleExample() {\n  const [pinned, setPinned] = React.useState(true);\n\n  return (\n    <Toggle\n      pressed={pinned}\n      onPressedChange={setPinned}\n      variant="outline"\n      aria-label="Pin status rail"\n    >\n      {pinned ? "Pinned to Rail" : "Pin to Rail"}\n    </Toggle>\n  );\n}',
      dependencies: ["@base-ui/react", "class-variance-authority", "react"],
      exports: ["Toggle", "toggleVariants"],
      variants: ["default", "outline", "surface"],
      sizes: ["sm", "default", "lg"],
      props: [],
    },
    {
      slug: "toggle-group",
      name: "ToggleGroup",
      category: "Actions & Toggles",
      path: "src/components/ui/toggle-group.tsx",
      docPath: "public/docs/components/toggle-group.md",
      summary: "Grouped toggle toolbar supporting single and multi-select roving focus.",
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
      anatomy:
        '<ToggleGroup value={align} onValueChange={setAlign} variant="surface">\n  <Toggle value="left" aria-label="Align left" />\n  <Toggle value="center" aria-label="Align centre" />\n</ToggleGroup>',
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
      exampleCode:
        'import * as React from "react";\nimport { Toggle } from "@/components/ui/toggle";\nimport { ToggleGroup } from "@/components/ui/toggle-group";\n\nexport function ToggleGroupExample() {\n  const [selection, setSelection] = React.useState<string[]>(["bold"]);\n\n  return (\n    <ToggleGroup value={selection} onValueChange={setSelection} variant="surface" multiple>\n      <Toggle value="bold" aria-label="Bold formatting">\n        Bold\n      </Toggle>\n      <Toggle value="italic" aria-label="Italic formatting">\n        Italic\n      </Toggle>\n      <Toggle value="code" aria-label="Inline code formatting">\n        Code\n      </Toggle>\n    </ToggleGroup>\n  );\n}',
      dependencies: ["@base-ui/react", "class-variance-authority", "react"],
      exports: ["ToggleGroup", "useToggleGroup"],
      variants: [],
      sizes: [],
      props: [],
    },
    {
      slug: "toolbar",
      name: "Toolbar",
      category: "Actions & Toggles",
      path: "src/components/ui/toolbar.tsx",
      docPath: "public/docs/components/toolbar.md",
      summary: "Compound desktop toolbar housing aligned button groups and separators.",
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
      anatomy:
        '<Toolbar aria-label="Canvas actions">\n  <ToolbarGroup>\n    <ToolbarButton aria-label="Inspect">Inspect</ToolbarButton>\n  </ToolbarGroup>\n  <ToolbarSeparator />\n  <ToolbarToggleGroup>\n    <ToolbarToggleItem value="grid">Grid</ToolbarToggleItem>\n  </ToolbarToggleGroup>\n</Toolbar>',
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
      exampleCode:
        'import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/components/ui/toolbar";\n\nexport function ToolbarExample() {\n  return (\n    <Toolbar aria-label="Canvas inspector tools" variant="floating">\n      <ToolbarGroup>\n        <ToolbarButton aria-label="Inspect layer bounds">Inspect</ToolbarButton>\n        <ToolbarButton aria-label="Toggle grid snap">Snap</ToolbarButton>\n      </ToolbarGroup>\n      <ToolbarSeparator />\n      <ToolbarGroup>\n        <ToolbarButton aria-label="Export token bundle">Export</ToolbarButton>\n      </ToolbarGroup>\n    </Toolbar>\n  );\n}',
      dependencies: ["@base-ui/react", "class-variance-authority", "react"],
      exports: [
        "Toolbar",
        "ToolbarButton",
        "ToolbarGroup",
        "ToolbarLink",
        "ToolbarSeparator",
        "ToolbarToggleGroup",
        "ToolbarToggleItem",
        "toolbarButtonVariants",
        "toolbarVariants",
        "useToolbar",
      ],
      variants: ["default", "floating", "outline", "surface", "ghost"],
      sizes: ["sm", "default", "lg", "xs"],
      props: [
        {
          name: "isActive",
          type: "boolean",
          required: false,
          description: "Configures isActive on Toolbar.",
        },
      ],
    },
    {
      slug: "tooltip",
      name: "Tooltip",
      category: "Overlays & Surfaces",
      path: "src/components/ui/tooltip.tsx",
      docPath: "public/docs/components/tooltip.md",
      summary: "Compact contextual hint surface with configurable hover delay.",
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
      anatomy:
        '<TooltipProvider delay={150}>\n  <Tooltip>\n    <TooltipTrigger aria-label="Show help" className={buttonVariants({ size: "icon-sm", variant: "ghost" })}>?</TooltipTrigger>\n    <TooltipContent>Inspect shortcut</TooltipContent>\n  </Tooltip>\n</TooltipProvider>',
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
      exampleCode:
        'import { buttonVariants } from "@/components/ui/button";\nimport { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";\n\nexport function TooltipExample() {\n  return (\n    <TooltipProvider delay={100}>\n      <Tooltip>\n        <TooltipTrigger\n          aria-label="Inspect build gate hint"\n          className={buttonVariants({ variant: "outline", size: "sm" })}\n        >\n          Hover for Shortcut\n        </TooltipTrigger>\n        <TooltipContent>Open Documentation Portal (⌘D)</TooltipContent>\n      </Tooltip>\n    </TooltipProvider>\n  );\n}',
      dependencies: ["@base-ui/react", "react"],
      exports: ["Tooltip", "TooltipContent", "TooltipPortal", "TooltipProvider", "TooltipTrigger"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "align",
          type: 'TooltipPrimitive.Positioner.Props["align"]',
          required: false,
          description: "Configures align on Tooltip.",
        },
        {
          name: "portalProps",
          type: "TooltipPrimitive.Portal.Props",
          required: false,
          description: "Configures portalProps on Tooltip.",
        },
        {
          name: "showArrow",
          type: "boolean",
          required: false,
          description: "Configures showArrow on Tooltip.",
        },
        {
          name: "side",
          type: 'TooltipPrimitive.Positioner.Props["side"]',
          required: false,
          description: "Configures side on Tooltip.",
        },
        {
          name: "sideOffset",
          type: 'TooltipPrimitive.Positioner.Props["sideOffset"]',
          required: false,
          description: "Configures sideOffset on Tooltip.",
        },
      ],
    },
    {
      slug: "tree",
      name: "Tree",
      category: "Data & Feedback",
      path: "src/components/ui/tree.tsx",
      docPath: "public/docs/components/tree.md",
      summary: "Hierarchical file and folder tree with spring expand/collapse motion.",
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
      anatomy: '<Tree data={nodes} defaultExpandedIds={["src"]} onSelectNode={handleSelect} />',
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
      exampleCode:
        'import { Tree, type TreeNodeData } from "@/components/ui/tree";\n\nconst SAMPLE_TREE_NODES: TreeNodeData[] = [\n  {\n    id: "src",\n    label: "src",\n    children: [\n      { id: "ui", label: "components/ui (57)" },\n      { id: "docs", label: "docs/specs" },\n    ],\n  },\n  { id: "registry", label: "public/registry.json" },\n];\n\nexport function TreeExample() {\n  return (\n    <div className="w-full max-w-xs">\n      <Tree data={SAMPLE_TREE_NODES} defaultExpandedIds={["src"]} />\n    </div>\n  );\n}',
      dependencies: ["react"],
      exports: ["Tree"],
      variants: [],
      sizes: [],
      props: [
        {
          name: "data",
          type: "TreeNodeData[]",
          required: true,
          description: "Configures data on Tree.",
        },
        {
          name: "defaultExpandedIds",
          type: "string[]",
          required: false,
          description: "Configures defaultExpandedIds on Tree.",
        },
        {
          name: "onSelect",
          type: "(node: TreeNodeData) => void",
          required: false,
          description: "Configures onSelect on Tree.",
        },
        {
          name: "selectedId",
          type: "string",
          required: false,
          description: "Configures selectedId on Tree.",
        },
      ],
    },
  ],
  contrastPairs: [
    {
      id: "light-body-canvas",
      mode: "light",
      label: "Body Text on Canvas",
      foregroundToken: "--foreground",
      foregroundValue: "oklch(0.145 0 0)",
      backgroundToken: "--background",
      backgroundValue: "oklch(1 0 0)",
      context: "body",
      wcag2Ratio: 19.79,
      wcag2PassAA: true,
      apcaLc: 108.9,
      absApcaLc: 108.9,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "light-card-surface",
      mode: "light",
      label: "Card Foreground on Card",
      foregroundToken: "--card-foreground",
      foregroundValue: "oklch(0.145 0 0)",
      backgroundToken: "--card",
      backgroundValue: "oklch(1 0 0)",
      context: "body",
      wcag2Ratio: 19.79,
      wcag2PassAA: true,
      apcaLc: 108.9,
      absApcaLc: 108.9,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "light-primary-action",
      mode: "light",
      label: "Primary Button Ink",
      foregroundToken: "--primary-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--primary",
      backgroundValue: "oklch(0.205 0 0)",
      context: "button",
      wcag2Ratio: 17.16,
      wcag2PassAA: true,
      apcaLc: -105.1,
      absApcaLc: 105.1,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "light-secondary-action",
      mode: "light",
      label: "Secondary Button Ink",
      foregroundToken: "--secondary-foreground",
      foregroundValue: "oklch(0.205 0 0)",
      backgroundToken: "--secondary",
      backgroundValue: "oklch(0.97 0 0)",
      context: "button",
      wcag2Ratio: 16.42,
      wcag2PassAA: true,
      apcaLc: 101.4,
      absApcaLc: 101.4,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "light-muted-copy",
      mode: "light",
      label: "Muted Label on Canvas",
      foregroundToken: "--muted-foreground",
      foregroundValue: "oklch(0.54 0 0)",
      backgroundToken: "--background",
      backgroundValue: "oklch(1 0 0)",
      context: "ui-control",
      wcag2Ratio: 5.06,
      wcag2PassAA: true,
      apcaLc: 77.8,
      absApcaLc: 77.8,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "light-destructive-intent",
      mode: "light",
      label: "Destructive Intent",
      foregroundToken: "--destructive-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--destructive",
      backgroundValue: "oklch(0.577 0.245 27.325)",
      context: "button",
      wcag2Ratio: 4.56,
      wcag2PassAA: true,
      apcaLc: -75,
      absApcaLc: 75,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "light-success-intent",
      mode: "light",
      label: "Success Intent",
      foregroundToken: "--success-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--success",
      backgroundValue: "oklch(0.51 0.16 145)",
      context: "button",
      wcag2Ratio: 5.15,
      wcag2PassAA: true,
      apcaLc: -78.5,
      absApcaLc: 78.5,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "light-warning-intent",
      mode: "light",
      label: "Warning Intent",
      foregroundToken: "--warning-foreground",
      foregroundValue: "oklch(0.205 0 0)",
      backgroundToken: "--warning",
      backgroundValue: "oklch(0.75 0.16 70)",
      context: "button",
      wcag2Ratio: 7.81,
      wcag2PassAA: true,
      apcaLc: 62.1,
      absApcaLc: 62.1,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "light-info-intent",
      mode: "light",
      label: "Info Intent",
      foregroundToken: "--info-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--info",
      backgroundValue: "oklch(0.52 0.18 245)",
      context: "button",
      wcag2Ratio: 5.04,
      wcag2PassAA: true,
      apcaLc: -77.9,
      absApcaLc: 77.9,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-body-canvas",
      mode: "dark",
      label: "Body Text on Canvas",
      foregroundToken: "--foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--background",
      backgroundValue: "oklch(0.145 0 0)",
      context: "body",
      wcag2Ratio: 18.96,
      wcag2PassAA: true,
      apcaLc: -106.7,
      absApcaLc: 106.7,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-card-surface",
      mode: "dark",
      label: "Card Foreground on Card",
      foregroundToken: "--card-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--card",
      backgroundValue: "oklch(0.17 0 0)",
      context: "body",
      wcag2Ratio: 18.31,
      wcag2PassAA: true,
      apcaLc: -106.1,
      absApcaLc: 106.1,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-primary-action",
      mode: "dark",
      label: "Primary Button Ink",
      foregroundToken: "--primary-foreground",
      foregroundValue: "oklch(0.205 0 0)",
      backgroundToken: "--primary",
      backgroundValue: "oklch(0.985 0 0)",
      context: "button",
      wcag2Ratio: 17.16,
      wcag2PassAA: true,
      apcaLc: 104.2,
      absApcaLc: 104.2,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-secondary-action",
      mode: "dark",
      label: "Secondary Button Ink",
      foregroundToken: "--secondary-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--secondary",
      backgroundValue: "oklch(0.269 0 0)",
      context: "button",
      wcag2Ratio: 14.48,
      wcag2PassAA: true,
      apcaLc: -102.2,
      absApcaLc: 102.2,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-muted-copy",
      mode: "dark",
      label: "Muted Label on Canvas",
      foregroundToken: "--muted-foreground",
      foregroundValue: "oklch(0.708 0 0)",
      backgroundToken: "--background",
      backgroundValue: "oklch(0.145 0 0)",
      context: "ui-control",
      wcag2Ratio: 7.63,
      wcag2PassAA: true,
      apcaLc: -58.8,
      absApcaLc: 58.8,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-destructive-intent",
      mode: "dark",
      label: "Destructive Intent",
      foregroundToken: "--destructive-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--destructive",
      backgroundValue: "oklch(0.396 0.141 25.723)",
      context: "button",
      wcag2Ratio: 9.63,
      wcag2PassAA: true,
      apcaLc: -93.9,
      absApcaLc: 93.9,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-success-intent",
      mode: "dark",
      label: "Success Intent",
      foregroundToken: "--success-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--success",
      backgroundValue: "oklch(0.42 0.14 145)",
      context: "button",
      wcag2Ratio: 7.59,
      wcag2PassAA: true,
      apcaLc: -88.6,
      absApcaLc: 88.6,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-warning-intent",
      mode: "dark",
      label: "Warning Intent",
      foregroundToken: "--warning-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--warning",
      backgroundValue: "oklch(0.48 0.14 70)",
      context: "button",
      wcag2Ratio: 6.42,
      wcag2PassAA: true,
      apcaLc: -84.5,
      absApcaLc: 84.5,
      apcaPass: true,
      dualPassed: true,
    },
    {
      id: "dark-info-intent",
      mode: "dark",
      label: "Info Intent",
      foregroundToken: "--info-foreground",
      foregroundValue: "oklch(0.985 0 0)",
      backgroundToken: "--info",
      backgroundValue: "oklch(0.42 0.14 245)",
      context: "button",
      wcag2Ratio: 7.83,
      wcag2PassAA: true,
      apcaLc: -89.3,
      absApcaLc: 89.3,
      apcaPass: true,
      dualPassed: true,
    },
  ],
  skills: [
    {
      name: "app-blueprint",
      path: "skills/app-blueprint/SKILL.md",
      version: "1.0.0",
      description:
        "Use when building a complete application screen, multi-page product, or documented feature with this design system. Never use for single utility functions or non-UI backend scripts.",
      tags: [
        "blueprint",
        "architecture",
        "orchestrator",
        "app-builder",
        "design-system",
        "verification",
      ],
    },
    {
      name: "base-ui-primitives",
      path: "skills/base-ui-primitives/SKILL.md",
      version: "1.0.0",
      description:
        "Use when building or auditing accessible headless UI primitives with @base-ui/react, compound slots, keyboard roving navigation, focus traps, and WCAG 2.2 states.",
      tags: ["base-ui", "accessibility", "wcag", "primitives", "react"],
    },
    {
      name: "craft-philosophy",
      path: "skills/craft-philosophy/SKILL.md",
      version: "1.0.0",
      description:
        "Use when designing, building, or reviewing UI components and screens. Enforces human-centric craft, 9-state interactive matrices, and anti-slop geometry.",
      tags: ["design-system", "craft", "ui", "layout", "architecture"],
    },
    {
      name: "diagram-architecture",
      path: "skills/diagram-architecture/SKILL.md",
      version: "1.0.0",
      description:
        "Use when designing, drawing, or auditing technical diagrams, system schematics, flowcharts, and accessible SVGs. Enforces orthogonal routing and node budgets.",
      tags: ["diagrams", "svg", "mermaid", "architecture", "visualization"],
    },
    {
      name: "motion-physics",
      path: "skills/motion-physics/SKILL.md",
      version: "1.0.0",
      description:
        "Use when animating UI transitions, gestures, modals, or active states with motion/react. Enforces calibrated spring physics, pointerdown yield, and velocity.",
      tags: ["motion", "spring-physics", "animation", "gestures", "hig"],
    },
    {
      name: "production-deployment",
      path: "skills/production-deployment/SKILL.md",
      version: "1.0.0",
      description:
        "Use when preparing web interfaces for production deployment. Enforces Speculation Rules, View Transitions, SWR edge caching, safe-area insets, and zero-CLS.",
      tags: ["deployment", "performance", "caching", "view-transitions", "web-vitals"],
    },
    {
      name: "semantic-theming",
      path: "skills/semantic-theming/SKILL.md",
      version: "1.0.0",
      description:
        "Use when creating, styling, or auditing design tokens and themes. Enforces perceptual OKLCH colour spaces, Tailwind CSS v4 @theme inline, and APCA contrast.",
      tags: ["theming", "oklch", "design-tokens", "tailwind-v4", "contrast"],
    },
    {
      name: "technical-documentation",
      path: "skills/technical-documentation/SKILL.md",
      version: "1.0.0",
      description:
        "Use when authoring, editing, or auditing technical docs, READMEs, ADRs, changelogs, and API guides. Enforces concept grounding, active prose, and drift gates.",
      tags: ["documentation", "technical-writing", "adr", "readme", "changelog"],
    },
  ],
  docsPages: [
    {
      slug: "architecture",
      path: "docs/architecture.md",
      title: "System Architecture",
      headings: [
        "🏛️ Architectural Overview",
        "📁 Repository Organisation",
        "🧩 1. Headless Primitives (Base UI)",
        "🎨 2. Styling System & Perceptual Colour Engine",
        "🌀 3. Tactile Motion Physics",
        "💎 4. Spatial Materials & Concentric Geometry",
        "🤖 5. Agent-Native Architecture",
        "🧪 6. Testing & Quality Assurance",
      ],
      wordCount: 1201,
    },
    {
      slug: "philosophy",
      path: "docs/philosophy.md",
      title: "The Design Philosophy & Manifesto: The Art of Human Software",
      headings: [
        "Prologue: Beyond the Robotic Average",
        "The Five Tenets of Human-Centric Craft",
        "Epilogue: The Living Standard",
      ],
      wordCount: 1594,
    },
    {
      slug: "tooling",
      path: "docs/tooling.md",
      title: "Tooling Architecture & Quality Engineering",
      headings: [
        "Architecture Overview",
        "Tooling Matrix & Justifications",
        "Developer Commands Reference",
        "Summary for Consumers of the Design System",
      ],
      wordCount: 1427,
    },
  ],
};
