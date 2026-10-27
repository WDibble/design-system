"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Table = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement> & {
    containerClassName?: string;
  }
>(({ className, containerClassName, ...props }, ref) => (
  <div
    className={cn(
      "relative w-full overflow-x-auto rounded-xl border border-border/40 bg-card/40 backdrop-blur-xs",
      containerClassName
    )}
  >
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm border-collapse", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-b border-border/60 bg-muted/30", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-border/60 bg-muted/40 font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-border/30 transition-colors duration-150",
      "hover:bg-muted/40 data-[state=selected]:bg-muted/60",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    numeric?: boolean;
  }
>(({ className, numeric = false, ...props }, ref) => (
  <th
    ref={ref}
    scope="col"
    className={cn(
      "h-10 px-4 text-left align-middle text-xs font-semibold text-muted-foreground select-none",
      numeric && "text-right tabular-nums",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    numeric?: boolean;
  }
>(({ className, numeric = false, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle text-sm text-foreground",
      numeric && "text-right tabular-nums font-mono text-xs",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
