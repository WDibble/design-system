"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverPortal = PopoverPrimitive.Portal;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps
  extends React.ComponentProps<typeof PopoverPrimitive.Popup> {
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
  collisionAvoidance?: PopoverPrimitive.Positioner.Props["collisionAvoidance"];
  disableAnchorTracking?: PopoverPrimitive.Positioner.Props["disableAnchorTracking"];
  portalProps?: PopoverPrimitive.Portal.Props;
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(
  (
    {
      className,
      children,
      side = "bottom",
      align = "center",
      sideOffset = 6,
      alignOffset = 0,
      collisionAvoidance,
      disableAnchorTracking,
      portalProps,
      ...props
    },
    ref
  ) => {
    return (
      <PopoverPortal {...portalProps}>
        <PopoverPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionAvoidance={collisionAvoidance}
          disableAnchorTracking={disableAnchorTracking}
          className="z-50 outline-none"
        >
          <PopoverPrimitive.Popup
            ref={ref}
            className={cn(
              "relative w-72 rounded-xl border border-border/80 bg-card p-4 text-card-foreground shadow-xl select-auto outline-none",
              "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08),0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]",
              // Deterministic anchor origin locked to trigger edge (eliminates dynamic origin drift):
              "data-[side=bottom]:origin-top data-[side=top]:origin-bottom data-[side=left]:origin-right data-[side=right]:origin-left",
              "data-[side=bottom]:data-[align=start]:origin-top-left data-[side=bottom]:data-[align=end]:origin-top-right",
              "data-[side=top]:data-[align=start]:origin-bottom-left data-[side=top]:data-[align=end]:origin-bottom-right",
              // Apple HIG micro-spring transition (exclusively scale and opacity):
              "transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "data-[starting-style]:scale-98 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-98 data-[ending-style]:opacity-0",
              className
            )}
            {...props}
          >
            {children}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPortal>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export function PopoverHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1 pb-3 text-left border-b border-border/40 mb-3", className)}
      {...props}
    />
  );
}
PopoverHeader.displayName = "PopoverHeader";

export const PopoverTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof PopoverPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <PopoverPrimitive.Title
      ref={ref}
      className={cn("text-sm font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
});
PopoverTitle.displayName = "PopoverTitle";

export const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof PopoverPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <PopoverPrimitive.Description
      ref={ref}
      className={cn("text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
});
PopoverDescription.displayName = "PopoverDescription";
