"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cn } from "@/lib/utils";

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 rounded-md text-xs font-medium select-none",
    "border border-transparent text-muted-foreground",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out",
    "hover:bg-muted/70 hover:text-foreground",
    // Pressed state:
    "data-[pressed]:bg-muted data-[pressed]:text-foreground",
    // Focus ring:
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
    // Directive 1: Tactile yield on pointerdown:
    "active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border-border/80 bg-transparent hover:bg-muted/50 data-[pressed]:border-border data-[pressed]:bg-muted/90",
        surface:
          "bg-muted/40 hover:bg-muted/70 data-[pressed]:border-border/60 data-[pressed]:bg-background data-[pressed]:shadow-xs",
      },
      size: {
        sm: "h-8 min-w-8 px-2 text-xs [&_svg]:size-3.5 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-3.5 [&>div]:items-center [&>div]:justify-center",
        default:
          "h-9 min-w-9 px-3 text-xs [&_svg]:size-4 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-4 [&>div]:items-center [&>div]:justify-center",
        lg: "h-10 min-w-10 px-4 text-sm [&_svg]:size-4.5 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-4.5 [&>div]:items-center [&>div]:justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ToggleProps
  extends React.ComponentProps<typeof BaseToggle>, VariantProps<typeof toggleVariants> {}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <BaseToggle
        ref={ref}
        className={cn(toggleVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Toggle.displayName = "Toggle";
