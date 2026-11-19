# Documentation Quadrants & Turnkey Page Templates

Choose one documentation quadrant per file based on what the reader is trying to accomplish, then populate the corresponding skeleton directly.

---

## 1. Component & Skill Page Spine

Use this frame for human-facing documentation pages describing components, utilities, or agent skills:

```markdown
## What it does

<One sentence stating the module's exact job.>
<One plain sentence stating the defining constraint that separates it from a naive default.>

## When to reach for it

- **Usage mode**: State how callers import it (`@/...`) or trigger the workflow.
- **Trigger boundary**: Reach for this when `<condition>`. For `<adjacent_case>` instead, use `<sibling_name>`.

## Prerequisites

<Optional: delete heading if no setup, package, or context exists beforehand.>

## <One to three core mechanism sections>

- Surface the system's leading words (`quiet chrome`, `kinetic yield`, `tabular-nums`) consistently.
- Put every multi-way choice into a 2-column table (`Condition` | `Action`), never prose.

## Common questions

- **<Real observed question from issues or commits>**
  Direct, source-verified answer without padding. Omit section if none exist.

## It's working if

- <Signal the reader can verify in their rendered UI or terminal without inspecting internal code.>

## Where it fits

- **Role**: Composition layer (`base-ui` wrapper, surface token, motion preset, or page utility).
- **Neighbours**: One or two directly adjacent primitives paired with why callers connect them.
```

---

## 2. Architecture Decision Record (ADR) Template

Store architecture decisions chronologically in `docs/decisions/` (matching any pre-existing numbering pattern first). An ADR captures **why** a constraint exists, which alternatives were rejected, and what downstream costs follow. Never delete historical ADRs; mark outdated records as superseded by a newer ADR.

**Lifecycle**: `PROPOSED -> ACCEPTED -> (SUPERSEDED or DEPRECATED)`

```markdown
# ADR-NNN: <Concrete Decision Title>

## Status

Proposed | Accepted | Superseded by ADR-XXX | Deprecated

## Date

YYYY-MM-DD

## Context

State the engineering constraint, browser limitation, or design system invariant forcing a decision:

- Constraint one with measurable impact
- Constraint two with user or accessibility requirement

## Decision

State the chosen architecture or API contract directly in active voice.

## Alternatives Considered

### <Alternative A>

- **Pros**: Concrete strengths
- **Cons**: Measured trade-offs or invariant violations
- **Rejected**: Single crisp reason naming the violated constraint

### <Alternative B>

- **Pros**: Concrete strengths
- **Cons**: Measured trade-offs
- **Rejected**: Single crisp reason

## Consequences

- Downstream requirement for callers, tests, and tooling
- Explicit cost or limitation accepted by this choice
```

---

## 3. Repository `README.md` Spine (15-Second Evaluation Test)

A first-time visitor opens `README.md` asking whether the project solves their problem in fifteen seconds. Keep contributor build pipelines, lint hooks, and agent rules inside `CONTRIBUTING.md` or `AGENTS.md`, leaving at most a short link list at the foot.

### Repository Archetype Spine

1. **Header & Anchor Statement**: Project title, single-line definition stating concrete stack and capability, and a real production screenshot (`width="100%"`, descriptive `alt` text).
2. **Core Philosophy or Capabilities**: Explain what differentiates the architecture cleanly before dumping package install tables, pairing authentic visuals (`theme-studio.png`, `icon-gallery.png`) where UI surfaces matter.
3. **API / Primitive Inventory**: Categorised reference table linking paths on disk with one-line behavioural descriptions.
4. **Quick Start & Integration (Terminal / Copy-Paste)**: Fastest copy-paste command block that runs the demo locally (`npm install`, `npm run dev`, `npm run check`) and integrates primitives cleanly. Ensure every snippet executes as pasted with real values (zero `foo` or `<TOKEN>` stubs).
5. **Architectural Index & Licence**: One-line pointers to deep docs (`docs/philosophy.md`, `docs/architecture.md`, `CONTRIBUTING.md`, `AGENTS.md`) and bare licence statement.

### Pre-Publish `README.md` Audit Checklist

- [ ] Zero unresolved `TODO`, `{{placeholder}}`, or stale local demo links.
- [ ] Zero em dashes (`\u2014`) or double-hyphen prose dashes (`--`).
- [ ] Visual proof screenshots come from live browser captures rather than mock HTML chrome.
- [ ] Headings use crisp phrasing; copy passes British English (`cspell`) validation cleanly.

---

## 4. User-Facing Changelog & Fact-Preserving Prose Review

### Generating User-Facing Release Notes

Inspect git commit ranges cleanly while stripping internal test, lint, and chore churn:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added

- **Component or Feature**: Plain description of user-facing capability and public API (`#PR`).

### Changed

- **Modified Behaviour**: Exact change in defaults, tokens, or constraints and migration step if breaking.

### Fixed

- **Resolved Defect**: User-visible symptom resolved alongside root cause summary.
```

- **Append-Only Rule**: When adding clarification to an older changelog entry, append a dated note rather than rewriting or collapsing historical entries.

### Fact-Preserving Prose Review Protocol

When tightening or copy-editing technical documentation:

1. **Lock Load-Bearing Facts**: Before deleting a single word, list every symbol name, file path, CLI script, CSS token, unit (`ms`, `px`, `OKLCH Lc`), caveat, and uncertainty statement that must survive unchanged.
2. **Strip Slop Without Fabricating Strength**: Cut filler adjectives (_seamless, effortless, intuitive_) and summary openers, but **never** turn a hedged constraint (_"may clip on non-P3 screens"_) into an unverified absolute guarantee.
3. **Diff Against Source**: Re-verify edited commands, types, and qualifiers directly against the implementation file before marking edits done.
