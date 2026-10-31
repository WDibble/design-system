## Summary of Changes

Provide a clear, high-level summary of the modifications in this pull request.

## Related Issues

Closes #[issue-number]

## Design Engineering Invariants Checklist

Please verify that your contribution satisfies our core directives:

- [ ] **Physical Yield**: Controls respond with `scale(0.97)` to `0.98` on `pointerdown`.
- [ ] **Zero Layout Shifts**: Dynamic states (`hover`, `focus`, `active`) do not alter dimensional borders, margins, padding, or font weights.
- [ ] **Tabular Numerals**: All numbers, metrics, and data tables declare `tabular-nums`.
- [ ] **Accessibility (WCAG 2.2 AA / AAA)**: All controls pass automated `vitest-axe` checks, have proper ARIA attributes, and support full keyboard navigation.
- [ ] **Quiet Chrome & Anti-Pill Proliferation**: No unnecessary decorative cards or eyebrow pills.
- [ ] **Concentric Radii**: Nested rounded corners calculate $R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$.
- [ ] **Anti-Crush Architecture**: Badges declare `shrink-0 whitespace-nowrap`; primary navigation titles do not truncate.
- [ ] **Reversible Kinetic Affordances**: Animated icons maintain static geometry at rest and glide reversibly.
- [ ] **British English**: All prose, comments, and documentation adhere to British English spelling (`prioritise`, `colour`, `centre`) with zero em dashes.
- [ ] **Test Coverage**: Added or updated automated tests in `tests/components/`.

## Verification Results

- [ ] `npm run invariants` passes
- [ ] `npm run lint` passes
- [ ] `npm run test` passes (54 test files, 117+ tests)
- [ ] `npm run build` compiles with zero errors
