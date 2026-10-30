"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.SubmenuRoot;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export interface ContextMenuContentProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Popup> {
  sideOffset?: number;
  alignOffset?: number;
}

export const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuContentProps
>(({ className, sideOffset = 4, alignOffset = 4, children, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50 outline-none"
      >
        <ContextMenuPrimitive.Popup
          ref={ref}
          className={cn(
            "min-w-48 overflow-hidden rounded-xl border border-border/80 bg-popover/95 p-1 text-popover-foreground shadow-2xl backdrop-blur-md select-none",
            "specular-rim outline-none",
            "transition-[opacity,transform] duration-150 ease-out",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = "ContextMenuContent";

export interface ContextMenuItemProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.Item> {
  inset?: boolean;
}

export const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuItemProps
>(({ className, inset, children, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none",
        "text-foreground/90 transition-colors duration-100",
        "hover:bg-accent hover:text-accent-foreground",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        "active:scale-[0.985]", // Directive 1: Tactile yield on pointerdown
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Item>
  );
});
ContextMenuItem.displayName = "ContextMenuItem";

export interface ContextMenuCheckboxItemProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem> {}

export const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none",
        "text-foreground/90 transition-colors duration-100",
        "hover:bg-accent hover:text-accent-foreground",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        "active:scale-[0.985]",
        className
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex size-3.5 items-center justify-center text-primary">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon size={13} />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export interface ContextMenuRadioItemProps
  extends React.ComponentProps<typeof ContextMenuPrimitive.RadioItem> {}

export const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none",
        "text-foreground/90 transition-colors duration-100",
        "hover:bg-accent hover:text-accent-foreground",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        "active:scale-[0.985]",
        className
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex size-3.5 items-center justify-center text-primary">
        <ContextMenuPrimitive.RadioItemIndicator>
          <span className="size-1.5 rounded-full bg-current" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

export const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  );
});
ContextMenuSeparator.displayName = "ContextMenuSeparator";

export const ContextMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ContextMenuPrimitive.SubmenuTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-none",
        "text-foreground/90 transition-colors duration-100",
        "hover:bg-accent hover:text-accent-foreground",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      <span className="flex-1 text-left">{children}</span>
      <ChevronRightIcon size={13} className="ml-auto text-muted-foreground" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
});
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

export function ContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-[10px] font-mono tracking-wider text-muted-foreground/70",
        className
      )}
      {...props}
    />
  );
}
ContextMenuShortcut.displayName = "ContextMenuShortcut";
