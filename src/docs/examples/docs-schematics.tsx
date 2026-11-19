"use client";

import * as React from "react";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { ComponentPreview } from "@/components/ui/component-preview";
import { DiagramFrame } from "@/components/ui/diagram-frame";
import { DocArticle, DocLayout, DocSidebar, DocToc } from "@/components/ui/doc-layout";
import { PropTable, type PropDefinition } from "@/components/ui/prop-table";

const SAMPLE_PROPS: PropDefinition[] = [
  {
    name: "variant",
    type: '"default" | "outline" | "destructive"',
    defaultValue: '"default"',
    description: "Selects visual button role without shifting border width.",
  },
  {
    name: "leftIcon",
    type: "React.ReactNode",
    required: false,
    description: "Optional kinetic icon bound to parent button lifecycle.",
  },
];

export function CalloutExample() {
  return (
    <div className="w-full max-w-lg">
      <Callout variant="defining-constraint" title="Zero Layout Shift">
        Declare transparent resting borders so hover and focus states never alter geometry.
      </Callout>
    </div>
  );
}

export function CodeBlockExample() {
  return (
    <div className="w-full max-w-lg">
      <CodeBlock
        tabs={[
          {
            id: "docs",
            label: "Sync Docs",
            language: "bash",
            highlightLines: [1],
            code: "npm run docs:build\nnpm run docs:check",
          },
          {
            id: "verify",
            label: "Full Gate",
            language: "bash",
            code: "npm run invariants\nnpm run check",
          },
        ]}
      />
    </div>
  );
}

export function ComponentPreviewExample() {
  const [clicks, setClicks] = React.useState(0);

  return (
    <div className="w-full max-w-lg">
      <ComponentPreview
        title="Nested Interactive Stage"
        code={`<button type="button">Clicked {clicks} times</button>`}
      >
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          className="rounded-lg border border-border/80 bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-xs active:scale-[0.98]"
        >
          Interactive count: {clicks}
        </button>
      </ComponentPreview>
    </div>
  );
}

export function DiagramFrameExample() {
  return (
    <div className="w-full max-w-lg">
      <DiagramFrame
        title="Spec to Verification Flow"
        description="Shows orthogonal flow from component spec to static verification gate."
      >
        <svg
          aria-label="Spec to verification diagram"
          viewBox="0 0 360 80"
          className="h-auto w-full min-w-[280px]"
        >
          <title>Spec to Verification Flow</title>
          <desc>Connects Component Spec to Verified Markdown and Check Gate.</desc>
          <rect
            x="10"
            y="18"
            width="130"
            height="44"
            rx="8"
            fill="var(--card)"
            stroke="var(--border)"
          />
          <text
            x="75"
            y="44"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="11"
            fontFamily="var(--font-sans)"
          >
            Component Spec
          </text>
          <path d="M 140 40 L 218 40" stroke="var(--primary)" strokeWidth="1.5" />
          <rect
            x="220"
            y="18"
            width="130"
            height="44"
            rx="8"
            fill="var(--card)"
            stroke="var(--primary)"
          />
          <text
            x="285"
            y="44"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="11"
            fontFamily="var(--font-sans)"
          >
            Verified Docs
          </text>
        </svg>
      </DiagramFrame>
    </div>
  );
}

export function DocLayoutExample() {
  const [section, setSection] = React.useState("overview");

  return (
    <div className="w-full max-w-2xl rounded-xl border border-border/60 bg-background p-4">
      <DocLayout>
        <DocSidebar
          activeId={section}
          onSelect={setSection}
          groups={[
            {
              title: "Guide",
              items: [
                { id: "overview", label: "Overview" },
                { id: "api", label: "Props API" },
              ],
            },
          ]}
        />
        <DocArticle markdownSource="# Overview\nGrounded prose specimen." llmsHref="/llms.txt">
          <div className="text-xs leading-relaxed text-muted-foreground">
            Reading column bounded to 72ch with zero-shift sidebar selection ({section}).
          </div>
        </DocArticle>
        <DocToc
          headings={[{ id: "overview", label: "Overview" }]}
          verificationChecks={[{ label: "Docs check green.", command: "npm run docs:check" }]}
        />
      </DocLayout>
    </div>
  );
}

export function PropTableExample() {
  return (
    <div className="w-full max-w-xl">
      <PropTable title="SampleProps" props={SAMPLE_PROPS} />
    </div>
  );
}
