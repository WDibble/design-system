import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends React.ComponentProps<typeof BaseSlider.Root> {
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      disabled,
      showValue = false,
      valuePrefix = "",
      valueSuffix = "",
      ...props
    },
    ref
  ) => {
    return (
      <BaseSlider.Root
        ref={ref}
        disabled={disabled}
        className={cn("flex flex-col gap-2 w-full select-none", className)}
        {...props}
      >
        <div className="flex items-center justify-between text-xs font-medium">
          <BaseSlider.Label className="text-foreground font-medium select-none" />
          {showValue && (
            <span className="font-mono tabular-nums text-muted-foreground select-none">
              {valuePrefix}
              <BaseSlider.Value />
              {valueSuffix}
            </span>
          )}
        </div>

        <BaseSlider.Control className="relative flex items-center w-full h-5 touch-none cursor-pointer">
          <BaseSlider.Track className="relative h-1.5 w-full grow rounded-full bg-input overflow-hidden">
            <BaseSlider.Indicator className="absolute h-full bg-primary rounded-full" />
          </BaseSlider.Track>

          <BaseSlider.Thumb
            className={cn(
              "block size-4.5 rounded-full border border-border/80 bg-background shadow-xs",
              "transition-transform duration-100 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "hover:scale-105 active:scale-115",
              "disabled:pointer-events-none disabled:opacity-50",
              // 44px touch target expansion:
              "after:absolute after:-inset-3 after:content-['']"
            )}
          />
        </BaseSlider.Control>
      </BaseSlider.Root>
    );
  }
);

Slider.displayName = "Slider";
