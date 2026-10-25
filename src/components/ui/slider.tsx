import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<React.ComponentProps<typeof BaseSlider.Root>, "value" | "defaultValue"> {
  value?: number | number[];
  defaultValue?: number | number[];
  label?: React.ReactNode;
  showValue?: boolean;
  showTooltip?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      disabled,
      label,
      showValue = false,
      showTooltip = true,
      valuePrefix = "",
      valueSuffix = "",
      value,
      defaultValue,
      min = 0,
      max = 100,
      thumbAlignment = "edge",
      ...props
    },
    ref
  ) => {
    const _values = React.useMemo(() => {
      if (value !== undefined) {
        return Array.isArray(value) ? value : [value];
      }
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [min];
    }, [value, defaultValue, min]);

    return (
      <BaseSlider.Root
        ref={ref}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        thumbAlignment={thumbAlignment}
        className={cn(
          "group/slider flex flex-col gap-2 w-full select-none",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs font-medium">
            {label ? (
              typeof label === "string" ? (
                <BaseSlider.Label className="text-foreground font-medium select-none">
                  {label}
                </BaseSlider.Label>
              ) : (
                label
              )
            ) : (
              <BaseSlider.Label className="text-foreground font-medium select-none" />
            )}
            {showValue && (
              <span className="font-mono tabular-nums text-muted-foreground select-none">
                <BaseSlider.Value>
                  {(formattedValues) => (
                    <span>
                      {valuePrefix}
                      {formattedValues.join(" - ")}
                      {valueSuffix}
                    </span>
                  )}
                </BaseSlider.Value>
              </span>
            )}
          </div>
        )}

        <BaseSlider.Control className="group/control relative flex items-center w-full py-3 touch-none cursor-pointer select-none">
          {/* Static track with constant geometric height to guarantee zero layout shift on surrounding elements */}
          <BaseSlider.Track
            className={cn(
              "relative grow select-none rounded-full h-1.5",
              "before:absolute before:inset-0 before:rounded-full before:bg-muted/80 dark:before:bg-muted/40",
              "before:[box-shadow:inset_0_1px_1px_rgba(0,0,0,0.12)]"
            )}
          >
            {/* Active range indicator with smooth spring glide on click / preset change, and zero lag when dragging */}
            <BaseSlider.Indicator
              className={cn(
                "select-none rounded-full bg-primary",
                "bg-gradient-to-r from-primary/90 to-primary",
                "shadow-xs",
                // Smooth glide when clicking track or preset buttons:
                "[transition:width_300ms_cubic-bezier(0.16,1,0.3,1),inset-inline-start_300ms_cubic-bezier(0.16,1,0.3,1),left_300ms_cubic-bezier(0.16,1,0.3,1),bottom_300ms_cubic-bezier(0.16,1,0.3,1),height_300ms_cubic-bezier(0.16,1,0.3,1)]",
                // 1:1 direct manipulation when actively scrubbing with pointer/finger:
                "group-data-[dragging]/slider:[transition:none]"
              )}
            />

            {/* Thumbs with Apple HIG fluid spring physics and dynamic value pill */}
            {Array.from({ length: _values.length }, (_, index) => (
              <BaseSlider.Thumb
                key={index}
                index={index}
                className={cn(
                  "group/thumb block size-5 shrink-0 select-none rounded-full border border-border/80 bg-background",
                  "shadow-md outline-none",
                  // Smooth glide on position changes (click on track or preset button):
                  "[transition:inset-inline-start_300ms_cubic-bezier(0.16,1,0.3,1),left_300ms_cubic-bezier(0.16,1,0.3,1),bottom_300ms_cubic-bezier(0.16,1,0.3,1),transform_150ms_ease-out,box-shadow_150ms_ease-out,border-color_150ms_ease-out]",
                  // When actively dragging, eliminate position transition for instant pointer tracking:
                  "data-[dragging]:[transition:transform_150ms_ease-out,box-shadow_150ms_ease-out,border-color_150ms_ease-out]",
                  "hover:scale-115 hover:border-foreground/30",
                  "data-[dragging]:scale-125 data-[dragging]:shadow-lg data-[dragging]:border-primary",
                  // Refined focus ring without loud offset:
                  "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                  // 44px accessible touch target expansion:
                  "after:absolute after:-inset-3 after:content-['']",
                  "cursor-grab active:cursor-grabbing flex items-center justify-center"
                )}
              >
                {/* Center tactile pip */}
                <div
                  className={cn(
                    "size-1.5 rounded-full bg-muted-foreground/30",
                    "transition-colors duration-150 pointer-events-none",
                    "group-hover/thumb:bg-primary/70",
                    "group-data-[dragging]/slider:bg-primary"
                  )}
                />

                {/* Animated floating value bubble */}
                {showTooltip && (
                  <div
                    className={cn(
                      "absolute -top-8.5 left-1/2 -translate-x-1/2 pointer-events-none select-none z-30",
                      "flex items-center justify-center rounded-md bg-foreground text-background px-1.5 py-0.5",
                      "text-[10px] font-semibold font-mono tabular-nums shadow-md whitespace-nowrap",
                      // Apple HIG fluid transition:
                      "transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      // Resting state: tucked away
                      "opacity-0 scale-75 translate-y-1",
                      // Visible on thumb hover, thumb focus, or while scrubbing:
                      "group-hover/thumb:opacity-100 group-hover/thumb:scale-100 group-hover/thumb:translate-y-0",
                      "group-focus-visible/thumb:opacity-100 group-focus-visible/thumb:scale-100 group-focus-visible/thumb:translate-y-0",
                      "group-data-[dragging]/slider:opacity-100 group-data-[dragging]/slider:scale-100 group-data-[dragging]/slider:translate-y-0",
                      // Downward caret:
                      "after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[3.5px] after:border-transparent after:border-t-foreground"
                    )}
                  >
                    <BaseSlider.Value>
                      {(formattedValues) => (
                        <span>
                          {valuePrefix}
                          {formattedValues[index] ?? formattedValues[0]}
                          {valueSuffix}
                        </span>
                      )}
                    </BaseSlider.Value>
                  </div>
                )}
              </BaseSlider.Thumb>
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
    );
  }
);

Slider.displayName = "Slider";
