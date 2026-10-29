"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        data-invalid={error || undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          "flex min-h-20 w-full rounded-lg border border-border/80 bg-card px-3 py-2 text-foreground shadow-xs select-auto",
          "hover:border-foreground/30",
          "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08)]",
          "placeholder:text-muted-foreground resize-y",
          "transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          // Refined focus ring without offset:
          "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/40",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/40",
          "data-[invalid]:border-destructive data-[invalid]:focus-visible:border-destructive data-[invalid]:focus-visible:ring-destructive/30",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30",
          // iOS font-zoom prevention invariant:
          "text-base sm:text-sm",
          "[-webkit-tap-highlight-color:transparent]",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
