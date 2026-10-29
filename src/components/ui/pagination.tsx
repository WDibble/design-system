"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Pagination = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center select-none", className)}
    {...props}
  />
);
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
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

export type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"a">;

export const PaginationLink = ({
  className,
  isActive,
  children,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "ghost",
        size: "icon-sm",
      }),
      "font-mono tabular-nums text-xs transition-transform active:scale-95 cursor-pointer",
      isActive && "shadow-xs specular-rim pointer-events-none",
      className
    )}
    {...props}
  >
    {children}
  </a>
);
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <a
    aria-label="Go to previous page"
    aria-disabled={disabled}
    className={cn(
      buttonVariants({
        variant: "outline",
        size: "sm",
      }),
      "gap-1.5 pl-2.5 pr-3 text-xs active:scale-95 cursor-pointer",
      disabled && "opacity-40 pointer-events-none cursor-not-allowed",
      className
    )}
    {...props}
  >
    <ChevronLeftIcon size={14} className="shrink-0" />
    <span className="hidden sm:inline">Previous</span>
  </a>
);
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <a
    aria-label="Go to next page"
    aria-disabled={disabled}
    className={cn(
      buttonVariants({
        variant: "outline",
        size: "sm",
      }),
      "gap-1.5 pl-3 pr-2.5 text-xs active:scale-95 cursor-pointer",
      disabled && "opacity-40 pointer-events-none cursor-not-allowed",
      className
    )}
    {...props}
  >
    <span className="hidden sm:inline">Next</span>
    <ChevronRightIcon size={14} className="shrink-0" />
  </a>
);
PaginationNext.displayName = "PaginationNext";

export const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-8 items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <span className="font-mono text-xs tracking-widest">…</span>
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";
