"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "@/lib/utils";

export const Drawer = DrawerPrimitive.Root;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerPortal = DrawerPrimitive.Portal;
export const DrawerClose = DrawerPrimitive.Close;

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

export interface DrawerContentProps
  extends React.ComponentProps<typeof DrawerPrimitive.Popup> {}

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerPrimitive.Popup
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-[20px] border-t border-border/80 bg-background shadow-2xl outline-none",
          "specular-rim",
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[starting-style]:translate-y-full",
          "data-[ending-style]:translate-y-full",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/25 hover:bg-muted-foreground/40 transition-colors" />
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </DrawerPrimitive.Popup>
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
