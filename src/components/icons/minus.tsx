"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";

export interface MinusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MinusIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MinusIcon = forwardRef<MinusIconHandle, MinusIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    useImperativeHandle(ref, () => ({
      startAnimation: () => {},
      stopAnimation: () => {},
    }));

    return (
      <div className={cn(className)} {...props}>
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 12h14" />
        </svg>
      </div>
    );
  }
);

MinusIcon.displayName = "MinusIcon";

export { MinusIcon };
