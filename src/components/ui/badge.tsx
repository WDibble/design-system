"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight whitespace-nowrap transition-colors duration-150 ease-out select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs [box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.15)]",
        secondary:
          "bg-secondary text-secondary-foreground [box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs [box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.15)]",
        outline:
          "border border-border/80 bg-card text-foreground [box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.06)]",
        success: "border border-success/30 bg-success/15 text-emerald-800 dark:text-emerald-200",
        warning: "border border-warning/30 bg-warning/15 text-amber-900 dark:text-amber-200",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.25 text-[10px] leading-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, variant, size, dot = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className="size-1.5 shrink-0 animate-pulse rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      <span className="font-mono-numbers tabular-nums">{children}</span>
    </div>
  );
}
