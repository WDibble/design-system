"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { springs } from "@/tokens/motion";
import { cn } from "@/lib/utils";

interface PaginationContextValue {
  layoutId: string;
}

const PaginationContext = React.createContext<PaginationContextValue | null>(null);

export interface PaginationProps extends React.ComponentProps<"nav"> {
  layoutId?: string;
}

export function Pagination({
  className,
  layoutId: customLayoutId,
  children,
  ...props
}: PaginationProps) {
  const uniqueId = React.useId();
  const layoutId = customLayoutId ?? `pagination-active-pill-${uniqueId}`;

  return (
    <PaginationContext.Provider value={{ layoutId }}>
      <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center select-none", className)}
        {...props}
      >
        {children}
      </nav>
    </PaginationContext.Provider>
  );
}
Pagination.displayName = "Pagination";

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1 sm:gap-1.5", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center", className)}
    {...props}
  />
));
PaginationItem.displayName = "PaginationItem";

export interface PaginationLinkProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  isActive?: boolean;
  children?: React.ReactNode;
}

export const PaginationLink = ({
  className,
  isActive,
  children,
  onClick,
  onMouseDown,
  disabled,
  ...props
}: PaginationLinkProps) => {
  const context = React.useContext(PaginationContext);
  const layoutId = context?.layoutId ?? "pagination-default-indicator";

  return (
    <motion.button
      type="button"
      whileTap={!isActive && !disabled ? { scale: 0.92 } : undefined}
      transition={springs.tactile}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown?.(e);
      }}
      onClick={(e) => {
        if (isActive || disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      className={cn(
        "group relative size-8 rounded-md font-mono tabular-nums text-xs font-medium flex items-center justify-center border border-transparent select-none outline-none transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        isActive
          ? "text-primary-foreground cursor-default"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/70 cursor-pointer",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Sliding Active Pill Indicator */}
      {isActive && (
        <motion.span
          layoutId={layoutId}
          transition={springs.snappy}
          className="absolute inset-0 rounded-md bg-primary shadow-xs specular-rim pointer-events-none"
        />
      )}

      {/* Numerical Label */}
      <span className="relative z-10 block pointer-events-none">
        {children}
      </span>
    </motion.button>
  );
};
PaginationLink.displayName = "PaginationLink";

export interface PaginationButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref"> {
  disabled?: boolean;
}

export const PaginationPrevious = ({
  className,
  disabled,
  onClick,
  onMouseDown,
  ...props
}: PaginationButtonProps) => (
  <motion.button
    type="button"
    aria-label="Go to previous page"
    aria-disabled={disabled}
    onMouseDown={(e) => {
      e.preventDefault();
      onMouseDown?.(e);
    }}
    onClick={(e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    }}
    whileTap={!disabled ? { scale: 0.96 } : undefined}
    transition={springs.tactile}
    className={cn(
      "group inline-flex items-center justify-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-md text-xs font-medium select-none cursor-pointer border border-border/80 bg-card text-foreground shadow-xs outline-none transition-all duration-150",
      "hover:bg-muted hover:border-foreground/30 hover:text-foreground active:scale-98",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      disabled && "opacity-40 cursor-not-allowed pointer-events-none",
      className
    )}
    {...props}
  >
    <ChevronLeftIcon
      size={14}
      className="shrink-0 transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
    />
    <span className="hidden sm:inline">Previous</span>
  </motion.button>
);
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = ({
  className,
  disabled,
  onClick,
  onMouseDown,
  ...props
}: PaginationButtonProps) => (
  <motion.button
    type="button"
    aria-label="Go to next page"
    aria-disabled={disabled}
    onMouseDown={(e) => {
      e.preventDefault();
      onMouseDown?.(e);
    }}
    onClick={(e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    }}
    whileTap={!disabled ? { scale: 0.96 } : undefined}
    transition={springs.tactile}
    className={cn(
      "group inline-flex items-center justify-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-md text-xs font-medium select-none cursor-pointer border border-border/80 bg-card text-foreground shadow-xs outline-none transition-all duration-150",
      "hover:bg-muted hover:border-foreground/30 hover:text-foreground active:scale-98",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      disabled && "opacity-40 cursor-not-allowed pointer-events-none",
      className
    )}
    {...props}
  >
    <span className="hidden sm:inline">Next</span>
    <ChevronRightIcon
      size={14}
      className="shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
    />
  </motion.button>
);
PaginationNext.displayName = "PaginationNext";

export const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-8 items-center justify-center text-muted-foreground select-none", className)}
    {...props}
  >
    <span className="font-mono text-xs tracking-widest">…</span>
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";
