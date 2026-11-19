# Tabs

> Fluid navigation tabs with spring underline indicator and zero geometry shift.

- **Category**: Navigation & Menus
- **Import**: `import { Tabs, TabsContent, TabsIndicator, TabsList } from "@/components/ui/tabs";`
- **Source**: `src/components/ui/tabs.tsx`
- **Dependencies**: `@base-ui/react`, `react`

## Defining Constraint

Glides a spring-physics layout indicator across full-panel navigation triggers while locking label font weight across inactive and active states.

## When to Use

- Switching between distinct multi-control panels (Account, Billing, Telemetry) at the same hierarchy level.
- Organising complex configuration studios without forcing full page navigation.

## When Not to Use (Use Instead)

| Alternative                               | Reason                                                                                   |
| :---------------------------------------- | :--------------------------------------------------------------------------------------- |
| [segmented-control](segmented-control.md) | Use SegmentedControl for compact inline pills or viewport/mode toggles.                  |
| [accordion](accordion.md)                 | Use Accordion when users benefit from expanding multiple vertical sections concurrently. |

## Anatomy

```tsx
<Tabs defaultValue="tokens">
  <TabsList>
    <TabsIndicator />
    <TabsTrigger value="tokens">Tokens</TabsTrigger>
    <TabsTrigger value="motion">Motion</TabsTrigger>
  </TabsList>
  <TabsContent value="tokens">...</TabsContent>
</Tabs>
```

## Verified Example

```tsx
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsExample() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="tokens">
        <TabsList>
          <TabsIndicator />
          <TabsTrigger value="tokens">OKLCH Tokens</TabsTrigger>
          <TabsTrigger value="physics">Spring Physics</TabsTrigger>
        </TabsList>
        <TabsContent value="tokens" className="pt-3 text-xs text-muted-foreground">
          All light and dark pairs satisfy WCAG 2.2 AA and APCA thresholds.
        </TabsContent>
        <TabsContent value="physics" className="pt-3 text-xs text-muted-foreground">
          Controls compress on pointerdown using calibrated spring curves.
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## Props Reference

Inherits standard React HTML or Base UI primitive attributes with zero required custom props.

## Accessibility Contract

- Base UI coordinates role="tablist", role="tab", aria-selected, and arrow-key navigation automatically.
- Every TabsTrigger value must pair with a matching TabsContent value.

## Do and Don't

| Do                                                                                            | Don't                                                                                               |
| :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| Include <TabsIndicator /> inside TabsList for zero-shift animated underline or pill tracking. | Switch active TabsTrigger text from font-medium to font-bold, which causes horizontal width jitter. |
| Keep tab strip concise on one line with 2 to 6 items.                                         | Use Tabs as top-level URL routing instead of NavigationBar.                                         |

## Slots & Pairing

Composes Tabs, TabsList, TabsIndicator, TabsTrigger, and TabsContent.
