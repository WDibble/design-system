# Card

> Concentric container surface with specular rim lighting and inner card nesting.

- **Category**: Data & Feedback
- **Import**: `import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";`
- **Source**: `src/components/ui/card.tsx`
- **Dependencies**: `react`

## Defining Constraint

Enforces mathematical concentric corner continuity via CardInner inside Card alongside subtle 1px specular rim lighting; avoid defaulting every layout to 3-card grids.

## When to Use

- Bounded workspace modules, detail inspectors, or distinct nested settings panels.
- Bento showcase items pairing CardHeader chrome with concentric CardInner nesting.

## When Not to Use (Use Instead)

| Alternative           | Reason                                                                            |
| :-------------------- | :-------------------------------------------------------------------------------- |
| [table](table.md)     | Use Table or ruled divide-y lists when presenting repetitive comparable entities. |
| [callout](callout.md) | Use Callout for semantic notices, warnings, and constraints.                      |

## Anatomy

```tsx
<Card>
  <CardHeader>
    <CardTitle>Cluster Node</CardTitle>
    <CardDescription>Edge configuration status.</CardDescription>
  </CardHeader>
  <CardContent>
    <CardInner>Inner concentric container</CardInner>
  </CardContent>
</Card>
```

## Verified Example

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardInner,
  CardTitle,
} from "@/components/ui/card";

export function CardExample() {
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Concentric Container</CardTitle>
          <CardDescription>Inner surface radius calibrated for smooth visual flow.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardInner>
            <div className="text-xs text-muted-foreground">
              R_inner equals outer radius minus container padding.
            </div>
          </CardInner>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Props Reference

| Prop       | Type      | Required | Description                  |
| :--------- | :-------- | :------- | :--------------------------- |
| `specular` | `boolean` | No       | Configures specular on Card. |

## Accessibility Contract

- Preserve heading hierarchy by choosing valid heading levels around CardTitle (h3).
- Keep container query @container layout resilient down to 340px column width.

## Do and Don't

| Do                                                                                                 | Don't                                                                  |
| :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| Use CardInner for nested sub-surfaces so inner radius honours R_inner = max(0, R_outer - Padding). | Wrap every feature or metric inside reflexive 3-column bordered cards. |
| Keep header badge clusters shrink-0 beside min-w-0 flex-1 titles.                                  | Drop CardHeader padding arbitrarily when composing with CardContent.   |

## Slots & Pairing

Composes Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, and CardInner.
