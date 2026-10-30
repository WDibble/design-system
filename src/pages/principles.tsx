import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CompassIcon,
  ArrowRightIcon,
  BookTextIcon,
  FeatherIcon,
  ActivityIcon,
  EyeIcon,
  SlidersHorizontalIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "@/components/icons";

export interface PrinciplesPageProps {
  onBackToWorkbench?: () => void;
}

export function PrinciplesPage({ onBackToWorkbench }: PrinciplesPageProps) {
  return (
    <article className="max-w-3xl mx-auto space-y-20 py-4 sm:py-8 text-foreground animate-in fade-in duration-300">
      {/* Editorial Hero Header */}
      <header className="space-y-6 text-center sm:text-left border-b border-border/60 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border/70 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <CompassIcon size={13} className="text-primary" />
          <span>Design Philosophy &amp; Engineering Standard</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
            The Art of Human Software
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A codified manifesto against apathy in software. Teaching human engineers and autonomous agents how to build interfaces grounded in physical intuition, typographic permanence, and emotional dignity.
          </p>
        </div>

        <blockquote className="border-l-2 border-primary/60 pl-4 py-1 text-sm italic text-muted-foreground leading-relaxed">
          &ldquo;When we align the interface to the way we think and move, something magical happens &mdash; it stops feeling like a computer and starts feeling like a seamless extension of us.&rdquo;
        </blockquote>

        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-muted-foreground">
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            PHILOSOPHY.md
          </Badge>
          <span>&bull;</span>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            AGENTS.md
          </Badge>
          <span>&bull;</span>
          <span>11 Non-Negotiable Directives</span>
          <span>&bull;</span>
          <span>5 Core Tenets</span>
        </div>
      </header>

      {/* Part 1: The Human Sensory Manifesto */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Chapter I
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <BookTextIcon size={24} className="text-primary" />
            Beyond the Robotic Average
          </h2>
        </div>

        <div className="space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            Generative AI models assemble user interfaces the way a compiler parses an AST: mathematically, defensively, and without feeling. Left unprompted, an agent calculates the average of the internet: neon blue-to-purple gradients, generic 3-card grids, screaming kicker labels, and linear transitions that halt abruptly like a stalled engine.
          </p>
          <p>
            This is not design; this is visual assembly. Design is the disciplined intersection of human psychology, physical mechanics, and visual restraint. Software is not merely a tool to manipulate a database &mdash; it is a sensory environment where people spend hours of their lives creating, communicating, and thinking.
          </p>
          <p>
            Every primitive in this system is engineered with negative constraints: strict bans on synthetic slop, coupled with mathematical invariants for optical concentricity, layout stability, and sensory tactility.
          </p>
        </div>
      </section>

      {/* Part 2: The Five Core Philosophical Pillars */}
      <section className="space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Chapter II
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <FeatherIcon size={24} className="text-primary" />
            The Five Philosophical Pillars
          </h2>
          <p className="text-sm text-muted-foreground">
            The foundational truths that guide every interaction, animation, and pixel hierarchy.
          </p>
        </div>

        <div className="space-y-10 divide-y divide-border/60">
          {/* Tenet 1 */}
          <div className="pt-8 first:pt-0 space-y-4">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ActivityIcon size={18} />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Tenet 01</span>
                <h3 className="text-lg font-semibold text-foreground">The Law of Physicality (Kinetic Truth)</h3>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pl-11">
              <p>
                In the real universe, no physical object teleports. Nothing appears from a mathematical zero without momentum, and nothing stops at a fixed linear velocity. We reject arbitrary duration timers (<code className="text-xs font-mono text-foreground">300ms ease-in-out</code>) in favor of calibrated physical springs with mass, stiffness, and damping.
              </p>
              <p>
                When you press a key on a Steinway piano or the shutter on a Leica camera, the mechanism yields beneath your fingertip the exact millisecond pressure occurs. Interactive controls must compress on <strong className="text-foreground font-medium">pointerdown</strong> (<code className="text-xs font-mono text-foreground">scale(0.98)</code>). Waiting for <code className="text-xs font-mono text-foreground">click</code> (pointer release) delays tactile acknowledgment by 100&ndash;250ms, betraying human touch.
              </p>
            </div>
          </div>

          {/* Tenet 2 */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <EyeIcon size={18} />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Tenet 02</span>
                <h3 className="text-lg font-semibold text-foreground">The Discipline of Radical Restraint (Quiet Chrome)</h3>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pl-11">
              <p>
                Software is a gallery for human work, not an amusement park. We reject the lazy reflex of boxing every piece of text inside a bordered card. Card-in-card nesting produces visual clutter and suffocates content.
              </p>
              <p>
                We rely first on spatial rhythm, typographic hierarchy, optical alignment, and subtle 1px hairline rules. Chrome steps back into the shadows so the user&rsquo;s content can breathe.
              </p>
            </div>
          </div>

          {/* Tenet 3 */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <SlidersHorizontalIcon size={18} />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Tenet 03</span>
                <h3 className="text-lg font-semibold text-foreground">Typographic Permanence &amp; Tabular Rhythm</h3>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pl-11">
              <p>
                Typography is structural architecture. We eliminate screaming, hyper-saturated kicker eyebrows above headings. Headings possess natural gravitas through weight, tracking, and optical scale.
              </p>
              <p>
                Numbers must never dance. In data tables, timers, countdown tickers, financial metrics, and meters, changing digits must occupy uniform glyph widths (<code className="text-xs font-mono text-foreground">font-variant-numeric: tabular-nums</code>). Zero horizontal line jittering.
              </p>
            </div>
          </div>

          {/* Tenet 4 */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ShieldCheckIcon size={18} />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Tenet 04</span>
                <h3 className="text-lg font-semibold text-foreground">Emotional Dignity &amp; Forgiving States</h3>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pl-11">
              <p>
                Software must grant calm reassurance to the human nervous system. We never ambush the user with irreversible operations or interrupt their workflow with jarring, modal confirmation traps for routine tasks.
              </p>
              <p>
                Destructive operations are paired with non-blocking, fluid undo toasts. Dignified interfaces respect human agency, forgive honest mistakes, and preserve velocity.
              </p>
            </div>
          </div>

          {/* Tenet 5 */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ZapIcon size={18} />
              </span>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Tenet 05</span>
                <h3 className="text-lg font-semibold text-foreground">The Anti-Slop Conviction &amp; Machine Taste</h3>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pl-11">
              <p>
                Generative AI models must be given strict negative constraints to prevent cliché boilerplate. We strictly ban saturated linear gradient text (<code className="text-xs font-mono text-foreground">-webkit-background-clip: text</code>), spinning symmetrical operational icons (<code className="text-xs font-mono text-foreground">+</code>, <code className="text-xs font-mono text-foreground">-</code>), and unconstrained horizontal flex lists.
              </p>
              <p>
                All gradients are reserved for functional optical physics: atmospheric ambient occlusion, 1px specular rim lighting, and chromatic lensing, interpolating strictly in modern perceptual color spaces (<code className="text-xs font-mono text-foreground">linear-gradient(in oklch, ...)</code>) to eliminate muddy sRGB gray midpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: The 11 Codified Design Engineering Invariants */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Chapter III
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            The Eleven Codified Invariants
          </h2>
          <p className="text-sm text-muted-foreground">
            Strict engineering directives enforced across every component, primitive, and fixture harness in this codebase.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              num: "01",
              title: "Physical Yield on pointerdown",
              formula: "active:scale-[0.98] · transition: tactile spring",
              body: "Interactive controls must compress the millisecond pointerdown occurs. Never wait for click (pointer release).",
            },
            {
              num: "02",
              title: "Zero Cumulative Layout Shifts (CLS = 0.000)",
              formula: "Dynamic states frozen: border-width, font-weight, margin, padding",
              body: "Never change border width or font weight on hover or active states. Selection is conveyed purely via contrast, background indicator pills, or opacity. Animate exclusively compositor properties (transform, opacity).",
            },
            {
              num: "03",
              title: "Tabular Numeral Invariant",
              formula: "font-variant-numeric: tabular-nums",
              body: "All metrics, countdown timers, financial figures, data table columns, and meters must specify tabular numerals to lock digit bounding boxes.",
            },
            {
              num: "04",
              title: "Accessible Landmark Invariant",
              formula: "WCAG 2.2 Level AA / AAA · 44px hit-slop target expansion",
              body: "Every icon-only control must declare an explicit aria-label. Dialogs must trap focus, maintain inert guards, and dismiss on Escape.",
            },
            {
              num: "05",
              title: "Quiet Chrome Doctrine",
              formula: "Spatial baseline rhythm > Nested card borders",
              body: "Rely first on spatial rhythm, typographic contrast, and baseline alignment. Reject recursive card nesting.",
            },
            {
              num: "06",
              title: "Concentric Corner Radii Invariant",
              formula: "R_inner = max(0, R_outer - Padding)",
              body: "When nesting rounded surfaces, the inner radius must mathematically deduct padding to eliminate bulging, deformed corners.",
            },
            {
              num: "07",
              title: "Navigation Anti-Truncation & Bounded Allocation",
              formula: "shrink-0 whitespace-nowrap · W_col ≥ 220px · @container/nav",
              body: "Navigation labels, menu items, and pills must never truncate primary text. Horizontal navigation bars must enforce bounded allocation (maxVisibleItems) with automatic 'More ▾' overflow harvesting.",
            },
            {
              num: "08",
              title: "Reversible Kinetic Affordances (No Gimmick Icon Animation)",
              formula: "Static operational glyphs (+, -, ✓, →) · Reversible mechanical glides",
              body: "Icons only animate if they possess a reversible mechanical glide that returns to origin. Strictly ban spinning operational icons and stroke erasure gimmicks.",
            },
            {
              num: "09",
              title: "Dimension Invariants & Absolute Basis Collapse Defense",
              formula: "w-[...] basis in position: absolute · Symmetric optical margins",
              body: "Never merge multi-axis shorthands (size-full) after single-axis variant sizes. Floating popovers inside absolute auto-width parents must declare an explicit structural width base (w-[660px] sm:w-[720px]) paired with a viewport cap (max-w-[calc(100vw-2.5rem)]) to prevent min-content collapse.",
            },
            {
              num: "10",
              title: "Component-Unified Kinetic Affinity",
              formula: "pointer-events-none on nested SVG paths · group-hover affinity",
              body: "Icons inside components are intrinsic organs, not isolated targets. Hovering or pressing any part of the component triggers the icon's kinetic affordance synchronously.",
            },
            {
              num: "11",
              title: "Perceptual Gradient Engineering & Dual-Engine Contrast",
              formula: "linear-gradient(in oklch, ...) · WCAG 2.2 AA (4.5:1) + APCA (|Lc| ≥ 60/75)",
              body: "Zero saturated text clipping. All gradient ramps interpolate in OKLCH perceptual space. High-luminance hues mandate negative-polarity obsidian text.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-5 rounded-xl border border-border/70 bg-card/40 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-primary">
                    Directive #{item.num}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.title}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {item.formula}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Part 4: Epilogue & Single Interactive Return CTA */}
      <footer className="pt-8 border-t border-border/60 text-center space-y-6">
        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-foreground">
            Experience the Living Design System
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every one of the 37 headless primitives and 470+ kinetic icons in this repository operates strictly under these invariants.
          </p>
        </div>

        <div>
          <Button
            size="lg"
            variant="default"
            onClick={onBackToWorkbench}
            className="gap-2.5 px-6 shadow-sm"
          >
            <span>Explore Interactive Workbench</span>
            <ArrowRightIcon size={15} />
          </Button>
        </div>
      </footer>
    </article>
  );
}
