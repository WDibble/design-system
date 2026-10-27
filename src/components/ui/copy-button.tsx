"use client";

import * as React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";
import { CopyIcon, CheckIcon } from "@/components/icons";
import { springs } from "@/tokens/motion";
import { cn } from "@/lib/utils";

export interface CopyButtonProps
  extends Omit<HTMLMotionProps<"button">, "children" | "onCopy"> {
  /** The text string to copy to clipboard */
  value?: string;
  /** Controlled copied state */
  copied?: boolean;
  /** Callback fired when copied state changes */
  onCopiedChange?: (copied: boolean) => void;
  /** Auto-reset timeout in milliseconds (default 1800ms) */
  timeout?: number;
  /** Label to display when idle (leave empty for icon-only button) */
  idleText?: React.ReactNode;
  /** Label to display when copied (defaults to "Copied!" if idleText is provided) */
  copiedText?: React.ReactNode;
  /** Visual variant */
  variant?: "outline" | "ghost" | "secondary" | "pill";
  /** Size variant */
  size?: "sm" | "default" | "lg" | "icon";
  /** Custom icon size (pixels) */
  iconSize?: number;
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      copied: controlledCopied,
      onCopiedChange,
      timeout = 1800,
      idleText,
      copiedText = "Copied!",
      variant = "outline",
      size = "default",
      iconSize,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalCopied, setInternalCopied] = React.useState(false);
    const isControlled = controlledCopied !== undefined;
    const isCopied = isControlled ? controlledCopied : internalCopied;
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Derived icon size
    const effectiveIconSize =
      iconSize ?? (size === "sm" ? 13 : size === "lg" ? 18 : 15);

    // Cleanup timer on unmount
    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (isCopied) return;

      if (value) {
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(value);
          }
        } catch {
          // Fallback or permission denial silent handling
        }
      }

      if (!isControlled) {
        setInternalCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setInternalCopied(false);
          onCopiedChange?.(false);
        }, timeout);
      }
      onCopiedChange?.(true);
    };

    // Styling variants
    const variantStyles = {
      outline: isCopied
        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
        : "border-border/80 bg-card text-foreground hover:bg-muted shadow-xs",
      ghost: isCopied
        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
        : "border-transparent bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
      secondary: isCopied
        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
        : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
      pill: isCopied
        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded-full"
        : "border-border/80 bg-card text-foreground hover:bg-muted rounded-full shadow-xs",
    };

    const sizeStyles = {
      sm: idleText ? "h-7 px-2.5 text-xs rounded-md gap-1.5" : "size-7 p-0 rounded-md",
      default: idleText
        ? variant === "pill"
          ? "h-9 px-4 text-sm rounded-full gap-2"
          : "h-9 px-3.5 text-sm rounded-lg gap-2"
        : "size-9 p-0 rounded-lg",
      lg: idleText
        ? variant === "pill"
          ? "h-10 px-5 text-base rounded-full gap-2.5"
          : "h-10 px-4 text-base rounded-xl gap-2.5"
        : "size-10 p-0 rounded-xl",
      icon: "size-8 p-0 rounded-lg",
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        layout
        transition={springs.squishy}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        aria-label={isCopied ? "Copied" : "Copy to clipboard"}
        className={cn(
          "relative inline-flex items-center justify-center font-medium select-none shrink-0 border cursor-pointer",
          "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isCopied ? (
            <motion.span
              key="copied"
              layout="position"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springs.micro}
              className="inline-flex items-center gap-1.5"
            >
              <CheckIcon size={effectiveIconSize} className="shrink-0" />
              {idleText && <span>{copiedText}</span>}
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              layout="position"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springs.micro}
              className="inline-flex items-center gap-1.5"
            >
              <CopyIcon size={effectiveIconSize} className="shrink-0" />
              {idleText && <span>{idleText}</span>}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

CopyButton.displayName = "CopyButton";
