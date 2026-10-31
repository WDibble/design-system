import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { ambientGradients, type AmbientGradientKey } from "@/tokens/gradients";
import {
  EyeIcon,
  SparklesIcon,
  RotateCCWIcon,
  Trash2Icon,
  ShieldCheckIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export function MaterialsFeedbackSpectrum() {
  const { toast } = useToast();
  const [previewMaterial, setPreviewMaterial] = React.useState<
    "ultra-thin" | "thin" | "regular" | "thick"
  >("regular");
  const [selectedGradient, setSelectedGradient] =
    React.useState<AmbientGradientKey>("cosmicFusion");
  const [isSimulatingLoading, setIsSimulatingLoading] = React.useState(false);
  const [activeToken, setActiveToken] = React.useState<string | null>("tok_live_981aef83c27d");

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          <EyeIcon size={16} />
          Spatial Materials & System Feedback (Batch 5)
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Apple HIG 4-tier liquid glass materials, Gmail-style 5s Undo toasts, global ⌘K Command
          palette, and zero-CLS skeleton loaders.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {/* 1. Spatial Liquid Glass Tiers */}
        <Card className="h-full">
          <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <SparklesIcon size={16} />
                Optical Glass Materials & Ambient Lensing
              </CardTitle>
              <CardDescription>
                Context-aware liquid glass with G2 continuous curvature and specular rim reflection.
              </CardDescription>
            </div>
            <SegmentedControl
              value={previewMaterial}
              onValueChange={(v) =>
                setPreviewMaterial(v as "ultra-thin" | "thin" | "regular" | "thick")
              }
              size="sm"
              className="w-full sm:w-auto"
            >
              <SegmentedControlItem value="ultra-thin">Ultra-Thin</SegmentedControlItem>
              <SegmentedControlItem value="thin">Thin</SegmentedControlItem>
              <SegmentedControlItem value="regular">Regular</SegmentedControlItem>
              <SegmentedControlItem value="thick">Thick</SegmentedControlItem>
            </SegmentedControl>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* OKLCH Ambient background canvas to demonstrate optical refraction */}
            <div
              className="relative min-h-56 overflow-hidden rounded-2xl border border-border/40 p-6 transition-all duration-500"
              style={{ background: ambientGradients[selectedGradient].subtleCss }}
            >
              <div
                className="pointer-events-none absolute -top-12 -left-12 size-48 rounded-full opacity-60 blur-3xl transition-all duration-700"
                style={{ background: ambientGradients[selectedGradient].css }}
              />
              <div
                className="pointer-events-none absolute -right-12 -bottom-12 size-48 rounded-full opacity-60 blur-3xl transition-all duration-700"
                style={{ background: ambientGradients[selectedGradient].css }}
              />

              {/* Dynamic Glass Surface */}
              <div
                className={cn(
                  "specular-rim relative flex flex-col gap-3 rounded-xl p-5 transition-all duration-300",
                  previewMaterial === "ultra-thin" && "glass-ultra-thin",
                  previewMaterial === "thin" && "glass-thin",
                  previewMaterial === "regular" && "glass-regular",
                  previewMaterial === "thick" && "glass-thick"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-tight text-foreground capitalize">
                    {previewMaterial} Material
                  </span>
                  <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                    {previewMaterial === "ultra-thin" && "55% Opacity · 28px Blur"}
                    {previewMaterial === "thin" && "70% Opacity · 20px Blur"}
                    {previewMaterial === "regular" && "82% Opacity · 16px Blur"}
                    {previewMaterial === "thick" && "92% Opacity · 12px Blur"}
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Lensing refraction derived from{" "}
                  <span className="font-medium text-foreground">
                    {ambientGradients[selectedGradient].name}
                  </span>{" "}
                  in perceptual OKLCH space without muddy sRGB grey midpoints.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Button size="sm" variant="default">
                    Active Surface
                  </Button>
                  <Button size="sm" variant="outline" className="border-border/60 bg-background/50">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>

            {/* Curated Harmonic Mesh Selector */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Curated Ambient OKLCH Mesh:
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {ambientGradients[selectedGradient].palette}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                {(Object.keys(ambientGradients) as AmbientGradientKey[]).map((key) => {
                  const grad = ambientGradients[key];
                  const isSelected = selectedGradient === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedGradient(key)}
                      aria-label={`Select ${grad.name} ambient mesh`}
                      aria-pressed={isSelected}
                      className={cn(
                        "group relative flex cursor-pointer flex-col items-center gap-1 rounded-lg border p-1.5 text-left transition-all duration-150",
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-border/50 hover:border-border hover:bg-muted/40"
                      )}
                    >
                      <div
                        className="size-5 shrink-0 rounded-full border border-white/20 shadow-xs"
                        style={{ background: grad.css }}
                      />
                      <span className="w-full truncate text-center text-[10px] font-medium text-foreground">
                        {grad.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Undo Toasts & Skeleton Previews */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <RotateCCWIcon size={16} />
              Undo Toasts & Dimension Stability
            </CardTitle>
            <CardDescription>
              Reversible actions with 5s Undo timer (`role="status"`) and zero-CLS skeleton
              previews.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* Reversible Action Demo (Detail #5) */}
            <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-foreground">API Token Revocation</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {activeToken ? (
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">
                        {activeToken} (Active)
                      </span>
                    ) : (
                      <span className="font-medium text-rose-500">
                        Revoked (Pending Soft Delete...)
                      </span>
                    )}
                  </p>
                </div>
                {activeToken ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      const prev = activeToken;
                      setActiveToken(null);
                      toast({
                        title: "API Token Revoked",
                        description: "Token marked for deletion. Reversible for 5 seconds.",
                        type: "error",
                        duration: 5000,
                        undoLabel: "Undo",
                        undoAction: () => {
                          setActiveToken(prev);
                          toast({
                            title: "Token Restored",
                            description: "The API token was restored to active status.",
                            type: "success",
                          });
                        },
                      });
                    }}
                  >
                    <Trash2Icon size={12} className="mr-1" /> Revoke Token
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setActiveToken("tok_live_981aef83c27d")}
                  >
                    Reset Demo
                  </Button>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                Reversible actions bypass confirmation modals with immediate execution and an
                accessible 5s Undo toast.
              </p>
            </div>

            {/* Skeleton Loader Demo (Detail #1) */}
            <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">
                  Skeleton Footprint (Zero CLS)
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsSimulatingLoading(true);
                    setTimeout(() => setIsSimulatingLoading(false), 1200);
                  }}
                >
                  Simulate Load (1.2s)
                </Button>
              </div>

              {isSimulatingLoading ? (
                <div className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/50 p-3">
                  <Skeleton className="size-10 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-3/4 rounded" />
                    <Skeleton className="h-2.5 w-1/2 rounded" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/50 p-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                    DG
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground">DeepMind Design Engine</p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      agent-native-design-system.edge.internal
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/30 text-emerald-500"
                  >
                    Ready
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. Directive 11: Perceptual OKLCH Gradient Engineering & Anti-Slop Contrast Showcase */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-col gap-3 pb-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheckIcon size={16} className="shrink-0 text-primary" />
                <span>
                  Directive 11: Perceptual OKLCH Gradient Engineering & Anti-Slop Contrast
                </span>
              </CardTitle>
              <CardDescription>
                Banishing sRGB muddy dead zones, eliminating AI gradient text tropes, and enforcing
                geometric coordinate contrast floors.
              </CardDescription>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start md:self-center">
              <Badge
                variant="outline"
                size="sm"
                className="border-emerald-500/30 font-mono text-[10px] text-emerald-500"
              >
                WCAG 2.2 AA Verified (≥ 4.5:1)
              </Badge>
              <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                CSS `in oklch`
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Column A: Banned AI Clichés & sRGB Flaws */}
            <div className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-destructive">
                  <span className="size-2 rounded-full bg-destructive" />
                  Banned AI Clichés & sRGB Flaws
                </span>
                <Badge
                  variant="outline"
                  size="sm"
                  className="border-destructive/30 text-[10px] text-destructive"
                >
                  Impeccable Flagged
                </Badge>
              </div>

              {/* sRGB Muddy Midpoint Ramp */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Legacy sRGB Ramp (`#ff0077` ➔ `#0077ff`)</span>
                  <span className="font-mono text-[10px] text-destructive">
                    Muddy 50% Dead Zone
                  </span>
                </div>
                <div
                  className="relative h-8 w-full overflow-hidden rounded-lg border border-border/40"
                  style={{ background: "linear-gradient(to right, #ff0077, #0077ff)" }}
                >
                  <div className="absolute inset-y-0 left-1/2 flex w-8 -translate-x-1/2 items-center justify-center border-x border-white/40 bg-black/30">
                    <span className="font-mono text-[9px] font-bold tracking-wider text-white uppercase">
                      Mid
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  sRGB gamma curve destroys chroma at the midpoint, producing an unappealing
                  desaturated murky grey band.
                </p>
              </div>

              {/* Clipped Gradient Text Anti-Pattern */}
              <div className="flex flex-col gap-1.5 border-t border-destructive/20 pt-1">
                <span className="text-[11px] text-muted-foreground">
                  Gradient Clipped Text (`-webkit-background-clip: text`)
                </span>
                <div className="rounded-lg border border-destructive/20 bg-background/80 p-3">
                  <p
                    className="text-sm font-bold tracking-tight"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Other assistants guess. We verify.
                  </p>
                  <p className="mt-1 text-[10px] text-destructive">
                    ❌ Flagged: Destroys font subpixel antialiasing and fails coordinate contrast
                    along light gradient bands.
                  </p>
                </div>
              </div>
            </div>

            {/* Column B: Sanctioned Craft Standard (Directive 11) */}
            <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Sanctioned Craft Standard (Directive 11)
                </span>
                <Badge
                  variant="outline"
                  size="sm"
                  className="border-emerald-500/30 text-[10px] text-emerald-500"
                >
                  Rulebook Compliant
                </Badge>
              </div>

              {/* Modern OKLCH Linear Ramp */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Perceptual OKLCH Ramp (`in oklch`)</span>
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                    Uniform Chroma
                  </span>
                </div>
                <div
                  className="relative h-8 w-full overflow-hidden rounded-lg border border-border/40"
                  style={{
                    background:
                      "linear-gradient(in oklch to right, oklch(0.65 0.28 335), oklch(0.64 0.20 265))",
                  }}
                >
                  <div className="absolute inset-y-0 left-1/2 flex w-8 -translate-x-1/2 items-center justify-center border-x border-white/40 bg-white/20">
                    <span className="font-mono text-[9px] font-bold tracking-wider text-white uppercase">
                      Pure
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  OKLCH interpolates in human-perceptual coordinates, maintaining smooth luminance
                  and vibrant saturation end-to-end.
                </p>
              </div>

              {/* High-Contrast Solid Typography + Specular Rim */}
              <div className="flex flex-col gap-1.5 border-t border-emerald-500/20 pt-1">
                <span className="text-[11px] text-muted-foreground">
                  High-Contrast Solid Text over Atmospheric Material
                </span>
                <div className="relative overflow-hidden rounded-lg border border-border/60 bg-card p-3 shadow-xs">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    Verified Coordinate Contrast & Optical Clarity
                  </p>
                  <p className="mt-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                    ✅ Passed: Solid glyph antialiasing preserved, $\ge 4.5:1$ contrast across 100%
                    of the surface floor.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
