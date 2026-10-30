"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { type toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

export const useToggleGroup = () => React.useContext(ToggleGroupContext);

export interface ToggleGroupProps
  extends React.ComponentProps<typeof BaseToggleGroup>,
    VariantProps<typeof toggleVariants> {}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <BaseToggleGroup
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-1 p-0.5 rounded-lg",
          variant === "surface" && "bg-muted/40 p-1 border border-border/50",
          className
        )}
        {...props}
      >
        <ToggleGroupContext.Provider value={{ variant, size }}>
          {children}
        </ToggleGroupContext.Provider>
      </BaseToggleGroup>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup";
