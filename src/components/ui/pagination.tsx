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
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  className,
  layoutId: customLayoutId,
  currentPage,
  totalPages,
  onPageChange,
  children,
  ...props
}: PaginationProps) {
  const uniqueId = React.useId();
  const layoutId = customLayoutId ?? `pagination-active-pill-${uniqueId}`;

  // Turnkey auto-composition mode: if page props are supplied and children are omitted,
  // render the canonical zero-layout-shift 7-slot pagination bar automatically.
  const isTurnkey =
    currentPage !== undefined &&
    totalPages !== undefined &&
    onPageChange !== undefined &&
    !children;

  return (
    <PaginationContext.Provider value={{ layoutId }}>
      <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center select-none", className)}
        {...props}
      >
        {isTurnkey ? (
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage <= 1}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>

            {getPaginationItems(currentPage, totalPages).map((item, idx) => {
              if (typeof item === "string") {
                return (
                  <PaginationItem key={`${item}-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={currentPage === item}
                    onClick={() => onPageChange(item)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        ) : (
          children
        )}
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
    className={cn("flex flex-row items-center gap-1 sm:gap-1.5 shrink-0", className)}
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
    className={cn("inline-flex items-center shrink-0", className)}
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
      onPointerDown={(e) => {
        e.preventDefault();
        props.onPointerDown?.(e);
      }}
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
        "group relative size-8 shrink-0 rounded-md font-mono tabular-nums text-xs font-medium flex items-center justify-center border border-transparent select-none outline-none transition-colors duration-150",
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
    onPointerDown={(e) => {
      e.preventDefault();
      props.onPointerDown?.(e);
    }}
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
      "group inline-flex items-center justify-center gap-1.5 h-8 w-[84px] sm:w-[88px] shrink-0 rounded-md text-xs font-medium select-none cursor-pointer border border-border/80 bg-card text-foreground shadow-xs outline-none transition-colors duration-150",
      "hover:bg-muted hover:border-foreground/30 hover:text-foreground",
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
    onPointerDown={(e) => {
      e.preventDefault();
      props.onPointerDown?.(e);
    }}
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
      "group inline-flex items-center justify-center gap-1.5 h-8 w-[84px] sm:w-[88px] shrink-0 rounded-md text-xs font-medium select-none cursor-pointer border border-border/80 bg-card text-foreground shadow-xs outline-none transition-colors duration-150",
      "hover:bg-muted hover:border-foreground/30 hover:text-foreground",
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
    className={cn("flex size-8 shrink-0 items-center justify-center text-muted-foreground select-none", className)}
    {...props}
  >
    <span className="font-mono text-xs tracking-widest">…</span>
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export type PaginationItemType = number | "ellipsis-start" | "ellipsis-end";

/**
 * Returns a strictly length-stabilized array of pagination items.
 * When totalPages > 7, this function ALWAYS returns exactly 7 items, guaranteeing
 * zero layout shift or width flickering as the active page changes.
 */
export function getPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItemType[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Left boundary: pages 1 to 4 -> [1, 2, 3, 4, 5, 'ellipsis-end', totalPages] (length 7)
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-end", totalPages];
  }

  // Right boundary: pages (totalPages-3) to totalPages -> [1, 'ellipsis-start', totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages] (length 7)
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis-start",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // Center window: [1, 'ellipsis-start', curr-1, curr, curr+1, 'ellipsis-end', totalPages] (length 7)
  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
}
