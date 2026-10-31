import type { TreeNodeData } from "@/components/ui/tree";
import { Badge } from "@/components/ui/badge";

export const frameworks = [
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

export const treeData: TreeNodeData[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          {
            id: "ui",
            label: "ui (48 primitives)",
            badge: (
              <Badge size="sm" variant="secondary" className="tabular-nums">
                48
              </Badge>
            ),
          },
          {
            id: "icons",
            label: "icons (470 kinetic)",
            badge: (
              <Badge size="sm" variant="outline" className="tabular-nums">
                470
              </Badge>
            ),
          },
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

export interface FileDetail {
  path: string;
  type: "file" | "directory";
  role: string;
  snippet: string;
  metrics: { label: string; value: string }[];
}

export const fileDetailsMap: Record<string, FileDetail> = {
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
    snippet: `src/components/\n├── ui/           # 48 accessible compound primitives\n├── icons/        # 470 spring-animated SVG glyphs\n└── theme-studio  # Real-time OKLCH theme studio`,
    metrics: [
      { label: "Primitives", value: "48" },
      { label: "Icons", value: "470" },
    ],
  },
  ui: {
    path: "src/components/ui/",
    type: "directory",
    role: "48 headless compound components with WCAG 2.2 accessibility",
    snippet: `export * from "./button";\nexport * from "./input";\nexport * from "./dialog";\nexport * from "./navigation-bar";\nexport * from "./markdown-toolbar";\nexport * from "./timeline";`,
    metrics: [
      { label: "Coverage", value: "100% WCAG" },
      { label: "Primitives", value: "48" },
    ],
  },
  icons: {
    path: "src/components/icons/",
    type: "directory",
    role: "Kinetic motion glyphs with reversible mechanical affordances",
    snippet: `export * from "./arrow-right";\nexport * from "./sliders-horizontal";\nexport * from "./check";\nexport * from "./palette";`,
    metrics: [
      { label: "Glyphs", value: "470" },
      { label: "Physics", value: "Apple HIG" },
    ],
  },
  tokens: {
    path: "src/tokens/",
    type: "directory",
    role: "Physical motion springs and perceptual OKLCH gradients",
    snippet: `export const springs = {\n  snappy: { type: "spring", stiffness: 450, damping: 35 },\n  fluid: { type: "spring", stiffness: 300, damping: 30 },\n  bouncy: { type: "spring", stiffness: 400, damping: 20 },\n};`,
    metrics: [
      { label: "Springs", value: "3 presets" },
      { label: "Gradients", value: "OKLCH" },
    ],
  },
  motion: {
    path: "src/tokens/motion.ts",
    type: "file",
    role: "Apple HIG fluid spring definitions for Motion React",
    snippet: `export const springs = {\n  snappy: { type: "spring", stiffness: 450, damping: 35 },\n  fluid: { type: "spring", stiffness: 300, damping: 30 },\n  bouncy: { type: "spring", stiffness: 400, damping: 20 },\n};\nexport const transitions = {\n  scaleDown: { scale: 0.97 },\n  scaleUp: { scale: 1.02 },\n};`,
    metrics: [
      { label: "Directive", value: "#3 Motion" },
      { label: "Physics", value: "Mass/Damp" },
    ],
  },
  gradients: {
    path: "src/tokens/gradients.ts",
    type: "file",
    role: "Modern perceptual OKLCH atmospheric ramps",
    snippet: `export const ambientGradients = {\n  cosmicFusion: "linear-gradient(135deg in oklch, oklch(0.55 0.22 290), oklch(0.65 0.18 340))",\n  auroraBorealis: "linear-gradient(135deg in oklch, oklch(0.65 0.2 160), oklch(0.7 0.18 200))",\n};`,
    metrics: [
      { label: "Space", value: "in oklch" },
      { label: "Midpoints", value: "Zero gray" },
    ],
  },
  materials: {
    path: "src/tokens/materials.css",
    type: "file",
    role: "Liquid Glass & spatial translucency materials",
    snippet: `.glass-ultra-thin {\n  background: var(--glass-ultra-thin-bg);\n  backdrop-filter: blur(8px) saturate(140%);\n}\n.glass-thick {\n  background: var(--glass-thick-bg);\n  backdrop-filter: blur(28px) saturate(190%);\n}`,
    metrics: [
      { label: "Depths", value: "4 levels" },
      { label: "Specular", value: "1px rim" },
    ],
  },
  lib: {
    path: "src/lib/",
    type: "directory",
    role: "Mathematical contrast engines and theme token runtime",
    snippet: `src/lib/\n├── contrast.ts       # WCAG 2.2 AA + WCAG 3 APCA\n├── theme-presets.ts  # 10 curated accessible presets\n├── theme.ts          # Two-way JSON serialization\n└── utils.ts          # clsx + twMerge utility`,
    metrics: [
      { label: "Engines", value: "Dual Contrast" },
      { label: "Presets", value: "10" },
    ],
  },
  app: {
    path: "src/App.tsx",
    type: "file",
    role: "Comprehensive interactive workbench & living fixture harness",
    snippet: `export default function App() {\n  return (\n    <ToastProvider>\n      <NavigationBar items={navItems} />\n      <main className="container space-y-12">\n        {/* 12 interactive component showcases */}\n      </main>\n    </ToastProvider>\n  );\n}`,
    metrics: [
      { label: "Sections", value: "12" },
      { label: "Theme", value: "⌘T Studio" },
    ],
  },
  "index-css": {
    path: "src/index.css",
    type: "file",
    role: "Tailwind CSS v4 theme entrypoint & @theme inline tokens",
    snippet: `@import "tailwindcss";\n\n@theme inline {\n  --color-background: var(--background);\n  --color-foreground: var(--foreground);\n  --color-primary: var(--primary);\n  --radius-xl: var(--radius);\n}`,
    metrics: [
      { label: "Standard", value: "Tailwind v4" },
      { label: "Mode", value: "@theme inline" },
    ],
  },
  skills: {
    path: "skills/",
    type: "directory",
    role: "Autonomous design engineering skill modules for AI agents",
    snippet: `skills/\n├── craft-philosophy/    # Anti-slop & 9-state matrix\n├── motion-physics/      # Apple HIG fluid interfaces\n├── base-ui-primitives/  # Headless compound rules\n└── semantic-theming/    # OKLCH token architecture`,
    metrics: [
      { label: "Modules", value: "4 skills" },
      { label: "Target", value: "AI + Human" },
    ],
  },
  craft: {
    path: "skills/craft-philosophy/SKILL.md",
    type: "file",
    role: "Negative bans on AI tropes and mandatory 9-state matrix",
    snippet: `## Craft Philosophy\n1. Strictly ban the 3-card generic grid.\n2. Ban decorative eyebrow pills above headings.\n3. Every interactive control must fulfil the 9-state interactive matrix.`,
    metrics: [
      { label: "States", value: "9-state matrix" },
      { label: "Bans", value: "Anti-slop" },
    ],
  },
  "motion-skill": {
    path: "skills/motion-physics/SKILL.md",
    type: "file",
    role: "Apple HIG fluid interface motion physics guidelines",
    snippet: `## Motion Physics\n- Never use artificial linear transitions.\n- Controls must yield beneath fingertip on pointerdown (scale 0.97).\n- Reversible mechanical affordances on icons.`,
    metrics: [
      { label: "Yield", value: "pointerdown" },
      { label: "Curves", value: "Spring mass" },
    ],
  },
  "base-ui": {
    path: "skills/base-ui-primitives/SKILL.md",
    type: "file",
    role: "Headless compound architecture using @base-ui/react",
    snippet: `## Base UI Primitives\n- Strict separation of state logic and presentation markup.\n- WCAG 2.2 Level AA accessibility guarantees.\n- Compound component composition pattern.`,
    metrics: [
      { label: "Standard", value: "W3C WAI-ARIA" },
      { label: "Pattern", value: "Compound" },
    ],
  },
  theming: {
    path: "skills/semantic-theming/SKILL.md",
    type: "file",
    role: "Semantic token architecture interoperable with Tailwind v4",
    snippet: `## Semantic Theming\n- Modern OKLCH color coordinates.\n- Dual-Engine contrast enforcement (WCAG 2.2 + APCA).\n- Concentric radius optical math.`,
    metrics: [
      { label: "Contrast", value: "Dual-Engine" },
      { label: "Tokens", value: "OKLCH" },
    ],
  },
  readme: {
    path: "README.md",
    type: "file",
    role: "Public repository overview & 60-second quickstart",
    snippet: `# Antigravity Design System\nA human-centric, agent-native design system built with React 19, Base UI, Tailwind CSS v4, and Motion.`,
    metrics: [
      { label: "License", value: "MIT" },
      { label: "Start", value: "60-second" },
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
