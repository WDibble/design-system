---
name: app-blueprint
description: Use when building a complete application screen, multi-page product, or documented feature with this design system. Never use for single utility functions or non-UI backend scripts.
license: MIT
metadata:
  author: William Dibble
  version: "1.0.0"
  tags: [blueprint, architecture, orchestrator, app-builder, design-system, verification]
---

# App Blueprint & First-Pass Execution Standard

Constructing reliable software interfaces requires deterministic ordering: lock macrostructural intent first, verify perceptual OKLCH contrast second, compose from tested primitives third, regenerate AST documentation fourth, and clear every compiler gate before finishing.

---

## Purpose

Guide autonomous coding agents and engineers through the complete five-stage workflow for shipping verified applications, screens, and synchronised documentation using the `57` UI primitives and `470` kinetic icons in this design system.

---

## Prerequisites

- **Repository directives**: Read `AGENTS.md`, `public/llms.txt`, and `public/registry.json` first, then open only the needed `public/docs/components/<slug>.md` manuals or query the local `npm run mcp` tools (`recommend_components`, `get_component_spec`, `search_icons`, `validate_snippet`).
- **Sibling specialist skills**: Combine `craft-philosophy`, `semantic-theming`, `base-ui-primitives`, `motion-physics`, `technical-documentation`, `diagram-architecture`, and `production-deployment`.
- **Active toolchain**: Node `22+` with `npm run docs:build`, `npm run docs:check`, `npm run mcp`, `npm run invariants`, `npm run spellcheck`, and `npm run check`.

---

## Instructions

Execute these five sequential stages without skipping verification between phases:

1. **Lock category intent and macrostructure**: Identify the visitor's primary operational job (`configure`, `inspect`, `read`, `book`, `subscribe`, `monitor`) and select one archetype (`Workbench`, `Long Document`, `Split Studio`, `Manifesto`, `Index-First`, `Bento Grid`, `Feature Stack`, `Rail`). Consult [references/archetype-wiring-guide.md](references/archetype-wiring-guide.md) to match layout geometry and column bounds (`W_col >= 340px`, max container `1440px`) before writing JSX.
2. **Calibrate semantic OKLCH tokens**: Define light and dark CSS variables in `src/index.css` under `@theme inline`. Verify every text and surface pairing satisfies both WCAG 2.2 AA (`>= 4.5:1` body, `>= 3:1` UI) and WCAG 3 APCA (`|Lc| >= 60` controls, `>= 75` body), keeping positive black ink on luminous amber or yellow backgrounds.
3. **Compose strictly with repository primitives**: Read each target primitive's `public/docs/components/<slug>.md` manual (anatomy, sibling alternatives, Do/Don't rules, and verified recipe) before writing JSX from `@/components/ui` (`57` primitives) and `@/components/icons` (`470` icons). Pass an explicit numeric `size={...}` prop matching `40%` to `50%` of container height (`14` for `sm`, `16` for `default`, `18` for `lg`), lock resting borders with `border border-transparent`, apply `tabular-nums` to all numeric readouts, and enforce concentric corner radii (`R_inner = max(0, R_outer - Padding)`).
4. **Author and regenerate synchronised documentation**: Document new primitives or updated behaviour in `src/docs/specs/` and compiling `src/docs/examples/` fixtures paired with `DocLayout`, `CodeBlock`, `ComponentPreview`, `PropTable`, `Callout`, and `DiagramFrame`. Immediately run `npm run docs:build` so `src/generated/docs-manifest.ts`, all `57` per-component Markdown manuals, `public/registry.json`, `public/llms.txt`, and `public/llms-full.txt` stay exact.
5. **Run the empirical self-heal verification loop**: Execute `npm run docs:check`, `npm run invariants`, `npm run spellcheck`, `npm run check`, and `npm run build:lib`. Inspect any reported line number, fix the root cause (never silence failures with speculative claims), and re-run until every command exits `0`.

---

## Five-Stage Zero-Defect Pipeline

| Stage            | Primary Inputs                              | Output Artifact                        | Mandatory Exit Gate                             |
| :--------------- | :------------------------------------------ | :------------------------------------- | :---------------------------------------------- |
| **01 Archetype** | Visitor job, route map                      | Bounded page skeleton                  | Zero unrequested card grids or eyebrow pills    |
| **02 Theme**     | `src/index.css`, `src/lib/contrast.ts`      | Calibrated `:root` and `.dark` tokens  | All light and dark pairs clear WCAG AA + APCA   |
| **03 Compose**   | `src/components/ui`, `src/components/icons` | Accessible interactive TSX views       | Zero layout shifts, explicit `size={...}` icons |
| **04 Docs**      | AST props, CSS tokens, `skills/`            | Updated manifest and `public/llms.txt` | `npm run docs:check` exits `0`                  |
| **05 Verify**    | Full workspace sources and tests            | Production bundle and `dist-lib`       | `npm run invariants && npm run check` exits `0` |

---

## Examples

### Documented Operational Screen Blueprint

Follow this canonical composition pattern combining parent `NavigationBar` layout, explicit icon proportions, interactive `ComponentPreview`, and verification CLI execution:

```tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { ComponentPreview } from "@/components/ui/component-preview";
import { ShieldCheckIcon, SparklesIcon } from "@/components/icons";

export function ReleaseGateBlueprint() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
      <Callout variant="defining-constraint" title="Zero Layout Shift Guarantee">
        All interactive triggers declare transparent resting borders and tabular numerals.
      </Callout>

      <ComponentPreview
        title="Release Verification Action"
        code={`<Button variant="default" leftIcon={<SparklesIcon size={16} />}>Verify</Button>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default" leftIcon={<SparklesIcon size={16} />}>
            Verify Build
          </Button>
          <Badge variant="success" dot>
            APCA Pass
          </Badge>
          <Button variant="outline" leftIcon={<ShieldCheckIcon size={16} />}>
            Inspect Ledger
          </Button>
        </div>
      </ComponentPreview>
    </section>
  );
}
```

Synchronise documentation artifacts and run the complete verification gate:

```bash
npm run docs:build
npm run docs:check
npm run invariants
npm run spellcheck
npm run check
```

---

## Limitations

- **Unverified brand assets**: Never guess third-party brand hex colours, logotypes, or custom typography from memory; read verified stylesheet variables or request explicit values.
- **No synthetic proof**: Omit testimonials, telemetry metrics, or client grids whenever real empirical figures or supplied project assets are absent.
- **Documentation scope**: Running `npm run docs:build` parses exported `*Props` interfaces and `cva` variant objects; unexported local helper types do not populate `PropTable` rows.

---

## Troubleshooting

| Verification Failure             | Likely Root Cause                                                  | Corrective Action                                                              |
| :------------------------------- | :----------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `docs:check` exits non-zero      | UI primitives, tokens, or skills edited without regeneration       | Run `npm run docs:build` and commit updated manifest and `public/` artifacts   |
| Icon proportion invariant error  | Kinetic icon imported from `@/components/icons` omits `size={...}` | Add numeric `size={14}`, `size={16}`, or `size={18}` matching control height   |
| Atomic class collision error     | `size-full` or `p-0` merged after `h-*` or `w-*` inside `cn()`     | Move width bounds to parent container or keep explicit axis utilities separate |
| Em dash or banned buzzword error | Prose contains Unicode em dash, prose `--`, or marketing filler    | Rewrite with British English spelling using colons, commas, or concrete verbs  |
| Contrast audit flag on light hue | Pale background (`amber`, `yellow`) paired with white text         | Switch `*-foreground` token lightness to dark obsidian (`oklch(0.205 0 0)`)    |
