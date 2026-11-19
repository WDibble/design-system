import type { ComponentSpec } from "@/docs/schema";

const EXAMPLE_FILE = "src/docs/examples/docs-schematics.tsx";

export const docsSchematicsSpecs: Record<string, ComponentSpec> = {
  callout: {
    slug: "callout",
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
    anatomy: `<Callout variant="defining-constraint" title="Zero Layout Shift">\n  Reserve border width on resting states.\n</Callout>`,
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
    exampleExport: "CalloutExample",
    exampleFile: EXAMPLE_FILE,
  },

  "code-block": {
    slug: "code-block",
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
    anatomy: `<CodeBlock filename="verify.sh" language="bash" highlightLines={[2]} code="npm run docs:build\nnpm run check" />`,
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
    exampleExport: "CodeBlockExample",
    exampleFile: EXAMPLE_FILE,
  },

  "component-preview": {
    slug: "component-preview",
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
    anatomy: `<ComponentPreview title="Tactile Button" code={snippet}>\n  <ButtonExample />\n</ComponentPreview>`,
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
    exampleExport: "ComponentPreviewExample",
    exampleFile: EXAMPLE_FILE,
  },

  "diagram-frame": {
    slug: "diagram-frame",
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
    anatomy: `<DiagramFrame title="Pipeline Schematic" description="Connects blueprint to verified output.">\n  <svg aria-label="Pipeline schematic">...</svg>\n</DiagramFrame>`,
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
    exampleExport: "DiagramFrameExample",
    exampleFile: EXAMPLE_FILE,
  },

  "doc-layout": {
    slug: "doc-layout",
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
    anatomy: `<DocLayout>\n  <DocSidebar groups={groups} activeId={id} onSelect={setId} />\n  <DocArticle markdownSource={md}>\n    <section>...</section>\n  </DocArticle>\n  <DocToc headings={headings} verificationChecks={checks} />\n</DocLayout>`,
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
    exampleExport: "DocLayoutExample",
    exampleFile: EXAMPLE_FILE,
  },

  "prop-table": {
    slug: "prop-table",
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
    anatomy: `<PropTable title="ButtonProps" props={[{ name: "variant", type: '"default" | "outline"', defaultValue: '"default"', description: "Selects visual button role." }]} />`,
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
    exampleExport: "PropTableExample",
    exampleFile: EXAMPLE_FILE,
  },
};
