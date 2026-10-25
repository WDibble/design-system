import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  specular?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, specular = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "@container rounded-2xl border border-border/80 bg-card text-card-foreground transition-all duration-200",
          specular
            ? "[box-shadow:0_1px_2px_0_oklch(0_0_0_/_0.04),0_4px_16px_-2px_oklch(0_0_0_/_0.08),inset_0_1px_0_0_oklch(1_0_0_/_0.12)]"
            : "shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-5 sm:p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 sm:p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 sm:p-6 pt-0 gap-2", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/**
 * Concentric nested container inside a Card.
 * Adheres to R_inner = max(0, R_outer - Padding).
 */
export const CardInner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-muted/60 p-3.5 sm:p-4 border border-border/40 text-foreground",
      className
    )}
    {...props}
  />
));
CardInner.displayName = "CardInner";
