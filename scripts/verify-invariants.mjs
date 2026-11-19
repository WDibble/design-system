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
  ["src/**/*.{ts,tsx}", "skills/**/*.md", "docs/**/*.md", "public/docs/**/*.md", "public/**/*.txt", "*.md"],
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
  let inFence = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      inFence = !inFence;
      return;
    }

    // Skip imports, markdown tables, CSS variable declarations, or rule definitions mentioning the ban
    if (
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

    // Check for prose double hyphens, excluding fenced code blocks and inline CLI flags
    if (
      !inFence &&
      PROSE_DOUBLE_HYPHEN.test(line) &&
      !line.includes("`--") &&
      !line.includes('"--') &&
      !/\s--[a-zA-Z]/.test(line)
    ) {
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

// 3. Documentation Drift & Link Integrity Gate
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const validScripts = new Set(Object.keys(packageJson.scripts ?? {}));
const docFiles = globSync(["*.md", "docs/**/*.md", "skills/**/*.md"], {
  ignore: ["node_modules/**", "dist/**", "inspiration/**", "logs/**", "scratch/**"],
});

const NPM_RUN_REGEX = /(?:^|[\s`'"(])npm run ([a-zA-Z0-9_:-]+)/g;
const INLINE_CODE_LINK_REGEX = /`[^`]*\[[^\]]*\]\([^)]+\)[^`]*`/g;
const MARKDOWN_LINK_REGEX = /!?\[[^\]]*\]\(([^)]+)\)/g;

for (const file of docFiles) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");
  let inFence = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      inFence = !inFence;
      return;
    }

    for (const match of line.matchAll(NPM_RUN_REGEX)) {
      const scriptName = match[1];
      if (!validScripts.has(scriptName)) {
        reportError(
          file,
          index + 1,
          `Documentation drift: 'npm run ${scriptName}' does not exist in package.json scripts.`
        );
      }
    }

    if (inFence) return;

    const sanitizedLine = line.replace(INLINE_CODE_LINK_REGEX, "");
    for (const match of sanitizedLine.matchAll(MARKDOWN_LINK_REGEX)) {
      const href = match[1].trim().split(/\s+/)[0];
      if (
        !href ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("#") ||
        href.startsWith("file://") ||
        href.startsWith("conversation://")
      ) {
        continue;
      }

      const targetPath = href.split("#")[0].split("?")[0];
      if (!targetPath) continue;

      const resolved = path.resolve(path.dirname(file), targetPath);
      if (!fs.existsSync(resolved)) {
        reportError(
          file,
          index + 1,
          `Dead relative Markdown link '${href}' (resolved path does not exist: ${resolved}).`
        );
      }
    }
  });
}

function hasIgnoreComment(lines, index) {
  return index > 0 && lines[index - 1].includes("invariant-ignore-next-line");
}

function extractBalancedParens(text, startIdx) {
  let depth = 0;
  for (let i = startIdx; i < text.length; i++) {
    if (text[i] === "(") depth++;
    else if (text[i] === ")") {
      depth--;
      if (depth === 0) return text.slice(startIdx + 1, i);
    }
  }
  return text.slice(startIdx + 1);
}

// 4. Motion Icon Explicit `size={...}` Gate (Directive 10)
const iconCheckFiles = globSync(["src/**/*.{ts,tsx}"], {
  ignore: ["src/components/icons/**", "src/generated/**", "node_modules/**", "dist/**", "scratch/**"],
});

for (const file of iconCheckFiles) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");
  const importRegex =
    /import\s*\{([^}]+)\}\s*from\s*["']@\/components\/icons(?:\/[^"']*)?["']/g;
  const importedIcons = new Set();

  for (const match of content.matchAll(importRegex)) {
    for (const part of match[1].split(",")) {
      const cleaned = part.replace(/^type\s+/, "").trim();
      if (!cleaned) continue;
      const alias = cleaned.split(/\s+as\s+/).pop()?.trim();
      if (alias && alias.endsWith("Icon")) {
        importedIcons.add(alias);
      }
    }
  }

  for (const iconName of importedIcons) {
    const tagRegex = new RegExp(`<${iconName}(?=\\s|\\/|>)([^>]*?)(?:\\/?>)`, "gs");
    for (const match of content.matchAll(tagRegex)) {
      const propsText = match[1] ?? "";
      if (!/\bsize\s*=/.test(propsText)) {
        const lineNum = content.slice(0, match.index).split("\n").length;
        if (!hasIgnoreComment(lines, lineNum - 1)) {
          reportError(
            file,
            lineNum,
            `Optical Icon Proportion violation (Directive 10): '<${iconName}>' imported from '@/components/icons' must pass an explicit numeric size={...} prop.`
          );
        }
      }
    }
  }
}

// 5. Gradient Cliche & Perceptual OKLCH Gate (Directive 11)
const styleAndSourceFiles = globSync(["src/**/*.{ts,tsx,css}"], {
  ignore: ["src/generated/**", "node_modules/**", "dist/**", "scratch/**"],
});

for (const file of styleAndSourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    if (hasIgnoreComment(lines, index)) return;

    if (
      /\bbg-clip-text\b/.test(line) ||
      /WebkitBackgroundClip:\s*["']text["']/.test(line) ||
      /-webkit-background-clip:\s*text/i.test(line)
    ) {
      reportError(
        file,
        index + 1,
        "Gradient text cliche violation (Directive 11): Avoid background-clip text ramps that degrade subpixel rendering and coordinate contrast."
      );
    }

    for (const match of line.matchAll(/linear-gradient\(/gi)) {
      const openIdx = (match.index ?? 0) + "linear-gradient".length;
      const inner = extractBalancedParens(line, openIdx);
      const usesPerceptual = /\bin\s+ok(lch|lab)\b/i.test(inner);
      const isAchromaticMask =
        (/\btransparent\b/i.test(inner) || /\bblack\b/i.test(inner) || /\bwhite\b/i.test(inner)) &&
        !/#|rgb\(|hsl\(/i.test(inner);

      if (!usesPerceptual && !isAchromaticMask) {
        reportError(
          file,
          index + 1,
          "Perceptual Gradient violation (Directive 11): Colour linear-gradient() must interpolate in oklch or oklab."
        );
      }
    }
  });
}

// 6. Atomic cn() Class Collision & Arbitrary Z-Index Gate (Directive 9)
const tsxSourceFiles = globSync(["src/**/*.{ts,tsx}"], {
  ignore: ["src/generated/**", "node_modules/**", "dist/**", "scratch/**"],
});

for (const file of tsxSourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    if (hasIgnoreComment(lines, index)) return;

    if (/\b(h-\d+|w-\d+)\b.*\bsize-(full|auto)\b/.test(line)) {
      reportError(
        file,
        index + 1,
        "Component Dimension collision (Directive 9): Multi-axis size-full/size-auto cannot follow single-axis h-* or w-* utilities."
      );
    }

    if (/z-\[[0-9]{3,}\]/.test(line)) {
      reportError(
        file,
        index + 1,
        "Arbitrary high z-index value (z-[999+]) detected. Use layered system tokens (z-10 to z-50)."
      );
    }
  });
}

// 7. Banned AI Marketing Buzzword Gate (Directive 12)
const BANNED_BUZZWORDS_REGEX =
  /\b(seamless|seamlessly|robust|empower|supercharge|elevate|effortless|unlock|unleash|next-generation|world-class|best-in-class|industry-leading|mission-critical|future-proof|game-changer|reinvent|reimagined)\b/i;

for (const file of globSync(["src/pages/**/*.{ts,tsx}", "src/docs/**/*.ts"])) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || hasIgnoreComment(lines, index)) {
      return;
    }

    const match = line.match(BANNED_BUZZWORDS_REGEX);
    if (match) {
      reportError(
        file,
        index + 1,
        `Banned AI marketing copy token '${match[0]}' detected (Directive 12). Replace with concrete factual operations.`
      );
    }
  });
}

// 8. Machine-Readable Registry & Primitive Parity Gate
const registryPath = "public/registry.json";
if (!fs.existsSync(registryPath)) {
  reportError(registryPath, 1, "Missing machine-readable registry file public/registry.json.");
} else {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const registryEntries = registry.primitives ?? {};

  for (const [slug, entry] of Object.entries(registryEntries)) {
    if (!entry?.path || !fs.existsSync(entry.path)) {
      reportError(
        registryPath,
        1,
        `Registry entry '${slug}' points to non-existent file '${entry?.path}'.`
      );
    }
  }

  const uiBarrel = fs.readFileSync("src/components/ui/index.ts", "utf8");
  for (const match of uiBarrel.matchAll(/export \* from "\.\/([^"]+)";/g)) {
    const slug = match[1];
    if (!registryEntries[slug]) {
      reportError(
        "src/components/ui/index.ts",
        1,
        `Exported UI primitive '${slug}' is missing from public/registry.json. Run 'npm run docs:build'.`
      );
    }
    const componentDocFile = `public/docs/components/${slug}.md`;
    if (!fs.existsSync(componentDocFile)) {
      reportError(
        componentDocFile,
        1,
        `Missing per-component LLM manual '${componentDocFile}'. Run 'npm run docs:build'.`
      );
    }
  }
}

if (hasErrors) {
  console.error("\n\x1b[31mInvariant validation failed with errors.\x1b[0m\n");
  process.exit(1);
} else {
  console.log("\x1b[32m✔ All design system invariants verified successfully.\x1b[0m");
}
