"use client";

import * as React from "react";
import { GripVerticalIcon, GripHorizontalIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface ResizablePanelGroupContextValue {
  direction: "horizontal" | "vertical";
  panelSizes: number[];
  setPanelSizes: React.Dispatch<React.SetStateAction<number[]>>;
  registerPanel: (id: string, initialSize: number) => void;
  unregisterPanel: (id: string) => void;
  startDragging: (handleIndex: number, startPos: number) => void;
  isDragging: boolean;
  activeHandleIndex: number | null;
}

const ResizablePanelGroupContext = React.createContext<ResizablePanelGroupContextValue | null>(null);

export interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  defaultSizes?: number[]; // Percentage e.g. [30, 70]
  onLayout?: (sizes: number[]) => void;
}

export function ResizablePanelGroup({
  direction = "horizontal",
  defaultSizes = [50, 50],
  onLayout,
  className,
  children,
  ...props
}: ResizablePanelGroupProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [panelSizes, setPanelSizes] = React.useState<number[]>(defaultSizes);
  const [activeHandleIndex, setActiveHandleIndex] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const startDragPosRef = React.useRef<number>(0);
  const startSizesRef = React.useRef<number[]>([]);

  const startDragging = React.useCallback(
    (handleIndex: number, startPos: number) => {
      setActiveHandleIndex(handleIndex);
      setIsDragging(true);
      startDragPosRef.current = startPos;
      startSizesRef.current = [...panelSizes];
      document.body.style.userSelect = "none";
      document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize";
    },
    [direction, panelSizes]
  );

  React.useEffect(() => {
    if (!isDragging || activeHandleIndex === null) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalDimension = direction === "horizontal" ? rect.width : rect.height;
      if (totalDimension <= 0) return;

      const currentPos = direction === "horizontal" ? e.clientX : e.clientY;
      const deltaPx = currentPos - startDragPosRef.current;
      const deltaPercent = (deltaPx / totalDimension) * 100;

      const leftIdx = activeHandleIndex;
      const rightIdx = activeHandleIndex + 1;

      const initialLeft = startSizesRef.current[leftIdx];
      const initialRight = startSizesRef.current[rightIdx];

      const minPercent = 15; // Anti-crush minimum size
      const maxPercent = initialLeft + initialRight - minPercent;

      let newLeft = Math.max(minPercent, Math.min(maxPercent, initialLeft + deltaPercent));
      let newRight = initialLeft + initialRight - newLeft;

      setPanelSizes((prev) => {
        const next = [...prev];
        next[leftIdx] = +newLeft.toFixed(2);
        next[rightIdx] = +newRight.toFixed(2);
        onLayout?.(next);
        return next;
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setActiveHandleIndex(null);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, activeHandleIndex, direction, onLayout]);

  const contextValue = React.useMemo<ResizablePanelGroupContextValue>(
    () => ({
      direction,
      panelSizes,
      setPanelSizes,
      registerPanel: () => {},
      unregisterPanel: () => {},
      startDragging,
      isDragging,
      activeHandleIndex,
    }),
    [direction, panelSizes, startDragging, isDragging, activeHandleIndex]
  );

  let panelCount = 0;
  let handleCount = 0;

  const mappedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === ResizablePanel) {
      const order = (child.props as ResizablePanelProps).order ?? panelCount++;
      return React.cloneElement(child, { order } as React.Attributes & ResizablePanelProps);
    }
    if (child.type === ResizableHandle) {
      const hIndex = (child.props as ResizableHandleProps).handleIndex ?? handleCount++;
      return React.cloneElement(child, { handleIndex: hIndex } as React.Attributes & ResizableHandleProps);
    }
    return child;
  });

  return (
    <ResizablePanelGroupContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn(
          "flex h-full w-full overflow-hidden rounded-xl border border-border/80 bg-card select-none",
          direction === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        {mappedChildren}
      </div>
    </ResizablePanelGroupContext.Provider>
  );
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number;
  minSize?: number;
  order?: number;
}

export function ResizablePanel({
  defaultSize,
  minSize = 15,
  order = 0,
  className,
  children,
  style,
  ...props
}: ResizablePanelProps) {
  const context = React.useContext(ResizablePanelGroupContext);
  if (!context) {
    throw new Error("ResizablePanel must be used within a ResizablePanelGroup");
  }

  const isLast = order === context.panelSizes.length - 1;
  const size = context.panelSizes[order] ?? defaultSize ?? 50;

  return (
    <div
      style={{
        flexBasis: `${size}%`,
        flexGrow: isLast ? 1 : 0,
        flexShrink: 0,
        ...style,
      }}
      className={cn("min-w-0 min-h-0 overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  handleIndex?: number;
  withHandle?: boolean;
}

export function ResizableHandle({
  handleIndex = 0,
  withHandle = true,
  className,
  ...props
}: ResizableHandleProps) {
  const context = React.useContext(ResizablePanelGroupContext);
  if (!context) {
    throw new Error("ResizableHandle must be used within a ResizablePanelGroup");
  }

  const { direction, startDragging, isDragging, activeHandleIndex, setPanelSizes } = context;
  const isThisHandleActive = isDragging && activeHandleIndex === handleIndex;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pos = direction === "horizontal" ? e.clientX : e.clientY;
    startDragging(handleIndex, pos);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 5 : 1;
    let delta = 0;

    if (direction === "horizontal") {
      if (e.key === "ArrowLeft") delta = -step;
      else if (e.key === "ArrowRight") delta = step;
    } else {
      if (e.key === "ArrowUp") delta = -step;
      else if (e.key === "ArrowDown") delta = step;
    }

    if (delta !== 0) {
      e.preventDefault();
      setPanelSizes((prev) => {
        const next = [...prev];
        const leftIdx = handleIndex;
        const rightIdx = handleIndex + 1;
        const newLeft = Math.max(15, Math.min(85, next[leftIdx] + delta));
        const newRight = next[leftIdx] + next[rightIdx] - newLeft;
        next[leftIdx] = +newLeft.toFixed(2);
        next[rightIdx] = +newRight.toFixed(2);
        return next;
      });
    }
  };

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={direction}
      aria-label="Resize panel divider"
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex items-center justify-center transition-colors select-none shrink-0",
        direction === "horizontal"
          ? "w-2.5 -mx-1 hover:w-2.5 cursor-col-resize z-10"
          : "h-2.5 -my-1 hover:h-2.5 cursor-row-resize z-10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        className
      )}
      {...props}
    >
      {/* Visual divider line */}
      <div
        className={cn(
          "transition-all duration-150 ease-out",
          direction === "horizontal"
            ? "h-full w-px bg-border/80 group-hover:bg-primary group-hover:w-0.5"
            : "w-full h-px bg-border/80 group-hover:bg-primary group-hover:h-0.5",
          isThisHandleActive && "bg-primary w-0.5"
        )}
      />

      {/* Grip pill affordance */}
      {withHandle && (
        <div
          className={cn(
            "z-20 flex items-center justify-center rounded-sm border border-border/80 bg-muted text-muted-foreground shadow-xs transition-transform duration-150 specular-rim",
            direction === "horizontal" ? "h-6 w-3.5" : "h-3.5 w-6",
            isThisHandleActive ? "scale-110 bg-primary text-primary-foreground border-primary" : "hover:scale-105"
          )}
        >
          {direction === "horizontal" ? (
            <GripVerticalIcon size={10} className="pointer-events-none" />
          ) : (
            <GripHorizontalIcon size={10} className="pointer-events-none" />
          )}
        </div>
      )}
    </div>
  );
}
