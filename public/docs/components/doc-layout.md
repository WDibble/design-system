# DocLayout

> Three-column reference macrostructure with bounded sidebar, 72ch measure, and scroll-spy TOC.

- **Category**: Documentation & Schematics
- **Import**: `import { DocArticle, DocLayout, DocSidebar, DocToc } from "@/components/ui/doc-layout";`
- **Source**: `src/components/ui/doc-layout.tsx`
- **Dependencies**: `react`

## Defining Constraint

Enforces a 1440px-capped three-column editorial reading layout with zero-shift sidebar active styling, 72ch article measure, Copy Page as Markdown action, and verification TOC.

## When to Use

- Product documentation portals, API reference guides, and internal engineering handbooks.
- Technical manuals combining navigable group sidebars with copyable Markdown exports.

## When Not to Use (Use Instead)

| Alternative                         | Reason                                                                      |
| :---------------------------------- | :-------------------------------------------------------------------------- |
| [navigation-bar](navigation-bar.md) | Use NavigationBar for global top-level application headers above DocLayout. |

## Anatomy

```tsx
<DocLayout>
  <DocSidebar groups={groups} activeId={id} onSelect={setId} />
  <DocArticle markdownSource={md}>
    <section>...</section>
  </DocArticle>
  <DocToc headings={headings} verificationChecks={checks} />
</DocLayout>
```

## Verified Example

```tsx
import * as React from "react";
import { DocArticle, DocLayout, DocSidebar, DocToc } from "@/components/ui/doc-layout";

export function DocLayoutExample() {
  const [section, setSection] = React.useState("overview");

  return (
    <div className="w-full max-w-2xl rounded-xl border border-border/60 bg-background p-4">
      <DocLayout>
        <DocSidebar
          activeId={section}
          onSelect={setSection}
          groups={[
            {
              title: "Guide",
              items: [
                { id: "overview", label: "Overview" },
                { id: "api", label: "Props API" },
              ],
            },
          ]}
        />
        <DocArticle markdownSource="# Overview\nGrounded prose specimen." llmsHref="/llms.txt">
          <div className="text-xs leading-relaxed text-muted-foreground">
            Reading column bounded to 72ch with zero-shift sidebar selection ({section}).
          </div>
        </DocArticle>
        <DocToc
          headings={[{ id: "overview", label: "Overview" }]}
          verificationChecks={[{ label: "Docs check green.", command: "npm run docs:check" }]}
        />
      </DocLayout>
    </div>
  );
}
```

## Props Reference

| Prop                 | Type                    | Required | Description                                                                                 |
| :------------------- | :---------------------- | :------- | :------------------------------------------------------------------------------------------ |
| `activeId`           | `string`                | Yes      | Configures activeId on DocLayout.                                                           |
| `children`           | `React.ReactNode`       | Yes      | Configures children on DocLayout.                                                           |
| `groups`             | `DocNavGroup[]`         | Yes      | Configures groups on DocLayout.                                                             |
| `headings`           | `DocHeadingItem[]`      | Yes      | Section headings shown in the table of contents                                             |
| `onSelect`           | `(id: string) => void`  | Yes      | Configures onSelect on DocLayout.                                                           |
| `header`             | `React.ReactNode`       | No       | Configures header on DocLayout.                                                             |
| `headerSlot`         | `React.ReactNode`       | No       | Optional left-side breadcrumb or navigation action                                          |
| `llmsHref`           | `string`                | No       | Optional relative path to machine-readable llms.txt index                                   |
| `markdownSource`     | `string`                | No       | Raw Markdown representation of the active documentation section for LLM clipboard ingestion |
| `verificationChecks` | `DocVerificationItem[]` | No       | Concrete verification checklist items rendered in the confirmation card                     |

## Accessibility Contract

- Wraps sidebar in `<nav aria-label="Documentation navigation">` with `aria-current="page"` on active item.
- Right rail exposes `<aside aria-label="On this page">` and anchor links cleanly.

## Do and Don't

| Do                                                                                               | Don't                                                              |
| :----------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| Supply `markdownSource` to DocArticle so humans and agents can copy clean Markdown in one click. | Truncate long component titles in DocSidebar links.                |
| Populate DocToc verificationChecks (`It's Working If`) with runnable commands.                   | Change font-weight between active and inactive DocSidebar buttons. |

## Slots & Pairing

Coordinates DocLayout, DocSidebar, DocArticle, and DocToc.
