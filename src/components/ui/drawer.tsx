"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "@/lib/utils";

export const Drawer = DrawerPrimitive.Root;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerPortal = DrawerPrimitive.Portal;
export const DrawerClose = DrawerPrimitive.Close;
export const DrawerViewport = DrawerPrimitive.Viewport;

export const DrawerBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DrawerPrimitive.Backdrop>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitive.Backdrop
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-250 ease-out",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  );
});
DrawerBackdrop.displayName = "DrawerBackdrop";

export interface DrawerHandleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  preventCloseOnClick?: boolean;
}

export const DrawerHandle = React.forwardRef<
  HTMLButtonElement,
  DrawerHandleProps
>(({ className, preventCloseOnClick = false, onClick, ...props }, ref) => {
  return (
    <DrawerClose
      render={
        <button
          ref={ref}
          type="button"
          aria-label="Drag down or click to close drawer"
          className={cn(
            "group mx-auto flex h-8 w-full cursor-grab active:cursor-grabbing items-center justify-center pt-2.5 pb-1 outline-none touch-none select-none",
            className
          )}
          onClick={(e) => {
            if (preventCloseOnClick) {
              e.preventDefault();
              e.stopPropagation();
            }
            onClick?.(e);
          }}
          {...props}
        >
          <span className="h-1.5 w-12 rounded-full bg-muted-foreground/30 transition-all duration-150 group-hover:w-16 group-hover:bg-muted-foreground/50 group-active:scale-95" />
        </button>
      }
    />
  );
});
DrawerHandle.displayName = "DrawerHandle";

export interface DrawerContentProps
  extends React.ComponentProps<typeof DrawerPrimitive.Popup> {
  hideHandle?: boolean;
}

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(({ className, children, hideHandle = false, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerPrimitive.Viewport className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
        <DrawerPrimitive.Popup
          ref={ref}
          className={cn(
            "pointer-events-auto relative w-full max-h-[85vh] flex flex-col rounded-t-[20px] border-t border-border/80 bg-background shadow-2xl outline-none",
            "specular-rim",
            "touch-auto overscroll-contain select-none",
            "[transform:translateY(var(--drawer-swipe-movement-y,0px))]",
            "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "data-swiping:transition-none data-swiping:select-none",
            "data-[starting-style]:translate-y-full",
            "data-[ending-style]:translate-y-full",
            "data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*300ms)]",
            className
          )}
          {...props}
        >
          {!hideHandle && <DrawerHandle />}
          <div className="flex-1 overflow-y-auto px-6 py-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">{children}</div>

          {/* Overdrag Bleed Extension to eliminate void gap during upward rubber-band pull */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-full h-[100vh] bg-background border-x border-border/80"
          />
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

export function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid gap-1.5 text-center sm:text-left pb-4", className)}
      {...props}
    />
  );
}
DrawerHeader.displayName = "DrawerHeader";

export function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 pt-4 border-t border-border/40", className)}
      {...props}
    />
  );
}
DrawerFooter.displayName = "DrawerFooter";

export const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn("text-base font-semibold leading-none tracking-tight text-foreground", className)}
      {...props}
    />
  );
});
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
});
DrawerDescription.displayName = "DrawerDescription";
