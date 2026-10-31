import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@/components/ui/toolbar";
import { MarkdownToolbar } from "@/components/ui/markdown-toolbar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "@/components/icons";
import { LinkIcon, CodeIcon, PenToolIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SimpleMarkdownPreview } from "./markdown-preview";

export function MarkdownAuthoringCard() {
  const [genericFormat, setGenericFormat] = React.useState<string[]>(["bold"]);
  const [genericAlign, setGenericAlign] = React.useState<string>("left");
  const [markdownText, setMarkdownText] = React.useState<string>(
    `# Antigravity Design System

An agent-native, human-centric design system built with **strict visual precision** and physical intuition.

- [x] WCAG 2.2 AA and WCAG 3 APCA compliant contrast
- [x] Zero layout shifts across all dynamic states
- [ ] Kinetic mechanical affordances

### Architecture Specifications
| Primitive | Headless Foundation | Verification |
| --- | --- | --- |
| Toolbar | @base-ui/react/toolbar | Verified |
| MarkdownToolbar | Selection-Preserving API | Interactive |

> Physical yield on pointerdown: controls compress to scale(0.97) immediately.`
  );
  const [markdownView, setMarkdownView] = React.useState<"edit" | "split" | "preview">("split");
  const [lastAction, setLastAction] = React.useState<string>("ready");
  const markdownRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <Card className="flex h-full flex-col justify-between lg:col-span-2">
      <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex items-center gap-2 text-base">
            <PenToolIcon size={16} className="text-primary" />
            <span>Accessible Toolbars &amp; Markdown Authoring Studio</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Autonomous selection-preserving text engine built on Base UI Toolbar primitives with
            roving tabindex, keyboard shortcuts, and live split preview.
          </CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            Last Action: {lastAction}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Sub-section A: Foundational Generic Toolbar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground">
              Generic Toolbar Primitive
            </label>
            <span className="font-mono text-[10px] text-muted-foreground">
              Base UI Toolbar · WAI-ARIA role="toolbar"
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border/60 bg-muted/20 p-3">
            <Toolbar variant="default" size="sm" className="bg-background">
              <ToolbarToggleGroup
                value={genericFormat}
                onValueChange={(val) => setGenericFormat(val as string[])}
                aria-label="Text formatting options"
              >
                <ToolbarToggleItem value="bold" aria-label="Toggle bold">
                  <BoldIcon size={14} className="size-3.5" />
                </ToolbarToggleItem>
                <ToolbarToggleItem value="italic" aria-label="Toggle italic">
                  <ItalicIcon size={14} className="size-3.5" />
                </ToolbarToggleItem>
                <ToolbarToggleItem value="underline" aria-label="Toggle underline">
                  <UnderlineIcon size={14} className="size-3.5" />
                </ToolbarToggleItem>
              </ToolbarToggleGroup>

              <ToolbarSeparator />

              <ToolbarToggleGroup
                value={genericAlign ? [genericAlign] : []}
                onValueChange={(val) => {
                  const arr = val as string[];
                  if (arr.length > 0) setGenericAlign(arr[arr.length - 1]);
                }}
                aria-label="Text alignment"
              >
                <ToolbarToggleItem value="left" aria-label="Align text left">
                  <AlignLeftIcon size={14} className="size-3.5" />
                </ToolbarToggleItem>
                <ToolbarToggleItem value="center" aria-label="Align text centre">
                  <AlignCenterIcon size={14} className="size-3.5" />
                </ToolbarToggleItem>
                <ToolbarToggleItem value="right" aria-label="Align text right">
                  <AlignRightIcon size={14} className="size-3.5" />
                </ToolbarToggleItem>
              </ToolbarToggleGroup>

              <ToolbarSeparator />

              <ToolbarGroup aria-label="External actions">
                <ToolbarButton
                  aria-label="Insert Hyperlink"
                  onClick={() => setLastAction("generic-link")}
                >
                  <LinkIcon className="size-3.5" />
                </ToolbarButton>
                <ToolbarButton
                  aria-label="Insert Snippet"
                  onClick={() => setLastAction("generic-code")}
                >
                  <CodeIcon className="size-3.5" />
                </ToolbarButton>
              </ToolbarGroup>
            </Toolbar>

            <span className="font-mono text-xs text-muted-foreground">
              Format:{" "}
              <span className="font-semibold text-foreground">
                {genericFormat.join(", ") || "none"}
              </span>{" "}
              · Align: <span className="font-semibold text-foreground">{genericAlign}</span>
            </span>
          </div>
        </div>

        {/* Sub-section B: Live Interactive Markdown Authoring Suite */}
        <div className="space-y-3 border-t border-border/40 pt-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground">
              Interactive Markdown Editor with Live Preview
            </label>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {markdownText.length} characters · {markdownText.split("\n").length} lines
              </span>
            </div>
          </div>

          {/* Markdown Toolbar docked above editor */}
          <MarkdownToolbar
            textareaRef={markdownRef}
            viewMode={markdownView}
            onViewModeChange={setMarkdownView}
            onAction={(act) => setLastAction(act)}
            variant="default"
            size="sm"
            className="bg-card/90"
          />

          {/* Editor & Preview Panels */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(markdownView === "edit" || markdownView === "split") && (
              <div className={cn("space-y-1.5", markdownView === "edit" && "md:col-span-2")}>
                <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Markdown Source</span>
                  <span className="font-mono text-[10px]">HTML &lt;textarea&gt;</span>
                </div>
                <Textarea
                  ref={markdownRef}
                  value={markdownText}
                  onChange={(e) => setMarkdownText(e.target.value)}
                  rows={12}
                  className="resize-y bg-background/80 font-mono text-xs leading-relaxed"
                  placeholder="Type or format your markdown here..."
                />
              </div>
            )}

            {(markdownView === "preview" || markdownView === "split") && (
              <div className={cn("space-y-1.5", markdownView === "preview" && "md:col-span-2")}>
                <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Live Rendered Preview</span>
                  <span className="font-mono text-[10px]">Real-time DOM</span>
                </div>
                <div className="specular-rim h-[270px] overflow-y-auto rounded-xl border border-border/80 bg-background/60 p-4">
                  <SimpleMarkdownPreview content={markdownText} />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
