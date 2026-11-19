# Skeleton

> Zero-CLS dimensionally stable loading placeholder surface.

- **Category**: Data & Feedback
- **Import**: `import { Skeleton } from "@/components/ui/skeleton";`
- **Source**: `src/components/ui/skeleton.tsx`
- **Dependencies**: `react`

## Defining Constraint

Mirrors the exact target component geometry before hydration or async data resolves to maintain zero Cumulative Layout Shift (CLS).

## When to Use

- Initial loading states matching exact card, text row, or avatar proportions.
- Async route transitions needing zero-CLS placeholders until streamed data arrives.

## When Not to Use (Use Instead)

| Alternative             | Reason                                                                              |
| :---------------------- | :---------------------------------------------------------------------------------- |
| [progress](progress.md) | Use Progress when exact completion percentage of a known operation can be reported. |

## Anatomy

```tsx
<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>
```

## Verified Example

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonExample() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-36" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}
```

## Props Reference

| Prop      | Type      | Required | Description                                                         |
| :-------- | :-------- | :------- | :------------------------------------------------------------------ |
| `shimmer` | `boolean` | No       | Optional specular highlight across the shimmering skeleton surface. |

## Accessibility Contract

- Declares subtle loading semantics without flooding screen readers with redundant repetitive alerts.
- Honours prefers-reduced-motion automatically.

## Do and Don't

| Do                                                            | Don't                                                                           |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------ |
| Match skeleton dimensions identically to loaded UI baselines. | Render vague pulsing rectangles that fail to resemble final text/avatar rhythm. |
| Replace skeletons cleanly without shifting adjacent controls. | Show Skeleton indicators for synchronous local computations.                    |

## Slots & Pairing

Sizes via utility classes matching Avatar, Badge, and text line-heights (`h-4`, `size-10`).
