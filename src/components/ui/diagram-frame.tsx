"use client";

import * as React from "react";
import { Maximize2Icon } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface DiagramFrameProps extends React.HTMLAttributes<HTMLElement> {
  /** Diagram heading displayed in the chrome bar and modal inspector */
  title: string;
  /** Accessible description explaining architecture relationships and data flow */
  description: string;
  /** Optional visible figure caption below the SVG canvas (defaults to description) */
  caption?: string;
  /** Enable full-width modal zoom dialog for inspecting dense diagrams */
  allowZoom?: boolean;
  /** Accessible SVG schematic content */
  children: React.ReactNode;
}

export const DiagramFrame = React.forwardRef<HTMLElement, DiagramFrameProps>(
  ({ title, description, caption, allowZoom = true, children, className, ...props }, ref) => {
    const descId = React.useId();

    const triggerButton = (
      <DialogTrigger
        aria-label={`Inspect ${title} in expanded view`}
        className={cn(
          "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-border/70 bg-card px-2.5 text-xs font-medium text-foreground shadow-xs transition-[background-color,color,transform] duration-150 select-none",
          "hover:bg-muted active:scale-[0.98]",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        )}
      >
        <Maximize2Icon size={14} aria-hidden="true" />
        <span>Expand</span>
      </DialogTrigger>
    );

    return (
      <figure
        ref={ref}
        aria-label={title}
        aria-describedby={descId}
        className={cn(
          "flex w-full min-w-0 flex-col gap-2 rounded-2xl border border-border/70 bg-card/55 p-1.5 text-card-foreground shadow-xs",
          className
        )}
        {...props}
      >
        <div className="flex min-w-0 items-center justify-between gap-3 px-2 py-1">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold tracking-tight text-foreground">{title}</div>
          </div>

          {allowZoom && (
            <Dialog>
              {triggerButton}
              <DialogContent className="max-w-5xl p-0">
                <DialogHeader className="border-b border-border/50 pb-4">
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="overflow-x-auto p-6">{children}</div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Concentric Inner SVG Viewport (R_inner = 16px - 6px = 10px) */}
        <div className="w-full overflow-x-auto rounded-[10px] border border-border/50 bg-background/85 p-4 sm:p-6">
          {children}
        </div>

        <p id={descId} className="sr-only">
          {description}
        </p>

        <figcaption className="px-2 pb-1 text-xs leading-relaxed [text-wrap:pretty] text-muted-foreground">
          {caption ?? description}
        </figcaption>
      </figure>
    );
  }
);
DiagramFrame.displayName = "DiagramFrame";
