import * as React from "react";
import { cn } from "@/lib/utils";
import type { TimelineSize } from "./types";
import { useTimeline } from "./timeline-context";

export interface TimelineIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "default" | "primary" | "success" | "warning" | "destructive" | "muted";
  size?: TimelineSize;
  pulse?: boolean;
  heartbeat?: boolean;
  progress?: number | "indeterminate";
  step?: number;
  interactive?: boolean;
}

export const TimelineIndicator = React.forwardRef<HTMLSpanElement, TimelineIndicatorProps>(
  (
    {
      className,
      status = "default",
      size: explicitSize,
      pulse = false,
      heartbeat = false,
      progress,
      step,
      interactive = false,
      children,
      tabIndex,
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
      resolvedSize === "sm" ? "size-1.5" : resolvedSize === "lg" ? "size-2.5" : "size-2";

    // SVG Progress Ring Geometry
    const svgDim = resolvedSize === "sm" ? 20 : resolvedSize === "lg" ? 36 : 28;
    const strokeWidth = resolvedSize === "sm" ? 1.5 : 2;
    const radius = (svgDim - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;

    const strokeOffset =
      typeof progress === "number"
        ? circumference - (circumference * Math.min(100, Math.max(0, progress))) / 100
        : circumference * 0.75;

    const defaultLabel =
      typeof progress === "number"
        ? `Progress ${Math.round(progress)} percent`
        : progress === "indeterminate"
          ? "Progress in progress"
          : step !== undefined
            ? `Step ${step}`
            : heartbeat
              ? `Telemetry probe, status ${status}`
              : pulse
                ? `Active event, status ${status}`
                : `Timeline indicator, status ${status}`;

    const resolvedAriaLabel =
      (props as any)["aria-label"] ?? (interactive ? defaultLabel : undefined);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (interactive && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        (props.onClick as any)?.(e);
      }
      props.onKeyDown?.(e);
    };

    return (
      <span
        ref={ref}
        aria-hidden={!interactive}
        role={interactive ? "button" : undefined}
        aria-label={resolvedAriaLabel}
        tabIndex={interactive ? (tabIndex ?? 0) : undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          "isolation-isolate relative z-10 flex shrink-0 transform-gpu items-center justify-center rounded-full border font-medium shadow-xs select-none",
          "bg-background transition-colors duration-150",
          sizeClass,
          status === "default" && "border-border/80 text-muted-foreground",
          status === "primary" &&
            (pulse
              ? "border-primary/45 bg-background text-primary shadow-2xs"
              : "border-primary bg-primary/10 text-primary"),
          status === "success" &&
            (pulse
              ? "border-emerald-500/45 bg-background text-emerald-600 shadow-2xs dark:text-emerald-400"
              : "border-emerald-500/80 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"),
          status === "warning" &&
            (pulse
              ? "border-amber-500/45 bg-background text-amber-700 shadow-2xs dark:text-amber-300"
              : "border-amber-500/80 bg-amber-500/10 text-amber-700 dark:text-amber-300"),
          status === "destructive" &&
            (pulse
              ? "border-destructive/45 bg-background text-destructive shadow-2xs"
              : "border-destructive bg-destructive/10 text-destructive"),
          status === "muted" && "border-border/40 bg-muted/40 text-muted-foreground/60 shadow-none",
          interactive &&
            "cursor-pointer transition-transform duration-100 after:absolute after:-inset-1.5 after:content-[''] hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-[0.97]",
          className
        )}
        {...props}
      >
        {/* Solid background mask guarantees zero line shine-through */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-background"
        />

        {/* Circular Progress Ring Overlay */}
        {progress !== undefined && (
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${svgDim} ${svgDim}`}
            className={cn(
              "pointer-events-none absolute inset-0 size-full -rotate-90",
              progress === "indeterminate" && "animate-spin duration-1000"
            )}
          >
            {/* Background Track */}
            <circle
              cx={svgDim / 2}
              cy={svgDim / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="opacity-20"
            />
            {/* Active Value Stroke */}
            <circle
              cx={svgDim / 2}
              cy={svgDim / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={
                progress === "indeterminate"
                  ? `${circumference * 0.3} ${circumference * 0.7}`
                  : circumference
              }
              strokeDashoffset={progress === "indeterminate" ? 0 : strokeOffset}
              strokeLinecap="round"
              className={cn(
                "transition-[stroke-dashoffset] duration-300 ease-out",
                status === "primary" ? "text-primary" : "text-current"
              )}
            />
          </svg>
        )}

        {/* Fluid radar dissipation wave with resting normal state */}
        {pulse && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transform-gpu animate-[ping-compact_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border border-current bg-current/20 will-change-transform"
          />
        )}

        {/* Content Slots: Children > Step Number > Progress Label > Heartbeat > Default Dot */}
        {children ? (
          children
        ) : step !== undefined ? (
          <span className="font-mono leading-none font-semibold tabular-nums">{step}</span>
        ) : typeof progress === "number" ? (
          <span className="font-mono text-[9px] leading-none font-semibold tabular-nums">
            {Math.round(progress)}
          </span>
        ) : heartbeat ? (
          <span
            aria-hidden="true"
            className={cn(
              "transform-gpu animate-[heartbeat-led_2.8s_ease-in-out_infinite] rounded-full bg-current will-change-transform",
              defaultDotClass
            )}
          />
        ) : (
          <span className={cn("rounded-full bg-current", defaultDotClass)} />
        )}
      </span>
    );
  }
);
TimelineIndicator.displayName = "TimelineIndicator";
