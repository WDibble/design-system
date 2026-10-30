"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * Context & Sizing Tokens
 * -----------------------------------------------------------------------------------------------*/

export type TimelineSize = "sm" | "default" | "lg";

interface TimelineContextValue {
  size: TimelineSize;
}

const TimelineContext = React.createContext<TimelineContextValue>({
  size: "default",
});

export const useTimeline = () => React.useContext(TimelineContext);

/* -------------------------------------------------------------------------------------------------
 * Timeline (Root)
 * -----------------------------------------------------------------------------------------------*/

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  size?: TimelineSize;
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <TimelineContext.Provider value={{ size }}>
        <ol
          ref={ref}
          role="list"
          className={cn(
            "@container/timeline relative flex flex-col pl-1 sm:pl-2 select-none",
            className
          )}
          {...props}
        >
          {children}
        </ol>
      </TimelineContext.Provider>
    );
  }
);
Timeline.displayName = "Timeline";

/* -------------------------------------------------------------------------------------------------
 * TimelineItem
 * -----------------------------------------------------------------------------------------------*/

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  isLast?: boolean;
  connectorVariant?: "solid" | "dashed" | "none";
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      isLast = false,
      connectorVariant = "solid",
      children,
      ...props
    },
    ref
  ) => {
    const { size } = useTimeline();

    // Mathematically exact track center coordinates
    const connectorLeftClass =
      size === "sm"
        ? "left-[10px] -translate-x-1/2"
        : size === "lg"
        ? "left-[18px] -translate-x-1/2"
        : "left-[14px] -translate-x-1/2";

    // Track starts strictly at the bottom edge of this item's node
    const connectorTopClass =
      size === "sm"
        ? "top-5"
        : size === "lg"
        ? "top-9"
        : "top-7";

    const itemGapClass =
      size === "sm"
        ? "gap-2.5 pb-6"
        : size === "lg"
        ? "gap-4 pb-10"
        : "gap-3.5 pb-8";

    return (
      <li
        ref={ref}
        role="listitem"
        className={cn(
          "relative flex items-start group last:pb-0",
          itemGapClass,
          className
        )}
        {...props}
      >
        {!isLast && connectorVariant !== "none" && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-0 pointer-events-none group-last:hidden z-0",
              connectorTopClass,
              connectorLeftClass,
              connectorVariant === "dashed"
                ? "w-0 border-l border-dashed border-border/80 bg-transparent"
                : "w-px bg-border/80"
            )}
          />
        )}
        {children}
      </li>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

/* -------------------------------------------------------------------------------------------------
 * TimelineConnector (Explicit Track Primitive)
 * -----------------------------------------------------------------------------------------------*/

export interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "dashed";
}

export const TimelineConnector = React.forwardRef<
  HTMLSpanElement,
  TimelineConnectorProps
>(({ className, variant = "solid", ...props }, ref) => {
  const { size } = useTimeline();
  const connectorLeftClass =
    size === "sm"
      ? "left-[10px] -translate-x-1/2"
      : size === "lg"
      ? "left-[18px] -translate-x-1/2"
      : "left-[14px] -translate-x-1/2";

  const connectorTopClass =
    size === "sm"
      ? "top-5"
      : size === "lg"
      ? "top-9"
      : "top-7";

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "absolute bottom-0 pointer-events-none group-last:hidden z-0",
        connectorTopClass,
        connectorLeftClass,
        variant === "dashed"
          ? "w-0 border-l border-dashed border-border/80 bg-transparent"
          : "w-px bg-border/80",
        className
      )}
      {...props}
    />
  );
});
TimelineConnector.displayName = "TimelineConnector";

/* -------------------------------------------------------------------------------------------------
 * TimelineIndicator
 * -----------------------------------------------------------------------------------------------*/

export interface TimelineIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "default" | "primary" | "success" | "warning" | "destructive" | "muted";
  size?: TimelineSize;
  pulse?: boolean;
}

export const TimelineIndicator = React.forwardRef<
  HTMLSpanElement,
  TimelineIndicatorProps
>(
  (
    {
      className,
      status = "default",
      size: explicitSize,
      pulse = false,
      children,
      ...props
    },
    ref
  ) => {
    const context = useTimeline();
    const resolvedSize = explicitSize ?? context.size ?? "default";

    const sizeClass =
      resolvedSize === "sm"
        ? "size-5 text-[10px]"
        : resolvedSize === "lg"
        ? "size-9 text-xs"
        : "size-7 text-[11px]";

    const defaultDotClass =
      resolvedSize === "sm"
        ? "size-1.5"
        : resolvedSize === "lg"
        ? "size-2.5"
        : "size-2";

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center rounded-full border font-medium shadow-xs select-none",
          "bg-background transition-colors duration-150",
          sizeClass,
          status === "default" && "border-border/80 text-muted-foreground",
          status === "primary" && "border-primary bg-primary/10 text-primary",
          status === "success" &&
            "border-emerald-500/80 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          status === "warning" &&
            "border-amber-500/80 bg-amber-500/10 text-amber-700 dark:text-amber-300",
          status === "destructive" &&
            "border-destructive bg-destructive/10 text-destructive",
          status === "muted" &&
            "border-border/40 bg-muted/40 text-muted-foreground/60 shadow-none",
          className
        )}
        {...props}
      >
        {/* Solid background mask guarantees zero line shine-through */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-background -z-10 pointer-events-none"
        />
        {pulse && (
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full animate-ping opacity-35 bg-current pointer-events-none"
          />
        )}
        {children || <span className={cn("rounded-full bg-current", defaultDotClass)} />}
      </span>
    );
  }
);
TimelineIndicator.displayName = "TimelineIndicator";

/* -------------------------------------------------------------------------------------------------
 * Content & Typography Hierarchy
 * -----------------------------------------------------------------------------------------------*/

export function TimelineContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 flex flex-col min-w-0 pt-0.5", className)}
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
      className={cn(
        "flex flex-col @[20rem]/timeline:flex-row @[20rem]/timeline:items-baseline justify-between gap-1 @[20rem]/timeline:gap-3",
        className
      )}
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
      className={cn(
        "text-sm font-semibold text-foreground tracking-tight leading-snug",
        className
      )}
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
      className={cn(
        "text-xs font-mono text-muted-foreground/80 tabular-nums shrink-0",
        className
      )}
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
      className={cn(
        "text-xs text-muted-foreground leading-relaxed mt-1",
        className
      )}
      {...props}
    />
  );
}
TimelineDescription.displayName = "TimelineDescription";

export function TimelineBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-2.5 text-xs text-foreground space-y-2", className)}
      {...props}
    />
  );
}
TimelineBody.displayName = "TimelineBody";

export function TimelineFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
TimelineFooter.displayName = "TimelineFooter";
