import * as React from "react";

export interface UseHoldToStepOptions {
  /** Callback fired on initial press and on every repeated tick */
  onStep: () => void;
  /** Disables the interaction */
  disabled?: boolean;
  /** Initial delay before continuous stepping starts (in ms). Default: 400 */
  initialDelay?: number;
  /** Initial tick interval when repeat begins (in ms). Default: 140 */
  startInterval?: number;
  /** Minimum tick interval at peak acceleration (in ms). Default: 35 */
  minInterval?: number;
  /** Multiplier applied to interval on each tick to accelerate (0.8 = fast, 0.95 = gentle). Default: 0.88 */
  accelerationRate?: number;
}

export function useHoldToStep({
  onStep,
  disabled = false,
  initialDelay = 400,
  startInterval = 140,
  minInterval = 35,
  accelerationRate = 0.88,
}: UseHoldToStepOptions) {
  const onStepRef = React.useRef(onStep);
  onStepRef.current = onStep;

  const disabledRef = React.useRef(disabled);
  disabledRef.current = disabled;

  const timerRef = React.useRef<number | null>(null);
  const intervalRef = React.useRef<number | null>(null);
  const currentIntervalRef = React.useRef(startInterval);
  const isHoldingRef = React.useRef(false);

  const cleanup = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current !== null) {
      window.clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    isHoldingRef.current = false;
    currentIntervalRef.current = startInterval;
  }, [startInterval]);

  // Clean up on unmount
  React.useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const scheduleNextTick = React.useCallback(() => {
    if (!isHoldingRef.current || disabledRef.current) return;

    intervalRef.current = window.setTimeout(() => {
      if (!isHoldingRef.current || disabledRef.current) return;

      onStepRef.current();

      // Accelerate cadence
      currentIntervalRef.current = Math.max(
        minInterval,
        currentIntervalRef.current * accelerationRate
      );

      scheduleNextTick();
    }, currentIntervalRef.current);
  }, [minInterval, accelerationRate]);

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      // Only respond to primary mouse button or touch
      if (e.button !== 0 || disabledRef.current) return;

      cleanup();
      isHoldingRef.current = true;

      // Law 1: Instant immediate action on pointerdown (Directive #1)
      onStepRef.current();

      // Window-level release listener ensures clean cancellation even if dragged outside
      const handleWindowPointerUp = () => {
        cleanup();
        window.removeEventListener("pointerup", handleWindowPointerUp);
        window.removeEventListener("pointercancel", handleWindowPointerUp);
      };

      window.addEventListener("pointerup", handleWindowPointerUp, { once: true });
      window.addEventListener("pointercancel", handleWindowPointerUp, { once: true });

      // Law 2: Dwell threshold before repeat begins
      timerRef.current = window.setTimeout(() => {
        if (!isHoldingRef.current || disabledRef.current) return;
        scheduleNextTick();
      }, initialDelay);
    },
    [cleanup, initialDelay, scheduleNextTick]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabledRef.current) return;
      if (e.key === "Enter" || e.key === " ") {
        if (!e.repeat) {
          onStepRef.current();
        }
      }
    },
    []
  );

  return {
    onPointerDown: handlePointerDown,
    onPointerLeave: cleanup,
    onKeyDown: handleKeyDown,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };
}
