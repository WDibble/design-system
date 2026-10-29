"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AtSignIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AtSignIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CIRCLE_VARIANTS: Variants = {
  normal: {
    y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  animate: {
    y: -1.5, scale: 1.04, transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

const PATH_VARIANTS: Variants = {
  normal: {
    y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  animate: {
    y: -1.5, scale: 1.04, transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

const AtSignIcon = forwardRef<AtSignIconHandle, AtSignIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
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
          <motion.circle
            animate={controls}
            cx="12"
            cy="12"
            r="4"
            variants={CIRCLE_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
            variants={PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

AtSignIcon.displayName = "AtSignIcon";

export { AtSignIcon };
