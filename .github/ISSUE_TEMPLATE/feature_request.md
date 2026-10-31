---
name: Feature Request
about: Suggest a new primitive, kinetic icon, or enhancement
title: "[FEATURE] "
labels: ["enhancement"]
assignees: ""
---

## Feature Proposal

A concise description of what you are proposing.

## Problem Statement

What user need, accessibility requirement, or architectural gap does this address?

## Proposed API / Solution

Describe how you envision using this component or token:

```tsx
import { ProposedPrimitive } from "@/components/ui/proposed-primitive";

export function Example() {
  return <ProposedPrimitive variant="default">Content</ProposedPrimitive>;
}
```

## Invariants Checklist

- [ ] Complies with WCAG 2.2 AA / AAA accessibility standards
- [ ] Guarantees 0px layout shift across dynamic states (`hover`, `focus`, `active`)
- [ ] Adheres to concentric corner radii mathematics ($R_{\text{inner}} = R_{\text{outer}} - P$)
- [ ] Satisfies Dual-Engine Contrast (WCAG 2.2 AA + WCAG 3 APCA)
- [ ] Uses British English for documentation and prop naming
