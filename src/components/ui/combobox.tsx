"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CheckIcon, ChevronDownIcon, XIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const Combobox = ComboboxPrimitive.Root;
export const ComboboxGroup = ComboboxPrimitive.Group;
export const ComboboxGroupLabel = ComboboxPrimitive.GroupLabel;
export const ComboboxSeparator = ComboboxPrimitive.Separator;
export const ComboboxPortal = ComboboxPrimitive.Portal;
export const ComboboxList = ComboboxPrimitive.List;

export interface ComboboxInputProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Input>, "size"> {
  size?: "sm" | "default" | "lg";
  icon?: React.ReactNode;
  clearable?: boolean;
}

export const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  ComboboxInputProps
>(({ className, size = "default", icon, clearable = true, ...props }, ref) => {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <span className="absolute left-3 text-muted-foreground pointer-events-none flex items-center justify-center">
          {icon}
        </span>
      )}
      <ComboboxPrimitive.Input
        ref={ref}
        className={cn(
          "flex w-full rounded-lg border border-border/80 bg-card text-foreground shadow-xs",
          "placeholder:text-muted-foreground/70",
          "transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          "hover:border-foreground/30 hover:bg-card/90",
          "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // 16px iOS font-zoom prevention:
          size === "sm" && "h-8 text-base sm:text-xs px-2.5",
          size === "default" && "h-9 text-base sm:text-sm px-3",
          size === "lg" && "h-10 text-base px-3.5",
          icon ? "pl-9" : "",
          clearable ? "pr-16" : "pr-8",
          className
        )}
        {...props}
      />
      <div className="absolute right-2.5 flex items-center gap-1 text-muted-foreground">
        {clearable && (
          <ComboboxPrimitive.Clear
            aria-label="Clear selection"
            className="rounded p-0.5 hover:bg-muted hover:text-foreground text-muted-foreground/60 transition-colors"
          >
            <XIcon size={13} />
          </ComboboxPrimitive.Clear>
        )}
        <ComboboxPrimitive.Trigger
          aria-label="Toggle dropdown list"
          className="rounded p-0.5 hover:bg-muted hover:text-foreground transition-transform duration-200 ease-out data-[popup-open]:rotate-180"
        >
          <ChevronDownIcon size={14} />
        </ComboboxPrimitive.Trigger>
      </div>
    </div>
  );
});
ComboboxInput.displayName = "ComboboxInput";

export interface ComboboxContentProps
  extends React.ComponentProps<typeof ComboboxPrimitive.Popup> {
  sideOffset?: number;
  portal?: boolean;
}

export const ComboboxContent = React.forwardRef<
  HTMLDivElement,
  ComboboxContentProps
>(({ className, sideOffset = 4, children, portal = true, ...props }, ref) => {
  const content = (
    <ComboboxPrimitive.Positioner
      sideOffset={sideOffset}
      className="z-50 outline-none w-[var(--anchor-width)] min-w-[200px] max-w-[calc(100vw-2.5rem)]"
    >
      <ComboboxPrimitive.Popup
        ref={ref}
        className={cn(
          "max-h-72 overflow-y-auto rounded-xl border border-border/80 bg-popover/95 p-1 text-popover-foreground shadow-xl backdrop-blur-md",
          "specular-rim outline-none",
          "transition-[opacity,transform] duration-150 ease-out",
          "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className
        )}
        {...props}
      >
        {children}
      </ComboboxPrimitive.Popup>
    </ComboboxPrimitive.Positioner>
  );

  if (!portal) return content;
  return <ComboboxPrimitive.Portal>{content}</ComboboxPrimitive.Portal>;
});
ComboboxContent.displayName = "ComboboxContent";

export interface ComboboxItemProps
  extends React.ComponentProps<typeof ComboboxPrimitive.Item> {}

export const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ComboboxPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none",
          "text-foreground/90 transition-colors duration-100",
          "hover:bg-accent hover:text-accent-foreground",
          "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
          "data-[selected]:bg-primary/10 data-[selected]:text-primary",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
          "active:scale-[0.985]", // Directive 1: Tactile yield
          className
        )}
        {...props}
      >
        <span className="truncate flex-1">{children}</span>
        <ComboboxPrimitive.ItemIndicator className="ml-2 flex items-center justify-center text-primary">
          <CheckIcon size={13} />
        </ComboboxPrimitive.ItemIndicator>
      </ComboboxPrimitive.Item>
    );
  }
);
ComboboxItem.displayName = "ComboboxItem";

export const ComboboxEmpty = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Empty>
>(({ className, children = "No results found.", ...props }, ref) => {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      className={cn(
        "py-6 text-center text-xs text-muted-foreground select-none",
        className
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Empty>
  );
});
ComboboxEmpty.displayName = "ComboboxEmpty";
