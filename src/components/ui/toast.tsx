"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { XIcon, RotateCcwIcon, CheckCircle2Icon, AlertCircleIcon } from "lucide-react";
import { Button } from "./button";
import { springs } from "@/tokens/motion";
import { cn } from "@/lib/utils";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  type?: "default" | "success" | "error";
  duration?: number;
  undoAction?: () => void;
  undoLabel?: string;
}

interface ToastContextValue {
  toasts: ToastData[];
  toast: (data: Omit<ToastData, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (data: Omit<ToastData, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastData = {
        ...data,
        id,
        duration: data.duration ?? 5000,
      };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, newToast.duration);
      }

      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {/* Toast viewport placed safely above home indicator / navigation bar */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-0 bottom-0 z-50 flex w-full max-w-sm flex-col gap-2.5 p-4 pb-[env(safe-area-inset-bottom,20px)] sm:p-6"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              role="status"
              layout
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={springs.snappy}
              className={cn(
                "glass-regular specular-rim pointer-events-auto flex items-start gap-3 rounded-2xl p-3.5 text-xs text-foreground shadow-xl select-none",
                "border border-border/70"
              )}
            >
              {t.type === "success" && (
                <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              )}
              {t.type === "error" && (
                <AlertCircleIcon className="mt-0.5 size-4 shrink-0 text-rose-500" />
              )}

              <div className="min-w-0 flex-1">
                <p className="leading-snug font-semibold tracking-tight text-foreground">
                  {t.title}
                </p>
                {t.description && (
                  <p className="mt-0.5 truncate leading-relaxed text-muted-foreground">
                    {t.description}
                  </p>
                )}
              </div>

              {t.undoAction && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => {
                    t.undoAction?.();
                    dismiss(t.id);
                  }}
                  className="h-7 shrink-0 gap-1 rounded-lg px-2.5 text-xs font-semibold"
                >
                  <RotateCcwIcon size={12} />
                  <span>{t.undoLabel || "Undo"}</span>
                </Button>
              )}

              <Button
                size="icon"
                variant="ghost"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="size-7 shrink-0 rounded-lg text-muted-foreground after:-inset-2 hover:text-foreground"
              >
                <XIcon size={14} />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
