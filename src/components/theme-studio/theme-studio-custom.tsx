import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import type { DualContrastResult } from "@/lib/contrast";

interface ThemeStudioCustomProps {
  hue: number;
  chroma: number;
  lightness: number;
  radiusPx: number;
  buttonPolarity: "white" | "dark";
  lightnessBounds: { minL: number; maxL: number };
  dualContrast: DualContrastResult;
  onHueChange: (h: number) => void;
  onChromaChange: (c: number) => void;
  onLightnessChange: (l: number) => void;
  onRadiusChange: (r: number) => void;
  onPolarityChange: (polarity: "white" | "dark") => void;
}

export function ThemeStudioCustom({
  hue,
  chroma,
  lightness,
  radiusPx,
  buttonPolarity,
  lightnessBounds,
  dualContrast,
  onHueChange,
  onChromaChange,
  onLightnessChange,
  onRadiusChange,
  onPolarityChange,
}: ThemeStudioCustomProps) {
  return (
    <div className="space-y-6">
      {/* OKLCH Swatch Preview Card */}
      <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/20 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">Live Primary Color</span>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            oklch({lightness.toFixed(2)} {chroma.toFixed(2)} {hue})
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/20 text-xs font-bold shadow-md transition-colors duration-150"
            style={{
              backgroundColor: `oklch(${lightness} ${chroma} ${hue})`,
              color: buttonPolarity === "white" ? "oklch(0.985 0 0)" : `oklch(0.12 0.02 ${hue})`,
            }}
          >
            Aa
          </div>
          <div className="min-w-0 flex-1 space-y-1 text-[11px] text-muted-foreground">
            <p className="font-medium text-foreground">
              {buttonPolarity === "white"
                ? "Deep Ground with Crisp White Text"
                : "Luminous Ground with Obsidian Text"}
            </p>
            <p className="text-[10px]">
              Dynamic safe-zone clamping guarantees 100% compliance across both WCAG 2.2 AA and WCAG
              3 APCA.
            </p>
          </div>
        </div>

        {/* Dual-Engine Live Contrast Badges */}
        <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-2 text-[10px]">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-muted-foreground">WCAG 2.2 AA</span>
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={
                  dualContrast.wcag2.passAA
                    ? "font-mono font-semibold text-emerald-600 dark:text-emerald-400"
                    : "font-mono font-semibold text-destructive"
                }
              >
                {dualContrast.wcag2.formattedRatio}
              </span>
              <span className="text-[9px] text-muted-foreground">
                {dualContrast.wcag2.passAA ? "Passed (≥4.5)" : "Failed (<4.5)"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-muted-foreground">WCAG 3 APCA</span>
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={
                  dualContrast.apca.pass
                    ? "font-mono font-semibold text-emerald-600 dark:text-emerald-400"
                    : "font-mono font-semibold text-destructive"
                }
              >
                Lc {dualContrast.apca.absLc}
              </span>
              <span className="text-[9px] text-muted-foreground">
                {dualContrast.apca.pass ? "Passed (≥60)" : "Failed (<60)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Polarity Selector */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-medium">
          <span>Button Contrast Polarity</span>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            {buttonPolarity === "white" ? "White (Deep Ground)" : "Obsidian (Luminous)"}
          </Badge>
        </div>
        <SegmentedControl
          value={buttonPolarity}
          onValueChange={(v) => onPolarityChange(v as "white" | "dark")}
          size="sm"
          className="w-full"
        >
          <SegmentedControlItem value="white">Deep Tone (White Text)</SegmentedControlItem>
          <SegmentedControlItem value="dark">Luminous (Dark Text)</SegmentedControlItem>
        </SegmentedControl>
      </div>

      {/* Hue Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <span>Hue Angle</span>
          <span className="font-mono text-muted-foreground tabular-nums">{hue}°</span>
        </div>
        <Slider
          min={0}
          max={360}
          step={1}
          value={hue}
          aria-label="Hue Angle"
          onValueChange={(val) => {
            const h = Array.isArray(val) ? val[0] : val;
            onHueChange(h);
          }}
          className="w-full"
        />
        {/* Spectrum Track Preview */}
        <div
          className="h-2 w-full rounded-full border border-border/40"
          style={{
            background:
              "linear-gradient(to right in oklch, oklch(0.6 0.2 0), oklch(0.6 0.2 60), oklch(0.6 0.2 120), oklch(0.6 0.2 180), oklch(0.6 0.2 240), oklch(0.6 0.2 300), oklch(0.6 0.2 360))",
          }}
        />
      </div>

      {/* Chroma Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <span>Chroma (Vibrancy)</span>
          <span className="font-mono text-muted-foreground tabular-nums">{chroma.toFixed(2)}</span>
        </div>
        <Slider
          min={0}
          max={0.28}
          step={0.01}
          value={chroma}
          aria-label="Chroma (Vibrancy)"
          onValueChange={(val) => {
            const c = Array.isArray(val) ? val[0] : val;
            onChromaChange(c);
          }}
          className="w-full"
        />
      </div>

      {/* Lightness Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <span>Perceptual Lightness</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              Safe Zone: [{lightnessBounds.minL.toFixed(2)} – {lightnessBounds.maxL.toFixed(2)}]
            </span>
            <span className="font-mono text-muted-foreground tabular-nums">
              {lightness.toFixed(2)}
            </span>
          </div>
        </div>
        <Slider
          min={lightnessBounds.minL}
          max={lightnessBounds.maxL}
          step={0.01}
          value={lightness}
          aria-label="Perceptual Lightness"
          onValueChange={(val) => {
            const l = Array.isArray(val) ? val[0] : val;
            onLightnessChange(l);
          }}
          className="w-full"
        />
      </div>

      {/* Concentric Radius Hierarchy */}
      <div className="space-y-3 border-t border-border/40 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Corner Radius Scale</p>
            <p className="text-[10px] text-muted-foreground">
              Governs Directive 6 (Concentric Radii)
            </p>
          </div>
          <Badge variant="outline" size="sm" className="font-mono text-[10px] tabular-nums">
            {radiusPx}px ({(radiusPx / 16).toFixed(3)}rem)
          </Badge>
        </div>

        <Slider
          min={0}
          max={20}
          step={1}
          value={radiusPx}
          aria-label="Corner Radius Scale"
          onValueChange={(val) => {
            const r = Array.isArray(val) ? val[0] : val;
            onRadiusChange(r);
          }}
          className="w-full"
        />

        {/* Concentric Formula Visualizer (Directive 6) */}
        <div className="flex flex-col gap-2.5 rounded-xl border border-border/60 bg-card/60 p-4">
          <span className="text-[11px] font-medium text-muted-foreground">
            Concentric Optical Formula:
          </span>
          <div
            className="flex items-center justify-between border border-border/80 bg-muted/60 p-3 transition-all duration-200"
            style={{ borderRadius: `${radiusPx}px` }}
          >
            <div
              className="border border-border/60 bg-card p-2.5 font-mono text-[10px] text-foreground transition-all duration-200"
              style={{ borderRadius: `${Math.max(0, radiusPx - 8)}px` }}
            >
              Inner: R = max(0, {radiusPx} - 8) = {Math.max(0, radiusPx - 8)}px
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">Outer: {radiusPx}px</span>
          </div>
        </div>
      </div>
    </div>
  );
}
