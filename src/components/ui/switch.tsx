"use client";

import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.ComponentProps<typeof BaseSwitch.Root> {
  size?: "sm" | "default";
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size = "default", disabled, ...props }, ref) => {
    return (
      <BaseSwitch.Root
        ref={ref}
        disabled={disabled}
        className={cn(
          "group relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent select-none",
          "transition-colors duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // 44px accessible touch target expansion:
          "after:absolute after:-inset-2 after:content-['']",
          // Track colors with hover affordance:
          "bg-input hover:bg-input/80 data-[checked]:bg-primary",
          size === "sm" ? "h-5 w-9" : "h-6 w-11",
          className
        )}
        {...props}
      >
        <BaseSwitch.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-card shadow-sm border border-border/40 dark:bg-foreground data-[checked]:bg-primary-foreground data-[checked]:dark:bg-primary-foreground ring-0",
            // Apple fluid interface spring easing:
            "transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            size === "sm"
              ? "size-4 translate-x-0 data-[checked]:translate-x-4"
              : "size-5 translate-x-0 data-[checked]:translate-x-5",
            // Physical yield on active touch/press:
            "group-active:scale-95"
          )}
        />
      </BaseSwitch.Root>
    );
  }
);

Switch.displayName = "Switch";
