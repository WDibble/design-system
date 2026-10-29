"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/40 select-none bg-muted font-medium",
  {
    variants: {
      size: {
        xs: "size-6 text-[10px]",
        sm: "size-8 text-xs",
        default: "size-9 text-sm",
        lg: "size-11 text-base",
        xl: "size-14 text-lg font-semibold",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      />
    );
  }
);
Avatar.displayName = "Avatar";

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentProps<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn(
        "aspect-square size-full object-cover transition-opacity duration-200",
        className
      )}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

// Deterministic pastel OKLCH hue hash based on user initials or name
function getDeterministicHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export interface AvatarFallbackProps
  extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {
  autoColor?: boolean;
}

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, autoColor = false, style, ...props }, ref) => {
    const textContent = typeof children === "string" ? children : "";
    const colorStyle =
      autoColor && textContent
        ? {
            backgroundColor: `oklch(0.55 0.12 ${getDeterministicHue(textContent)} / 0.15)`,
            color: `oklch(0.65 0.15 ${getDeterministicHue(textContent)})`,
            ...style,
          }
        : style;

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        style={colorStyle}
        className={cn(
          "flex size-full items-center justify-center bg-muted text-muted-foreground uppercase font-medium",
          className
        )}
        {...props}
      >
        {children}
      </AvatarPrimitive.Fallback>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

export type PresenceStatus = "online" | "busy" | "away" | "offline";

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: PresenceStatus;
  size?: "sm" | "default" | "lg";
}

export const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ className, status = "online", size = "default", ...props }, ref) => {
    const statusColors: Record<PresenceStatus, string> = {
      online: "bg-emerald-500",
      busy: "bg-rose-500",
      away: "bg-amber-500",
      offline: "bg-muted-foreground/60",
    };

    const sizeClasses = {
      sm: "size-2 -bottom-0.5 -right-0.5 ring-[1.5px]",
      default: "size-2.5 bottom-0 right-0 ring-2",
      lg: "size-3.5 bottom-0.5 right-0.5 ring-2",
    };

    return (
      <span
        ref={ref}
        aria-label={`Status: ${status}`}
        className={cn(
          "absolute rounded-full ring-background",
          statusColors[status],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
AvatarBadge.displayName = "AvatarBadge";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  spacing?: "sm" | "default" | "lg";
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, spacing = "default", children, ...props }, ref) => {
    const items = React.Children.toArray(children);
    const visibleItems = max ? items.slice(0, max) : items;
    const excess = max ? items.length - max : 0;

    const spacingClasses = {
      sm: "-space-x-1.5",
      default: "-space-x-2.5",
      lg: "-space-x-3.5",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center isolate [&>span]:ring-2 [&>span]:ring-background",
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {visibleItems}
        {excess > 0 && (
          <span className="relative flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground ring-2 ring-background tabular-nums">
            +{excess}
          </span>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
