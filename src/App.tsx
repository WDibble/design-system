import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  SparklesIcon,
  MoonIcon,
  SunIcon,
  ArrowRightIcon,
  Trash2Icon,
  CheckIcon,
  SendIcon,
  SlidersHorizontalIcon,
  LayersIcon,
  ShieldCheckIcon,
  EyeIcon,
  ActivityIcon,
  ZapIcon,
  CopyIcon,
  SearchIcon,
  BadgeAlertIcon,
} from "@/components/icons";
import { Button, type ButtonState, type IconAnimationTrigger } from "@/components/ui/button";
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
import { Stepper } from "@/components/ui/stepper";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { springs } from "@/tokens/motion";
import { disableTransitionsTemporarily } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function App() {
  const [isDark, setIsDark] = React.useState(false);
  const [asyncBtnState, setAsyncBtnState] = React.useState<ButtonState>("idle");
  const [isCopied, setIsCopied] = React.useState(false);
  const [metric, setMetric] = React.useState(14820.75);
  const [quantity, setQuantity] = React.useState(3);
  const [iconTriggerMode, setIconTriggerMode] = React.useState<IconAnimationTrigger>("hover");
  const [sliderValue, setSliderValue] = React.useState(68);
  const [switchNotifications, setSwitchNotifications] = React.useState(true);
  const [switchLayoutShift, setSwitchLayoutShift] = React.useState(true);
  const [checkbox1, setCheckbox1] = React.useState(true);
  const [checkbox2, setCheckbox2] = React.useState(false);
  const [checkboxIndeterminate, setCheckboxIndeterminate] = React.useState<boolean | "indeterminate">("indeterminate");
  const [emailValue, setEmailValue] = React.useState("team@acme");
  const [notesValue, setNotesValue] = React.useState("Tactile pointerdown yield and zero layout shift on all interactive surfaces.");

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
      <div className="w-full max-w-6xl flex flex-col gap-10">
        {/* Top Navigation / Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-xs shrink-0">
              <SparklesIcon size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">Design System</h1>
                <Badge variant="outline" size="sm" dot>
                  Kinetic Transitions
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate sm:text-clip">
                Living State Narratives · Apple HIG Motion Physics · OKLCH Semantic Tokens
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="icon"
              iconTrigger="press"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            </Button>
          </div>
        </header>

        {/* Feature Spotlight: The 5 Kinetic State Mechanics */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <ZapIcon size={16} className="text-amber-500" />
              Kinetic Storytelling (Living State Transitions)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Components maintain continuous physical momentum between states rather than abruptly snapping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Spotlight 1: Full Async Feedback Loop */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="outline" size="sm">
                    State Morph 01
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Idle ➔ Load ➔ Success
                  </span>
                </div>
                <CardTitle className="mt-2">The Async Feedback Loop</CardTitle>
                <CardDescription>
                  Click the button below to witness the complete kinetic loop: press compression, loading spinner, affirmative spring checkmark, and auto-settle back to idle.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <CardInner className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Pipeline Status
                      </p>
                      <p className="text-sm font-semibold font-mono mt-0.5 truncate">
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
                      className="shrink-0"
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
                    rightIcon={<ArrowRightIcon size={16} />}
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
                <div className="flex flex-wrap items-center justify-between gap-2">
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
                {/* 1. Compound Stepper with Balance Ticker */}
                <CardInner className="flex items-center justify-between gap-3">
                  <Stepper
                    value={metric}
                    onValueChange={setMetric}
                    step={150.25}
                    min={0}
                    prefix="$"
                    decimalPlaces={2}
                    className="w-full flex-wrap sm:flex-nowrap justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <ActivityIcon size={14} className="text-primary inline-flex items-center" />
                        Live Balance Ticker
                      </p>
                      <Stepper.Value className="text-2xl sm:text-3xl font-bold font-mono tracking-tight mt-1" />
                    </div>

                    <Stepper.Controls>
                      <Stepper.Increment aria-label="Increment balance" />
                      <Stepper.Decrement aria-label="Decrement balance" />
                    </Stepper.Controls>
                  </Stepper>
                </CardInner>

                {/* 2. Plug & Play Stepper */}
                <CardInner className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Plug & Play Stepper
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Hold to accelerate · Auto boundary lock
                    </p>
                  </div>
                  <Stepper
                    value={quantity}
                    onValueChange={setQuantity}
                    min={1}
                    max={20}
                    step={1}
                    className="shrink-0"
                  />
                </CardInner>
              </CardContent>

              <CardFooter className="justify-between text-xs text-muted-foreground border-t border-border/40 pt-4">
                <span>Hold +/− to accelerate smoothly</span>
                <span className="font-mono text-primary font-medium">
                  springs.snappy
                </span>
              </CardFooter>
            </Card>

            {/* Spotlight 3: The Squishy Fluid Morph */}
            <Card className="md:col-span-2 xl:col-span-1">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
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
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Live API Secret
                      </p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5 truncate">
                        sk_live_98a…210f
                      </p>
                    </div>
                    <Badge variant="outline" size="sm" className="shrink-0">
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
                            <CheckIcon size={16} />
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
                            <CopyIcon size={16} />
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
              <LayersIcon size={16} />
              Button Variants & Kinetic Icon Intent
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Directional action icons powered by pqoqubbw animated icons with hover or press physics.
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle>Variant & Sizing Hierarchy</CardTitle>
                  <CardDescription className="mt-0.5">
                    Toggle trigger mode below to switch animated icon physics between mouse hover and pointerdown press.
                  </CardDescription>
                </div>

                {/* Interactive Icon Trigger Selector (Zero-Layout-Shift Segmented Switch) */}
                <SegmentedControl
                  value={iconTriggerMode}
                  onValueChange={(val) => setIconTriggerMode(val as IconAnimationTrigger)}
                  className="shrink-0"
                >
                  <SegmentedControlItem value="hover">
                    Hover Trigger
                  </SegmentedControlItem>
                  <SegmentedControlItem value="press">
                    Press Trigger (Pointerdown)
                  </SegmentedControlItem>
                </SegmentedControl>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              {/* Row 1: All Variants */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="default"
                  iconTrigger={iconTriggerMode}
                  rightIcon={<ArrowRightIcon size={16} />}
                >
                  Primary CTA
                </Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="outline">Outline Specular</Button>
                <Button
                  variant="destructive"
                  iconTrigger={iconTriggerMode}
                  leftIcon={<Trash2Icon size={16} />}
                >
                  Destructive
                </Button>
                <Button variant="ghost">Ghost Trigger</Button>
                <Button variant="link">Inline Anchor</Button>
              </div>

              {/* Row 2: Sizing Scale & Icon Touch Target */}
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (32px)</Button>
                <Button size="default">Default (36px)</Button>
                <Button
                  size="lg"
                  iconTrigger={iconTriggerMode}
                  rightIcon={<ArrowRightIcon size={18} />}
                >
                  Large CTA (40px)
                </Button>

                <div className="hidden sm:block h-6 w-px bg-border/60 mx-1" aria-hidden="true" />

                <Button
                  size="icon"
                  variant="default"
                  iconTrigger={iconTriggerMode}
                  aria-label="Confirm item"
                >
                  <CheckIcon size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  iconTrigger={iconTriggerMode}
                  aria-label="Send message"
                >
                  <SendIcon size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  iconTrigger={iconTriggerMode}
                  aria-label="Adjust settings"
                >
                  <SlidersHorizontalIcon size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Badges Spectrum */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <ShieldCheckIcon size={16} />
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
              <EyeIcon size={16} />
              Concentric Corner Radii Invariant
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Testing the mathematical invariant: R_inner = max(0, R_outer - Padding).
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
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
              <CardInner className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Concentric Nested Card
                  </p>
                  <p className="text-sm font-medium mt-0.5">
                    Smooth uniform optical padding across all four quadrants.
                  </p>
                </div>
                <Badge variant="outline" size="sm" className="shrink-0">
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

        {/* Section 5: Form & Input Primitives (Batch 2) */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <SlidersHorizontalIcon size={16} />
              Form & Input Primitives (Batch 2)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Headless Base UI composition · 16px iOS zoom prevention · Specular top rims · Fluid continuous tracking
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column 1: Text Fields & Validation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    Directive #2 & #4
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Base UI Field · ARIA Coordination
                  </span>
                </div>
                <CardTitle className="mt-2">Text Inputs & Accessible Fields</CardTitle>
                <CardDescription>
                  Inputs enforce 16px font size on mobile viewports (&lt;640px) to prevent iOS auto-zoom, and feature 1px specular lighting.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-5">
                {/* Search Input with Icon */}
                <Field>
                  <FieldLabel>Repository Search</FieldLabel>
                  <Input
                    leftIcon={<SearchIcon size={16} />}
                    placeholder="Search components, tokens, or skills..."
                  />
                  <FieldDescription>Search across all 470 animated icons and primitives.</FieldDescription>
                </Field>

                {/* Input with Prefix & Suffix */}
                <Field>
                  <FieldLabel optional>Custom Domain</FieldLabel>
                  <Input
                    prefixText="https://"
                    suffixText=".acme.design"
                    placeholder="my-workspace"
                  />
                </Field>

                {/* Input with Base UI Validation Error State */}
                <Field>
                  <FieldLabel requiredIndicator>Work Email</FieldLabel>
                  <Input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    error={!emailValue.includes("@") || !emailValue.includes(".")}
                    placeholder="name@company.com"
                  />
                  {(!emailValue.includes("@") || !emailValue.includes(".")) && (
                    <FieldError>
                      <BadgeAlertIcon size={14} className="shrink-0" />
                      Please enter a valid corporate email address.
                    </FieldError>
                  )}
                  <FieldDescription>We will send your deployment webhook notifications here.</FieldDescription>
                </Field>

                {/* Textarea */}
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel>Commit Description</FieldLabel>
                    <span className="text-xs text-muted-foreground font-mono tabular-nums">
                      {notesValue.length}/140
                    </span>
                  </div>
                  <Textarea
                    rows={3}
                    maxLength={140}
                    value={notesValue}
                    onChange={(e) => setNotesValue(e.target.value)}
                    placeholder="Provide details about the tactile interface enhancements..."
                  />
                </Field>
              </CardContent>
            </Card>

            {/* Column 2: Switches, Checkboxes & Sliders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    Directive #1 & #3
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Apple HIG Spring Easing
                  </span>
                </div>
                <CardTitle className="mt-2">Tactile Switches, Checkboxes & Sliders</CardTitle>
                <CardDescription>
                  44px accessible touch expansion, immediate physical yield on pointerdown, and zero horizontal jitter tabular numerals.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-6">
                {/* Switches Spectrum */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Fluid Switches
                  </span>

                  <label className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border/60 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">Instant Push Notifications</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Active spring compression on thumb press.
                      </span>
                    </div>
                    <Switch
                      checked={switchNotifications}
                      onCheckedChange={setSwitchNotifications}
                      aria-label="Toggle instant push notifications"
                    />
                  </label>

                  <label className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border/60 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">Enforce Zero-Shift Layouts</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Small switch variant (sm).
                      </span>
                    </div>
                    <Switch
                      size="sm"
                      checked={switchLayoutShift}
                      onCheckedChange={setSwitchLayoutShift}
                      aria-label="Toggle strict zero-shift layouts"
                    />
                  </label>
                </div>

                {/* Checkbox Spectrum */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Accessible Checkboxes
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2.5 p-3 rounded-lg border border-border/60 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                      <Checkbox
                        checked={checkbox1}
                        onCheckedChange={(c) => setCheckbox1(Boolean(c))}
                        aria-label="Checked option"
                      />
                      <span className="text-xs font-medium">Checked</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-lg border border-border/60 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                      <Checkbox
                        checked={checkbox2}
                        onCheckedChange={(c) => setCheckbox2(Boolean(c))}
                        aria-label="Unchecked option"
                      />
                      <span className="text-xs font-medium">Unchecked</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-lg border border-border/60 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                      <Checkbox
                        indeterminate={checkboxIndeterminate === "indeterminate"}
                        checked={checkboxIndeterminate === true}
                        onCheckedChange={() => {
                          setCheckboxIndeterminate((prev) => {
                            if (prev === "indeterminate") return true;
                            if (prev === true) return false;
                            return "indeterminate";
                          });
                        }}
                        aria-label="Indeterminate option"
                      />
                      <span className="text-xs font-medium">Indeterminate</span>
                    </label>
                  </div>
                </div>

                {/* Fluid Slider */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Continuous Fluid Slider
                    </span>
                    <span className="text-xs font-mono tabular-nums text-foreground font-semibold">
                      {sliderValue}%
                    </span>
                  </div>

                  <Slider
                    value={sliderValue}
                    onValueChange={(val) => setSliderValue(val as number)}
                    min={0}
                    max={100}
                    step={1}
                    aria-label="Haptic sensitivity"
                  />
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>0% (Quiet)</span>
                    <span>100% (Maximum Haptic)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
