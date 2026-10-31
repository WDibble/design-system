"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "xs" | "sm" | "default" | "lg";
  variant?: "default" | "inverted";
}

/**
 * Kbd: Tactile physical keycap micro-primitive.
 * Conforms to Directive 3 (Tabular Numerals) and Directive 2 (Zero Layout Shifts).
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = "default", variant = "default", children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex shrink-0 items-center justify-center font-mono font-medium tabular-nums select-none",
          "rounded-[4px] leading-none shadow-xs transition-colors duration-150",
          variant === "default" &&
            "border border-b-[2px] border-border/80 bg-muted/60 text-muted-foreground",
          variant === "inverted" &&
            "border border-b-[2px] border-background/25 border-b-background/40 bg-background/15 text-background",
          size === "xs" && "min-h-[16px] min-w-[16px] px-1 py-0.5 text-[9px]",
          size === "sm" && "min-h-[18px] min-w-[18px] px-1.5 py-0.5 text-[10px]",
          size === "default" && "min-h-[22px] min-w-[22px] px-2 py-0.5 text-[11px]",
          size === "lg" && "min-h-[26px] min-w-[26px] px-2.5 py-1 text-xs",
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
