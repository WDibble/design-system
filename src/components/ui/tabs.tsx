"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof TabsPrimitive.List> & {
    variant?: "default" | "pills" | "line";
  }
>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "relative isolate inline-flex items-center gap-1 select-none",
        variant === "default" &&
          "rounded-xl border border-border/40 bg-muted/60 p-1 text-muted-foreground shadow-xs",
        variant === "pills" && "gap-1.5 bg-transparent p-0 text-muted-foreground",
        variant === "line" &&
          "gap-4 rounded-none border-b border-border/60 p-0 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = "TabsList";

export const TabsIndicator = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof TabsPrimitive.Indicator> & {
    variant?: "default" | "pills" | "line";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <TabsPrimitive.Indicator
      ref={ref}
      className={cn(
        "pointer-events-none absolute z-0",
        // Apple HIG spring glide across active tab bounds:
        "transition-[translate,width,height] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        variant === "default" && [
          "inset-y-1 left-0 w-[var(--active-tab-width)]",
          "translate-x-[var(--active-tab-left)]",
          "rounded-lg bg-card shadow-xs",
          "border border-border/60",
          "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08),0_1px_3px_0_rgba(0,0,0,0.06)]",
        ],
        variant === "pills" && [
          "inset-y-0 left-0 w-[var(--active-tab-width)]",
          "translate-x-[var(--active-tab-left)]",
          "rounded-full bg-primary [box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.25),0_2px_8px_-1px_oklch(0_0_0_/_0.12)]",
        ],
        variant === "line" && [
          "bottom-0 left-0 h-0.5 w-[var(--active-tab-width)]",
          "translate-x-[var(--active-tab-left)]",
          "rounded-full bg-primary",
        ],
        className
      )}
      {...props}
    />
  );
});
TabsIndicator.displayName = "TabsIndicator";

export const TabsTrigger = React.forwardRef<
  HTMLElement,
  React.ComponentProps<typeof TabsPrimitive.Tab> & {
    variant?: "default" | "pills" | "line";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <TabsPrimitive.Tab
      ref={ref}
      className={cn(
        // Invariant: NEVER switch font-weight or tracking on active state (Directive #2: Zero Layout Shifts)
        "relative z-10 inline-flex cursor-pointer items-center justify-center text-xs font-medium whitespace-nowrap",
        "transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        "shrink-0 select-none disabled:pointer-events-none disabled:opacity-50",
        // Tactile micro-yield on pointerdown
        "active:scale-[0.98]",
        variant === "default" && [
          "h-8 rounded-lg px-3 text-muted-foreground hover:text-foreground",
          "data-[active]:text-foreground",
        ],
        variant === "pills" && [
          "h-8 rounded-full px-3.5 text-muted-foreground hover:text-foreground",
          "data-[active]:text-primary-foreground",
        ],
        variant === "line" && [
          "h-9 border-b-2 border-transparent px-1 pb-2 text-muted-foreground hover:text-foreground",
          "data-[active]:text-foreground",
        ],
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof TabsPrimitive.Panel>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Panel
      ref={ref}
      className={cn(
        "col-start-1 row-start-1 w-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Fluid Apple HIG crossfade & micro-glide
        "transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        "data-[starting-style]:translate-y-1.5 data-[starting-style]:scale-[0.99] data-[starting-style]:opacity-0",
        "data-[ending-style]:translate-y-[-2px] data-[ending-style]:scale-[0.99] data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";
