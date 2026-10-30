"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        role="list"
        className={cn("relative flex flex-col gap-6 pl-2", className)}
        {...props}
      >
        {children}
      </ol>
    );
  }
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  isLast?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, isLast = false, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        role="listitem"
        className={cn("relative flex items-start gap-3.5 group", className)}
        {...props}
      >
        {!isLast && (
          <span
            aria-hidden="true"
            className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-border/80 group-last:hidden"
          />
        )}
        {children}
      </li>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

export interface TimelineIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "default" | "primary" | "success" | "warning" | "destructive";
}

export const TimelineIndicator = React.forwardRef<
  HTMLSpanElement,
  TimelineIndicatorProps
>(({ className, status = "default", children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium shadow-xs select-none",
        "bg-background transition-colors duration-150",
        status === "default" && "border-border/80 text-muted-foreground",
        status === "primary" && "border-primary bg-primary/10 text-primary",
        status === "success" && "border-emerald-500/80 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        status === "warning" && "border-amber-500/80 bg-amber-500/10 text-amber-600 dark:text-amber-400",
        status === "destructive" && "border-destructive bg-destructive/10 text-destructive",
        className
      )}
      {...props}
    >
      {children || <span className="size-1.5 rounded-full bg-current" />}
    </span>
  );
});
TimelineIndicator.displayName = "TimelineIndicator";

export function TimelineContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 flex flex-col gap-1 min-w-0 pt-0.5", className)}
      {...props}
    />
  );
}
TimelineContent.displayName = "TimelineContent";

export function TimelineHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-wrap items-baseline justify-between gap-2", className)}
      {...props}
    />
  );
}
TimelineHeader.displayName = "TimelineHeader";

export function TimelineTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("text-xs font-semibold text-foreground tracking-tight", className)}
      {...props}
    />
  );
}
TimelineTitle.displayName = "TimelineTitle";

export function TimelineTime({
  className,
  ...props
}: React.TimeHTMLAttributes<HTMLTimeElement>) {
  return (
    <time
      className={cn("text-[10px] font-mono text-muted-foreground tabular-nums shrink-0", className)}
      {...props}
    />
  );
}
TimelineTime.displayName = "TimelineTime";

export function TimelineDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}
TimelineDescription.displayName = "TimelineDescription";
