# Pagination

> Paged collection controller with compact numeric and worded triggers.

- **Category**: Navigation & Menus
- **Import**: `import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";`
- **Source**: `src/components/ui/pagination.tsx`
- **Dependencies**: `motion`, `react`

## Defining Constraint

Formats numeric page counters with tabular-nums and frames active pages via colour contrast rather than weight shifts so buttons never jitter across pages.

## When to Use

- Stepping through server-backed or large client collections split into deterministic pages.
- Icon galleries, audit log tables, and search result sets.

## When Not to Use (Use Instead)

| Alternative           | Reason                                                                                |
| :-------------------- | :------------------------------------------------------------------------------------ |
| [tabs](tabs.md)       | Use Tabs when switching between named categorical views rather than sequential pages. |
| [stepper](stepper.md) | Use Stepper for selecting numeric input quantities in forms.                          |

## Anatomy

```tsx
<Pagination currentPage={page} totalPages={8} onPageChange={setPage} />
```

## Verified Example

```tsx
import * as React from "react";
import { Pagination } from "@/components/ui/pagination";

export function PaginationExample() {
  const [page, setPage] = React.useState(2);

  return <Pagination currentPage={page} totalPages={6} onPageChange={setPage} />;
}
```

## Props Reference

| Prop               | Type                     | Required | Description                                                                                                                                                                                                   |
| :----------------- | :----------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `buttonVariant`    | `"worded" \| "icon"`     | No       | Display variant for Previous/Next buttons in turnkey mode: - "worded": Displays icon and text label ("Previous" / "Next"). - "icon": Compact square icon-only buttons (size-8) matching numerical page pills. |
| `children`         | `React.ReactNode`        | No       | Configures children on Pagination.                                                                                                                                                                            |
| `currentPage`      | `number`                 | No       | Configures currentPage on Pagination.                                                                                                                                                                         |
| `disabled`         | `boolean`                | No       | Configures disabled on Pagination.                                                                                                                                                                            |
| `iconOnly`         | `boolean`                | No       | Convenience boolean shorthand for variant="icon".                                                                                                                                                             |
| `isActive`         | `boolean`                | No       | Configures isActive on Pagination.                                                                                                                                                                            |
| `label`            | `React.ReactNode`        | No       | Optional custom text label when rendered in worded mode. Defaults to "Previous" or "Next".                                                                                                                    |
| `layoutId`         | `string`                 | No       | Configures layoutId on Pagination.                                                                                                                                                                            |
| `onPageChange`     | `(page: number) => void` | No       | Configures onPageChange on Pagination.                                                                                                                                                                        |
| `showButtonLabels` | `boolean`                | No       | Convenience boolean shorthand: setting false enables icon-only buttons.                                                                                                                                       |
| `totalPages`       | `number`                 | No       | Configures totalPages on Pagination.                                                                                                                                                                          |
| `variant`          | `"worded" \| "icon"`     | No       | Display mode for the button: - "worded": Displays icon and text label (e.g. "< Previous" or "Next >"). - "icon": Compact square icon-only button (size-8) matching numerical page pills.                      |

## Accessibility Contract

- Previous/Next triggers and current active page declare clear accessible labels and aria-current="page".
- Disables Previous on page 1 and Next on final page without layout shift.

## Do and Don't

| Do                                                                                  | Don't                                                                  |
| :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| Display totalPages >= 2 only when collection spans multiple pages.                  | Alter font-weight or border width on the active page indicator button. |
| Synchronise active page resets cleanly when upstream search filters narrow results. | Leave stale out-of-range page numbers highlighted after filtering.     |

## Slots & Pairing

Pairs below Table or icon grid collections inside index-first workbenches.
