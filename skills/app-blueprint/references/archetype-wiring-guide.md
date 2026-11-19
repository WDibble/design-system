# Macrostructure & Archetype Wiring Guide

Use this reference matrix when mapping an application screen or feature route to verified layout primitives inside `src/components/ui/`.

---

## 1. Eight Intentional Macrostructures

Select one dominant layout grammar governed by what the visitor arrives to accomplish:

| Archetype         | Primary Visitor Job                            | Canonical Composition Stack                                                    | Non-Negotiable Constraints                                                      |
| :---------------- | :--------------------------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **Workbench**     | Configure, inspect, or test interactive UI     | `NavigationBar`, `Resizable` or asymmetric split, `SegmentedControl`, `Table`  | Cap container at `1440px`; pair live telemetry with `tabular-nums`              |
| **Long Document** | Study guides, API contracts, and skills        | `DocLayout`, `DocSidebar`, `DocArticle` (`max-w-[72ch]`), `DocToc`             | Keep reading measure `65ch` to `75ch`; include `"It's Working If"` checks       |
| **Split Studio**  | Tune OKLCH tokens or shader presets            | Control inspector (`Field`, `Slider`, `Select`) alongside live preview surface | Preserve live dual-engine WCAG 2.2 + APCA contrast feedback                     |
| **Manifesto**     | Read engineering philosophy and standards      | Centered or asymmetric typographic display lead + hairline `divide-y` chapters | Zero eyebrow pill kickers; rely on typographic scale and whitespace             |
| **Index-First**   | Search primitives, icons, or logs quickly      | `Input` search filter, category tabs, `Table` or ruled directory rows          | Never truncate primary row titles; show counts in `tabular-nums`                |
| **Bento Grid**    | Scan distinct non-uniform product capabilities | Irregular multi-span `Card` tracks with concentric `CardInner` surfaces        | Enforce `W_col >= 340px` before multi-column tracks (`>= 1080px` for 3 columns) |
| **Feature Stack** | Walk through ordered technical capabilities    | Full-bleed ruled horizontal rows alternating copy and interactive fixtures     | Maximum word budget `<= 450` words; use real primitives instead of mock divs    |
| **Rail**          | Switch workspaces, views, or tool modes        | Fixed `NavigationBar` or compact left rail paired with scrollable stage        | Harvest overflowing nav items automatically into `"More"` dropdown              |

---

## 2. Responsive Column & Spacing Contracts

- **Container upper cap**: Bound top-level page shells inside `max-w-[1440px]` so gutters absorb ultra-wide viewports while column geometry stays legible.
- **Anti-crush track widths**: Require minimum column width `340px` for rich content cards and `220px` inside multi-column navigation flyouts.
- **Concentric corner geometry**: Compute `R_inner = max(0, R_outer - Padding)`. For `rounded-2xl` (`16px`) outer frames with `p-1.5` (`6px`), apply `rounded-[10px]` on inner stages.
- **Helper slot stability**: Reserve `min-h-[1lh]` on form helper and validation text inside `Field` so dynamic errors never shove submit buttons vertically.
- **Safe icon sizing**: Maintain `40%` to `50%` icon-to-control height ratio: `12px` for `h-7` (`xs`), `14px` for `h-8` (`sm`), `16px` for `h-9` (`default`), and `18px` for `h-10` (`lg`).

---

## 3. Feature Documentation Pairing Checklist

Whenever adding a domain screen or component primitive, include all four documentation elements before invoking `npm run docs:build`:

1. **Opening Defining Constraint**: Render one `<Callout variant="defining-constraint">` summarising the invariant that separates the component from a generic wrapper.
2. **Interactive Fixture**: Wrap a live stateful example in `<ComponentPreview>` with working `"Reset preview state"` and `"Code"` view inspection.
3. **Extracted Props Table**: Pass `docsManifest.primitives` prop rows directly into `<PropTable>` so TypeScript signatures never drift from implementation.
4. **Architecture Diagram**: For multi-step flows or pipelines (`3` to `12` nodes), wrap orthogonal SVG routing in `<DiagramFrame>` containing `<title>` and `<desc>` elements.
