"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface PoundSterlingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PoundSterlingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const POUND_MAIN_VARIANTS: Variants = {
  normal: {
    y: 0, transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  animate: {
    y: -1.5, transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

const POUND_SECONDARY_VARIANTS: Variants = {
  normal: {
    y: 0, transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  animate: {
    y: -1.5, transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

const PoundSterlingIcon = forwardRef<
  PoundSterlingIconHandle,
  PoundSterlingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        <motion.path
          animate={controls}
          d="M18 7c0-5.333-8-5.333-8 0"
          initial="normal"
          variants={POUND_MAIN_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M10 7v14"
          initial="normal"
          variants={POUND_MAIN_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M18 21h-12"
          initial="normal"
          variants={POUND_SECONDARY_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M16 13h-10"
          initial="normal"
          variants={POUND_SECONDARY_VARIANTS}
        />
      </svg>
    </div>
  );
});

PoundSterlingIcon.displayName = "PoundSterlingIcon";

export { PoundSterlingIcon };
