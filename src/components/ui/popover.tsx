"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";

export interface PopoverContextValue {
  triggerElement: HTMLElement | null;
  setTriggerElement: (el: HTMLElement | null) => void;
}

export const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function Popover({
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);

  return (
    <PopoverContext.Provider value={{ triggerElement, setTriggerElement }}>
      <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
    </PopoverContext.Provider>
  );
}

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.ComponentProps<typeof PopoverPrimitive.Trigger>
>((props, forwardedRef) => {
  const context = React.useContext(PopoverContext);

  const handleRef = React.useCallback(
    (node: HTMLElement | null) => {
      context?.setTriggerElement(node);
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef && typeof forwardedRef === "object") {
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [context, forwardedRef]
  );

  return <PopoverPrimitive.Trigger ref={handleRef} {...props} />;
});
PopoverTrigger.displayName = "PopoverTrigger";

export const PopoverPortal = PopoverPrimitive.Portal;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps
  extends React.ComponentProps<typeof PopoverPrimitive.Popup> {
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
  collisionAvoidance?: PopoverPrimitive.Positioner.Props["collisionAvoidance"];
  disableAnchorTracking?: PopoverPrimitive.Positioner.Props["disableAnchorTracking"];
  portalProps?: PopoverPrimitive.Portal.Props;
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(
  (
    {
      className,
      children,
      anchor,
      side = "bottom",
      align = "center",
      sideOffset = 6,
      alignOffset = 0,
      collisionAvoidance,
      disableAnchorTracking,
      portalProps,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(PopoverContext);
    const triggerElement = context?.triggerElement;

    // Virtual Invariant Anchor:
    // Floating-UI tracks getBoundingClientRect() during animations. When a trigger button
    // physically yields on pointerdown via scale(0.975) and rebounds, its bounding box expands,
    // which normally causes attached floating surfaces to wiggle. This invariant virtual anchor
    // computes the untransformed layout rectangle from offset dimensions, delivering a rock-solid
    // positioning reference with zero wiggle while preserving 100% of the button's tactile spring feel.
    const invariantAnchor = React.useMemo(() => {
      if (!triggerElement) return undefined;
      return {
        contextElement: triggerElement,
        getBoundingClientRect() {
          const r = triggerElement.getBoundingClientRect();
          const W = triggerElement.offsetWidth;
          const H = triggerElement.offsetHeight;
          if (!W || !H) return r;

          const unscaledTop = r.top - (H - r.height) / 2;
          const unscaledLeft = r.left - (W - r.width) / 2;

          return new DOMRect(unscaledLeft, unscaledTop, W, H);
        },
      };
    }, [triggerElement]);

    return (
      <PopoverPortal {...portalProps}>
        <PopoverPrimitive.Positioner
          anchor={anchor ?? invariantAnchor}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionAvoidance={collisionAvoidance}
          disableAnchorTracking={disableAnchorTracking}
          className="z-50 outline-none"
        >
          <PopoverPrimitive.Popup
            ref={ref}
            className={cn(
              "relative w-72 rounded-xl border border-border/80 bg-card p-4 text-card-foreground shadow-xl select-auto outline-none",
              "[box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08),0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]",
              // Deterministic anchor origin locked to trigger edge (eliminates dynamic origin drift):
              "data-[side=bottom]:origin-top data-[side=top]:origin-bottom data-[side=left]:origin-right data-[side=right]:origin-left",
              "data-[side=bottom]:data-[align=start]:origin-top-left data-[side=bottom]:data-[align=end]:origin-top-right",
              "data-[side=top]:data-[align=start]:origin-bottom-left data-[side=top]:data-[align=end]:origin-bottom-right",
              // Apple HIG micro-spring transition (exclusively scale and opacity):
              "transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "data-[starting-style]:scale-98 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-98 data-[ending-style]:opacity-0",
              className
            )}
            {...props}
          >
            {children}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPortal>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export function PopoverHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1 pb-3 text-left border-b border-border/40 mb-3", className)}
      {...props}
    />
  );
}
PopoverHeader.displayName = "PopoverHeader";

export const PopoverTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof PopoverPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <PopoverPrimitive.Title
      ref={ref}
      className={cn("text-sm font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
});
PopoverTitle.displayName = "PopoverTitle";

export const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof PopoverPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <PopoverPrimitive.Description
      ref={ref}
      className={cn("text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
});
PopoverDescription.displayName = "PopoverDescription";
