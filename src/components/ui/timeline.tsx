"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckIcon,
  GitBranchIcon,
  GitCommitHorizontalIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  PlayIcon,
} from "@/components/icons";
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
            "@container/timeline relative flex flex-col pl-2 sm:pl-3 select-none",
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
  connectorVariant?: "solid" | "dashed" | "flow" | "none";
  activeFlow?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      isLast = false,
      connectorVariant = "solid",
      activeFlow = false,
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
        ? "gap-3 pb-6"
        : size === "lg"
        ? "gap-5 pb-10"
        : "gap-4 pb-8";

    const resolvedVariant = activeFlow ? "flow" : connectorVariant;

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
        {!isLast && resolvedVariant !== "none" && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-0 pointer-events-none group-last:hidden z-0",
              connectorTopClass,
              connectorLeftClass,
              resolvedVariant === "dashed"
                ? "w-0 border-l border-dashed border-border/80 bg-transparent"
                : "w-px bg-border/80",
              resolvedVariant === "flow" && "overflow-hidden"
            )}
          >
            {resolvedVariant === "flow" && (
              <span
                aria-hidden="true"
                className="absolute left-0 w-full h-10 bg-gradient-to-b from-transparent via-primary to-transparent animate-[flow-packet_2.2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
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

/* -------------------------------------------------------------------------------------------------
 * TimelineConnector (Explicit Track Primitive)
 * -----------------------------------------------------------------------------------------------*/

export interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "dashed" | "flow";
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
        variant === "flow" && "overflow-hidden",
        className
      )}
      {...props}
    >
      {variant === "flow" && (
        <span
          aria-hidden="true"
          className="absolute left-0 w-full h-10 bg-gradient-to-b from-transparent via-primary to-transparent animate-[flow-packet_2.2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
        />
      )}
    </span>
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
  heartbeat?: boolean;
  progress?: number | "indeterminate";
  step?: number;
  interactive?: boolean;
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
      resolvedSize === "sm"
        ? "size-1.5"
        : resolvedSize === "lg"
        ? "size-2.5"
        : "size-2";

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
          interactive &&
            "cursor-pointer hover:border-foreground/30 active:scale-[0.97] transition-transform duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background after:absolute after:-inset-1.5 after:content-['']",
          className
        )}
        {...props}
      >
        {/* Solid background mask guarantees zero line shine-through */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-background -z-10 pointer-events-none"
        />

        {/* Circular Progress Ring Overlay */}
        {progress !== undefined && (
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${svgDim} ${svgDim}`}
            className={cn(
              "absolute inset-0 size-full -rotate-90 pointer-events-none",
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

        {/* Fluid radar dissipation wave */}
        {pulse && (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-current bg-current/25 animate-[ping-compact_2.4s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute -inset-0.5 rounded-full opacity-15 bg-current pointer-events-none"
            />
          </>
        )}

        {/* Content Slots: Children > Step Number > Progress Label > Heartbeat > Default Dot */}
        {children ? (
          children
        ) : step !== undefined ? (
          <span className="font-mono font-semibold tabular-nums leading-none">
            {step}
          </span>
        ) : typeof progress === "number" ? (
          <span className="font-mono text-[9px] font-semibold tabular-nums leading-none">
            {Math.round(progress)}
          </span>
        ) : heartbeat ? (
          <span
            aria-hidden="true"
            className={cn(
              "rounded-full bg-current animate-[heartbeat-led_2.8s_ease-in-out_infinite]",
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

/* -------------------------------------------------------------------------------------------------
 * Specialized Nodes Pack
 * -----------------------------------------------------------------------------------------------*/

/**
 * 1. TimelineStepNode
 * Sequenced workflow stage node that smoothly morphs from a tabular step number into a checkmark.
 */
export interface TimelineStepNodeProps
  extends Omit<TimelineIndicatorProps, "step"> {
  step: number;
  state?: "pending" | "current" | "completed";
}

export const TimelineStepNode = React.forwardRef<
  HTMLSpanElement,
  TimelineStepNodeProps
>(({ step, state = "pending", status, pulse, ...props }, ref) => {
  const isCompleted = state === "completed";
  const isCurrent = state === "current";

  const resolvedStatus =
    status ?? (isCompleted ? "success" : isCurrent ? "primary" : "default");

  return (
    <TimelineIndicator
      ref={ref}
      status={resolvedStatus}
      pulse={pulse ?? isCurrent}
      {...props}
    >
      {isCompleted ? (
        <CheckIcon size={14} className="text-current stroke-[2.5]" />
      ) : (
        <span className="font-mono font-semibold tabular-nums leading-none">
          {step}
        </span>
      )}
    </TimelineIndicator>
  );
});
TimelineStepNode.displayName = "TimelineStepNode";

/**
 * 2. TimelineProgressNode
 * Conic circular progress stroke tracking determinate percentage or indeterminate sweep.
 */
export interface TimelineProgressNodeProps extends TimelineIndicatorProps {
  progress?: number | "indeterminate";
}

export const TimelineProgressNode = React.forwardRef<
  HTMLSpanElement,
  TimelineProgressNodeProps
>(({ progress = "indeterminate", status = "primary", ...props }, ref) => {
  return (
    <TimelineIndicator
      ref={ref}
      status={status}
      progress={progress}
      {...props}
    />
  );
});
TimelineProgressNode.displayName = "TimelineProgressNode";

/**
 * 3. TimelineHeartbeatNode
 * Telemetry LED with hardware-synchronised dual-beat cardiac rhythm for live WebSocket channels.
 */
export interface TimelineHeartbeatNodeProps extends TimelineIndicatorProps {}

export const TimelineHeartbeatNode = React.forwardRef<
  HTMLSpanElement,
  TimelineHeartbeatNodeProps
>(({ status = "success", ...props }, ref) => {
  return (
    <TimelineIndicator
      ref={ref}
      status={status}
      heartbeat
      {...props}
    />
  );
});
TimelineHeartbeatNode.displayName = "TimelineHeartbeatNode";

/**
 * 4. TimelinePulseNode
 * Fluid radar beacon node with restrained atmospheric wave dissipation.
 */
export interface TimelinePulseNodeProps extends TimelineIndicatorProps {}

export const TimelinePulseNode = React.forwardRef<
  HTMLSpanElement,
  TimelinePulseNodeProps
>(({ status = "primary", pulse = true, ...props }, ref) => {
  return (
    <TimelineIndicator
      ref={ref}
      status={status}
      pulse={pulse}
      {...props}
    />
  );
});
TimelinePulseNode.displayName = "TimelinePulseNode";

/**
 * 5. TimelineAvatarNode
 * Actor identity node for collaborative streams with optical concentric status badge.
 */
export interface TimelineAvatarNodeProps
  extends Omit<TimelineIndicatorProps, "children"> {
  src?: string;
  fallback: string;
  badgeIcon?: React.ReactNode;
  badgeStatus?: "default" | "primary" | "success" | "warning" | "destructive";
  interactive?: boolean;
}

export const TimelineAvatarNode = React.forwardRef<
  HTMLSpanElement,
  TimelineAvatarNodeProps
>(
  (
    {
      src,
      fallback,
      badgeIcon,
      badgeStatus = "success",
      size: explicitSize,
      interactive = false,
      className,
      ...props
    },
    ref
  ) => {
    const context = useTimeline();
    const resolvedSize = explicitSize ?? context.size ?? "default";

    const avatarSizeClass =
      resolvedSize === "sm"
        ? "size-5 text-[9px]"
        : resolvedSize === "lg"
        ? "size-9 text-xs"
        : "size-7 text-[10px]";

    const badgeSizeClass =
      resolvedSize === "sm"
        ? "size-2.5 -bottom-0.5 -right-0.5 text-[7px]"
        : resolvedSize === "lg"
        ? "size-3.5 -bottom-1 -right-1 text-[9px]"
        : "size-3 -bottom-0.5 -right-0.5 text-[8px]";

    const resolvedAriaLabel =
      (props as any)["aria-label"] ?? (interactive ? `Actor: ${fallback}` : undefined);

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
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative z-10 inline-flex shrink-0 select-none",
          interactive &&
            "cursor-pointer hover:border-foreground/30 active:scale-[0.97] transition-transform duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background after:absolute after:-inset-1.5 after:content-['']",
          className
        )}
        {...props}
      >
        <Avatar className={cn("rounded-full border border-border/80 shadow-xs", avatarSizeClass)}>
          {src && <AvatarImage src={src} alt={fallback} />}
          <AvatarFallback className="font-semibold bg-muted text-foreground">
            {fallback}
          </AvatarFallback>
        </Avatar>

        {badgeIcon && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute flex items-center justify-center rounded-full ring-2 ring-background font-bold shadow-xs",
              badgeSizeClass,
              badgeStatus === "success" && "bg-emerald-500 text-white",
              badgeStatus === "primary" && "bg-primary text-primary-foreground",
              badgeStatus === "warning" && "bg-amber-500 text-white",
              badgeStatus === "destructive" && "bg-destructive text-destructive-foreground",
              badgeStatus === "default" && "bg-muted-foreground text-background"
            )}
          >
            {badgeIcon}
          </span>
        )}
      </span>
    );
  }
);
TimelineAvatarNode.displayName = "TimelineAvatarNode";

/**
 * 6. TimelineCommitNode
 * Git and version control node supporting commit, branch, merge, and pull request variants.
 */
export interface TimelineCommitNodeProps extends TimelineIndicatorProps {
  variant?: "commit" | "branch" | "merge" | "pr";
}

export const TimelineCommitNode = React.forwardRef<
  HTMLSpanElement,
  TimelineCommitNodeProps
>(({ variant = "commit", status = "default", ...props }, ref) => {
  return (
    <TimelineIndicator ref={ref} status={status} {...props}>
      {variant === "branch" ? (
        <GitBranchIcon size={13} className="text-current" />
      ) : variant === "merge" ? (
        <GitMergeIcon size={13} className="text-current" />
      ) : variant === "pr" ? (
        <GitPullRequestIcon size={13} className="text-current" />
      ) : (
        <GitCommitHorizontalIcon size={13} className="text-current" />
      )}
    </TimelineIndicator>
  );
});
TimelineCommitNode.displayName = "TimelineCommitNode";

/**
 * 7. TimelineActionNode
 * Tactile interactive gate button for manual approval checkpoints, reruns, or inspect triggers.
 */
export interface TimelineActionNodeProps
  extends Omit<TimelineIndicatorProps, "children"> {
  icon?: React.ReactNode;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const TimelineActionNode = React.forwardRef<
  HTMLButtonElement,
  TimelineActionNodeProps
>(
  (
    {
      icon,
      label,
      onClick,
      disabled = false,
      status = "primary",
      size: explicitSize,
      className,
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

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center rounded-full border font-medium shadow-xs select-none",
          "bg-background transition-all duration-150 outline-none cursor-pointer",
          "hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          sizeClass,
          status === "primary" &&
            "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
          status === "success" &&
            "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-500",
          status === "warning" &&
            "border-amber-600 bg-amber-600 text-white hover:bg-amber-500",
          status === "destructive" &&
            "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
          status === "default" &&
            "border-border/80 bg-muted hover:bg-muted/80 text-foreground",
          className
        )}
        {...props}
      >
        {icon ?? <PlayIcon size={12} className="ml-0.5" />}
      </button>
    );
  }
);
TimelineActionNode.displayName = "TimelineActionNode";

/**
 * 8. TimelineDotNode
 * Quiet chrome minimal dot for high-density audit streams (solid, ring, or ambient glow).
 */
export interface TimelineDotNodeProps extends TimelineIndicatorProps {
  dotVariant?: "solid" | "ring" | "glow";
}

export const TimelineDotNode = React.forwardRef<
  HTMLSpanElement,
  TimelineDotNodeProps
>(({ dotVariant = "solid", status = "default", className, ...props }, ref) => {
  return (
    <TimelineIndicator
      ref={ref}
      status={status}
      className={cn(
        dotVariant === "ring" && "bg-transparent border-2 border-current",
        dotVariant === "glow" && "shadow-[0_0_8px_currentColor]",
        className
      )}
      {...props}
    >
      {dotVariant === "solid" && <span className="size-2 rounded-full bg-current" />}
    </TimelineIndicator>
  );
});
TimelineDotNode.displayName = "TimelineDotNode";

/**
 * 9. TimelineIconNode
 * High-utility operational glyph node scaled automatically to timeline rhythm.
 */
export interface TimelineIconNodeProps extends TimelineIndicatorProps {
  icon: React.ReactNode;
}

export const TimelineIconNode = React.forwardRef<
  HTMLSpanElement,
  TimelineIconNodeProps
>(({ icon, status = "default", ...props }, ref) => {
  return (
    <TimelineIndicator ref={ref} status={status} {...props}>
      {icon}
    </TimelineIndicator>
  );
});
TimelineIconNode.displayName = "TimelineIconNode";

/* -------------------------------------------------------------------------------------------------
 * Unified TimelineNode Namespace
 * -----------------------------------------------------------------------------------------------*/

export const TimelineNode = {
  Indicator: TimelineIndicator,
  Progress: TimelineProgressNode,
  Heartbeat: TimelineHeartbeatNode,
  Pulse: TimelinePulseNode,
  Step: TimelineStepNode,
  Avatar: TimelineAvatarNode,
  Commit: TimelineCommitNode,
  Action: TimelineActionNode,
  Dot: TimelineDotNode,
  Icon: TimelineIconNode,
};
