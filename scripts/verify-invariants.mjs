import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";

let hasErrors = false;

function reportError(filePath, line, message) {
  console.error(`\x1b[31m[INVARIANT ERROR]\x1b[0m ${filePath}:${line} - ${message}`);
  hasErrors = true;
}

// 1. Scan for forbidden Em Dashes in documentation, markdown, and source files
const filesToScanForEmDashes = globSync(
  ["src/**/*.{ts,tsx}", "skills/**/*.md", "docs/**/*.md", "public/**/*.txt", "*.md"],
  {
  ignore: [
    "node_modules/**",
    "dist/**",
    "inspiration/**",
    "logs/**",
    "scratch/**",
    "package-lock.json",
  ],
});

// Matches Unicode em dash (\u2014) or HTML &mdash;
// Also matches prose double hyphen (e.g. "word -- word" or "word--word"), but ignores CSS variables (--var), flags (--flag), or markdown dividers
const UNICODE_EM_DASH = /([\u2014]|\&mdash;)/;
const PROSE_DOUBLE_HYPHEN = /(?<=[a-zA-Z0-9])\s*--\s*(?=[a-zA-Z0-9])/;

for (const file of filesToScanForEmDashes) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Skip code block fences, imports, markdown tables, CSS variable declarations, or rule definitions mentioning the ban
    if (
      trimmed.startsWith("```") ||
      trimmed.startsWith("import ") ||
      /^\|?\s*:?-+:?\s*\|/.test(trimmed) ||
      trimmed.includes("--color-") ||
      trimmed.includes("var(--") ||
      (file.endsWith(".md") && trimmed.includes("Never use em dashes"))
    ) {
      return;
    }

    // Check for real em dash characters
    if (UNICODE_EM_DASH.test(line)) {
      reportError(
        file,
        index + 1,
        "Forbidden em dash detected (Directive 12). Structure clauses using commas, colons, semicolons, or separate sentences."
      );
      return;
    }

    // Check for prose double hyphens, excluding code/snippets
    if (PROSE_DOUBLE_HYPHEN.test(line) && !line.includes("`--`") && !line.includes('"--') && !line.includes("`--")) {
      reportError(
        file,
        index + 1,
        "Forbidden prose double hyphen detected (Directive 12). Structure clauses using commas, colons, semicolons, or separate sentences."
      );
    }
  });
}

// 2. Scan TSX components for Zero Layout Shift violations (Directive 2)
const componentFiles = globSync(["src/**/*.{ts,tsx}"], {
  ignore: ["node_modules/**", "dist/**", "scratch/**"],
});

// Flag dynamic font-weight, border-width, padding, or margin changes on pseudo-states
// Excludes accessible screen-reader skip links (sr-only focus:not-sr-only)
const LAYOUT_SHIFT_REGEX =
  /(hover|focus|active):(font-(bold|semibold|medium|normal|light)|border-[0-9]|p-[0-9]|px-[0-9]|py-[0-9]|m-[0-9])/;

for (const file of componentFiles) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    // Allow skip-links using sr-only focus:not-sr-only
    if (line.includes("sr-only focus:not-sr-only")) return;

    const match = line.match(LAYOUT_SHIFT_REGEX);
    if (match) {
      reportError(
        file,
        index + 1,
        `Zero Layout Shift violation (Directive 2): '${match[0]}' changes geometry dynamically. Use background contrast, pills, or border-transparent bases.`
      );
    }
  });
}

if (hasErrors) {
  console.error("\n\x1b[31mInvariant validation failed with errors.\x1b[0m\n");
  process.exit(1);
} else {
  console.log("\x1b[32m✔ All design system invariants verified successfully.\x1b[0m");
}
