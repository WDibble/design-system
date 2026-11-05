"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverPortal = PopoverPrimitive.Portal;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps extends React.ComponentProps<typeof PopoverPrimitive.Popup> {
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
  collisionAvoidance?: PopoverPrimitive.Positioner.Props["collisionAvoidance"];
  disableAnchorTracking?: PopoverPrimitive.Positioner.Props["disableAnchorTracking"];
  portalProps?: PopoverPrimitive.Portal.Props;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      children,
      anchor,
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
          anchor={anchor}
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
              "glass-regular specular-rim relative w-72 rounded-2xl p-4 text-popover-foreground outline-none select-auto",
              // Deterministic anchor origin from Base UI positioner:
              "origin-(--transform-origin)",
              // Apple HIG micro-spring transition (scale, transform, and opacity):
              "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
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

export function PopoverHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-3 flex flex-col gap-1 border-b border-border/40 pb-3 text-left", className)}
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
      className={cn(
        "text-sm font-semibold tracking-tight [text-wrap:balance] text-foreground",
        className
      )}
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
      className={cn("text-xs leading-relaxed [text-wrap:pretty] text-muted-foreground", className)}
      {...props}
    />
  );
});
PopoverDescription.displayName = "PopoverDescription";
