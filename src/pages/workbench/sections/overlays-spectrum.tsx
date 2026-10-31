import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardInner,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  LayersIcon,
  SparklesIcon,
  CopyIcon,
  ActivityIcon,
  Trash2Icon,
  ZapIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
} from "@/components/icons";

export function OverlaysSpectrum() {
  const [menuShowStatus, setMenuShowStatus] = React.useState(true);
  const [menuShowActivity, setMenuShowActivity] = React.useState(false);
  const [menuFrequency, setMenuFrequency] = React.useState("realtime");

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          <LayersIcon size={16} />
          Overlays & Floating Surfaces (Batch 3)
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Apple HIG spring physics, trigger-anchored origins, strict Escape and outside-click
          parity, and concentric corner radii
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Column 1: Modals, Alerts & Sheets */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" size="sm">
                Directive #4 & #6
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                Focus Trap · Escape Parity
              </span>
            </div>
            <CardTitle className="mt-2">Modals, Confirmations & Drawers</CardTitle>
            <CardDescription>
              Full focus trapping, smooth backdrop blur, 1px specular lighting, and fluid spring
              entrance and exit.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-wrap items-center gap-3">
            {/* 1. Standard Modal Dialog */}
            <Dialog>
              <DialogTrigger render={<Button variant="default" />}>
                Open Standard Dialogue
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configure Deployment Target</DialogTitle>
                  <DialogDescription>
                    Set up custom environment variables and cluster regions for your automated
                    deployments.
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
                    <FieldDescription>
                      Low-latency edge nodes will be provisioned in this region.
                    </FieldDescription>
                  </Field>
                </div>

                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
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
                    This action cannot be undone. This will permanently delete your cluster
                    database, purge all DNS cache records, and revoke active auth tokens.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">Confirm Deletion</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* 3. Slide-Over Sheet */}
            <Sheet>
              <SheetTrigger render={<Button variant="secondary" />}>Open Side Sheet</SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Audit Logs & Telemetry</SheetTitle>
                  <SheetDescription>
                    Real-time streaming event bus metrics from edge clusters.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex grow flex-col gap-3 overflow-y-auto px-6 py-4">
                  <CardInner className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">Worker Spawned</span>
                      <span className="font-mono text-muted-foreground tabular-nums">12:48:02</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Node worker <code className="font-mono text-primary">#1492</code> started on
                      cluster <code className="font-mono">us-east-va-1</code>.
                    </p>
                  </CardInner>

                  <CardInner className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Health Check 200 OK
                      </span>
                      <span className="font-mono text-muted-foreground tabular-nums">12:47:58</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Latency:{" "}
                      <span className="font-mono font-semibold text-foreground tabular-nums">
                        14ms
                      </span>{" "}
                      across 18 edge locations.
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
              <span className="font-mono text-xs text-muted-foreground">
                Trigger-Anchored Origin
              </span>
            </div>
            <CardTitle className="mt-2">Menus, Popovers & Micro Tooltips</CardTitle>
            <CardDescription>
              Submenus, keyboard navigation, collision detection, and zero-shift shortcut
              indicators.
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
                      <DropdownMenuRadioItem value="realtime">Real-time (1s)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="5s">Throttled (5s)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="paused">Paused</DropdownMenuRadioItem>
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
              <PopoverTrigger render={<Button variant="secondary" />}>API Keys</PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <PopoverHeader>
                  <PopoverTitle>Production Key</PopoverTitle>
                  <PopoverDescription>
                    Use this key in your Authorization bearer header.
                  </PopoverDescription>
                </PopoverHeader>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/40 p-2">
                    <span className="truncate font-mono text-xs text-foreground tabular-nums select-all">
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
              <div className="flex items-center gap-1.5 border-l border-border/60 pl-2">
                <Tooltip>
                  <TooltipTrigger
                    render={<Button size="icon" variant="ghost" aria-label="Quick deploy" />}
                  >
                    <ZapIcon size={16} />
                  </TooltipTrigger>
                  <TooltipContent side="top">Instant Edge Deploy (⌘D)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={<Button size="icon" variant="ghost" aria-label="Security status" />}
                  >
                    <ShieldCheckIcon size={16} />
                  </TooltipTrigger>
                  <TooltipContent side="top">SOC2 Compliance Verified</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    render={<Button size="icon" variant="ghost" aria-label="Telemetry settings" />}
                  >
                    <SlidersHorizontalIcon size={16} />
                  </TooltipTrigger>
                  <TooltipContent side="top">Adjust Telemetry Thresholds</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
