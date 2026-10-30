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
          &ldquo;When we align the interface to the way we think and move, something magical happens: it stops feeling like a computer and starts feeling like a seamless extension of us.&rdquo;
        </blockquote>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs font-mono text-muted-foreground">
          <span className="text-foreground font-semibold">Version 0.1 (Working Draft)</span>
          <span className="text-border">&bull;</span>
          <span>Human-Centric Architecture</span>
          <span className="text-border">&bull;</span>
          <span>Kinetic Truth</span>
          <span className="text-border">&bull;</span>
          <span>Eleven Core Invariants</span>
          <span className="text-border">&bull;</span>
          <span>Five Philosophical Pillars</span>
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
            Generative systems frequently assemble user interfaces defensively, calculating the statistical median of the internet: generic card grids, screaming accent badges, and rigid linear transitions that halt abruptly like a stalled engine.
          </p>
          <p>
            This is visual assembly, not design. True design lives at the disciplined intersection of human psychology, physical mechanics, and visual restraint. Software is not merely an abstraction over data; it is a sensory environment where people spend hours creating, communicating, and thinking.
          </p>
          <p>
            Every primitive in this system is shaped by negative constraints: deliberate boundaries against synthetic tropes, balanced by principles of geometric harmony, structural stability, and immediate physical resonance.
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
                In the physical universe, objects possess weight and inertia. Nothing appears instantaneously without momentum, and nothing halts abruptly at a fixed linear velocity. We reject artificial linear timing in favor of natural spring dynamics governed by mass, tension, and damping.
              </p>
              <p>
                When you strike a piano key or press a camera shutter, the mechanism yields beneath your fingertip the exact moment pressure begins. Controls must respond immediately upon contact, acknowledging touch without waiting for release.
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
                Software is an exhibition gallery for human thought, not an amusement park. We resist the impulse to enclose every piece of information within a bordered container. Recursive card nesting creates visual noise that distracts from core content.
              </p>
              <p>
                We prioritise spatial rhythm, typographic hierarchy, optical alignment, and subtle hairline separators. Interface chrome steps back quietly so the user&rsquo;s work takes centre stage.
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
                Typographic Permanence &amp; Temporal Rhythm
              </h3>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
              <p>
                Typography provides structural architecture. Headings carry their own weight and natural authority through optical scale and careful tracking, without decorative eyebrow kickers.
              </p>
              <p>
                Numbers must never jitter or dance. In metrics, timers, gauges, and tables, changing digits occupy uniform character widths, ensuring layout baselines remain rock-solid as values update in real time.
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
                Software should offer calm reassurance to the nervous system. We never ambush people with irreversible consequences or interrupt their flow with jarring confirmation modals for routine tasks.
              </p>
              <p>
                Significant operations provide clear, non-blocking undo affordances. A dignified interface respects human agency, accommodates natural mistakes, and preserves creative momentum.
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
                The Anti-Slop Conviction &amp; Calibrated Taste
              </h3>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed pl-7">
              <p>
                Autonomous systems require thoughtful negative constraints to avoid predictable boilerplate. We ban synthetic neon gradient text, spinning operational icons, and cramped, overcrowded horizontal layouts.
              </p>
              <p>
                Gradients serve natural optical physics: soft atmospheric occlusion, subtle specular rim lighting, and chromatic lensing, blending smoothly through modern perceptual colour spaces that eliminate muddy midtones.
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
            Universal design engineering directives enforced across every surface and primitive in this system.
          </p>
        </div>

        <div className="divide-y divide-border/40">
          {[
            {
              num: "01",
              title: "Immediate Yield on Touch Contact",
              concept: "Instant Tactile Compression",
              body: "Interactive controls yield the millisecond physical pressure begins. Sensory feedback responds to touch contact immediately rather than waiting for release.",
            },
            {
              num: "02",
              title: "Absolute Geometric Stability",
              concept: "Zero Layout Shift",
              body: "Interactive feedback must never alter element dimensions, borders, or font weights. Visual changes occur strictly through contrast, luminance, and hardware-accelerated transforms.",
            },
            {
              num: "03",
              title: "Temporal Numeral Stability",
              concept: "Locked Character Widths",
              body: "All metrics, countdown timers, financial figures, and data columns maintain locked, uniform character widths so fluctuating values update without horizontal jitter.",
            },
            {
              num: "04",
              title: "Universal Accessibility & Ergonomics",
              concept: "Generous Hit Surfaces",
              body: "Every interactive control provides clear programmatic descriptions and generous hit targets. Overlays preserve logical focus boundaries and dismiss fluidly with standard gestures.",
            },
            {
              num: "05",
              title: "Quiet Chrome & Restrained Hierarchy",
              concept: "Spatial Breathing Room",
              body: "Spatial rhythm and typographic contrast take precedence over nested card boxes. Headings carry their own authority without decorative kickers, and pills are reserved strictly for active operational telemetry.",
            },
            {
              num: "06",
              title: "Concentric Optical Curvature",
              concept: "Harmonic Corner Geometry",
              body: "When nesting rounded surfaces, interior corner curves deduct surrounding padding so outlines remain optically parallel and concentric rather than deformed.",
            },
            {
              num: "07",
              title: "Adaptive Layouts & Unbroken Titles",
              concept: "Guaranteed Legibility",
              body: "Primary titles and navigation items must never truncate or clip essential text. Dense navigation bars adapt gracefully by grouping secondary destinations into clean overflow menus.",
            },
            {
              num: "08",
              title: "Reversible Kinetic Affordances",
              concept: "Mechanical Integrity",
              body: "Icons and glyphs move only to reflect reversible mechanical states that return cleanly to their resting origin. Symmetrical symbols and status icons remain calm and stable.",
            },
            {
              num: "09",
              title: "Bounded Boundaries for Floating Surfaces",
              concept: "Explicit Dimensional Bases",
              body: "Floating menus, dropdowns, and flyout overlays must establish definite structural boundaries to prevent content from collapsing into narrow single-word columns.",
            },
            {
              num: "10",
              title: "Unified Component Affinity",
              concept: "Holistic Surface Feedback",
              body: "Embedded icons and indicators belong organically to their parent component. Engaging any portion of the interactive surface triggers cohesive, synchronised sensory feedback.",
            },
            {
              num: "11",
              title: "Perceptual Colour Harmony & Dual Contrast",
              concept: "Perceptual Colour Spaces",
              body: "Colour ramps blend smoothly through modern perceptual spaces to eliminate muddy grey midpoints, maintaining rigorous visual contrast across light and dark environments.",
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
                  {item.concept}
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
            Every headless primitive, kinetic component, and visual token in this system embodies these core tenets.
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
