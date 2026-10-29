"use client";

import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.ComponentProps<typeof BaseCheckbox.Root> {
  size?: "sm" | "default";
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, size = "default", disabled, ...props }, ref) => {
    return (
      <BaseCheckbox.Root
        ref={ref}
        disabled={disabled}
        className={cn(
          "group relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[5px] border select-none",
          "border-border/80 hover:border-foreground/50 bg-card text-primary-foreground shadow-xs",
          "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08)]",
          "transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out",
          // Checked & Indeterminate states:
          "data-[checked]:bg-primary data-[checked]:border-primary",
          "data-[indeterminate]:bg-primary data-[indeterminate]:border-primary",
          // Focus ring:
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // Directive #1: Instant physical yield on pointerdown/active:
          "active:scale-90",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
          // 44px touch target expansion:
          "after:absolute after:-inset-2 after:content-['']",
          size === "sm" ? "size-4" : "size-[18px]",
          className
        )}
        {...props}
      >
        <BaseCheckbox.Indicator
          className={cn(
            "flex items-center justify-center text-current pointer-events-none",
            "transition-transform duration-150 ease-out",
            "data-[starting-style]:scale-50 data-[starting-style]:opacity-0"
          )}
          render={(indicatorProps, state) => (
            <span {...indicatorProps}>
              {state.indeterminate ? (
                <MinusIcon size={size === "sm" ? 11 : 13} />
              ) : (
                <CheckIcon size={size === "sm" ? 12 : 14} />
              )}
            </span>
          )}
        />
      </BaseCheckbox.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";
