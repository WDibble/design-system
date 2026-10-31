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
  /**
   * Display variant for Previous/Next buttons in turnkey mode:
   * - "worded": Displays icon and text label ("Previous" / "Next").
   * - "icon": Compact square icon-only buttons (size-8) matching numerical page pills.
   * @default "worded"
   */
  buttonVariant?: "worded" | "icon";
  /**
   * Convenience boolean shorthand: setting false enables icon-only buttons.
   */
  showButtonLabels?: boolean;
}

export function Pagination({
  className,
  layoutId: customLayoutId,
  currentPage,
  totalPages,
  onPageChange,
  buttonVariant = "worded",
  showButtonLabels = true,
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

  const resolvedButtonVariant: "worded" | "icon" =
    showButtonLabels === false ? "icon" : buttonVariant;

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
                variant={resolvedButtonVariant}
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
                variant={resolvedButtonVariant}
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

export const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex shrink-0 flex-row items-center gap-1 sm:gap-1.5", className)}
      {...props}
    />
  )
);
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex shrink-0 items-center", className)} {...props} />
  )
);
PaginationItem.displayName = "PaginationItem";

export interface PaginationLinkProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
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
        "group relative flex size-8 shrink-0 items-center justify-center rounded-md border border-transparent font-mono text-xs font-medium tabular-nums transition-colors duration-150 outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        isActive
          ? "cursor-default text-primary-foreground"
          : "cursor-pointer text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        disabled && "pointer-events-none cursor-not-allowed opacity-40",
        className
      )}
      {...props}
    >
      {/* Sliding Active Pill Indicator */}
      {isActive && (
        <motion.span
          layoutId={layoutId}
          transition={springs.snappy}
          className="specular-rim pointer-events-none absolute inset-0 rounded-md bg-primary shadow-xs"
        />
      )}

      {/* Numerical Label */}
      <span className="pointer-events-none relative z-10 block">{children}</span>
    </motion.button>
  );
};
PaginationLink.displayName = "PaginationLink";

export interface PaginationButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: React.ReactNode;
  disabled?: boolean;
  /**
   * Display mode for the button:
   * - "worded": Displays icon and text label (e.g. "< Previous" or "Next >").
   * - "icon": Compact square icon-only button (size-8) matching numerical page pills.
   * @default "worded"
   */
  variant?: "worded" | "icon";
  /**
   * Convenience boolean shorthand for variant="icon".
   */
  iconOnly?: boolean;
  /**
   * Optional custom text label when rendered in worded mode.
   * Defaults to "Previous" or "Next".
   */
  label?: React.ReactNode;
}

export const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
  (
    {
      className,
      disabled,
      variant = "worded",
      iconOnly = false,
      label,
      children,
      onClick,
      onMouseDown,
      ...props
    },
    ref
  ) => {
    const isIconOnly = iconOnly || variant === "icon";

    return (
      <motion.button
        ref={ref}
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
        whileTap={!disabled ? { scale: 0.94 } : undefined}
        transition={springs.tactile}
        className={cn(
          "group inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-border/80 bg-card text-xs font-medium text-foreground shadow-xs transition-colors duration-150 outline-none select-none",
          "hover:border-foreground/30 hover:bg-muted hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          isIconOnly ? "size-8 p-0" : "h-8 w-24 gap-1.5 px-2.5",
          disabled && "pointer-events-none cursor-not-allowed opacity-40",
          className
        )}
        {...props}
      >
        <ChevronLeftIcon
          size={14}
          className={cn(
            "pointer-events-none shrink-0",
            !isIconOnly && "transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
          )}
        />
        {!isIconOnly && (
          <span className="whitespace-nowrap">{children ?? label ?? "Previous"}</span>
        )}
      </motion.button>
    );
  }
);
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
  (
    {
      className,
      disabled,
      variant = "worded",
      iconOnly = false,
      label,
      children,
      onClick,
      onMouseDown,
      ...props
    },
    ref
  ) => {
    const isIconOnly = iconOnly || variant === "icon";

    return (
      <motion.button
        ref={ref}
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
        whileTap={!disabled ? { scale: 0.94 } : undefined}
        transition={springs.tactile}
        className={cn(
          "group inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-border/80 bg-card text-xs font-medium text-foreground shadow-xs transition-colors duration-150 outline-none select-none",
          "hover:border-foreground/30 hover:bg-muted hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          isIconOnly ? "size-8 p-0" : "h-8 w-24 gap-1.5 px-2.5",
          disabled && "pointer-events-none cursor-not-allowed opacity-40",
          className
        )}
        {...props}
      >
        {!isIconOnly && <span className="whitespace-nowrap">{children ?? label ?? "Next"}</span>}
        <ChevronRightIcon
          size={14}
          className={cn(
            "pointer-events-none shrink-0",
            !isIconOnly && "transition-transform duration-150 ease-out group-hover:translate-x-0.5"
          )}
        />
      </motion.button>
    );
  }
);
PaginationNext.displayName = "PaginationNext";

export const PaginationPreviousIcon = React.forwardRef<
  HTMLButtonElement,
  Omit<PaginationButtonProps, "variant" | "iconOnly">
>((props, ref) => <PaginationPrevious ref={ref} variant="icon" {...props} />);
PaginationPreviousIcon.displayName = "PaginationPreviousIcon";

export const PaginationNextIcon = React.forwardRef<
  HTMLButtonElement,
  Omit<PaginationButtonProps, "variant" | "iconOnly">
>((props, ref) => <PaginationNext ref={ref} variant="icon" {...props} />);
PaginationNextIcon.displayName = "PaginationNextIcon";

export const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex size-8 shrink-0 items-center justify-center text-muted-foreground select-none",
      className
    )}
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
export function getPaginationItems(currentPage: number, totalPages: number): PaginationItemType[] {
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
