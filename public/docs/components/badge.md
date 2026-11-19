# Badge

> Shrink-wrapped operational telemetry pill with optional pulse indicator.

- **Category**: Data & Feedback
- **Import**: `import { Badge, badgeVariants } from "@/components/ui/badge";`
- **Source**: `src/components/ui/badge.tsx`
- **Dependencies**: `class-variance-authority`, `react`
- **Variants**: `default`, `secondary`, `destructive`, `outline`, `success`, `warning`
- **Sizes**: `default`, `sm`

## Defining Constraint

Locks shrink-0 whitespace-nowrap operational pills with tabular numerals and optional resting-plateau pulse indicators; banned above titles as decorative eyebrow kickers.

## When to Use

- Operational telemetry (`healthy`, `degraded`, version numbers, active counts, or Required form flags).
- Inline metadata tags pinned cleanly beside card titles or table row states.

## When Not to Use (Use Instead)

| Alternative           | Reason                                                                           |
| :-------------------- | :------------------------------------------------------------------------------- |
| [callout](callout.md) | Use Callout for multi-line rules or section notices rather than oversized pills. |
| [button](button.md)   | Use Button or Toggle when clicking triggers an action.                           |

## Anatomy

```tsx
<Badge variant="success" dot>
  Operational
</Badge>
```

## Verified Example

```tsx
import { Badge } from "@/components/ui/badge";

export function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">v2.0</Badge>
      <Badge variant="success" dot>
        Operational
      </Badge>
      <Badge variant="warning">Threshold</Badge>
      <Badge variant="outline">57 Primitives</Badge>
    </div>
  );
}
```

## Props Reference

| Prop  | Type      | Required | Description              |
| :---- | :-------- | :------- | :----------------------- |
| `dot` | `boolean` | No       | Configures dot on Badge. |

## Accessibility Contract

- Pairs colour intent (`success`, `warning`, `destructive`) with explicit text words.
- Pulse dot carries aria-hidden="true" so screen readers announce status text cleanly.

## Do and Don't

| Do                                                                                        | Don't                                                                              |
| :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| Reserve Badge strictly for live status telemetry, versions, and compact counts.           | Place decorative rounded-full eyebrow kicker pills above page or section headings. |
| Keep title blocks min-w-0 flex-1 alongside Badge clusters so titles never squeeze badges. | Put long multi-word sentences inside a single Badge.                               |

## Slots & Pairing

Accepts variant (default, secondary, destructive, outline, success, warning), size (default, sm), and dot boolean.
