import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tree } from "@/components/ui/tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CopyButton } from "@/components/ui/copy-button";
import { FolderOpenIcon, FileTextIcon } from "@/components/icons";
import { treeData, fileDetailsMap } from "./tree-data";

export function ArchitectureExplorerCard() {
  const [selectedTreeNode, setSelectedTreeNode] = React.useState<string>("app");
  const activeDetail = fileDetailsMap[selectedTreeNode] || fileDetailsMap.app;

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="flex flex-col gap-1 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FolderOpenIcon size={16} className="text-primary" />
          <span>Project Explorer &amp; Token Inspector</span>
        </CardTitle>
        <CardDescription className="text-xs">
          Recursive file tree paired with a live architectural inspector and code snippet preview.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="grid grid-cols-1 items-start gap-3.5 md:grid-cols-2">
          {/* Left: Compact Tree */}
          <div className="flex flex-col gap-2 rounded-xl border border-border/80 bg-muted/15 p-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold text-foreground">File System</span>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                62 files
              </span>
            </div>
            <Tree
              data={treeData}
              selectedId={selectedTreeNode}
              onSelect={(node) => setSelectedTreeNode(node.id)}
              defaultExpandedIds={["src"]}
              className="w-full"
            />
          </div>

          {/* Right: Live File & Token Inspector */}
          <div className="flex flex-col gap-2.5 rounded-xl border border-border/80 bg-card p-3 shadow-xs">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 border-b border-border/50 pb-2">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                  {activeDetail.type === "directory" ? (
                    <FolderOpenIcon size={14} className="text-primary" />
                  ) : (
                    <FileTextIcon size={14} className="text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs font-semibold text-foreground">
                    {activeDetail.path}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">{activeDetail.role}</p>
                </div>
              </div>
              <CopyButton
                value={activeDetail.snippet}
                size="sm"
                aria-label={`Copy source snippet for ${activeDetail.path}`}
              />
            </div>

            {/* Source Snippet Preview inside ScrollArea */}
            <ScrollArea
              tabIndex={0}
              aria-label={`Source preview for ${activeDetail.path}`}
              className="h-44 w-full rounded-lg border border-border/70 bg-muted/20 p-2.5 font-mono text-[10px] leading-relaxed text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              <pre className="font-mono text-[10px] leading-relaxed whitespace-pre select-text">
                {activeDetail.snippet}
              </pre>
            </ScrollArea>

            {/* Telemetry Footer */}
            <div className="flex items-center justify-between border-t border-border/40 pt-1 font-mono text-[10px] text-muted-foreground tabular-nums">
              {activeDetail.metrics.map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <span>{m.label}:</span>
                  <span className="font-medium text-foreground">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
