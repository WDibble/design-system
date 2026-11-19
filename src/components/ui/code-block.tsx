"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";

export interface CodeBlockTab {
  /** Unique identifier for the tab */
  id: string;
  /** Visible tab label shown inside the header segmented switcher */
  label: string;
  /** Optional language tag displayed next to line metrics */
  language?: string;
  /** Source code string rendered inside the viewport */
  code: string;
  /** 1-indexed line numbers to emphasise inside the code viewport */
  highlightLines?: number[];
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Single-snippet code content (ignored when tabs are supplied) */
  code?: string;
  /** Language badge string for single-snippet mode */
  language?: string;
  /** Optional filename or path label shown in the header bar */
  filename?: string;
  /** 1-indexed line numbers to emphasise in single-snippet mode */
  highlightLines?: number[];
  /** Multi-tab snippet definitions rendered via SegmentedControl */
  tabs?: CodeBlockTab[];
  /** Uncontrolled initial tab ID when tabs are supplied */
  defaultTab?: string;
  /** Controlled active tab ID when tabs are supplied */
  value?: string;
  /** Callback fired when active tab changes */
  onValueChange?: (tabId: string) => void;
  /** Display tabular line numbers in a non-selectable gutter */
  showLineNumbers?: boolean;
  /** Display clipboard CopyButton in the header bar */
  copyable?: boolean;
  /** Optional CSS max-height constraint on the scrollable code viewport */
  maxHeight?: string;
  /** Optional caption rendered below the concentric code frame */
  caption?: string;
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code = "",
      language = "tsx",
      filename,
      highlightLines,
      tabs,
      defaultTab,
      value,
      onValueChange,
      showLineNumbers = true,
      copyable = true,
      maxHeight,
      caption,
      className,
      ...props
    },
    ref
  ) => {
    const hasTabs = Boolean(tabs && tabs.length > 0);
    const initialTab = defaultTab ?? tabs?.[0]?.id ?? "";
    const [internalTab, setInternalTab] = React.useState(initialTab);
    const activeTabId = value !== undefined ? value : internalTab;

    const handleTabChange = React.useCallback(
      (nextId: string) => {
        if (value === undefined) {
          setInternalTab(nextId);
        }
        onValueChange?.(nextId);
      },
      [value, onValueChange]
    );

    const activeTab = hasTabs ? (tabs?.find((tab) => tab.id === activeTabId) ?? tabs?.[0]) : null;
    const activeCode = activeTab ? activeTab.code : code;
    const activeLanguage = activeTab?.language ?? language;
    const activeHighlights = React.useMemo(
      () => new Set(activeTab?.highlightLines ?? highlightLines ?? []),
      [activeTab?.highlightLines, highlightLines]
    );

    const lines = React.useMemo(() => activeCode.replace(/\n$/, "").split("\n"), [activeCode]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full min-w-0 flex-col gap-2 rounded-2xl border border-border/70 bg-card/65 p-1.5 text-card-foreground shadow-xs",
          className
        )}
        {...props}
      >
        {/* Header Bar */}
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 px-2 py-1">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            {hasTabs && tabs && tabs.length > 1 ? (
              <SegmentedControl
                size="sm"
                value={activeTab?.id ?? activeTabId}
                onValueChange={handleTabChange}
                aria-label="Code snippet variants"
              >
                {tabs.map((tab) => (
                  <SegmentedControlItem key={tab.id} value={tab.id}>
                    {tab.label}
                  </SegmentedControlItem>
                ))}
              </SegmentedControl>
            ) : (
              <div className="flex min-w-0 items-center gap-2">
                {filename && (
                  <span className="truncate font-mono text-xs font-medium text-foreground">
                    {filename}
                  </span>
                )}
                {activeLanguage && (
                  <span className="shrink-0 font-mono text-[11px] tracking-tight text-muted-foreground uppercase">
                    {activeLanguage}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {hasTabs && activeLanguage && (
              <span className="hidden font-mono text-[11px] text-muted-foreground uppercase sm:inline">
                {activeLanguage}
              </span>
            )}
            <span className="hidden font-mono text-[11px] text-muted-foreground tabular-nums sm:inline">
              {lines.length} {lines.length === 1 ? "line" : "lines"}
            </span>
            {copyable && (
              <CopyButton
                value={activeCode}
                size="sm"
                variant="ghost"
                idleText="Copy"
                copiedText="Copied"
                aria-label={
                  filename
                    ? `Copy ${filename} source code`
                    : `Copy ${activeLanguage || "code"} snippet`
                }
              />
            )}
          </div>
        </div>

        {/* Concentric Inner Code Viewport (R_inner = 16px - 6px = 10px) */}
        <div
          style={maxHeight ? { maxHeight } : undefined}
          className="overflow-auto rounded-[10px] border border-border/50 bg-muted/45 py-3"
        >
          <pre className="m-0 font-mono text-xs leading-6 text-foreground">
            <code className="block min-w-max">
              {lines.map((lineText, idx) => {
                const lineNumber = idx + 1;
                const isHighlighted = activeHighlights.has(lineNumber);

                return (
                  <div
                    key={`${activeTab?.id ?? "single"}-${lineNumber}`}
                    className={cn(
                      "flex items-baseline border-l-2 pr-4 transition-colors duration-100",
                      isHighlighted
                        ? "border-l-primary bg-primary/10"
                        : "border-l-transparent hover:bg-muted/60"
                    )}
                  >
                    {showLineNumbers && (
                      <span
                        aria-hidden="true"
                        className="w-10 shrink-0 pr-3 text-right text-[11px] text-muted-foreground/70 tabular-nums select-none"
                      >
                        {lineNumber}
                      </span>
                    )}
                    <span className={cn("flex-1 whitespace-pre", !showLineNumbers && "pl-4")}>
                      {lineText.length > 0 ? lineText : " "}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {caption && (
          <p className="px-2 pb-1 text-xs leading-normal [text-wrap:pretty] text-muted-foreground">
            {caption}
          </p>
        )}
      </div>
    );
  }
);
CodeBlock.displayName = "CodeBlock";
