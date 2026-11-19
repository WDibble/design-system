import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readRepoFile(relPath) {
  return fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8");
}

function loadRegistry() {
  return JSON.parse(readRepoFile("public/registry.json"));
}

function loadPackageVersion() {
  try {
    return JSON.parse(readRepoFile("package.json")).version ?? "0.1.0";
  } catch {
    return "0.1.0";
  }
}

let cachedIcons = null;
function loadIconsIndex() {
  if (cachedIcons) return cachedIcons;
  const iconsDir = path.join(REPO_ROOT, "src/components/icons");
  if (!fs.existsSync(iconsDir)) return [];

  const entries = [];
  for (const fileName of fs.readdirSync(iconsDir).sort()) {
    if (!fileName.endsWith(".tsx") || fileName === "index.ts") continue;
    const raw = fs.readFileSync(path.join(iconsDir, fileName), "utf8");
    const symbols = new Set();

    for (const m of raw.matchAll(/export\s+(?:const|function)\s+([A-Za-z0-9_]+Icon)\b/g)) {
      symbols.add(m[1]);
    }
    for (const m of raw.matchAll(/export\s*\{([^}]+)\}/g)) {
      for (const part of m[1].split(",")) {
        const cleaned = part.replace(/^type\s+/, "").trim();
        const alias = cleaned.split(/\s+as\s+/).pop()?.trim();
        if (alias && alias.endsWith("Icon")) symbols.add(alias);
      }
    }

    const slug = fileName.replace(/\.tsx$/, "");
    for (const symbol of symbols) {
      entries.push({ slug, symbol });
    }
  }
  cachedIcons = entries;
  return cachedIcons;
}

const ARCHETYPE_HINTS = [
  { keywords: ["docs", "documentation", "guide", "manual", "api", "reference"], archetype: "Long Document (DocLayout + DocSidebar + DocArticle + DocToc)" },
  { keywords: ["dashboard", "inspect", "telemetry", "monitor", "table", "logs"], archetype: "Workbench (NavigationBar + Table/Chart + Badge + SegmentedControl)" },
  { keywords: ["theme", "token", "studio", "calibrat", "config", "editor"], archetype: "Split Studio (Resizable / Field + Slider + Live Preview)" },
  { keywords: ["search", "catalogue", "catalog", "directory", "browse"], archetype: "Index-First (Input + Category Filter + Table / ComponentPreview)" },
  { keywords: ["principles", "manifesto", "standard", "article"], archetype: "Manifesto (Typographic Display Lead + Hairline Ruled Prose)" },
];

const SYNONYM_BOOSTS = {
  delete: ["alert-dialog"],
  destructive: ["alert-dialog", "button"],
  confirm: ["alert-dialog", "dialog"],
  confirmation: ["alert-dialog"],
  modal: ["dialog", "alert-dialog"],
  drawer: ["drawer", "sheet"],
  sidebar: ["doc-layout", "sheet"],
  search: ["combobox", "command", "input"],
  autocomplete: ["combobox"],
  shortcut: ["command", "kbd", "tooltip"],
  hotkey: ["command", "kbd"],
  copy: ["copy-button", "code-block"],
  code: ["code-block", "component-preview"],
  diagram: ["diagram-frame"],
  flowchart: ["diagram-frame"],
  svg: ["diagram-frame"],
  warning: ["callout", "alert-dialog"],
  note: ["callout"],
  props: ["prop-table"],
  api: ["prop-table", "doc-layout"],
  toggle: ["switch", "toggle", "segmented-control"],
  switch: ["switch", "segmented-control"],
  form: ["field", "input", "select", "combobox"],
  date: ["calendar"],
  progress: ["progress", "skeleton"],
  notification: ["toast"],
};

function recommendComponents(query, limit = 5) {
  const registry = loadRegistry();
  const normalized = String(query ?? "").toLowerCase();
  const terms = normalized.split(/[^a-z0-9-]+/).filter((t) => t.length >= 2);
  const clampedLimit = Math.min(Math.max(Number(limit) || 5, 1), 15);

  const scored = Object.entries(registry.primitives ?? {}).map(([slug, entry]) => {
    let score = 0;
    const whenToUseText = (entry.whenToUse ?? []).join(" ").toLowerCase();
    const constraintText = (entry.definingConstraint ?? "").toLowerCase();
    const categoryText = (entry.category ?? "").toLowerCase();
    const exportsText = (entry.exports ?? []).join(" ").toLowerCase();

    if (normalized.includes(slug)) score += 12;

    for (const term of terms) {
      const boosts = SYNONYM_BOOSTS[term];
      if (boosts?.includes(slug)) score += 9;
      if (slug.includes(term)) score += 6;
      if (exportsText.includes(term)) score += 4;
      if (whenToUseText.includes(term)) score += 4;
      if (constraintText.includes(term)) score += 3;
      if (categoryText.includes(term)) score += 2;
    }

    return {
      slug,
      score,
      category: entry.category,
      path: entry.path,
      docPath: entry.docPath,
      definingConstraint: entry.definingConstraint,
      whenToUse: entry.whenToUse,
      whenNotToUse: entry.whenNotToUse,
    };
  });

  scored.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
  const matches = scored.filter((item) => item.score > 0).slice(0, clampedLimit);

  const archetypes = ARCHETYPE_HINTS.filter((h) =>
    h.keywords.some((kw) => normalized.includes(kw))
  ).map((h) => h.archetype);

  return {
    query,
    suggestedArchetypes:
      archetypes.length > 0
        ? archetypes
        : ["Workbench or Index-First (verify operational job in skills/app-blueprint/SKILL.md)"],
    recommendations: matches.length > 0 ? matches : scored.slice(0, clampedLimit),
  };
}

function getComponentSpec(slug) {
  const registry = loadRegistry();
  const cleaned = String(slug ?? "").trim().toLowerCase();
  const entry = registry.primitives?.[cleaned];

  if (!entry) {
    const validSlugs = Object.keys(registry.primitives ?? {}).sort();
    const suggestions = validSlugs.filter((s) => s.includes(cleaned)).slice(0, 6);
    return {
      isError: true,
      text: `Unknown primitive slug '${slug}'. Closest matches: ${(suggestions.length ? suggestions : validSlugs.slice(0, 10)).join(", ")}`,
    };
  }

  const mdPath = path.join(REPO_ROOT, entry.docPath);
  if (!fs.existsSync(mdPath)) {
    return {
      isError: true,
      text: `Specification file '${entry.docPath}' is missing. Run 'npm run docs:build'.`,
    };
  }

  return {
    isError: false,
    text: fs.readFileSync(mdPath, "utf8"),
  };
}

function searchIcons(query, limit = 15) {
  const icons = loadIconsIndex();
  const normalized = String(query ?? "").trim().toLowerCase();
  const clampedLimit = Math.min(Math.max(Number(limit) || 15, 1), 40);

  const terms = normalized.split(/[^a-z0-9-]+/).filter(Boolean);
  const matches = icons
    .filter((item) => {
      if (terms.length === 0) return true;
      const hay = `${item.slug} ${item.symbol.toLowerCase()}`;
      return terms.every((t) => hay.includes(t));
    })
    .slice(0, clampedLimit);

  return {
    query,
    totalMatches: matches.length,
    opticalScaleGuide: {
      xs: "size={12} (h-7 container)",
      sm: "size={14} (h-8 container)",
      default: "size={16} (h-9 container)",
      lg: "size={18} (h-10 container)",
    },
    icons: matches.map((m) => ({
      symbol: m.symbol,
      importExample: `import { ${m.symbol} } from "@/components/icons";`,
      jsxExample: `<${m.symbol} size={16} />`,
    })),
  };
}

function validateSnippet(code) {
  const source = String(code ?? "");
  const lines = source.split("\n");
  const violations = [];

  const layoutShiftRegex =
    /(hover|focus|active):(font-(bold|semibold|medium|normal|light)|border-[0-9]|p-[0-9]|px-[0-9]|py-[0-9]|m-[0-9])/;
  const bannedBuzzwordsRegex =
    /\b(seamless|seamlessly|robust|empower|supercharge|elevate|effortless|unlock|unleash|next-generation|world-class|best-in-class|industry-leading|mission-critical|future-proof|game-changer|reinvent|reimagined)\b/i;

  const importRegex =
    /import\s*\{([^}]+)\}\s*from\s*["']@\/components\/icons(?:\/[^"']*)?["']/g;
  const importedIcons = new Set();
  for (const m of source.matchAll(importRegex)) {
    for (const part of m[1].split(",")) {
      const cleaned = part.replace(/^type\s+/, "").trim();
      const alias = cleaned.split(/\s+as\s+/).pop()?.trim();
      if (alias && alias.endsWith("Icon")) importedIcons.add(alias);
    }
  }

  for (const iconName of importedIcons) {
    const tagRegex = new RegExp(`<${iconName}(?=\\s|\\/|>)([^>]*?)(?:\\/?>)`, "gs");
    for (const m of source.matchAll(tagRegex)) {
      if (!/\bsize\s*=/.test(m[1] ?? "")) {
        const line = source.slice(0, m.index).split("\n").length;
        violations.push({
          line,
          directive: "Directive 10",
          message: `Kinetic icon '<${iconName}>' must declare an explicit numeric size={...} prop.`,
        });
      }
    }
  }

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;
    if (/[\u2014]|\&mdash;/.test(lineText)) {
      violations.push({
        line: lineNum,
        directive: "Directive 12",
        message: "Forbidden em dash detected in snippet prose.",
      });
    }
    const shiftMatch = lineText.match(layoutShiftRegex);
    if (shiftMatch && !lineText.includes("sr-only focus:not-sr-only")) {
      violations.push({
        line: lineNum,
        directive: "Directive 2",
        message: `Zero Layout Shift violation: '${shiftMatch[0]}' changes control geometry.`,
      });
    }
    if (/\bbg-clip-text\b/.test(lineText) || /WebkitBackgroundClip:\s*["']text["']/.test(lineText)) {
      violations.push({
        line: lineNum,
        directive: "Directive 11",
        message: "Cliché gradient text clipping detected.",
      });
    }
    if (/linear-gradient\(/i.test(lineText) && !/linear-gradient\([^)]*\bin\s+ok(lch|lab)\b/i.test(lineText)) {
      violations.push({
        line: lineNum,
        directive: "Directive 11",
        message: "Colour linear-gradient() must interpolate in oklch or oklab.",
      });
    }
    if (/\b(h-\d+|w-\d+)\b.*\bsize-(full|auto)\b/.test(lineText)) {
      violations.push({
        line: lineNum,
        directive: "Directive 9",
        message: "Atomic cn() collision: size-full/size-auto overrides preceding h-*/w-* dimensions.",
      });
    }
    if (/z-\[[0-9]{3,}\]/.test(lineText)) {
      violations.push({
        line: lineNum,
        directive: "Directive 9",
        message: "Arbitrary z-[999+] z-index value detected.",
      });
    }
    const buzz = lineText.match(bannedBuzzwordsRegex);
    if (buzz) {
      violations.push({
        line: lineNum,
        directive: "Directive 12",
        message: `Banned marketing buzzword '${buzz[0]}' detected.`,
      });
    }
  });

  return {
    valid: violations.length === 0,
    violationCount: violations.length,
    violations,
  };
}

const TOOLS = [
  {
    name: "recommend_components",
    description:
      "Recommend verified design system primitives and macrostructure archetypes for a UI task or feature requirement.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Natural-language UI goal, e.g. 'destructive delete confirmation modal'.",
        },
        limit: {
          type: "number",
          description: "Maximum number of recommended primitives (default 5, max 15).",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_component_spec",
    description:
      "Retrieve the full LLM building-block manual (Defining Constraint, When to Use, Use Instead, Anatomy, Verified TSX Example, Props, and Do/Don't) for a primitive slug.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Kebab-case primitive slug such as 'alert-dialog', 'button', or 'doc-layout'.",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "search_icons",
    description:
      "Search the 470 kinetic animated icon exports in @/components/icons and return exact React symbol names plus required numeric size rules.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Icon search term such as 'sparkles', 'shield', 'check', or 'search'.",
        },
        limit: {
          type: "number",
          description: "Maximum results to return (default 15, max 40).",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "validate_snippet",
    description:
      "Audit proposed JSX/TSX snippet code against core static design-system invariants before writing files.",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Proposed TSX component source snippet to validate.",
        },
      },
      required: ["code"],
    },
  },
];

function sendMessage(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

function handleRequest(req) {
  const { id, method, params } = req;
  const isNotification = id === undefined || id === null;

  try {
    switch (method) {
      case "initialize": {
        if (isNotification) return;
        sendMessage({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: {},
              resources: {},
            },
            serverInfo: {
              name: "antigravity-design-system",
              version: loadPackageVersion(),
            },
          },
        });
        return;
      }

      case "notifications/initialized":
        return;

      case "ping": {
        if (!isNotification) sendMessage({ jsonrpc: "2.0", id, result: {} });
        return;
      }

      case "tools/list": {
        if (isNotification) return;
        sendMessage({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
        return;
      }

      case "tools/call": {
        if (isNotification) return;
        const toolName = params?.name;
        const args = params?.arguments ?? {};

        if (toolName === "recommend_components") {
          const data = recommendComponents(args.query, args.limit);
          sendMessage({
            jsonrpc: "2.0",
            id,
            result: { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] },
          });
          return;
        }

        if (toolName === "get_component_spec") {
          const res = getComponentSpec(args.slug);
          sendMessage({
            jsonrpc: "2.0",
            id,
            result: {
              content: [{ type: "text", text: res.text }],
              isError: res.isError || undefined,
            },
          });
          return;
        }

        if (toolName === "search_icons") {
          const data = searchIcons(args.query, args.limit);
          sendMessage({
            jsonrpc: "2.0",
            id,
            result: { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] },
          });
          return;
        }

        if (toolName === "validate_snippet") {
          const data = validateSnippet(args.code);
          sendMessage({
            jsonrpc: "2.0",
            id,
            result: { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] },
          });
          return;
        }

        sendMessage({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Unknown MCP tool: ${String(toolName)}` },
        });
        return;
      }

      case "resources/list": {
        if (isNotification) return;
        const registry = loadRegistry();
        const componentResources = Object.entries(registry.primitives ?? {}).map(([slug, entry]) => ({
          uri: `design-system://components/${slug}`,
          name: `${slug} Component Spec`,
          description: entry.definingConstraint,
          mimeType: "text/markdown",
        }));
        sendMessage({
          jsonrpc: "2.0",
          id,
          result: {
            resources: [
              {
                uri: "design-system://llms.txt",
                name: "llms.txt Index",
                description: "Concise agent routing index for all 57 primitives, contrast rules, and 8 skills.",
                mimeType: "text/markdown",
              },
              {
                uri: "design-system://registry.json",
                name: "Component Registry JSON",
                description: "Machine-readable primitive paths, exports, variants, and usage summaries.",
                mimeType: "application/json",
              },
              ...componentResources,
            ],
          },
        });
        return;
      }

      case "resources/read": {
        if (isNotification) return;
        const uri = String(params?.uri ?? "");
        if (uri === "design-system://llms.txt") {
          sendMessage({
            jsonrpc: "2.0",
            id,
            result: {
              contents: [{ uri, mimeType: "text/markdown", text: readRepoFile("public/llms.txt") }],
            },
          });
          return;
        }
        if (uri === "design-system://registry.json") {
          sendMessage({
            jsonrpc: "2.0",
            id,
            result: {
              contents: [
                { uri, mimeType: "application/json", text: readRepoFile("public/registry.json") },
              ],
            },
          });
          return;
        }
        if (uri.startsWith("design-system://components/")) {
          const slug = uri.slice("design-system://components/".length);
          const spec = getComponentSpec(slug);
          if (spec.isError) {
            sendMessage({ jsonrpc: "2.0", id, error: { code: -32602, message: spec.text } });
          } else {
            sendMessage({
              jsonrpc: "2.0",
              id,
              result: {
                contents: [{ uri, mimeType: "text/markdown", text: spec.text }],
              },
            });
          }
          return;
        }
        sendMessage({
          jsonrpc: "2.0",
          id,
          error: { code: -32602, message: `Unknown resource URI: ${uri}` },
        });
        return;
      }

      default:
        if (!isNotification) {
          sendMessage({
            jsonrpc: "2.0",
            id,
            error: { code: -32601, message: `Method not found: ${String(method)}` },
          });
        }
    }
  } catch (err) {
    process.stderr.write(`[mcp-server] Error handling ${String(method)}: ${String(err)}\n`);
    if (!isNotification) {
      sendMessage({
        jsonrpc: "2.0",
        id,
        error: { code: -32603, message: err instanceof Error ? err.message : String(err) },
      });
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const parsed = JSON.parse(trimmed);
    handleRequest(parsed);
  } catch (err) {
    process.stderr.write(`[mcp-server] Invalid JSON-RPC line: ${String(err)}\n`);
  }
});
