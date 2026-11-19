"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function ToastDemoTrigger() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast({
          title: "Snapshot Exported",
          description: "Token manifest synchronised across edge targets.",
          type: "success",
        })
      }
    >
      Trigger Notification
    </Button>
  );
}

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "destructive", size: "sm" })}>
        Revoke Deployment Token
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke production token?</AlertDialogTitle>
          <AlertDialogDescription>
            Requests authenticating with this credential fail immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Revoke Token</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function CommandExample() {
  return (
    <div className="w-full max-w-md rounded-xl border border-border/70 bg-card shadow-xs">
      <Command aria-label="Workspace actions">
        <CommandInput placeholder="Filter workspace commands..." />
        <CommandList>
          <CommandEmpty>No commands matched.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem>
              <span>Documentation Portal</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Theme Studio</span>
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export function ContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="rounded-xl border border-dashed border-border/80 bg-muted/40 px-6 py-5 text-xs text-muted-foreground">
          Secondary click this canvas surface for context actions
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy Primitive Path</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Run Contrast Audit</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Edit OKLCH Seed
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calibrate Primary Accent</DialogTitle>
          <DialogDescription>
            Adjust OKLCH chroma and lightness while keeping APCA contrast above Lc 60.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className={buttonVariants({ variant: "default", size: "sm" })}>
            Apply Seed
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Open Filter Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHandle />
        <DrawerHeader>
          <DrawerTitle>Filter Component Matrix</DrawerTitle>
          <DrawerDescription>Narrow catalogue entries by category.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className={buttonVariants({ variant: "outline", size: "sm" })}>
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Release Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Distribution</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Rebuild Docs Manifest</DropdownMenuItem>
        <DropdownMenuItem>Verify Invariants</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HoverCardExample() {
  return (
    <HoverCard>
      <HoverCardTrigger
        href="#docs"
        className="font-mono text-xs font-medium text-primary underline underline-offset-4"
      >
        @antigravity/primitives
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-xs leading-relaxed text-muted-foreground">
          57 accessible primitives verified against WCAG 2.2 AA and APCA perceptual contrast.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}

export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Inspect Thresholds
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Contrast Floors</PopoverTitle>
          <PopoverDescription>
            Body prose requires Lc 75+; controls require Lc 60+.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export function SheetExample() {
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        Inspect Telemetry Sheet
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Compiler Audit Stream</SheetTitle>
          <SheetDescription>Recent invariant checks and AST sync results.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose className={buttonVariants({ variant: "outline", size: "sm" })}>
            Dismiss
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function ToastExample() {
  return (
    <ToastProvider>
      <ToastDemoTrigger />
    </ToastProvider>
  );
}

export function TooltipExample() {
  return (
    <TooltipProvider delay={100}>
      <Tooltip>
        <TooltipTrigger
          aria-label="Inspect build gate hint"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Hover for Shortcut
        </TooltipTrigger>
        <TooltipContent>Open Documentation Portal (⌘D)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
