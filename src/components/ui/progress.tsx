"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  size?: "sm" | "default" | "lg";
  showValue?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, size = "default", showValue = false, ...props }, ref) => {
    const isIndeterminate = value === null || value === undefined;
    const clampedValue = isIndeterminate ? 0 : Math.min(100, Math.max(0, value));

    const sizeClasses = {
      sm: "h-1.5",
      default: "h-2.5",
      lg: "h-3.5",
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        <ProgressPrimitive.Root
          ref={ref}
          value={value}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-muted/80 shadow-inner",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {isIndeterminate ? (
            <div className="absolute inset-0 h-full w-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="h-full w-1/2 rounded-full bg-primary"
              />
            </div>
          ) : (
            <ProgressPrimitive.Track className="size-full">
              <ProgressPrimitive.Indicator
                className="h-full rounded-full bg-primary transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.2)]"
                style={{ width: `${clampedValue}%` }}
              />
            </ProgressPrimitive.Track>
          )}
        </ProgressPrimitive.Root>

        {showValue && !isIndeterminate && (
          <div className="flex justify-between items-center text-xs text-muted-foreground font-mono tabular-nums">
            <span>Progress</span>
            <span className="font-semibold text-foreground">{Math.round(clampedValue)}%</span>
          </div>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | null; // 0-100 or null for indeterminate
  size?: number; // diameter in px (default: 48)
  strokeWidth?: number; // stroke width in px (default: 4)
  showValue?: boolean;
}

export const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      className,
      value,
      size = 48,
      strokeWidth = 4,
      showValue = false,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = value === null || value === undefined;
    const clampedValue = isIndeterminate ? 0 : Math.min(100, Math.max(0, value));

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("relative inline-flex items-center justify-center select-none", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={cn(
            "-rotate-90 transform",
            isIndeterminate && "animate-spin [animation-duration:1.4s]"
          )}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted/60"
          />

          {/* Foreground Progress Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isIndeterminate ? circumference * 0.75 : strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="text-primary transition-[stroke-dashoffset] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </svg>

        {showValue && !isIndeterminate && (
          <span className="absolute font-mono text-xs font-semibold tabular-nums text-foreground tracking-tight">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";
