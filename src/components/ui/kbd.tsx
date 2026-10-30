"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "xs" | "sm" | "default" | "lg";
}

/**
 * Kbd: Tactile physical keycap micro-primitive.
 * Conforms to Directive 3 (Tabular Numerals) and Directive 2 (Zero Layout Shifts).
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-mono font-medium tabular-nums select-none shrink-0",
          "rounded-[4px] border border-border/80 border-b-[2px] bg-muted/60 text-muted-foreground shadow-xs",
          "transition-colors duration-150 leading-none",
          size === "xs" && "text-[9px] px-1 py-0.5 min-h-[16px] min-w-[16px]",
          size === "sm" && "text-[10px] px-1.5 py-0.5 min-h-[18px] min-w-[18px]",
          size === "default" && "text-[11px] px-2 py-0.5 min-h-[22px] min-w-[22px]",
          size === "lg" && "text-xs px-2.5 py-1 min-h-[26px] min-w-[26px]",
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";
