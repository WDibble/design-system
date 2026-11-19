# NavigationBar

> Responsive top navigation rail with mega menus, columns, and bounded overflow harvesting.

- **Category**: Navigation & Menus
- **Import**: `import { NavActions, NavBrand, NavColumnsMenu, NavItem } from "@/components/ui/navigation-bar";`
- **Source**: `src/components/ui/navigation-bar/index.ts`
- **Dependencies**: `motion`, `react`

## Defining Constraint

Prevents header text truncation and crowding using container queries, minimum 220px submenu columns, explicit popover width bases, and automatic overflow harvesting.

## When to Use

- Global top application headers combining branding, mega-menu flyouts, direct route links, and utility actions.
- Responsive headers transitioning smoothly to a Sheet navigation drawer on narrow mobile screens.

## When Not to Use (Use Instead)

| Alternative                 | Reason                                                                          |
| :-------------------------- | :------------------------------------------------------------------------------ |
| [toolbar](toolbar.md)       | Use Toolbar for scoped editor or canvas tool buttons.                           |
| [doc-layout](doc-layout.md) | Use DocSidebar inside DocLayout for multi-section vertical documentation trees. |

## Anatomy

```tsx
<NavigationBar
  brand={<span>Design System</span>}
  items={navItems}
  maxVisibleItems={4}
  actions={<ThemeToggle isDark={isDark} onToggleDark={setIsDark} />}
/>
```

## Verified Example

```tsx
import { LayersIcon, ShieldCheckIcon } from "@/components/icons";
import { NavigationBar, type NavItemConfig } from "@/components/ui/navigation-bar";

const SAMPLE_NAV_ITEMS: NavItemConfig[] = [
  {
    label: "Platform",
    type: "simple",
    links: [
      {
        title: "UI Primitives",
        description: "57 accessible components",
        href: "#primitives",
        icon: <LayersIcon size={16} />,
      },
      {
        title: "Compiler Invariants",
        description: "18 static checks",
        href: "#invariants",
        icon: <ShieldCheckIcon size={16} />,
      },
    ],
  },
  { label: "Documentation", href: "#docs" },
  { label: "Tokens", href: "#tokens" },
];

export function NavigationBarExample() {
  return (
    <div className="w-full max-w-xl">
      <NavigationBar
        brand={<span className="text-sm font-semibold text-foreground">Design Standard</span>}
        items={SAMPLE_NAV_ITEMS}
        maxVisibleItems={3}
      />
    </div>
  );
}
```

## Props Reference

| Prop                 | Type                           | Required | Description                                                                                                                                                               |
| :------------------- | :----------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                 | `string`                       | Yes      | Configures id on NavigationBar.                                                                                                                                           |
| `label`              | `string`                       | Yes      | Configures label on NavigationBar.                                                                                                                                        |
| `title`              | `string`                       | Yes      | Configures title on NavigationBar.                                                                                                                                        |
| `actions`            | `React.ReactNode`              | No       | Configures actions on NavigationBar.                                                                                                                                      |
| `align`              | `"start" \| "center" \| "end"` | No       | Configures align on NavigationBar.                                                                                                                                        |
| `badge`              | `string`                       | No       | Configures badge on NavigationBar.                                                                                                                                        |
| `brand`              | `React.ReactNode`              | No       | Configures brand on NavigationBar.                                                                                                                                        |
| `children`           | `React.ReactNode`              | No       | Configures children on NavigationBar.                                                                                                                                     |
| `className`          | `string`                       | No       | Configures className on NavigationBar.                                                                                                                                    |
| `columns`            | `NavMenuColumn[]`              | No       | Configures columns on NavigationBar.                                                                                                                                      |
| `containerClassName` | `string`                       | No       | Configures containerClassName on NavigationBar.                                                                                                                           |
| `description`        | `string`                       | No       | Configures description on NavigationBar.                                                                                                                                  |
| `featured`           | `NavMegaFeatured`              | No       | Configures featured on NavigationBar.                                                                                                                                     |
| `icon`               | `React.ReactNode`              | No       | Configures icon on NavigationBar.                                                                                                                                         |
| `isActive`           | `boolean`                      | No       | Configures isActive on NavigationBar.                                                                                                                                     |
| `isExternal`         | `boolean`                      | No       | Configures isExternal on NavigationBar.                                                                                                                                   |
| `items`              | `NavItemConfig[]`              | No       | Configures items on NavigationBar.                                                                                                                                        |
| `links`              | `NavMenuLinkItem[]`            | No       | Configures links on NavigationBar.                                                                                                                                        |
| `maxVisibleItems`    | `number`                       | No       | Maximum number of items rendered directly on desktop before folding into "More ▾". Guarantees zero clashing with actions on the right regardless of how many items exist. |
| `mobileBrand`        | `React.ReactNode`              | No       | Configures mobileBrand on NavigationBar.                                                                                                                                  |
| `mobileFooter`       | `React.ReactNode`              | No       | Configures mobileFooter on NavigationBar.                                                                                                                                 |
| `moreBadge`          | `string`                       | No       | Custom badge for the synthesized overflow dropdown trigger.                                                                                                               |
| `moreLabel`          | `string`                       | No       | Custom label for the synthesized overflow dropdown trigger.                                                                                                               |
| `sticky`             | `boolean`                      | No       | Configures sticky on NavigationBar.                                                                                                                                       |

## Accessibility Contract

- Wraps desktop links in <nav> and supports full keyboard Escape/Tab dismissal on mega menus.
- Mobile Sheet trigger button declares explicit aria-label and traps drawer focus cleanly.

## Do and Don't

| Do                                                                                      | Don't                                                                                         |
| :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| Set maxVisibleItems (default 4 to 5) so excess top items automatically fold into More.  | Apply truncate or overflow-hidden to primary NavigationBar item labels.                       |
| Declare explicit width basis on custom flyouts to prevent absolute auto-width collapse. | Stuff search fields, 6 buttons, and 8 links into a narrow sticky bar without maxVisibleItems. |

## Slots & Pairing

Accepts brand, structured NavItemConfig[] arrays (simple, columns, mega, direct link), and trailing actions slots.
