import * as React from "react";
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
  VolumeIcon,
  ServerIcon,
  CpuIcon,
  TerminalIcon,
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
import { CopyButton } from "@/components/ui/copy-button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsList,
  TabsIndicator,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
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
  const [rangeValues, setRangeValues] = React.useState<number[]>([25, 75]);
  const [switchNotifications, setSwitchNotifications] = React.useState(true);
  const [switchLayoutShift, setSwitchLayoutShift] = React.useState(true);
  const [checkbox1, setCheckbox1] = React.useState(true);
  const [checkbox2, setCheckbox2] = React.useState(false);
  const [checkboxIndeterminate, setCheckboxIndeterminate] = React.useState<boolean | "indeterminate">("indeterminate");
  const [emailValue, setEmailValue] = React.useState("team@acme");
  const [notesValue, setNotesValue] = React.useState("Tactile pointerdown yield and zero layout shift on all interactive surfaces.");
  const [menuShowStatus, setMenuShowStatus] = React.useState(true);
  const [menuShowActivity, setMenuShowActivity] = React.useState(false);
  const [menuFrequency, setMenuFrequency] = React.useState("realtime");
  const [tabsVariant, setTabsVariant] = React.useState<"default" | "pills" | "line">("default");

  const clusterNodes = React.useMemo(() => [
    {
      id: "edge-us-east-01",
      region: "us-east (N. Virginia)",
      status: "healthy",
      statusVariant: "outline" as const,
      cpu: 24.8,
      memory: "3.2 / 16 GB",
      latency: 18.4,
      qps: 4210,
    },
    {
      id: "edge-us-west-02",
      region: "us-west (Oregon)",
      status: "healthy",
      statusVariant: "outline" as const,
      cpu: 38.2,
      memory: "5.7 / 16 GB",
      latency: 29.1,
      qps: 3890,
    },
    {
      id: "edge-eu-central-01",
      region: "eu-central (Frankfurt)",
      status: "syncing",
      statusVariant: "secondary" as const,
      cpu: 72.4,
      memory: "11.8 / 16 GB",
      latency: 58.7,
      qps: 6140,
    },
    {
      id: "edge-ap-southeast-01",
      region: "ap-southeast (Singapore)",
      status: "healthy",
      statusVariant: "outline" as const,
      cpu: 19.5,
      memory: "2.8 / 16 GB",
      latency: 89.2,
      qps: 2750,
    },
    {
      id: "edge-sa-east-01",
      region: "sa-east (São Paulo)",
      status: "degraded",
      statusVariant: "destructive" as const,
      cpu: 91.6,
      memory: "14.9 / 16 GB",
      latency: 172.5,
      qps: 1205,
    },
  ], []);

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
                    <CopyButton
                      variant="pill"
                      value="sk_live_98a44b91280f210f"
                      idleText="Copy API Token"
                      copiedText="Copied!"
                      copied={isCopied}
                      onCopiedChange={setIsCopied}
                    />
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

                {/* Fluid Sliders Spectrum */}
                <div className="flex flex-col gap-5 pt-1">
                  {/* Single Fluid Slider with Presets & Live Tooltip */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <VolumeIcon size={15} className="text-muted-foreground" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Haptic Volume
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Interactive Presets */}
                        <div className="flex items-center gap-1">
                          {[0, 25, 50, 75, 100].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setSliderValue(preset)}
                              className={cn(
                                "text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded-md transition-colors border select-none cursor-pointer",
                                sliderValue === preset
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {preset}%
                            </button>
                          ))}
                        </div>
                        <span className="text-xs font-mono tabular-nums text-foreground font-semibold min-w-8 text-right">
                          {sliderValue}%
                        </span>
                      </div>
                    </div>

                    <Slider
                      value={sliderValue}
                      onValueChange={(val) => setSliderValue(val as number)}
                      min={0}
                      max={100}
                      step={1}
                      valueSuffix="%"
                      showTooltip
                      aria-label="Haptic sensitivity"
                    />
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                      <span>0% (Silent)</span>
                      <span className="text-muted-foreground/60">Hover or scrub thumb for animated pill</span>
                      <span>100% (Maximum)</span>
                    </div>
                  </div>

                  {/* Dual Thumb Range Slider */}
                  <div className="flex flex-col gap-2.5 pt-2 border-t border-border/40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Frequency Bandwidth Range
                      </span>
                      <span className="text-xs font-mono tabular-nums text-foreground font-semibold">
                        {rangeValues[0]}Hz – {rangeValues[1]}Hz
                      </span>
                    </div>

                    <Slider
                      value={rangeValues}
                      onValueChange={(val) => setRangeValues(val as number[])}
                      min={0}
                      max={100}
                      step={1}
                      valueSuffix="Hz"
                      showTooltip
                      aria-label="Frequency bandwidth range"
                    />
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                      <span>0Hz (Sub-bass)</span>
                      <span>100Hz (Upper treble)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Overlays & Floating Surfaces (Batch 3) */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <LayersIcon size={16} />
              Overlays & Floating Surfaces (Batch 3)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Apple HIG spring physics · Trigger-anchored origins · Strict Escape & outside-click parity · Concentric corner radii
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column 1: Modals, Alerts & Sheets */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    Directive #4 & #6
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Focus Trap · Escape Parity
                  </span>
                </div>
                <CardTitle className="mt-2">Modals, Confirmations & Drawers</CardTitle>
                <CardDescription>
                  Full focus trapping, smooth backdrop blur, 1px specular lighting, and fluid spring entrance/exit.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-wrap items-center gap-3">
                {/* 1. Standard Modal Dialog */}
                <Dialog>
                  <DialogTrigger render={<Button variant="default" />}>
                    Open Standard Dialog
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Configure Deployment Target</DialogTitle>
                      <DialogDescription>
                        Set up custom environment variables and cluster regions for your automated deployments.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 px-6 py-2">
                      <Field>
                        <FieldLabel>Environment Name</FieldLabel>
                        <Input defaultValue="production-edge" placeholder="e.g. staging" />
                      </Field>
                      <Field>
                        <FieldLabel optional>Cluster Region</FieldLabel>
                        <Input defaultValue="us-east-va-1" placeholder="e.g. eu-west-1" />
                        <FieldDescription>Low-latency edge nodes will be provisioned in this region.</FieldDescription>
                      </Field>
                    </div>

                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>
                        Cancel
                      </DialogClose>
                      <DialogClose render={<Button variant="default" />}>
                        Save Configuration
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* 2. Destructive Alert Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="destructive" />}>
                    Delete Project
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely certain?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your cluster database, purge all DNS cache records, and revoke active auth tokens.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction variant="destructive">
                        Confirm Deletion
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* 3. Slide-Over Sheet */}
                <Sheet>
                  <SheetTrigger render={<Button variant="secondary" />}>
                    Open Side Sheet
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Audit Logs & Telemetry</SheetTitle>
                      <SheetDescription>
                        Real-time streaming event bus metrics from edge clusters.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col gap-3 px-6 py-4 overflow-y-auto grow">
                      <CardInner className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground">Worker Spawned</span>
                          <span className="font-mono tabular-nums text-muted-foreground">12:48:02</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Node worker <code className="font-mono text-primary">#1492</code> started on cluster <code className="font-mono">us-east-va-1</code>.
                        </p>
                      </CardInner>

                      <CardInner className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Health Check 200 OK</span>
                          <span className="font-mono tabular-nums text-muted-foreground">12:47:58</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Latency: <span className="font-mono tabular-nums font-semibold text-foreground">14ms</span> across 18 edge locations.
                        </p>
                      </CardInner>
                    </div>

                    <SheetFooter>
                      <SheetClose render={<Button variant="outline" className="w-full sm:w-auto" />}>
                        Dismiss
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>

            {/* Column 2: Menus, Popovers & Tooltips */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm">
                    Directive #1 & #8
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Trigger-Anchored Origin
                  </span>
                </div>
                <CardTitle className="mt-2">Menus, Popovers & Micro Tooltips</CardTitle>
                <CardDescription>
                  Submenus, keyboard navigation, collision detection, and zero-shift shortcut indicators.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-wrap items-center gap-3">
                {/* 1. Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="outline" />}>
                    Project Options
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <SparklesIcon size={14} />
                      <span>Generate AI Release</span>
                      <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CopyIcon size={14} />
                      <span>Copy Webhook URL</span>
                      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>View Options</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={menuShowStatus}
                      onCheckedChange={(c) => setMenuShowStatus(Boolean(c))}
                    >
                      Show Live Status
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={menuShowActivity}
                      onCheckedChange={(c) => setMenuShowActivity(Boolean(c))}
                    >
                      Show Latency Graph
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuSeparator />

                    {/* Submenu */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <ActivityIcon size={14} />
                        <span>Telemetry Rate</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-40">
                        <DropdownMenuRadioGroup value={menuFrequency} onValueChange={setMenuFrequency}>
                          <DropdownMenuRadioItem value="realtime">
                            Real-time (1s)
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="5s">
                            Throttled (5s)
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="paused">
                            Paused
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem variant="destructive">
                      <Trash2Icon size={14} />
                      <span>Archive Project</span>
                      <DropdownMenuShortcut>⇧⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* 2. Interactive Popover */}
                <Popover>
                  <PopoverTrigger render={<Button variant="secondary" />}>
                    API Keys
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="start">
                    <PopoverHeader>
                      <PopoverTitle>Production Key</PopoverTitle>
                      <PopoverDescription>
                        Use this key in your Authorization bearer header.
                      </PopoverDescription>
                    </PopoverHeader>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/40 border border-border/60">
                        <span className="font-mono text-xs tabular-nums select-all truncate text-foreground">
                          pk_live_79a29fb4839...
                        </span>
                        <CopyButton
                          size="sm"
                          variant="ghost"
                          value="pk_live_79a29fb4839c01824ef78"
                          idleText="Copy"
                          copiedText="Copied"
                          className="shrink-0"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Never expose secret keys on public client bundles.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* 3. Micro Tooltips with TooltipProvider */}
                <TooltipProvider delay={150}>
                  <div className="flex items-center gap-1.5 pl-2 border-l border-border/60">
                    <Tooltip>
                      <TooltipTrigger render={<Button size="icon" variant="ghost" aria-label="Quick deploy" />}>
                        <ZapIcon size={16} />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Instant Edge Deploy (⌘D)
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger render={<Button size="icon" variant="ghost" aria-label="Security status" />}>
                        <ShieldCheckIcon size={16} />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        SOC2 Compliance Verified
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger render={<Button size="icon" variant="ghost" aria-label="Telemetry settings" />}>
                        <SlidersHorizontalIcon size={16} />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Adjust Telemetry Thresholds
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 7: Navigation, Structure & Data Display (Batch 4) */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <ServerIcon size={16} />
              Navigation, Structure & Data Display (Batch 4)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Apple HIG fluid tabs with zero glyphic twitching, Base UI CSS height accordion with concealed focus, and quiet data tables with tabular numerals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* 1. Fluid Tabs */}
            <Card className="h-full">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TerminalIcon size={16} />
                    Fluid Tabs & Morphing Indicator
                  </CardTitle>
                  <CardDescription>
                    Base UI Tabs with spring indicator glide & locked font-medium (0px layout shift).
                  </CardDescription>
                </div>
                <SegmentedControl
                  value={tabsVariant}
                  onValueChange={(v) => setTabsVariant(v as "default" | "pills" | "line")}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <SegmentedControlItem value="default">Card</SegmentedControlItem>
                  <SegmentedControlItem value="pills">Pills</SegmentedControlItem>
                  <SegmentedControlItem value="line">Line</SegmentedControlItem>
                </SegmentedControl>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList variant={tabsVariant} className="w-full sm:w-auto">
                    <TabsIndicator variant={tabsVariant} />
                    <TabsTrigger value="overview" variant={tabsVariant}>Overview</TabsTrigger>
                    <TabsTrigger value="logs" variant={tabsVariant}>Deploy Logs</TabsTrigger>
                    <TabsTrigger value="telemetry" variant={tabsVariant}>Edge Routing</TabsTrigger>
                  </TabsList>

                  <div className="relative grid grid-cols-1 w-full mt-3">
                    <TabsContent value="overview">
                      <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">Cluster Health</span>
                          <Badge variant="outline" className="border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                            99.99% Uptime
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div className="p-2.5 rounded-lg border border-border/30 bg-card/60">
                            <p className="text-[11px] text-muted-foreground">Avg Latency</p>
                            <p className="text-base font-semibold font-mono tabular-nums text-foreground mt-0.5">24.2 ms</p>
                          </div>
                          <div className="p-2.5 rounded-lg border border-border/30 bg-card/60">
                            <p className="text-[11px] text-muted-foreground">Edge QPS</p>
                            <p className="text-base font-semibold font-mono tabular-nums text-foreground mt-0.5">18,195</p>
                          </div>
                          <div className="p-2.5 rounded-lg border border-border/30 bg-card/60">
                            <p className="text-[11px] text-muted-foreground">Active Nodes</p>
                            <p className="text-base font-semibold font-mono tabular-nums text-foreground mt-0.5">48 / 48</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                          Tab transitions lock glyph bounding boxes to ensure switching tabs causes zero reflow or horizontal jitter.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="logs">
                      <div className="p-3.5 rounded-xl border border-border/40 bg-zinc-950 font-mono text-xs text-zinc-300 flex flex-col gap-2">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                          <span className="text-[11px] text-zinc-500">release-v2.4.0 · edge-deployment.log</span>
                          <CopyButton
                            size="sm"
                            variant="ghost"
                            value="[2026-10-27T17:50:00Z] Worker initialized in 12ms. Cluster routes synced."
                            idleText="Copy Log"
                            copiedText="Copied"
                            className="h-6 text-[10px] text-zinc-400 hover:text-white"
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-[11px] leading-relaxed pt-1">
                          <p className="text-emerald-400">[17:50:01] ✓ Verified cryptographic signatures (SHA-256)</p>
                          <p className="text-zinc-400">[17:50:02] → Hydrating Edge workers across 5 regions</p>
                          <p className="text-zinc-400">[17:50:03] → Routing table distributed (18.4ms avg propagation)</p>
                          <p className="text-emerald-400 font-semibold">[17:50:04] ✓ Healthcheck green. 0 errors detected.</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="telemetry">
                      <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-foreground">Traffic Distribution</span>
                          <span className="text-xs font-mono tabular-nums text-muted-foreground">Global Anycast</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-[11px] mb-1 text-muted-foreground">
                              <span>North America (us-east/west)</span>
                              <span className="font-mono tabular-nums font-medium text-foreground">58%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "58%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[11px] mb-1 text-muted-foreground">
                              <span>Europe & Middle East (eu-central)</span>
                              <span className="font-mono tabular-nums font-medium text-foreground">27%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-primary/80 rounded-full" style={{ width: "27%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[11px] mb-1 text-muted-foreground">
                              <span>Asia Pacific (ap-southeast)</span>
                              <span className="font-mono tabular-nums font-medium text-foreground">15%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-primary/60 rounded-full" style={{ width: "15%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* 2. Base UI Accordion */}
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheckIcon size={16} />
                  Collapsible Architectural Invariants
                </CardTitle>
                <CardDescription>
                  Base UI Accordion with CSS height transition, concealed focus, & reversible rotating chevrons.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion defaultValue={["invariant-1"]} className="w-full">
                  <AccordionItem value="invariant-1">
                    <AccordionTrigger>
                      Directive 1: Physical Yield on pointerdown
                    </AccordionTrigger>
                    <AccordionContent>
                      Interactive controls must compress (<code className="text-xs bg-muted px-1 py-0.5 rounded">scale(0.97)</code>) the millisecond touch or mouse down occurs. We decouple the outer layout button from inner visual motion so floating positioners maintain absolute 0px stability.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="invariant-2">
                    <AccordionTrigger>
                      Directive 2: Zero Layout Shifts
                    </AccordionTrigger>
                    <AccordionContent>
                      Never change <code className="text-xs bg-muted px-1 py-0.5 rounded">border-width</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">font-weight</code>, or margins across hover or active states. All tabs, segmented toggles, and buttons share constant glyph geometry to prevent micro-twitching.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="invariant-3">
                    <AccordionTrigger>
                      Directive 6: Concentric Corner Radii Math
                    </AccordionTrigger>
                    <AccordionContent>
                      When nesting rounded elements, inner radius is strictly computed as <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">R_inner = max(0, R_outer - Padding)</code>. This completely eliminates the amateur bulging look of unmatched corners.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="invariant-4">
                    <AccordionTrigger>
                      Directive 7: Concealed Interactive Focus (inert)
                    </AccordionTrigger>
                    <AccordionContent>
                      Collapsed panels, drawers, and accordions automatically exclude hidden elements from keyboard navigation sequence. Screen readers and tab keys never get trapped in invisible zero-height regions.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* 3. Quiet Table Chrome & Tabular Data Display */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CpuIcon size={16} />
                    Global Edge Nodes & Infrastructure Telemetry
                  </CardTitle>
                  <CardDescription>
                    High-density data table with strict tabular numerals (<code className="text-xs font-mono">tabular-nums</code>) and quiet border chrome.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-mono tabular-nums">
                    5 Active Nodes
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableCaption>
                  Synchronized across 5 edge clusters · High availability active-active multi-region topology
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Node Identifier</TableHead>
                    <TableHead>Region & Zone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead numeric>CPU Load</TableHead>
                    <TableHead numeric>Memory</TableHead>
                    <TableHead numeric>Edge Latency</TableHead>
                    <TableHead numeric>Throughput</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clusterNodes.map((node) => (
                    <TableRow key={node.id}>
                      <TableCell className="font-mono text-xs font-semibold">
                        {node.id}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {node.region}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={node.statusVariant}
                          className={cn(
                            "text-[11px] capitalize",
                            node.status === "healthy" && "border-emerald-500/40 text-emerald-500 bg-emerald-500/10",
                            node.status === "syncing" && "border-amber-500/40 text-amber-500 bg-amber-500/10",
                            node.status === "degraded" && "border-rose-500/40 text-rose-500 bg-rose-500/10"
                          )}
                        >
                          {node.status}
                        </Badge>
                      </TableCell>
                      <TableCell numeric>
                        <span className={cn(
                          node.cpu > 80 ? "text-rose-500 font-semibold" : "text-foreground"
                        )}>
                          {node.cpu.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell numeric className="text-muted-foreground">
                        {node.memory}
                      </TableCell>
                      <TableCell numeric>
                        <span className="font-medium text-foreground">{node.latency.toFixed(1)}</span>
                        <span className="text-[10px] text-muted-foreground ml-0.5">ms</span>
                      </TableCell>
                      <TableCell numeric className="text-foreground">
                        {node.qps.toLocaleString()} <span className="text-[10px] text-muted-foreground">qps</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="text-xs font-medium">
                      Aggregate Telemetry (5 Nodes Online)
                    </TableCell>
                    <TableCell numeric className="text-xs font-mono font-medium">
                      {(clusterNodes.reduce((acc, n) => acc + n.cpu, 0) / clusterNodes.length).toFixed(1)}% avg
                    </TableCell>
                    <TableCell numeric className="text-xs font-mono font-medium text-muted-foreground">
                      37.7 / 80 GB
                    </TableCell>
                    <TableCell numeric className="text-xs font-mono font-medium">
                      {(clusterNodes.reduce((acc, n) => acc + n.latency, 0) / clusterNodes.length).toFixed(1)} ms
                    </TableCell>
                    <TableCell numeric className="text-xs font-mono font-medium">
                      {clusterNodes.reduce((acc, n) => acc + n.qps, 0).toLocaleString()} qps
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
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
