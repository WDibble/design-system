import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useHoldToStep } from "@/hooks/use-hold-to-step";

describe("useHoldToStep Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("fires initial step immediately on pointer down", () => {
    const onStep = vi.fn();
    const { result } = renderHook(() => useHoldToStep({ onStep }));

    act(() => {
      result.current.onPointerDown({
        button: 0,
        preventDefault: () => {},
      } as unknown as React.PointerEvent);
    });

    expect(onStep).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.onPointerLeave();
    });
  });

  it("does not fire when disabled", () => {
    const onStep = vi.fn();
    const { result } = renderHook(() => useHoldToStep({ onStep, disabled: true }));

    act(() => {
      result.current.onPointerDown({
        button: 0,
        preventDefault: () => {},
      } as unknown as React.PointerEvent);
    });

    expect(onStep).not.toHaveBeenCalled();
  });
});
