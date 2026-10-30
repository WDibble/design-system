"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Slider,
  useToast,
} from "@/components/ui";
import {
  ZapIcon,
  ShieldCheckIcon,
  ActivityIcon,
  EyeIcon,
  CompassIcon,
  SlidersHorizontalIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  BookTextIcon,
  FeatherIcon,
} from "@/components/icons";
import { springs } from "@/tokens/motion";
import { cn } from "@/lib/utils";

export interface PrinciplesPageProps {
  onBackToWorkbench?: () => void;
}

export function PrinciplesPage({ onBackToWorkbench }: PrinciplesPageProps) {
  const { toast } = useToast();

  // Interactive Demo 1: Concentric Corner Radii Playground
  const [outerRadius, setOuterRadius] = React.useState(24);
  const [padding, setPadding] = React.useState(8);
  const [useConcentric, setUseConcentric] = React.useState(true);
  const innerRadius = useConcentric
    ? Math.max(0, outerRadius - padding)
    : outerRadius;

  // Interactive Demo 2: Tabular vs Proportional Numbers
  const [isTabular, setIsTabular] = React.useState(true);
  const [tickerValue, setTickerValue] = React.useState(19482.05);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTickerValue((prev) => {
        const delta = (Math.random() - 0.48) * 14.5;
        return Number(Math.max(10000, prev + delta).toFixed(2));
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Interactive Demo 3: Zero Layout Shift Tabs vs Naive Tabs
  const [zeroShiftTab, setZeroShiftTab] = React.useState("analytics");
  const [naiveTab, setNaiveTab] = React.useState("analytics");

  // Interactive Demo 4: Tactile Pointerdown Micro-Yield
  const [pointerDownCount, setPointerDownCount] = React.useState(0);
  const [clickCount, setClickCount] = React.useState(0);
  const [lastYieldLatency, setLastYieldLatency] = React.useState<number | null>(null);
  const pointerDownTimeRef = React.useRef<number | null>(null);

  const handlePointerDownTest = () => {
    pointerDownTimeRef.current = performance.now();
    setPointerDownCount((c) => c + 1);
  };

  const handleClickTest = () => {
    if (pointerDownTimeRef.current !== null) {
      const latency = Math.round(performance.now() - pointerDownTimeRef.current);
      setLastYieldLatency(latency);
    }
    setClickCount((c) => c + 1);
  };

  const handleSimulateDestructiveAction = () => {
    toast({
      title: "Cluster configuration removed",
      description: "Restoration token active for 10 seconds.",
      type: "default",
      undoLabel: "Undo",
      undoAction: () => {
        toast({
          title: "Action reversed",
          description: "Cluster configuration restored to memory.",
          type: "success",
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-16 py-4 animate-in fade-in duration-300">
      {/* Top Header & Breadcrumb Navigation */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToWorkbench}
            className="gap-2 text-muted-foreground hover:text-foreground -ml-2 rounded-lg"
          >
            <ChevronLeftIcon size={16} />
            <span>Back to Interactive Workbench</span>
          </Button>

          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm" className="font-mono text-[10px]">
              PHILOSOPHY.md
            </Badge>
            <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
              AGENTS.md
            </Badge>
            <Badge variant="default" size="sm" className="text-[10px]">
              Living Manifesto
            </Badge>
          </div>
        </div>

        {/* Hero Title Block */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold tracking-wide uppercase">
            <CompassIcon size={14} />
            <span>The Human Sensory Manifesto</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            The Art of Human Software.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Generative AI models calculate the average of the internet: neon blue-to-purple gradients, generic 3-card grids, shouting section eyebrows, and spinning plus icons. We reject the robotic average. Software is not merely data entry—it is a living sensory environment built on physical intuition, typographic harmony, and emotional dignity.
          </p>
        </div>

        {/* Key Philosophy Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl border border-border/70 bg-card/50 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-medium">Tactile Feedback</span>
            <span className="text-xl font-bold font-mono tabular-nums text-foreground">0ms Delay</span>
            <span className="text-[11px] text-muted-foreground">Compresses on pointerdown</span>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card/50 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-medium">Cumulative Shift</span>
            <span className="text-xl font-bold font-mono tabular-nums text-foreground">CLS = 0.000</span>
            <span className="text-[11px] text-muted-foreground">Locked fonts & dimensions</span>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card/50 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-medium">Dual Contrast</span>
            <span className="text-xl font-bold font-mono tabular-nums text-foreground">AA &bull; |Lc| &ge; 60</span>
            <span className="text-[11px] text-muted-foreground">WCAG 2.2 + WCAG 3 APCA</span>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card/50 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-medium">Operational Icons</span>
            <span className="text-xl font-bold font-mono tabular-nums text-foreground">100% Static</span>
            <span className="text-[11px] text-muted-foreground">No circular spin gimmicks</span>
          </div>
        </div>
      </div>

      <hr className="border-border/60" />

      {/* SECTION 1: The Five Philosophical Pillars */}
      <section className="flex flex-col gap-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <BookTextIcon size={22} className="text-primary" />
            The Five Core Pillars
          </h2>
          <p className="text-sm text-muted-foreground">
            The philosophical grounding that separates intentional design engineering from synthetic layout assembly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Kinetic Truth */}
          <Card className="rounded-2xl border-border/80 flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                  Tenet 01
                </Badge>
                <ActivityIcon size={18} className="text-primary" />
              </div>
              <CardTitle className="text-lg">Kinetic Truth & Physical Yield</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                In the physical universe, objects have mass, inertia, and momentum. When you strike a Steinway piano or Leica shutter, the mechanism yields beneath your fingertip the exact millisecond pressure occurs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Interactive Yield Laboratory</span>
                  <span className="text-muted-foreground font-mono tabular-nums">
                    {lastYieldLatency ? `${lastYieldLatency}ms release delta` : "Press to test"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onPointerDown={handlePointerDownTest}
                    onClick={handleClickTest}
                  >
                    <span>Press Me (Yields on Down)</span>
                  </Button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono tabular-nums pt-1 border-t border-border/40">
                  <span>Down Events: {pointerDownCount}</span>
                  <span>Release Events: {clickCount}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Directive #1: Waiting for <code>click</code> (pointer release) delays tactile acknowledgement by 100–250ms, betraying human touch.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 2: Quiet Chrome */}
          <Card className="rounded-2xl border-border/80 flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                  Tenet 02
                </Badge>
                <EyeIcon size={18} className="text-primary" />
              </div>
              <CardTitle className="text-lg">Radical Restraint (Quiet Chrome)</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Software is a gallery for human work, not an amusement park. We reject the lazy reflex of boxing every piece of text inside a bordered card. Rely first on spatial rhythm and baseline typography.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-foreground">Spatial Baseline Hierarchy</div>
                  <div className="text-[11px] text-muted-foreground">Whitespace as deliberate architectural boundary</div>
                </div>
                <div className="p-3 rounded-lg bg-background/80 border border-border/50 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-foreground">Deployment Pipeline</div>
                    <div className="text-[11px] text-muted-foreground font-mono">us-east-1 &bull; production</div>
                  </div>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                    Operational
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Directive #5: When chrome is silent, user content takes the center stage.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 3: Typographic Rhythm & Tabular Permanence */}
          <Card className="rounded-2xl border-border/80 flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                  Tenet 03
                </Badge>
                <SlidersHorizontalIcon size={18} className="text-primary" />
              </div>
              <CardTitle className="text-lg">Typographic Rhythm & Tabular Permanence</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Numbers must never jitter or dance horizontally. In financial tables, timers, tickers, and meters, changing digits must occupy uniform glyph widths.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">Live Ticker Comparison</span>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setIsTabular(!isTabular)}
                    className="h-6 text-[10px] font-mono"
                  >
                    {isTabular ? "Mode: tabular-nums" : "Mode: proportional"}
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-background/80 border border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Portfolio Liquidity</span>
                  <span
                    className={cn(
                      "text-sm font-semibold text-foreground",
                      isTabular ? "font-mono tabular-nums" : "font-sans"
                    )}
                  >
                    ${tickerValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Directive #3: Every metric, price, and counter must enforce <code>tabular-nums</code>.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 4: Emotional Dignity & Forgiving Interfaces */}
          <Card className="rounded-2xl border-border/80 flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                  Tenet 04
                </Badge>
                <ShieldCheckIcon size={18} className="text-primary" />
              </div>
              <CardTitle className="text-lg">Emotional Dignity & Forgiving States</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Interfaces should grant calm reassurance to the human nervous system. Never surprise users with unrecoverable operations; replace intrusive modal warnings with fluid undo toasts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Undo-Driven State Machine</span>
                  <span className="text-[10px] font-mono text-muted-foreground">Non-blocking safety</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  fullWidth
                  onClick={handleSimulateDestructiveAction}
                >
                  Simulate Destructive Action (Undo Toast)
                </Button>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Tenet #4: Dignified software assumes intelligence and offers gracious reversibility.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <hr className="border-border/60" />

      {/* SECTION 2: Interactive Engineering Invariant Playgrounds */}
      <section className="flex flex-col gap-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <ZapIcon size={22} className="text-amber-500" />
            Interactive Engineering Invariants
          </h2>
          <p className="text-sm text-muted-foreground">
            Test and verify the physical rules that eliminate visual awkwardness and cumulative layout shift.
          </p>
        </div>

        {/* Invariant Playground A: Concentric Corner Radii */}
        <Card className="rounded-2xl border-border/80">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                  Directive #6
                </Badge>
                <CardTitle className="text-base sm:text-lg">
                  Concentric Corner Radii Invariant
                </CardTitle>
              </div>
              <CardDescription>
                When nesting rounded surfaces, inner radius must obey:{" "}
                <code className="text-primary font-mono text-xs">
                  R_inner = max(0, R_outer - Padding)
                </code>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant={useConcentric ? "default" : "outline"}
                size="sm"
                onClick={() => setUseConcentric(!useConcentric)}
                className="text-xs h-8"
              >
                {useConcentric ? "Concentric (Active)" : "Uniform (Broken)"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visualizer Canvas */}
            <div className="lg:col-span-6 flex items-center justify-center p-8 rounded-xl bg-muted/20 border border-border/50">
              <div
                style={{
                  borderRadius: `${outerRadius}px`,
                  padding: `${padding}px`,
                }}
                className="w-full max-w-[280px] bg-muted border-2 border-primary/40 shadow-md transition-all duration-200"
              >
                <div
                  style={{
                    borderRadius: `${innerRadius}px`,
                  }}
                  className="w-full h-32 bg-card border border-border/80 flex flex-col items-center justify-center text-center p-3 transition-all duration-200 shadow-xs"
                >
                  <span className="text-xs font-semibold text-foreground">
                    Inner Surface
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground mt-1">
                    R_inner = {innerRadius}px
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    R_outer = {outerRadius}px &bull; P = {padding}px
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Outer Radius (R_outer)</span>
                  <span className="font-mono tabular-nums text-muted-foreground">{outerRadius}px</span>
                </div>
                <Slider
                  min={8}
                  max={40}
                  step={1}
                  value={outerRadius}
                  onValueChange={(val) => setOuterRadius(Array.isArray(val) ? val[0] : val)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Padding (P)</span>
                  <span className="font-mono tabular-nums text-muted-foreground">{padding}px</span>
                </div>
                <Slider
                  min={2}
                  max={24}
                  step={1}
                  value={padding}
                  onValueChange={(val) => setPadding(Array.isArray(val) ? val[0] : val)}
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 text-xs text-muted-foreground leading-relaxed">
                {useConcentric ? (
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                    ✓ Mathematically concentric: The margin between inner and outer border remains perfectly uniform along both axes and curvature bends.
                  </span>
                ) : (
                  <span className="text-destructive font-medium">
                    ✕ Broken uniform radius: Notice how the inner corner bulges lumpily into the padding because R_inner equals R_outer without padding deduction.
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invariant Playground B: Zero Layout Shift Tabs */}
        <Card className="rounded-2xl border-border/80">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                Directive #2
              </Badge>
              <CardTitle className="text-base sm:text-lg">
                Zero Layout Shift Invariant
              </CardTitle>
            </div>
            <CardDescription>
              Never change font-weight, tracking, or border-width across active or hover states. Font-weight switches alter glyph widths and cause horizontal layout twitching.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stabilized Design System Implementation */}
            <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  ✓ Stabilized (Design System)
                </span>
                <Badge variant="outline" size="sm" className="text-[10px] font-mono border-emerald-500/30">
                  CLS = 0.00
                </Badge>
              </div>

              <div className="relative inline-flex p-1 bg-muted rounded-lg select-none">
                {["analytics", "settings", "deployments"].map((tab) => {
                  const isSelected = zeroShiftTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setZeroShiftTab(tab)}
                      className={cn(
                        "relative px-3 py-1 text-xs font-medium rounded-md outline-none transition-colors duration-150 cursor-pointer capitalize",
                        isSelected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="stabilized-tab-indicator"
                          transition={springs.snappy}
                          className="absolute inset-0 bg-background rounded-md shadow-xs"
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Font weight stays frozen at <code>font-medium</code>. Active state is conveyed purely via high-contrast background pill and spring motion.
              </p>
            </div>

            {/* Naive Layout-Shifting Anti-Pattern */}
            <div className="p-5 rounded-xl border border-destructive/30 bg-destructive/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-destructive">
                  ✕ Naive Anti-Pattern (Font-Weight Shift)
                </span>
                <Badge variant="destructive" size="sm" className="text-[10px] font-mono">
                  Horizontal Twitching
                </Badge>
              </div>

              <div className="inline-flex p-1 bg-muted rounded-lg select-none">
                {["analytics", "settings", "deployments"].map((tab) => {
                  const isSelected = naiveTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setNaiveTab(tab)}
                      className={cn(
                        "px-3 py-1 text-xs rounded-md outline-none capitalize transition-all",
                        isSelected
                          ? "font-bold text-foreground bg-background shadow-xs"
                          : "font-normal text-muted-foreground"
                      )}
                    >
                      <span>{tab}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Clicking switches from <code>font-normal</code> to <code>font-bold</code>. Because bold glyphs are wider, surrounding tabs twitch and shift position.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <hr className="border-border/60" />

      {/* SECTION 3: The 11 Non-Negotiable Directives Grid */}
      <section className="flex flex-col gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <FeatherIcon size={22} className="text-primary" />
            The Eleven Non-Negotiable Directives
          </h2>
          <p className="text-sm text-muted-foreground">
            Codified rules enforced across every component, layout, and interaction in this codebase.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              num: "01",
              title: "Physical Yield on pointerdown",
              desc: "Interactive controls compress (scale 0.97 to 0.98) the exact millisecond touch or mouse down occurs. Never wait for pointer release (click).",
              rule: "active:scale-[0.98]",
            },
            {
              num: "02",
              title: "Zero Layout Shifts",
              desc: "Dynamic states (hover, focus, active, selected) never change border-width, font-weight, margin, or padding. Animate exclusively compositor properties.",
              rule: "CLS = 0.000 Invariant",
            },
            {
              num: "03",
              title: "Tabular Numerals",
              desc: "All counters, prices, timestamps, metrics, and data tables declare font-variant-numeric: tabular-nums to prevent horizontal digit jitter.",
              rule: "font-mono tabular-nums",
            },
            {
              num: "04",
              title: "Accessible Invariants",
              desc: "100% WCAG 2.2 Level AA / AAA. Every icon-only button carries an explicit aria-label. Dialogs trap focus, maintain guards, and dismiss on Escape.",
              rule: "aria-label & Focus Trap",
            },
            {
              num: "05",
              title: "Quiet Chrome",
              desc: "Avoid the lazy reflex of boxing everything into bordered cards. Rely first on spatial rhythm, typographic hierarchy, and baseline optical alignment.",
              rule: "Whitespace as Architecture",
            },
            {
              num: "06",
              title: "Concentric Corner Radii",
              desc: "Nested rounded surfaces compute their inner curve mathematically: R_inner = max(0, R_outer - Padding) to eliminate bulging, deformed corners.",
              rule: "R_inner = R_outer - P",
            },
            {
              num: "07",
              title: "Anti-Crush & Anti-Truncation",
              desc: "All status badges declare shrink-0 whitespace-nowrap. Navigation menus and dropdown items must NEVER truncate primary link titles (W_col ≥ 220px).",
              rule: "whitespace-nowrap font-semibold",
            },
            {
              num: "08",
              title: "Reversible Kinetic Affordances",
              desc: "Strictly ban gimmick animations: never spin operational symmetrical icons (+, -). Icons animate only if they possess a reversible mechanical glide.",
              rule: "Operational Glyphs Static",
            },
            {
              num: "09",
              title: "Dimension Invariants & Symmetry",
              desc: "Never merge multi-axis shorthand utilities (size-full, p-0) after single-axis variant sizes. Demo preview frames must maintain symmetric optical margins.",
              rule: "Atomic Collision Defense",
            },
            {
              num: "10",
              title: "Component-Unified Kinetic Affinity",
              desc: "Icons inside buttons and triggers trigger synchronously when hovering or pressing ANY part of the component (group-hover / group-active).",
              rule: "pointer-events-none SVGs",
            },
            {
              num: "11",
              title: "Perceptual Gradient & APCA Contrast",
              desc: "Zero neon gradient-clipped text. All gradient ramps interpolate in oklch color spaces. Interactive controls achieve |Lc| ≥ 60 and reading text |Lc| ≥ 75.",
              rule: "linear-gradient(in oklch)",
            },
          ].map((directive) => (
            <div
              key={directive.num}
              className="p-5 rounded-xl border border-border/70 bg-card/60 flex flex-col justify-between gap-3 shadow-2xs hover:border-border transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">
                    Directive #{directive.num}
                  </span>
                  <Badge variant="outline" size="sm" className="font-mono text-[9px] py-0 px-1.5">
                    {directive.rule}
                  </Badge>
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {directive.title}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {directive.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border/60" />

      {/* Footer Return CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-border/80 bg-muted/20">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-base font-semibold text-foreground">
            Experience the Living Implementation
          </div>
          <p className="text-xs text-muted-foreground">
            Every one of our 37 primitives and 470+ icons embodies these principles in real-time.
          </p>
        </div>
        <Button
          variant="default"
          size="default"
          onClick={onBackToWorkbench}
          className="gap-2 shrink-0"
        >
          <span>Explore Interactive Workbench</span>
          <ArrowRightIcon size={14} />
        </Button>
      </div>
    </div>
  );
}
