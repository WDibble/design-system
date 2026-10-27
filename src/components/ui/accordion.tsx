"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "border-b border-border/40 last:border-b-0 transition-colors",
        className
      )}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

export const AccordionHeader = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header
      ref={ref}
      className={cn("flex", className)}
      {...props}
    />
  );
});
AccordionHeader.displayName = "AccordionHeader";

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
    hideChevron?: boolean;
  }
>(({ className, children, hideChevron = false, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between py-4 text-left text-sm font-medium text-foreground cursor-pointer select-none",
          "transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
          "hover:text-primary active:scale-[0.99]",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span className="flex-1 text-inherit">{children}</span>
        {!hideChevron && (
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 text-muted-foreground/80 transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-data-[panel-open]:rotate-180 group-data-[panel-open]:text-foreground"
            )}
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AccordionPrimitive.Panel>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Panel
      ref={ref}
      className={cn(
        "overflow-hidden text-sm text-muted-foreground transition-[height] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "h-[var(--accordion-panel-height)]",
        "data-[starting-style]:h-0 data-[ending-style]:h-0",
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-1 leading-relaxed min-h-0 text-sm">
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
});
AccordionContent.displayName = "AccordionContent";
