"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: "default" | "sm" | "lg";
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className, size = "default", children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "group relative flex w-full items-center justify-between gap-2 rounded-lg border border-border/80 bg-card px-3 text-sm font-medium text-foreground shadow-xs select-none outline-none cursor-pointer",
        "transition-[border-color,box-shadow,background-color,transform] duration-150 ease-out",
        "hover:border-foreground/30 hover:bg-card/90",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.985]", // Directive #1: Physical yield on pointerdown
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[popup-open]:border-ring data-[popup-open]:ring-2 data-[popup-open]:ring-ring/20",
        // 44px hit-slop target expansion:
        "after:absolute after:inset-y-[-4px] after:inset-x-0 after:content-['']",
        size === "sm" && "h-8 px-2.5 text-xs",
        size === "default" && "h-9 px-3 text-sm",
        size === "lg" && "h-10 px-4 text-base",
        className
      )}
      {...props}
    >
      <span className="truncate flex-1 text-left">{children}</span>
      <SelectPrimitive.Icon className="shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-data-[popup-open]:rotate-180 pointer-events-none">
        <ChevronDownIcon size={16} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Popup> & {
    sideOffset?: number;
    portal?: boolean;
  }
>(({ className, sideOffset = 4, children, portal = true, ...props }, ref) => {
  const content = (
    <SelectPrimitive.Positioner sideOffset={sideOffset} className="z-50 outline-none">
      <SelectPrimitive.Popup
        ref={ref}
        className={cn(
          "relative min-w-36 overflow-hidden rounded-2xl glass-regular specular-rim p-1 text-popover-foreground shadow-2xl select-none outline-none",
          "origin-(--transform-origin)",
          "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className
        )}
        {...props}
      >
        <SelectPrimitive.List className="max-h-72 overflow-y-auto p-0.5 outline-none">
          {children}
        </SelectPrimitive.List>
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  );

  if (portal) {
    return <SelectPrimitive.Portal>{content}</SelectPrimitive.Portal>;
  }
  return content;
});
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-xl py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none",
        "transition-colors duration-100 ease-out",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2 flex size-4 items-center justify-center text-primary">
        <CheckIcon size={14} />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "SelectItem";

export const SelectGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.GroupLabel>
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.GroupLabel
      ref={ref}
      className={cn("px-2 py-1.5 text-[11px] font-semibold text-muted-foreground select-none", className)}
      {...props}
    />
  );
});
SelectGroupLabel.displayName = "SelectGroupLabel";

export const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  );
});
SelectSeparator.displayName = "SelectSeparator";
