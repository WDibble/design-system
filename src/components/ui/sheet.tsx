"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

export const SheetBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SheetPrimitive.Backdrop>
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Backdrop
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-xs",
        "transition-opacity duration-200 ease-out",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  );
});
SheetBackdrop.displayName = "SheetBackdrop";

export interface SheetContentProps
  extends React.ComponentProps<typeof SheetPrimitive.Popup> {
  side?: "top" | "bottom" | "left" | "right";
  showCloseButton?: boolean;
}

export const SheetContent = React.forwardRef<
  HTMLDivElement,
  SheetContentProps
>(({ side = "right", showCloseButton = true, className, children, ...props }, ref) => {
  return (
    <SheetPortal>
      <SheetBackdrop />
      <SheetPrimitive.Viewport
        className={cn(
          "fixed inset-0 z-50 flex overflow-hidden",
          side === "right" && "justify-end",
          side === "left" && "justify-start",
          side === "bottom" && "items-end",
          side === "top" && "items-start"
        )}
      >
        <SheetPrimitive.Popup
          ref={ref}
          className={cn(
            "relative flex flex-col bg-card text-card-foreground shadow-2xl z-50 outline-none",
            "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08),0_25px_50px_-12px_rgba(0,0,0,0.25)]",
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            // Directional slide variants:
            side === "right" && [
              "h-full w-full max-w-md border-l border-border/80",
              "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
            ],
            side === "left" && [
              "h-full w-full max-w-md border-r border-border/80",
              "data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
            ],
            side === "bottom" && [
              "w-full max-h-[85vh] rounded-t-2xl border-t border-border/80",
              "data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
            ],
            side === "top" && [
              "w-full max-h-[85vh] rounded-b-2xl border-b border-border/80",
              "data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full",
            ],
            className
          )}
          {...props}
        >
          {children}

          {showCloseButton && (
            <SheetPrimitive.Close
              aria-label="Close sheet"
              className={cn(
                "absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground transition-colors select-none",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring",
                "active:scale-95"
              )}
            >
              <XIcon size={16} />
            </SheetPrimitive.Close>
          )}
        </SheetPrimitive.Popup>
      </SheetPrimitive.Viewport>
    </SheetPortal>
  );
});
SheetContent.displayName = "SheetContent";

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-6 pb-2 text-left", className)}
      {...props}
    />
  );
}
SheetHeader.displayName = "SheetHeader";

export function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-6 pt-4 border-t border-border/40 mt-auto",
        className
      )}
      {...props}
    />
  );
}
SheetFooter.displayName = "SheetFooter";

export const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
});
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
});
SheetDescription.displayName = "SheetDescription";
