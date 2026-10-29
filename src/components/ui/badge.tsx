import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight select-none shrink-0 whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
        success:
          "bg-success/15 text-emerald-800 dark:text-emerald-200 border border-success/30",
        warning:
          "bg-warning/15 text-amber-900 dark:text-amber-200 border border-warning/30",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-[10px] px-2 py-0.25 leading-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({
  className,
  variant,
  size,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className="size-1.5 rounded-full bg-current shrink-0 animate-pulse"
          aria-hidden="true"
        />
      )}
      <span className="tabular-nums font-mono-numbers">{children}</span>
    </div>
  );
}
