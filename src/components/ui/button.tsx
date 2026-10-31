"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";
import { LoaderCircleIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { springs } from "@/tokens/motion";

export const buttonVariants = cva(
  [
    "group relative inline-flex shrink-0 items-center justify-center rounded-lg font-medium whitespace-nowrap select-none",
    "border border-transparent", // Always present to guarantee zero border-width layout shift
    "transition-[background-color,border-color,color,box-shadow] duration-150 ease-out",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
    "disabled:pointer-events-none [&:disabled:not([aria-busy='true'])]:opacity-50", // Active async loading states retain full 100% opacity to prevent 50%->100% brightness strobe
    "[-webkit-tap-highlight-color:transparent]",
    "data-[popup-open]:bg-muted/70 data-[state=open]:bg-muted/70",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:border-border/60 hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-[oklch(0.51_0.245_27.325)] active:bg-destructive dark:hover:bg-[oklch(0.46_0.141_25.723)]",
        outline:
          "border-border/80 bg-card text-foreground shadow-xs [box-shadow:inset_0_1px_0_0_oklch(1_0_0_/_0.08)] hover:border-foreground/30 hover:bg-muted hover:text-foreground",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "h-auto border-transparent p-0 text-primary shadow-none",
        success:
          "border-success/35 bg-success/15 text-emerald-800 shadow-xs hover:border-success/50 hover:bg-success/20 active:bg-success/25 dark:text-emerald-200",
        warning:
          "border-warning/35 bg-warning/15 text-amber-900 shadow-xs hover:border-warning/50 hover:bg-warning/20 active:bg-warning/25 dark:text-amber-200",
        glass:
          "glass-regular specular-rim text-foreground shadow-xs hover:border-foreground/20 hover:bg-background/80 active:bg-background/90",
      },
      size: {
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs after:absolute after:-inset-2 [&_svg]:size-3 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-3 [&>div]:items-center [&>div]:justify-center",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs after:absolute after:-inset-1.5 [&_svg]:size-3.5 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-3.5 [&>div]:items-center [&>div]:justify-center",
        default:
          "h-9 gap-2 rounded-lg px-4 py-2 text-sm after:absolute after:inset-x-0 after:inset-y-[-4px] [&_svg]:size-4 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-4 [&>div]:items-center [&>div]:justify-center",
        lg: "h-10 gap-2.5 rounded-xl px-5 text-base after:absolute after:inset-x-0 after:inset-y-[-2px] [&_svg]:size-4.5 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-4.5 [&>div]:items-center [&>div]:justify-center",
        xl: "h-12 gap-3 rounded-2xl px-6 text-base [&_svg]:size-5 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-5 [&>div]:items-center [&>div]:justify-center",
        "icon-xs":
          "size-7 shrink-0 rounded-md p-0 after:absolute after:-inset-2 [&_svg]:size-3 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-3 [&>div]:items-center [&>div]:justify-center",
        "icon-sm":
          "size-8 shrink-0 rounded-md p-0 after:absolute after:-inset-1.5 [&_svg]:size-3.5 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-3.5 [&>div]:items-center [&>div]:justify-center",
        icon: "size-9 shrink-0 rounded-lg p-0 after:absolute after:-inset-1.5 [&_svg]:size-4 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-4 [&>div]:items-center [&>div]:justify-center",
        "icon-lg":
          "size-10 shrink-0 rounded-xl p-0 after:absolute after:-inset-1 [&_svg]:size-4.5 [&_svg]:shrink-0 [&>div]:flex [&>div]:size-4.5 [&>div]:items-center [&>div]:justify-center",
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
  extends
    Omit<HTMLMotionProps<"button">, "children" | "onClick">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  state?: ButtonState;
  isLoading?: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  successDuration?: number;
  errorDuration?: number;
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
  /**
   * Responsive helper to stretch the button to 100% width of its parent container.
   */
  fullWidth?: boolean;
  /**
   * Standard click handler. If an async function or Promise is returned, the button
   * automatically drives the 9-state kinetic feedback loop (Idle -> Loading -> Success -> Idle).
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
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
      state,
      isLoading = false,
      loadingText,
      successText = "Success",
      errorText = "Action Failed",
      successDuration = 1800,
      errorDuration = 2000,
      leftIcon,
      rightIcon,
      fluidMorph = false,
      iconTrigger = "hover",
      disableTapScale,
      fullWidth = false,
      children,
      disabled,
      type = "button",
      onClick,
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
    const [internalState, setInternalState] = React.useState<ButtonState>("idle");
    const isControlled = state !== undefined || isLoading;
    const activeState: ButtonState = isControlled
      ? isLoading
        ? "loading"
        : (state ?? "idle")
      : internalState;
    const isDisabled = disabled || activeState === "loading";
    const isSuccess = activeState === "success";
    const isError = activeState === "error";

    const isIconButton = size === "icon";
    const isLink = variant === "link";
    const hasStateTransitions =
      !isIconButton && !isLink && (activeState !== "idle" || isLoading || Boolean(loadingText));

    // Component-Unified Kinetic Affinity (Directive #10):
    // Icons inside buttons are intrinsic organs of the component.
    // Register all icon controllers (leftIcon, rightIcon, and any icon inside children)
    // so that hovering or pressing ANY PART of the button triggers the icon animation synchronously.
    const iconControllersRef = React.useRef<
      Set<{ startAnimation: () => void; stopAnimation: () => void }>
    >(new Set());

    // Clear the set on each render pass to prevent stale unmounted references
    iconControllersRef.current.clear();

    const triggerIcon = React.useCallback((action: "start" | "stop") => {
      const method = action === "start" ? "startAnimation" : "stopAnimation";
      iconControllersRef.current.forEach((controller) => {
        try {
          controller[method]?.();
        } catch {}
      });
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

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }

      const result = onClick?.(e);

      // Auto-drive 9-state kinetic narrative if onClick returns a Promise and state is uncontrolled
      if (!isControlled && result && typeof (result as any).then === "function") {
        setInternalState("loading");
        try {
          await result;
          setInternalState("success");
          setTimeout(() => {
            setInternalState("idle");
          }, successDuration);
        } catch {
          setInternalState("error");
          setTimeout(() => {
            setInternalState("idle");
          }, errorDuration);
        }
      }
    };

    // Determine the widest label to lock the ghost footprint
    const labels = [
      typeof children === "string" ? children : "",
      loadingText || "",
      successText || "",
      errorText || "",
    ];
    const widestLabel = labels.reduce((a, b) => (a.length >= b.length ? a : b), labels[0]);

    // Icon size inheritance and ref-binding scaled across all size variants
    const defaultIconSize =
      size === "xs" || size === "icon-xs"
        ? 12
        : size === "sm" || size === "icon-sm"
          ? 14
          : size === "lg" || size === "icon-lg"
            ? 18
            : size === "xl"
              ? 20
              : 16;

    // Recursive node enhancer: walks children and props to bind refs and inherit size
    const enhanceNode = React.useCallback(
      (node: React.ReactNode): React.ReactNode => {
        if (!node) return node;

        if (Array.isArray(node)) {
          return React.Children.map(node, (child) => enhanceNode(child));
        }

        if (!React.isValidElement(node)) {
          return node;
        }

        const nodeProps = node.props as any;
        const existingRef = (node as any).ref;

        // Recursively enhance child trees if present
        let mappedChildren = nodeProps.children;
        if (
          mappedChildren &&
          (typeof mappedChildren === "object" || Array.isArray(mappedChildren))
        ) {
          mappedChildren = enhanceNode(mappedChildren);
        }

        return React.cloneElement(node as React.ReactElement<any>, {
          ref: (instance: any) => {
            if (instance && typeof instance.startAnimation === "function") {
              iconControllersRef.current.add(instance);
            }
            if (typeof existingRef === "function") {
              existingRef(instance);
            } else if (existingRef && typeof existingRef === "object") {
              existingRef.current = instance;
            }
          },
          ...(nodeProps.size !== undefined || typeof node.type !== "string"
            ? { size: nodeProps.size ?? defaultIconSize }
            : {}),
          children: mappedChildren,
        });
      },
      [defaultIconSize]
    );

    const renderedLeftIcon = enhanceNode(leftIcon);
    const renderedRightIcon = enhanceNode(rightIcon);
    const renderedChildIcon = enhanceNode(children);

    // Physical yield on pointerdown (Directive #1): Interactive controls compress on touch/pointer down.
    const shouldTapScale = !isDisabled && !disableTapScale;

    // Concentric focus-ring radius mapped to variant curvature
    const radiusClass =
      size === "xs" || size === "sm" || size === "icon-xs" || size === "icon-sm"
        ? "rounded-md"
        : size === "lg" || size === "icon-lg"
          ? "rounded-xl"
          : size === "xl"
            ? "rounded-2xl"
            : "rounded-lg";

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={activeState === "loading" || undefined}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "group relative inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none select-none disabled:pointer-events-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
          radiusClass,
          (fullWidth || className?.includes("w-full")) && "w-full",
          className?.includes("flex-1") && "flex-1",
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
              variant: isSuccess ? "success" : isError ? "destructive" : variant,
              size,
              className,
            }),
            (fullWidth || className?.includes("w-full") || className?.includes("flex-1")) &&
              "w-full"
          )}
        >
          {hasStateTransitions ? (
            <>
              {/* 1. Ghost Footprint Sizer: Locks button width to the widest variant without container bleed */}
              <span
                className="pointer-events-none invisible inline-flex h-0 max-w-full items-center gap-2 truncate overflow-hidden opacity-0 select-none"
                aria-hidden="true"
              >
                <LoaderCircleIcon size={16} className="shrink-0" />
                <span className="truncate">{widestLabel}</span>
                <span className="size-4 shrink-0" />
              </span>

              {/* 2. Parallel Cohesive Stage: mode="popLayout" eliminates empty gaps by animating exiting and entering text in tandem */}
              <span className="absolute inset-0 flex items-center justify-center overflow-hidden px-4">
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
                        {loadingText || (typeof children === "string" ? children : "Processing...")}
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
                        className="flex shrink-0 items-center justify-center"
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
                  ) : activeState === "error" ? (
                    <motion.span
                      key="error-state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={springs.snappy}
                      className="inline-flex items-center gap-1.5"
                    >
                      <span>{errorText}</span>
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
                <span className="inline-flex shrink-0 items-center transition-transform duration-150 ease-out group-hover:scale-105">
                  {renderedLeftIcon}
                </span>
              )}
              {variant === "link" ? (
                <span className="relative inline-flex items-center after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.16,1,0.3,1)] after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                  {renderedChildIcon}
                </span>
              ) : (
                renderedChildIcon
              )}
              {renderedRightIcon && (
                <span className="inline-flex shrink-0 items-center transition-transform duration-150 ease-out group-hover:translate-x-0.5">
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
