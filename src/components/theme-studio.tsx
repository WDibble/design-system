"use client";

import * as React from "react";
import {
  PaletteIcon,
  RotateCCWIcon,
  CheckIcon,
  UploadIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { CopyButton } from "@/components/ui/copy-button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  presetThemes,
  type PresetTheme,
} from "@/lib/theme-presets";
import {
  applyTweakcnTheme,
  applyLiveSliderTheme,
  tweakcnExportSchema,
  type TweakcnTheme,
} from "@/lib/theme";
import { evaluateDualContrast, getPassingLightnessBounds } from "@/lib/contrast";
import { cn } from "@/lib/utils";

export interface ThemeStudioProps {
  isDark: boolean;
  onToggleDark: (isDark: boolean) => void;
}

export function ThemeStudio({ isDark, onToggleDark }: ThemeStudioProps) {
  const [open, setOpen] = React.useState(false);
  const [activePresetId, setActivePresetId] = React.useState<string>("zinc-default");

  // Custom Tuning State (initialized from default preset)
  const [hue, setHue] = React.useState(presetThemes[0].hue);
  const [chroma, setChroma] = React.useState(presetThemes[0].chroma);
  const [lightness, setLightness] = React.useState(presetThemes[0].lightness);
  const [radiusPx, setRadiusPx] = React.useState(presetThemes[0].radiusPx);
  const [buttonPolarity, setButtonPolarity] = React.useState<"white" | "dark">("white");
  const [activeTab, setActiveTab] = React.useState<"presets" | "custom" | "tweakcn">("presets");

  // Dynamic Lightness Bounds guaranteeing 100% Dual-Engine Pass
  const lightnessBounds = React.useMemo(() => {
    return getPassingLightnessBounds(hue, chroma, buttonPolarity);
  }, [hue, chroma, buttonPolarity]);

  // tweakcn JSON Import/Export State
  const [importJson, setImportJson] = React.useState("");
  const [importError, setImportError] = React.useState<string | null>(null);
  const [importSuccess, setImportSuccess] = React.useState(false);

  // Active theme representation for live JSON export
  const activeThemeJson = React.useMemo(() => {
    const activePreset = presetThemes.find((p) => p.id === activePresetId) || presetThemes[0];
    const rem = `${(radiusPx / 16).toFixed(3)}rem`;
    const fgColor = buttonPolarity === "white" ? "oklch(0.985 0 0)" : `oklch(0.12 0.02 ${hue})`;

    // Clone and update active theme styles with custom adjustments
    const currentTheme: TweakcnTheme = {
      name: activePreset.name,
      styles: {
        light: {
          ...activePreset.styles.light,
          primary: `oklch(${lightness} ${chroma} ${hue})`,
          "primary-foreground": fgColor,
          ring: `oklch(${Math.max(0.4, lightness - 0.05)} ${chroma} ${hue})`,
          radius: rem,
        },
        dark: {
          ...activePreset.styles.dark,
          primary: `oklch(${lightness} ${chroma} ${hue})`,
          "primary-foreground": fgColor,
          ring: `oklch(${Math.min(0.8, lightness + 0.1)} ${chroma} ${hue})`,
          radius: rem,
        },
      },
    };

    return JSON.stringify(currentTheme, null, 2);
  }, [activePresetId, buttonPolarity, hue, chroma, lightness, radiusPx]);

  // Dual-Engine Contrast Calculation (WCAG 2.2 AA + WCAG 3 APCA)
  const dualContrast = React.useMemo(() => {
    const livePrimaryColor = `oklch(${lightness} ${chroma} ${hue})`;
    const liveFgColor = buttonPolarity === "white" ? "oklch(0.985 0 0)" : `oklch(0.12 0.02 ${hue})`;
    return evaluateDualContrast(liveFgColor, livePrimaryColor, "button");
  }, [buttonPolarity, lightness, chroma, hue]);

  // Global Keyboard Shortcut: ⌘T / Ctrl+T
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === "t") {
        const target = e.target as HTMLElement;
        const isInputField =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable;

        if (isInputField) return;

        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleOpenStudio = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-theme-studio", handleOpenStudio);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-theme-studio", handleOpenStudio);
    };
  }, []);

  // Handle Preset Selection
  const handleSelectPreset = (preset: PresetTheme) => {
    setActivePresetId(preset.id);
    setHue(preset.hue);
    setChroma(preset.chroma);
    setLightness(preset.lightness);
    setRadiusPx(preset.radiusPx);

    const isDarkText = preset.id === "tokyo-amber" || preset.lightness > 0.65;
    setButtonPolarity(isDarkText ? "dark" : "white");

    applyTweakcnTheme(preset);
  };

  // High-performance live CSS Variable update when sliders change (zero layout reflow)
  const applyLiveColor = (
    h: number,
    c: number,
    l: number,
    r: number,
    pol: "white" | "dark" = buttonPolarity
  ) => {
    const activePreset = presetThemes.find((p) => p.id === activePresetId) || presetThemes[0];
    const rem = `${(r / 16).toFixed(3)}rem`;
    const fgColor = pol === "white" ? "oklch(0.985 0 0)" : `oklch(0.12 0.02 ${h})`;

    const updatedTheme: TweakcnTheme = {
      name: `Custom (${activePreset.name})`,
      styles: {
        light: {
          ...activePreset.styles.light,
          primary: `oklch(${l} ${c} ${h})`,
          "primary-foreground": fgColor,
          ring: pol === "white" ? `oklch(${Math.max(0.4, l - 0.05)} ${c} ${h})` : `oklch(${Math.min(0.85, l + 0.1)} ${c} ${h})`,
          radius: rem,
        },
        dark: {
          ...activePreset.styles.dark,
          primary: `oklch(${l} ${c} ${h})`,
          "primary-foreground": fgColor,
          ring: pol === "white" ? `oklch(${Math.max(0.4, l - 0.05)} ${c} ${h})` : `oklch(${Math.min(0.85, l + 0.1)} ${c} ${h})`,
          radius: rem,
        },
      },
    };

    applyLiveSliderTheme(updatedTheme);
  };

  // Keep lightness bounded whenever hue, chroma, or polarity shifts
  React.useEffect(() => {
    if (lightness < lightnessBounds.minL) {
      setLightness(lightnessBounds.minL);
      applyLiveColor(hue, chroma, lightnessBounds.minL, radiusPx, buttonPolarity);
    } else if (lightness > lightnessBounds.maxL) {
      setLightness(lightnessBounds.maxL);
      applyLiveColor(hue, chroma, lightnessBounds.maxL, radiusPx, buttonPolarity);
    }
  }, [lightnessBounds, lightness, hue, chroma, radiusPx, buttonPolarity]);

  // Handle Reset to Default
  const handleReset = () => {
    const defaultPreset = presetThemes[0];
    setActivePresetId(defaultPreset.id);
    setHue(defaultPreset.hue);
    setChroma(defaultPreset.chroma);
    setLightness(defaultPreset.lightness);
    setRadiusPx(defaultPreset.radiusPx);
    setButtonPolarity("white");

    applyTweakcnTheme(defaultPreset);
  };

  // Handle tweakcn JSON Import
  const handleImport = () => {
    setImportError(null);
    setImportSuccess(false);

    try {
      const parsed = JSON.parse(importJson);
      const validated = tweakcnExportSchema.safeParse(parsed);

      if (!validated.success) {
        setImportError(validated.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", "));
        return;
      }

      applyTweakcnTheme(validated.data);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 2500);
    } catch {
      setImportError("Invalid JSON syntax. Please verify tweakcn export format.");
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="default"
          variant="glass"
          onClick={() => setOpen(true)}
          aria-label="Open Theme Studio & tweakcn Customizer (⌘T)"
          className="rounded-full shadow-2xl gap-2 pl-3.5 pr-4 border border-border/80 glass-thick specular-rim active:scale-95"
        >
          <PaletteIcon size={16} className="text-primary" />
          <span className="font-semibold text-xs tracking-tight">Theme Studio</span>
          <Badge variant="secondary" size="sm" className="font-mono text-[9px] px-1.5 py-0 h-4 ml-0.5">
            ⌘T
          </Badge>
        </Button>
      </div>

      {/* Slide-over Theme Studio Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 overflow-hidden flex flex-col glass-thick specular-rim"
        >
          {/* Header */}
          <SheetHeader className="p-5 border-b border-border/60 bg-muted/20 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base flex items-center gap-2">
                <PaletteIcon size={16} className="text-primary" />
                <span>Theme Studio</span>
              </SheetTitle>
              <Button
                size="xs"
                variant="ghost"
                onClick={handleReset}
                aria-label="Reset theme to Zinc Minimalist default"
                className="text-xs text-muted-foreground hover:text-foreground gap-1"
              >
                <RotateCCWIcon size={12} />
                <span>Reset</span>
              </Button>
            </div>
            <SheetDescription className="text-xs text-muted-foreground leading-relaxed">
              Perceptual OKLCH palette calibration, concentric radius math, and two-way tweakcn JSON interoperability.
            </SheetDescription>

            {/* Navigation Tabs */}
            <div className="pt-2">
              <SegmentedControl
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "presets" | "custom" | "tweakcn")}
                size="sm"
                className="w-full"
              >
                <SegmentedControlItem value="presets">Presets</SegmentedControlItem>
                <SegmentedControlItem value="custom">Tune OKLCH</SegmentedControlItem>
                <SegmentedControlItem value="tweakcn">tweakcn JSON</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </SheetHeader>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Tab 1: Curated Theme Presets */}
            {activeTab === "presets" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Curated Themes
                  </span>
                  <Badge variant="outline" size="sm" className="text-[10px] font-mono">
                    {presetThemes.length} Curated
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {presetThemes.map((preset) => {
                    const isSelected = activePresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        aria-pressed={isSelected}
                        className={cn(
                          "group relative flex flex-col text-left p-3 rounded-xl border transition-all duration-150 cursor-pointer",
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary/40 shadow-xs"
                            : "border-border/60 hover:border-border hover:bg-muted/30"
                        )}
                      >
                        <div className="flex items-center justify-between w-full mb-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className="size-3.5 rounded-full border border-white/30 shadow-xs shrink-0"
                              style={{ backgroundColor: preset.colorSwatch }}
                            />
                            <span className="text-xs font-semibold text-foreground truncate">
                              {preset.name}
                            </span>
                          </div>
                          {isSelected && (
                            <CheckIcon size={14} className="text-primary shrink-0" />
                          )}
                        </div>

                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {preset.description}
                        </p>

                        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-border/40 text-[10px] text-muted-foreground font-mono">
                          <span>R: {preset.radiusPx}px</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[9px]">Dual-Engine ✅</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Live OKLCH & Concentric Radius Tuner */}
            {activeTab === "custom" && (
              <div className="space-y-6">
                {/* OKLCH Swatch Preview Card */}
                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">Live Primary Color</span>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                      oklch({lightness.toFixed(2)} {chroma.toFixed(2)} {hue})
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="size-12 rounded-xl border border-white/20 shadow-md shrink-0 flex items-center justify-center font-bold text-xs transition-colors duration-150"
                      style={{
                        backgroundColor: `oklch(${lightness} ${chroma} ${hue})`,
                        color: buttonPolarity === "white" ? "oklch(0.985 0 0)" : `oklch(0.12 0.02 ${hue})`,
                      }}
                    >
                      Aa
                    </div>
                    <div className="flex-1 min-w-0 text-[11px] text-muted-foreground space-y-1">
                      <p className="font-medium text-foreground">
                        {buttonPolarity === "white"
                          ? "Deep Ground with Crisp White Text"
                          : "Luminous Ground with Obsidian Text"}
                      </p>
                      <p className="text-[10px]">
                        Dynamic safe-zone clamping guarantees 100% compliance across both WCAG 2.2 AA and WCAG 3 APCA.
                      </p>
                    </div>
                  </div>

                  {/* Dual-Engine Live Contrast Badges */}
                  <div className="pt-2 border-t border-border/40 grid grid-cols-2 gap-2 text-[10px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted-foreground font-mono">WCAG 2.2 AA</span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <span className={dualContrast.wcag2.passAA ? "text-emerald-600 dark:text-emerald-400 font-mono font-semibold" : "text-destructive font-mono font-semibold"}>
                          {dualContrast.wcag2.formattedRatio}
                        </span>
                        <span className="text-[9px] text-muted-foreground">
                          {dualContrast.wcag2.passAA ? "Passed (≥4.5)" : "Failed (<4.5)"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="text-muted-foreground font-mono">WCAG 3 APCA</span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <span className={dualContrast.apca.pass ? "text-emerald-600 dark:text-emerald-400 font-mono font-semibold" : "text-destructive font-mono font-semibold"}>
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
                    onValueChange={(v) => {
                      const pol = v as "white" | "dark";
                      setButtonPolarity(pol);
                      const newBounds = getPassingLightnessBounds(hue, chroma, pol);
                      const clampedL = pol === "white"
                        ? Math.min(lightness, newBounds.maxL)
                        : Math.max(lightness, newBounds.minL);
                      setLightness(clampedL);
                      applyLiveColor(hue, chroma, clampedL, radiusPx, pol);
                    }}
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
                    <span className="font-mono text-muted-foreground">{hue}°</span>
                  </div>
                  <Slider
                    min={0}
                    max={360}
                    step={1}
                    value={hue}
                    onValueChange={(val) => {
                      const h = Array.isArray(val) ? val[0] : val;
                      setHue(h);
                      applyLiveColor(h, chroma, lightness, radiusPx);
                    }}
                    className="w-full"
                  />
                  {/* Spectrum Track Preview */}
                  <div
                    className="h-2 rounded-full w-full border border-border/40"
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
                    <span className="font-mono text-muted-foreground">{chroma.toFixed(2)}</span>
                  </div>
                  <Slider
                    min={0}
                    max={0.28}
                    step={0.01}
                    value={chroma}
                    onValueChange={(val) => {
                      const c = Array.isArray(val) ? val[0] : val;
                      setChroma(c);
                      applyLiveColor(hue, c, lightness, radiusPx);
                    }}
                    className="w-full"
                  />
                </div>

                {/* Lightness Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span>Perceptual Lightness</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        Safe Zone: [{lightnessBounds.minL.toFixed(2)} – {lightnessBounds.maxL.toFixed(2)}]
                      </span>
                      <span className="font-mono text-muted-foreground">{lightness.toFixed(2)}</span>
                    </div>
                  </div>
                  <Slider
                    min={lightnessBounds.minL}
                    max={lightnessBounds.maxL}
                    step={0.01}
                    value={lightness}
                    onValueChange={(val) => {
                      const l = Array.isArray(val) ? val[0] : val;
                      setLightness(l);
                      applyLiveColor(hue, chroma, l, radiusPx);
                    }}
                    className="w-full"
                  />
                </div>

                {/* Concentric Radius Hierarchy */}
                <div className="pt-2 border-t border-border/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-foreground">Corner Radius Scale</p>
                      <p className="text-[10px] text-muted-foreground">Governs Directive 6 (Concentric Radii)</p>
                    </div>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                      {radiusPx}px ({(radiusPx / 16).toFixed(3)}rem)
                    </Badge>
                  </div>

                  <Slider
                    min={0}
                    max={20}
                    step={1}
                    value={radiusPx}
                    onValueChange={(val) => {
                      const r = Array.isArray(val) ? val[0] : val;
                      setRadiusPx(r);
                      applyLiveColor(hue, chroma, lightness, r);
                    }}
                    className="w-full"
                  />

                  {/* Concentric Formula Visualizer (Directive 6) */}
                  <div className="p-4 rounded-xl border border-border/60 bg-card/60 flex flex-col gap-2.5">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Concentric Optical Formula:
                    </span>
                    <div
                      className="p-3 bg-muted/60 border border-border/80 flex items-center justify-between transition-all duration-200"
                      style={{ borderRadius: `${radiusPx}px` }}
                    >
                      <div
                        className="p-2.5 bg-card border border-border/60 text-[10px] font-mono text-foreground transition-all duration-200"
                        style={{ borderRadius: `${Math.max(0, radiusPx - 8)}px` }}
                      >
                        Inner: R = max(0, {radiusPx} - 8) = {Math.max(0, radiusPx - 8)}px
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        Outer: {radiusPx}px
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Two-Way tweakcn JSON Interoperability */}
            {activeTab === "tweakcn" && (
              <div className="space-y-5">
                {/* Export Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-foreground">Export tweakcn JSON</p>
                      <p className="text-[11px] text-muted-foreground">
                        Ready to paste into tweakcn.com or import back here.
                      </p>
                    </div>
                    <CopyButton value={activeThemeJson} size="sm" />
                  </div>
                  <Textarea
                    readOnly
                    rows={8}
                    value={activeThemeJson}
                    className="font-mono text-[11px] leading-relaxed bg-muted/40 select-all"
                  />
                </div>

                {/* Import Section */}
                <div className="pt-3 border-t border-border/40 space-y-2.5">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Import from tweakcn.com</p>
                    <p className="text-[11px] text-muted-foreground">
                      Paste a exported tweakcn JSON theme to apply it instantly.
                    </p>
                  </div>
                  <Textarea
                    rows={5}
                    placeholder='Paste {"name": "My Theme", "styles": { "light": {...}, "dark": {...} }}'
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    className="font-mono text-[11px] leading-relaxed"
                  />

                  {importError && (
                    <p className="text-[10px] text-destructive leading-normal">
                      ❌ {importError}
                    </p>
                  )}
                  {importSuccess && (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      ✅ Theme successfully imported and applied!
                    </p>
                  )}

                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleImport}
                    disabled={!importJson.trim()}
                    className="w-full gap-2 mt-1"
                  >
                    <UploadIcon size={14} />
                    <span>Apply Imported Theme</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Canvas Mode Switcher in Drawer */}
            <div className="pt-4 border-t border-border/40 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-foreground">Surface Appearance</p>
                <p className="text-[11px] text-muted-foreground">Canvas ground luminance</p>
              </div>
              <SegmentedControl
                value={isDark ? "dark" : "light"}
                onValueChange={(val) => onToggleDark(val === "dark")}
                size="sm"
              >
                <SegmentedControlItem value="light">Light</SegmentedControlItem>
                <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="p-4 border-t border-border/60 bg-muted/10 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-mono">
              Tailwind CSS v4 · @theme inline
            </span>
            <SheetClose render={<Button size="sm" variant="outline" />}>Done</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
