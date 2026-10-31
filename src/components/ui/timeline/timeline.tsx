import * as React from "react";
import { cn } from "@/lib/utils";
import type { TimelineSize, TimelineConnectorVariant, TimelineConnectorStatus } from "./types";
import { TimelineContext, useTimeline, getConnectorTrackClass } from "./timeline-context";

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  size?: TimelineSize;
  connectorVariant?: TimelineConnectorVariant;
  connectorStatus?: TimelineConnectorStatus;
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  (
    {
      className,
      size = "default",
      connectorVariant = "solid",
      connectorStatus = "default",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TimelineContext.Provider value={{ size, connectorVariant, connectorStatus }}>
        <ol
          ref={ref}

          className={cn(
            "@container/timeline relative flex flex-col pl-2 select-none sm:pl-3",
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

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  isLast?: boolean;
  connectorVariant?: TimelineConnectorVariant;
  connectorStatus?: TimelineConnectorStatus;
  activeFlow?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      isLast = false,
      connectorVariant,
      connectorStatus,
      activeFlow = false,
      children,
      ...props
    },
    ref
  ) => {
    const {
      size,
      connectorVariant: defaultVariant,
      connectorStatus: defaultStatus,
    } = useTimeline();

    const connectorLeftClass =
      size === "sm"
        ? "left-[10px] -translate-x-1/2"
        : size === "lg"
          ? "left-[18px] -translate-x-1/2"
          : "left-[14px] -translate-x-1/2";

    const connectorTopClass = size === "sm" ? "top-5" : size === "lg" ? "top-9" : "top-7";

    const itemGapClass =
      size === "sm" ? "gap-3 pb-6" : size === "lg" ? "gap-5 pb-10" : "gap-4 pb-8";

    const resolvedVariant = activeFlow ? "flow" : (connectorVariant ?? defaultVariant);

    const resolvedStatus = connectorStatus ?? defaultStatus;

    return (
      <li
        ref={ref}

        className={cn("group relative flex items-start last:pb-0", itemGapClass, className)}
        {...props}
      >
        {!isLast && resolvedVariant !== "none" && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-0 z-0 group-last:hidden",
              connectorTopClass,
              connectorLeftClass,
              getConnectorTrackClass(resolvedVariant, resolvedStatus),
              (resolvedVariant === "flow" || resolvedVariant === "pulse") && "overflow-hidden"
            )}
          >
            {resolvedVariant === "flow" && (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-10 transform-gpu animate-[flow-packet_2.2s_cubic-bezier(0.4,0,0.6,1)_infinite] bg-gradient-to-b from-transparent via-primary to-transparent will-change-transform",
                  resolvedStatus === "success" && "via-emerald-500",
                  resolvedStatus === "warning" && "via-amber-500",
                  resolvedStatus === "destructive" && "via-destructive"
                )}
              />
            )}

            {resolvedVariant === "pulse" && (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 w-full transform-gpu animate-[line-pulse_2.4s_ease-in-out_infinite] will-change-transform",
                  resolvedStatus === "default" && "bg-primary/50",
                  resolvedStatus === "primary" && "bg-primary",
                  resolvedStatus === "success" && "bg-emerald-500",
                  resolvedStatus === "warning" && "bg-amber-500",
                  resolvedStatus === "destructive" && "bg-destructive"
                )}
              />
            )}
          </span>
        )}
        {children}
      </li>
    );
  }
);
TimelineItem.displayName = "TimelineItem";
