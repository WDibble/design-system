import * as React from "react";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ToastProvider, useToast } from "@/components/ui/toast";

describe("useToast Hook", () => {
  it("enqueues toasts and assigns unique identifiers", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );

    const { result } = renderHook(() => useToast(), { wrapper });

    let toastId = "";
    act(() => {
      toastId = result.current.toast({
        title: "Deployment Finished",
        type: "success",
      });
    });

    expect(toastId).toBeDefined();
    expect(result.current.toasts.some((t) => t.id === toastId)).toBe(true);
  });
});
