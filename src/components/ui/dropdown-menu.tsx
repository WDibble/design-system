"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuPortal = MenuPrimitive.Portal;
export const DropdownMenuGroup = MenuPrimitive.Group;
export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;
export const DropdownMenuSub = MenuPrimitive.SubmenuRoot;

export interface DropdownMenuContentProps
  extends React.ComponentProps<typeof MenuPrimitive.Popup> {
  anchor?: MenuPrimitive.Positioner.Props["anchor"];
  side?: MenuPrimitive.Positioner.Props["side"];
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
  collisionAvoidance?: MenuPrimitive.Positioner.Props["collisionAvoidance"];
  disableAnchorTracking?: MenuPrimitive.Positioner.Props["disableAnchorTracking"];
  portalProps?: MenuPrimitive.Portal.Props;
}

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  (
    {
      className,
      children,
      anchor,
      side = "bottom",
      align = "start",
      sideOffset = 4,
      alignOffset = 0,
      collisionAvoidance,
      disableAnchorTracking,
      portalProps,
      ...props
    },
    ref
  ) => {
    return (
      <DropdownMenuPortal {...portalProps}>
        <MenuPrimitive.Positioner
          anchor={anchor}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionAvoidance={collisionAvoidance}
          disableAnchorTracking={disableAnchorTracking}
          className="z-50 outline-none"
        >
          <MenuPrimitive.Popup
            ref={ref}
            className={cn(
              "relative min-w-48 overflow-hidden rounded-2xl glass-regular specular-rim p-1 text-popover-foreground select-none outline-none",
              // Deterministic anchor origin from Base UI positioner:
              "origin-(--transform-origin)",
              // Apple HIG micro-spring transition (scale, transform, and opacity):
              "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
              className
            )}
            {...props}
          >
            {children}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </DropdownMenuPortal>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps
  extends React.ComponentProps<typeof MenuPrimitive.Item> {
  inset?: boolean;
  variant?: "default" | "destructive";
}

export const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ className, inset, variant = "default", ...props }, ref) => {
  return (
    <MenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground outline-none",
        "transition-all duration-100 ease-out active:scale-[0.98]",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        variant === "destructive" && [
          "text-destructive dark:text-rose-400",
          "data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground",
        ],
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-lg py-1.5 pl-8 pr-2.5 text-xs font-medium text-foreground outline-none",
        "transition-all duration-100 ease-out active:scale-[0.98]",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex size-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon size={13} />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-lg py-1.5 pl-8 pr-2.5 text-xs font-medium text-foreground outline-none",
        "transition-all duration-100 ease-out active:scale-[0.98]",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2.5 flex size-3.5 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <span className="size-1.5 rounded-full bg-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MenuPrimitive.SubmenuTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  return (
    <MenuPrimitive.SubmenuTrigger
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground outline-none",
        "transition-all duration-100 ease-out active:scale-[0.98]",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon size={14} className="ml-auto opacity-70" />
    </MenuPrimitive.SubmenuTrigger>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, children, sideOffset = 4, alignOffset = -4, ...props }, ref) => {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side="right"
        align="start"
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50 outline-none"
      >
        <MenuPrimitive.Popup
          ref={ref}
          className={cn(
            "relative min-w-40 overflow-hidden rounded-2xl glass-regular specular-rim p-1 text-popover-foreground select-none outline-none",
            // Deterministic anchor origin from Base UI positioner:
            "origin-(--transform-origin)",
            // Apple HIG micro-spring transition (scale, transform, and opacity):
            "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground select-none",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-[10px] font-mono tracking-widest text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
