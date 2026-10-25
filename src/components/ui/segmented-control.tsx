import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { springs } from "@/tokens/motion";

interface SegmentedControlContextValue {
  value: string;
  onValueChange: (value: string) => void;
  layoutId: string;
  size?: "sm" | "default";
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControlContext() {
  const context = React.useContext(SegmentedControlContext);
  if (!context) {
    throw new Error("SegmentedControl subcomponents must be used within <SegmentedControl>");
  }
  return context;
}

export interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  size?: "sm" | "default";
  children: React.ReactNode;
}

export function SegmentedControl({
  value,
  onValueChange,
  size = "default",
  className,
  children,
  ...props
}: SegmentedControlProps) {
  const uniqueId = React.useId();
  const layoutId = `segmented-control-indicator-${uniqueId}`;

  return (
    <SegmentedControlContext.Provider value={{ value, onValueChange, layoutId, size }}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          "relative inline-flex items-center p-1 bg-muted rounded-lg select-none isolate",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

export interface SegmentedControlItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  children: React.ReactNode;
}

export function SegmentedControlItem({
  value,
  className,
  children,
  disabled,
  onClick,
  ...props
}: SegmentedControlItemProps) {
  const { value: selectedValue, onValueChange, layoutId, size } = useSegmentedControlContext();
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={(e) => {
        if (!isSelected && !disabled) {
          onValueChange(value);
        }
        onClick?.(e);
      }}
      className={cn(
        // INVARIANT: Font-weight (font-medium), tracking, padding, and border remain 100% frozen
        // across both active and inactive states to guarantee ZERO layout shifts.
        "relative rounded-md font-medium text-xs outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-muted",
        "disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" ? "px-2.5 py-0.5" : "px-3 py-1",
        isSelected
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {isSelected && (
        <motion.span
          layoutId={layoutId}
          transition={springs.snappy}
          style={{ zIndex: 0 }}
          className="absolute inset-0 bg-background rounded-md shadow-xs pointer-events-none"
        />
      )}
      <span
        style={{ zIndex: 10 }}
        className="relative pointer-events-none block [transform:translateZ(0)] antialiased transition-colors duration-150"
      >
        {children}
      </span>
    </button>
  );
}
