import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";
import { LoaderCircleIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { springs } from "@/tokens/motion";

export const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium select-none shrink-0 overflow-hidden",
    "border border-transparent", // Always present to guarantee zero border-width layout shift
    "transition-[background-color,border-color,color,box-shadow] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none [&:disabled:not([aria-busy='true'])]:opacity-50", // Active async loading states retain full 100% opacity to prevent 50%->100% brightness strobe
    "[-webkit-tap-highlight-color:transparent]",
    "data-[state=open]:bg-muted/70 data-[popup-open]:bg-muted/70",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:opacity-90 active:opacity-100",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:opacity-90 active:opacity-100",
        outline:
          "border-border/80 bg-card text-foreground shadow-xs hover:bg-muted hover:text-foreground [box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08)]",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground",
        link:
          "border-transparent text-primary p-0 h-auto",
        success:
          "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 shadow-xs",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm gap-2",
        sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
        lg: "h-10 px-5 text-base gap-2.5 rounded-xl",
        icon: "size-9 p-0 rounded-lg shrink-0 after:absolute after:-inset-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonState = "idle" | "loading" | "success" | "error";
export type IconAnimationTrigger = "hover" | "press" | "both" | "none";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  state?: ButtonState;
  isLoading?: boolean;
  loadingText?: string;
  successText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fluidMorph?: boolean;
  iconTrigger?: IconAnimationTrigger;
  /**
   * When true, disables the tactile scale down on tap.
   * By default, buttons used as popup or menu triggers automatically suppress tap scaling
   * to guarantee the anchored surface has a zero-jitter, non-moving reference bounding box.
   */
  disableTapScale?: boolean;
}

// Extract layout classes (width, margins, flex bounds) for outer <button> wrapper
const extractLayoutClasses = (classNames?: string): string => {
  if (!classNames) return "";
  const layoutPatterns =
    /^(?:[a-z0-9_-]+:)?(?:w-|min-w-|max-w-|flex-|grow|shrink|self-|col-span-|row-span-|m-|mx-|my-|mt-|mb-|ml-|mr-|order-|hidden|block|inline-block)/;
  return classNames
    .split(/\s+/)
    .filter((cls) => layoutPatterns.test(cls))
    .join(" ");
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      state = "idle",
      isLoading = false,
      loadingText,
      successText = "Success",
      leftIcon,
      rightIcon,
      fluidMorph = false,
      iconTrigger = "hover",
      disableTapScale,
      children,
      disabled,
      type = "button",
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const activeState: ButtonState = isLoading ? "loading" : state;
    const isDisabled = disabled || activeState === "loading";
    const isSuccess = activeState === "success";

    const isIconButton = size === "icon";
    const isLink = variant === "link";
    const hasStateTransitions =
      !isIconButton &&
      !isLink &&
      (state !== "idle" || isLoading || Boolean(loadingText));

    // Imperative handles for animated icons
    const leftIconRef = React.useRef<{ startAnimation: () => void; stopAnimation: () => void } | null>(null);
    const rightIconRef = React.useRef<{ startAnimation: () => void; stopAnimation: () => void } | null>(null);
    const childIconRef = React.useRef<{ startAnimation: () => void; stopAnimation: () => void } | null>(null);

    const triggerIcon = React.useCallback((action: "start" | "stop") => {
      const method = action === "start" ? "startAnimation" : "stopAnimation";
      leftIconRef.current?.[method]?.();
      rightIconRef.current?.[method]?.();
      childIconRef.current?.[method]?.();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (iconTrigger === "hover" || iconTrigger === "both") {
        triggerIcon("start");
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (iconTrigger === "hover" || iconTrigger === "both") {
        triggerIcon("stop");
      }
      onMouseLeave?.(e);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (iconTrigger === "press" || iconTrigger === "both") {
        triggerIcon("start");
      }
      onPointerDown?.(e);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (iconTrigger === "press" || iconTrigger === "both") {
        triggerIcon("stop");
      }
      onPointerUp?.(e);
    };

    const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (iconTrigger === "press" || iconTrigger === "both") {
        triggerIcon("stop");
      }
      onPointerCancel?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (iconTrigger === "hover" || iconTrigger === "both") {
        triggerIcon("start");
      }
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (iconTrigger === "hover" || iconTrigger === "both") {
        triggerIcon("stop");
      }
      onBlur?.(e);
    };

    // Determine the widest label to lock the ghost footprint
    const labels = [
      typeof children === "string" ? children : "",
      loadingText || "",
      successText || "",
    ];
    const widestLabel = labels.reduce((a, b) => (a.length >= b.length ? a : b), labels[0]);

    // Icon size inheritance and ref-binding
    const defaultIconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

    const enhanceIcon = (
      icon: React.ReactNode,
      targetRef: React.MutableRefObject<{ startAnimation: () => void; stopAnimation: () => void } | null>
    ): React.ReactNode => {
      if (!React.isValidElement(icon)) return icon;
      const iconProps = icon.props as any;
      const existingRef = (icon as any).ref;

      return React.cloneElement(icon as React.ReactElement<any>, {
        ref: (node: any) => {
          targetRef.current = node;
          if (typeof existingRef === "function") {
            existingRef(node);
          } else if (existingRef && typeof existingRef === "object") {
            existingRef.current = node;
          }
        },
        size: iconProps.size ?? defaultIconSize,
        className: cn(
          "inline-flex items-center justify-center shrink-0 [&>svg]:size-full",
          iconProps.className
        ),
      });
    };

    const renderedLeftIcon = enhanceIcon(leftIcon, leftIconRef);
    const renderedRightIcon = enhanceIcon(rightIcon, rightIconRef);
    const renderedChildIcon = isIconButton ? enhanceIcon(children, childIconRef) : children;

    // Physical yield on pointerdown (Directive #1): Interactive controls compress on touch/pointer down.
    const shouldTapScale = !isDisabled && !disableTapScale;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={activeState === "loading" || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "group relative inline-flex items-center justify-center p-0 border-0 bg-transparent outline-none cursor-pointer disabled:pointer-events-none select-none shrink-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          size === "sm" ? "rounded-md" : size === "lg" ? "rounded-xl" : "rounded-lg",
          extractLayoutClasses(className)
        )}
        {...(props as any)}
      >
        <motion.span
          whileTap={shouldTapScale ? { scale: 0.975 } : undefined}
          layout={fluidMorph ? true : undefined}
          transition={springs.tactile}
          className={cn(
            buttonVariants({
              variant: isSuccess ? "success" : variant,
              size,
              className,
            }),
            (className?.includes("w-full") || className?.includes("flex-1")) && "w-full"
          )}
        >
          {hasStateTransitions ? (
          <>
            {/* 1. Ghost Footprint Sizer: Locks button width to the widest variant without container bleed */}
            <span
              className="invisible pointer-events-none select-none h-0 max-w-full overflow-hidden inline-flex items-center gap-2 opacity-0 truncate"
              aria-hidden="true"
            >
              <LoaderCircleIcon size={16} className="shrink-0" />
              <span className="truncate">{widestLabel}</span>
              <span className="size-4 shrink-0" />
            </span>

            {/* 2. Parallel Cohesive Stage: mode="popLayout" eliminates empty gaps by animating exiting and entering text in tandem */}
            <span className="absolute inset-0 flex items-center justify-center px-4 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                {activeState === "loading" ? (
                  <motion.span
                    key="loading-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={springs.snappy}
                    className="inline-flex items-center gap-2 text-current"
                  >
                    <LoaderCircleIcon
                      size={16}
                      className="shrink-0 text-current"
                      ref={(node) => {
                        node?.startAnimation?.();
                      }}
                    />
                    <span>
                      {loadingText ||
                        (typeof children === "string" ? children : "Processing...")}
                    </span>
                  </motion.span>
                ) : activeState === "success" ? (
                  <motion.span
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={springs.snappy}
                    className="inline-flex items-center gap-1.5"
                  >
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={springs.tactile}
                      className="shrink-0 flex items-center justify-center"
                    >
                      <CheckIcon
                        size={16}
                        ref={(node) => {
                          node?.startAnimation?.();
                        }}
                      />
                    </motion.span>
                    <span>{successText}</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={springs.snappy}
                    className="inline-flex items-center gap-2"
                  >
                    {renderedLeftIcon && (
                      <span className="shrink-0 transition-transform duration-150 ease-out group-hover:scale-105">
                        {renderedLeftIcon}
                      </span>
                    )}
                    {children}
                    {renderedRightIcon && (
                      <span className="shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5">
                        {renderedRightIcon}
                      </span>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </>
        ) : (
          /* Standard direct render for non-async buttons */
          <>
            {renderedLeftIcon && (
              <span className="shrink-0 transition-transform duration-150 ease-out group-hover:scale-105 inline-flex items-center">
                {renderedLeftIcon}
              </span>
            )}
            {variant === "link" ? (
              <span className="relative inline-flex items-center after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:bg-current after:origin-left after:scale-x-0 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.16,1,0.3,1)]">
                {children}
              </span>
            ) : (
              renderedChildIcon
            )}
            {renderedRightIcon && (
              <span className="shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5 inline-flex items-center">
                {renderedRightIcon}
              </span>
            )}
          </>
        )}
        </motion.span>
      </button>
    );
  }
);

Button.displayName = "Button";
