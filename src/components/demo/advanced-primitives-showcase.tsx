"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUpload, type FileItem } from "@/components/ui/file-upload";
import {
  Timeline,
  TimelineItem,
  TimelineNode,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
  TimelineBody,
  TimelineFooter,
} from "@/components/ui/timeline";
import { Tree, type TreeNodeData } from "@/components/ui/tree";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";
import {
  SparklesIcon,
  FolderOpenIcon,
  FileTextIcon,
  SearchIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LayoutGridIcon,
  AlignLeftIcon,
  CursorClickIcon,
  TerminalIcon,
  SlidersHorizontalIcon,
} from "@/components/icons";

const frameworks = [
  "React 19",
  "Base UI",
  "Tailwind CSS v4",
  "Motion React",
  "TypeScript 5.7",
  "Vite 8",
  "Next.js",
  "Astro",
  "Svelte",
];

const treeData: TreeNodeData[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "ui", label: "ui (48 primitives)", badge: <Badge size="sm" variant="secondary" className="tabular-nums">48</Badge> },
          { id: "icons", label: "icons (470 kinetic)", badge: <Badge size="sm" variant="outline" className="tabular-nums">470</Badge> },
          { id: "demo", label: "demo" },
        ],
      },
      {
        id: "tokens",
        label: "tokens",
        children: [
          { id: "motion", label: "motion.ts" },
          { id: "gradients", label: "gradients.ts" },
          { id: "materials", label: "materials.css" },
        ],
      },
      { id: "lib", label: "lib (contrast, theme)" },
      { id: "app", label: "App.tsx" },
      { id: "index-css", label: "index.css" },
    ],
  },
  {
    id: "skills",
    label: "skills",
    children: [
      { id: "craft", label: "craft-philosophy" },
      { id: "motion-skill", label: "motion-physics" },
      { id: "base-ui", label: "base-ui-primitives" },
      { id: "theming", label: "semantic-theming" },
    ],
  },
  { id: "readme", label: "README.md" },
  { id: "philosophy", label: "PHILOSOPHY.md" },
];

interface FileDetail {
  path: string;
  type: "file" | "directory";
  role: string;
  snippet: string;
  metrics: { label: string; value: string }[];
}

const fileDetailsMap: Record<string, FileDetail> = {
  src: {
    path: "src/",
    type: "directory",
    role: "Core design engineering source root",
    snippet: `src/\n├── components/   # Headless primitives & kinetic icons\n├── tokens/       # Apple springs & OKLCH gradients\n├── lib/          # Contrast evaluation & theme runtime\n├── pages/        # Design principles draft v0.1\n└── App.tsx       # Live interactive workbench`,
    metrics: [
      { label: "Files", value: "62" },
      { label: "Engine", value: "React 19" },
    ],
  },
  components: {
    path: "src/components/",
    type: "directory",
    role: "Component library layer built with Base UI",
    snippet: `components/\n├── ui/           # 48 headless accessible primitives\n├── icons/        # 470 reversible spring-animated icons\n└── demo/         # Interactive workbench showcases`,
    metrics: [
      { label: "Primitives", value: "48" },
      { label: "Icons", value: "470" },
    ],
  },
  ui: {
    path: "src/components/ui/",
    type: "directory",
    role: "48 accessible headless primitives",
    snippet: `export * from "./button";\nexport * from "./card";\nexport * from "./combobox";\nexport * from "./dialog";\nexport * from "./drawer";\nexport * from "./radio-group";\nexport * from "./tree";\n// 48 headless primitives`,
    metrics: [
      { label: "WCAG", value: "100% AA" },
      { label: "Primitives", value: "48" },
    ],
  },
  icons: {
    path: "src/components/icons/",
    type: "directory",
    role: "470 reversible kinetic icons with spring physics",
    snippet: `// Directive 8: Reversible mechanical affordances\nimport { CheckIcon, SearchIcon, SparklesIcon } from "@/components/icons";\n\n// Icons glide back to origin on pointer release`,
    metrics: [
      { label: "Glyphs", value: "470" },
      { label: "Physics", value: "Apple HIG" },
    ],
  },
  tokens: {
    path: "src/tokens/",
    type: "directory",
    role: "Physical motion, materials and gradient tokens",
    snippet: `tokens/\n├── motion.ts      # Apple HIG spring configurations\n├── gradients.ts   # Perceptual OKLCH meshes\n└── materials.css  # 4-tier liquid glass materials`,
    metrics: [
      { label: "Modules", value: "3" },
      { label: "Color space", value: "OKLCH" },
    ],
  },
  motion: {
    path: "src/tokens/motion.ts",
    type: "file",
    role: "Calibrated Apple HIG spring physics",
    snippet: `export const springs = {\n  tactile: { type: "spring", stiffness: 400, damping: 28 },\n  dialog:  { type: "spring", stiffness: 280, damping: 26 },\n  snappy:  { type: "spring", stiffness: 500, damping: 30 },\n  micro:   { type: "spring", stiffness: 600, damping: 32 },\n} as const;`,
    metrics: [
      { label: "Springs", value: "4 curves" },
      { label: "Standard", value: "Apple HIG" },
    ],
  },
  gradients: {
    path: "src/tokens/gradients.ts",
    type: "file",
    role: "Perceptual OKLCH ambient color harmonies",
    snippet: `// Directive 11: Perceptual gradient engineering\nexport const ambientGradients = {\n  cosmicFusion: {\n    palette: "Magenta to Indigo",\n    css: "linear-gradient(135deg in oklch, ...)",\n  },\n  sublimeLight: {\n    palette: "Coral to Periwinkle",\n    css: "linear-gradient(135deg in oklch, ...)",\n  },\n};`,
    metrics: [
      { label: "Color space", value: "OKLCH" },
      { label: "Muddy midpoints", value: "0%" },
    ],
  },
  materials: {
    path: "src/tokens/materials.css",
    type: "file",
    role: "4-tier spatial liquid glass materials",
    snippet: `.glass-ultra-thin {\n  backdrop-filter: blur(8px);\n  background: var(--material-ultra-thin);\n}\n.glass-thick {\n  backdrop-filter: blur(24px);\n  background: var(--material-thick);\n}`,
    metrics: [
      { label: "Materials", value: "4 tiers" },
      { label: "Specular rim", value: "1px" },
    ],
  },
  lib: {
    path: "src/lib/",
    type: "directory",
    role: "Theme runtime and APCA contrast verification",
    snippet: `lib/\n├── contrast.ts       # WCAG 2.2 AA + WCAG 3 APCA\n├── theme.ts          # Zod validation & token applier\n├── theme-presets.ts  # Curated OKLCH themes\n└── utils.ts          # Tailwind merge & clsx`,
    metrics: [
      { label: "Validation", value: "Zod Schema" },
      { label: "Contrast", value: "Dual Engine" },
    ],
  },
  app: {
    path: "src/App.tsx",
    type: "file",
    role: "Interactive design system workbench",
    snippet: `export default function App() {\n  return (\n    <ToastProvider>\n      <NavigationBar items={navItems} />\n      <main className="container space-y-12">\n        {/* 12 interactive component showcases */}\n      </main>\n    </ToastProvider>\n  );\n}`,
    metrics: [
      { label: "Showcases", value: "12 sections" },
      { label: "Telemetry", value: "Real-time" },
    ],
  },
  "index-css": {
    path: "src/index.css",
    type: "file",
    role: "Tailwind v4 theme inline and semantic CSS variables",
    snippet: `@import "tailwindcss";\n\n@theme inline {\n  --color-background: var(--background);\n  --color-foreground: var(--foreground);\n  --color-primary: var(--primary);\n  --color-primary-foreground: var(--primary-foreground);\n}`,
    metrics: [
      { label: "Compiler", value: "Tailwind v4" },
      { label: "Theme mode", value: "@theme inline" },
    ],
  },
  skills: {
    path: "skills/",
    type: "directory",
    role: "Living design engineering rules & cognitive directives",
    snippet: `skills/\n├── craft-philosophy/     # 13 non-negotiable directives\n├── motion-physics/       # Apple HIG springs\n├── base-ui-primitives/   # Headless compound model\n└── semantic-theming/     # Semantic token specification`,
    metrics: [
      { label: "Skills", value: "4 standards" },
      { label: "Format", value: "SKILL.md" },
    ],
  },
  craft: {
    path: "skills/craft-philosophy/SKILL.md",
    type: "file",
    role: "13 non-negotiable design directives",
    snippet: `# The 13 Non-Negotiable Directives\n1. Physical Yield on pointerdown\n2. Zero Layout Shifts\n3. Tabular Numerals\n4. Accessible Invariants\n5. Quiet Chrome & Anti-Pill Proliferation\n6. Concentric Corner Radii...`,
    metrics: [
      { label: "Directives", value: "13 rules" },
      { label: "Version", value: "0.1" },
    ],
  },
  "motion-skill": {
    path: "skills/motion-physics/SKILL.md",
    type: "file",
    role: "Apple fluid interface rules & spring curves",
    snippet: `# Motion Physics Specification\nAll transitions must inherit velocity, remain interruptible, and never wait for pointer release (click). Calibrated springs: tactile, dialog, snappy, micro.`,
    metrics: [
      { label: "Velocity", value: "Inherited" },
      { label: "Easing", value: "Spring physics" },
    ],
  },
  "base-ui": {
    path: "skills/base-ui-primitives/SKILL.md",
    type: "file",
    role: "Headless accessible compound primitives",
    snippet: `# Base UI Compound Pattern\nComponents separate behavioral state from visual styling. Follows WCAG 2.2 accessibility invariants, Escape/Outside-click parity, and outside focus trap.`,
    metrics: [
      { label: "Composition", value: "Compound" },
      { label: "Invariants", value: "WCAG 2.2" },
    ],
  },
  theming: {
    path: "skills/semantic-theming/SKILL.md",
    type: "file",
    role: "Semantic theme token specification",
    snippet: `export const themeExportSchema = z.object({\n  name: z.string().default("Custom Theme"),\n  styles: z.object({\n    light: themeStylePropsSchema,\n    dark: themeStylePropsSchema,\n  }),\n});`,
    metrics: [
      { label: "Interoperable", value: "Theme JSON" },
      { label: "Dual engine", value: "APCA + AA" },
    ],
  },
  demo: {
    path: "src/components/demo/",
    type: "directory",
    role: "Workbench demo harnesses and component showcases",
    snippet: `demo/\n├── icon-gallery.tsx\n└── advanced-primitives-showcase.tsx`,
    metrics: [
      { label: "Galleries", value: "2 harnesses" },
      { label: "Interactive", value: "Live" },
    ],
  },
  readme: {
    path: "README.md",
    type: "file",
    role: "Design system repository standard",
    snippet: `# Design System\nA human-centric, agent-native design system built at the intersection of visual precision, physical intuition, and robust engineering.`,
    metrics: [
      { label: "License", value: "MIT" },
      { label: "Standard", value: "Living" },
    ],
  },
  philosophy: {
    path: "PHILOSOPHY.md",
    type: "file",
    role: "Human sensory manifesto (v0.1 Draft)",
    snippet: `# The Sensory Manifesto\nSoftware is a cognitive environment. We design interfaces for the human nervous system: their hands on glass, their ocular fatigue, their working memory, and their dignity.`,
    metrics: [
      { label: "Status", value: "v0.1 Draft" },
      { label: "Tone", value: "Human dignity" },
    ],
  },
};

export function AdvancedPrimitivesShowcase() {
  // Combobox state
  const [selectedFramework, setSelectedFramework] = React.useState<string | null>("React 19");

  // RadioGroup state
  const [density, setDensity] = React.useState("comfortable");

  // ToggleGroup state
  const [formatting, setFormatting] = React.useState<string[]>(["bold"]);
  const [viewMode, setViewMode] = React.useState("grid");

  // ContextMenu state
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [engineMode, setEngineMode] = React.useState("apca");

  // FileUpload state
  const [files, setFiles] = React.useState<FileItem[]>([]);

  // Tree state
  const [selectedTreeNode, setSelectedTreeNode] = React.useState<string>("app");
  const activeDetail = fileDetailsMap[selectedTreeNode] || fileDetailsMap.app;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* 1. Advanced Selection & Formatting */}
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col gap-1 pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <SlidersHorizontalIcon size={16} className="text-primary" />
            <span>Selection &amp; Keycap Primitives</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Combobox autocomplete with instant filtering, accessible radio groups, and tactile physical keycaps.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1">
          {/* Combobox Autocomplete */}
          <div className="space-y-2">
            <label htmlFor="combobox-technologies" className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Filterable Combobox</span>
              <span className="text-[10px] font-mono text-muted-foreground">Base UI Combobox</span>
            </label>
            <Combobox
              items={frameworks}
              value={selectedFramework}
              onValueChange={setSelectedFramework}
            >
              <ComboboxInput
                id="combobox-technologies"
                aria-label="Search technologies"
                placeholder="Search technologies..."
                icon={<SearchIcon size={14} />}
                size="default"
              />
              <ComboboxContent>
                <ComboboxEmpty>No technology found.</ComboboxEmpty>
                {frameworks.map((fw) => (
                  <ComboboxItem key={fw} value={fw}>
                    {fw}
                  </ComboboxItem>
                ))}
              </ComboboxContent>
            </Combobox>
          </div>

          {/* RadioGroup & Density Selector */}
          <div className="space-y-2.5 pt-3 border-t border-border/40">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Layout Density Radio Group</label>
              <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                Active: {density}
              </span>
            </div>
            <RadioGroup
              value={density}
              onValueChange={(v) => setDensity(v as string)}
              aria-label="Layout density options"
              className="grid grid-cols-3 gap-2"
            >
              {[
                { id: "compact", label: "Compact", desc: "High density" },
                { id: "comfortable", label: "Comfortable", desc: "Default spacing" },
                { id: "spacious", label: "Spacious", desc: "Airy baseline" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border/70 bg-card hover:bg-muted/40 cursor-pointer transition-colors shadow-xs"
                >
                  <RadioGroupItem value={opt.id} aria-label={opt.label} className="mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Toggle and Toggle Group */}
          <div className="space-y-2.5 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Interactive Toggle Toolbars</label>
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Multi-toggle formatting */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground mr-1">Style:</span>
                <ToggleGroup
                  value={formatting}
                  onValueChange={(vals) => setFormatting(vals as string[])}
                  aria-label="Text formatting styles"
                  variant="surface"
                >
                  <Toggle value="bold" aria-label="Toggle bold text" size="sm">
                    <BoldIcon size={14} />
                  </Toggle>
                  <Toggle value="italic" aria-label="Toggle italic text" size="sm">
                    <ItalicIcon size={14} />
                  </Toggle>
                  <Toggle value="underline" aria-label="Toggle underline text" size="sm">
                    <UnderlineIcon size={14} />
                  </Toggle>
                </ToggleGroup>
              </div>

              {/* Single-select view switch */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground mr-1">View:</span>
                <ToggleGroup
                  value={[viewMode]}
                  onValueChange={(vals) => {
                    if (vals && vals.length > 0) {
                      setViewMode(vals[vals.length - 1] as string);
                    }
                  }}
                  aria-label="Display layout mode"
                  variant="outline"
                >
                  <Toggle value="grid" aria-label="Grid layout view" size="sm">
                    <LayoutGridIcon size={14} />
                  </Toggle>
                  <Toggle value="list" aria-label="List layout view" size="sm">
                    <AlignLeftIcon size={14} />
                  </Toggle>
                </ToggleGroup>
              </div>
            </div>
          </div>

          {/* Physical Kbd Matrix */}
          <div className="space-y-2 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Physical Keycap Micro-Primitives (Kbd)</label>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Palette:</span>
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">K</Kbd>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Theme:</span>
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">T</Kbd>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Dismiss:</span>
                <Kbd size="sm">Esc</Kbd>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Confirm:</span>
                <Kbd size="sm">↵ Enter</Kbd>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Contextual Surfaces: ContextMenu, HoverCard & Drawer */}
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col gap-1 pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CursorClickIcon size={16} className="text-primary" />
            <span>Contextual Floating Surfaces</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Desktop-grade right-click context menu, rich hover preview cards, and swipeable bottom drawer.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1">
          {/* Desktop Context Menu */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Right-Click Context Menu</span>
              <span className="text-[10px] font-mono text-muted-foreground">Secondary click / Long press</span>
            </label>
            <ContextMenu>
              <ContextMenuTrigger
                aria-label="Interactive context menu demo surface. Secondary click or press Shift+F10 to trigger menu."
                className="flex h-28 w-full flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 text-center select-none cursor-context-menu hover:bg-muted/40 transition-colors p-4"
              >
                <CursorClickIcon size={20} className="text-muted-foreground mb-1.5" />
                <span className="text-xs font-medium text-foreground">Right click inside this area</span>
                <span className="text-[11px] text-muted-foreground">
                  Triggers native context menu with keyboard navigation
                </span>
              </ContextMenuTrigger>

              <ContextMenuContent>
                <ContextMenuItem>
                  <span>Reload Page</span>
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <span>Save Bookmark</span>
                  <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                  Show Bookmarks Bar
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Contrast Engine</ContextMenuSubTrigger>
                  <ContextMenuContent className="w-44">
                    <ContextMenuRadioGroup value={engineMode} onValueChange={setEngineMode}>
                      <ContextMenuRadioItem value="apca">WCAG 3 APCA</ContextMenuRadioItem>
                      <ContextMenuRadioItem value="aa">WCAG 2.2 AA</ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                  </ContextMenuContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <span>Purge Cache</span>
                  <ContextMenuShortcut>⇧⌘⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>

          {/* HoverCard Profile Preview */}
          <div className="space-y-2.5 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Rich Hover Preview (HoverCard)</label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Hover over author:</span>
              <HoverCard>
                <HoverCardTrigger
                  aria-label="View Antigravity engine profile preview"
                  className="text-xs font-semibold text-primary underline underline-offset-4 cursor-pointer hover:text-primary/80"
                >
                  @antigravity
                </HoverCardTrigger>
                <HoverCardContent className="w-80 space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="size-10 border border-border/80">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">AG</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-foreground">Antigravity Engine</p>
                        <Badge size="sm" variant="secondary" className="font-mono text-[9px]">v0.1</Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        Human-centric, agent-native design system built with React 19, Base UI, and physical motion springs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground tabular-nums pt-1 border-t border-border/40 font-mono">
                    <div><strong className="text-foreground">48</strong> Primitives</div>
                    <div><strong className="text-foreground">470</strong> Icons</div>
                    <div><strong className="text-foreground">100%</strong> WCAG</div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* Bottom Sheet Drawer */}
          <div className="space-y-2.5 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Mobile Bottom Sheet (Drawer)</label>
            <div>
              <Drawer>
                <DrawerTrigger render={
                  <Button variant="outline" size="sm" aria-label="Open system telemetry bottom drawer" className="gap-2">
                    <TerminalIcon size={14} />
                    <span>Open Bottom Drawer</span>
                  </Button>
                } />
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>System Telemetry Drawer</DrawerTitle>
                    <DrawerDescription>
                      Swipe down on touch devices or click anywhere outside to dismiss.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="space-y-3 py-2 text-xs text-muted-foreground">
                    <div className="p-3 rounded-lg bg-muted/40 border border-border/60 space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span>Fluid Frame Budget</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">16.6ms (60 FPS)</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px]">
                        <span>Speculation Pre-render</span>
                        <span className="text-primary font-semibold">Active</span>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose render={
                      <Button variant="default" size="sm" className="w-full">
                        Close Drawer
                      </Button>
                    } />
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Master-Detail Project Architecture Explorer */}
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col gap-1 pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FolderOpenIcon size={16} className="text-primary" />
            <span>Project Explorer &amp; Token Inspector</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Recursive file tree paired with a live architectural inspector and code snippet preview.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
            {/* Left: Compact Tree (Unconstrained Natural Height, Zero Inner Scrollbars) */}
            <div className="flex flex-col gap-2 p-2.5 rounded-xl border border-border/80 bg-muted/15">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-semibold text-foreground">File System</span>
                <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                  62 files
                </span>
              </div>
              <Tree
                data={treeData}
                selectedId={selectedTreeNode}
                onSelect={(node) => setSelectedTreeNode(node.id)}
                defaultExpandedIds={["src"]}
                className="w-full"
              />
            </div>

            {/* Right: Live File & Token Inspector */}
            <div className="flex flex-col gap-2.5 p-3 rounded-xl border border-border/80 bg-card shadow-xs">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-border/50">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                    {activeDetail.type === "directory" ? (
                      <FolderOpenIcon size={14} className="text-primary" />
                    ) : (
                      <FileTextIcon size={14} className="text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground font-mono truncate">
                      {activeDetail.path}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {activeDetail.role}
                    </p>
                  </div>
                </div>
                <CopyButton
                  value={activeDetail.snippet}
                  size="sm"
                  aria-label={`Copy source snippet for ${activeDetail.path}`}
                />
              </div>

              {/* Source Snippet Preview inside ScrollArea */}
              <ScrollArea
                tabIndex={0}
                aria-label={`Source preview for ${activeDetail.path}`}
                className="h-44 w-full rounded-lg border border-border/70 p-2.5 bg-muted/20 font-mono text-[10px] leading-relaxed text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <pre className="font-mono whitespace-pre text-[10px] leading-relaxed select-text">
                  {activeDetail.snippet}
                </pre>
              </ScrollArea>

              {/* Telemetry Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-border/40 font-mono text-[10px] text-muted-foreground tabular-nums">
                {activeDetail.metrics.map((m) => (
                  <div key={m.label} className="flex items-center gap-1.5">
                    <span>{m.label}:</span>
                    <span className="text-foreground font-medium">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Activity Stream & File Staging: Timeline & FileUpload */}
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col gap-1 pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <SparklesIcon size={16} className="text-primary" />
            <span>Activity Stream &amp; File Staging</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Chronological audit timeline and tactile drag-and-drop file staging zone with format validation.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1">
          {/* Chronological Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Deployment Audit Timeline</label>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                4 events recorded
              </span>
            </div>

            {/* Specialized Node Archetype Suite Tray */}
            <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-foreground">Specialized Node Palette</span>
                <span className="font-mono text-muted-foreground text-[10px]">10 Pack Presets</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <TimelineNode.Progress progress={76} pulse interactive aria-label="Progress preview: 76%" />
                <TimelineNode.Heartbeat status="success" interactive aria-label="Heartbeat probe: Healthy" />
                <TimelineNode.Pulse status="primary" interactive aria-label="Radar beacon: Active" />
                <TimelineNode.Step step={1} state="completed" interactive aria-label="Step 1: Completed" />
                <TimelineNode.Step step={2} state="current" interactive aria-label="Step 2: Current" />
                <TimelineNode.Step step={3} state="pending" interactive aria-label="Step 3: Pending" />
                <TimelineNode.Avatar fallback="CI" badgeStatus="success" badgeIcon="✓" interactive aria-label="Author: CI Release Engine" />
                <TimelineNode.Commit variant="commit" status="primary" interactive aria-label="Git commit node" />
                <TimelineNode.Action label="Approval Gate" status="primary" onClick={() => {}} />
                <TimelineNode.Dot dotVariant="glow" status="warning" interactive aria-label="Warning status dot" />
              </div>
            </div>

            <Timeline className="pt-2">
              {/* 1. Conic Progress Node + Animated Traveling Packet Flow Connector */}
              <TimelineItem connectorVariant="flow">
                <TimelineNode.Progress progress={76} pulse interactive aria-label="Build progress: 76%" />
                <TimelineContent>
                  <TimelineHeader>
                    <div className="flex items-center gap-2 min-w-0">
                      <TimelineTitle>Edge Cache Synchronisation</TimelineTitle>
                      <Badge variant="outline" size="sm" className="font-mono text-[9px] border-primary/40 text-primary py-0 shrink-0">
                        76% Compiled
                      </Badge>
                    </div>
                    <TimelineTime dateTime="2026-10-30T13:58:00Z">Streaming</TimelineTime>
                  </TimelineHeader>
                  <TimelineDescription>
                    Streaming distribution bundle across 12 availability zones with live conic stroke telemetry.
                  </TimelineDescription>
                  <TimelineBody>
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                      <span className="px-1.5 py-0.5 rounded-md bg-muted/70 border border-border/50 text-foreground font-semibold">
                        sha:7cbf211
                      </span>
                      <span className="text-muted-foreground/50">&bull;</span>
                      <span className="text-primary font-medium">Flowing to ingest node</span>
                    </div>
                  </TimelineBody>
                </TimelineContent>
              </TimelineItem>

              {/* 2. Telemetry Heartbeat LED Node + Fixed Verified Solid Connector */}
              <TimelineItem connectorVariant="solid" connectorStatus="success">
                <TimelineNode.Heartbeat status="success" interactive aria-label="WebSocket connection healthy" />
                <TimelineContent>
                  <TimelineHeader>
                    <div className="flex items-center gap-2 min-w-0">
                      <TimelineTitle>WebSocket Telemetry Channel</TimelineTitle>
                      <Badge variant="outline" size="sm" className="font-mono text-[9px] border-emerald-500/40 text-emerald-600 dark:text-emerald-400 py-0 shrink-0">
                        Healthy
                      </Badge>
                    </div>
                    <TimelineTime dateTime="2026-10-30T13:45:00Z">Just now</TimelineTime>
                  </TimelineHeader>
                  <TimelineDescription>
                    Active cardiac probe pinging edge listeners at 2.8s hardware-synchronized intervals.
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              {/* 3. Collaborative Actor Avatar Node + Fixed Architectural Dashed Connector */}
              <TimelineItem connectorVariant="dashed">
                <TimelineNode.Avatar fallback="WD" badgeStatus="success" badgeIcon="✓" interactive aria-label="Author: William Dibble" />
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle>Version 0.1 Tagged &amp; Published</TimelineTitle>
                    <TimelineTime dateTime="2026-10-30T13:30:00Z">18m ago</TimelineTime>
                  </TimelineHeader>
                  <TimelineDescription>
                    Self-contained origin anonymity enforced across all 13 design engineering directives.
                  </TimelineDescription>
                  <TimelineFooter>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Avatar className="size-4 text-[8px]">
                        <AvatarFallback>CI</AvatarFallback>
                      </Avatar>
                      <span>Triggered via Automated Release Engine</span>
                    </div>
                  </TimelineFooter>
                </TimelineContent>
              </TimelineItem>

              {/* 4. Sequential Stepper Numeral Node */}
              <TimelineItem isLast connectorVariant="none">
                <TimelineNode.Step step={4} state="completed" interactive aria-label="Step 4: Build verified" />
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle>Automated Build Verification</TimelineTitle>
                    <TimelineTime dateTime="2026-10-30T13:00:00Z">45m ago</TimelineTime>
                  </TimelineHeader>
                  <TimelineDescription>
                    All 48 component exports passed strict TypeScript compilation and perceptual contrast checks.
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>

          {/* Drag & Drop File Upload */}
          <div className="space-y-2 pt-3 border-t border-border/40">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">File Staging Dropzone</label>
              <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                {files.length} / 3 staged
              </span>
            </div>
            <FileUpload
              value={files}
              onChange={setFiles}
              maxFiles={3}
              maxSizeMB={5}
              accept=".pdf,.png,.jpg,.json"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
