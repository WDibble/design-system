import * as React from "react";
import { UploadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui/copy-button";
import { themeExportSchema, applyThemeTokens } from "@/lib/theme";

interface ThemeStudioTokensProps {
  activeThemeJson: string;
}

export function ThemeStudioTokens({ activeThemeJson }: ThemeStudioTokensProps) {
  const [importJson, setImportJson] = React.useState("");
  const [importError, setImportError] = React.useState<string | null>(null);
  const [importSuccess, setImportSuccess] = React.useState(false);

  const handleImport = () => {
    setImportError(null);
    setImportSuccess(false);

    try {
      const parsed = JSON.parse(importJson);
      const validated = themeExportSchema.safeParse(parsed);

      if (!validated.success) {
        setImportError(
          validated.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
        );
        return;
      }

      applyThemeTokens(validated.data);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 2500);
    } catch {
      setImportError("Invalid JSON syntax. Please verify theme token JSON format.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Export Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-foreground">Export Theme JSON</p>
            <p className="text-[11px] text-muted-foreground">
              Ready to export or backup as semantic design tokens.
            </p>
          </div>
          <CopyButton value={activeThemeJson} size="sm" />
        </div>
        <Textarea
          readOnly
          rows={8}
          value={activeThemeJson}
          aria-label="Exported theme JSON"
          className="bg-muted/40 font-mono text-[11px] leading-relaxed select-all"
        />
      </div>

      {/* Import Section */}
      <div className="space-y-2.5 border-t border-border/40 pt-3">
        <div>
          <p className="text-xs font-semibold text-foreground">Import Theme JSON</p>
          <p className="text-[11px] text-muted-foreground">
            Paste an exported theme JSON token payload to apply it instantly.
          </p>
        </div>
        <Textarea
          rows={5}
          placeholder='Paste {"name": "My Theme", "styles": { "light": {...}, "dark": {...} }}'
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          aria-label="Import theme JSON payload"
          className="font-mono text-[11px] leading-relaxed"
        />

        {importError && (
          <p className="text-[10px] leading-normal text-destructive">❌ {importError}</p>
        )}
        {importSuccess && (
          <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            ✅ Theme successfully imported and applied!
          </p>
        )}

        <Button
          size="sm"
          variant="default"
          onClick={handleImport}
          disabled={!importJson.trim()}
          className="mt-1 w-full gap-2"
        >
          <UploadIcon size={14} />
          <span>Apply Imported Theme</span>
        </Button>
      </div>
    </div>
  );
}
