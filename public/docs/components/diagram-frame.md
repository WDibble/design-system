# DiagramFrame

> Accessible orthogonal SVG schematic container with semantic caption and expanded zoom modal.

- **Category**: Documentation & Schematics
- **Import**: `import { DiagramFrame } from "@/components/ui/diagram-frame";`
- **Source**: `src/components/ui/diagram-frame.tsx`
- **Dependencies**: `react`

## Defining Constraint

Encapsulates accessible SVG diagrams inside semantic `<figure>` and `<figcaption>` landmarks with horizontal scroll safety and a focus-trapped expanded zoom Dialog.

## When to Use

- State machines, data-flow pipelines, component hierarchies, and token pipelines drawn as orthogonal SVGs.
- Architecture explanations needing accessible `<figcaption>` semantics and full-width modal expansion.

## When Not to Use (Use Instead)

| Alternative                               | Reason                                               |
| :---------------------------------------- | :--------------------------------------------------- |
| [image](image.md)                         | Use ProgressiveImage for photographic raster assets. |
| [component-preview](component-preview.md) | Use ComponentPreview for interactive UI widgets.     |

## Anatomy

```tsx
<DiagramFrame title="Pipeline Schematic" description="Connects blueprint to verified output.">
  <svg aria-label="Pipeline schematic">...</svg>
</DiagramFrame>
```

## Verified Example

```tsx
import { DiagramFrame } from "@/components/ui/diagram-frame";

export function DiagramFrameExample() {
  return (
    <div className="w-full max-w-lg">
      <DiagramFrame
        title="Spec to Verification Flow"
        description="Shows orthogonal flow from component spec to static verification gate."
      >
        <svg
          aria-label="Spec to verification diagram"
          viewBox="0 0 360 80"
          className="h-auto w-full min-w-[280px]"
        >
          <title>Spec to Verification Flow</title>
          <desc>Connects Component Spec to Verified Markdown and Check Gate.</desc>
          <rect
            x="10"
            y="18"
            width="130"
            height="44"
            rx="8"
            fill="var(--card)"
            stroke="var(--border)"
          />
          <text
            x="75"
            y="44"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="11"
            fontFamily="var(--font-sans)"
          >
            Component Spec
          </text>
          <path d="M 140 40 L 218 40" stroke="var(--primary)" strokeWidth="1.5" />
          <rect
            x="220"
            y="18"
            width="130"
            height="44"
            rx="8"
            fill="var(--card)"
            stroke="var(--primary)"
          />
          <text
            x="285"
            y="44"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="11"
            fontFamily="var(--font-sans)"
          >
            Verified Docs
          </text>
        </svg>
      </DiagramFrame>
    </div>
  );
}
```

## Props Reference

| Prop          | Type              | Required | Description                                                                    |
| :------------ | :---------------- | :------- | :----------------------------------------------------------------------------- |
| `children`    | `React.ReactNode` | Yes      | Accessible SVG schematic content                                               |
| `description` | `string`          | Yes      | Accessible description explaining architecture relationships and data flow     |
| `title`       | `string`          | Yes      | Diagram heading displayed in the chrome bar and modal inspector                |
| `allowZoom`   | `boolean`         | No       | Enable full-width modal zoom dialog for inspecting dense diagrams              |
| `caption`     | `string`          | No       | Optional visible figure caption below the SVG canvas (defaults to description) |

## Accessibility Contract

- Binds `<figure aria-describedby>` and visible `<figcaption>` alongside `<title>` and `<desc>` inside the SVG.
- Expand button opens a focus-trapped Dialog dismissible with Escape.

## Do and Don't

| Do                                                                                             | Don't                                                                             |
| :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Style SVG shapes with semantic CSS variables (var(--card), var(--foreground), var(--primary)). | Wrap DiagramFrame headings with mismatched h3 tags that break page heading order. |
| Keep node count bounded (`3` to `12` nodes) with orthogonal connectors.                        | Draw diagonal crossing wires through overlapping text labels.                     |

## Slots & Pairing

Wraps inline `<svg>` elements using semantic CSS theme tokens.
