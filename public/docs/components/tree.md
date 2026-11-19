# Tree

> Hierarchical file and folder tree with spring expand/collapse motion.

- **Category**: Data & Feedback
- **Import**: `import { Tree } from "@/components/ui/tree";`
- **Source**: `src/components/ui/tree.tsx`
- **Dependencies**: `react`

## Defining Constraint

Renders recursive hierarchical file and symbol trees with spring branch expansion, explicit ARIA treeitem levels, and full arrow-key navigation.

## When to Use

- File explorers, design token hierarchy browsers, and nested symbol directories.
- Expandable directory structures navigable with keyboard arrow keys.

## When Not to Use (Use Instead)

| Alternative                 | Reason                                              |
| :-------------------------- | :-------------------------------------------------- |
| [accordion](accordion.md)   | Use Accordion for flat one-level disclosure panels. |
| [breadcrumb](breadcrumb.md) | Use Breadcrumb for linear active path breadcrumbs.  |

## Anatomy

```tsx
<Tree data={nodes} defaultExpandedIds={["src"]} onSelectNode={handleSelect} />
```

## Verified Example

```tsx
import { Tree, type TreeNodeData } from "@/components/ui/tree";

const SAMPLE_TREE_NODES: TreeNodeData[] = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "ui", label: "components/ui (57)" },
      { id: "docs", label: "docs/specs" },
    ],
  },
  { id: "registry", label: "public/registry.json" },
];

export function TreeExample() {
  return (
    <div className="w-full max-w-xs">
      <Tree data={SAMPLE_TREE_NODES} defaultExpandedIds={["src"]} />
    </div>
  );
}
```

## Props Reference

| Prop                 | Type                           | Required | Description                            |
| :------------------- | :----------------------------- | :------- | :------------------------------------- |
| `data`               | `TreeNodeData[]`               | Yes      | Configures data on Tree.               |
| `defaultExpandedIds` | `string[]`                     | No       | Configures defaultExpandedIds on Tree. |
| `onSelect`           | `(node: TreeNodeData) => void` | No       | Configures onSelect on Tree.           |
| `selectedId`         | `string`                       | No       | Configures selectedId on Tree.         |

## Accessibility Contract

- Implements WAI-ARIA role="tree" and role="treeitem" with aria-expanded and aria-level attributes.
- Supports Arrow Up/Down/Left/Right keyboard node navigation.

## Do and Don't

| Do                                                                                             | Don't                                                               |
| :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| Pass stable unique id strings on every TreeNodeData item.                                      | Reconstruct fresh random node IDs on every render cycle.            |
| Pre-expand critical first-level root folders via defaultExpandedIds for immediate orientation. | Deep-nest interactive controls recursively inside Tree node labels. |

## Slots & Pairing

Accepts TreeNodeData[] hierarchies with optional selection and expansion handlers.
