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

/**
 * Dynamically applies a tweakcn theme to the active document.
 */
export function applyTweakcnTheme(theme: TweakcnTheme): void {
  const restore = disableTransitionsTemporarily();
  const root = document.documentElement;

  try {
    // Apply light properties to :root
    Object.entries(theme.styles.light).forEach(([key, value]) => {
      if (value) root.style.setProperty(`--${key}`, value);
    });

    // Dynamically update dark mode CSS rule in head
    let darkStyleSheet = document.getElementById("tweakcn-dark-theme") as HTMLStyleElement | null;
    if (!darkStyleSheet) {
      darkStyleSheet = document.createElement("style");
      darkStyleSheet.id = "tweakcn-dark-theme";
      document.head.appendChild(darkStyleSheet);
    }

    const darkRules = Object.entries(theme.styles.dark)
      .filter(([_, value]) => !!value)
      .map(([key, value]) => `--${key}: ${value};`)
      .join(" ");

    darkStyleSheet.textContent = `.dark { ${darkRules} }`;
  } finally {
    restore();
  }
}
