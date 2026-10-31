import { CheckIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { presetThemes, type PresetTheme } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

interface ThemeStudioPresetsProps {
  activePresetId: string;
  onSelectPreset: (preset: PresetTheme) => void;
}

export function ThemeStudioPresets({ activePresetId, onSelectPreset }: ThemeStudioPresetsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-foreground uppercase">
          Curated Themes
        </span>
        <Badge variant="outline" size="sm" className="font-mono text-[10px]">
          {presetThemes.length} Curated
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {presetThemes.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              aria-pressed={isSelected}
              className={cn(
                "group relative flex cursor-pointer flex-col rounded-xl border p-3 text-left transition-all duration-150",
                isSelected
                  ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/40"
                  : "border-border/60 hover:border-border hover:bg-muted/30"
              )}
            >
              <div className="mb-1.5 flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="size-3.5 shrink-0 rounded-full border border-white/30 shadow-xs"
                    style={{ backgroundColor: preset.colorSwatch }}
                  />
                  <span className="truncate text-xs font-semibold text-foreground">
                    {preset.name}
                  </span>
                </div>
                {isSelected && <CheckIcon size={14} className="shrink-0 text-primary" />}
              </div>

              <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                {preset.description}
              </p>

              <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/40 pt-2 font-mono text-[10px] text-muted-foreground">
                <span>R: {preset.radiusPx}px</span>
                <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                  Dual-Engine ✅
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
