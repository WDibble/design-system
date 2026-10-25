import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { springs } from "@/tokens/motion";

interface DigitColumnProps {
  digit: number;
}

function DigitColumn({ digit }: DigitColumnProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className="relative inline-flex h-[1em] w-[0.6em] overflow-hidden leading-none select-none">
      <motion.span
        className="flex flex-col items-center"
        initial={false}
        animate={{ y: `-${digit}em` }}
        transition={shouldReduceMotion ? { duration: 0 } : springs.snappy}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            className="flex h-[1em] w-full shrink-0 items-center justify-center leading-none"
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export interface NumberTickerProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
}

export function NumberTicker({
  value,
  decimalPlaces = 2,
  prefix = "",
  suffix = "",
  className,
  ...props
}: NumberTickerProps) {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // Split into integer and fractional parts
  const formatted = absValue.toFixed(decimalPlaces);
  const [intPart, decPart] = formatted.split(".");

  // Format integer with commas for readability
  const formattedInt = Number(intPart).toLocaleString();
  const fullStr = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;

  return (
    <span
      className={cn(
        "inline-flex items-center tabular-nums font-mono tracking-tight select-none",
        className
      )}
      {...props}
    >
      {prefix && <span className="mr-0.5">{prefix}</span>}
      {isNegative && <span className="mr-0.5">-</span>}

      {/* Render each character: digits roll, punctuation stays stationary */}
      <span className="inline-flex items-baseline">
        {fullStr.split("").map((char, idx) => {
          if (/\d/.test(char)) {
            const digit = parseInt(char, 10);
            // Right-aligned position key for digit stability
            const keyFromRight = fullStr.length - 1 - idx;
            return <DigitColumn key={`digit-${keyFromRight}`} digit={digit} />;
          }

          return (
            <span key={`punct-${idx}`} className="px-[0.05em]">
              {char}
            </span>
          );
        })}
      </span>

      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}
