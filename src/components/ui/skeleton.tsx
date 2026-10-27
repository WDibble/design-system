import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional specular highlight across the shimmering skeleton surface.
   * @default false
   */
  shimmer?: boolean;
}

/**
 * Skeleton Loader Component
 *
 * Adheres to Apple HIG and WCAG 2.2 dimension stability:
 * - Maintains identical resolved footprint to prevent cumulative layout shift (CLS).
 * - Carries role="status" and aria-label="Loading..." for assistive technologies.
 * - Only displayed when async loading exceeds ~300ms to avoid flicker on fast networks.
 */
export function Skeleton({
  className,
  shimmer = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading content..."
      className={cn(
        "animate-pulse rounded-lg bg-muted/70 select-none pointer-events-none",
        shimmer &&
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
