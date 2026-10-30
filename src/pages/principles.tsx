import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";

export interface PrinciplesPageProps {
  onBackToWorkbench?: () => void;
}

export function PrinciplesPage({ onBackToWorkbench }: PrinciplesPageProps) {
  return (
    <article className="max-w-3xl mx-auto space-y-16 py-6 sm:py-10 text-foreground animate-in fade-in duration-300">
      {/* Editorial Hero Header */}
      <header className="space-y-6 text-center sm:text-left border-b border-border/50 pb-10">
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

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs font-mono text-muted-foreground">
          <span>PHILOSOPHY.md</span>
          <span className="text-border">&bull;</span>
          <span>AGENTS.md</span>
          <span className="text-border">&bull;</span>
          <span>11 Non-Negotiable Directives</span>
          <span className="text-border">&bull;</span>
          <span>5 Core Tenets</span>
        </div>
      </header>

      {/* Part 1: The Human Sensory Manifesto */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-border/40 pb-4">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Chapter I
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Beyond the Robotic Average
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-border/40 pb-4">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Chapter II
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            The Five Philosophical Pillars
          </h2>
          <p className="text-sm text-muted-foreground">
            The foundational truths that guide every interaction, animation, and pixel hierarchy.
          </p>
        </div>

        <div className="divide-y divide-border/40">
          {/* Tenet 1 */}
          <div className="py-8 first:pt-2 last:pb-0 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono font-bold text-primary tracking-wider">
                01
              </span>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                The Law of Physicality (Kinetic Truth)
              </h3>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
              <p>
                In the real universe, no physical object teleports. Nothing appears from a mathematical zero without momentum, and nothing stops at a fixed linear velocity. We reject arbitrary duration timers (<code className="text-xs font-mono text-foreground">300ms ease-in-out</code>) in favor of calibrated physical springs with mass, stiffness, and damping.
              </p>
              <p>
                When you press a key on a Steinway piano or the shutter on a Leica camera, the mechanism yields beneath your fingertip the exact millisecond pressure occurs. Interactive controls must compress on <strong className="text-foreground font-medium">pointerdown</strong> (<code className="text-xs font-mono text-foreground">scale(0.98)</code>). Waiting for <code className="text-xs font-mono text-foreground">click</code> (pointer release) delays tactile acknowledgment by 100&ndash;250ms, betraying human touch.
              </p>
            </div>
          </div>

          {/* Tenet 2 */}
          <div className="py-8 last:pb-0 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono font-bold text-primary tracking-wider">
                02
              </span>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                The Discipline of Radical Restraint (Quiet Chrome)
              </h3>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
              <p>
                Software is a gallery for human work, not an amusement park. We reject the lazy reflex of boxing every piece of text inside a bordered card. Card-in-card nesting produces visual clutter and suffocates content.
              </p>
              <p>
                We rely first on spatial rhythm, typographic hierarchy, optical alignment, and subtle 1px hairline rules. Chrome steps back into the shadows so the user&rsquo;s content can breathe.
              </p>
            </div>
          </div>

          {/* Tenet 3 */}
          <div className="py-8 last:pb-0 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono font-bold text-primary tracking-wider">
                03
              </span>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                Typographic Permanence &amp; Tabular Rhythm
              </h3>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
              <p>
                Typography is structural architecture. We eliminate screaming, hyper-saturated kicker eyebrows above headings. Headings possess natural gravitas through weight, tracking, and optical scale.
              </p>
              <p>
                Numbers must never dance. In data tables, timers, countdown tickers, financial metrics, and meters, changing digits must occupy uniform glyph widths (<code className="text-xs font-mono text-foreground">font-variant-numeric: tabular-nums</code>). Zero horizontal line jittering.
              </p>
            </div>
          </div>

          {/* Tenet 4 */}
          <div className="py-8 last:pb-0 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono font-bold text-primary tracking-wider">
                04
              </span>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                Emotional Dignity &amp; Forgiving States
              </h3>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
              <p>
                Software must grant calm reassurance to the human nervous system. We never ambush the user with irreversible operations or interrupt their workflow with jarring, modal confirmation traps for routine tasks.
              </p>
              <p>
                Destructive operations are paired with non-blocking, fluid undo toasts. Dignified interfaces respect human agency, forgive honest mistakes, and preserve velocity.
              </p>
            </div>
          </div>

          {/* Tenet 5 */}
          <div className="py-8 last:pb-0 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-mono font-bold text-primary tracking-wider">
                05
              </span>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                The Anti-Slop Conviction &amp; Machine Taste
              </h3>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
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
        <div className="space-y-2 border-b border-border/40 pb-5">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Chapter III
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            The Eleven Codified Invariants
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Strict engineering directives enforced across every component, primitive, and fixture harness in this codebase.
          </p>
        </div>

        <div className="divide-y divide-border/40">
          {[
            {
              num: "01",
              title: "Physical Yield on pointerdown",
              formula: "active:scale-[0.98] · tactile spring",
              body: "Interactive controls must compress the millisecond touch or mouse down occurs. Tactile acknowledgment must never wait for click (pointer release).",
            },
            {
              num: "02",
              title: "Zero Cumulative Layout Shifts",
              formula: "CLS = 0.000 · frozen dynamic geometry",
              body: "Never alter border-width, font-weight, margin, or padding across dynamic states. Selection is conveyed purely via contrast, background indicators, or opacity. Animate exclusively compositor properties (transform, opacity).",
            },
            {
              num: "03",
              title: "Tabular Numeral Invariant",
              formula: "font-variant-numeric: tabular-nums",
              body: "All metrics, countdown timers, financial figures, data table columns, and meters must specify tabular numerals to lock digit bounding boxes and eliminate horizontal jitter.",
            },
            {
              num: "04",
              title: "Accessible Landmark Invariant",
              formula: "WCAG 2.2 Level AA · 44px hit-slop expansion",
              body: "Every icon-only control must declare an explicit aria-label. Dialogs must trap focus, maintain inert guards, and dismiss on Escape.",
            },
            {
              num: "05",
              title: "Quiet Chrome & Anti-Pill Proliferation",
              formula: "Spatial rhythm > Nested cards & decorative pills",
              body: "Rely first on spatial baseline rhythm and typographic contrast. Strictly ban decorative eyebrow pills above headings and cosmetic chips. Badges are reserved for functional operational telemetry.",
            },
            {
              num: "06",
              title: "Concentric Corner Radii",
              formula: "R_inner = max(0, R_outer - Padding)",
              body: "When nesting rounded surfaces, the inner radius must mathematically deduct padding to eliminate bulging, deformed corners.",
            },
            {
              num: "07",
              title: "Navigation Anti-Truncation & Bounded Allocation",
              formula: "shrink-0 whitespace-nowrap · @container/nav",
              body: "Navigation labels, menu items, and pills must never truncate primary text. Horizontal navigation bars must enforce bounded allocation (maxVisibleItems) with automatic 'More ▾' overflow harvesting.",
            },
            {
              num: "08",
              title: "Reversible Kinetic Affordances",
              formula: "Static operational glyphs · Mechanical glides",
              body: "Icons only animate if they possess a reversible mechanical glide that returns to origin. Strictly ban spinning operational icons (+, -) and stroke erasure gimmicks.",
            },
            {
              num: "09",
              title: "Dimension Invariants & Basis Collapse Defense",
              formula: "w-[...] basis in position: absolute",
              body: "Never merge multi-axis shorthands (size-full) after single-axis variant sizes. Floating popovers in auto-width parents must declare an explicit width basis paired with a viewport cap.",
            },
            {
              num: "10",
              title: "Component-Unified Kinetic Affinity",
              formula: "pointer-events-none on SVG · group-hover affinity",
              body: "Icons inside components are intrinsic organs, not isolated targets. Hovering or pressing any part of the parent component triggers kinetic affordances synchronously.",
            },
            {
              num: "11",
              title: "Perceptual Gradient Engineering & Dual-Engine Contrast",
              formula: "linear-gradient(in oklch, ...) · WCAG 2.2 + APCA",
              body: "Zero saturated text clipping. All gradient ramps interpolate in OKLCH perceptual space. High-luminance hues mandate negative-polarity obsidian text.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="py-8 first:pt-4 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start"
            >
              <div className="md:col-span-5 space-y-1.5">
                <div className="text-xs font-mono font-bold text-primary tracking-wider">
                  Directive #{item.num}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-muted-foreground/80 leading-relaxed pt-0.5">
                  {item.formula}
                </div>
              </div>
              <div className="md:col-span-7 md:pt-1">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 4: Epilogue & Single Interactive Return CTA */}
      <footer className="pt-10 border-t border-border/50 text-center space-y-6">
        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            Experience the Living Design System
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
