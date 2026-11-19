"use client";

import { DiagramFrame } from "@/components/ui/diagram-frame";

interface StageNode {
  id: string;
  x: number;
  title: string;
  subtitle: string;
  badge: string;
}

const PIPELINE_STAGES: StageNode[] = [
  {
    id: "blueprint",
    x: 20,
    title: "App Blueprint",
    subtitle: "Archetype + Agent Skill",
    badge: "01 SPECIFY",
  },
  {
    id: "primitives",
    x: 180,
    title: "57 Primitives",
    subtitle: "Base UI + OKLCH Tokens",
    badge: "02 COMPOSE",
  },
  {
    id: "ast",
    x: 340,
    title: "AST Compiler",
    subtitle: "Manifest + llms.txt",
    badge: "03 DOCUMENT",
  },
  {
    id: "gates",
    x: 500,
    title: "Invariants Gate",
    subtitle: "18-Directive Audit",
    badge: "04 VERIFY",
  },
  {
    id: "ship",
    x: 660,
    title: "Verified Build",
    subtitle: "Zero-CLS Production",
    badge: "05 DELIVER",
  },
];

export function ArchitectureDiagram() {
  return (
    <DiagramFrame
      title="Automated Agent and Docs Pipeline"
      description="Five-stage orthogonal pipeline connecting the App Blueprint skill, 57 UI primitives and OKLCH tokens, AST documentation compiler, 18-directive invariant gate, and verified production output."
      caption="Deterministic single-source-of-truth pipeline: code changes flow forward into AST documentation manifests and backwards from static compiler verification until every gate exits zero."
    >
      <svg
        aria-label="Automated agent and documentation system architecture diagram"
        viewBox="0 0 820 200"
        className="h-auto w-full min-w-[680px]"
      >
        <title>Automated Agent and Docs Pipeline</title>
        <desc>
          Shows five sequential architecture stages from left to right: 01 Specify via App
          Blueprint, 02 Compose using 57 Primitives and OKLCH Tokens, 03 Document via AST Compiler
          generating manifest and llms.txt, 04 Verify via the 18-Directive Invariants Gate, and 05
          Deliver a zero-CLS Verified Build, plus a verification feedback path from Stage 04 back to
          Stage 02.
        </desc>

        <defs>
          <marker
            id="arch-arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--primary)" />
          </marker>
          <marker
            id="arch-feedback-head"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--muted-foreground)" />
          </marker>
        </defs>

        {/* Orthogonal Forward Connectors */}
        {[160, 320, 480, 640].map((startX) => (
          <path
            key={startX}
            d={`M ${startX} 74 L ${startX + 18} 74`}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.75"
            markerEnd="url(#arch-arrowhead)"
          />
        ))}

        {/* Orthogonal Verification Feedback Loop (Stage 04 back to Stage 02) */}
        <path
          d="M 570 112 L 570 156 L 250 156 L 250 114"
          fill="none"
          stroke="var(--muted-foreground)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#arch-feedback-head)"
        />
        <rect
          x="335"
          y="144"
          width="150"
          height="22"
          rx="6"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="410"
          y="159"
          textAnchor="middle"
          fill="var(--muted-foreground)"
          fontSize="10"
          fontFamily="var(--font-mono)"
        >
          Self-heal on failure
        </text>

        {/* Five Pipeline Stages */}
        {PIPELINE_STAGES.map((stage, idx) => {
          const isFinal = idx === PIPELINE_STAGES.length - 1;
          return (
            <g key={stage.id}>
              <rect
                x={stage.x}
                y="36"
                width="140"
                height="76"
                rx="12"
                fill="var(--card)"
                stroke={isFinal ? "var(--primary)" : "var(--border)"}
                strokeWidth={isFinal ? "1.75" : "1.25"}
              />
              <text
                x={stage.x + 12}
                y="56"
                fill="var(--primary)"
                fontSize="9.5"
                fontWeight="600"
                fontFamily="var(--font-mono)"
              >
                {stage.badge}
              </text>
              <text
                x={stage.x + 12}
                y="77"
                fill="var(--foreground)"
                fontSize="13"
                fontWeight="600"
                fontFamily="var(--font-sans)"
              >
                {stage.title}
              </text>
              <text
                x={stage.x + 12}
                y="95"
                fill="var(--muted-foreground)"
                fontSize="10.5"
                fontFamily="var(--font-sans)"
              >
                {stage.subtitle}
              </text>
            </g>
          );
        })}
      </svg>
    </DiagramFrame>
  );
}
