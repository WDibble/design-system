"use client";

import * as React from "react";
import {
  ChevronRightIcon,
  FileTextIcon,
  LayersIcon,
  SearchIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { ComponentPreview } from "@/components/ui/component-preview";
import {
  DocArticle,
  DocLayout,
  DocSidebar,
  DocToc,
  type DocHeadingItem,
  type DocNavGroup,
  type DocVerificationItem,
} from "@/components/ui/doc-layout";
import { Input } from "@/components/ui/input";
import { PropTable, type PropDefinition } from "@/components/ui/prop-table";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COMPONENT_EXAMPLE_COMPONENTS } from "@/docs/examples";
import { docsManifest } from "@/generated/docs-manifest";
import { cn } from "@/lib/utils";
import { ArchitectureDiagram } from "@/pages/docs/architecture-diagram";

export interface DocsPortalPageProps {
  onBackToWorkbench?: () => void;
}

type DocSectionId =
  "quickstart" | "agent-blueprint" | "architecture" | "components" | "tokens" | "gates";

const NAV_GROUPS: DocNavGroup[] = [
  {
    title: "Learn & Build",
    items: [
      { id: "quickstart", label: "Quickstart", badge: "01" },
      { id: "agent-blueprint", label: "Agent Blueprint", badge: "02" },
      { id: "architecture", label: "System Architecture", badge: "03" },
    ],
  },
  {
    title: "Reference",
    items: [
      {
        id: "components",
        label: "Component Catalogue",
        badge: String(docsManifest.primitiveCount),
      },
      {
        id: "tokens",
        label: "OKLCH Contrast Ledger",
        badge: String(docsManifest.contrastPairs.length),
      },
      {
        id: "gates",
        label: "Skills & CLI Gates",
        badge: String(docsManifest.skillCount),
      },
    ],
  },
];

const ARCHETYPE_MATRIX = [
  {
    name: "Workbench",
    job: "Test, build, or inspect tools",
    layout: "Toolbar rail + interactive stage + live telemetry",
  },
  {
    name: "Long Document",
    job: "Read guides, API specs, and skills",
    layout: "Sticky sidebar + 72ch reading column + TOC",
  },
  {
    name: "Split Studio",
    job: "Configure tokens and inspect contrast",
    layout: "Control inspector paired with real-time surface canvas",
  },
  {
    name: "Manifesto",
    job: "Read philosophical engineering standards",
    layout: "Typographic display lead + ruled prose chapters",
  },
  {
    name: "Index-First",
    job: "Browse component or token directories",
    layout: "Search bar + ruled catalogue rows + API detail",
  },
  {
    name: "Bento Grid",
    job: "Scan distinct heterogeneous capabilities",
    layout: "Asymmetric multi-span surfaces with minimum 340px tracks",
  },
];

const GATE_COMMANDS = [
  {
    command: "npm run docs:build",
    purpose:
      "Compile ComponentSpecs, typechecked examples, AST props, and OKLCH tokens into 57 manuals.",
  },
  {
    command: "npm run docs:check",
    purpose: "Fail CI if generated manifests, registry, component specs, or llms.txt drift.",
  },
  {
    command: "npm run mcp",
    purpose:
      "Launch local stdio MCP server exposing component specs, search, and snippet validation.",
  },
  {
    command: "npm run invariants",
    purpose: "Enforce 18-directive geometry, prose, OKLCH, icon size, and link gates.",
  },
  {
    command: "npm run spellcheck",
    purpose: "Verify strict British English across source modules, docs, and skills.",
  },
  {
    command: "npm run check",
    purpose: "Run docs:check, invariants, Oxlint static analysis, Vitest suite, and build.",
  },
];

export function DocsPortalPage({ onBackToWorkbench }: DocsPortalPageProps) {
  const [activeSection, setActiveSection] = React.useState<DocSectionId>("quickstart");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedSlug, setSelectedSlug] = React.useState<string>("button");
  const [contrastMode, setContrastMode] = React.useState<"light" | "dark">("light");

  const filteredPrimitives = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return docsManifest.primitives.filter((p) => {
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
      if (!matchesCat) return false;
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        p.slug.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.definingConstraint.toLowerCase().includes(query) ||
        p.dependencies.some((d) => d.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedCategory]);

  const activePrimitive = React.useMemo(() => {
    return (
      filteredPrimitives.find((p) => p.slug === selectedSlug) ??
      filteredPrimitives[0] ??
      docsManifest.primitives[0]
    );
  }, [filteredPrimitives, selectedSlug]);

  const allSlugSet = React.useMemo(() => new Set(docsManifest.primitives.map((p) => p.slug)), []);

  const activeContrastPairs = React.useMemo(
    () => docsManifest.contrastPairs.filter((pair) => pair.mode === contrastMode),
    [contrastMode]
  );

  const headings: DocHeadingItem[] = React.useMemo(() => {
    switch (activeSection) {
      case "quickstart":
        return [
          { id: "qs-overview", label: "Overview" },
          { id: "qs-workflow", label: "First Verified Screen" },
          { id: "qs-constraints", label: "Core Guarantees" },
        ];
      case "agent-blueprint":
        return [
          { id: "ab-pipeline", label: "Progressive Agent Retrieval" },
          { id: "ab-mcp", label: "Local MCP Server Tools" },
        ];
      case "architecture":
        return [
          { id: "arch-pipeline", label: "Automated Pipeline" },
          { id: "arch-archetypes", label: "Macrostructural Archetypes" },
        ];
      case "components":
        return [
          { id: "comp-directory", label: "Catalogue Filter" },
          { id: "comp-preview", label: "Live Fixture & Usage" },
          { id: "comp-anatomy", label: "Anatomy & Guardrails" },
          { id: "comp-api", label: "AST Prop Table" },
        ];
      case "tokens":
        return [
          { id: "tok-ledger", label: "Dual-Engine Contrast Ledger" },
          { id: "tok-rules", label: "OKLCH Calibration Rules" },
        ];
      case "gates":
        return [
          { id: "gate-skills", label: "Workspace Skills" },
          { id: "gate-cli", label: "CLI Gate Commands" },
        ];
    }
  }, [activeSection]);

  const verificationChecks: DocVerificationItem[] = React.useMemo(() => {
    switch (activeSection) {
      case "components":
        return [
          {
            label: `${docsManifest.primitiveCount} specs and examples pass axe and compiler gates.`,
            command: "npm run docs:check",
          },
          { label: "All component accessibility assertions pass.", command: "npm run test" },
        ];
      case "agent-blueprint":
        return [
          {
            label: "Local stdio MCP server recommends and validates specs.",
            command: "npm run mcp",
          },
          { label: "Per-component manuals resolve cleanly.", command: "npm run docs:check" },
        ];
      case "tokens":
        return [
          {
            label: "Light and dark tokens clear WCAG 2.2 AA and APCA floors.",
            command: "npm run docs:check",
          },
          { label: "All linear gradients interpolate in OKLCH.", command: "npm run invariants" },
        ];
      default:
        return [
          { label: "Manifest and llms.txt match AST extraction.", command: "npm run docs:check" },
          { label: "Zero invariant, lint, test, or build errors.", command: "npm run check" },
        ];
    }
  }, [activeSection]);

  const markdownSource = React.useMemo(() => {
    if (activeSection === "components" && activePrimitive) {
      const propLines = activePrimitive.props
        .slice(0, 14)
        .map(
          (p) =>
            `- \`${p.name}\` (\`${p.type}\`)${p.required ? " [Required]" : ""}: ${p.description}`
        )
        .join("\n");
      return [
        `# ${activePrimitive.name}`,
        "",
        activePrimitive.summary,
        "",
        `- Module: \`${activePrimitive.path}\``,
        `- Spec: \`${activePrimitive.docPath}\``,
        `- Category: ${activePrimitive.category}`,
        "",
        "## Defining Constraint",
        activePrimitive.definingConstraint,
        "",
        "## When to Use",
        ...activePrimitive.whenToUse.map((item) => `- ${item}`),
        "",
        "## When Not to Use",
        ...activePrimitive.whenNotToUse.map((alt) => `- \`${alt.primitive}\`: ${alt.reason}`),
        "",
        "## Anatomy",
        "```tsx",
        activePrimitive.anatomy,
        "```",
        "",
        "## Verified Example",
        "```tsx",
        activePrimitive.exampleCode,
        "```",
        "",
        "## Accessibility Contract",
        ...activePrimitive.a11yContract.map((rule) => `- ${rule}`),
        "",
        "## Props",
        propLines || "- Standard native HTML or Base UI attributes.",
      ].join("\n");
    }

    if (activeSection === "tokens") {
      return [
        `# OKLCH Dual-Engine Contrast Ledger (${contrastMode})`,
        "",
        ...activeContrastPairs.map(
          (p) =>
            `- ${p.label} (\`${p.foregroundToken}\` on \`${p.backgroundToken}\`): WCAG ${p.wcag2Ratio}:1 | APCA Lc ${p.absApcaLc} | ${p.dualPassed ? "PASS" : "CHECK"}`
        ),
      ].join("\n");
    }

    return [
      `# Antigravity Design System (${activeSection})`,
      "",
      `- Primitives: ${docsManifest.primitiveCount}`,
      `- Kinetic Icons: ${docsManifest.iconCount}`,
      `- Workspace Skills: ${docsManifest.skillCount}`,
      "",
      "Verify build and documentation parity:",
      "```bash",
      "npm run docs:check",
      "npm run check",
      "```",
    ].join("\n");
  }, [activeSection, activePrimitive, activeContrastPairs, contrastMode]);

  const ActiveExampleComponent = activePrimitive
    ? COMPONENT_EXAMPLE_COMPONENTS[activePrimitive.slug]
    : undefined;

  const activePropDefs: PropDefinition[] = React.useMemo(
    () =>
      (activePrimitive?.props ?? []).map((p) => ({
        name: p.name,
        type: p.type,
        required: p.required,
        description: p.description,
      })),
    [activePrimitive]
  );

  return (
    <section
      aria-label="Design System Documentation Portal"
      className="flex w-full flex-col gap-6 pt-2 pb-12"
    >
      <DocLayout>
        <DocSidebar
          groups={NAV_GROUPS}
          activeId={activeSection}
          onSelect={(id) => setActiveSection(id as DocSectionId)}
          header={
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <LayersIcon size={15} className="text-primary" />
                <span className="text-xs font-semibold tracking-tight text-foreground">
                  Docs System
                </span>
                <Badge variant="outline" size="sm">
                  v{docsManifest.version}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground tabular-nums">
                {docsManifest.primitiveCount} primitives, {docsManifest.iconCount} icons
              </p>
            </div>
          }
        />

        <DocArticle
          markdownSource={markdownSource}
          llmsHref="/llms.txt"
          headerSlot={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {onBackToWorkbench && (
                <>
                  <button
                    type="button"
                    onClick={onBackToWorkbench}
                    className="font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Workbench
                  </button>
                  <ChevronRightIcon size={13} aria-hidden="true" />
                </>
              )}
              <span className="font-medium text-foreground">Documentation</span>
            </div>
          }
        >
          {activeSection === "quickstart" && (
            <>
              <header id="qs-overview" className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-4xl">
                  Build Verified Interfaces First Pass
                </h1>
                <p className="text-base leading-relaxed [text-wrap:pretty] text-muted-foreground">
                  This repository pairs {docsManifest.primitiveCount} accessible React primitives
                  and {docsManifest.iconCount} calibrated kinetic icons with an AST compiler that
                  keeps TypeScript props, per-component usage specs, OKLCH contrast ledgers, and
                  agent manuals synchronised.
                </p>
              </header>

              <section id="qs-workflow" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  First Verified Screen
                </h2>
                <CodeBlock
                  tabs={[
                    {
                      id: "compose",
                      label: "Compose",
                      language: "tsx",
                      highlightLines: [2, 8],
                      code: `import { Button } from "@/components/ui/button";\nimport { SparklesIcon } from "@/components/icons";\n\nexport function DeployHeader() {\n  return (\n    <Button\n      variant="default"\n      leftIcon={<SparklesIcon size={16} />}\n    >\n      Publish Release\n    </Button>\n  );\n}`,
                    },
                    {
                      id: "verify",
                      label: "Verify",
                      language: "bash",
                      highlightLines: [1, 2],
                      code: `npm run docs:build\nnpm run check`,
                    },
                  ]}
                  caption="Run npm run docs:build whenever new primitives or specs are added so all 57 component manuals stay current."
                />
              </section>

              <section id="qs-constraints" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Core Guarantees
                </h2>
                <Callout variant="defining-constraint" title="Static Compiler Firewall">
                  The invariant gate rejects layout-shifting hover classes, missing numeric{" "}
                  <code>size</code> props on kinetic icons, clipped gradient text, and stale
                  component specifications before code merges.
                </Callout>
                <ComponentPreview
                  title="Tactile Async Button"
                  description="Interactive buttons compress immediately on pointerdown and maintain locked horizontal footprint across async states."
                  code={`<Button variant="default" leftIcon={<SparklesIcon size={16} />}>\n  Run Verification\n</Button>`}
                >
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button variant="default" leftIcon={<SparklesIcon size={16} />}>
                      Run Verification
                    </Button>
                    <Button variant="outline" leftIcon={<ShieldCheckIcon size={16} />}>
                      Inspect Ledger
                    </Button>
                  </div>
                </ComponentPreview>
              </section>
            </>
          )}

          {activeSection === "agent-blueprint" && (
            <>
              <header id="ab-pipeline" className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-4xl">
                  Plug-and-Play Agent Blueprint
                </h1>
                <p className="text-base leading-relaxed [text-wrap:pretty] text-muted-foreground">
                  Agents read `.agents/skills.json` and `public/llms.txt` once for routing, then
                  fetch only the specific per-component manuals inside{" "}
                  <code>public/docs/components/&lt;slug&gt;.md</code> rather than loading all 57
                  sources into prompt context.
                </p>
              </header>

              <Callout variant="note" title="Orchestrator Entry Point">
                Point new product tasks to <code>skills/app-blueprint/SKILL.md</code> to enforce
                macrostructure locking, OKLCH polarity, primitive composition, and AST doc checks.
              </Callout>

              <section id="ab-mcp" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Local MCP Server Tools
                </h2>
                <CodeBlock
                  filename="scripts/mcp-server.mjs"
                  language="bash"
                  code={`# Launch local zero-dependency stdio MCP server\nnpm run mcp\n\n# Tools exposed to MCP agents:\n# - recommend_components({ query })\n# - get_component_spec({ slug })\n# - search_icons({ query })\n# - validate_snippet({ code })`}
                />
              </section>
            </>
          )}

          {activeSection === "architecture" && (
            <>
              <header id="arch-pipeline" className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-4xl">
                  System Architecture & Archetypes
                </h1>
                <p className="text-base leading-relaxed [text-wrap:pretty] text-muted-foreground">
                  Every layout rejects reflexive boilerplate card grids in favour of intentional
                  macrostructures derived from the visitor&apos;s primary operational job.
                </p>
              </header>

              <section className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Pipeline Overview
                </h2>
                <ArchitectureDiagram />
              </section>

              <section id="arch-archetypes" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Macrostructural Archetypes
                </h2>
                <div className="divide-y divide-border/60 rounded-2xl border border-border/70 bg-card/45 px-5">
                  {ARCHETYPE_MATRIX.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-foreground">{item.name}</div>
                        <div className="text-xs [text-wrap:pretty] text-muted-foreground">
                          {item.layout}
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">
                        {item.job}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeSection === "components" && activePrimitive && (
            <>
              <header id="comp-directory" className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-4xl">
                  Component Catalogue ({docsManifest.primitiveCount})
                </h1>
                <p className="text-base leading-relaxed [text-wrap:pretty] text-muted-foreground">
                  Select any primitive extracted from `src/components/ui` to inspect live compiled
                  fixtures, sibling alternatives, anatomy, guardrails, and AST-parsed props.
                </p>
              </header>

              <div className="flex flex-col gap-3">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter primitives by name, constraint, or dependency..."
                  aria-label="Filter component catalogue"
                  leftIcon={<SearchIcon size={16} aria-hidden="true" />}
                />

                <div
                  role="tablist"
                  aria-label="Filter primitives by category"
                  className="flex flex-wrap gap-1.5"
                >
                  {["All", ...docsManifest.categories].map((category) => {
                    const isSelected = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 select-none active:scale-[0.98]",
                          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                          isSelected
                            ? "border-transparent bg-primary text-primary-foreground"
                            : "border-border/70 bg-card text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>

                <div className="flex max-h-48 flex-wrap gap-1.5 overflow-y-auto rounded-xl border border-border/60 bg-card/45 p-3">
                  {filteredPrimitives.length === 0 ? (
                    <span className="text-xs text-muted-foreground">
                      No primitives matched the current filter.
                    </span>
                  ) : (
                    filteredPrimitives.map((prim) => {
                      const isCurrent = prim.slug === activePrimitive.slug;
                      return (
                        <button
                          key={prim.slug}
                          type="button"
                          onClick={() => setSelectedSlug(prim.slug)}
                          className={cn(
                            "rounded-md border px-2.5 py-1 font-mono text-xs font-medium transition-colors duration-100 select-none",
                            isCurrent
                              ? "border-primary/40 bg-primary/10 text-foreground"
                              : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {prim.name}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <section id="comp-preview" className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {activePrimitive.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="outline">{activePrimitive.category}</Badge>
                    {activePrimitive.dependencies.map((dep) => (
                      <Badge key={dep} variant="secondary" size="sm">
                        {dep}
                      </Badge>
                    ))}
                    <a
                      href={`/${activePrimitive.docPath.replace(/^public\//, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-6 items-center gap-1 rounded-md border border-border/70 bg-card px-2 font-mono text-[11px] text-foreground transition-colors hover:bg-muted"
                    >
                      <FileTextIcon size={12} aria-hidden="true" />
                      <span>.md spec</span>
                    </a>
                  </div>
                </div>

                <p className="text-sm leading-relaxed [text-wrap:pretty] text-muted-foreground">
                  {activePrimitive.summary}
                </p>

                <Callout variant="defining-constraint" title="Defining Constraint">
                  {activePrimitive.definingConstraint}
                </Callout>

                {ActiveExampleComponent && (
                  <ComponentPreview
                    title={`${activePrimitive.name} Live Fixture`}
                    filename={activePrimitive.path}
                    code={activePrimitive.exampleCode}
                  >
                    <ActiveExampleComponent />
                  </ComponentPreview>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-card/45 p-4">
                    <h3 className="text-xs font-semibold tracking-tight text-foreground uppercase">
                      When to Use
                    </h3>
                    <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                      {activePrimitive.whenToUse.map((item) => (
                        <li key={item} className="[text-wrap:pretty]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-card/45 p-4">
                    <h3 className="text-xs font-semibold tracking-tight text-foreground uppercase">
                      When Not to Use
                    </h3>
                    <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                      {activePrimitive.whenNotToUse.map((rule) => (
                        <li key={rule.primitive} className="flex items-start gap-2">
                          {allSlugSet.has(rule.primitive) ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory("All");
                                setSearchQuery("");
                                setSelectedSlug(rule.primitive);
                              }}
                              className="shrink-0 rounded border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] font-medium text-primary transition-colors hover:bg-muted"
                            >
                              {rule.primitive}
                            </button>
                          ) : (
                            <code className="shrink-0 rounded border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                              {rule.primitive}
                            </code>
                          )}
                          <span className="[text-wrap:pretty]">{rule.reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="comp-anatomy" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Anatomy & Guardrails
                </h2>
                <CodeBlock
                  filename="Anatomy"
                  language="tsx"
                  showLineNumbers={false}
                  code={activePrimitive.anatomy}
                />

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Do</TableHead>
                      <TableHead>Don&apos;t</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activePrimitive.doAndDont.map((row) => (
                      <TableRow key={row.do}>
                        <TableCell className="text-xs leading-relaxed [text-wrap:pretty] text-foreground">
                          {row.do}
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed [text-wrap:pretty] text-muted-foreground">
                          {row.dont}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Callout variant="tip" title="Accessibility & Pairing">
                  <ul className="list-disc space-y-1 pl-4">
                    {activePrimitive.a11yContract.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                  <p className="mt-2 font-medium text-foreground">
                    {activePrimitive.slotsAndPairing}
                  </p>
                </Callout>
              </section>

              <section id="comp-api" className="flex flex-col gap-3">
                <PropTable
                  title={`${activePrimitive.name} API Reference`}
                  props={activePropDefs}
                  caption={`Source module: ${activePrimitive.path} (${activePrimitive.exports.length} exports)`}
                />
              </section>
            </>
          )}

          {activeSection === "tokens" && (
            <>
              <header id="tok-ledger" className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h1 className="text-3xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-4xl">
                    OKLCH Contrast Ledger
                  </h1>
                  <SegmentedControl
                    size="sm"
                    value={contrastMode}
                    onValueChange={(next) => setContrastMode(next as "light" | "dark")}
                    aria-label="Inspect theme polarity"
                  >
                    <SegmentedControlItem value="light">Light Polarity</SegmentedControlItem>
                    <SegmentedControlItem value="dark">Dark Polarity</SegmentedControlItem>
                  </SegmentedControl>
                </div>
                <p className="text-base leading-relaxed [text-wrap:pretty] text-muted-foreground">
                  Measured live from `src/index.css` semantic variables against both WCAG 2.2 AA
                  ratios and WCAG 3 APCA perceptual lightness contrast thresholds.
                </p>
              </header>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semantic Pair</TableHead>
                    <TableHead>Swatches</TableHead>
                    <TableHead numeric>WCAG 2.2</TableHead>
                    <TableHead numeric>APCA Lc</TableHead>
                    <TableHead>Gate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeContrastPairs.map((pair) => (
                    <TableRow key={pair.id}>
                      <TableCell>
                        <div className="font-medium text-foreground">{pair.label}</div>
                        <div className="font-mono text-[11px] text-muted-foreground">
                          {pair.foregroundToken} / {pair.backgroundToken}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span
                            aria-hidden="true"
                            className="inline-block size-4 rounded-sm border border-border/70"
                            style={{ backgroundColor: pair.foregroundValue }}
                          />
                          <span
                            aria-hidden="true"
                            className="inline-block size-4 rounded-sm border border-border/70"
                            style={{ backgroundColor: pair.backgroundValue }}
                          />
                        </div>
                      </TableCell>
                      <TableCell numeric>{pair.wcag2Ratio.toFixed(2)}:1</TableCell>
                      <TableCell numeric>Lc {pair.absApcaLc.toFixed(1)}</TableCell>
                      <TableCell>
                        <Badge variant={pair.dualPassed ? "success" : "warning"} size="sm">
                          {pair.dualPassed ? "PASS" : "CHECK"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <section id="tok-rules" className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Perceptual Calibration Rules
                </h2>
                <Callout variant="tip" title="High-Luminance Polarity Flip">
                  Amber and yellow surfaces enforce deep dark ink tokens rather than white text to
                  prevent optical halation across light-polarised badges and callouts.
                </Callout>
              </section>
            </>
          )}

          {activeSection === "gates" && (
            <>
              <header id="gate-skills" className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-4xl">
                  Workspace Skills & CLI Gates
                </h1>
                <p className="text-base leading-relaxed [text-wrap:pretty] text-muted-foreground">
                  Every skill registered in `.agents/skills.json` enforces verifiable design and
                  documentation contracts backed by compiler gates.
                </p>
              </header>

              <div className="divide-y divide-border/60 rounded-2xl border border-border/70 bg-card/45 px-5">
                {docsManifest.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <code className="font-mono text-xs font-semibold text-foreground">
                          {skill.name}
                        </code>
                        <Badge variant="outline" size="sm">
                          v{skill.version}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed [text-wrap:pretty] text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                    <code className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {skill.path}
                    </code>
                  </div>
                ))}
              </div>

              <section id="gate-cli" className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  CLI Verification Pipeline
                </h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[220px]">Command</TableHead>
                      <TableHead>Verification Scope</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {GATE_COMMANDS.map((gate) => (
                      <TableRow key={gate.command}>
                        <TableCell>
                          <code className="font-mono text-xs font-semibold whitespace-nowrap text-foreground">
                            {gate.command}
                          </code>
                        </TableCell>
                        <TableCell className="text-xs leading-relaxed [text-wrap:pretty] text-muted-foreground">
                          {gate.purpose}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>
            </>
          )}
        </DocArticle>

        <DocToc headings={headings} verificationChecks={verificationChecks} />
      </DocLayout>
    </section>
  );
}
