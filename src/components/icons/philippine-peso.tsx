"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface PhilippinePesoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PhilippinePesoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PESO_MAIN_VARIANTS: Variants = {
  normal: {
    y: 0, transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  animate: {
    y: -1.5, transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

const PESO_SECONDARY_VARIANTS: Variants = {
  normal: {
    y: 0, transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  animate: {
    y: -1.5, transition: { type: "spring" as const, stiffness: 500, damping: 25 },
  },
};

const PhilippinePesoIcon = forwardRef<
  PhilippinePesoIconHandle,
  PhilippinePesoIconProps
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
          d="M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7"
          initial="normal"
          variants={PESO_MAIN_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M20 7H4"
          initial="normal"
          variants={PESO_SECONDARY_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M20 11H4"
          initial="normal"
          variants={PESO_SECONDARY_VARIANTS}
        />
      </svg>
    </div>
  );
});

PhilippinePesoIcon.displayName = "PhilippinePesoIcon";

export { PhilippinePesoIcon };
