"use client";

import * as React from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "@/lib/utils";

export const HoverCard = PreviewCardPrimitive.Root;
export const HoverCardTrigger = PreviewCardPrimitive.Trigger;
export const HoverCardPortal = PreviewCardPrimitive.Portal;

export interface HoverCardContentProps
  extends React.ComponentProps<typeof PreviewCardPrimitive.Popup> {
  sideOffset?: number;
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  side?: PreviewCardPrimitive.Positioner.Props["side"];
}

export const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 8,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <PreviewCardPrimitive.Portal>
        <PreviewCardPrimitive.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-50 outline-none"
        >
          <PreviewCardPrimitive.Popup
            ref={ref}
            className={cn(
              "w-72 rounded-xl border border-border/80 bg-popover/95 p-4 text-popover-foreground shadow-2xl backdrop-blur-md outline-none",
              "specular-rim",
              "transition-[opacity,transform] duration-150 ease-out",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
              className
            )}
            {...props}
          >
            {children}
          </PreviewCardPrimitive.Popup>
        </PreviewCardPrimitive.Positioner>
      </PreviewCardPrimitive.Portal>
    );
  }
);
HoverCardContent.displayName = "HoverCardContent";
