export type TimelineSize = "sm" | "default" | "lg";
export type TimelineConnectorVariant = "solid" | "dashed" | "dotted" | "flow" | "pulse" | "none";
export type TimelineConnectorStatus = "default" | "primary" | "success" | "warning" | "destructive";

export interface TimelineContextValue {
  size: TimelineSize;
  connectorVariant: TimelineConnectorVariant;
  connectorStatus: TimelineConnectorStatus;
}
