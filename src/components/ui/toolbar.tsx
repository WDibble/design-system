"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cn } from "@/lib/utils";

export const toolbarVariants = cva(
  "relative flex items-center gap-1 select-none",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border border-border/70 bg-card/80 p-1 backdrop-blur-md specular-rim shadow-xs text-foreground",
        floating:
          "rounded-2xl border border-border/80 glass-regular p-1.5 specular-rim shadow-xl text-foreground",
        outline:
          "rounded-xl border border-border/80 bg-transparent p-1 text-foreground",
        surface:
          "rounded-xl border border-border/50 bg-muted/40 p-1 text-foreground",
      },
      size: {
        sm: "min-h-9 px-1 gap-0.5",
        default: "min-h-10 px-1.5 gap-1",
        lg: "min-h-12 px-2 gap-1.5",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      orientation: "horizontal",
    },
  }
);

export const toolbarButtonVariants = cva(
  [
    "group inline-flex items-center justify-center font-medium select-none shrink-0",
    "border border-transparent text-muted-foreground",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out",
    "hover:bg-muted/70 hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Directive 1: Physical yield on pointerdown
    "active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        ghost: "bg-transparent hover:bg-muted/60",
        outline: "border-border/60 hover:bg-muted/50 data-[pressed]:bg-muted/80",
        surface: "bg-muted/30 hover:bg-muted/60 data-[pressed]:bg-background data-[pressed]:shadow-xs",
      },
      size: {
        xs: "h-7 min-w-7 px-1.5 text-[11px] rounded-md gap-1",
        sm: "h-8 min-w-8 px-2 text-xs rounded-lg gap-1.5",
        default: "h-9 min-w-9 px-2.5 text-xs rounded-lg gap-2",
        lg: "h-10 min-w-10 px-3 text-sm rounded-lg gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ToolbarContextValue {
  size: "xs" | "sm" | "default" | "lg";
  variant: "default" | "floating" | "outline" | "surface";
  orientation: "horizontal" | "vertical";
}

const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: "default",
  variant: "default",
  orientation: "horizontal",
});

export const useToolbar = () => React.useContext(ToolbarContext);

export interface ToolbarProps
  extends Omit<React.ComponentProps<typeof ToolbarPrimitive.Root>, "orientation">,
    VariantProps<typeof toolbarVariants> {}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      orientation = "horizontal",
      children,
      ...props
    },
    ref
  ) => {
    const resolvedSize = (size ?? "default") as "xs" | "sm" | "default" | "lg";
    const resolvedVariant = (variant ?? "default") as "default" | "floating" | "outline" | "surface";
    const resolvedOrientation = (orientation ?? "horizontal") as "horizontal" | "vertical";

    return (
      <ToolbarPrimitive.Root
        ref={ref}
        orientation={resolvedOrientation}
        className={cn(
          toolbarVariants({
            variant: resolvedVariant,
            size: resolvedSize === "xs" ? "sm" : resolvedSize,
            orientation: resolvedOrientation,
          }),
          className
        )}
        {...props}
      >
        <ToolbarContext.Provider
          value={{
            size: resolvedSize,
            variant: resolvedVariant,
            orientation: resolvedOrientation,
          }}
        >
          {children}
        </ToolbarContext.Provider>
      </ToolbarPrimitive.Root>
    );
  }
);
Toolbar.displayName = "Toolbar";

export interface ToolbarGroupProps
  extends React.ComponentProps<typeof ToolbarPrimitive.Group> {}

export const ToolbarGroup = React.forwardRef<HTMLDivElement, ToolbarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <ToolbarPrimitive.Group
        ref={ref}
        className={cn("flex items-center gap-0.5", className)}
        {...props}
      />
    );
  }
);
ToolbarGroup.displayName = "ToolbarGroup";

export interface ToolbarButtonProps
  extends React.ComponentProps<typeof ToolbarPrimitive.Button>,
    VariantProps<typeof toolbarButtonVariants> {
  isActive?: boolean;
}

export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(({ className, variant, size, isActive, ...props }, ref) => {
  const context = useToolbar();
  const effectiveSize = size ?? (context.size === "xs" ? "xs" : context.size === "lg" ? "lg" : "sm");

  return (
    <ToolbarPrimitive.Button
      ref={ref}
      className={cn(
        toolbarButtonVariants({ variant, size: effectiveSize }),
        isActive && "bg-muted text-foreground font-semibold shadow-2xs border-border/50",
        className
      )}
      {...props}
    />
  );
});
ToolbarButton.displayName = "ToolbarButton";

export interface ToolbarSeparatorProps
  extends React.ComponentProps<typeof ToolbarPrimitive.Separator> {}

export const ToolbarSeparator = React.forwardRef<
  HTMLDivElement,
  ToolbarSeparatorProps
>(({ className, orientation, ...props }, ref) => {
  const context = useToolbar();
  const effectiveOrientation = orientation ?? (context.orientation === "vertical" ? "horizontal" : "vertical");

  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      orientation={effectiveOrientation}
      className={cn(
        effectiveOrientation === "vertical"
          ? "h-4 w-px bg-border/60 mx-1 shrink-0"
          : "h-px w-full bg-border/60 my-1 shrink-0",
        className
      )}
      {...props}
    />
  );
});
ToolbarSeparator.displayName = "ToolbarSeparator";

export interface ToolbarToggleGroupProps
  extends React.ComponentProps<typeof BaseToggleGroup> {}

export const ToolbarToggleGroup = React.forwardRef<
  HTMLDivElement,
  ToolbarToggleGroupProps
>(({ className, ...props }, ref) => {
  return (
    <BaseToggleGroup
      ref={ref}
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
});
ToolbarToggleGroup.displayName = "ToolbarToggleGroup";

export interface ToolbarToggleItemProps
  extends React.ComponentProps<typeof BaseToggle>,
    VariantProps<typeof toolbarButtonVariants> {}

export const ToolbarToggleItem = React.forwardRef<
  HTMLButtonElement,
  ToolbarToggleItemProps
>(({ className, variant, size, ...props }, ref) => {
  const context = useToolbar();
  const effectiveSize = size ?? (context.size === "xs" ? "xs" : context.size === "lg" ? "lg" : "sm");

  return (
    <ToolbarPrimitive.Button
      render={
        <BaseToggle
          ref={ref}
          className={cn(
            toolbarButtonVariants({ variant, size: effectiveSize }),
            "data-[pressed]:bg-muted data-[pressed]:text-foreground data-[pressed]:font-semibold data-[pressed]:border-border/50 shadow-2xs",
            className
          )}
          {...props}
        />
      }
    />
  );
});
ToolbarToggleItem.displayName = "ToolbarToggleItem";

export interface ToolbarLinkProps
  extends React.ComponentProps<typeof ToolbarPrimitive.Link> {}

export const ToolbarLink = React.forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <ToolbarPrimitive.Link
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 px-2 py-1 rounded-md",
          className
        )}
        {...props}
      />
    );
  }
);
ToolbarLink.displayName = "ToolbarLink";
