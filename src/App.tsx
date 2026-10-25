import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Moon,
  Sun,
  ArrowRight,
  Trash2,
  Check,
  Send,
  Plus,
  Minus,
  SlidersHorizontal,
  Layers,
  ShieldCheck,
  Eye,
  Activity,
  Zap,
  Copy,
} from "lucide-react";
import { Button, type ButtonState } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardInner,
} from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { springs } from "@/tokens/motion";
import { disableTransitionsTemporarily } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function App() {
  const [isDark, setIsDark] = React.useState(false);
  const [asyncBtnState, setAsyncBtnState] = React.useState<ButtonState>("idle");
  const [isCopied, setIsCopied] = React.useState(false);
  const [metric, setMetric] = React.useState(14820.75);

  const toggleTheme = () => {
    const restore = disableTransitionsTemporarily();
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
    restore();
  };

  const handleCopy = () => {
    if (isCopied) return;
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  // Full kinetic narrative: Idle -> Loading -> Success -> Idle
  const handleDeployFlow = () => {
    if (asyncBtnState !== "idle") return;
    setAsyncBtnState("loading");

    setTimeout(() => {
      setAsyncBtnState("success");
      setMetric((m) => +(m + 420.5).toFixed(2));

      setTimeout(() => {
        setAsyncBtnState("idle");
      }, 1800);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        {/* Top Navigation / Header */}
        <header className="flex items-center justify-between border-b border-border/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">Design System</h1>
                <Badge variant="outline" size="sm" dot>
                  Kinetic Transitions
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Living State Narratives · Apple HIG Motion Physics · OKLCH Semantic Tokens
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </header>

        {/* Feature Spotlight: The 5 Kinetic State Mechanics */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Zap className="size-4 text-amber-500" />
              Kinetic Storytelling (Living State Transitions)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Components maintain continuous physical momentum between states rather than abruptly snapping.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Spotlight 1: Full Async Feedback Loop */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    State Morph 01
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Idle ➔ Load ➔ Success ➔ Restore
                  </span>
                </div>
                <CardTitle className="mt-2">The Async Feedback Loop</CardTitle>
                <CardDescription>
                  Click the button below to witness the complete kinetic loop: press compression, loading spinner, affirmative spring checkmark, and auto-settle back to idle.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <CardInner className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Pipeline Status
                      </p>
                      <p className="text-sm font-semibold font-mono mt-0.5">
                        production-edge-01
                      </p>
                    </div>

                    <Badge
                      variant={
                        asyncBtnState === "success"
                          ? "success"
                          : asyncBtnState === "loading"
                          ? "secondary"
                          : "outline"
                      }
                      size="sm"
                      dot
                    >
                      {asyncBtnState === "idle"
                        ? "Ready"
                        : asyncBtnState === "loading"
                        ? "Deploying"
                        : "Active"}
                    </Badge>
                  </div>

                  <Button
                    state={asyncBtnState}
                    variant="default"
                    className="w-full mt-1"
                    onClick={handleDeployFlow}
                    loadingText="Deploying to Edge..."
                    successText="Deployed to Edge!"
                    rightIcon={<ArrowRight className="size-4" />}
                  >
                    Deploy to Edge
                  </Button>
                </CardInner>
              </CardContent>

              <CardFooter className="justify-between text-xs text-muted-foreground border-t border-border/40 pt-4">
                <span>Zero UI pop toasts required</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Self-Contained Feedback
                </span>
              </CardFooter>
            </Card>

            {/* Spotlight 2: The Rolling Odometer Number Ticker */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    State Morph 02
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Spring Digit Rolling
                  </span>
                </div>
                <CardTitle className="mt-2">Rolling Odometer Ticker</CardTitle>
                <CardDescription>
                  When numbers change, individual digit columns roll along the Y-axis using spring physics. Zero horizontal jitter or layout shift.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <CardInner className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="size-3.5 text-primary" />
                      Live Balance Ticker
                    </p>
                    <div className="text-3xl font-bold font-mono tracking-tight mt-1">
                      <NumberTicker value={metric} prefix="$" decimalPlaces={2} />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-8"
                      onClick={() => setMetric((m) => +(m + 150.25).toFixed(2))}
                      aria-label="Increment balance"
                    >
                      <Plus className="size-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="size-8"
                      onClick={() => setMetric((m) => Math.max(0, +(m - 150.25).toFixed(2)))}
                      aria-label="Decrement balance"
                    >
                      <Minus className="size-3.5" />
                    </Button>
                  </div>
                </CardInner>
              </CardContent>

              <CardFooter className="justify-between text-xs text-muted-foreground border-t border-border/40 pt-4">
                <span>Tabular-nums: stable width guaranteed</span>
                <span className="font-mono text-primary font-medium">
                  springs.snappy
                </span>
              </CardFooter>
            </Card>

            {/* Spotlight 3: The Squishy Fluid Morph */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    State Morph 03
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    springs.squishy
                  </span>
                </div>
                <CardTitle className="mt-2">Squishy Fluid Morph</CardTitle>
                <CardDescription>
                  Click to watch the wide button collapse into a compact pill with an underdamped elastic bounce (FLIP GPU projection).
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <CardInner className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Live API Secret
                      </p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">
                        sk_live_98a…210f
                      </p>
                    </div>
                    <Badge variant="outline" size="sm">
                      Read Only
                    </Badge>
                  </div>

                  <div className="flex justify-center pt-1">
                    <motion.button
                      layout
                      transition={springs.squishy}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleCopy}
                      type="button"
                      className={cn(
                        "relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 select-none shrink-0 shadow-xs",
                        isCopied
                          ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                          : "border border-border/80 bg-card text-foreground hover:bg-muted"
                      )}
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        {isCopied ? (
                          <motion.span
                            key="copied"
                            layout="position"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={springs.micro}
                            className="inline-flex items-center gap-1.5"
                          >
                            <Check className="size-4 stroke-[2.5]" />
                            <span>Copied!</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            layout="position"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={springs.micro}
                            className="inline-flex items-center gap-2"
                          >
                            <Copy className="size-4" />
                            <span>Copy API Token</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </CardInner>
              </CardContent>

              <CardFooter className="justify-between text-xs text-muted-foreground border-t border-border/40 pt-4">
                <span>FLIP transform: scale() projection</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  Zero Glyph Distortion
                </span>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Section 2: Complete Button Spectrum */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="size-4" />
              Button Variants & Kinetic Icon Intent
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Directional action icons glide 2px forward on hover with spring rebound.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Variant & Sizing Hierarchy</CardTitle>
              <CardDescription>
                Asymmetric horizontal padding, specular rim highlights, and 44px touch targets on icon buttons.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              {/* Row 1: All Variants */}
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default" rightIcon={<ArrowRight className="size-4" />}>
                  Primary CTA
                </Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="outline">Outline Specular</Button>
                <Button variant="destructive" leftIcon={<Trash2 className="size-4" />}>
                  Destructive
                </Button>
                <Button variant="ghost">Ghost Trigger</Button>
                <Button variant="link">Inline Anchor</Button>
              </div>

              {/* Row 2: Sizing Scale & Icon Touch Target */}
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (32px)</Button>
                <Button size="default">Default (36px)</Button>
                <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                  Large CTA (40px)
                </Button>

                <div className="h-6 w-px bg-border/60 mx-1" aria-hidden="true" />

                <Button size="icon" variant="default" aria-label="Confirm item">
                  <Check className="size-4" />
                </Button>
                <Button size="icon" variant="outline" aria-label="Send message">
                  <Send className="size-4" />
                </Button>
                <Button size="icon" variant="secondary" aria-label="Adjust settings">
                  <SlidersHorizontal className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Badges Spectrum */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Badge Spectrum & Status Indicators
            </h2>
          </div>

          <Card>
            <CardContent className="pt-6 flex flex-wrap items-center gap-3">
              <Badge variant="default">Default Pill</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline Specular</Badge>
              <Badge variant="success" dot>
                Live Production
              </Badge>
              <Badge variant="destructive" dot>
                Incident Active
              </Badge>
              <Badge variant="outline" size="sm">
                COUNT: 4,892
              </Badge>
              <Badge variant="secondary" size="sm">
                v1.9.0
              </Badge>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: Concentric Radii Card & Physical Lighting */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Eye className="size-4" />
              Concentric Corner Radii Invariant
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Testing the mathematical invariant: R_inner = max(0, R_outer - Padding).
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" size="sm">
                  Directive #6
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  R_out=16px · P=8px · R_in=8px
                </span>
              </div>
              <CardTitle className="mt-2">Concentric Geometric Continuity</CardTitle>
              <CardDescription>
                Outer card is rounded-2xl (16px). Inner nested card is rounded-lg (8px) with 8px padding. Corners share the same origin, eliminating lumpy, bulging corners.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <CardInner className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Concentric Nested Card
                  </p>
                  <p className="text-sm font-medium mt-0.5">
                    Smooth uniform optical padding across all four quadrants.
                  </p>
                </div>
                <Badge variant="outline" size="sm">
                  100% Parallel
                </Badge>
              </CardInner>
            </CardContent>

            <CardFooter className="justify-between text-xs text-muted-foreground border-t border-border/40 pt-4">
              <span>Quiet Chrome Doctrine: No card-in-card visual bloat</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                Verified Invariant
              </span>
            </CardFooter>
          </Card>
        </section>

        {/* Micro Footer */}
        <footer className="border-t border-border/60 pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© Design System · Human-Centric & Agent-Native Standard</p>
          <p className="font-mono">React 19 · Base UI · Motion · Tailwind CSS v4</p>
        </footer>
      </div>
    </div>
  );
}
