"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps
  extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {
  viewportRef?: React.Ref<HTMLDivElement>;
  viewportClassName?: string;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, viewportRef, viewportClassName, ...props }, ref) => {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          className={cn("size-full rounded-[inherit] outline-none", viewportClassName)}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

export interface ScrollBarProps
  extends React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar> {}

export const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <ScrollAreaPrimitive.Scrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
          "flex touch-none select-none p-0.5 transition-colors duration-150 ease-out",
          orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
          orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
          className
        )}
        {...props}
      >
        <ScrollAreaPrimitive.Thumb
          className={cn(
            "relative flex-1 rounded-full bg-border/80 transition-colors duration-150",
            "hover:bg-muted-foreground/40",
            "active:bg-muted-foreground/60"
          )}
        />
      </ScrollAreaPrimitive.Scrollbar>
    );
  }
);
ScrollBar.displayName = "ScrollBar";
