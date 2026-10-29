"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface GeorgianLariIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GeorgianLariIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LARI_MAIN_VARIANTS: Variants = {
  normal: {
    y: 0, transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  animate: {
    y: -1.5, transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

const LARI_SECONDARY_VARIANTS: Variants = {
  normal: {
    y: 0, transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  animate: {
    y: -1.5, transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

const GeorgianLariIcon = forwardRef<
  GeorgianLariIconHandle,
  GeorgianLariIconProps
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
          d="M11.5 21a7.5 7.5 0 1 1 7.35-9"
          initial="normal"
          variants={LARI_MAIN_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M4 21h16"
          initial="normal"
          variants={LARI_MAIN_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M9 12V3"
          initial="normal"
          variants={LARI_SECONDARY_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M13 12V3"
          initial="normal"
          variants={LARI_SECONDARY_VARIANTS}
        />
      </svg>
    </div>
  );
});

GeorgianLariIcon.displayName = "GeorgianLariIcon";

export { GeorgianLariIcon };
