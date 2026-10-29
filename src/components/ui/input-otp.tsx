"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { springs } from "@/tokens/motion";

interface OTPContextValue {
  value: string;
  focusedIndex: number;
  isFocused: boolean;
  maxLength: number;
  mask?: boolean;
  disabled?: boolean;
}

const OTPContext = React.createContext<OTPContextValue | null>(null);

function useOTPContext() {
  const context = React.useContext(OTPContext);
  if (!context) {
    throw new Error("InputOTP subcomponents must be rendered inside an <InputOTP> root.");
  }
  return context;
}

export interface InputOTPProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  maxLength?: number;
  mask?: boolean;
  containerClassName?: string;
}

export const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      onComplete,
      maxLength = 6,
      mask = false,
      disabled = false,
      className,
      containerClassName,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    // React 19 / standard ref binding
    React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value;
      // Extract numbers (supports SMS autofill format: e.g. "@domain.com #123456" -> "123456")
      const matches = raw.match(/\d+/g);
      const digits = matches ? matches.join("").slice(0, maxLength) : "";

      if (!isControlled) {
        setInternalValue(digits);
      }
      onChange?.(digits);

      if (digits.length === maxLength) {
        onComplete?.(digits);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow navigation and standard editing keys
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // Native cursor navigation inside input
        return;
      }
    };

    const focusedIndex = isFocused ? Math.min(value.length, maxLength - 1) : -1;

    return (
      <OTPContext.Provider
        value={{
          value,
          focusedIndex,
          isFocused,
          maxLength,
          mask,
          disabled,
        }}
      >
        <div
          className={cn(
            "relative inline-flex items-center select-none cursor-pointer",
            disabled && "cursor-not-allowed opacity-50",
            containerClassName
          )}
          onClick={() => {
            if (!disabled) {
              inputRef.current?.focus();
            }
          }}
        >
          {/* Real accessible input: positioned over the component but transparent */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={maxLength}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label={props["aria-label"] || "One-time verification code"}
            className={cn(
              "absolute inset-0 w-full h-full opacity-0 pointer-events-auto cursor-pointer z-10",
              "disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />

          {/* Visual slot renderer */}
          <div className="flex items-center gap-2" aria-hidden="true">
            {children}
          </div>
        </div>
      </OTPContext.Provider>
    );
  }
);
InputOTP.displayName = "InputOTP";

export interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1.5", className)}
        {...props}
      />
    );
  }
);
InputOTPGroup.displayName = "InputOTPGroup";

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

export const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const { value, focusedIndex, isFocused, mask, disabled } = useOTPContext();

    const char = value[index];
    const isCurrentActive = isFocused && (focusedIndex === index || (index === value.length && index === focusedIndex));
    const isFilled = Boolean(char);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex size-11 items-center justify-center rounded-xl border text-sm font-semibold transition-[border-color,box-shadow,background-color] duration-150 select-none",
          // Base token border styling (Directive #2: Zero layout shifts - border is always 1px)
          "border-border/80 bg-card text-foreground shadow-xs",
          // Hover state
          !disabled && "hover:border-foreground/40",
          // Active focused slot state: High-precision focus ring with zero dimensional change
          isCurrentActive && "border-ring ring-2 ring-ring ring-offset-2 ring-offset-background z-20",
          // Disabled
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {char ? (
            <motion.span
              key={`char-${char}-${index}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={springs.snappy}
              className="font-mono text-base font-semibold tabular-nums tracking-tight"
            >
              {mask ? "•" : char}
            </motion.span>
          ) : isCurrentActive ? (
            <motion.div
              key="caret"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              className="h-4 w-0.5 rounded-full bg-primary"
            />
          ) : null}
        </AnimatePresence>

        {/* Tactile indicator underline on filled states */}
        {isFilled && !isCurrentActive && (
          <div className="absolute bottom-1.5 h-0.5 w-2 rounded-full bg-primary/40" />
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

export interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("flex items-center justify-center px-1 text-muted-foreground select-none", className)}
        {...props}
      >
        {children || <div className="h-1 w-2 rounded-full bg-muted-foreground/40" />}
      </div>
    );
  }
);
InputOTPSeparator.displayName = "InputOTPSeparator";
