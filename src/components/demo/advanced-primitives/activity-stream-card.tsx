import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
  TimelineBody,
  TimelineFooter,
  TimelineNode,
} from "@/components/ui/timeline";
import { FileUpload, type FileItem } from "@/components/ui/file-upload";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon } from "@/components/icons";

export function ActivityStreamCard() {
  const [files, setFiles] = React.useState<FileItem[]>([]);

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="flex flex-col gap-1 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <SparklesIcon size={16} className="text-primary" />
          <span>Activity Stream &amp; File Staging</span>
        </CardTitle>
        <CardDescription className="text-xs">
          Chronological audit timeline and tactile drag-and-drop file staging zone with format
          validation.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Chronological Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground">
              Deployment Audit Timeline
            </label>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              4 events recorded
            </span>
          </div>

          {/* Specialized Node Archetype Suite Tray */}
          <div className="space-y-2 rounded-xl border border-border/60 bg-muted/20 p-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-foreground">Specialized Node Palette</span>
              <span className="font-mono text-[10px] text-muted-foreground">10 Pack Presets</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <TimelineNode.Progress
                progress={76}
                pulse
                interactive
                aria-label="Progress preview: 76%"
              />
              <TimelineNode.Heartbeat
                status="success"
                interactive
                aria-label="Heartbeat probe: Healthy"
              />
              <TimelineNode.Pulse status="primary" interactive aria-label="Radar beacon: Active" />
              <TimelineNode.Step
                step={1}
                state="completed"
                interactive
                aria-label="Step 1: Completed"
              />
              <TimelineNode.Step
                step={2}
                state="current"
                interactive
                aria-label="Step 2: Current"
              />
              <TimelineNode.Step
                step={3}
                state="pending"
                interactive
                aria-label="Step 3: Pending"
              />
              <TimelineNode.Avatar
                fallback="CI"
                badgeStatus="success"
                badgeIcon="✓"
                interactive
                aria-label="Author: CI Release Engine"
              />
              <TimelineNode.Commit
                variant="commit"
                status="primary"
                interactive
                aria-label="Git commit node"
              />
              <TimelineNode.Action label="Approval Gate" status="primary" onClick={() => {}} />
              <TimelineNode.Dot
                dotVariant="glow"
                status="warning"
                interactive
                aria-label="Warning status dot"
              />
            </div>
          </div>

          <Timeline className="pt-2">
            {/* 1. Conic Progress Node + Animated Traveling Packet Flow Connector */}
            <TimelineItem connectorVariant="flow">
              <TimelineNode.Progress
                progress={76}
                pulse
                interactive
                aria-label="Build progress: 76%"
              />
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex min-w-0 items-center gap-2">
                    <TimelineTitle>Edge Cache Synchronisation</TimelineTitle>
                    <Badge
                      variant="outline"
                      size="sm"
                      className="shrink-0 border-primary/40 py-0 font-mono text-[9px] text-primary"
                    >
                      76% Compiled
                    </Badge>
                  </div>
                  <TimelineTime dateTime="2026-10-30T13:58:00Z">Streaming</TimelineTime>
                </TimelineHeader>
                <TimelineDescription>
                  Streaming distribution bundle across 12 availability zones with live conic stroke
                  telemetry.
                </TimelineDescription>
                <TimelineBody>
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                    <span className="rounded-md border border-border/50 bg-muted/70 px-1.5 py-0.5 font-semibold text-foreground">
                      sha:7cbf211
                    </span>
                    <span className="text-muted-foreground/50">/</span>
                    <span className="font-medium text-primary">Flowing to ingest node</span>
                  </div>
                </TimelineBody>
              </TimelineContent>
            </TimelineItem>

            {/* 2. Telemetry Heartbeat LED Node + Fixed Verified Solid Connector */}
            <TimelineItem connectorVariant="solid" connectorStatus="success">
              <TimelineNode.Heartbeat
                status="success"
                interactive
                aria-label="WebSocket connection healthy"
              />
              <TimelineContent>
                <TimelineHeader>
                  <div className="flex min-w-0 items-center gap-2">
                    <TimelineTitle>WebSocket Telemetry Channel</TimelineTitle>
                    <Badge
                      variant="outline"
                      size="sm"
                      className="shrink-0 border-emerald-500/40 py-0 font-mono text-[9px] text-emerald-600 dark:text-emerald-400"
                    >
                      Healthy
                    </Badge>
                  </div>
                  <TimelineTime dateTime="2026-10-30T13:45:00Z">Just now</TimelineTime>
                </TimelineHeader>
                <TimelineDescription>
                  Active cardiac probe pinging edge listeners at 2.8s hardware-synchronised
                  intervals.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            {/* 3. Collaborative Actor Avatar Node + Fixed Architectural Dashed Connector */}
            <TimelineItem connectorVariant="dashed">
              <TimelineNode.Avatar
                fallback="WD"
                badgeStatus="success"
                badgeIcon="✓"
                interactive
                aria-label="Author: William Dibble"
              />
              <TimelineContent>
                <TimelineHeader>
                  <TimelineTitle>Version 0.1 Tagged &amp; Published</TimelineTitle>
                  <TimelineTime dateTime="2026-10-30T13:30:00Z">18m ago</TimelineTime>
                </TimelineHeader>
                <TimelineDescription>
                  Self-contained origin anonymity enforced across all 13 design engineering
                  directives.
                </TimelineDescription>
                <TimelineFooter>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Avatar className="size-4 text-[8px]">
                      <AvatarFallback>CI</AvatarFallback>
                    </Avatar>
                    <span>Triggered via Automated Release Engine</span>
                  </div>
                </TimelineFooter>
              </TimelineContent>
            </TimelineItem>

            {/* 4. Sequential Stepper Numeral Node */}
            <TimelineItem isLast connectorVariant="none">
              <TimelineNode.Step
                step={4}
                state="completed"
                interactive
                aria-label="Step 4: Build verified"
              />
              <TimelineContent>
                <TimelineHeader>
                  <TimelineTitle>Automated Build Verification</TimelineTitle>
                  <TimelineTime dateTime="2026-10-30T13:00:00Z">45m ago</TimelineTime>
                </TimelineHeader>
                <TimelineDescription>
                  All 48 component exports passed strict TypeScript compilation and perceptual
                  contrast checks.
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>

        {/* Drag & Drop File Upload */}
        <div className="space-y-2 border-t border-border/40 pt-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground">File Staging Dropzone</label>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {files.length} / 3 staged
            </span>
          </div>
          <FileUpload
            value={files}
            onChange={setFiles}
            maxFiles={3}
            maxSizeMB={5}
            accept=".pdf,.png,.jpg,.json"
          />
        </div>
      </CardContent>
    </Card>
  );
}
