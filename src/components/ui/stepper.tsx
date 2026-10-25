import * as React from "react";
import { PlusIcon, MinusIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useHoldToStep } from "@/hooks/use-hold-to-step";

export interface StepperContextValue {
  value: number;
  onValueChange?: (value: number) => void;
  step: number;
  min: number;
  max: number;
  disabled: boolean;
  prefix: string;
  suffix: string;
  decimalPlaces: number;
  increment: () => void;
  decrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

export function useStepperContext() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper compound components must be rendered within a <Stepper>");
  }
  return context;
}

export interface StepperRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onValueChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  children?: React.ReactNode;
}

export function StepperRoot({
  value,
  onValueChange,
  step = 1,
  min = -Infinity,
  max = Infinity,
  disabled = false,
  prefix = "",
  suffix = "",
  decimalPlaces = 0,
  className,
  children,
  ...props
}: StepperRootProps) {
  const roundToDecimals = React.useCallback(
    (num: number) => {
      const factor = Math.pow(10, decimalPlaces);
      return Math.round(num * factor) / factor;
    },
    [decimalPlaces]
  );

  const canIncrement = !disabled && value < max;
  const canDecrement = !disabled && value > min;

  const increment = React.useCallback(() => {
    if (!canIncrement) return;
    const next = roundToDecimals(Math.min(max, value + step));
    onValueChange?.(next);
  }, [canIncrement, max, onValueChange, roundToDecimals, step, value]);

  const decrement = React.useCallback(() => {
    if (!canDecrement) return;
    const next = roundToDecimals(Math.max(min, value - step));
    onValueChange?.(next);
  }, [canDecrement, min, onValueChange, roundToDecimals, step, value]);

  const contextValue = React.useMemo<StepperContextValue>(
    () => ({
      value,
      onValueChange,
      step,
      min,
      max,
      disabled,
      prefix,
      suffix,
      decimalPlaces,
      increment,
      decrement,
      canIncrement,
      canDecrement,
    }),
    [
      value,
      onValueChange,
      step,
      min,
      max,
      disabled,
      prefix,
      suffix,
      decimalPlaces,
      increment,
      decrement,
      canIncrement,
      canDecrement,
    ]
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        role="group"
        aria-label="Number Stepper"
        className={cn("inline-flex items-center gap-3 select-none", className)}
        {...props}
      >
        {children ?? (
          <>
            <StepperValue />
            <StepperControls>
              <StepperDecrement />
              <StepperIncrement />
            </StepperControls>
          </>
        )}
      </div>
    </StepperContext.Provider>
  );
}

export interface StepperValueProps extends React.HTMLAttributes<HTMLDivElement> {
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
}

export function StepperValue({
  className,
  prefix: prefixProp,
  suffix: suffixProp,
  decimalPlaces: decProp,
  ...props
}: StepperValueProps) {
  const { value, prefix, suffix, decimalPlaces } = useStepperContext();

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("tabular-nums font-mono tracking-tight min-w-0", className)}
      {...props}
    >
      <NumberTicker
        value={value}
        prefix={prefixProp ?? prefix}
        suffix={suffixProp ?? suffix}
        decimalPlaces={decProp ?? decimalPlaces}
      />
    </div>
  );
}

export function StepperControls({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-1.5 shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

export interface StepperButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Optional override for stepping action */
  onStep?: () => void;
}

export function StepperIncrement({
  className,
  size = "icon",
  variant = "outline",
  "aria-label": ariaLabel = "Increment value",
  children,
  ...props
}: StepperButtonProps) {
  const { increment, canIncrement } = useStepperContext();

  const holdProps = useHoldToStep({
    onStep: increment,
    disabled: !canIncrement,
  });

  return (
    <Button
      size={size}
      variant={variant}
      disabled={!canIncrement}
      aria-label={ariaLabel}
      iconTrigger="press"
      className={cn("size-8", className)}
      {...holdProps}
      {...props}
    >
      {children ?? <PlusIcon size={14} />}
    </Button>
  );
}

export function StepperDecrement({
  className,
  size = "icon",
  variant = "outline",
  "aria-label": ariaLabel = "Decrement value",
  children,
  ...props
}: StepperButtonProps) {
  const { decrement, canDecrement } = useStepperContext();

  const holdProps = useHoldToStep({
    onStep: decrement,
    disabled: !canDecrement,
  });

  return (
    <Button
      size={size}
      variant={variant}
      disabled={!canDecrement}
      aria-label={ariaLabel}
      iconTrigger="press"
      className={cn("size-8", className)}
      {...holdProps}
      {...props}
    >
      {children ?? <MinusIcon size={14} />}
    </Button>
  );
}

export const Stepper = Object.assign(StepperRoot, {
  Value: StepperValue,
  Controls: StepperControls,
  Increment: StepperIncrement,
  Decrement: StepperDecrement,
});
