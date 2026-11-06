# Design System

> A human-centric, agent-native design system built with **React 19**, **Base UI (`@base-ui/react`)**, **Tailwind CSS v4**, and **Motion (`motion/react`)**.
>
> Crafted at the intersection of visual precision, tactile physics, and mathematical layout stability. 100% accessible (WCAG 2.2 AA / AAA), copy-paste friendly, with zero heavy npm package lock-in.

<p align="center">
  <img src="docs/assets/workbench-hero.png" alt="Antigravity Design System Workbench" width="100%" />
</p>

---

## 🏛️ The Manifesto: The Art of Human Software

### Prologue: Beyond the Robotic Average

Generative AI models assemble interfaces the way a compiler parses an abstract syntax tree: mathematically, defensively, and without feeling. They calculate the statistical average of the internet. The average of the internet is a blue-to-purple gradient, three identical cards with generic icons, a kicker label shouting above a heading, and linear transitions that stop abruptly like a stalled engine.

This is not design; this is visual assembly.

**Design is an art form.** It is the disciplined intersection of human psychology, physical intuition, typographic harmony, and kinetic grace. Software is not merely a tool to manipulate a database: it is a sensory environment where people spend hours of their lives thinking, creating, communicating, and building.

This design system is a manifesto against apathy in software. It is a codified standard that teaches both humans and autonomous agents how to craft software that feels alive, intentional, and deeply respectful of the human on the other side of the glass.

---

### The Six Tenets of Human-Centric Craft

```
                      ┌────────────────────────┐
                      │      THE HUMAN EYE     │
                      │   (Spatial & Typo)     │
                      └───────────┬────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
         ▼                        ▼                        ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  PHYSICAL TRUTH  │    │ RADICAL RESTRAINT│    │ EMOTIONAL DIGNITY│
│ (Kinetic & Touch)│    │ (Quiet Chrome)   │    │ (Reassurance)    │
└──────────────────┘    └──────────────────┘    └──────────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         │                                                 │
         ▼                                                 ▼
┌──────────────────┐                              ┌──────────────────┐
│ ANTI-SLOP CRAFT  │                              │ INTENT ANATOMY   │
│ (9-State Matrix) │                              │ (Anti-Template)  │
└──────────────────┘                              └──────────────────┘
```

#### 1. Physical Truth (Kinetic Intuition)

In the real world, no object teleports. Nothing appears from a mathematical zero. Nothing moves at a constant, linear speed and then halts without momentum.

When software ignores physics, the subconscious mind registers a micro-dissonance. The user does not know why, but the software feels stiff, synthetic, or disconnected.

- **Calibrated Springs**: Movement carries weight and elasticity. We reject arbitrary duration timers (`300ms ease-in-out`). Everything moves via calibrated springs with mass, stiffness, and damping (`springs.tactile`, `springs.snappy`, `springs.squishy`).
- **Direct Physical Yield on `pointerdown`**: When you press a key on a grand piano or the mechanical shutter of a camera, the mechanism yields beneath your finger the exact millisecond pressure is applied. Buttons and interactive surfaces must yield on `pointerdown`, compressing slightly (`scale(0.97)` to `0.98`) to acknowledge human contact instantly. Waiting for `click` (finger release) betrays tactile trust.
- **Interruptibility as Respect**: The human mind moves quickly. If a user swipes a sheet or dismisses a dialog while it is mid-flight, the interface must allow them to catch it, redirect it, or fling it back. Software that locks the screen while an animation finishes treats the human as an observer rather than a pilot.

#### 2. The Quiet Chrome (Radical Restraint)

A gallery does not paint bright neon arrows pointing to a painting. The gallery walls are quiet, neutral, and lit with care so the work itself can speak.

Most modern web applications suffer from visual screaming: cards nested inside cards, bordered by saturated outlines, floating on drop shadows, capped with kicker tags, and illuminated with neon halos.

Our philosophy demands **quiet chrome**:

- **Cards as a Last Resort**: Grouping is achieved through spatial proximity, typography, and baseline rhythm before reaching for a rectangular box.
- **Depth Without Decoration**: Shadows represent directional physical light. A subtle 1px optical inner highlight reflects physical reality far more truthfully than a fuzzy neon glow.
- **Zero Decorative Slop**: Background grids, diagonal stripes, and artificial blur layers are avoided unless they serve a functional spatial anchor. Let surfaces be calm.

#### 3. Typographic Decorum & Spatial Rhythm

Whitespace is not empty screen estate waiting to be filled with features: whitespace is breathing room for the human brain.

- **Typographic Authority**: Type is the voice of the software. If every heading is accompanied by an uppercase kicker, a badge, and an exclamation, the software is shouting. We ban section eyebrows by default. Headings command presence through weight, optical scale, and natural tracking (`-0.02em` to `-0.04em`).
- **Reading Measure**: Body prose is constrained to `65–75ch` with balanced text wrap (`[text-wrap:pretty]`) so the human eye never loses its place at line breaks.
- **Tabular Numerals**: Numbers and metrics declare tabular figures (`tabular-nums`). Numbers that jitter horizontally when incrementing undermine craftsmanship.

#### 4. Emotional Dignity (Safety, Reassurance, and Joy)

Human beings interact with software through fundamental emotional needs: safety, understanding, and confidence.

- **Safety and Forgiveness**: Destructive actions demand tactile friction (`AlertDialog`), clear undo states, and explicit semantic signalling. An interface must never punish a user for a mistake. Error messages state reality without condescension, position themselves directly where the action occurred, and offer an immediate path to recovery.
- **Reassurance in the Void**: When data is loading, the interface must never twitch or jump. Structural skeletons preserve the exact dimensions of incoming content, preventing cumulative layout shift.
- **Joy in the Micro-Details**: Software delight does not come from confetti or playful mascots. It comes from the mechanical certainty of a toggle snapping into place with tactile resistance, a tab bar where the pill glides fluidly beneath the selection, or a dropdown that emerges from its trigger rather than falling arbitrarily from the ceiling.

#### 5. The Anti-Slop Conviction (Teaching AI Human Taste)

When AI writes code, it defaults to the middle of the bell curve. It regurgitates boilerplate because it lacks eyes, hands, and physical intuition.

To make this design system an engine that produces living craft rather than synthetic boilerplate:

- **Negative Constraints are as Vital as Positive Directives**: We do not just describe what to build; we explicitly forbid the lazy reflexes of generative models.
- **The Mandatory 9-State Interactive Matrix**: Every interactive primitive must handle resting, hover, active compression, focused, focus-visible, selected/pressed, disabled, loading, and success states.
- **Strict Compositor Purity**: Transitions animate exclusively compositor properties (`transform`, `opacity`) paired with GPU acceleration. Animating layout dimensions or CPU paint filters that flicker ancestor backdrop blurs is strictly prohibited.

#### 6. Intent-Driven Macrostructures & Anti-Convergence Architecture

Layout must emerge directly from human purpose rather than generative convenience. Standard generative AI outputs converge on the same monotonous template: a split hero with an abstract illustration, three identical icon-above-heading card columns, numbered process steps, pricing cards, and an email banner above a boilerplate footer.

We dismantle this template through three core disciplines:

- **Category Intent and the Visitor's Job**: A page is built around what the human visitor came to accomplish (`subscribe`, `book`, `visit`, `attend`, `buy`, `try`, `sign up`, `hire`, `join`, `listen`). The primary action sits where the category demands it: in the hero, sticky, or beside the core offering. The page concludes on its native operational goal, strictly rejecting the lazy reflex of placing an email signup form at the foot of pages where a newsletter is not the core medium.
- **The Twenty-One Macrostructural Archetypes**: Rather than repeating uniform card grids, layouts draw from twenty-one distinct macrostructures (such as _Workbench, Manifesto, Bento Grid, Long Document, Split Studio, Specimen, Stat-Led, Index-First, Feature Stack_). Diversity stems from varied spatial rhythms and authentic material proofs.
- **The Editorial Swap Test & Word Budgets**: Copy is an architectural material, not marketing filler. Every headline must pass the Swap Test: if a competitor's name can be substituted without sounding incongruous, the copy is rewritten with concrete, domain-specific nouns and verified metrics. Fullness is achieved through typographic authority and interactive mass within a strict word budget ($\le 80$ words per screen, $\le 450$ words for complete pages).

---

## ⚡ The Eighteen Non-Negotiable Directives

Every line of code and component in this repository enforces these eighteen codified invariants:

1. **Physical Yield on `pointerdown`**: Interactive controls compress (`scale(0.97)` to `0.98`) the millisecond touch or mouse down occurs. Never wait for pointer release (`click`).
2. **Zero Layout Shifts**: Dynamic states (`hover`, `focus`, `active`, `selected`, `pressed`) never alter `border-width`, `font-weight`, `letter-spacing`, `margin`, or `padding`. Outline states alter colour only (`border border-transparent` base). Selection is signalled via background pills or indicators; never by switching font weight or tracking.
3. **Tabular Numerals**: All counters, prices, timestamps, metrics, and data tables declare `font-variant-numeric: tabular-nums` (`tabular-nums`) to prevent horizontal digit jitter.
4. **Accessible Invariants**: 100% WCAG 2.2 AA / AAA compliance. Every icon-only button carries an explicit `aria-label`. Dialogs trap focus, maintain focus guards, and dismiss on `Escape`.
5. **Quiet Chrome & Anti-Pill Proliferation**: Avoid the reflex of placing everything in bordered cards. Rely first on spatial rhythm, typographic hierarchy, and baseline alignment. Decorative eyebrow pills above headings are strictly banned. Badges and pills are reserved exclusively for functional operational telemetry.
6. **Concentric Corner Radii**: Nested rounded surfaces compute their inner curve mathematically: $R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{Padding})$ to eliminate bulging, lumpy corners.
7. **Anti-Crush Responsive Page Architecture**: Minimum viable column width ($W_{\text{col}} \ge 340\text{px}$). All badges, chips, and pills declare `shrink-0 whitespace-nowrap`. Primary navigation titles, dropdown menu labels, and command palette items must never truncate primary text labels, maintaining `whitespace-nowrap font-semibold` with wrapping badge clusters and minimum column widths ($W_{\text{col}} \ge 220\text{px}$).
8. **Reversible Kinetic Affordances (No Gimmick Icon Animation)**: Icons only animate if they have a reversible mechanical affordance that glides back to its resting origin on pointer leave (such as sliding filter knobs, gliding paper plane, separating sheets). Confirmation and operational icons (`+`, `-`, `✓`, `→`) remain static by default.
9. **Component Dimension Invariants & Atomic Class Collision Defence**: Never merge multi-axis shorthand utilities (`size-full`, `p-0`) after single-axis variant sizes (`h-9`, `px-4`) inside `cn()` / `twMerge()`. Preview fixtures center components along the vertical cross-axis without arbitrary conflicting `min-h-[...]` values.
10. **Component-Unified Kinetic Affinity & Optical Icon Proportion**: Icons inside interactive components trigger synchronously with the parent component on hover, press, or focus (`group-hover`/`group-active`). Always pass an explicit `size={...}` parameter matching the container optical target (40% to 50% container height).
11. **Perceptual Gradient Engineering & Dual-Engine Contrast**: Neon gradient text is strictly banned. All CSS gradient ramps interpolate in modern perceptual colour spaces (`linear-gradient(in oklch, ...)`). Text and interactive boundaries satisfy both WCAG 2.2 Level AA ($\ge 4.5:1$) and WCAG 3 APCA ($|L_c| \ge 60/75$).
12. **British English, Ban on AI Em Dashes, Editorial Swap Test & Negative Copy Lexicon**: All prose and interface text strictly adheres to British English spelling (`prioritise`, `synchronised`, `colour`, `centre`, `behaviour`, `grey`, `dialogue`, `fulfil`, `judgement`). Never use em dashes in prose or titles. Eliminate generic buzzwords (_seamless, robust, empower, supercharge, elevate, effortless, unlock, unleash_).
13. **Origin Anonymity & Self-Contained Integrity**: Present all architectures, primitives, tokens, and guidelines as autonomous, self-contained standards of this design system.
14. **Telemetry Indicator & Kinetic Cadence Invariant**: Kinetic status beacons maintain an optically light, quiet resting state (`bg-background`, soft perimeter border, zero static halo blobs). Pulsing keyframes enforce a periodic resting window ($\ge 60\%$ of cycle duration at `opacity: 0`). Keyframes animate exclusively compositor properties (`transform`, `opacity`) with `transform-gpu` and `will-change-transform`.
15. **Brand Truth & Fact Integrity**: Models must never hallucinate brand hex values or typefaces from training memory. Fictional metrics, mock divs with synthetic browser chrome, and invented case studies are strictly banned.
16. **Micro-Finish & Layout Stability**: Form helper and validation error slots declare `min-h-[1lh]` to preserve line-height baseline stability. Headings declare `[text-wrap:balance]` and prose enforces `[text-wrap:pretty]`. Containers cap at 1920px ($1360\text{px}$ to $1440\text{px}$ content width).
17. **Evidence Before Assertions & Verification Gate**: Never declare work complete, fixed, clean, or passing without executing the fresh verification suite (`npm run check`) and confirming exit code 0 within the current interaction.
18. **Autonomous Rulings & Continuous Execution Protocol**: Rulings over stalls. The agent delivers authoritative decisions on design-engineering ambiguities without parking the session, stopping only for destructive operations, security boundaries, or remote mutations.

---

## 🎨 Living Visual Proof: Material & Spatial Precision

Every visual surface in this repository is captured directly from the running production engine, demonstrating pure physical materials and optical calibration:

### 1. Perceptual OKLCH Colour Engine & Dual-Engine Contrast

All tokens interpolate in perceptual OKLCH color space, verified live against both WCAG 2.2 contrast ratios and WCAG 3 APCA perceptual lightness algorithms.

<p align="center">
  <img src="docs/assets/theme-studio.png" alt="Interactive Theme Studio with OKLCH Calibration" width="100%" />
</p>

- **Liquid Glass Materials**: Real-time specular highlights (`backdrop-filter: blur(20px)`), 1px interior perimeter specular rim lighting (`inset 0 1px 0 rgba(255, 255, 255, 0.1)`), and dark mode ambient absorption.
- **Automatic Polarity Flipping**: High-luminance hues (amber, yellow, gold) automatically enforce negative-polarity deep obsidian foreground text to eliminate optical irradiation.

### 2. Kinetic Vector Iconography (470+ Primitives)

Every icon features calibrated physical spring kinematics, reversible mechanical affordances, and zero stroke-erasure gimmicks.

<p align="center">
  <img src="docs/assets/icon-gallery.png" alt="Kinetic Vector Icon Directory" width="100%" />
</p>

- **Reversible Mechanics**: Icons glide, tilt, lift, or slide along physical mechanical paths and return smoothly to rest when pointer hover ends.
- **Parent Lifecycle Binding**: Nested icons respond synchronously to parent control states (`group-hover`, `group-active`) with zero cursor boundary jitter.

---

## 🤖 Agent-Native & Machine-Readable Standards

This repository is built for autonomous agent workflows and developer tools:

- **[`public/llms.txt`](public/llms.txt)**: Standard machine-readable agent index detailing core directives, the 51 primitives catalogue, and kinetic iconography guide.
- **[`public/llms-full.txt`](public/llms-full.txt)**: Comprehensive single-file reference manual detailing OKLCH colour engine tokens, motion springs, liquid glass shaders, and component usage code snippets.
- **[`public/registry.json`](public/registry.json)**: Machine-readable JSON component registry specifying file paths, variant lists, and package dependencies.
- **[`skills/`](skills/)**: Codified agent instruction manuals covering [craft philosophy](skills/craft-philosophy/SKILL.md), [motion physics](skills/motion-physics/SKILL.md), [base UI primitives](skills/base-ui-primitives/SKILL.md), [semantic theming](skills/semantic-theming/SKILL.md), and [production deployment](skills/production-deployment/SKILL.md).

---

## 🧩 Complete Component Catalogue (All 51 Primitives)

All components are located in [`src/components/ui/`](src/components/ui/) and exported through [`src/components/ui/index.ts`](src/components/ui/index.ts):

### 1. Actions & Controls

| Component              | Path                                                                                 | Description                                                                                                                                         |
| :--------------------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Button`**           | [`src/components/ui/button.tsx`](src/components/ui/button.tsx)                       | 9-state interactive matrix, automatic async Promise lifecycle, loading spinner, success checkmark, 44px touch target, physical `pointerdown` yield. |
| **`Toggle`**           | [`src/components/ui/toggle.tsx`](src/components/ui/toggle.tsx)                       | Two-state toggle button with tactile spring feedback and aria-pressed attributes.                                                                   |
| **`ToggleGroup`**      | [`src/components/ui/toggle-group.tsx`](src/components/ui/toggle-group.tsx)           | Grouped single or multi-select toggles with roving tabindex and keyboard navigation.                                                                |
| **`Toolbar`**          | [`src/components/ui/toolbar.tsx`](src/components/ui/toolbar.tsx)                     | Accessible toolbar container grouping interactive actions with orientation support.                                                                 |
| **`MarkdownToolbar`**  | [`src/components/ui/markdown-toolbar/`](src/components/ui/markdown-toolbar/)         | Modular rich-text formatting controls with list toggle logic and heading sanitisation.                                                              |
| **`SegmentedControl`** | [`src/components/ui/segmented-control.tsx`](src/components/ui/segmented-control.tsx) | Sliding pill segmented toggle with layout animation and arrow key navigation.                                                                       |
| **`CopyButton`**       | [`src/components/ui/copy-button.tsx`](src/components/ui/copy-button.tsx)             | Clipboard copy button with spring state morph (`"Copy"` to `"Copied!"`).                                                                            |
| **`ThemeToggle`**      | [`src/components/ui/theme-toggle.tsx`](src/components/ui/theme-toggle.tsx)           | Dark and light mode toggle with transition flash suppression and localStorage synchronisation.                                                      |
| **`Toast`**            | [`src/components/ui/toast.tsx`](src/components/ui/toast.tsx)                         | Accessible notification toasts with undo action support and countdown dismissal.                                                                    |

### 2. Forms & Inputs

| Component        | Path                                                                     | Description                                                                                         |
| :--------------- | :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| **`Input`**      | [`src/components/ui/input.tsx`](src/components/ui/input.tsx)             | High-precision text input with left/right icons, prefix/suffix chips, and iOS font-zoom prevention. |
| **`Textarea`**   | [`src/components/ui/textarea.tsx`](src/components/ui/textarea.tsx)       | Multiline text area with subtle 1px border-hugging focus ring.                                      |
| **`Field`**      | [`src/components/ui/field.tsx`](src/components/ui/field.tsx)             | Accessible form control compound component binding labels, descriptions, and error states.          |
| **`Select`**     | [`src/components/ui/select.tsx`](src/components/ui/select.tsx)           | Base UI dropdown select with keyboard navigation, checkmarks, and liquid glass popup.               |
| **`Combobox`**   | [`src/components/ui/combobox.tsx`](src/components/ui/combobox.tsx)       | Searchable auto-complete combobox with keyboard roving navigation and empty states.                 |
| **`Checkbox`**   | [`src/components/ui/checkbox.tsx`](src/components/ui/checkbox.tsx)       | Tri-state checkbox (checked, unchecked, indeterminate) with 44px hit-slop expansion.                |
| **`RadioGroup`** | [`src/components/ui/radio-group.tsx`](src/components/ui/radio-group.tsx) | Accessible radio selection group with arrow key roving focus.                                       |
| **`Switch`**     | [`src/components/ui/switch.tsx`](src/components/ui/switch.tsx)           | Apple HIG toggle switch with tactile spring travel and physical active elongation.                  |
| **`Slider`**     | [`src/components/ui/slider.tsx`](src/components/ui/slider.tsx)           | Direct manipulation slider with 1:1 pointer scrubbing, value bubble, and locked track height.       |
| **`Stepper`**    | [`src/components/ui/stepper.tsx`](src/components/ui/stepper.tsx)         | Number stepper with hold-to-accelerate speed and integrated odometer ticker.                        |
| **`InputOTP`**   | [`src/components/ui/input-otp.tsx`](src/components/ui/input-otp.tsx)     | One-time password PIN boxes with SMS autofill, clipboard paste regex, and blinking caret.           |
| **`FileUpload`** | [`src/components/ui/file-upload.tsx`](src/components/ui/file-upload.tsx) | Drag-and-drop file upload zone with file type validation, size limits, and progress feedback.       |

### 3. Overlays & Dialogs (Base UI)

| Component          | Path                                                                         | Description                                                                                   |
| :----------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **`Dialog`**       | [`src/components/ui/dialog.tsx`](src/components/ui/dialog.tsx)               | Modal dialog with focus trapping, backdrop blur, specular rim lighting, and Escape dismissal. |
| **`AlertDialog`**  | [`src/components/ui/alert-dialog.tsx`](src/components/ui/alert-dialog.tsx)   | Destructive action confirmation dialog with safe initial focus on Cancel.                     |
| **`Sheet`**        | [`src/components/ui/sheet.tsx`](src/components/ui/sheet.tsx)                 | Slide-over drawer anchoring to any screen edge (`right`, `left`, `bottom`, `top`).            |
| **`Drawer`**       | [`src/components/ui/drawer.tsx`](src/components/ui/drawer.tsx)               | Pull-up bottom sheet with gesture velocity thresholds and spring snap points.                 |
| **`Popover`**      | [`src/components/ui/popover.tsx`](src/components/ui/popover.tsx)             | Trigger-anchored floating popup with automatic collision detection.                           |
| **`DropdownMenu`** | [`src/components/ui/dropdown-menu.tsx`](src/components/ui/dropdown-menu.tsx) | Contextual menu with submenus, checkboxes, radio items, and keyboard navigation.              |
| **`ContextMenu`**  | [`src/components/ui/context-menu.tsx`](src/components/ui/context-menu.tsx)   | Right-click contextual flyout menu with cursor collision alignment.                           |
| **`HoverCard`**    | [`src/components/ui/hover-card.tsx`](src/components/ui/hover-card.tsx)       | Preview popup card triggered on pointer hover with smooth warmup delays.                      |
| **`Tooltip`**      | [`src/components/ui/tooltip.tsx`](src/components/ui/tooltip.tsx)             | Instant micro-tooltip with delay warmup to prevent hovering visual noise.                     |
| **`Command`**      | [`src/components/ui/command.tsx`](src/components/ui/command.tsx)             | Global command palette (`⌘K` / `Ctrl+K`) with fuzzy search and keyboard shortcuts.            |

### 4. Navigation & Layout Structure

| Component           | Path                                                                     | Description                                                                                                                                                                      |
| :------------------ | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`NavigationBar`** | [`src/components/ui/navigation-bar/`](src/components/ui/navigation-bar/) | Adaptive top navigation bar featuring 5 menu archetypes (Mega Menu, Categorised Directory Columns, Simple Flyout, Direct Links, Mobile Sheet Drawer) with liquid glass surfaces. |
| **`Breadcrumb`**    | [`src/components/ui/breadcrumb.tsx`](src/components/ui/breadcrumb.tsx)   | Semantic hierarchical page path navigation with kinetic chevrons.                                                                                                                |
| **`Pagination`**    | [`src/components/ui/pagination.tsx`](src/components/ui/pagination.tsx)   | Mathematically locked 7-slot pagination with zero horizontal jumping, worded or icon-only Previous/Next buttons (`variant="worded" \| "icon"`), and turnkey auto-mode.           |
| **`Tabs`**          | [`src/components/ui/tabs.tsx`](src/components/ui/tabs.tsx)               | Sliding tabs across 3 variants (`default`, `pills`, `line`) with zero layout shift.                                                                                              |
| **`Accordion`**     | [`src/components/ui/accordion.tsx`](src/components/ui/accordion.tsx)     | Smooth expanding disclosure panels with reversible chevron rotation and inert hidden focus.                                                                                      |
| **`Resizable`**     | [`src/components/ui/resizable.tsx`](src/components/ui/resizable.tsx)     | Split-view workspace handles with tactile dragging and keyboard arrow resizing.                                                                                                  |
| **`ScrollArea`**    | [`src/components/ui/scroll-area.tsx`](src/components/ui/scroll-area.tsx) | Custom scroll container with kinetic thumb inertia and auto-hide scrollbars.                                                                                                     |

### 5. Data, Media & Telemetry

| Component                 | Path                                                                         | Description                                                                                           |
| :------------------------ | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **`Table`**               | [`src/components/ui/table.tsx`](src/components/ui/table.tsx)                 | Responsive tabular data table with quiet borders, captions, and `tabular-nums`.                       |
| **`Card` & `CardInner`**  | [`src/components/ui/card.tsx`](src/components/ui/card.tsx)                   | Quiet surface with mathematically concentric inner radii ($R_{\text{inner}} = R_{\text{outer}} - P$). |
| **`Badge`**               | [`src/components/ui/badge.tsx`](src/components/ui/badge.tsx)                 | Status pills with live pulsing indicators (`shrink-0 whitespace-nowrap`).                             |
| **`Avatar`**              | [`src/components/ui/avatar.tsx`](src/components/ui/avatar.tsx)               | User image/initials avatar with deterministic OKLCH pastel hashing and presence dots.                 |
| **`Calendar`**            | [`src/components/ui/calendar.tsx`](src/components/ui/calendar.tsx)           | Accessible month grid calendar and popover DatePicker with keyboard date stepping.                    |
| **`Chart` & `Sparkline`** | [`src/components/ui/chart.tsx`](src/components/ui/chart.tsx)                 | Theme-reactive vector charts with automatic trend colouring and interactive tooltips.                 |
| **`ProgressiveImage`**    | [`src/components/ui/image.tsx`](src/components/ui/image.tsx)                 | Zero-CLS media container with low-resolution blur crossfade on hydration.                             |
| **`Kbd`**                 | [`src/components/ui/kbd.tsx`](src/components/ui/kbd.tsx)                     | Semantic keyboard shortcut indicator with platform symbol auto-detection.                             |
| **`NumberTicker`**        | [`src/components/ui/number-ticker.tsx`](src/components/ui/number-ticker.tsx) | Rolling odometer number counter with spring physics and zero horizontal jitter.                       |
| **`Progress`**            | [`src/components/ui/progress.tsx`](src/components/ui/progress.tsx)           | Linear and circular progress indicators with smooth spring width travel.                              |
| **`Skeleton`**            | [`src/components/ui/skeleton.tsx`](src/components/ui/skeleton.tsx)           | Dimension-stable skeleton placeholder to prevent cumulative layout shift (CLS).                       |
| **`Timeline`**            | [`src/components/ui/timeline/`](src/components/ui/timeline/)                 | Modular telemetry and milestone timeline with status nodes and connecting stems.                      |
| **`Tree`**                | [`src/components/ui/tree.tsx`](src/components/ui/tree.tsx)                   | Hierarchical directory and node tree with keyboard expanding and aria-level bindings.                 |

---

## 🛠️ Workbench Quick Start & Integration Guide

All technical setup, development commands, and project integration steps are grouped here to preserve the philosophical focus of the living standard.

### 1. Launching the Interactive Workbench

If you have Node.js installed, launch the interactive workbench locally:

```bash
# 1. Clone this repository
git clone https://github.com/WDibble/design-system.git
cd design-system

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [`http://localhost:5173`](http://localhost:5173) in your browser. You can inspect all 51 primitives, open the real-time Theme Studio (press **⌘T**), explore 470+ kinetic animated icons, and test living state transitions.

To run the verification suite and check TypeScript, invariants, and production bundling:

```bash
npm run check
```

---

### 2. Adding Primitives to Your Own Project

Whether you are using Next.js, Vite, Remix, or Astro, integrate any component via four steps:

#### Step 1: Install Peer Dependencies

```bash
npm install @base-ui/react motion clsx tailwind-merge class-variance-authority lucide-react
```

| Package                    | Role in Architecture                                                                    |
| :------------------------- | :-------------------------------------------------------------------------------------- |
| `@base-ui/react`           | Accessible headless primitives (menus, dialogs, popovers, sliders) by the Base UI team. |
| `motion`                   | Apple HIG fluid spring physics for smooth presses, sliding tabs, and enters.            |
| `class-variance-authority` | Manages variant matrices (e.g. `variant="default" \| "outline" \| "destructive"`).      |
| `clsx` & `tailwind-merge`  | Safely combines Tailwind CSS utility classes without style conflicts.                   |
| `lucide-react`             | Clean, modern vector icons.                                                             |

#### Step 2: Add the Two Helper Utilities

Copy these two helper files into your project:

1. **Class Merger Utility (`src/lib/utils.ts`)**:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

2. **Motion Physics Constants (`src/tokens/motion.ts`)**:

```ts
export const springs = {
  tactile: { type: "spring", stiffness: 600, damping: 30, mass: 0.8 },
  dialog: { type: "spring", stiffness: 350, damping: 35, mass: 1.0 },
  snappy: { type: "spring", stiffness: 550, damping: 35, mass: 0.6 },
  micro: { type: "spring", stiffness: 700, damping: 40 },
  squishy: { type: "spring", stiffness: 420, damping: 24, mass: 0.8 },
} as const;
```

#### Step 3: Add OKLCH Semantic Tokens to Your CSS (`src/index.css`)

Copy the semantic tokens from [`src/index.css`](src/index.css) into your project's stylesheet:

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.54 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.985 0 0);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.5 0 0);
    --radius: 0.625rem;
  }

  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.17 0 0);
    --card-foreground: oklch(0.985 0 0);
    --primary: oklch(0.985 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --destructive: oklch(0.396 0.141 25.723);
    --destructive-foreground: oklch(0.985 0 0);
    --border: oklch(0.269 0 0);
    --input: oklch(0.269 0 0);
    --ring: oklch(0.58 0 0);
  }
}
```

#### Step 4: Copy and Use Components

Copy the component file you need from [`src/components/ui/`](src/components/ui/) directly into your project:

```tsx
import { Button } from "@/components/ui/button";

export function SubmitButton() {
  return (
    <Button
      variant="default"
      onClick={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }}
    >
      Save Changes
    </Button>
  );
}
```

---

### 3. Technical Notes & Troubleshooting

- **Path Aliasing**: Verify your `tsconfig.json` contains `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }` so that `@/components/...` imports resolve cleanly.
- **Server Components (Next.js App Router)**: Every interactive primitive declares `"use client";` at the file head. You can import them directly into server or client components without bundler errors.
- **React 18 & 19 Support**: All components use standard `React.forwardRef` and support React 18 and React 19 equally.

---

## 📚 Architectural Guides & Standards

- **[System Architecture](docs/architecture.md)**: Deep dive into Base UI composition, OKLCH token math, Motion physics, and Liquid Glass materials.
- **[Craft Philosophy](docs/philosophy.md)**: The human sensory manifesto, quiet chrome doctrine, and anti-slop mandate.
- **[Tooling & Quality Gates](docs/tooling.md)**: Oxlint, Vitest, CSpell, and AST verification architecture.
- **[Contributing Guide](CONTRIBUTING.md)**: Standards, interactive state matrix, verification suite, and pull request workflow.
- **[Agent Directives](AGENTS.md)**: Core design engineering invariants and rules for autonomous agents.

---

## 📄 Licence

MIT. Free to use, adapt, and build upon for personal and commercial projects.
