"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  BadgeAlertIcon,
  BookTextIcon,
  FlameIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export const calloutVariants = cva(
  "relative flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm leading-relaxed transition-colors duration-150",
  {
    variants: {
      variant: {
        note: "border-info/30 bg-info/8 text-foreground",
        tip: "border-success/30 bg-success/8 text-foreground",
        warning: "border-warning/35 bg-warning/10 text-foreground",
        caution: "border-destructive/35 bg-destructive/10 text-foreground",
        "defining-constraint":
          "border-l-2 border-border/80 border-l-primary bg-muted/45 text-foreground",
      },
    },
    defaultVariants: {
      variant: "note",
    },
  }
);

const ICON_TONE_BY_VARIANT: Record<NonNullable<CalloutProps["variant"]>, string> = {
  note: "text-info",
  tip: "text-emerald-700 dark:text-emerald-300",
  warning: "text-amber-800 dark:text-amber-300",
  caution: "text-destructive",
  "defining-constraint": "text-primary",
};

const DEFAULT_TITLES: Record<NonNullable<CalloutProps["variant"]>, string> = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
  caution: "Caution",
  "defining-constraint": "Defining Constraint",
};

function renderDefaultCalloutIcon(variant: NonNullable<CalloutProps["variant"]>) {
  switch (variant) {
    case "tip":
      return <SparklesIcon size={16} aria-hidden="true" />;
    case "warning":
      return <BadgeAlertIcon size={16} aria-hidden="true" />;
    case "caution":
      return <FlameIcon size={16} aria-hidden="true" />;
    case "defining-constraint":
      return <ShieldCheckIcon size={16} aria-hidden="true" />;
    case "note":
    default:
      return <BookTextIcon size={16} aria-hidden="true" />;
  }
}

export interface CalloutProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof calloutVariants> {
  /** Optional heading displayed above the callout body prose */
  title?: string;
  /** Optional custom leading icon overriding the variant default */
  icon?: React.ReactNode;
  /** Callout body copy or structured guidance */
  children: React.ReactNode;
}

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant = "note", title, icon, children, role, ...props }, ref) => {
    const resolvedVariant = variant ?? "note";
    const computedRole =
      role ?? (resolvedVariant === "warning" || resolvedVariant === "caution" ? "alert" : "note");
    const headingText = title ?? DEFAULT_TITLES[resolvedVariant];

    return (
      <div
        ref={ref}
        role={computedRole}
        aria-label={props["aria-label"] ?? headingText}
        className={cn(calloutVariants({ variant: resolvedVariant }), className)}
        {...props}
      >
        <span
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md",
            ICON_TONE_BY_VARIANT[resolvedVariant]
          )}
          aria-hidden="true"
        >
          {icon ?? renderDefaultCalloutIcon(resolvedVariant)}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="text-sm leading-snug font-semibold tracking-tight text-foreground">
            {headingText}
          </div>
          <div className="text-sm leading-relaxed [text-wrap:pretty] text-muted-foreground [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Callout.displayName = "Callout";
