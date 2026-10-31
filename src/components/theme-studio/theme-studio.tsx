import * as React from "react";
import { PaletteIcon, RotateCCWIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { presetThemes, type PresetTheme } from "@/lib/theme-presets";
import { applyThemeTokens, type ThemeTokenPayload } from "@/lib/theme";
import { evaluateDualContrast, getPassingLightnessBounds } from "@/lib/contrast";
import { ThemeStudioPresets } from "./theme-studio-presets";
import { ThemeStudioCustom } from "./theme-studio-custom";
import { ThemeStudioTokens } from "./theme-studio-tokens";

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
  const [activeTab, setActiveTab] = React.useState<"presets" | "custom" | "tokens">("presets");

  // Dynamic Lightness Bounds guaranteeing 100% Dual-Engine Pass
  const lightnessBounds = React.useMemo(() => {
    return getPassingLightnessBounds(hue, chroma, buttonPolarity);
  }, [hue, chroma, buttonPolarity]);

  // Active theme representation for live JSON export
  const activeThemeJson = React.useMemo(() => {
    const activePreset = presetThemes.find((p) => p.id === activePresetId) || presetThemes[0];
    const rem = `${(radiusPx / 16).toFixed(3)}rem`;
    const fgColor = buttonPolarity === "white" ? "oklch(0.985 0 0)" : `oklch(0.12 0.02 ${hue})`;

    const currentTheme: ThemeTokenPayload = {
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
          target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

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

    applyThemeTokens(preset);
  };

  const applyLiveColor = React.useCallback(
    (h: number, c: number, l: number, r: number, pol: "white" | "dark" = buttonPolarity) => {
      const root = document.documentElement;
      const primaryOklch = `oklch(${l} ${c} ${h})`;
      const fgColor = pol === "white" ? "oklch(0.985 0 0)" : `oklch(0.12 0.02 ${h})`;
      const ringLight = `oklch(${Math.max(0.4, l - 0.05)} ${c} ${h})`;
      const rem = `${(r / 16).toFixed(3)}rem`;

      root.style.setProperty("--primary", primaryOklch);
      root.style.setProperty("--primary-foreground", fgColor);
      root.style.setProperty("--ring", ringLight);
      root.style.setProperty("--radius", rem);
    },
    [buttonPolarity]
  );

  const handleReset = () => {
    const defaultPreset = presetThemes[0];
    handleSelectPreset(defaultPreset);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="isolation-isolate fixed right-6 bottom-6 z-40 transform-gpu">
        <Button
          size="default"
          variant="glass"
          onClick={() => setOpen(true)}
          aria-label="Open Theme Studio (⌘T)"
          className="glass-thick specular-rim transform-gpu gap-2 rounded-full border border-border/80 pr-4 pl-3.5 shadow-2xl"
        >
          <PaletteIcon size={16} className="text-primary" />
          <span className="text-xs font-semibold tracking-tight">Theme Studio</span>
          <Badge
            variant="secondary"
            size="sm"
            className="ml-0.5 h-4 px-1.5 py-0 font-mono text-[9px]"
          >
            ⌘T
          </Badge>
        </Button>
      </div>

      {/* Slide-over Theme Studio Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="glass-thick specular-rim flex w-full flex-col overflow-hidden p-0 sm:max-w-md"
        >
          {/* Header */}
          <SheetHeader className="flex flex-col gap-1.5 border-b border-border/60 bg-muted/20 p-5">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-base">
                <PaletteIcon size={16} className="text-primary" />
                <span>Theme Studio</span>
              </SheetTitle>
              <Button
                size="xs"
                variant="ghost"
                onClick={handleReset}
                aria-label="Reset theme to Zinc Minimalist default"
                className="gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCCWIcon size={12} />
                <span>Reset</span>
              </Button>
            </div>
            <SheetDescription className="text-xs leading-relaxed text-muted-foreground">
              Perceptual OKLCH palette calibration, concentric radius math, and two-way semantic
              JSON interoperability.
            </SheetDescription>

            {/* Navigation Tabs */}
            <div className="pt-2">
              <SegmentedControl
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "presets" | "custom" | "tokens")}
                size="sm"
                className="w-full"
              >
                <SegmentedControlItem value="presets">Presets</SegmentedControlItem>
                <SegmentedControlItem value="custom">Tune OKLCH</SegmentedControlItem>
                <SegmentedControlItem value="tokens">Theme JSON</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </SheetHeader>

          {/* Scrollable Body */}
          <div className="flex-1 space-y-6 overflow-y-auto p-5">
            {activeTab === "presets" && (
              <ThemeStudioPresets
                activePresetId={activePresetId}
                onSelectPreset={handleSelectPreset}
              />
            )}

            {activeTab === "custom" && (
              <ThemeStudioCustom
                hue={hue}
                chroma={chroma}
                lightness={lightness}
                radiusPx={radiusPx}
                buttonPolarity={buttonPolarity}
                lightnessBounds={lightnessBounds}
                dualContrast={dualContrast}
                onHueChange={(h) => {
                  setHue(h);
                  applyLiveColor(h, chroma, lightness, radiusPx);
                }}
                onChromaChange={(c) => {
                  setChroma(c);
                  applyLiveColor(hue, c, lightness, radiusPx);
                }}
                onLightnessChange={(l) => {
                  setLightness(l);
                  applyLiveColor(hue, chroma, l, radiusPx);
                }}
                onRadiusChange={(r) => {
                  setRadiusPx(r);
                  applyLiveColor(hue, chroma, lightness, r);
                }}
                onPolarityChange={(pol) => {
                  setButtonPolarity(pol);
                  const newBounds = getPassingLightnessBounds(hue, chroma, pol);
                  const clampedL =
                    pol === "white"
                      ? Math.min(lightness, newBounds.maxL)
                      : Math.max(lightness, newBounds.minL);
                  setLightness(clampedL);
                  applyLiveColor(hue, chroma, clampedL, radiusPx, pol);
                }}
              />
            )}

            {activeTab === "tokens" && <ThemeStudioTokens activeThemeJson={activeThemeJson} />}

            {/* Canvas Mode Switcher in Drawer */}
            <div className="flex items-center justify-between border-t border-border/40 pt-4">
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
          <SheetFooter className="flex items-center justify-between border-t border-border/60 bg-muted/10 p-4">
            <span className="font-mono text-[10px] text-muted-foreground">
              Tailwind CSS v4 · @theme inline
            </span>
            <SheetClose render={<Button size="sm" variant="outline" />}>Done</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
