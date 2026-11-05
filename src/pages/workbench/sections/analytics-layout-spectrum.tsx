import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AreaChart, BarChart, Sparkline } from "@/components/ui/chart";
import { Calendar, DatePicker } from "@/components/ui/calendar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ActivityIcon, CalendarDaysIcon, LayersIcon, TerminalIcon } from "@/components/icons";

export function AnalyticsLayoutSpectrum() {
  const [calendarDate, setCalendarDate] = React.useState<Date | null>(() => new Date());
  const [datePickerDate, setDatePickerDate] = React.useState<Date | null>(() => new Date());
  const [currentPage, setCurrentPage] = React.useState(2);

  const mockTelemetryData = React.useMemo(
    () => [
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
    ],
    []
  );

  const mockBarData = React.useMemo(
    () => [
      { label: "Mon", value: 420 },
      { label: "Tue", value: 680 },
      { label: "Wed", value: 890 },
      { label: "Thu", value: 810 },
      { label: "Fri", value: 950 },
      { label: "Sat", value: 540 },
      { label: "Sun", value: 380 },
    ],
    []
  );

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
            10
          </span>
          <span>Visual Analytics, Temporal &amp; Split Layout Primitives</span>
        </h2>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Theme-reactive vector telemetry, spring-animated calendar and date pickers, accessible
          breadcrumb and pagination hierarchies, and tactile split pane viewports with zero-CLS
          resize handles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Theme-Reactive Vector Charts & Sparklines */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ActivityIcon size={16} className="text-primary" />
                <CardTitle className="text-base font-semibold">
                  Real-Time Cluster Telemetry
                </CardTitle>
              </div>
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                --chart-1 &amp; --chart-2
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Zero-dependency SVG spline interpolation with dynamic alpha gradient masks and
              interactive hover crosshairs.
            </CardDescription>

            {/* Inline Sparklines Row */}
            <div className="grid grid-cols-3 gap-2.5 border-t border-border/40 pt-2">
              <div className="flex flex-col gap-1 rounded-lg border border-border/50 bg-muted/30 p-2.5">
                <span className="font-mono text-[10px] text-muted-foreground">QPS Throughput</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tabular-nums">4.8k</span>
                  <Sparkline
                    data={[28, 32, 45, 40, 52, 60, 58, 68]}
                    width={64}
                    height={22}
                    trend="up"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-border/50 bg-muted/30 p-2.5">
                <span className="font-mono text-[10px] text-muted-foreground">P99 Latency</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tabular-nums">18.4ms</span>
                  <Sparkline
                    data={[42, 39, 35, 30, 24, 22, 19, 18]}
                    width={64}
                    height={22}
                    trend="up"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-border/50 bg-muted/30 p-2.5">
                <span className="font-mono text-[10px] text-muted-foreground">Error Rate</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tabular-nums">0.01%</span>
                  <Sparkline data={[5, 12, 8, 4, 3, 2, 1, 1]} width={64} height={22} trend="up" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Main Interactive Area Chart */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Ingress vs. Egress Flow (MB/s)</span>
                <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: "var(--color-chart-1)" }}
                    />
                    Primary Ingress
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: "var(--color-chart-2)" }}
                    />
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
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Weekly Compute Load</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Tabular-nums Pill Pillars
                </span>
              </div>
              <BarChart data={mockBarData} height={110} valueFormatter={(v) => `${v} QPS`} />
            </div>
          </CardContent>
        </Card>

        {/* 2. Calendar & Date Picker Hierarchy */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-col gap-2">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <CalendarDaysIcon size={16} className="shrink-0 text-primary" />
                <CardTitle className="truncate text-base font-semibold">
                  Calendar &amp; Date Picker
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                size="sm"
                className="shrink-0 self-start font-mono text-[10px] sm:self-auto"
              >
                Spring Slide (ARIA Grid)
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Tabular date geometry with spring month sliding transitions, popover date pickers, and
              zero layout shift on cell selection.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-col items-start justify-center gap-6 sm:flex-row">
              {/* Inline Calendar */}
              <div className="mx-auto flex flex-col items-center gap-2 sm:mx-0">
                <Calendar selected={calendarDate} onSelect={(d) => setCalendarDate(d)} />
                <div className="font-mono text-[11px] text-muted-foreground">
                  Selected:{" "}
                  <span className="font-semibold text-foreground">
                    {calendarDate
                      ? calendarDate.toLocaleDateString("en-GB", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "None"}
                  </span>
                </div>
              </div>

              {/* Popover Date Pickers & Form States */}
              <div className="flex w-full flex-1 flex-col gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Deployment Cutoff Date
                  </label>
                  <DatePicker
                    selected={datePickerDate}
                    onSelect={setDatePickerDate}
                    className="w-full"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Selects milestone deployment target.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Disabled or Read-Only Date
                  </label>
                  <DatePicker disabled selected={new Date(2026, 0, 1)} className="w-full" />
                  <p className="text-[10px] text-muted-foreground">
                    Locks interaction with 40% opacity.
                  </p>
                </div>

                <div className="space-y-2 rounded-xl border border-border/60 bg-muted/20 p-3">
                  <span className="text-[11px] font-semibold text-foreground">
                    Directive 3 Alignment
                  </span>
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    All day cell labels and month years declare{" "}
                    <code className="font-mono font-semibold text-primary">
                      tabular-nums font-mono
                    </code>{" "}
                    to completely eliminate horizontal glyph jitter during selection.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Breadcrumb & Pagination Navigational Hierarchy */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-col gap-2">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <LayersIcon size={16} className="shrink-0 text-primary" />
                <CardTitle className="truncate text-base font-semibold">
                  Breadcrumb &amp; Pagination
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                size="sm"
                className="shrink-0 self-start font-mono text-[10px] sm:self-auto"
              >
                Quiet Chrome (ARIA Nav)
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Spatial navigation with semantic lists, kinetic chevron separators, and tabular
              pagination numbers.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Standard Breadcrumb */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-foreground">
                Deep Architectural Hierarchy
              </span>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
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
            <div className="space-y-3 border-t border-border/40 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Interactive Pagination</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Page <span className="font-semibold text-foreground">{currentPage}</span> of 10
                </span>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/20 p-3">
                <div className="space-y-1.5">
                  <span className="block font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    Worded Controls (Default)
                  </span>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    buttonVariant="worded"
                    onPageChange={setCurrentPage}
                  />
                </div>
                <div className="space-y-1.5 border-t border-border/30 pt-2">
                  <span className="block font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
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
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <TerminalIcon size={16} className="shrink-0 text-primary" />
                <CardTitle className="truncate text-base font-semibold">
                  Resizable Split Viewport
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                size="sm"
                className="shrink-0 self-start font-mono text-[10px] sm:self-auto"
              >
                Directive 7 Anti-Crush
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Tactile drag handles with spring border blooms, keyboard step resizing, and minimum
              safe bounds.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="h-56 w-full overflow-hidden rounded-xl border border-border/80 shadow-sm">
              <ResizablePanelGroup direction="horizontal" defaultSizes={[32, 68]}>
                {/* Left Explorer Pane */}
                <ResizablePanel
                  order={0}
                  defaultSize={32}
                  minSize={20}
                  className="flex flex-col gap-2 bg-muted/30 p-3"
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-foreground">
                    <span>Explorer</span>
                    <Badge variant="secondary" size="sm" className="h-3.5 px-1 py-0 text-[9px]">
                      3 Files
                    </Badge>
                  </div>
                  <div className="space-y-1 font-mono text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 rounded-md bg-primary/10 p-1 font-medium text-primary">
                      <span>src/chart.tsx</span>
                    </div>
                    <div className="flex cursor-pointer items-center gap-1.5 rounded-md p-1 hover:bg-muted/50">
                      <span>src/calendar.tsx</span>
                    </div>
                    <div className="flex cursor-pointer items-center gap-1.5 rounded-md p-1 hover:bg-muted/50">
                      <span>src/resizable.tsx</span>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle handleIndex={0} withHandle />

                {/* Right Code/Telemetry Pane */}
                <ResizablePanel
                  order={1}
                  defaultSize={68}
                  minSize={30}
                  className="flex flex-col gap-2 bg-card p-3"
                >
                  <div className="flex items-center justify-between border-b border-border/50 pb-1.5 font-mono text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">src/chart.tsx</span>
                    <span className="text-[10px]">100% Dual-Engine APCA</span>
                  </div>
                  <pre className="overflow-x-auto rounded-lg bg-muted/20 p-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {`export function Sparkline({ data }: SparklineProps) {
  // Direct Catmull-Rom spline calculation
  const line = buildSmoothPath(points);
  return <svg viewBox="0 0 120 36">{...}</svg>;
}`}
                  </pre>
                  <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-1 font-mono text-[10px] text-muted-foreground">
                    <span>Drag handle or press Arrow keys</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      Zero-CLS
                    </span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
