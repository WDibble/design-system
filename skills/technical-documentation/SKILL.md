---
name: technical-documentation
description: Use when authoring, editing, or auditing technical docs, READMEs, ADRs, changelogs, and API guides. Enforces concept grounding, active prose, and drift gates.
license: MIT
metadata:
  author: William Dibble
  version: "1.0.0"
  tags: [documentation, technical-writing, adr, readme, changelog]
---

# Technical Documentation & Agent Index Standard

High-craft documentation respects the reader's time by separating learning lessons from task steps, API specifications, and architectural reasoning. Every page earns its length through verified commands, grounded concepts, and exact alignment with live source code.

---

## Purpose

Govern the structure, voice, verification, and freshness of both human-facing markdown documentation (`README.md`, `docs/`, ADRs, changelogs, JSDoc comments) and machine-readable agent indexes (`AGENTS.md`, `SKILL.md`, `public/llms.txt`, `public/llms-full.txt`).

---

## Prerequisites

- **Source truth**: Direct access to `package.json`, git history (`git log`, `git merge-base`), and target source symbols before writing or updating any claim.
- **Verification commands**: Active workspace scripts (`npm run invariants`, `npm run spellcheck`, `npm run check`) to confirm script names, relative links, and spelling rules resolve cleanly.

---

## Instructions

Follow this sequence whenever authoring, editing, or auditing documentation:

1. **Use the Four-Quadrant Documentation Compass**: Classify the page strictly as a `Tutorial`, `How-To`, `Reference`, or `Explanation`, keeping one job per file. Read [references/doc-quadrants-and-templates.md](references/doc-quadrants-and-templates.md) when scaffolding a new component page, README, ADR, or release changelog.
2. **Keep every concept grounded**: Set walk-in prerequisites up front, then introduce each new concept together with its term before any later paragraph or snippet depends on it.
3. **Pass the opening Defining Constraint rule**: Lead with a one-sentence job summary followed immediately by the single architectural constraint that makes the component or system behave differently from a naive default.
4. **Set active prose and bounded snippets**: Write short sentences (`<= 20` words target), apply active-voice and second-read checks, keep code blocks under `80` columns and `25` lines with authentic values, and run examples in a clean shell.
5. **Run drift, reader, and invariant gates**: Read [references/agent-ready-and-drift-gates.md](references/agent-ready-and-drift-gates.md) when syncing `public/llms.txt`, checking git ancestry drift, or running cold sub-agent reader tests; fix every failing script reference or dead link before finishing.

---

## 🧭 The Four-Quadrant Documentation Compass

Classify every page by reader goal and strictly exclude material belonging to adjacent quadrants:

| Quadrant        | Reader State               | Core Content & Voice                                                      | Strictly Excludes                                                     |
| :-------------- | :------------------------- | :------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| **Tutorial**    | Learning through action    | Guided lesson (`we`), reliable runnable steps, zero unguarded traps       | Architecture trade-offs, full option tables, alternate configurations |
| **How-To**      | Working mid-task           | Terse imperative steps (`you`), concrete preconditions, copyable commands | Concept introductions, basic background explanations                  |
| **Reference**   | Checking exact contracts   | Neutral, exhaustive signature, prop table, default values, error shapes   | Step-by-step walkthroughs, persuasive rationale, opinions             |
| **Explanation** | Seeking deep understanding | Design rationale, constraints, ADRs, rejected alternatives, diagrams      | Step lists, exhaustive CLI flag listings, install snippets            |

---

## 🧱 Concept Grounding, Load Budgets & Defining Constraints

### 1. Concept Grounding

Every concept inside a page must be either a **walk-in prerequisite** (declared cleanly in `## Prerequisites`) or **explicitly grounded** (idea and term introduced together) before a later paragraph or code snippet leans on it. Never use an unintroduced term as load-bearing shorthand in a later section.

### 2. The Defining Constraint

State the system's core job in one plain sentence, followed immediately by its **defining constraint** as natural prose rather than a labelled aside (_"The defining constraint:"_). Example: _"Button locks its grid cell footprint across async states so sibling controls never shift horizontally during loading or confirmation."_

### 3. Context Load, Cognitive Load & Leading Words

- **Context Load** (tokens spent on every turn inside always-loaded files like `AGENTS.md` and skill frontmatter): Front-load the leading verb in context pointers, keep one trigger per distinct branch, delete instructions the model already obeys by default (no-ops), and never duplicate facts easily inspected from `package.json`.
- **Cognitive Load** (what humans must hold in mind): Put branches and multi-way options in tables or bullet lists, never buried inside prose paragraphs.
- **Leading Words**: Reuse shared domain terms verbatim across code comments, skills, and docs (_quiet chrome_, _concentric radius_, _kinetic yield_, _compositor purity_, _swap test_).

---

## ✍️ Prose Hygiene, Code Snippet Discipline & Banned AI Tells

### Mechanical Prose Audits

- **The "By Monkeys" Active-Voice Test**: Mentally insert _"by monkeys"_ right after any verb phrase (_"The dialog is rendered by monkeys"_). If it parses, rewrite in active voice naming the real actor or addressing `you`.
- **The Second-Read Speech Test**: Read every paragraph aloud at normal speech pace. Whenever your eye has to re-read to unpack a noun stack or trace a pronoun across two sentences, split the thought (`2 to 4` sentences per paragraph max) and name subject, action, and consequence.

### Six Banned AI Prose Tells

1. **Summary Transitions**: Never open a paragraph by recapping the preceding one (_"With this setup complete..."_, _"Now that we have explored..."_). Move directly into the next point.
2. **Stop-Start Fragments**: Never fracture one dependent clause into three breathless micro-sentences (_"Previously this was slow. Now it uses springs. This improves feel."_). Join clear clauses cleanly.
3. **Spec-Sheet Voice**: Replace passive feature narration (_"provides support for"_, _"is configurable via"_, _"is explicitly labelled"_) with direct usage or exact mechanism.
4. **Cold-Open Body Paragraphs**: Connect each body paragraph cleanly to its predecessor instead of writing orphan sentences that read like standalone subheadings.
5. **Personified Artefacts**: Software validates, rejects, stores, and renders; it never _"hands the browser"_, _"thinks"_, _"understands"_, or _"tries"_.
6. **Pressure & Weasel Words**: Ban `easy`, `simple`, `simply`, `quick`, `just`, `obviously`, `significantly`, `often`, `near-zero`, and `most requests`. State exact command counts or verified figures (`57 primitives`, `0 errors`).

### Code Snippet Discipline

- Attach explicit language tags (`tsx`, `ts`, `css`, `bash`) to every fenced block.
- Keep snippets `<= 80` columns wide and `<= 25` lines tall; split longer workflows with brief explanatory prose before each block.
- Use descriptive `snake_case` placeholders (`your_token_here`, never `<TOKEN>`, `xxx`, `foo`, or `bar`), and explain non-obvious error handling as `message -> cause -> fix`.

---

## 🧪 Cold Sub-Agent Reader Testing & Git Drift Verification

### 1. Fresh Reader Testing

Before finalising foundational guides or skills, test comprehension using a zero-context sub-agent given **only** the drafted document and `5 to 10` concrete questions (such as _What does this do?_, _When would I avoid it?_, _How do I verify it worked?_, _What error occurs if a constraint fails?_). Any point where the cold reader guesses, misreads scope, or misses a constraint reveals an ungrounded concept that needs fixing.

### 2. Git Merge-Base Drift Check

Never judge freshness by prose tone. Verify commit ancestry between implementation files and documentation:

```bash
code_sha=$(git log -1 --format=%H -- src/components/ui/button.tsx)
doc_sha=$(git log -1 --format=%H -- docs/architecture.md)
if [ "$code_sha" = "$doc_sha" ]; then
  echo "current: changed together"
elif git merge-base --is-ancestor "$doc_sha" "$code_sha"; then
  echo "stale: implementation changed after documentation"
elif git merge-base --is-ancestor "$code_sha" "$doc_sha"; then
  echo "current: documentation updated after implementation"
else
  echo "unknown: divergent history or shallow clone"
fi
```

---

## Examples

Transform passive, tell-heavy documentation into grounded, active engineering copy with explicit error validation:

```tsx
// Before (passive voice, personified artefact, ungrounded constraint, speculative adjectives):
// "This robust helper seamlessly unlocks theme loading and hands the CSS variables
//  to the document quickly. Simply pass any JSON object."

/**
 * Validates and applies an external OKLCH theme payload to `:root` and `.dark`.
 * Throws an Error naming invalid keys before any DOM stylesheet mutation occurs.
 */
export function loadThemePayload(rawInput: unknown, parse: (v: unknown) => Record<string, string>) {
  if (typeof rawInput !== "object" || rawInput === null) {
    throw new Error("Invalid theme payload: expected a non-null JSON object.");
  }
  const tokens = parse(rawInput);
  for (const [token, value] of Object.entries(tokens)) {
    document.documentElement.style.setProperty(`--${token}`, value);
  }
}
```

---

## Limitations

- **Version history depth**: Git ancestry checks require un-squashed commit history on both source and doc paths; shallow clones return `unknown` and require manual symbol auditing.
- **Clean-shell execution**: Automated static checks verify relative links and `package.json` scripts, but verifying copy-pasteable install or build snippets still requires running them in a clean workspace shell.

---

## Troubleshooting

| Symptom                                                             | Cause                                                                                     | Solution                                                                                                                  |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Documentation gives contradictory guidance after a refactor         | Prose edited without checking implementation history or removing stale sections           | Run the `git merge-base` drift check against changed `src/` paths and delete superseded claims cleanly                    |
| `npm run invariants` fails with a dead link or unknown script error | Markdown links resolved relative to repo root instead of file folder, or a renamed script | Fix relative link depth (`../src/...`) or wrap repo paths in inline code backticks; sync script names with `package.json` |
| Cold reader agent misapplies a rule to the wrong component          | Abstract concept used before grounding, or sibling boundary omitted                       | Ground the concept on first mention and add an explicit sibling disambiguation line under `When to reach for it`          |
| Tutorial mixes architecture rationale with installation steps       | Page mixes Explanation and Reference inside a single How-To flow                          | Split rationale into `docs/` ADRs or Explanation files and link them cleanly from the How-To header                       |
