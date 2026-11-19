# Breadcrumb

> Hierarchical location trail with kinetic directional separators.

- **Category**: Navigation & Menus
- **Import**: `import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";`
- **Source**: `src/components/ui/breadcrumb.tsx`
- **Dependencies**: `react`

## Defining Constraint

Clarifies hierarchy levels cleanly without overflowing horizontal bars, marking the final destination with aria-current="page" instead of a link.

## When to Use

- Deep nested views, component reference pages, or file hierarchy detail screens.
- Orienting users two or more levels below top-level navigation.

## When Not to Use (Use Instead)

| Alternative                         | Reason                                                                  |
| :---------------------------------- | :---------------------------------------------------------------------- |
| [navigation-bar](navigation-bar.md) | Use NavigationBar for global site-wide primary route links.             |
| [tabs](tabs.md)                     | Use Tabs for switching between peer panels at the same hierarchy level. |

## Anatomy

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Primitives</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Verified Example

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#workbench">Workbench</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#docs">Primitives</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Button</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Props Reference

| Prop        | Type              | Required | Description                         |
| :---------- | :---------------- | :------- | :---------------------------------- |
| `asChild`   | `boolean`         | No       | Configures asChild on Breadcrumb.   |
| `separator` | `React.ReactNode` | No       | Configures separator on Breadcrumb. |

## Accessibility Contract

- Wraps items inside semantic <nav aria-label="Breadcrumb"> and <ol> landmark markup.
- Final active leaf uses BreadcrumbPage with aria-current="page" rather than an anchor.

## Do and Don't

| Do                                                                                          | Don't                                                                        |
| :------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------- |
| Keep breadcrumb step titles identical to target page headings.                              | Display a single-level Breadcrumb with only Home on top-level landing pages. |
| Collapse distant middle segments cleanly with BreadcrumbEllipsis when paths exceed 4 steps. | Turn Breadcrumb separators into clickable focusable buttons.                 |

## Slots & Pairing

Composes cleanly in DocArticle headerSlot or page titles above detail tables.
