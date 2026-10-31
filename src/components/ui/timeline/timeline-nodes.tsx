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
import { useTimeline } from "./timeline-context";
import { TimelineIndicator, type TimelineIndicatorProps } from "./timeline-indicator";

/**
 * 1. TimelineStepNode
 * Sequenced workflow stage node that smoothly morphs from a tabular step number into a checkmark.
 */
export interface TimelineStepNodeProps extends Omit<TimelineIndicatorProps, "step"> {
  step: number;
  state?: "pending" | "current" | "completed";
}

export const TimelineStepNode = React.forwardRef<HTMLSpanElement, TimelineStepNodeProps>(
  ({ step, state = "pending", status, pulse, ...props }, ref) => {
    const isCompleted = state === "completed";
    const isCurrent = state === "current";

    const resolvedStatus = status ?? (isCompleted ? "success" : isCurrent ? "primary" : "default");

    return (
      <TimelineIndicator ref={ref} status={resolvedStatus} pulse={pulse ?? isCurrent} {...props}>
        {isCompleted ? (
          <CheckIcon size={14} className="stroke-[2.5] text-current" />
        ) : (
          <span className="font-mono leading-none font-semibold tabular-nums">{step}</span>
        )}
      </TimelineIndicator>
    );
  }
);
TimelineStepNode.displayName = "TimelineStepNode";

/**
 * 2. TimelineProgressNode
 * Conic circular progress stroke tracking determinate percentage or indeterminate sweep.
 */
export interface TimelineProgressNodeProps extends TimelineIndicatorProps {
  progress?: number | "indeterminate";
}

export const TimelineProgressNode = React.forwardRef<HTMLSpanElement, TimelineProgressNodeProps>(
  ({ progress = "indeterminate", status = "primary", ...props }, ref) => {
    return <TimelineIndicator ref={ref} status={status} progress={progress} {...props} />;
  }
);
TimelineProgressNode.displayName = "TimelineProgressNode";

/**
 * 3. TimelineHeartbeatNode
 * Telemetry LED with hardware-synchronised dual-beat cardiac rhythm for live WebSocket channels.
 */
export interface TimelineHeartbeatNodeProps extends TimelineIndicatorProps {}

export const TimelineHeartbeatNode = React.forwardRef<HTMLSpanElement, TimelineHeartbeatNodeProps>(
  ({ status = "success", ...props }, ref) => {
    return <TimelineIndicator ref={ref} status={status} heartbeat {...props} />;
  }
);
TimelineHeartbeatNode.displayName = "TimelineHeartbeatNode";

/**
 * 4. TimelinePulseNode
 * Fluid radar beacon node with restrained atmospheric wave dissipation.
 */
export interface TimelinePulseNodeProps extends TimelineIndicatorProps {}

export const TimelinePulseNode = React.forwardRef<HTMLSpanElement, TimelinePulseNodeProps>(
  ({ status = "primary", pulse = true, ...props }, ref) => {
    return <TimelineIndicator ref={ref} status={status} pulse={pulse} {...props} />;
  }
);
TimelinePulseNode.displayName = "TimelinePulseNode";

/**
 * 5. TimelineAvatarNode
 * Actor identity node for collaborative streams with optical concentric status badge.
 */
export interface TimelineAvatarNodeProps extends Omit<TimelineIndicatorProps, "children"> {
  src?: string;
  fallback: string;
  badgeIcon?: React.ReactNode;
  badgeStatus?: "default" | "primary" | "success" | "warning" | "destructive";
  interactive?: boolean;
}

export const TimelineAvatarNode = React.forwardRef<HTMLSpanElement, TimelineAvatarNodeProps>(
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
            "cursor-pointer transition-transform duration-100 after:absolute after:-inset-1.5 after:content-[''] hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-[0.97]",
          className
        )}
        {...props}
      >
        <Avatar className={cn("rounded-full border border-border/80 shadow-xs", avatarSizeClass)}>
          {src && <AvatarImage src={src} alt={fallback} />}
          <AvatarFallback className="bg-muted font-semibold text-foreground">
            {fallback}
          </AvatarFallback>
        </Avatar>

        {badgeIcon && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute flex items-center justify-center rounded-full font-bold shadow-xs ring-2 ring-background",
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

export const TimelineCommitNode = React.forwardRef<HTMLSpanElement, TimelineCommitNodeProps>(
  ({ variant = "commit", status = "default", ...props }, ref) => {
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
  }
);
TimelineCommitNode.displayName = "TimelineCommitNode";

/**
 * 7. TimelineActionNode
 * Tactile interactive gate button for manual approval checkpoints, reruns, or inspect triggers.
 */
export interface TimelineActionNodeProps extends Omit<TimelineIndicatorProps, "children"> {
  icon?: React.ReactNode;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const TimelineActionNode = React.forwardRef<HTMLButtonElement, TimelineActionNodeProps>(
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
          "cursor-pointer bg-background transition-all duration-150 outline-none",
          "hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
          sizeClass,
          status === "primary" &&
            "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
          status === "success" &&
            "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-500",
          status === "warning" && "border-amber-600 bg-amber-600 text-white hover:bg-amber-500",
          status === "destructive" &&
            "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
          status === "default" && "border-border/80 bg-muted text-foreground hover:bg-muted/80",
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

export const TimelineDotNode = React.forwardRef<HTMLSpanElement, TimelineDotNodeProps>(
  ({ dotVariant = "solid", status = "default", className, ...props }, ref) => {
    return (
      <TimelineIndicator
        ref={ref}
        status={status}
        className={cn(
          dotVariant === "ring" && "border-2 border-current bg-transparent",
          dotVariant === "glow" && "shadow-[0_0_8px_currentColor]",
          className
        )}
        {...props}
      >
        {dotVariant === "solid" && <span className="size-2 rounded-full bg-current" />}
      </TimelineIndicator>
    );
  }
);
TimelineDotNode.displayName = "TimelineDotNode";

/**
 * 9. TimelineIconNode
 * High-utility operational glyph node scaled automatically to timeline rhythm.
 */
export interface TimelineIconNodeProps extends TimelineIndicatorProps {
  icon: React.ReactNode;
}

export const TimelineIconNode = React.forwardRef<HTMLSpanElement, TimelineIconNodeProps>(
  ({ icon, status = "default", ...props }, ref) => {
    return (
      <TimelineIndicator ref={ref} status={status} {...props}>
        {icon}
      </TimelineIndicator>
    );
  }
);
TimelineIconNode.displayName = "TimelineIconNode";

/**
 * Unified TimelineNode Namespace
 */
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
