# Accordion

> Accessible vertical disclosure stack with smooth CSS height reveal.

- **Category**: Data & Feedback
- **Import**: `import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "@/components/ui/accordion";`
- **Source**: `src/components/ui/accordion.tsx`
- **Dependencies**: `@base-ui/react`, `lucide-react`, `react`

## Defining Constraint

Expands and collapses vertical disclosure panels smoothly via CSS height transitions under Base UI ARIA keyboard controls.

## When to Use

- FAQs, collapsible inspector subsections, or compact mobile configuration groups.
- Progressive disclosure blocks allowing multiple peer panels open simultaneously.

## When Not to Use (Use Instead)

| Alternative     | Reason                                                              |
| :-------------- | :------------------------------------------------------------------ |
| [tabs](tabs.md) | Use Tabs when switching horizontally across parallel content views. |

## Anatomy

```tsx
<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Quiet Chrome</AccordionTrigger>
    <AccordionContent>Typography and whitespace replace card noise.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Verified Example

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion defaultValue={["q1"]}>
        <AccordionItem value="q1">
          <AccordionTrigger>What prevents button flicker during async loading?</AccordionTrigger>
          <AccordionContent>
            An invisible ghost footprint sizer locks horizontal bounds across idle and loading
            states.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>Why interpolate gradients in OKLCH?</AccordionTrigger>
          <AccordionContent>
            Perceptual colour ramps maintain consistent lightness without sRGB grey midpoints.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

## Props Reference

Inherits standard React HTML or Base UI primitive attributes with zero required custom props.

## Accessibility Contract

- Trigger manages aria-expanded and links aria-controls to AccordionContent automatically.
- Arrow Up/Down and Home/End navigate cleanly across AccordionItem headers.

## Do and Don't

| Do                                                                                 | Don't                                                                                                 |
| :--------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| Provide unique string value keys on every AccordionItem.                           | Place full primary forms inside deeply nested accordions where validation errors hide when collapsed. |
| Use AccordionHeader inside custom item compositions to preserve heading structure. | Trigger abrupt layout height changes with custom display:none overrides on AccordionContent.          |

## Slots & Pairing

Composes Accordion, AccordionItem, AccordionHeader, AccordionTrigger, and AccordionContent.
