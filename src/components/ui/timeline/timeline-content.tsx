import * as React from "react";
import { cn } from "@/lib/utils";

export function TimelineContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex min-w-0 flex-1 flex-col pt-0.5", className)} {...props} />;
}
TimelineContent.displayName = "TimelineContent";

export function TimelineHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-1 @[20rem]/timeline:flex-row @[20rem]/timeline:items-baseline @[20rem]/timeline:gap-3",
        className
      )}
      {...props}
    />
  );
}
TimelineHeader.displayName = "TimelineHeader";

export function TimelineTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("text-sm leading-snug font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
}
TimelineTitle.displayName = "TimelineTitle";

export function TimelineTime({ className, ...props }: React.TimeHTMLAttributes<HTMLTimeElement>) {
  return (
    <time
      className={cn("shrink-0 font-mono text-xs text-muted-foreground/80 tabular-nums", className)}
      {...props}
    />
  );
}
TimelineTime.displayName = "TimelineTime";

export function TimelineDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1 text-xs leading-relaxed text-muted-foreground", className)} {...props} />
  );
}
TimelineDescription.displayName = "TimelineDescription";

export function TimelineBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-2.5 space-y-2 text-xs text-foreground", className)} {...props} />;
}
TimelineBody.displayName = "TimelineBody";

export function TimelineFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
TimelineFooter.displayName = "TimelineFooter";
