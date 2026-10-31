import * as React from "react";
import { cn } from "@/lib/utils";
import type { TimelineConnectorVariant, TimelineConnectorStatus } from "./types";
import { useTimeline, getConnectorTrackClass } from "./timeline-context";

export interface TimelineConnectorProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TimelineConnectorVariant;
  status?: TimelineConnectorStatus;
}

export const TimelineConnector = React.forwardRef<HTMLSpanElement, TimelineConnectorProps>(
  ({ className, variant, status, ...props }, ref) => {
    const {
      size,
      connectorVariant: defaultVariant,
      connectorStatus: defaultStatus,
    } = useTimeline();

    const resolvedVariant = variant ?? defaultVariant;
    const resolvedStatus = status ?? defaultStatus;

    const connectorLeftClass =
      size === "sm"
        ? "left-[10px] -translate-x-1/2"
        : size === "lg"
          ? "left-[18px] -translate-x-1/2"
          : "left-[14px] -translate-x-1/2";

    const connectorTopClass = size === "sm" ? "top-5" : size === "lg" ? "top-9" : "top-7";

    if (resolvedVariant === "none") return null;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-0 z-0 group-last:hidden",
          connectorTopClass,
          connectorLeftClass,
          getConnectorTrackClass(resolvedVariant, resolvedStatus),
          (resolvedVariant === "flow" || resolvedVariant === "pulse") && "overflow-hidden",
          className
        )}
        {...props}
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
    );
  }
);
TimelineConnector.displayName = "TimelineConnector";
