"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. Sparkline (Ultra-clean inline mini trendline)
// ============================================================================

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  color?: string; // CSS variable or color string, default var(--color-chart-1)
  fill?: boolean;
  strokeWidth?: number;
  trend?: "up" | "down" | "neutral" | "auto";
}

export function Sparkline({
  data,
  width = 120,
  height = 36,
  className,
  color = "var(--color-chart-1)",
  fill = true,
  strokeWidth = 1.75,
  trend = "auto",
}: SparklineProps) {
  const id = React.useId();

  if (!data || data.length < 2) {
    return <div className={cn("inline-block", className)} style={{ width, height }} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const paddingY = 4;
  const usableHeight = height - paddingY * 2;

  // Auto-detect trend if requested
  const isUp = data[data.length - 1] >= data[0];
  const resolvedColor =
    trend === "up" || (trend === "auto" && isUp)
      ? "var(--color-chart-2, oklch(0.6 0.118 184.704))"
      : trend === "down"
      ? "var(--color-destructive, oklch(0.577 0.245 27.325))"
      : color;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  // Build SVG smooth path command
  const linePath = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    const prev = points[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx.toFixed(1)} ${prev.y.toFixed(1)}, ${cx.toFixed(1)} ${point.y.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }, "");

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible select-none shrink-0 inline-block", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sparkline-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={resolvedColor} stopOpacity={0.25} />
          <stop offset="100%" stopColor={resolvedColor} stopOpacity={0.0} />
        </linearGradient>
      </defs>

      {fill && (
        <path
          d={areaPath}
          fill={`url(#sparkline-grad-${id})`}
          className="transition-opacity duration-200"
        />
      )}

      <path
        d={linePath}
        fill="none"
        stroke={resolvedColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* End point dot */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={2.5}
        fill={resolvedColor}
        className="drop-shadow-xs"
      />
    </svg>
  );
}

// ============================================================================
// 2. Interactive Area Chart
// ============================================================================

export interface AreaChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface AreaChartProps {
  data: AreaChartDataPoint[];
  height?: number;
  className?: string;
  valueFormatter?: (val: number) => string;
  primaryColor?: string; // CSS var, default var(--color-chart-1)
  secondaryColor?: string; // CSS var, default var(--color-chart-2)
  showGrid?: boolean;
}

export function AreaChart({
  data,
  height = 180,
  className,
  valueFormatter = (v) => v.toLocaleString(),
  primaryColor = "var(--color-chart-1, oklch(0.646 0.222 41.116))",
  secondaryColor = "var(--color-chart-2, oklch(0.6 0.118 184.704))",
  showGrid = true,
}: AreaChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(500);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const id = React.useId();

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!data || data.length < 2) {
    return <div ref={containerRef} className={cn("w-full", className)} style={{ height }} />;
  }

  const values = data.map((d) => d.value);
  const secondaryValues = data.map((d) => d.secondaryValue ?? 0);
  const hasSecondary = data.some((d) => d.secondaryValue !== undefined);

  const allValues = [...values, ...(hasSecondary ? secondaryValues : [])];
  const maxVal = Math.max(...allValues) * 1.15;
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const paddingLeft = 36;
  const paddingRight = 16;
  const paddingTop = 20;
  const paddingBottom = 28;

  const usableWidth = Math.max(10, containerWidth - paddingLeft - paddingRight);
  const usableHeight = Math.max(10, height - paddingTop - paddingBottom);

  const getPoints = (series: number[]) => {
    return series.map((val, idx) => {
      const x = paddingLeft + (idx / (series.length - 1)) * usableWidth;
      const y = paddingTop + (1 - (val - minVal) / range) * usableHeight;
      return { x, y };
    });
  };

  const primaryPoints = getPoints(values);
  const secondaryPoints = hasSecondary ? getPoints(secondaryValues) : [];

  const buildSmoothPath = (pts: Array<{ x: number; y: number }>) => {
    return pts.reduce((acc, point, i) => {
      if (i === 0) return `M ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      const prev = pts[i - 1];
      const cx = (prev.x + point.x) / 2;
      return `${acc} C ${cx.toFixed(1)} ${prev.y.toFixed(1)}, ${cx.toFixed(1)} ${point.y.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    }, "");
  };

  const primaryLine = buildSmoothPath(primaryPoints);
  const primaryArea = `${primaryLine} L ${primaryPoints[primaryPoints.length - 1].x} ${paddingTop + usableHeight} L ${primaryPoints[0].x} ${paddingTop + usableHeight} Z`;

  const secondaryLine = hasSecondary ? buildSmoothPath(secondaryPoints) : "";
  const secondaryArea = hasSecondary
    ? `${secondaryLine} L ${secondaryPoints[secondaryPoints.length - 1].x} ${paddingTop + usableHeight} L ${secondaryPoints[0].x} ${paddingTop + usableHeight} Z`
    : "";

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - paddingLeft;
    const progress = Math.max(0, Math.min(1, x / usableWidth));
    const closestIdx = Math.round(progress * (data.length - 1));
    setHoverIndex(closestIdx);
  };

  const handlePointerLeave = () => {
    setHoverIndex(null);
  };

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;
  const activeX = hoverIndex !== null ? primaryPoints[hoverIndex].x : null;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full select-none font-sans", className)}
      style={{ height }}
    >
      <svg
        width="100%"
        height={height}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="overflow-visible cursor-crosshair"
      >
        <defs>
          <linearGradient id={`primary-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primaryColor} stopOpacity={0.28} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity={0.0} />
          </linearGradient>

          {hasSecondary && (
            <linearGradient id={`secondary-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.20} />
              <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.0} />
            </linearGradient>
          )}
        </defs>

        {/* Horizontal Grid Lines */}
        {showGrid && (
          <g className="text-border/40">
            {[0, 0.33, 0.66, 1].map((ratio) => {
              const y = paddingTop + ratio * usableHeight;
              const val = Math.round(maxVal - ratio * range);
              return (
                <g key={ratio}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={containerWidth - paddingRight}
                    y2={y}
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[10px] font-mono fill-muted-foreground tabular-nums select-none"
                  >
                    {valueFormatter(val)}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* Secondary Series */}
        {hasSecondary && (
          <g>
            <path d={secondaryArea} fill={`url(#secondary-grad-${id})`} />
            <path
              d={secondaryLine}
              fill="none"
              stroke={secondaryColor}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </g>
        )}

        {/* Primary Series Area & Line */}
        <path d={primaryArea} fill={`url(#primary-grad-${id})`} />
        <path
          d={primaryLine}
          fill="none"
          stroke={primaryColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* X Axis Labels */}
        <g>
          {data.map((d, i) => {
            // Show every Nth label to prevent squeeze
            const step = Math.ceil(data.length / 6);
            if (i % step !== 0 && i !== data.length - 1) return null;
            const x = primaryPoints[i].x;
            return (
              <text
                key={i}
                x={x}
                y={height - 8}
                textAnchor="middle"
                className="text-[10px] font-mono fill-muted-foreground select-none"
              >
                {d.label}
              </text>
            );
          })}
        </g>

        {/* Interactive Hover Crosshair */}
        {hoverIndex !== null && activeX !== null && (
          <g className="transition-opacity duration-150">
            {/* Vertical crosshair line */}
            <line
              x1={activeX}
              y1={paddingTop}
              x2={activeX}
              y2={paddingTop + usableHeight}
              stroke="var(--color-foreground)"
              strokeWidth={1}
              strokeDasharray="2 2"
              className="opacity-40"
            />

            {/* Primary active circle */}
            <circle
              cx={activeX}
              cy={primaryPoints[hoverIndex].y}
              r={4.5}
              fill="var(--color-card)"
              stroke={primaryColor}
              strokeWidth={2.5}
              className="drop-shadow-md"
            />

            {/* Secondary active circle */}
            {hasSecondary && (
              <circle
                cx={activeX}
                cy={secondaryPoints[hoverIndex].y}
                r={3.5}
                fill="var(--color-card)"
                stroke={secondaryColor}
                strokeWidth={2}
                className="drop-shadow-md"
              />
            )}
          </g>
        )}
      </svg>

      {/* Floating Interactive Tooltip Pill */}
      {hoverIndex !== null && activePoint && activeX !== null && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.12 }}
          style={{
            left: Math.min(Math.max(activeX, 90), containerWidth - 90),
            top: 2,
          }}
          className="absolute -translate-x-1/2 pointer-events-none z-20 px-2.5 py-1.5 rounded-lg border border-border/80 bg-popover text-popover-foreground shadow-lg glass-thick specular-rim text-xs"
        >
          <div className="flex items-center justify-between gap-3 text-[11px] mb-0.5">
            <span className="font-medium text-foreground">{activePoint.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="font-mono tabular-nums font-semibold text-xs text-foreground">
              {valueFormatter(activePoint.value)}
            </span>
            {activePoint.secondaryValue !== undefined && (
              <span className="font-mono tabular-nums text-[10px] text-muted-foreground ml-1">
                / {valueFormatter(activePoint.secondaryValue)}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// 3. Pill Bar Chart
// ============================================================================

export interface BarChartItem {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartItem[];
  height?: number;
  className?: string;
  valueFormatter?: (val: number) => string;
}

export function BarChart({
  data,
  height = 140,
  className,
  valueFormatter = (v) => v.toLocaleString(),
}: BarChartProps) {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value)) * 1.1 || 1;

  return (
    <div
      className={cn("w-full flex flex-col justify-end gap-2 select-none", className)}
      style={{ height }}
    >
      <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-2.5 pt-4">
        {data.map((item, idx) => {
          const heightPercent = Math.max(6, (item.value / max) * 100);
          const isHovered = hoveredIdx === idx;
          const barColor = item.color || "var(--color-chart-1)";

          return (
            <div
              key={idx}
              onPointerEnter={() => setHoveredIdx(idx)}
              onPointerLeave={() => setHoveredIdx(null)}
              className="flex-1 h-full flex flex-col items-center justify-end group relative cursor-pointer min-w-0"
            >
              {/* Tooltip callout */}
              {isHovered && (
                <div className="absolute -top-7 px-1.5 py-0.5 rounded-md bg-popover text-popover-foreground border border-border/80 shadow-md text-[10px] font-mono tabular-nums z-20 whitespace-nowrap">
                  {valueFormatter(item.value)}
                </div>
              )}

              {/* Bar pillar */}
              <div
                className={cn(
                  "w-full rounded-t-md transition-all duration-200 ease-out specular-rim",
                  isHovered ? "brightness-110 -translate-y-0.5 shadow-sm" : "opacity-90"
                )}
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: barColor,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Axis labels */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2.5 pt-1 border-t border-border/40">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 text-center font-mono tabular-nums text-[10px] text-muted-foreground truncate"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
