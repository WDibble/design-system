# Agent-Readable Documentation & Automated Drift Gates

Human readers navigate with sidebars, typography, and search UI. Autonomous coding agents read stripped text streams and raw markdown endpoints, relying on predictable index maps and strict repository alignment.

---

## 1. Machine-Readable Documentation Surfaces

Maintain the repository's three core agent-discovery artefacts whenever primitives, tokens, scripts, or skills change:

- `public/llms.txt`: Compact table of contents listing H1 title, a blockquote summary, and H2 categorised lists (`- [Title](url): one-line description`) kept comfortably under `50,000` characters.
- `public/llms-full.txt`: Single-file technical reference containing core design invariants, OKLCH colour math, spring physics constants, and usage snippets.
- `public/registry.json`: Structured JSON manifest mapping every UI primitive's export name, file path, variant props, and runtime dependencies.

### Index Discovery & Markdown Parity

- **Top-of-File Orientation**: Open standalone documentation specs with a clear context pointer naming the master index (`public/llms.txt` or `AGENTS.md`) so an agent landing directly on a single page knows where sibling references live without guessing URLs.
- **Zero Chrome Stripping Surprise**: Never rely exclusively on visual navigation chrome or CSS tabs to disclose critical rules; keep canonical contracts directly inside markdown sections with clean fenced code blocks (`\`\`\`tsx`).
- **Truth Over Completion**: Only list real public URLs, exported symbols, and existing scripts. Never fabricate endpoints, metrics, or CLI flags to satisfy checklist length.

---

## 2. Agent Instruction File Discipline (`AGENTS.md` & `SKILL.md`)

Always-loaded instruction files consume context tokens and attention on every turn. Apply two ruthless tests before keeping any rule:

1. **The Dead-Weight Test**: _"Would removing this rule cause the agent to make an observed mistake in this codebase?"_ If not, remove the line. Unnecessary instructions dilute compliance with critical invariants.
2. **The Harmful-Precision Test**: _"Is this rigid prohibition wrong on 1 in 10 plausible tasks?"_ If an absolute ban breaks valid edge cases without explicit exception routing, rewrite it to state the target outcome instead (_"match comment rationale density to why decisions were made"_ rather than _"never write inline comments"_). Keep hard absolutes strictly for safety boundaries, layout stability (`border-transparent`, zero shift), accessibility (`aria-label`), and verified failure modes.

### Progressive Disclosure Placement

| Material Characteristic                                    | Correct Location                      | Rationale                                                       |
| :--------------------------------------------------------- | :------------------------------------ | :-------------------------------------------------------------- |
| Universal repo rule required on every task                 | Root `AGENTS.md`                      | Must load unconditionally in every session                      |
| Trigger condition & core domain invariants (`<= 14 KB`)    | `skills/<name>/SKILL.md`              | Loads on demand when the task domain activates                  |
| Deep variant tables, 20-row checklists, extended templates | `skills/<name>/references/<topic>.md` | Loaded selectively one level deep without inflating skill reads |
| Build script flags & dependency versions                   | `package.json`                        | Single source of truth already inspectable via one shell check  |

---

## 3. Automated Documentation Drift Verification

Static prose becomes stale silently when source code refactors outpace markdown edits. Enforce drift prevention as deterministic build checks:

### Commit Ancestry Comparison (`git merge-base`)

Check commit order before declaring documentation current:

```bash
code_sha=$(git log -1 --format=%H -- src/components/ui/stepper.tsx)
doc_sha=$(git log -1 --format=%H -- public/llms-full.txt)
if [ "$code_sha" = "$doc_sha" ]; then
  echo "current: changed in same commit"
elif git merge-base --is-ancestor "$doc_sha" "$code_sha"; then
  echo "stale: component updated after docs"
elif git merge-base --is-ancestor "$code_sha" "$doc_sha"; then
  echo "current: docs updated after component"
else
  echo "unknown: branches diverged or shallow history"
fi
```

### Continuous Invariant Checks (`scripts/verify-invariants.mjs`)

Wire machine-checkable doc integrity directly into `npm run invariants`:

1. **Script Parity**: Every `npm run <script>` referenced in `README.md`, `AGENTS.md`, `docs/`, or `skills/` must exist as a real key inside `package.json`.
2. **Relative Link Resolution**: Every relative Markdown link outside fenced code blocks must resolve to an existing file or directory relative to the containing `.md` file's folder (`../src/index.css` from `docs/`, never bare `src/index.css`).
3. **Typography & Spelling Parity**: Reject prohibited Unicode em dashes (`\u2014`) and enforce British English vocabulary via `npm run spellcheck` (`cspell`).
4. **Cross-Harness Token Hygiene**: Never embed `$` followed immediately by a digit inside `skills/**/*.md`, preventing command-argument substitution bugs across coding agent runtimes.
