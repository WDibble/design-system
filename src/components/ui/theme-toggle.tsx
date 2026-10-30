"use client";

import * as React from "react";
import { SunIcon, MoonIcon } from "@/components/icons";
import { Button, type ButtonProps } from "@/components/ui/button";
import { disableTransitionsTemporarily } from "@/lib/theme";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps extends Omit<ButtonProps, "children" | "onClick"> {
  /**
   * Controlled dark state. If omitted, ThemeToggle automatically manages
   * state and synchronises with localStorage and document.documentElement.classList.
   */
  isDark?: boolean;
  /**
   * Callback fired when theme changes.
   */
  onToggleDark?: (nextDark: boolean) => void;
  /**
   * Whether to display text label alongside icon.
   * @default false
   */
  showLabel?: boolean;
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  (
    {
      isDark: controlledDark,
      onToggleDark,
      showLabel = false,
      variant = "outline",
      size = "icon",
      className,
      ...props
    },
    ref
  ) => {
    const [internalDark, setInternalDark] = React.useState<boolean>(() => {
      if (typeof window === "undefined") return false;
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return document.documentElement.classList.contains("dark");
    });

    const isControlled = controlledDark !== undefined;
    const isDark = isControlled ? controlledDark : internalDark;

    const handleToggle = () => {
      const restore = disableTransitionsTemporarily();
      const nextDark = !isDark;

      if (!isControlled) {
        setInternalDark(nextDark);
        if (nextDark) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }

      onToggleDark?.(nextDark);
      restore();
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        size={showLabel && size === "icon" ? "default" : size}
        iconTrigger="press"
        onClick={handleToggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(showLabel && "gap-2", className)}
        {...props}
      >
        {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        {showLabel && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
      </Button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
