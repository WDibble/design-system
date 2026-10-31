import * as React from "react";
import { cn } from "@/lib/utils";
import type {
  TimelineContextValue,
  TimelineConnectorVariant,
  TimelineConnectorStatus,
} from "./types";

export const TimelineContext = React.createContext<TimelineContextValue>({
  size: "default",
  connectorVariant: "solid",
  connectorStatus: "default",
});

export const useTimeline = () => React.useContext(TimelineContext);

export const getConnectorTrackClass = (
  variant: TimelineConnectorVariant,
  status: TimelineConnectorStatus = "default"
) => {
  if (variant === "none") return "";

  if (variant === "dashed") {
    return cn(
      "w-0 border-l border-dashed bg-transparent",
      status === "default" && "border-border/80",
      status === "primary" && "border-primary/60",
      status === "success" && "border-emerald-500/60",
      status === "warning" && "border-amber-500/60",
      status === "destructive" && "border-destructive/60"
    );
  }

  if (variant === "dotted") {
    return cn(
      "w-0 border-l border-dotted bg-transparent",
      status === "default" && "border-border/80",
      status === "primary" && "border-primary/60",
      status === "success" && "border-emerald-500/60",
      status === "warning" && "border-amber-500/60",
      status === "destructive" && "border-destructive/60"
    );
  }

  // solid, flow, pulse
  return cn(
    "w-px",
    status === "default" && "bg-border/80",
    status === "primary" && "bg-primary/60",
    status === "success" && "bg-emerald-500/60",
    status === "warning" && "bg-amber-500/60",
    status === "destructive" && "bg-destructive/60"
  );
};
