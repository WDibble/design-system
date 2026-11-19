"use client";

import * as React from "react";
import {
  ExpandIcon,
  MonitorCheckIcon,
  RotateCCWIcon,
  SmartphoneChargingIcon,
} from "@/components/icons";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/copy-button";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";

export type PreviewViewport = "mobile" | "tablet" | "desktop";

const VIEWPORT_MAX_WIDTH: Record<PreviewViewport, string> = {
  mobile: "max-w-[375px]",
  tablet: "max-w-[768px]",
  desktop: "max-w-full",
};

export interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Heading displayed above the preview control bar */
  title?: string;
  /** Concise summary describing what the fixture demonstrates */
  description?: string;
  /** Source code string revealed in Code view and copied via CopyButton */
  code: string;
  /** Language tag passed to CodeBlock when inspecting source */
  language?: string;
  /** Optional filename shown inside Code view */
  filename?: string;
  /** Initial view tab */
  defaultView?: "preview" | "code";
  /** Display 375px / 768px / 100% viewport switcher buttons */
  showViewportControls?: boolean;
  /** Display state reset button to remount interactive children */
  allowReset?: boolean;
  /** Live interactive component fixture */
  children: React.ReactNode;
}

export const ComponentPreview = React.forwardRef<HTMLDivElement, ComponentPreviewProps>(
  (
    {
      title,
      description,
      code,
      language = "tsx",
      filename,
      defaultView = "preview",
      showViewportControls = true,
      allowReset = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [view, setView] = React.useState<"preview" | "code">(defaultView);
    const [viewport, setViewport] = React.useState<PreviewViewport>("desktop");
    const [resetKey, setResetKey] = React.useState(0);

    const presetButtons: {
      id: PreviewViewport;
      label: string;
      icon: React.ReactNode;
    }[] = [
      {
        id: "mobile",
        label: "Mobile 375px viewport",
        icon: <SmartphoneChargingIcon size={14} aria-hidden="true" />,
      },
      {
        id: "tablet",
        label: "Tablet 768px viewport",
        icon: <ExpandIcon size={14} aria-hidden="true" />,
      },
      {
        id: "desktop",
        label: "Desktop 100% viewport",
        icon: <MonitorCheckIcon size={14} aria-hidden="true" />,
      },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full min-w-0 flex-col gap-2 rounded-2xl border border-border/70 bg-card/55 p-1.5 text-card-foreground shadow-xs",
          className
        )}
        {...props}
      >
        {/* Top Metadata & Controls Bar */}
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 px-2 py-1">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <SegmentedControl
              size="sm"
              value={view}
              onValueChange={(next) => setView(next as "preview" | "code")}
              aria-label="Preview display mode"
            >
              <SegmentedControlItem value="preview">Preview</SegmentedControlItem>
              <SegmentedControlItem value="code">Code</SegmentedControlItem>
            </SegmentedControl>

            {title && (
              <span className="text-xs font-medium tracking-tight text-foreground">{title}</span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {showViewportControls && view === "preview" && (
              <fieldset
                aria-label="Viewport preset width"
                className="m-0 flex items-center gap-0.5 rounded-lg border-0 bg-muted/60 p-0.5"
              >
                {presetButtons.map((preset) => {
                  const isActive = viewport === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-label={preset.label}
                      aria-pressed={isActive}
                      onClick={() => setViewport(preset.id)}
                      className={cn(
                        "inline-flex size-7 items-center justify-center rounded-md border border-transparent text-xs font-medium transition-[background-color,color,transform] duration-150 select-none active:scale-[0.97]",
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                        isActive
                          ? "bg-background text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {preset.icon}
                    </button>
                  );
                })}
              </fieldset>
            )}

            {allowReset && view === "preview" && (
              <button
                type="button"
                aria-label="Reset preview state"
                onClick={() => setResetKey((prev) => prev + 1)}
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-[background-color,color,transform] duration-150 select-none",
                  "hover:bg-muted hover:text-foreground active:scale-[0.97]",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                )}
              >
                <RotateCCWIcon size={14} aria-hidden="true" />
              </button>
            )}

            <CopyButton
              value={code}
              size="sm"
              variant="ghost"
              aria-label={title ? `Copy ${title} source code` : "Copy component source code"}
            />
          </div>
        </div>

        {/* Concentric Inner Stage or Embedded Code Viewer */}
        {view === "preview" ? (
          <div className="flex min-h-[180px] w-full items-center justify-center overflow-x-auto rounded-[10px] border border-border/50 bg-background/85 [background-image:radial-gradient(oklch(0.55_0_0_/_0.14)_1px,transparent_1px)] [background-size:16px_16px] p-6 sm:p-8">
            <div
              key={resetKey}
              data-viewport={viewport}
              className={cn(
                "flex w-full min-w-0 items-center justify-center transition-[max-width] duration-200 ease-out",
                VIEWPORT_MAX_WIDTH[viewport],
                viewport !== "desktop" &&
                  "rounded-lg border border-dashed border-border/80 bg-card/85 p-4 shadow-xs"
              )}
            >
              {children}
            </div>
          </div>
        ) : (
          <CodeBlock
            code={code}
            language={language}
            filename={filename}
            copyable={false}
            className="rounded-[10px] border-border/50 bg-background/90 shadow-none"
          />
        )}

        {description && (
          <p className="px-2 pb-1 text-xs leading-relaxed [text-wrap:pretty] text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    );
  }
);
ComponentPreview.displayName = "ComponentPreview";
