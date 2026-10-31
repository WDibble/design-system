import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
} from "@/components/ui/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Kbd } from "@/components/ui/kbd";
import {
  SearchIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LayoutGridIcon,
  AlignLeftIcon,
  SlidersHorizontalIcon,
} from "@/components/icons";
import { frameworks } from "./tree-data";

export function SelectionKeycapsCard() {
  const [selectedFramework, setSelectedFramework] = React.useState<string | null>("React 19");
  const [density, setDensity] = React.useState("comfortable");
  const [formatting, setFormatting] = React.useState<string[]>(["bold"]);
  const [viewMode, setViewMode] = React.useState("grid");

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="flex flex-col gap-1 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontalIcon size={16} className="text-primary" />
          <span>Selection &amp; Keycap Primitives</span>
        </CardTitle>
        <CardDescription className="text-xs">
          Combobox autocomplete with instant filtering, accessible radio groups, and tactile
          physical keycaps.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Combobox Autocomplete */}
        <div className="space-y-2">
          <label
            htmlFor="combobox-technologies"
            className="flex items-center justify-between text-xs font-semibold text-foreground"
          >
            <span>Filterable Combobox</span>
            <span className="font-mono text-[10px] text-muted-foreground">Base UI Combobox</span>
          </label>
          <Combobox
            items={frameworks}
            value={selectedFramework}
            onValueChange={setSelectedFramework}
          >
            <ComboboxInput
              id="combobox-technologies"
              aria-label="Search technologies"
              placeholder="Search technologies..."
              icon={<SearchIcon size={14} />}
              size="default"
            />
            <ComboboxContent>
              <ComboboxEmpty>No technology found.</ComboboxEmpty>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw} value={fw}>
                  {fw}
                </ComboboxItem>
              ))}
            </ComboboxContent>
          </Combobox>
        </div>

        {/* RadioGroup & Density Selector */}
        <div className="space-y-2.5 border-t border-border/40 pt-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground">
              Layout Density Radio Group
            </label>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              Active: {density}
            </span>
          </div>
          <RadioGroup
            value={density}
            onValueChange={(v) => setDensity(v as string)}
            aria-label="Layout density options"
            className="grid grid-cols-3 gap-2"
          >
            {[
              { id: "compact", label: "Compact", desc: "High density" },
              { id: "comfortable", label: "Comfortable", desc: "Default spacing" },
              { id: "spacious", label: "Spacious", desc: "Airy baseline" },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border/70 bg-card p-2.5 shadow-xs transition-colors hover:bg-muted/40"
              >
                <RadioGroupItem value={opt.id} aria-label={opt.label} className="mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">{opt.label}</span>
                  <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Toggle and Toggle Group */}
        <div className="space-y-2.5 border-t border-border/40 pt-3">
          <label className="text-xs font-semibold text-foreground">
            Interactive Toggle Toolbars
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Multi-toggle formatting */}
            <div className="flex items-center gap-1.5">
              <span className="mr-1 text-[11px] text-muted-foreground">Style:</span>
              <ToggleGroup
                value={formatting}
                onValueChange={(vals) => setFormatting(vals as string[])}
                aria-label="Text formatting styles"
                variant="surface"
              >
                <Toggle value="bold" aria-label="Toggle bold text" size="sm">
                  <BoldIcon size={14} />
                </Toggle>
                <Toggle value="italic" aria-label="Toggle italic text" size="sm">
                  <ItalicIcon size={14} />
                </Toggle>
                <Toggle value="underline" aria-label="Toggle underline text" size="sm">
                  <UnderlineIcon size={14} />
                </Toggle>
              </ToggleGroup>
            </div>

            {/* Single-select view switch */}
            <div className="flex items-center gap-1.5">
              <span className="mr-1 text-[11px] text-muted-foreground">View:</span>
              <ToggleGroup
                value={[viewMode]}
                onValueChange={(vals) => {
                  if (vals && vals.length > 0) {
                    setViewMode(vals[vals.length - 1] as string);
                  }
                }}
                aria-label="Display layout mode"
                variant="outline"
              >
                <Toggle value="grid" aria-label="Grid layout view" size="sm">
                  <LayoutGridIcon size={14} />
                </Toggle>
                <Toggle value="list" aria-label="List layout view" size="sm">
                  <AlignLeftIcon size={14} />
                </Toggle>
              </ToggleGroup>
            </div>
          </div>
        </div>

        {/* Physical Kbd Matrix */}
        <div className="space-y-2 border-t border-border/40 pt-3">
          <label className="text-xs font-semibold text-foreground">
            Physical Keycap Micro-Primitives (Kbd)
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Palette:</span>
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">K</Kbd>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Theme:</span>
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">T</Kbd>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Dismiss:</span>
              <Kbd size="sm">Esc</Kbd>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Confirm:</span>
              <Kbd size="sm">↵ Enter</Kbd>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
