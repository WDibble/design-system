"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUpload, type FileItem } from "@/components/ui/file-upload";
import {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
} from "@/components/ui/timeline";
import { Tree, type TreeNodeData } from "@/components/ui/tree";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckIcon,
  SparklesIcon,
  FolderOpenIcon,
  SearchIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LayoutGridIcon,
  AlignLeftIcon,
  CursorClickIcon,
  TerminalIcon,
  SlidersHorizontalIcon,
} from "@/components/icons";

const frameworks = [
  "React 19",
  "Base UI",
  "Tailwind CSS v4",
  "Motion React",
  "TypeScript 5.7",
  "Vite 8",
  "Next.js",
  "Astro",
  "Svelte",
];

const treeData: TreeNodeData[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "ui", label: "ui (48 primitives)", badge: <Badge size="sm" variant="secondary" className="tabular-nums">48</Badge> },
          { id: "icons", label: "icons (470 kinetic)", badge: <Badge size="sm" variant="outline" className="tabular-nums">470</Badge> },
          { id: "demo", label: "demo" },
        ],
      },
      {
        id: "tokens",
        label: "tokens",
        children: [
          { id: "motion", label: "motion.ts" },
          { id: "gradients", label: "gradients.ts" },
          { id: "materials", label: "materials.css" },
        ],
      },
      { id: "lib", label: "lib (contrast, theme)" },
      { id: "app", label: "App.tsx" },
      { id: "index-css", label: "index.css" },
    ],
  },
  {
    id: "skills",
    label: "skills",
    children: [
      { id: "craft", label: "craft-philosophy" },
      { id: "motion-skill", label: "motion-physics" },
      { id: "base-ui", label: "base-ui-primitives" },
      { id: "theming", label: "semantic-theming" },
    ],
  },
  { id: "readme", label: "README.md" },
  { id: "philosophy", label: "PHILOSOPHY.md" },
];

export function AdvancedPrimitivesShowcase() {
  // Combobox state
  const [selectedFramework, setSelectedFramework] = React.useState<string | null>("React 19");

  // RadioGroup state
  const [density, setDensity] = React.useState("comfortable");

  // ToggleGroup state
  const [formatting, setFormatting] = React.useState<string[]>(["bold"]);
  const [viewMode, setViewMode] = React.useState("grid");

  // ContextMenu state
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [engineMode, setEngineMode] = React.useState("apca");

  // FileUpload state
  const [files, setFiles] = React.useState<FileItem[]>([]);

  // Tree state
  const [selectedTreeNode, setSelectedTreeNode] = React.useState<string>("app");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* 1. Advanced Selection & Formatting */}
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col gap-1 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <SlidersHorizontalIcon size={16} className="text-primary" />
              <span>Selection &amp; Keycap Primitives</span>
            </CardTitle>
            <Badge variant="outline" size="sm" className="font-mono text-[10px]">
              Batch 7
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Combobox autocomplete with instant filtering, accessible radio groups, and tactile physical keycaps.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1">
          {/* Combobox Autocomplete */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Filterable Combobox</span>
              <span className="text-[10px] font-mono text-muted-foreground">Base UI Combobox</span>
            </label>
            <Combobox
              items={frameworks}
              value={selectedFramework}
              onValueChange={setSelectedFramework}
            >
              <ComboboxInput
                placeholder="Search technologies..."
                icon={<SearchIcon size={14} />}
                size="default"
              />
              <ComboboxContent>
                <ComboboxEmpty>No technology found.</ComboboxEmpty>
                {frameworks.map((fw) => (
                  <ComboboxItem key={fw} value={fw}>
                    {fw}
                  </ComboboxItem>
                ))}
              </ComboboxContent>
            </Combobox>
          </div>

          {/* RadioGroup & Density Selector */}
          <div className="space-y-2.5 pt-3 border-t border-border/40">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Layout Density Radio Group</label>
              <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                Active: {density}
              </span>
            </div>
            <RadioGroup value={density} onValueChange={(v) => setDensity(v as string)} className="grid grid-cols-3 gap-2">
              {[
                { id: "compact", label: "Compact", desc: "High density" },
                { id: "comfortable", label: "Comfortable", desc: "Default spacing" },
                { id: "spacious", label: "Spacious", desc: "Airy baseline" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border/70 bg-card hover:bg-muted/40 cursor-pointer transition-colors shadow-xs"
                >
                  <RadioGroupItem value={opt.id} className="mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Toggle and Toggle Group */}
          <div className="space-y-2.5 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Interactive Toggle Toolbars</label>
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Multi-toggle formatting */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground mr-1">Style:</span>
                <ToggleGroup
                  value={formatting}
                  onValueChange={(vals) => setFormatting(vals as string[])}
                  variant="surface"
                >
                  <Toggle value="bold" aria-label="Toggle bold text" size="sm">
                    <BoldIcon size={14} />
                  </Toggle>
                  <Toggle value="italic" aria-label="Toggle italic text" size="sm">
                    <ItalicIcon size={14} />
                  </Toggle>
                  <Toggle value="underline" aria-label="Toggle underline text" size="sm">
                    <UnderlineIcon size={14} />
                  </Toggle>
                </ToggleGroup>
              </div>

              {/* Single-select view switch */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground mr-1">View:</span>
                <ToggleGroup
                  value={[viewMode]}
                  onValueChange={(vals) => {
                    if (vals && vals.length > 0) {
                      setViewMode(vals[vals.length - 1] as string);
                    }
                  }}
                  variant="outline"
                >
                  <Toggle value="grid" aria-label="Grid layout view" size="sm">
                    <LayoutGridIcon size={14} />
                  </Toggle>
                  <Toggle value="list" aria-label="List layout view" size="sm">
                    <AlignLeftIcon size={14} />
                  </Toggle>
                </ToggleGroup>
              </div>
            </div>
          </div>

          {/* Physical Kbd Matrix */}
          <div className="space-y-2 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Physical Keycap Micro-Primitives (Kbd)</label>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Palette:</span>
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">K</Kbd>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Theme:</span>
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">T</Kbd>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Dismiss:</span>
                <Kbd size="sm">Esc</Kbd>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Confirm:</span>
                <Kbd size="sm">↵ Enter</Kbd>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Contextual Surfaces: ContextMenu, HoverCard & Drawer */}
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col gap-1 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <CursorClickIcon size={16} className="text-primary" />
              <span>Contextual Floating Surfaces</span>
            </CardTitle>
            <Badge variant="outline" size="sm" className="font-mono text-[10px]">
              Desktop &amp; Mobile
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Desktop-grade right-click context menu, rich hover preview cards, and swipeable bottom drawer.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1">
          {/* Desktop Context Menu */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Right-Click Context Menu</span>
              <span className="text-[10px] font-mono text-muted-foreground">Secondary click / Long press</span>
            </label>
            <ContextMenu>
              <ContextMenuTrigger className="flex h-28 w-full flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 text-center select-none cursor-context-menu hover:bg-muted/40 transition-colors p-4">
                <CursorClickIcon size={20} className="text-muted-foreground mb-1.5" />
                <span className="text-xs font-medium text-foreground">Right click inside this area</span>
                <span className="text-[11px] text-muted-foreground">
                  Triggers native context menu with keyboard navigation
                </span>
              </ContextMenuTrigger>

              <ContextMenuContent>
                <ContextMenuItem>
                  <span>Reload Page</span>
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <span>Save Bookmark</span>
                  <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                  Show Bookmarks Bar
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Contrast Engine</ContextMenuSubTrigger>
                  <ContextMenuContent className="w-44">
                    <ContextMenuRadioGroup value={engineMode} onValueChange={setEngineMode}>
                      <ContextMenuRadioItem value="apca">WCAG 3 APCA</ContextMenuRadioItem>
                      <ContextMenuRadioItem value="aa">WCAG 2.2 AA</ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                  </ContextMenuContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <span>Purge Cache</span>
                  <ContextMenuShortcut>⇧⌘⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>

          {/* HoverCard Profile Preview */}
          <div className="space-y-2.5 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Rich Hover Preview (HoverCard)</label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Hover over author:</span>
              <HoverCard>
                <HoverCardTrigger className="text-xs font-semibold text-primary underline underline-offset-4 cursor-pointer hover:text-primary/80">
                  @antigravity
                </HoverCardTrigger>
                <HoverCardContent className="w-80 space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="size-10 border border-border/80">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">AG</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-foreground">Antigravity Engine</p>
                        <Badge size="sm" variant="secondary" className="font-mono text-[9px]">v0.1</Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        Human-centric, agent-native design system built with React 19, Base UI, and physical motion springs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground tabular-nums pt-1 border-t border-border/40 font-mono">
                    <div><strong className="text-foreground">48</strong> Primitives</div>
                    <div><strong className="text-foreground">470</strong> Icons</div>
                    <div><strong className="text-foreground">100%</strong> WCAG</div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* Bottom Sheet Drawer */}
          <div className="space-y-2.5 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Mobile Bottom Sheet (Drawer)</label>
            <div>
              <Drawer>
                <DrawerTrigger render={
                  <Button variant="outline" size="sm" className="gap-2">
                    <TerminalIcon size={14} />
                    <span>Open Bottom Drawer</span>
                  </Button>
                } />
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>System Telemetry Drawer</DrawerTitle>
                    <DrawerDescription>
                      Swipe down on touch devices or click anywhere outside to dismiss.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="space-y-3 py-2 text-xs text-muted-foreground">
                    <div className="p-3 rounded-lg bg-muted/40 border border-border/60 space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span>Fluid Frame Budget</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">16.6ms (60 FPS)</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px]">
                        <span>Speculation Pre-render</span>
                        <span className="text-primary font-semibold">Active</span>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose render={
                      <Button variant="default" size="sm" className="w-full">
                        Close Drawer
                      </Button>
                    } />
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Hierarchy & Viewport Primitives: Tree & ScrollArea */}
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col gap-1 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <FolderOpenIcon size={16} className="text-primary" />
              <span>Hierarchical Tree &amp; Scroll Viewport</span>
            </CardTitle>
            <Badge variant="outline" size="sm" className="font-mono text-[10px]">
              Keyboard Accessible
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Recursive expandable file tree and smooth scrollable viewport with auto-hiding custom thumb.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1">
          {/* Interactive Tree View */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Project File Tree</label>
              <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                Selected: {selectedTreeNode}
              </span>
            </div>
            <div className="p-3 rounded-xl border border-border/80 bg-muted/20">
              <Tree
                data={treeData}
                selectedId={selectedTreeNode}
                onSelect={(node) => setSelectedTreeNode(node.id)}
                defaultExpandedIds={["src", "components", "tokens"]}
                className="max-h-56 overflow-y-auto"
              />
            </div>
          </div>

          {/* Smooth ScrollArea Viewport */}
          <div className="space-y-2 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">Scroll Area (Auto-Hiding Scrollbar)</label>
            <ScrollArea className="h-32 w-full rounded-lg border border-border/70 p-3 bg-muted/15 font-mono text-[11px] leading-relaxed text-muted-foreground">
              <div className="space-y-1.5">
                <p className="text-emerald-600 dark:text-emerald-400">[00:00:01] System boot initialized on React 19 and Vite 8.</p>
                <p>[00:00:02] Loading Base UI accessible headless primitives.</p>
                <p>[00:00:03] Calibrating Apple HIG spring curves (damping: 24, stiffness: 260).</p>
                <p>[00:00:04] Evaluating WCAG 2.2 AA (4.5:1) and APCA (|Lc| &ge; 60) contrast bounds.</p>
                <p>[00:00:05] Initializing Speculation Rules API for instant pre-rendering.</p>
                <p>[00:00:06] Registering 48 headless primitives and 470 kinetic icons.</p>
                <p className="text-primary font-semibold">[00:00:07] Design System v0.1 ready for production.</p>
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* 4. Activity Stream & File Staging: Timeline & FileUpload */}
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex flex-col gap-1 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <SparklesIcon size={16} className="text-primary" />
              <span>Activity Stream &amp; File Staging</span>
            </CardTitle>
            <Badge variant="outline" size="sm" className="font-mono text-[10px]">
              Audit Trail
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Chronological audit timeline and tactile drag-and-drop file staging zone with format validation.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex-1">
          {/* Chronological Timeline */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Deployment Audit Timeline</label>
            <Timeline className="pt-1">
              <TimelineItem>
                <TimelineIndicator status="success">
                  <CheckIcon size={12} />
                </TimelineIndicator>
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle>Version 0.1 Tagged &amp; Published</TimelineTitle>
                    <TimelineTime dateTime="2026-10-30T12:00:00Z">Just now</TimelineTime>
                  </TimelineHeader>
                  <TimelineDescription>
                    Origin anonymity invariant enforced across 13 core directives.
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineIndicator status="primary" />
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle>Batch 7 Primitives Added</TimelineTitle>
                    <TimelineTime dateTime="2026-10-30T11:45:00Z">15m ago</TimelineTime>
                  </TimelineHeader>
                  <TimelineDescription>
                    Integrated Combobox, RadioGroup, ToggleGroup, ContextMenu, Drawer, and Timeline.
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem isLast>
                <TimelineIndicator status="default" />
                <TimelineContent>
                  <TimelineHeader>
                    <TimelineTitle>Automated Build Verified</TimelineTitle>
                    <TimelineTime dateTime="2026-10-30T11:30:00Z">30m ago</TimelineTime>
                  </TimelineHeader>
                  <TimelineDescription>
                    All 48 components compiled cleanly with zero TypeScript errors.
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>

          {/* Drag & Drop File Upload */}
          <div className="space-y-2 pt-3 border-t border-border/40">
            <label className="text-xs font-semibold text-foreground">File Staging Dropzone</label>
            <FileUpload
              value={files}
              onChange={setFiles}
              maxFiles={3}
              maxSizeMB={5}
              accept=".pdf,.png,.jpg,.json"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
