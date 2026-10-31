"use client";

import * as React from "react";
import { Field as BaseField } from "@base-ui/react/field";
import { cn } from "@/lib/utils";

export const Field = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof BaseField.Root>>(
  ({ className, ...props }, ref) => {
    return (
      <BaseField.Root
        ref={ref}
        className={cn("flex w-full flex-col gap-1.5", className)}
        {...props}
      />
    );
  }
);
Field.displayName = "Field";

export interface FieldLabelProps extends React.ComponentProps<typeof BaseField.Label> {
  optional?: boolean;
  requiredIndicator?: boolean;
}

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, optional, requiredIndicator, children, ...props }, ref) => {
    return (
      <div className="flex items-center justify-between gap-2">
        <BaseField.Label
          ref={ref}
          className={cn(
            "flex items-center gap-1 text-xs font-medium text-foreground select-none sm:text-sm",
            className
          )}
          {...props}
        >
          {children}
          {requiredIndicator && (
            <span className="text-xs font-semibold text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </BaseField.Label>
        {optional && (
          <span className="text-xs font-normal text-muted-foreground select-none">Optional</span>
        )}
      </div>
    );
  }
);
FieldLabel.displayName = "FieldLabel";

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof BaseField.Description>
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Description
      ref={ref}
      className={cn("text-xs leading-normal text-muted-foreground", className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

export const FieldError = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BaseField.Error>
>(({ className, children, ...props }, ref) => {
  return (
    <BaseField.Error
      ref={ref}
      className={cn(
        "flex items-center gap-1.5 text-xs leading-normal font-medium text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </BaseField.Error>
  );
});
FieldError.displayName = "FieldError";

export const FieldControl = BaseField.Control;
