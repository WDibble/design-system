"use client";

import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const inputVariants = cva(
  [
    "flex w-full rounded-lg border bg-card text-foreground shadow-xs select-auto",
    "border-border/80 transition-[border-color,box-shadow,background-color] duration-150 ease-out",
    "hover:border-foreground/30",
    "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08)]",
    "placeholder:text-muted-foreground",
    // Refined Quiet Chrome focus: seamless 1px accent hugging the border, zero loud offset gap:
    "focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/40 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/40 disabled:opacity-50",
    // Data attributes driven by Base UI Field context:
    "data-[invalid]:border-destructive data-[invalid]:focus-visible:border-destructive data-[invalid]:focus-visible:ring-destructive/30",
    "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30",
    // iOS font-zoom prevention invariant: minimum 16px on mobile viewports (<640px), 14px on desktop:
    "text-base sm:text-sm",
    "[-webkit-tap-highlight-color:transparent]",
  ].join(" "),
  {
    variants: {
      inputSize: {
        sm: "h-8 rounded-md px-2.5 py-1 text-xs sm:text-xs",
        default: "h-9 px-3 py-1.5",
        lg: "h-10 rounded-xl px-3.5 py-2 text-base sm:text-base",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<typeof BaseInput>, "size">, VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefixText?: string;
  suffixText?: string;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize = "default",
      leftIcon,
      rightIcon,
      prefixText,
      suffixText,
      error,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasAddons = Boolean(leftIcon || rightIcon || prefixText || suffixText);

    if (!hasAddons) {
      return (
        <BaseInput
          ref={ref as any}
          disabled={disabled}
          data-invalid={error || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(inputVariants({ inputSize, className }))}
          {...props}
        />
      );
    }

    return (
      <div
        className={cn(
          "relative flex w-full items-center rounded-lg border border-border/80 bg-card text-foreground shadow-xs",
          "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08)]",
          "transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          // Refined focus ring without offset:
          "focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/40",
          error &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/30",
          disabled && "pointer-events-none bg-muted/40 opacity-50",
          inputSize === "sm" && "h-8 rounded-md",
          inputSize === "default" && "h-9",
          inputSize === "lg" && "h-10 rounded-xl",
          className
        )}
      >
        {prefixText && (
          <span className="mr-1 flex shrink-0 items-center border-r border-border/60 pr-2 pl-3 text-xs text-muted-foreground select-none sm:text-sm">
            {prefixText}
          </span>
        )}
        {leftIcon && (
          <span className="pointer-events-none flex shrink-0 items-center pl-3 text-muted-foreground select-none">
            {leftIcon}
          </span>
        )}
        <BaseInput
          ref={ref as any}
          disabled={disabled}
          data-invalid={error || undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            "w-full bg-transparent px-3 py-1.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:cursor-not-allowed sm:text-sm",
            (leftIcon || prefixText) && "pl-2",
            (rightIcon || suffixText) && "pr-2",
            inputSize === "sm" && "text-xs sm:text-xs",
            inputSize === "lg" && "text-base sm:text-base"
          )}
          {...props}
        />
        {rightIcon && (
          <span className="pointer-events-none flex shrink-0 items-center pr-3 text-muted-foreground select-none">
            {rightIcon}
          </span>
        )}
        {suffixText && (
          <span className="ml-1 flex shrink-0 items-center border-l border-border/60 pr-3 pl-2 text-xs text-muted-foreground select-none sm:text-sm">
            {suffixText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
