"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Popup> {
  side?: TooltipPrimitive.Positioner.Props["side"];
  align?: TooltipPrimitive.Positioner.Props["align"];
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
  portalProps?: TooltipPrimitive.Portal.Props;
  showArrow?: boolean;
}

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(
  (
    {
      className,
      children,
      side = "top",
      align = "center",
      sideOffset = 5,
      portalProps,
      showArrow = false,
      ...props
    },
    ref
  ) => {
    return (
      <TooltipPortal {...portalProps}>
        <TooltipPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-50 pointer-events-none select-none"
        >
          <TooltipPrimitive.Popup
            ref={ref}
            className={cn(
              "relative z-50 rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-md",
              "origin-(--transform-origin)",
              // Micro spring physics:
              "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
              className
            )}
            {...props}
          >
            {children}
            {showArrow && (
              <TooltipPrimitive.Arrow className="fill-foreground" />
            )}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPortal>
    );
  }
);
TooltipContent.displayName = "TooltipContent";
