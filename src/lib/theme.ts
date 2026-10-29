import { z } from "zod";

/**
 * Zod validation schema for semantic theme tokens interoperable with tweakcn.com
 */
export const themeStylePropsSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  card: z.string(),
  "card-foreground": z.string(),
  popover: z.string(),
  "popover-foreground": z.string(),
  primary: z.string(),
  "primary-foreground": z.string(),
  secondary: z.string(),
  "secondary-foreground": z.string(),
  muted: z.string(),
  "muted-foreground": z.string(),
  accent: z.string(),
  "accent-foreground": z.string(),
  destructive: z.string(),
  "destructive-foreground": z.string(),
  success: z.string().optional(),
  "success-foreground": z.string().optional(),
  warning: z.string().optional(),
  "warning-foreground": z.string().optional(),
  info: z.string().optional(),
  "info-foreground": z.string().optional(),
  border: z.string(),
  input: z.string(),
  ring: z.string(),
  radius: z.string().default("0.625rem"),
  "chart-1": z.string().optional(),
  "chart-2": z.string().optional(),
  "chart-3": z.string().optional(),
  "chart-4": z.string().optional(),
  "chart-5": z.string().optional(),
  sidebar: z.string().optional(),
  "sidebar-foreground": z.string().optional(),
  "sidebar-primary": z.string().optional(),
  "sidebar-primary-foreground": z.string().optional(),
  "sidebar-accent": z.string().optional(),
  "sidebar-accent-foreground": z.string().optional(),
  "sidebar-border": z.string().optional(),
  "sidebar-ring": z.string().optional(),
  "font-sans": z.string().optional(),
  "font-serif": z.string().optional(),
  "font-mono": z.string().optional(),
});

export const tweakcnExportSchema = z.object({
  name: z.string().default("Custom Theme"),
  styles: z.object({
    light: themeStylePropsSchema,
    dark: themeStylePropsSchema,
  }),
});

export type TweakcnTheme = z.infer<typeof tweakcnExportSchema>;
export type ThemeStyleProps = z.infer<typeof themeStylePropsSchema>;

/**
 * Suppresses CSS transitions temporarily to prevent rainbow smears during theme switches.
 */
export function disableTransitionsTemporarily(): () => void {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `* {
         -webkit-transition: none !important;
         -moz-transition: none !important;
         -o-transition: none !important;
         -ms-transition: none !important;
         transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force reflow to commit DOM class changes before restoring transitions
    (() => window.getComputedStyle(document.body))();
    document.head.removeChild(css);
  };
}

const SEMANTIC_TOKEN_KEYS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "info",
  "info-foreground",
  "border",
  "input",
  "ring",
  "radius",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  "font-sans",
  "font-serif",
  "font-mono",
];

/**
 * Clears any inline CSS variable styles on document.documentElement.
 * Crucial to ensure inline styles never override stylesheet rules (:root / .dark).
 */
export function clearInlineThemeStyles(): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  SEMANTIC_TOKEN_KEYS.forEach((key) => {
    root.style.removeProperty(`--${key}`);
  });
}

/**
 * Dynamically applies a tweakcn theme to the active document.
 * Compiles both light (:root) and dark (.dark) token sets into a dedicated
 * stylesheet in document.head without setting inline styles on document.documentElement.
 */
export function applyTweakcnTheme(theme: TweakcnTheme | null): void {
  if (typeof document === "undefined") return;

  const restore = disableTransitionsTemporarily();

  try {
    // 1. Purge any residual inline styles on <html> so they never override .dark or :root in CSS
    clearInlineThemeStyles();

    let styleSheet = document.getElementById("tweakcn-custom-theme") as HTMLStyleElement | null;
    const legacyDark = document.getElementById("tweakcn-dark-theme");
    if (legacyDark) legacyDark.remove();

    if (!theme) {
      // Reset to native index.css defaults
      if (styleSheet) styleSheet.remove();
      return;
    }

    if (!styleSheet) {
      styleSheet = document.createElement("style");
      styleSheet.id = "tweakcn-custom-theme";
      document.head.appendChild(styleSheet);
    }

    const lightRules = Object.entries(theme.styles.light)
      .filter(([_, value]) => !!value)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");

    const darkRules = Object.entries(theme.styles.dark)
      .filter(([_, value]) => !!value)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");

    // Dynamic material glass integration:
    // Derives glass materials from active theme's card and border colors
    const lightMaterials = [
      "  --material-ultra-thin: color-mix(in oklch, var(--card) 55%, transparent);",
      "  --material-thin: color-mix(in oklch, var(--card) 70%, transparent);",
      "  --material-regular: color-mix(in oklch, var(--card) 82%, transparent);",
      "  --material-thick: color-mix(in oklch, var(--card) 92%, transparent);",
      "  --material-glass: color-mix(in oklch, var(--card) 80%, transparent);",
      "  --material-glass-border: color-mix(in oklch, var(--border) 60%, transparent);",
    ].join("\n");

    const darkMaterials = [
      "  --material-ultra-thin: color-mix(in oklch, var(--card) 55%, transparent);",
      "  --material-thin: color-mix(in oklch, var(--card) 70%, transparent);",
      "  --material-regular: color-mix(in oklch, var(--card) 82%, transparent);",
      "  --material-thick: color-mix(in oklch, var(--card) 92%, transparent);",
      "  --material-glass: color-mix(in oklch, var(--card) 80%, transparent);",
      "  --material-glass-border: color-mix(in oklch, var(--border) 60%, transparent);",
    ].join("\n");

    styleSheet.textContent = `
:root {
${lightRules}
${lightMaterials}
}

.dark {
${darkRules}
${darkMaterials}
}
`;
  } finally {
    restore();
  }
}
