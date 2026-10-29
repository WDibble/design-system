import * as React from "react";
import { IconGallery } from "@/components/demo/icon-gallery";
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
  RotateCCWIcon,
  KeyIcon,
  GaugeIcon,
  UsersIcon,
  PaletteIcon,
  CalendarDaysIcon,
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
import { ToastProvider, useToast } from "@/components/ui/toast";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
} from "@/components/ui/avatar";
import {
  Progress,
  CircularProgress,
} from "@/components/ui/progress";
import { ProgressiveImage } from "@/components/ui/image";
import {
  Calendar,
  DatePicker,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Pagination,
  Sparkline,
  AreaChart,
  BarChart,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ThemeToggle,
  NavigationBar,
  type NavItemConfig,
} from "@/components/ui";
import { disableTransitionsTemporarily, clearInlineThemeStyles } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { ambientGradients, type AmbientGradientKey } from "@/tokens/gradients";
import { ThemeStudio } from "@/components/theme-studio";

function AppContent() {
  const { toast } = useToast();
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [previewMaterial, setPreviewMaterial] = React.useState<"ultra-thin" | "thin" | "regular" | "thick">("regular");
  const [selectedGradient, setSelectedGradient] = React.useState<AmbientGradientKey>("cosmicFusion");
  const [isSimulatingLoading, setIsSimulatingLoading] = React.useState(false);
  const [activeToken, setActiveToken] = React.useState<string | null>("tok_live_981aef83c27d");

  // Section 9: Advanced Primitives State
  const [otpValue, setOtpValue] = React.useState("924715");
  const [otpMask, setOtpMask] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState("gemini-2.5-pro");
  const [progressValue, setProgressValue] = React.useState(74);
  const [isIndeterminateProgress, setIsIndeterminateProgress] = React.useState(false);
  const [imageKey, setImageKey] = React.useState(0);

  // Section 10: Advanced Analytics & Layout Primitives State
  const [calendarDate, setCalendarDate] = React.useState<Date | null>(new Date());
  const [datePickerDate, setDatePickerDate] = React.useState<Date | null>(new Date());
  const [currentPage, setCurrentPage] = React.useState(2);

  const mockTelemetryData = React.useMemo(() => [
    { label: "00:00", value: 42, secondaryValue: 28 },
    { label: "02:00", value: 38, secondaryValue: 25 },
    { label: "04:00", value: 29, secondaryValue: 22 },
    { label: "06:00", value: 45, secondaryValue: 31 },
    { label: "08:00", value: 78, secondaryValue: 54 },
    { label: "10:00", value: 94, secondaryValue: 68 },
    { label: "12:00", value: 88, secondaryValue: 62 },
    { label: "14:00", value: 92, secondaryValue: 65 },
    { label: "16:00", value: 85, secondaryValue: 59 },
    { label: "18:00", value: 72, secondaryValue: 48 },
    { label: "20:00", value: 64, secondaryValue: 42 },
    { label: "22:00", value: 51, secondaryValue: 35 },
  ], []);

  const mockBarData = React.useMemo(() => [
    { label: "Mon", value: 420 },
    { label: "Tue", value: 680 },
    { label: "Wed", value: 890 },
    { label: "Thu", value: 810 },
    { label: "Fri", value: 950 },
    { label: "Sat", value: 540 },
    { label: "Sun", value: 380 },
  ], []);

  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  React.useEffect(() => {
    // Purge any stale inline style properties on mount so stylesheets cleanly control :root and .dark
    clearInlineThemeStyles();
  }, []);
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

  const demoNavItems: NavItemConfig[] = React.useMemo(
    () => [
      {
        label: "Platform",
        type: "mega",
        badge: "v2.0",
        featured: {
          title: "Liquid Glass Materials",
          description: "Real-time physical shaders with chromatic lensing & specular rims.",
          href: "#spatial-materials",
          badge: "Highlight",
        },
        links: [
          {
            title: "UI Primitives",
            description: "37 accessible compound components",
            href: "#primitives",
            icon: <LayersIcon size={16} />,
            badge: "37 Primitives",
          },
          {
            title: "Kinetic Icons",
            description: "470+ icons with reversible physics",
            href: "#icons-spectrum",
            icon: <SparklesIcon size={16} />,
            badge: "470+",
          },
          {
            title: "Motion Physics",
            description: "Apple HIG spring dynamics with pointerdown yield",
            href: "#buttons",
            icon: <ActivityIcon size={16} />,
          },
          {
            title: "Theme Studio",
            description: "OKLCH dual-engine WCAG 2.2 color tokens",
            href: "#theme-studio",
            icon: <PaletteIcon size={16} />,
          },
        ],
      },
      {
        label: "Resources",
        type: "columns",
        columns: [
          {
            category: "Developers",
            links: [
              {
                title: "CLI & Registry",
                description: "Copy-paste primitives into any project",
                href: "#cli",
                icon: <TerminalIcon size={16} />,
              },
              {
                title: "Compound Patterns",
                description: "Headless Base UI composition",
                href: "#docs",
                icon: <CpuIcon size={16} />,
              },
              {
                title: "Fluid Layouts",
                description: "Anti-crush container queries & safe bounds",
                href: "#layout",
                icon: <SlidersHorizontalIcon size={16} />,
              },
            ],
          },
          {
            category: "Manifesto & Safety",
            links: [
              {
                title: "Quiet Chrome",
                description: "Human-centric spatial typography",
                href: "#philosophy",
                icon: <EyeIcon size={16} />,
              },
              {
                title: "Accessibility Matrix",
                description: "WCAG 2.2 AA & APCA contrast invariants",
                href: "#a11y",
                icon: <ShieldCheckIcon size={16} />,
              },
              {
                title: "System Telemetry",
                description: "Real-time performance & zero CLS",
                href: "#telemetry",
                icon: <ServerIcon size={16} />,
              },
            ],
          },
        ],
      },
      {
        label: "Ecosystem",
        type: "simple",
        links: [
          {
            title: "Design Principles",
            description: "Anti-slop design engineering manifesto",
            href: "#manifesto",
            icon: <ZapIcon size={16} />,
          },
          {
            title: "Team Permissions",
            description: "Role-based access & telemetry controls",
            href: "#teams",
            icon: <UsersIcon size={16} />,
          },
          {
            title: "Changelog",
            description: "Release v0.9.4 with turnkey navbars",
            href: "#changelog",
            icon: <RotateCCWIcon size={16} />,
            badge: "v0.9.4",
          },
        ],
      },
      {
        label: "Docs",
        href: "#documentation",
      },
      {
        label: "Pricing",
        href: "#pricing",
        badge: "Open Source",
      },
    ],
    []
  );

  const toggleTheme = (targetDark?: boolean) => {
    const restore = disableTransitionsTemporarily();
    setIsDark((prev) => {
      const next = targetDark !== undefined ? targetDark : !prev;
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
      {/* Skip to Main Content Link (WCAG 2.2 Level AA Landmark Invariant) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <div className="w-full max-w-6xl flex flex-col gap-10">
        {/* Sticky Floating Liquid Glass Header */}
        <header role="banner" className="sticky top-4 z-40 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-regular specular-rim shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-xs shrink-0">
              <SparklesIcon size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">Design System</h1>
                <Badge variant="outline" size="sm" dot>
                  v0.1.0 · Spatial Engine
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate sm:text-clip">
                Apple Spatial Materials · Liquid Glass Navigation · Headless Base UI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Studio Drawer Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.dispatchEvent(new CustomEvent("open-theme-studio"))}
              aria-label="Open Theme Studio (⌘T)"
              className="gap-1.5 h-9 px-3 rounded-xl border-border/60 bg-muted/40 hover:bg-muted/70"
            >
              <PaletteIcon size={14} className="text-primary" />
              <span className="hidden sm:inline text-xs font-medium">Themes</span>
              <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/80 border border-border/40 text-muted-foreground">
                ⌘T
              </kbd>
            </Button>

            {/* Quick Command Palette Trigger (Detail #3 & #4) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCommandOpen(true)}
              className="gap-2 h-9 px-3 rounded-xl border-border/60 bg-muted/40 hover:bg-muted/70"
            >
              <SearchIcon size={14} className="opacity-70" />
              <span className="hidden sm:inline text-xs text-muted-foreground font-normal">Command</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/80 border border-border/40 text-muted-foreground">
                ⌘K
              </kbd>
            </Button>

            <ThemeToggle
              isDark={isDark}
              onToggleDark={(next) => toggleTheme(next)}
              className="rounded-xl border-border/60"
            />
          </div>
        </header>

        {/* Main Content Landmark */}
        <main id="main-content" tabIndex={-1} className="flex flex-col gap-10 outline-none">
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
              {/* Row 1: All 9 Variants */}
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
                <Button variant="glass">Liquid Glass</Button>
                <Button
                  variant="destructive"
                  iconTrigger={iconTriggerMode}
                  leftIcon={<Trash2Icon size={16} />}
                >
                  Destructive
                </Button>
                <Button variant="warning">Warning Alert</Button>
                <Button variant="success">Success Affirm</Button>
                <Button variant="ghost">Ghost Trigger</Button>
                <Button variant="link">Inline Anchor</Button>
              </div>

              {/* Row 2: Complete Sizing Scale & Icon Touch Target (28px - 48px) */}
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">XS (28px)</Button>
                <Button size="sm">Small (32px)</Button>
                <Button size="default">Default (36px)</Button>
                <Button
                  size="lg"
                  iconTrigger={iconTriggerMode}
                  rightIcon={<ArrowRightIcon size={18} />}
                >
                  Large (40px)
                </Button>
                <Button
                  size="xl"
                  variant="default"
                  iconTrigger={iconTriggerMode}
                  rightIcon={<ArrowRightIcon size={20} />}
                >
                  Hero XL (48px)
                </Button>

                <div className="hidden sm:block h-6 w-px bg-border/60 mx-1" aria-hidden="true" />

                <Button
                  size="icon-xs"
                  variant="outline"
                  iconTrigger={iconTriggerMode}
                  aria-label="Extra small action"
                >
                  <CheckIcon size={12} />
                </Button>
                <Button
                  size="icon-sm"
                  variant="outline"
                  iconTrigger={iconTriggerMode}
                  aria-label="Small action"
                >
                  <CheckIcon size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="default"
                  iconTrigger={iconTriggerMode}
                  aria-label="Send message"
                >
                  <SendIcon size={16} />
                </Button>
                <Button
                  size="icon-lg"
                  variant="secondary"
                  iconTrigger={iconTriggerMode}
                  aria-label="Adjust settings"
                >
                  <SlidersHorizontalIcon size={18} />
                </Button>
              </div>

              {/* Row 3: Responsive Anti-Crush Architecture & Full-Width Adaptivity */}
              <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Responsive Anti-Crush Layout Adaptivity</p>
                    <p className="text-[11px] text-muted-foreground">
                      Full width on mobile viewports (<code className="text-[10px] bg-muted px-1 py-0.5 rounded">w-full sm:w-auto</code>), stationary 0px anchor for popovers, and touch hit-slop ≥ 44px.
                    </p>
                  </div>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px] self-start sm:self-auto">
                    Directive #7 & #9 Verified
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <Button fullWidth className="sm:w-auto" variant="default">
                    Full Width Mobile CTA
                  </Button>
                  <Button fullWidth className="sm:w-auto" variant="outline">
                    Secondary Responsive Action
                  </Button>
                  <Button fullWidth className="sm:flex-1" variant="glass">
                    Fluid Flex Container Fill
                  </Button>
                </div>
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

          {/* 0. Top Navigation Bar Spectrum */}
          <Card className="w-full overflow-visible">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <LayersIcon size={16} />
                  Adaptive Top Navigation Bar Architecture
                </CardTitle>
                <CardDescription>
                  Production navigation header featuring 5 menu archetypes: Mega Menu, Categorized Columns, Simple Flyouts, Direct Links, and an Adaptive Mobile Sheet Drawer.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                  Turnkey &bull; 5 Archetypes
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Live Interactive Navigation Bar Preview */}
              <div className="rounded-xl border border-border/80 bg-background/50 overflow-visible relative min-h-[72px]">
                <NavigationBar
                  sticky={false}
                  brand={
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                        <SparklesIcon size={16} />
                      </div>
                      <span className="font-semibold text-sm tracking-tight text-foreground">
                        Antigravity<span className="text-primary font-normal text-xs ml-1">UI</span>
                      </span>
                    </div>
                  }
                  items={demoNavItems}
                  actions={
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCommandOpen(true)}
                        className="h-8 gap-1.5 text-xs text-muted-foreground hidden xl:inline-flex rounded-lg"
                      >
                        <SearchIcon size={13} />
                        <span>Search</span>
                        <kbd className="text-[10px] font-mono px-1 py-0.5 rounded bg-muted/80 border border-border/50">⌘K</kbd>
                      </Button>
                      <ThemeToggle isDark={isDark} onToggleDark={toggleTheme} className="size-8 rounded-lg" />
                      <Button size="sm" className="h-8 text-xs font-medium rounded-lg">
                        Get Started
                      </Button>
                    </>
                  }
                  className="rounded-xl border-none shadow-none static"
                />
              </div>

              {/* Explanatory Pills for the 5 Menu Archetypes */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg border border-border/60 bg-muted/20">
                  <span className="font-semibold text-foreground block text-[11px]">1. Mega Menu</span>
                  <span className="text-[10px] text-muted-foreground">Hero promo card + 2-col link grid</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border/60 bg-muted/20">
                  <span className="font-semibold text-foreground block text-[11px]">2. Directory Columns</span>
                  <span className="text-[10px] text-muted-foreground">Categorized vertical lists with headers</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border/60 bg-muted/20">
                  <span className="font-semibold text-foreground block text-[11px]">3. Simple Flyout</span>
                  <span className="text-[10px] text-muted-foreground">Compact single-column list with icons</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border/60 bg-muted/20">
                  <span className="font-semibold text-foreground block text-[11px]">4. Direct Links</span>
                  <span className="text-[10px] text-muted-foreground">Hoverable direct navigation anchors</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border/60 bg-muted/20 col-span-2 sm:col-span-1">
                  <span className="font-semibold text-foreground block text-[11px]">5. Mobile Sheet</span>
                  <span className="text-[10px] text-muted-foreground">Auto-collapsing accordion drawer</span>
                </div>
              </div>
            </CardContent>
          </Card>

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
                          "font-medium",
                          node.cpu > 80 ? "text-rose-500" : "text-foreground"
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

        {/* Section 8: Spatial Materials, Liquid Glass & System Feedback (Batch 5) */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <EyeIcon size={16} />
              Spatial Materials & System Feedback (Batch 5)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Apple HIG 4-tier liquid glass materials, Gmail-style 5s Undo toasts, global ⌘K Command palette, and zero-CLS skeleton loaders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* 1. Spatial Liquid Glass Tiers */}
            <Card className="h-full">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <SparklesIcon size={16} />
                    Optical Glass Materials & Ambient Lensing
                  </CardTitle>
                  <CardDescription>
                    Context-aware liquid glass with G2 continuous curvature and specular rim reflection.
                  </CardDescription>
                </div>
                <SegmentedControl
                  value={previewMaterial}
                  onValueChange={(v) => setPreviewMaterial(v as "ultra-thin" | "thin" | "regular" | "thick")}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <SegmentedControlItem value="ultra-thin">Ultra-Thin</SegmentedControlItem>
                  <SegmentedControlItem value="thin">Thin</SegmentedControlItem>
                  <SegmentedControlItem value="regular">Regular</SegmentedControlItem>
                  <SegmentedControlItem value="thick">Thick</SegmentedControlItem>
                </SegmentedControl>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* OKLCH Ambient background canvas to demonstrate optical refraction */}
                <div
                  className="relative p-6 rounded-2xl overflow-hidden border border-border/40 transition-all duration-500 min-h-[220px]"
                  style={{ background: ambientGradients[selectedGradient].subtleCss }}
                >
                  <div
                    className="absolute -top-12 -left-12 size-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-60"
                    style={{ background: ambientGradients[selectedGradient].css }}
                  />
                  <div
                    className="absolute -bottom-12 -right-12 size-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-60"
                    style={{ background: ambientGradients[selectedGradient].css }}
                  />

                  {/* Dynamic Glass Surface */}
                  <div
                    className={cn(
                      "relative p-5 rounded-xl specular-rim transition-all duration-300 flex flex-col gap-3",
                      previewMaterial === "ultra-thin" && "glass-ultra-thin",
                      previewMaterial === "thin" && "glass-thin",
                      previewMaterial === "regular" && "glass-regular",
                      previewMaterial === "thick" && "glass-thick"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-tight text-foreground capitalize">
                        {previewMaterial} Material
                      </span>
                      <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                        {previewMaterial === "ultra-thin" && "55% Opacity · 28px Blur"}
                        {previewMaterial === "thin" && "70% Opacity · 20px Blur"}
                        {previewMaterial === "regular" && "82% Opacity · 16px Blur"}
                        {previewMaterial === "thick" && "92% Opacity · 12px Blur"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Lensing refraction derived from <span className="font-medium text-foreground">{ambientGradients[selectedGradient].name}</span> in perceptual OKLCH space without muddy sRGB gray midpoints.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <Button size="sm" variant="default">
                        Active Surface
                      </Button>
                      <Button size="sm" variant="outline" className="bg-background/50 border-border/60">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>

                {/* uiGradients Curated Harmony Selector */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Curated uiGradients OKLCH Mesh:
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {ambientGradients[selectedGradient].heritage}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {(Object.keys(ambientGradients) as AmbientGradientKey[]).map((key) => {
                      const grad = ambientGradients[key];
                      const isSelected = selectedGradient === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedGradient(key)}
                          aria-label={`Select ${grad.name} ambient mesh`}
                          aria-pressed={isSelected}
                          className={cn(
                            "group relative flex flex-col items-center gap-1 p-1.5 rounded-lg border text-left transition-all duration-150 cursor-pointer",
                            isSelected
                              ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                              : "border-border/50 hover:border-border hover:bg-muted/40"
                          )}
                        >
                          <div
                            className="size-5 rounded-full border border-white/20 shadow-xs shrink-0"
                            style={{ background: grad.css }}
                          />
                          <span className="text-[10px] font-medium truncate w-full text-center text-foreground">
                            {grad.name.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Undo Toasts & Skeleton Previews */}
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <RotateCCWIcon size={16} />
                  Undo Toasts & Dimension Stability
                </CardTitle>
                <CardDescription>
                  Reversible actions with 5s Undo timer (`role="status"`) and zero-CLS skeleton previews.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {/* Reversible Action Demo (Detail #5) */}
                <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-foreground">API Token Revocation</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {activeToken ? (
                          <span className="font-mono text-emerald-600 dark:text-emerald-400">{activeToken} (Active)</span>
                        ) : (
                          <span className="text-rose-500 font-medium">Revoked (Pending Soft Delete...)</span>
                        )}
                      </p>
                    </div>
                    {activeToken ? (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const prev = activeToken;
                          setActiveToken(null);
                          toast({
                            title: "API Token Revoked",
                            description: "Token marked for deletion. Reversible for 5 seconds.",
                            type: "error",
                            duration: 5000,
                            undoLabel: "Undo",
                            undoAction: () => {
                              setActiveToken(prev);
                              toast({
                                title: "Token Restored",
                                description: "The API token was restored to active status.",
                                type: "success"
                              });
                            }
                          });
                        }}
                      >
                        <Trash2Icon size={12} className="mr-1" /> Revoke Token
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setActiveToken("tok_live_981aef83c27d")}
                      >
                        Reset Demo
                      </Button>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Reversible actions bypass confirmation modals with immediate execution and an accessible 5s Undo toast.
                  </p>
                </div>

                {/* Skeleton Loader Demo (Detail #1) */}
                <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">Skeleton Footprint (Zero CLS)</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsSimulatingLoading(true);
                        setTimeout(() => setIsSimulatingLoading(false), 1200);
                      }}
                    >
                      Simulate Load (1.2s)
                    </Button>
                  </div>

                  {isSimulatingLoading ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-card/50">
                      <Skeleton className="size-10 rounded-full shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-3/4 rounded" />
                        <Skeleton className="h-2.5 w-1/2 rounded" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-card/50">
                      <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
                        DG
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">DeepMind Design Engine</p>
                        <p className="text-[11px] text-muted-foreground truncate">agent-native-design-system.edge.internal</p>
                      </div>
                      <Badge variant="outline" size="sm" className="text-emerald-500 border-emerald-500/30">
                        Ready
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 3. Directive 11: Perceptual OKLCH Gradient Engineering & Anti-Slop Contrast Showcase */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheckIcon size={16} className="text-primary shrink-0" />
                    <span>Directive 11: Perceptual OKLCH Gradient Engineering & Anti-Slop Contrast</span>
                  </CardTitle>
                  <CardDescription>
                    Banishing sRGB muddy dead zones, eliminating AI gradient text tropes, and enforcing geometric coordinate contrast floors.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                  <Badge variant="outline" size="sm" className="font-mono text-[10px] text-emerald-500 border-emerald-500/30">
                    WCAG 2.2 AA Verified (≥ 4.5:1)
                  </Badge>
                  <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                    CSS `in oklch`
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column A: Banned AI Clichés & sRGB Flaws */}
                <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-destructive flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-destructive" />
                      Banned AI Clichés & sRGB Flaws
                    </span>
                    <Badge variant="outline" size="sm" className="text-[10px] text-destructive border-destructive/30">
                      Impeccable Flagged
                    </Badge>
                  </div>

                  {/* sRGB Muddy Midpoint Ramp */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Legacy sRGB Ramp (`#ff0077` ➔ `#0077ff`)</span>
                      <span className="text-destructive font-mono text-[10px]">Muddy 50% Dead Zone</span>
                    </div>
                    <div
                      className="h-8 rounded-lg w-full relative overflow-hidden border border-border/40"
                      style={{ background: "linear-gradient(to right, #ff0077, #0077ff)" }}
                    >
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-black/30 border-x border-white/40 flex items-center justify-center">
                        <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">Mid</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      sRGB gamma curve destroys chroma at the midpoint, producing an unappealing desaturated murky gray band.
                    </p>
                  </div>

                  {/* Clipped Gradient Text Anti-Pattern */}
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-destructive/20">
                    <span className="text-[11px] text-muted-foreground">
                      Gradient Clipped Text (`-webkit-background-clip: text`)
                    </span>
                    <div className="p-3 rounded-lg bg-background/80 border border-destructive/20">
                      <p
                        className="text-sm font-bold tracking-tight"
                        style={{
                          backgroundImage: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                          WebkitBackgroundClip: "text",
                          color: "transparent"
                        }}
                      >
                        Other assistants guess. We verify.
                      </p>
                      <p className="text-[10px] text-destructive mt-1">
                        ❌ Flagged: Destroys font subpixel antialiasing and fails coordinate contrast along light gradient bands.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column B: Sanctioned Craft Standard (Directive 11) */}
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      Sanctioned Craft Standard (Directive 11)
                    </span>
                    <Badge variant="outline" size="sm" className="text-[10px] text-emerald-500 border-emerald-500/30">
                      Rulebook Compliant
                    </Badge>
                  </div>

                  {/* Modern OKLCH Linear Ramp */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Perceptual OKLCH Ramp (`in oklch`)</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">Uniform Chroma</span>
                    </div>
                    <div
                      className="h-8 rounded-lg w-full relative overflow-hidden border border-border/40"
                      style={{ background: "linear-gradient(in oklch to right, oklch(0.65 0.28 335), oklch(0.64 0.20 265))" }}
                    >
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-white/20 border-x border-white/40 flex items-center justify-center">
                        <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">Pure</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      OKLCH interpolates in human-perceptual coordinates, maintaining smooth luminance and vibrant saturation end-to-end.
                    </p>
                  </div>

                  {/* High-Contrast Solid Typography + Specular Rim */}
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-emerald-500/20">
                    <span className="text-[11px] text-muted-foreground">
                      High-Contrast Solid Text over Atmospheric Material
                    </span>
                    <div className="p-3 rounded-lg bg-card border border-border/60 shadow-xs relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                      <p className="text-sm font-semibold text-foreground tracking-tight">
                        Verified Coordinate Contrast & Optical Clarity
                      </p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
                        ✅ Passed: Solid glyph antialiasing preserved, $\ge 4.5:1$ contrast across 100% of the surface floor.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 9: Advanced Interaction Primitives: OTP, Base UI Select, Presence Avatars & Zero-CLS Media */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-mono font-semibold border border-primary/20">
                09
              </span>
              Advanced Primitives: OTP, Headless Select, Avatars & Progressive Media
            </h2>
            <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Native segmented SMS autofill parsing (Detail #15), Base UI form select with liquid glass menus, presence-aware avatars, spring-calibrated gauges, and BlurHash zero-CLS hydration (Detail #8).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* 1. One-Time-Code / OTP Input (Detail #15) */}
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <KeyIcon size={16} />
                  One-Time-Code / OTP Input
                </CardTitle>
                <CardDescription>
                  Segmented PIN boxes with native SMS autofill parsing (`autocomplete="one-time-code"`), clipboard extraction, and active caret animation.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/40 bg-muted/20 gap-4">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    mask={otpMask}
                    onComplete={(code) => {
                      toast({
                        title: "Code Verified",
                        description: `Verification code ${code} authenticated successfully.`,
                        type: "success",
                      });
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-muted-foreground">
                    <span>Value:</span>
                    <span className="font-semibold text-foreground bg-muted px-2 py-0.5 rounded">
                      {otpValue || "(empty)"}
                    </span>
                    {otpValue.length === 6 && (
                      <Badge variant="outline" size="sm" className="text-emerald-500 border-emerald-500/30">
                        Complete
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setOtpValue("849201")}
                      className="text-xs"
                    >
                      Paste SMS ("#849201")
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setOtpValue("")}
                      className="text-xs text-muted-foreground"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Mask PIN</span>
                    <Switch
                      size="sm"
                      checked={otpMask}
                      onCheckedChange={setOtpMask}
                      aria-label="Toggle PIN masking"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Base UI Headless Select */}
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CpuIcon size={16} />
                  Headless Form Select
                </CardTitle>
                <CardDescription>
                  Full WCAG 2.2 accessible select built on `@base-ui/react` with liquid glass popover and arrow key navigation.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex flex-col gap-3">
                  <label className="text-xs font-medium text-foreground">Active Inference Model</label>
                  <Select value={selectedModel} onValueChange={(val) => val && setSelectedModel(val)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose foundation model..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectGroupLabel>Frontier Architectures</SelectGroupLabel>
                        <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro (Adaptive CoT)</SelectItem>
                        <SelectItem value="claude-3.7-sonnet">Claude 3.7 Sonnet (Hybrid)</SelectItem>
                        <SelectItem value="gpt-4.5">GPT-4.5 Orion (Massive Context)</SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectGroupLabel>High-Throughput Edge</SelectGroupLabel>
                        <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash (Sub-100ms)</SelectItem>
                        <SelectItem value="deepseek-r1">DeepSeek R1 (Open Distilled)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>Selected token:</span>
                    <span className="font-mono text-primary font-semibold">{selectedModel}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-card/50">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground">Compact Select Variant</p>
                    <p className="text-[11px] text-muted-foreground">32px height for high-density tables and toolbars</p>
                  </div>
                  <Select defaultValue="standard">
                    <SelectTrigger size="sm" className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="quantized">Quantized</SelectItem>
                      <SelectItem value="fp16">FP16 Tensor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 3. Presence Avatars & Stacked Groups */}
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <UsersIcon size={16} />
                  Presence Avatars & Stacked Groups
                </CardTitle>
                <CardDescription>
                  Deterministic OKLCH initials hashing, concentric masking borders, and live presence status pips.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {/* Stacked Group */}
                <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-foreground">Design Systems Core Team</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Stacked with concentric border masks</p>
                  </div>
                  <AvatarGroup max={4}>
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces" alt="Elena Rostova" />
                      <AvatarFallback autoColor>ER</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces" alt="Marcus Chen" />
                      <AvatarFallback autoColor>MC</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback autoColor>AK</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback autoColor>SL</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback autoColor>TW</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback autoColor>DH</AvatarFallback>
                    </Avatar>
                  </AvatarGroup>
                </div>

                {/* Status Badges & Sizes */}
                <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex flex-col gap-3">
                  <p className="text-xs font-medium text-foreground">Status Pips & Scale Spectrum</p>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar size="lg">
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces" alt="Elena" />
                        <AvatarFallback autoColor>EL</AvatarFallback>
                      </Avatar>
                      <AvatarBadge status="online" size="lg" />
                    </div>

                    <div className="relative">
                      <Avatar size="default">
                        <AvatarFallback autoColor>MC</AvatarFallback>
                      </Avatar>
                      <AvatarBadge status="busy" size="default" />
                    </div>

                    <div className="relative">
                      <Avatar size="sm">
                        <AvatarFallback autoColor>DG</AvatarFallback>
                      </Avatar>
                      <AvatarBadge status="away" size="sm" />
                    </div>

                    <div className="relative">
                      <Avatar size="xs">
                        <AvatarFallback autoColor>AI</AvatarFallback>
                      </Avatar>
                      <AvatarBadge status="offline" size="sm" />
                    </div>

                    <div className="flex-1 text-right text-xs text-muted-foreground">
                      <span>Online · Busy · Away</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Spring Meters & Radial Gauges */}
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <GaugeIcon size={16} />
                  Spring Meters & Radial Gauges
                </CardTitle>
                <CardDescription>
                  Tabular percentage readouts, linear specular tracks, and animated SVG radial gauges.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="p-4 rounded-xl border border-border/40 bg-muted/20 flex items-center justify-around gap-6">
                  {/* Radial Gauge */}
                  <div className="flex flex-col items-center gap-2">
                    <CircularProgress
                      value={isIndeterminateProgress ? null : progressValue}
                      size={64}
                      strokeWidth={5}
                      showValue
                    />
                    <span className="text-[11px] font-medium text-muted-foreground">Hydration</span>
                  </div>

                  {/* Linear Bar */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-foreground">Compute Allocation</span>
                      <span className="font-mono tabular-nums text-muted-foreground">
                        {isIndeterminateProgress ? "Calculating..." : `${progressValue}%`}
                      </span>
                    </div>
                    <Progress
                      value={isIndeterminateProgress ? null : progressValue}
                      size="default"
                    />
                    <Progress
                      value={isIndeterminateProgress ? null : Math.round(progressValue * 0.6)}
                      size="sm"
                      className="opacity-60"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/40">
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProgressValue((p) => Math.max(0, p - 10))}
                      disabled={isIndeterminateProgress}
                    >
                      -10%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProgressValue((p) => Math.min(100, p + 10))}
                      disabled={isIndeterminateProgress}
                    >
                      +10%
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Indeterminate</span>
                    <Switch
                      size="sm"
                      checked={isIndeterminateProgress}
                      onCheckedChange={setIsIndeterminateProgress}
                      aria-label="Toggle indeterminate progress"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5. Progressive Media Hydration (Detail #8) */}
            <Card className="h-full lg:col-span-2">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base flex items-center gap-2">
                    <SparklesIcon size={16} className="shrink-0" />
                    <span>Zero-CLS Progressive Image Hydration (Detail #8)</span>
                  </CardTitle>
                  <CardDescription>
                    Low-resolution BlurHash / ThumbHash preview decoding into full resolution with specular shimmer and zero layout shift.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setImageKey((k) => k + 1)}
                  className="w-full md:w-auto shrink-0"
                >
                  <RotateCCWIcon size={12} className="mr-1.5" /> Re-trigger Hydration
                </Button>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <ProgressiveImage
                    key={`img-1-${imageKey}`}
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
                    placeholderSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=50&auto=format&fit=crop&q=20"
                    alt="Abstract glass fluidity"
                    aspectRatio="16/9"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Spatial Fluidity (16:9 Reserved)</span>
                    <span className="font-mono text-[11px]">Zero Layout Shift</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <ProgressiveImage
                    key={`img-2-${imageKey}`}
                    src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80"
                    placeholderSrc="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=50&auto=format&fit=crop&q=20"
                    alt="Optical refraction crystal"
                    aspectRatio="16/9"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Optical Refraction (16:9 Reserved)</span>
                    <span className="font-mono text-[11px]">Specular Shimmer Exit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 10: Advanced Analytics & Layout Primitives (Batch 6) */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold">10</span>
              <span>Visual Analytics, Temporal &amp; Split Layout Primitives</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Theme-reactive vector telemetry, spring-animated calendar and date pickers, accessible breadcrumb and pagination hierarchies, and tactile split pane viewports with zero-CLS resize handles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Theme-Reactive Vector Charts & Sparklines */}
            <Card className="flex flex-col justify-between">
              <CardHeader className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ActivityIcon size={16} className="text-primary" />
                    <CardTitle className="text-base font-semibold">Real-Time Cluster Telemetry</CardTitle>
                  </div>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                    --chart-1 &amp; --chart-2
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Zero-dependency SVG spline interpolation with dynamic alpha gradient masks and interactive hover crosshairs.
                </CardDescription>

                {/* Inline Sparklines Row */}
                <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-border/40">
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-muted/30 border border-border/50">
                    <span className="text-[10px] text-muted-foreground font-mono">QPS Throughput</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold tabular-nums">4.8k</span>
                      <Sparkline data={[28, 32, 45, 40, 52, 60, 58, 68]} width={64} height={22} trend="up" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-muted/30 border border-border/50">
                    <span className="text-[10px] text-muted-foreground font-mono">P99 Latency</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold tabular-nums">18.4ms</span>
                      <Sparkline data={[42, 39, 35, 30, 24, 22, 19, 18]} width={64} height={22} trend="up" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-muted/30 border border-border/50">
                    <span className="text-[10px] text-muted-foreground font-mono">Error Rate</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold tabular-nums">0.01%</span>
                      <Sparkline data={[5, 12, 8, 4, 3, 2, 1, 1]} width={64} height={22} trend="up" />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Main Interactive Area Chart */}
                <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-foreground">Ingress vs. Egress Flow (MB/s)</span>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full" style={{ backgroundColor: "var(--color-chart-1)" }} />
                        Primary Ingress
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full" style={{ backgroundColor: "var(--color-chart-2)" }} />
                        Egress Flow
                      </span>
                    </div>
                  </div>
                  <AreaChart
                    data={mockTelemetryData}
                    height={160}
                    valueFormatter={(v) => `${v} MB/s`}
                  />
                </div>

                {/* Weekly Distribution Bar Chart */}
                <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-foreground">Weekly Compute Load</span>
                    <span className="font-mono text-[10px] text-muted-foreground">Tabular-nums Pill Pillars</span>
                  </div>
                  <BarChart
                    data={mockBarData}
                    height={110}
                    valueFormatter={(v) => `${v} QPS`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 2. Calendar & Date Picker Hierarchy */}
            <Card className="flex flex-col justify-between">
              <CardHeader className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <CalendarDaysIcon size={16} className="text-primary shrink-0" />
                    <CardTitle className="text-base font-semibold truncate">Calendar &amp; Date Picker</CardTitle>
                  </div>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px] shrink-0 self-start sm:self-auto">
                    Spring Slide &bull; ARIA Grid
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Tabular date geometry with spring month sliding transitions, popover date pickers, and zero layout shift on cell selection.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start justify-center gap-6">
                  {/* Inline Calendar */}
                  <div className="flex flex-col items-center gap-2 mx-auto sm:mx-0">
                    <Calendar
                      selected={calendarDate}
                      onSelect={(d) => setCalendarDate(d)}
                    />
                    <div className="text-[11px] text-muted-foreground font-mono">
                      Selected: <span className="font-semibold text-foreground">{calendarDate ? calendarDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "None"}</span>
                    </div>
                  </div>

                  {/* Popover Date Pickers & Form States */}
                  <div className="flex-1 w-full flex flex-col gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Deployment Cutoff Date</label>
                      <DatePicker
                        selected={datePickerDate}
                        onSelect={setDatePickerDate}
                        className="w-full"
                      />
                      <p className="text-[10px] text-muted-foreground">Selects milestone deployment target.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Disabled / Read-Only Date</label>
                      <DatePicker
                        disabled
                        selected={new Date(2026, 0, 1)}
                        className="w-full"
                      />
                      <p className="text-[10px] text-muted-foreground">Locks interaction with 40% opacity.</p>
                    </div>

                    <div className="p-3 rounded-xl border border-border/60 bg-muted/20 space-y-2">
                      <span className="text-[11px] font-semibold text-foreground">Directive 3 Alignment</span>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        All day cell labels and month years declare <code className="font-mono text-primary font-semibold">tabular-nums font-mono</code> to completely eliminate horizontal glyph jitter during selection.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Breadcrumb & Pagination Navigational Hierarchy */}
            <Card className="flex flex-col justify-between">
              <CardHeader className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <LayersIcon size={16} className="text-primary shrink-0" />
                    <CardTitle className="text-base font-semibold truncate">Breadcrumb &amp; Pagination</CardTitle>
                  </div>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px] shrink-0 self-start sm:self-auto">
                    Quiet Chrome &bull; ARIA Nav
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Spatial navigation with semantic lists, kinetic chevron separators, and tabular pagination numbers.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Standard Breadcrumb */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-foreground">Deep Architectural Hierarchy</span>
                  <div className="p-3 rounded-xl border border-border/60 bg-muted/20">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#home">Infrastructure</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#clusters">Clusters</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#edge">eu-central-01</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Telemetry Metrics</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </div>

                {/* Interactive Pagination */}
                <div className="space-y-3 pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">Interactive Pagination</span>
                    <span className="font-mono text-muted-foreground text-[11px]">
                      Page <span className="font-semibold text-foreground">{currentPage}</span> of 10
                    </span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/60 bg-muted/20 flex flex-col gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                        Worded Controls (Default)
                      </span>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        buttonVariant="worded"
                        onPageChange={setCurrentPage}
                      />
                    </div>
                    <div className="space-y-1.5 pt-2 border-t border-border/30">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                        Compact Icon Controls (size-8)
                      </span>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        buttonVariant="icon"
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Resizable Panel / Split View Workspace */}
            <Card className="flex flex-col justify-between">
              <CardHeader className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <TerminalIcon size={16} className="text-primary shrink-0" />
                    <CardTitle className="text-base font-semibold truncate">Resizable Split Viewport</CardTitle>
                  </div>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px] shrink-0 self-start sm:self-auto">
                    Directive 7 Anti-Crush
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Tactile drag handles with spring border blooms, keyboard step resizing, and minimum safe bounds.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="h-56 w-full rounded-xl border border-border/80 overflow-hidden shadow-sm">
                  <ResizablePanelGroup direction="horizontal" defaultSizes={[32, 68]}>
                    {/* Left Explorer Pane */}
                    <ResizablePanel order={0} defaultSize={32} minSize={20} className="bg-muted/30 p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-foreground">
                        <span>Explorer</span>
                        <Badge variant="secondary" size="sm" className="text-[9px] px-1 py-0 h-3.5">
                          3 Files
                        </Badge>
                      </div>
                      <div className="space-y-1 font-mono text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5 p-1 rounded-md bg-primary/10 text-primary font-medium">
                          <span>src/chart.tsx</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-muted/50 cursor-pointer">
                          <span>src/calendar.tsx</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-1 rounded-md hover:bg-muted/50 cursor-pointer">
                          <span>src/resizable.tsx</span>
                        </div>
                      </div>
                    </ResizablePanel>

                    <ResizableHandle handleIndex={0} withHandle />

                    {/* Right Code/Telemetry Pane */}
                    <ResizablePanel order={1} defaultSize={68} minSize={30} className="bg-card p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pb-1.5 border-b border-border/50">
                        <span className="text-foreground font-semibold">src/chart.tsx</span>
                        <span className="text-[10px]">100% Dual-Engine APCA</span>
                      </div>
                      <pre className="font-mono text-[11px] text-muted-foreground leading-relaxed overflow-x-auto p-2 rounded-lg bg-muted/20">
{`export function Sparkline({ data }: SparklineProps) {
  // Direct Catmull-Rom spline calculation
  const line = buildSmoothPath(points);
  return <svg viewBox="0 0 120 36">{...}</svg>;
}`}
                      </pre>
                      <div className="mt-auto flex items-center justify-between text-[10px] text-muted-foreground font-mono pt-1 border-t border-border/30">
                        <span>Drag handle or press Arrow keys</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">Zero-CLS</span>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 11: Complete Kinetic Icon Spectrum & Directory (470 Primitives) */}
        <section id="icon-directory" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-mono font-bold">11</span>
              <span>Complete Kinetic Icon Spectrum &amp; Directory</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Explore all 470 animated icons with mechanical spring physics, instant search, category filtering, dynamic sliding pagination, and one-click import snippet copying.
            </p>
          </div>

          <IconGallery />
        </section>
      </main>

      {/* Global Command Dialog (⌘K / Ctrl+K) */}
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <CommandInput />
          <CommandList>
            <CommandEmpty />
            <CommandGroup heading="Platform Navigation">
              <CommandItem onSelect={() => { setCommandOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <SparklesIcon size={14} />
                <span>Scroll to Top</span>
                <CommandShortcut>⌘↑</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => { setCommandOpen(false); toggleTheme(); }}>
                {isDark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
                <span>Toggle Color Theme</span>
                <CommandShortcut>⌘T</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => {
                setCommandOpen(false);
                toast({
                  title: "Instant Edge Deployment Triggered",
                  description: "Synchronized across 5 global Anycast nodes.",
                  type: "success"
                });
              }}>
                <ZapIcon size={14} />
                <span>Instant Edge Deploy</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Components & Architecture">
              <CommandItem onSelect={() => {
                setCommandOpen(false);
                document.getElementById("icon-directory")?.scrollIntoView({ behavior: "smooth" });
              }}>
                <SparklesIcon size={14} />
                <span>Browse Kinetic Icon Directory (470 Icons)</span>
                <CommandShortcut>⌘I</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <LayersIcon size={14} />
                <span>Explore Button Spectrum</span>
              </CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <ServerIcon size={14} />
                <span>Cluster Telemetry Table</span>
              </CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <ShieldCheckIcon size={14} />
                <span>Architectural Invariants & Directives</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        {/* Micro Footer */}
        <footer role="contentinfo" className="border-t border-border/60 pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© Design System · Human-Centric & Agent-Native Standard</p>
          <p className="font-mono">React 19 · Base UI · Motion · Tailwind CSS v4</p>
        </footer>

        {/* Live Theme Studio & tweakcn Customizer Drawer */}
        <ThemeStudio isDark={isDark} onToggleDark={(nextDark) => toggleTheme(nextDark)} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
