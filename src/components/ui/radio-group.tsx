"use client";

import * as React from "react";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { cn } from "@/lib/utils";

export interface RadioGroupProps
  extends React.ComponentProps<typeof BaseRadioGroup> {}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseRadioGroup
        ref={ref}
        className={cn("grid gap-2.5", className)}
        {...props}
      />
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends React.ComponentProps<typeof BaseRadio.Root> {
  size?: "sm" | "default";
}

export const RadioGroupItem = React.forwardRef<
  HTMLSpanElement,
  RadioGroupItemProps
>(({ className, size = "default", disabled, children, ...props }, ref) => {
  return (
    <BaseRadio.Root
      ref={ref}
      disabled={disabled}
      className={cn(
        "group relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border select-none",
        "border-border/80 hover:border-foreground/50 bg-card text-primary shadow-xs",
        "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08)]",
        "transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out",
        // Checked state:
        "data-[checked]:border-primary",
        // Focus ring:
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Directive 1: Tactile yield on pointerdown:
        "active:scale-90",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
        // 44px touch target expansion:
        "after:absolute after:-inset-2 after:content-['']",
        size === "sm" ? "size-4" : "size-[18px]",
        className
      )}
      {...props}
    >
      <BaseRadio.Indicator
        className={cn(
          "flex items-center justify-center text-primary pointer-events-none",
          "transition-transform duration-150 ease-out",
          "data-[starting-style]:scale-0",
          size === "sm" ? "size-2" : "size-2.5",
          "rounded-full bg-current"
        )}
      />
      {children}
    </BaseRadio.Root>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";
