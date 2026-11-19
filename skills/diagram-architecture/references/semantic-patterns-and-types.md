# Semantic Diagram Patterns, Layout Grammars & Anti-Slop Rules

Select **one** primary semantic pattern driven by system behaviour, then choose **one** layout grammar suited to the relationship. Never blend two structural layout grammars into a single figure.

---

## 1. Semantic Pattern Routing Table

| Behavioural Trigger                                                 | Semantic Pattern               | Recommended Layout Grammar         |
| :------------------------------------------------------------------ | :----------------------------- | :--------------------------------- |
| Bounded concurrency, queue pressure, backpressure, or throttling    | Fan-in queue / bottleneck      | Data Flow or Sequence Diagram      |
| Ordered pipeline stages sharing identical metadata/governance slots | Stage rail with semantic slots | Steps / Horizontal Stage Rail      |
| Primary request path paired with timeout, retry, or fallback path   | Guarded path + fallback        | Sequence or Flowchart              |
| Cyclic lifecycle states with error exit and recovery transitions    | Finite state lifecycle         | State Machine                      |
| System refactor changing nodes, boundaries, or token ownership      | Before / after structural diff | Architecture Topology Delta        |
| Separating user actions, UI state, and async worker/edge work       | Visibility line separation     | Service Blueprint / Swimlane       |
| Compound UI primitive decomposition (Root, Trigger, Portal, Popup)  | Hierarchical slot containment  | Exploded Component Anatomy or Tree |
| Multi-option architectural trade-offs across two competing axes     | Weighted constraint split      | Quadrant Matrix (`2 x 2`)          |

---

## 2. Core Visual Grammars & Per-Type Caps

Align all coordinates, box sizes, gaps, and inner padding strictly onto a `4px` base grid (`4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`).

### A. Architecture & Topology Delta

- **Purpose**: Compare an existing pipeline against an updated architecture side by side or with explicit `ADDED` / `REMOVED` / `MODIFIED` boundary badges.
- **Cap**: Maximum `8` total nodes (`<= 4` unchanged, `<= 4` delta nodes); keep invariant nodes muted so only modified boundaries carry accent colour.

### B. Ordered Stage Rail (`Steps`)

- **Purpose**: Linear progressions with discrete numbered phases (`01 -> 02 -> 03 -> 04`).
- **Cap**: `3` to `7` stages maximum along a single horizontal rail (desktop) or vertical stem (compact containers). Keep stage body text under `2` short lines.

### C. Sequence & Protocol Timeline

- **Purpose**: Async browser interactions, pointer capture lifecycles, server caching revalidation, and idempotency retries.
- **Cap**: Maximum `5` vertical lifelines, horizontal solid arrows for synchronous calls, dashed arrows (`4,4`) for async responses or error returns, and thin activation bars only when duration overlaps matter.

### D. Finite State Machine

- **Purpose**: UI interaction lifecycles (such as `Idle -> Hover -> Pressed -> Loading -> Success -> Idle` or `Error` retry).
- **Cap**: `<= 7` states; begin with a solid circle initial marker, render named state pills/boxes (`rx=8`), label orthogonal transitions cleanly (`onPointerDown`, `onResolve`, `onReject`), and terminate final states with a concentric double ring.

### E. Layer Stack & Exploded Component Anatomy

- **Purpose**: Show visual elevation hierarchies (`z-0` to `z-70`), CSS token resolution layers (`:root -> @theme inline -> Component`), or compound DOM slots (`Root -> Portal -> Backdrop -> Popup`).
- **Cap**: `3` to `6` discrete horizontal layers or exploded nested shells with uniform `12px` vertical spacing and clean leader pointers on one flank only.

### F. Service Blueprint / Swimlane

- **Purpose**: Separate what human eyes perceive above the glass (`User Action`, `Frontstage UI Yield`) from background work below the line of visibility (`Workers`, `Edge Cache`, `Validation`).
- **Cap**: Maximum `3` swimlanes separated by hairline horizontal dashed dividers and clear uppercase monospace lane prefixes on the far left edge.

### G. Decision Tree & Dependency Graph

- **Purpose**: Trace package exports, component slot inheritance, or binary triage branches (`Yes / No` outcomes).
- **Cap**: Keep branching factor `<= 3` per parent and depth `<= 3` levels; collapse leaf attributes into tables rather than exploding trees beyond `9` boxes.

---

## 3. Anti-Slop Diagram Bans

Reject every layout or visual failure below before finalising any diagram:

| Diagram Anti-Pattern                                             | Why It Fails                                                         | Required Correction                                                                                                  |
| :--------------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| Dark background filled with cyan/purple neon glows               | Synthesises hollow "technical" drama without structural hierarchy    | Use `--background` / `--card` ground tokens paired with `1px` `--border` hairlines                                   |
| Blanket monospace typography on human titles                     | Degrades readability and flattens title-to-detail contrast           | Use `Geist Sans` (`font-semibold`) for box names; reserve `Geist Mono` (`tabular-nums`) for tokens, ports, and paths |
| Identical rectangular card grids for distinct system roles       | Erases semantic contrast between triggers, gates, stores, and errors | Vary treatments lightly (`rx=6`/`rx=8`, solid border vs dashed async/error border, `<= 2` `--primary` focal boxes)   |
| Floating legend box colliding inside the active node canvas      | Steals space and intersects connectors                               | Place a compact single-row legend bar neatly along the bottom perimeter or omit when self-evident                    |
| Text directly crossing connector strokes without background mask | Strokes slice straight through glyph stems                           | Insert an opaque `<rect fill="var(--background)">` mask around edge labels (`6px` to `10px` stroke gap)              |
| Vertical rotated `writing-mode` labels on vertical arrows        | Forces readers to tilt their heads on desktop and mobile             | Keep all text strictly horizontal beside vertical segments                                                           |
| Soft drop-shadow halos around every node                         | Visual noise blurs alignment edges and muddies dark themes           | Drop shadows completely; rely on clean `4px`-grid alignment and hairline contrast                                    |
| Over-packed `> 9`-node hairball schematics                       | Exceeds working visual memory in a single viewport                   | Split immediately into one `<= 6`-node Overview plus focused Detail schematics                                       |
| Diagonal spider-web connectors                                   | Arbitrary crossing angles obscure direction and ownership            | Enforce horizontal/vertical orthogonal routing (`rx=8` corners) on every off-axis connector                          |
