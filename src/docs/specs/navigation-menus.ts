import type { ComponentSpec } from "@/docs/schema";

const EXAMPLE_FILE = "src/docs/examples/navigation-menus.tsx";

export const navigationMenusSpecs: Record<string, ComponentSpec> = {
  breadcrumb: {
    slug: "breadcrumb",
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
    anatomy: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Primitives</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
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
    exampleExport: "BreadcrumbExample",
    exampleFile: EXAMPLE_FILE,
  },

  "navigation-bar": {
    slug: "navigation-bar",
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
    anatomy: `<NavigationBar\n  brand={<span>Design System</span>}\n  items={navItems}\n  maxVisibleItems={4}\n  actions={<ThemeToggle isDark={isDark} onToggleDark={setIsDark} />}\n/>`,
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
    exampleExport: "NavigationBarExample",
    exampleFile: EXAMPLE_FILE,
  },

  pagination: {
    slug: "pagination",
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
    anatomy: `<Pagination currentPage={page} totalPages={8} onPageChange={setPage} />`,
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
    exampleExport: "PaginationExample",
    exampleFile: EXAMPLE_FILE,
  },

  tabs: {
    slug: "tabs",
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
    anatomy: `<Tabs defaultValue="tokens">\n  <TabsList>\n    <TabsIndicator />\n    <TabsTrigger value="tokens">Tokens</TabsTrigger>\n    <TabsTrigger value="motion">Motion</TabsTrigger>\n  </TabsList>\n  <TabsContent value="tokens">...</TabsContent>\n</Tabs>`,
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
    exampleExport: "TabsExample",
    exampleFile: EXAMPLE_FILE,
  },
};
