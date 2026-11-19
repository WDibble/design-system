"use client";

import * as React from "react";
import { ShieldCheckIcon, SparklesIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { MarkdownToolbar } from "@/components/ui/markdown-toolbar";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/components/ui/toolbar";

export function ButtonExample() {
  const handleAsyncAction = () => new Promise<void>((resolve) => setTimeout(resolve, 400));

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="default"
        loadingText="Deploying..."
        successText="Deployed"
        leftIcon={<SparklesIcon size={16} />}
        onClick={handleAsyncAction}
      >
        Deploy Release
      </Button>
      <Button variant="outline" leftIcon={<ShieldCheckIcon size={16} />}>
        Inspect Diff
      </Button>
      <Button variant="success">Verified</Button>
    </div>
  );
}

export function CopyButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CopyButton
        value="npm run docs:build && npm run check"
        idleText="Copy Command"
        copiedText="Copied"
        variant="outline"
        size="sm"
      />
      <CopyButton
        value="oklch(0.62 0.18 145)"
        variant="pill"
        size="sm"
        aria-label="Copy OKLCH success token"
      />
    </div>
  );
}

export function MarkdownToolbarExample() {
  const [markdown, setMarkdown] = React.useState(
    "## Release Summary\n\nAll 57 primitives pass WCAG 2.2 AA and APCA gates."
  );
  const editorRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <MarkdownToolbar textareaRef={editorRef} aria-label="Release notes formatting toolbar" />
      <Textarea
        ref={editorRef}
        rows={3}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        aria-label="Release notes Markdown editor"
      />
    </div>
  );
}

export function SegmentedControlExample() {
  const [viewMode, setViewMode] = React.useState("preview");

  return (
    <SegmentedControl
      value={viewMode}
      onValueChange={setViewMode}
      aria-label="Documentation display mode"
    >
      <SegmentedControlItem value="preview">Preview</SegmentedControlItem>
      <SegmentedControlItem value="code">Code</SegmentedControlItem>
      <SegmentedControlItem value="tokens">Tokens</SegmentedControlItem>
    </SegmentedControl>
  );
}

export function ThemeToggleExample() {
  const [previewDark, setPreviewDark] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle isDark={previewDark} onToggleDark={setPreviewDark} />
      <span className="text-xs text-muted-foreground">
        Active polarity: {previewDark ? "Dark" : "Light"}
      </span>
    </div>
  );
}

export function ToggleExample() {
  const [pinned, setPinned] = React.useState(true);

  return (
    <Toggle
      pressed={pinned}
      onPressedChange={setPinned}
      variant="outline"
      aria-label="Pin status rail"
    >
      {pinned ? "Pinned to Rail" : "Pin to Rail"}
    </Toggle>
  );
}

export function ToggleGroupExample() {
  const [selection, setSelection] = React.useState<string[]>(["bold"]);

  return (
    <ToggleGroup value={selection} onValueChange={setSelection} variant="surface" multiple>
      <Toggle value="bold" aria-label="Bold formatting">
        Bold
      </Toggle>
      <Toggle value="italic" aria-label="Italic formatting">
        Italic
      </Toggle>
      <Toggle value="code" aria-label="Inline code formatting">
        Code
      </Toggle>
    </ToggleGroup>
  );
}

export function ToolbarExample() {
  return (
    <Toolbar aria-label="Canvas inspector tools" variant="floating">
      <ToolbarGroup>
        <ToolbarButton aria-label="Inspect layer bounds">Inspect</ToolbarButton>
        <ToolbarButton aria-label="Toggle grid snap">Snap</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton aria-label="Export token bundle">Export</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}
