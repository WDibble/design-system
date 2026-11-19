"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardInner,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart, Sparkline } from "@/components/ui/chart";
import { ProgressiveImage } from "@/components/ui/image";
import { Kbd } from "@/components/ui/kbd";
import { NumberTicker } from "@/components/ui/number-ticker";
import { CircularProgress, Progress } from "@/components/ui/progress";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Tree, type TreeNodeData } from "@/components/ui/tree";

const INITIAL_CALENDAR_DATE = new Date(2026, 9, 31);

const LATENCY_SERIES = [
  { label: "00:00", value: 24 },
  { label: "06:00", value: 18 },
  { label: "12:00", value: 21 },
  { label: "18:00", value: 14 },
];

const SPECIMEN_IMAGE_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="#171717"/><circle cx="320" cy="180" r="96" fill="none" stroke="#e5e5e5" stroke-width="2"/><rect x="224" y="136" width="192" height="88" rx="16" fill="none" stroke="#a3a3a3" stroke-width="1.5"/></svg>'
  );

const SAMPLE_TREE_NODES: TreeNodeData[] = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "ui", label: "components/ui (57)" },
      { id: "docs", label: "docs/specs" },
    ],
  },
  { id: "registry", label: "public/registry.json" },
];

export function AccordionExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion defaultValue={["q1"]}>
        <AccordionItem value="q1">
          <AccordionTrigger>What prevents button flicker during async loading?</AccordionTrigger>
          <AccordionContent>
            An invisible ghost footprint sizer locks horizontal bounds across idle and loading
            states.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>Why interpolate gradients in OKLCH?</AccordionTrigger>
          <AccordionContent>
            Perceptual colour ramps maintain consistent lightness without sRGB grey midpoints.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function AvatarExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback autoColor>WD</AvatarFallback>
        <AvatarBadge status="online" />
      </Avatar>
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarFallback autoColor>AR</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback autoColor>MK</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  );
}

export function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">v2.0</Badge>
      <Badge variant="success" dot>
        Operational
      </Badge>
      <Badge variant="warning">Threshold</Badge>
      <Badge variant="outline">57 Primitives</Badge>
    </div>
  );
}

export function CalendarExample() {
  const [date, setDate] = React.useState<Date | null>(INITIAL_CALENDAR_DATE);

  return <Calendar selected={date ?? undefined} onSelect={(next) => setDate(next)} />;
}

export function CardExample() {
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Concentric Container</CardTitle>
          <CardDescription>Inner surface radius calibrated for smooth visual flow.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardInner>
            <div className="text-xs text-muted-foreground">
              R_inner equals outer radius minus container padding.
            </div>
          </CardInner>
        </CardContent>
      </Card>
    </div>
  );
}

export function ChartExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">Edge Latency Trend</span>
        <Sparkline data={[24, 18, 21, 14]} trend="up" />
      </div>
      <AreaChart data={LATENCY_SERIES} height={110} valueFormatter={(v) => `${v} ms`} />
    </div>
  );
}

export function ImageExample() {
  return (
    <div className="w-full max-w-sm">
      <ProgressiveImage
        src={SPECIMEN_IMAGE_URI}
        alt="Geometric design token proportion diagram"
        aspectRatio="16/9"
        className="rounded-xl border border-border/60"
      />
    </div>
  );
}

export function KbdExample() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        Command Palette <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
      <span className="inline-flex items-center gap-1">
        Documentation <Kbd>⌘</Kbd>
        <Kbd>D</Kbd>
      </span>
    </div>
  );
}

export function NumberTickerExample() {
  return (
    <div className="flex items-baseline gap-2 text-2xl font-bold text-foreground tabular-nums">
      <NumberTicker value={100.0} decimalPlaces={1} suffix="%" />
      <span className="text-xs font-medium text-muted-foreground">Quality Score</span>
    </div>
  );
}

export function ProgressExample() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <div className="min-w-0 flex-1">
        <Progress value={84} aria-label="AST documentation compilation progress" />
      </div>
      <CircularProgress value={84} aria-label="Circular compilation completion" />
    </div>
  );
}

export function ResizableExample() {
  return (
    <div className="h-28 w-full max-w-md overflow-hidden rounded-xl border border-border/70">
      <ResizablePanelGroup direction="horizontal" defaultSizes={[45, 55]}>
        <ResizablePanel order={0} defaultSize={45}>
          <div className="flex h-full items-center justify-center bg-muted/40 p-3 text-xs text-muted-foreground">
            Inspector
          </div>
        </ResizablePanel>
        <ResizableHandle handleIndex={0} withHandle />
        <ResizablePanel order={1} defaultSize={55}>
          <div className="flex h-full items-center justify-center bg-card p-3 text-xs text-foreground">
            Canvas Stage
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export function ScrollAreaExample() {
  return (
    <ScrollArea className="h-28 w-full max-w-sm rounded-xl border border-border/70 p-3">
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <p>Directive 01: Physical yield on pointerdown</p>
        <p>Directive 02: Zero layout shifts across states</p>
        <p>Directive 03: Tabular numerals on numeric columns</p>
        <p>Directive 06: Concentric nested corner radii</p>
        <p>Directive 11: Perceptual OKLCH contrast gates</p>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

export function SkeletonExample() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-36" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function TableExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cluster Region</TableHead>
          <TableHead numeric>P95 Latency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>eu-west-2 (London)</TableCell>
          <TableCell numeric>14 ms</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>us-east-1 (Virginia)</TableCell>
          <TableCell numeric>19 ms</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function TimelineExample() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineIndicator status="success" />
        <TimelineConnector />
        <TimelineContent>
          <TimelineTitle>AST Specs Verified</TimelineTitle>
          <TimelineDescription>57 component specs compiled cleanly.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator status="primary" />
        <TimelineContent>
          <TimelineTitle>Invariants Passing</TimelineTitle>
          <TimelineDescription>18 directives verified at zero warnings.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export function TreeExample() {
  return (
    <div className="w-full max-w-xs">
      <Tree data={SAMPLE_TREE_NODES} defaultExpandedIds={["src"]} />
    </div>
  );
}
