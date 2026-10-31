import * as React from "react";
import { ToolbarButton } from "@/components/ui/toolbar";

/**
 * Specialised action button that intercepts pointerdown and mousedown to prevent
 * the button click from blurring the textarea or dismissing mobile virtual keyboards.
 */
export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ToolbarButton>
>(({ onMouseDown, ...props }, ref) => (
  <ToolbarButton
    ref={ref}
    onMouseDown={(e) => {
      e.preventDefault();
      onMouseDown?.(e);
    }}
    {...props}
  />
));
ActionButton.displayName = "ActionButton";
