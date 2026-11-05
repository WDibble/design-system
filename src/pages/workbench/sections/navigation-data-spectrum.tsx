import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Tabs, TabsList, TabsTrigger, TabsIndicator, TabsContent } from "@/components/ui/tabs";
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
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CopyButton } from "@/components/ui/copy-button";
import {
  LayersIcon,
  SparklesIcon,
  SearchIcon,
  TerminalIcon,
  ShieldCheckIcon,
  CpuIcon,
  ServerIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { getDemoNavItems } from "../nav-items";

interface NavigationDataSpectrumProps {
  isDark: boolean;
  onToggleDark: (targetDark?: boolean) => void;
  onOpenCommand: () => void;
  navigateTo: (path: string) => void;
}

export function NavigationDataSpectrum({
  isDark,
  onToggleDark,
  onOpenCommand,
  navigateTo,
}: NavigationDataSpectrumProps) {
  const [tabsVariant, setTabsVariant] = React.useState<"default" | "pills" | "line">("default");
  const demoNavItems = React.useMemo(() => getDemoNavItems(navigateTo), [navigateTo]);

  const clusterNodes = React.useMemo(
    () => [
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
    ],
    []
  );

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-2xl">
          <ServerIcon size={18} />
          Navigation, Structure & Data Display (Batch 4)
        </h2>
        <p className="mt-1 text-sm [text-wrap:pretty] text-muted-foreground">
          Apple HIG fluid tabs with zero glyphic twitching, Base UI CSS height accordion with
          concealed focus, and quiet data tables with tabular numerals.
        </p>
      </div>

      {/* 0. Top Navigation Bar Spectrum */}
      <Card className="relative z-30 w-full overflow-visible">
        <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <LayersIcon size={16} />
              Adaptive Top Navigation Bar Architecture
            </CardTitle>
            <CardDescription>
              Production navigation header featuring 5 menu archetypes: Mega Menu, Categorised
              Columns, Simple Flyouts, Direct Links, and an Adaptive Mobile Sheet Drawer.
            </CardDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Badge variant="outline" size="sm" className="font-mono text-[10px]">
              Turnkey (5 Archetypes)
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-30 space-y-4 overflow-visible">
          {/* Live Interactive Navigation Bar Preview */}
          <div className="relative z-30 overflow-visible rounded-xl border border-border/80 bg-background/50">
            <NavigationBar
              sticky={false}
              containerClassName="max-w-full px-3 sm:px-4"
              maxVisibleItems={3}
              brand={
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-sm font-semibold text-primary">
                    <SparklesIcon size={16} />
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    Antigravity
                    <span className="ml-1 text-xs font-normal text-primary">UI</span>
                  </span>
                </div>
              }
              items={demoNavItems}
              actions={
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onOpenCommand}
                    className="hidden h-8 gap-1.5 rounded-lg px-2.5 text-xs text-muted-foreground sm:inline-flex"
                  >
                    <SearchIcon size={13} />
                    <span className="hidden md:inline">Search</span>
                    <kbd className="rounded border border-border/50 bg-muted/80 px-1 py-0.5 font-mono text-[10px]">
                      ⌘K
                    </kbd>
                  </Button>
                  <ThemeToggle
                    isDark={isDark}
                    onToggleDark={onToggleDark}
                    className="size-8 rounded-lg"
                  />
                  <Button size="sm" className="h-8 rounded-lg px-2.5 text-xs font-medium sm:px-3">
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Join</span>
                  </Button>
                </>
              }
              className="relative z-30 rounded-xl border-none shadow-none"
            />
          </div>

          {/* Explanatory Pills for the 5 Menu Archetypes */}
          <div className="relative z-10 grid grid-cols-2 gap-2 text-xs sm:grid-cols-5">
            <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
              <span className="block text-[11px] font-semibold text-foreground">1. Mega Menu</span>
              <span className="text-[10px] text-muted-foreground">
                Hero promo card + 2-col link grid
              </span>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
              <span className="block text-[11px] font-semibold text-foreground">
                2. Directory Columns
              </span>
              <span className="text-[10px] text-muted-foreground">
                Categorised vertical lists with headers
              </span>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
              <span className="block text-[11px] font-semibold text-foreground">
                3. Simple Flyout
              </span>
              <span className="text-[10px] text-muted-foreground">
                Compact single-column list with icons
              </span>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
              <span className="block text-[11px] font-semibold text-foreground">
                4. Direct Links
              </span>
              <span className="text-[10px] text-muted-foreground">
                Hoverable direct navigation anchors
              </span>
            </div>
            <div className="col-span-2 rounded-lg border border-border/60 bg-muted/20 p-2.5 sm:col-span-1">
              <span className="block text-[11px] font-semibold text-foreground">
                5. Mobile Sheet
              </span>
              <span className="text-[10px] text-muted-foreground">
                Auto-collapsing accordion drawer
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="relative z-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {/* 1. Fluid Tabs */}
        <Card className="h-full">
          <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
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
                <TabsTrigger value="overview" variant={tabsVariant}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="logs" variant={tabsVariant}>
                  Deploy Logs
                </TabsTrigger>
                <TabsTrigger value="telemetry" variant={tabsVariant}>
                  Edge Routing
                </TabsTrigger>
              </TabsList>

              <div className="relative mt-3 grid w-full grid-cols-1">
                <TabsContent value="overview">
                  <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Cluster Health
                      </span>
                      <Badge
                        variant="outline"
                        className="border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                      >
                        99.99% Uptime
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="rounded-lg border border-border/30 bg-card/60 p-2.5">
                        <p className="text-[11px] text-muted-foreground">Avg Latency</p>
                        <p className="mt-0.5 font-mono text-base font-semibold text-foreground tabular-nums">
                          24.2 ms
                        </p>
                      </div>
                      <div className="rounded-lg border border-border/30 bg-card/60 p-2.5">
                        <p className="text-[11px] text-muted-foreground">Edge QPS</p>
                        <p className="mt-0.5 font-mono text-base font-semibold text-foreground tabular-nums">
                          18,195
                        </p>
                      </div>
                      <div className="rounded-lg border border-border/30 bg-card/60 p-2.5">
                        <p className="text-[11px] text-muted-foreground">Active Nodes</p>
                        <p className="mt-0.5 font-mono text-base font-semibold text-foreground tabular-nums">
                          48 / 48
                        </p>
                      </div>
                    </div>
                    <p className="pt-1 text-xs leading-relaxed text-muted-foreground">
                      Tab transitions lock glyph bounding boxes to ensure switching tabs causes zero
                      reflow or horizontal jitter.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="logs">
                  <div className="flex flex-col gap-2 rounded-xl border border-border/40 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-300">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-[11px] text-zinc-500">
                        release-v2.4.0 / edge-deployment.log
                      </span>
                      <CopyButton
                        size="sm"
                        variant="ghost"
                        value="[2026-10-27T17:50:00Z] Worker initialized in 12ms. Cluster routes synced."
                        idleText="Copy Log"
                        copiedText="Copied"
                        className="h-6 text-[10px] text-zinc-400 hover:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1 pt-1 text-[11px] leading-relaxed">
                      <p className="text-emerald-400">
                        [17:50:01] ✓ Verified cryptographic signatures (SHA-256)
                      </p>
                      <p className="text-zinc-400">
                        [17:50:02] → Hydrating Edge workers across 5 regions
                      </p>
                      <p className="text-zinc-400">
                        [17:50:03] → Routing table distributed (18.4ms avg propagation)
                      </p>
                      <p className="font-semibold text-emerald-400">
                        [17:50:04] ✓ Healthcheck green. 0 errors detected.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="telemetry">
                  <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">
                        Regional Traffic Distribution
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        Global Anycast
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                          <span>North America (us-east/west)</span>
                          <span className="font-mono font-medium text-foreground tabular-nums">
                            58%
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: "58%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                          <span>Europe & Middle East (eu-central)</span>
                          <span className="font-mono font-medium text-foreground tabular-nums">
                            27%
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary/80"
                            style={{ width: "27%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                          <span>Asia Pacific (ap-southeast)</span>
                          <span className="font-mono font-medium text-foreground tabular-nums">
                            15%
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary/60"
                            style={{ width: "15%" }}
                          />
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
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheckIcon size={16} />
              Collapsible Architectural Invariants
            </CardTitle>
            <CardDescription>
              Base UI Accordion with CSS height transition, concealed focus, & reversible rotating
              chevrons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion defaultValue={["invariant-1"]} className="w-full">
              <AccordionItem value="invariant-1">
                <AccordionTrigger>Directive 1: Physical Yield on pointerdown</AccordionTrigger>
                <AccordionContent>
                  Interactive controls must compress (
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">scale(0.97)</code>) the
                  millisecond touch or mouse down occurs. We decouple the outer layout button from
                  inner visual motion so floating positioners maintain absolute 0px stability.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="invariant-2">
                <AccordionTrigger>Directive 2: Zero Layout Shifts</AccordionTrigger>
                <AccordionContent>
                  Never change{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">border-width</code>,{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">font-weight</code>, or
                  margins across hover or active states. All tabs, segmented toggles, and buttons
                  share constant glyph geometry to prevent micro-twitching.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="invariant-3">
                <AccordionTrigger>Directive 6: Concentric Corner Radii Math</AccordionTrigger>
                <AccordionContent>
                  When nesting rounded elements, inner radius is strictly computed as{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    R_inner = max(0, R_outer - Padding)
                  </code>
                  . This completely eliminates the amateur bulging look of unmatched corners.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="invariant-4">
                <AccordionTrigger>
                  Directive 7: Concealed Interactive Focus (inert)
                </AccordionTrigger>
                <AccordionContent>
                  Collapsed panels, drawers, and accordions automatically exclude hidden elements
                  from keyboard navigation sequence. Screen readers and tab keys never get trapped
                  in invisible zero-height regions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* 3. Quiet Table Chrome & Tabular Data Display */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <CpuIcon size={16} />
                Global Edge Nodes & Infrastructure Telemetry
              </CardTitle>
              <CardDescription>
                High-density data table with strict tabular numerals (
                <code className="font-mono text-xs">tabular-nums</code>) and quiet border chrome.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs tabular-nums">
                5 Active Nodes
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableCaption>
              Synchronised across 5 edge clusters, high availability active-active multi-region
              topology
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
                  <TableCell className="font-mono text-xs font-semibold">{node.id}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{node.region}</TableCell>
                  <TableCell>
                    <Badge
                      variant={node.statusVariant}
                      className={cn(
                        "text-[11px] capitalize",
                        node.status === "healthy" &&
                          "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
                        node.status === "syncing" &&
                          "border-amber-500/40 bg-amber-500/10 text-amber-500",
                        node.status === "degraded" &&
                          "border-rose-500/40 bg-rose-500/10 text-rose-500"
                      )}
                    >
                      {node.status}
                    </Badge>
                  </TableCell>
                  <TableCell numeric>
                    <span
                      className={cn(
                        "font-medium",
                        node.cpu > 80 ? "text-rose-500" : "text-foreground"
                      )}
                    >
                      {node.cpu.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell numeric className="text-muted-foreground">
                    {node.memory}
                  </TableCell>
                  <TableCell numeric>
                    <span className="font-medium text-foreground">{node.latency.toFixed(1)}</span>
                    <span className="ml-0.5 text-[10px] text-muted-foreground">ms</span>
                  </TableCell>
                  <TableCell numeric className="text-foreground">
                    {node.qps.toLocaleString()}{" "}
                    <span className="text-[10px] text-muted-foreground">qps</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-xs font-medium">
                  Aggregate Telemetry (5 Nodes Online)
                </TableCell>
                <TableCell numeric className="font-mono text-xs font-medium">
                  {(clusterNodes.reduce((acc, n) => acc + n.cpu, 0) / clusterNodes.length).toFixed(
                    1
                  )}
                  % avg
                </TableCell>
                <TableCell numeric className="font-mono text-xs font-medium text-muted-foreground">
                  37.7 / 80 GB
                </TableCell>
                <TableCell numeric className="font-mono text-xs font-medium">
                  {(
                    clusterNodes.reduce((acc, n) => acc + n.latency, 0) / clusterNodes.length
                  ).toFixed(1)}{" "}
                  ms
                </TableCell>
                <TableCell numeric className="font-mono text-xs font-medium">
                  {clusterNodes.reduce((acc, n) => acc + n.qps, 0).toLocaleString()} qps
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
