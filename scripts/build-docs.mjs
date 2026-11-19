import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";
import ts from "typescript";
import { z } from "zod";

const CHECK_MODE = process.argv.includes("--check");

const CATEGORY_ORDER = [
  "Actions & Toggles",
  "Forms & Input",
  "Navigation & Menus",
  "Overlays & Surfaces",
  "Data & Feedback",
  "Documentation & Schematics",
];

const CATEGORY_MAP = {
  // Actions & Toggles
  button: "Actions & Toggles",
  "copy-button": "Actions & Toggles",
  "markdown-toolbar": "Actions & Toggles",
  "segmented-control": "Actions & Toggles",
  "theme-toggle": "Actions & Toggles",
  toggle: "Actions & Toggles",
  "toggle-group": "Actions & Toggles",
  toolbar: "Actions & Toggles",

  // Forms & Input
  checkbox: "Forms & Input",
  combobox: "Forms & Input",
  field: "Forms & Input",
  "file-upload": "Forms & Input",
  input: "Forms & Input",
  "input-otp": "Forms & Input",
  "radio-group": "Forms & Input",
  select: "Forms & Input",
  slider: "Forms & Input",
  stepper: "Forms & Input",
  switch: "Forms & Input",
  textarea: "Forms & Input",

  // Navigation & Menus
  breadcrumb: "Navigation & Menus",
  "navigation-bar": "Navigation & Menus",
  pagination: "Navigation & Menus",
  tabs: "Navigation & Menus",

  // Overlays & Surfaces
  "alert-dialog": "Overlays & Surfaces",
  command: "Overlays & Surfaces",
  "context-menu": "Overlays & Surfaces",
  dialog: "Overlays & Surfaces",
  drawer: "Overlays & Surfaces",
  "dropdown-menu": "Overlays & Surfaces",
  "hover-card": "Overlays & Surfaces",
  popover: "Overlays & Surfaces",
  sheet: "Overlays & Surfaces",
  toast: "Overlays & Surfaces",
  tooltip: "Overlays & Surfaces",

  // Data & Feedback
  accordion: "Data & Feedback",
  avatar: "Data & Feedback",
  badge: "Data & Feedback",
  calendar: "Data & Feedback",
  card: "Data & Feedback",
  chart: "Data & Feedback",
  image: "Data & Feedback",
  kbd: "Data & Feedback",
  "number-ticker": "Data & Feedback",
  progress: "Data & Feedback",
  resizable: "Data & Feedback",
  "scroll-area": "Data & Feedback",
  skeleton: "Data & Feedback",
  table: "Data & Feedback",
  timeline: "Data & Feedback",
  tree: "Data & Feedback",

  // Documentation & Schematics
  callout: "Documentation & Schematics",
  "code-block": "Documentation & Schematics",
  "component-preview": "Documentation & Schematics",
  "diagram-frame": "Documentation & Schematics",
  "doc-layout": "Documentation & Schematics",
  "prop-table": "Documentation & Schematics",
};

const PRIMITIVE_SUMMARIES = {
  accordion: "Accessible vertical disclosure stack with smooth CSS height reveal.",
  "alert-dialog": "High-friction confirmation modal requiring explicit user acknowledgement.",
  avatar: "User identity emblem with deterministic OKLCH fallback and status pip.",
  badge: "Shrink-wrapped operational telemetry pill with optional pulse indicator.",
  breadcrumb: "Hierarchical location trail with kinetic directional separators.",
  button:
    "Tactile action primitive with 9 visual variants, pointerdown yield, and async promise lifecycle.",
  calendar: "Interactive month calendar grid with spring transition paging.",
  callout:
    "Editorial admonition surface with semantic OKLCH variants including defining constraints.",
  card: "Concentric container surface with specular rim lighting and inner card nesting.",
  chart: "Zero-dependency OKLCH vector sparklines, area visualisations, and bar charts.",
  checkbox: "Tri-state accessible checkbox with 44px touch hit target expansion.",
  "code-block":
    "Concentric syntax viewport with tabular line numbers, line highlights, and multi-tab switcher.",
  combobox: "Searchable autocomplete selector with keyboard roving navigation.",
  command: "Global command palette modal with instant filtering and keycap hints.",
  "component-preview":
    "Symmetric live fixture stage with preview/code switcher, viewport presets, and state reset.",
  "context-menu": "Secondary pointer context menu supporting nested groups and radio selections.",
  "copy-button": "Clipboard action control with spring state transition feedback.",
  "diagram-frame":
    "Accessible orthogonal SVG schematic container with semantic caption and expanded zoom modal.",
  dialog: "Focus-trapped modal dialogue with liquid backdrop blur and Escape dismissal.",
  "doc-layout":
    "Three-column reference macrostructure with bounded sidebar, 72ch measure, and scroll-spy TOC.",
  drawer: "Swipeable edge drawer with tactile drag handle for compact viewports.",
  "dropdown-menu": "Anchored menu surface with keyboard navigation, checkboxes, and shortcuts.",
  field: "Compound form field wrapper coordinating labels, hints, and min-h-[1lh] error slots.",
  "file-upload": "Drag-and-drop asset uploader with client-side validation and progress state.",
  "hover-card": "Rich contextual preview popover triggered on pointer hover or keyboard focus.",
  image: "Zero-CLS progressive media loader with smooth decoding fade.",
  input: "16px iOS zoom-safe text field with specular border and prefix/suffix slots.",
  "input-otp": "Segmented PIN code input with clipboard autofill and digit focus stepping.",
  kbd: "Tactile keycap micro-primitive styled with tabular monospace proportions.",
  "markdown-toolbar": "Rich Markdown formatting toolbar with 20 actions and list/table generators.",
  "navigation-bar":
    "Responsive top navigation rail with mega menus, columns, and bounded overflow harvesting.",
  "number-ticker": "Tabular numeral spring counter preventing horizontal digit jitter.",
  pagination: "Paged collection controller with compact numeric and worded triggers.",
  popover: "Collision-aware floating overlay anchored cleanly to its trigger.",
  progress: "Deterministic linear progress bar and radial gauge with smooth spring interpolation.",
  "prop-table":
    "Anti-crush TypeScript API reference table displaying props, types, defaults, and required pills.",
  "radio-group": "WAI-ARIA compliant mutual exclusion selector with animated indicator.",
  resizable: "Keyboard and drag split-pane layout controller for workbench interfaces.",
  "scroll-area": "Cross-browser custom scrollbar viewport preserving layout gutter parity.",
  "segmented-control":
    "Sliding pill mode switcher with compositor spring glide and frozen text metrics.",
  select: "Headless Base UI selector with keyboard navigation and liquid glass popup.",
  sheet: "Slide-over side panel supporting top, right, bottom, and left edges.",
  skeleton: "Zero-CLS dimensionally stable loading placeholder surface.",
  slider: "Direct-manipulation single and dual-thumb range control with value tooltip.",
  stepper: "Tactile numeric stepper with hold-to-accelerate progression.",
  switch: "44px accessible toggle switch with fluid thumb spring easing.",
  table: "Quiet chrome data table with strict tabular numerals.",
  tabs: "Fluid navigation tabs with spring underline indicator and zero geometry shift.",
  textarea: "Multi-line text input with subtle border-hugging focus contrast.",
  "theme-toggle": "Instant light/dark switcher suppressing cross-theme transition flashes.",
  timeline: "Chronological event feed with pulse nodes and packet connectors.",
  toast: "Non-blocking feedback toast with timed auto-dismiss and undo trigger.",
  toggle: "Two-state pressed action button adhering to zero-shift geometry.",
  "toggle-group": "Grouped toggle toolbar supporting single and multi-select roving focus.",
  toolbar: "Compound desktop toolbar housing aligned button groups and separators.",
  tooltip: "Compact contextual hint surface with configurable hover delay.",
  tree: "Hierarchical file and folder tree with spring expand/collapse motion.",
};

const DIRECTIVES_SUMMARY = [
  {
    number: 1,
    title: "Physical Yield on pointerdown",
    rule: "Interactive controls compress to scale 0.97-0.98 immediately on pointerdown.",
  },
  {
    number: 2,
    title: "Zero Layout Shifts",
    rule: "Never change border-width, font-weight, tracking, padding, or margin on hover/focus/active.",
  },
  {
    number: 3,
    title: "Tabular Numerals",
    rule: "Counters, prices, metrics, and line numbers declare tabular-nums.",
  },
  {
    number: 4,
    title: "Accessible Invariants",
    rule: "Every icon-only button carries an explicit aria-label; modals trap focus and dismiss on Escape.",
  },
  {
    number: 5,
    title: "Quiet Chrome & Anti-Pill",
    rule: "Avoid reflexive bordered card grids and decorative eyebrow pills above headings.",
  },
  {
    number: 6,
    title: "Concentric Corner Radii",
    rule: "Nested corners obey R_inner = max(0, R_outer - Padding).",
  },
  {
    number: 7,
    title: "Anti-Crush Architecture",
    rule: "Declare explicit page archetypes, W_col >= 340px, and shrink-0 whitespace-nowrap pills.",
  },
  {
    number: 8,
    title: "Reversible Kinetic Affordances",
    rule: "Icons animate along mechanical paths that return cleanly to rest on pointer leave.",
  },
  {
    number: 9,
    title: "Component Dimension Invariants",
    rule: "Never override h-*/w-* variants with trailing size-full or size-auto inside cn().",
  },
  {
    number: 10,
    title: "Optical Icon Proportion",
    rule: "Pass explicit numeric size={...} matching 40% to 50% of parent height.",
  },
  {
    number: 11,
    title: "Perceptual OKLCH & Dual Contrast",
    rule: "Gradients interpolate in oklch with WCAG 2.2 AA and WCAG 3 APCA contrast floors.",
  },
  {
    number: 12,
    title: "British English & Clean Prose",
    rule: "Zero AI em dashes, zero banned marketing buzzwords, strict British English spelling.",
  },
  {
    number: 13,
    title: "Origin Anonymity",
    rule: "Present all guidelines, tokens, and components as self-contained standards of this system.",
  },
  {
    number: 14,
    title: "Telemetry Indicator Cadence",
    rule: "Pulse animations rest >= 60% of cycle at opacity 0 and animate compositor properties only.",
  },
  {
    number: 15,
    title: "Brand Truth & Fact Integrity",
    rule: "Never invent synthetic metrics, fake testimonials, or unverified brand hex colours.",
  },
  {
    number: 16,
    title: "Micro-Finish & Baseline Stability",
    rule: "Reserve min-h-[1lh] for form helper/error slots and cap containers at 1440px.",
  },
  {
    number: 17,
    title: "Evidence Before Assertions",
    rule: "Execute empirical verification gates and confirm exit code 0 before reporting done.",
  },
  {
    number: 18,
    title: "Autonomous Rulings",
    rule: "Record minor design-engineering rulings and maintain forward build velocity.",
  },
];

const COMPONENT_SPEC_SCHEMA = z.object({
  slug: z.string().min(1),
  definingConstraint: z.string().min(20),
  whenToUse: z.array(z.string().min(8)).min(2).max(4),
  whenNotToUse: z
    .array(
      z.object({
        primitive: z.string().min(1),
        reason: z.string().min(8),
      })
    )
    .min(1)
    .max(4),
  anatomy: z.string().min(4),
  a11yContract: z.array(z.string().min(8)).min(2).max(4),
  doAndDont: z
    .array(
      z.object({
        do: z.string().min(8),
        dont: z.string().min(8),
      })
    )
    .min(2)
    .max(4),
  slotsAndPairing: z.string().min(12),
  exampleExport: z.string().min(1),
  exampleFile: z.string().min(1),
});

function sanitizeProse(text) {
  if (!text) return "";
  return text
    .replace(/\u2014/g, ", ")
    .replace(/&mdash;/g, ", ")
    .replace(/(?<=[a-zA-Z0-9])\s*--\s*(?=[a-zA-Z0-9])/g, ": ")
    .replace(/\s+/g, " ")
    .trim();
}

function toTitleCase(slug) {
  return slug
    .split("-")
    .map((part) => (part === "otp" ? "OTP" : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

function getPackageName(specifier) {
  if (!specifier || specifier.startsWith(".") || specifier.startsWith("@/")) return null;
  if (specifier.startsWith("@")) {
    const parts = specifier.split("/");
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : specifier;
  }
  return specifier.split("/")[0];
}

function getLeadingComment(sourceText, node) {
  const ranges = ts.getLeadingCommentRanges(sourceText, node.pos);
  if (!ranges || ranges.length === 0) return "";
  const last = ranges[ranges.length - 1];
  const raw = sourceText.slice(last.pos, last.end);
  return sanitizeProse(
    raw
      .replace(/^\/\*\*?/, "")
      .replace(/\*\/$/, "")
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, "").replace(/^\s*\/\/\s?/, ""))
      .filter((line) => !line.startsWith("@"))
      .join(" ")
  );
}

async function loadComponentSpecs(expectedSlugs) {
  const specsDir = "src/docs/specs";
  if (!fs.existsSync(specsDir)) {
    throw new Error(`Missing component specs directory: ${specsDir}`);
  }

  const merged = {};
  const specFiles = fs
    .readdirSync(specsDir)
    .filter((name) => name.endsWith(".ts") && name !== "index.ts")
    .sort();

  for (const name of specFiles) {
    const fullPath = path.join(specsDir, name);
    const tsSource = fs.readFileSync(fullPath, "utf8");
    const transpiled = ts.transpileModule(tsSource, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText;

    const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled, "utf8").toString("base64")}`;
    const imported = await import(moduleUrl);
    const map = Object.values(imported)[0];
    if (!map || typeof map !== "object") continue;

    for (const [slug, spec] of Object.entries(map)) {
      const parsed = COMPONENT_SPEC_SCHEMA.safeParse(spec);
      if (!parsed.success) {
        throw new Error(
          `Invalid ComponentSpec '${slug}' in ${fullPath}: ${parsed.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; ")}`
        );
      }
      if (parsed.data.slug !== slug) {
        throw new Error(`Mismatched spec key '${slug}' vs slug '${parsed.data.slug}' in ${fullPath}`);
      }
      merged[slug] = parsed.data;
    }
  }

  for (const slug of expectedSlugs) {
    if (!merged[slug]) {
      throw new Error(
        `Missing ComponentSpec for exported primitive '${slug}'. Add it under ${specsDir}/. `
      );
    }
  }

  return merged;
}

const exampleAstCache = new Map();

function getParsedExampleFile(filePath) {
  if (!exampleAstCache.has(filePath)) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Referenced exampleFile does not exist: ${filePath}`);
    }
    const text = fs.readFileSync(filePath, "utf8");
    const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true);
    exampleAstCache.set(filePath, { text, sf });
  }
  return exampleAstCache.get(filePath);
}

function collectIdentifiers(node, out = new Set()) {
  if (ts.isIdentifier(node)) {
    out.add(node.text);
  }
  ts.forEachChild(node, (child) => {
    collectIdentifiers(child, out);
  });
  return out;
}

function extractExampleRecipe(exampleFile, exampleExport) {
  const { text, sf } = getParsedExampleFile(exampleFile);

  const imports = [];
  const helpers = new Map();
  let targetFnNode = null;

  for (const stmt of sf.statements) {
    if (ts.isImportDeclaration(stmt)) {
      imports.push(stmt);
      continue;
    }

    if (ts.isFunctionDeclaration(stmt) && stmt.name) {
      if (stmt.name.text === exampleExport) {
        targetFnNode = stmt;
      } else {
        helpers.set(stmt.name.text, stmt);
      }
      continue;
    }

    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          helpers.set(decl.name.text, stmt);
        }
      }
    }
  }

  if (!targetFnNode) {
    throw new Error(`Could not locate exported function '${exampleExport}' in ${exampleFile}.`);
  }

  const usedIds = collectIdentifiers(targetFnNode);
  const includedHelpers = [];
  const visitedHelperStmts = new Set();

  let added = true;
  while (added) {
    added = false;
    for (const [helperName, helperStmt] of helpers.entries()) {
      if (usedIds.has(helperName) && !visitedHelperStmts.has(helperStmt)) {
        visitedHelperStmts.add(helperStmt);
        includedHelpers.push(helperStmt);
        collectIdentifiers(helperStmt, usedIds);
        added = true;
      }
    }
  }

  const importLines = [];
  for (const imp of imports) {
    const clause = imp.importClause;
    if (!clause) continue;
    const modulePath = imp.moduleSpecifier.getText(sf);

    const keptNamed = [];
    let keepDefault = false;
    let keepNs = false;

    if (clause.name && usedIds.has(clause.name.text)) {
      keepDefault = true;
    }
    if (clause.namedBindings) {
      if (ts.isNamespaceImport(clause.namedBindings)) {
        if (usedIds.has(clause.namedBindings.name.text)) {
          keepNs = true;
        }
      } else if (ts.isNamedImports(clause.namedBindings)) {
        for (const elem of clause.namedBindings.elements) {
          if (usedIds.has(elem.name.text)) {
            keptNamed.push(elem.getText(sf));
          }
        }
      }
    }

    if (keepNs && clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      importLines.push(`import * as ${clause.namedBindings.name.text} from ${modulePath};`);
    } else if (keepDefault && keptNamed.length > 0 && clause.name) {
      importLines.push(
        `import ${clause.name.text}, { ${keptNamed.join(", ")} } from ${modulePath};`
      );
    } else if (keepDefault && clause.name) {
      importLines.push(`import ${clause.name.text} from ${modulePath};`);
    } else if (keptNamed.length > 0) {
      importLines.push(`import { ${keptNamed.join(", ")} } from ${modulePath};`);
    }
  }

  const helperBlocks = includedHelpers.map((node) => text.slice(node.getStart(sf), node.end).trim());
  const fnBlock = text.slice(targetFnNode.getStart(sf), targetFnNode.end).trim();

  return [importLines.join("\n"), ...helperBlocks, fnBlock].filter(Boolean).join("\n\n");
}

function extractPrimitiveInfo(slug, spec) {
  const singleFile = path.join("src/components/ui", `${slug}.tsx`);
  const dirPath = path.join("src/components/ui", slug);
  const entryPath = fs.existsSync(singleFile)
    ? `src/components/ui/${slug}.tsx`
    : `src/components/ui/${slug}/index.ts`;

  const files = fs.existsSync(singleFile)
    ? [singleFile]
    : fs
        .readdirSync(dirPath)
        .filter((name) => /\.(ts|tsx)$/.test(name))
        .sort()
        .map((name) => path.join(dirPath, name));

  const dependencies = new Set();
  const exportsSet = new Set();
  const variantsSet = new Set();
  const sizesSet = new Set();
  const propsMap = new Map();

  for (const file of files) {
    const code = fs.readFileSync(file, "utf8");
    const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);

    function visit(node) {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const pkg = getPackageName(node.moduleSpecifier.text);
        if (pkg) dependencies.add(pkg);
      }

      if (ts.isVariableStatement(node)) {
        const isExported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
        if (isExported) {
          for (const decl of node.declarationList.declarations) {
            if (ts.isIdentifier(decl.name)) exportsSet.add(decl.name.text);
          }
        }
      }

      if (ts.isFunctionDeclaration(node) && node.name) {
        const isExported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
        if (isExported) exportsSet.add(node.name.text);
      }

      if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const elem of node.exportClause.elements) {
          if (!elem.isTypeOnly) exportsSet.add(elem.name.text);
        }
      }

      if (
        (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
        node.name.text.endsWith("Props")
      ) {
        const members = ts.isInterfaceDeclaration(node)
          ? node.members
          : ts.isTypeLiteralNode(node.type)
            ? node.type.members
            : [];

        for (const member of members) {
          if (!ts.isPropertySignature(member) || !member.name) continue;
          const propName = member.name.getText(sf).replace(/["']/g, "");
          if (!propName || propName.startsWith("__")) continue;
          const typeStr = member.type ? sanitizeProse(member.type.getText(sf)) : "unknown";
          const required = !member.questionToken;
          const description =
            getLeadingComment(code, member) ||
            `Configures ${propName} on ${toTitleCase(slug)}.`;

          const existing = propsMap.get(propName);
          if (!existing || description.length > existing.description.length) {
            propsMap.set(propName, {
              name: propName,
              type: typeStr.length > 96 ? `${typeStr.slice(0, 93)}...` : typeStr,
              required,
              description,
            });
          }
        }
      }

      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "cva"
      ) {
        const configArg = node.arguments[1];
        if (configArg && ts.isObjectLiteralExpression(configArg)) {
          const variantsProp = configArg.properties.find(
            (p) => ts.isPropertyAssignment(p) && p.name.getText(sf) === "variants"
          );
          if (
            variantsProp &&
            ts.isPropertyAssignment(variantsProp) &&
            ts.isObjectLiteralExpression(variantsProp.initializer)
          ) {
            for (const group of variantsProp.initializer.properties) {
              if (
                ts.isPropertyAssignment(group) &&
                ts.isObjectLiteralExpression(group.initializer)
              ) {
                const groupName = group.name.getText(sf);
                for (const item of group.initializer.properties) {
                  if (!item.name) continue;
                  const optionName = item.name.getText(sf).replace(/["']/g, "");
                  if (groupName === "variant") variantsSet.add(optionName);
                  if (groupName === "size") sizesSet.add(optionName);
                }
              }
            }
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sf);
  }

  const exampleCode = extractExampleRecipe(spec.exampleFile, spec.exampleExport);

  return {
    slug,
    name: toTitleCase(slug),
    category: CATEGORY_MAP[slug] ?? "Data & Feedback",
    path: entryPath,
    docPath: `public/docs/components/${slug}.md`,
    summary: PRIMITIVE_SUMMARIES[slug] ?? `${toTitleCase(slug)} component primitive.`,
    definingConstraint: spec.definingConstraint,
    whenToUse: spec.whenToUse,
    whenNotToUse: spec.whenNotToUse,
    anatomy: spec.anatomy,
    a11yContract: spec.a11yContract,
    doAndDont: spec.doAndDont,
    slotsAndPairing: spec.slotsAndPairing,
    exampleCode,
    dependencies: [...dependencies].sort(),
    exports: [...exportsSet].sort(),
    variants: [...variantsSet],
    sizes: [...sizesSet],
    props: [...propsMap.values()].sort(
      (a, b) => Number(b.required) - Number(a.required) || a.name.localeCompare(b.name)
    ),
  };
}

// Dual-Engine OKLCH Contrast Math mirroring src/lib/contrast.ts
function parseOklch(str) {
  const m = str?.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i);
  if (!m) return null;
  return { l: parseFloat(m[1]), c: parseFloat(m[2]), h: parseFloat(m[3]) };
}

function oklchToLinearRgb(l, c, h) {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;
  return {
    r: Math.min(1, Math.max(0, +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3)),
    g: Math.min(1, Math.max(0, -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3)),
    b: Math.min(1, Math.max(0, -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3)),
  };
}

function evaluatePair(textColor, bgColor, context = "button") {
  const t = parseOklch(textColor);
  const bg = parseOklch(bgColor);
  if (!t || !bg) return null;

  const trgb = oklchToLinearRgb(t.l, t.c, t.h);
  const brgb = oklchToLinearRgb(bg.l, bg.c, bg.h);

  const wcagLum = (c) => 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  const lum1 = wcagLum(trgb);
  const lum2 = wcagLum(brgb);
  const wcag2Ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

  const apcaY = (c) => 0.2126729 * c.r + 0.7151522 * c.g + 0.072175 * c.b;
  const clamp = (y) => (y > 0.022 ? y : y + Math.pow(0.022 - y, 1.414));
  const yTxt = clamp(apcaY(trgb));
  const yBg = clamp(apcaY(brgb));
  let lc = 0;
  if (Math.abs(yBg - yTxt) >= 0.0005) {
    lc =
      yBg > yTxt
        ? (Math.pow(yBg, 0.56) - Math.pow(yTxt, 0.62)) * 114
        : (Math.pow(yBg, 0.65) - Math.pow(yTxt, 0.57)) * 114;
  }

  const absLc = Math.abs(lc);
  const apcaThreshold = context === "body" ? 75 : context === "ui-control" ? 45 : 60;
  const wcag2Target = context === "ui-control" ? 3.0 : 4.5;

  return {
    wcag2Ratio: Number(wcag2Ratio.toFixed(2)),
    wcag2PassAA: wcag2Ratio >= wcag2Target,
    apcaLc: Number(lc.toFixed(1)),
    absApcaLc: Number(absLc.toFixed(1)),
    apcaPass: absLc >= apcaThreshold,
    dualPassed: absLc >= apcaThreshold && wcag2Ratio >= wcag2Target,
  };
}

function parseCssBlockVars(cssText, blockRegex) {
  const m = cssText.match(blockRegex);
  if (!m) return {};
  const vars = {};
  for (const propMatch of m[1].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    vars[propMatch[1]] = propMatch[2].replace(/\s+/g, " ").trim();
  }
  return vars;
}

function extractCssTokensAndContrast() {
  const css = fs.readFileSync("src/index.css", "utf8");
  const lightVars = parseCssBlockVars(css, /:root\s*\{([\s\S]*?)\n\s*\}/);
  const darkVars = parseCssBlockVars(css, /\.dark\s*\{([\s\S]*?)\n\s*\}/);

  const tokenPairs = [
    { id: "body-canvas", label: "Body Text on Canvas", fg: "--foreground", bg: "--background", context: "body" },
    { id: "card-surface", label: "Card Foreground on Card", fg: "--card-foreground", bg: "--card", context: "body" },
    { id: "primary-action", label: "Primary Button Ink", fg: "--primary-foreground", bg: "--primary", context: "button" },
    { id: "secondary-action", label: "Secondary Button Ink", fg: "--secondary-foreground", bg: "--secondary", context: "button" },
    { id: "muted-copy", label: "Muted Label on Canvas", fg: "--muted-foreground", bg: "--background", context: "ui-control" },
    { id: "destructive-intent", label: "Destructive Intent", fg: "--destructive-foreground", bg: "--destructive", context: "button" },
    { id: "success-intent", label: "Success Intent", fg: "--success-foreground", bg: "--success", context: "button" },
    { id: "warning-intent", label: "Warning Intent", fg: "--warning-foreground", bg: "--warning", context: "button" },
    { id: "info-intent", label: "Info Intent", fg: "--info-foreground", bg: "--info", context: "button" },
  ];

  const contrastPairs = [];
  for (const mode of [
    { name: "light", vars: lightVars },
    { name: "dark", vars: darkVars },
  ]) {
    for (const pair of tokenPairs) {
      const fgVal = mode.vars[pair.fg];
      const bgVal = mode.vars[pair.bg];
      const evalResult = evaluatePair(fgVal, bgVal, pair.context);
      if (evalResult) {
        contrastPairs.push({
          id: `${mode.name}-${pair.id}`,
          mode: mode.name,
          label: pair.label,
          foregroundToken: pair.fg,
          foregroundValue: fgVal,
          backgroundToken: pair.bg,
          backgroundValue: bgVal,
          context: pair.context,
          ...evalResult,
        });
      }
    }
  }

  return { contrastPairs };
}

function extractSkills() {
  if (!fs.existsSync("skills")) return [];
  const dirs = fs
    .readdirSync("skills", { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const skills = [];
  for (const dir of dirs) {
    const skillPath = `skills/${dir}/SKILL.md`;
    if (!fs.existsSync(skillPath)) continue;
    const raw = fs.readFileSync(skillPath, "utf8");
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    const fm = fmMatch ? fmMatch[1] : "";
    const nameMatch = fm.match(/^name:\s*(.+)$/m);
    const descMatch = fm.match(/^description:\s*(.+)$/m);
    const verMatch = fm.match(/^\s*version:\s*"?([^"\n]+)"?$/m);
    const tagsMatch = fm.match(/tags:\s*\[([^\]]+)\]/);

    skills.push({
      name: (nameMatch?.[1] ?? dir).trim(),
      path: skillPath,
      version: (verMatch?.[1] ?? "1.0.0").trim(),
      description: sanitizeProse((descMatch?.[1] ?? "").replace(/^["']|["']$/g, "")),
      tags: tagsMatch
        ? tagsMatch[1]
            .split(",")
            .map((t) => t.trim().replace(/^["']|["']$/g, ""))
            .filter(Boolean)
        : [],
    });
  }
  return skills;
}

function extractDocsPages() {
  if (!fs.existsSync("docs")) return [];
  return fs
    .readdirSync("docs")
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => {
      const filePath = `docs/${name}`;
      const raw = fs.readFileSync(filePath, "utf8");
      const titleMatch = raw.match(/^#\s+(.+)$/m);
      const headings = [...raw.matchAll(/^##\s+(.+)$/gm)].map((m) => sanitizeProse(m[1]));
      const words = raw.trim().split(/\s+/).filter(Boolean).length;
      return {
        slug: name.replace(/\.md$/, ""),
        path: filePath,
        title: sanitizeProse(titleMatch?.[1] ?? name),
        headings,
        wordCount: words,
      };
    });
}

function countKineticIcons() {
  if (!fs.existsSync("src/components/icons")) return 0;
  return fs
    .readdirSync("src/components/icons")
    .filter((name) => name.endsWith(".tsx") && name !== "index.ts").length;
}

async function formatWithPrettier(content, filepath) {
  const config = await prettier.resolveConfig(filepath);
  return prettier.format(content, { ...(config ?? {}), filepath });
}

function escapeTableCell(str) {
  return String(str).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function buildComponentMarkdown(primitive, allSlugsSet) {
  const moduleImport = primitive.path
    .replace(/^src\//, "@/")
    .replace(/\.tsx?$/, "")
    .replace(/\/index$/, "");

  const siblingRows = primitive.whenNotToUse.map((alt) => {
    const linkTarget = allSlugsSet.has(alt.primitive)
      ? `[${alt.primitive}](${alt.primitive}.md)`
      : `\`${alt.primitive}\``;
    return `| ${linkTarget} | ${escapeTableCell(alt.reason)} |`;
  });

  const propRows =
    primitive.props.length > 0
      ? [
          "| Prop | Type | Required | Description |",
          "| :--- | :--- | :--- | :--- |",
          ...primitive.props.map(
            (p) =>
              `| \`${escapeTableCell(p.name)}\` | \`${escapeTableCell(p.type)}\` | ${p.required ? "Yes" : "No"} | ${escapeTableCell(p.description)} |`
          ),
        ]
      : [
          "Inherits standard React HTML or Base UI primitive attributes with zero required custom props.",
        ];

  const lines = [
    `# ${primitive.name}`,
    "",
    `> ${primitive.summary}`,
    "",
    `- **Category**: ${primitive.category}`,
    `- **Import**: \`import { ${primitive.exports.slice(0, 4).join(", ")} } from "${moduleImport}";\``,
    `- **Source**: \`${primitive.path}\``,
    `- **Dependencies**: ${primitive.dependencies.map((d) => `\`${d}\``).join(", ") || "None"}`,
    primitive.variants.length > 0
      ? `- **Variants**: ${primitive.variants.map((v) => `\`${v}\``).join(", ")}`
      : null,
    primitive.sizes.length > 0
      ? `- **Sizes**: ${primitive.sizes.map((s) => `\`${s}\``).join(", ")}`
      : null,
    "",
    "## Defining Constraint",
    "",
    primitive.definingConstraint,
    "",
    "## When to Use",
    "",
    ...primitive.whenToUse.map((item) => `- ${item}`),
    "",
    "## When Not to Use (Use Instead)",
    "",
    "| Alternative | Reason |",
    "| :--- | :--- |",
    ...siblingRows,
    "",
    "## Anatomy",
    "",
    "```tsx",
    primitive.anatomy,
    "```",
    "",
    "## Verified Example",
    "",
    "```tsx",
    primitive.exampleCode,
    "```",
    "",
    "## Props Reference",
    "",
    ...propRows,
    "",
    "## Accessibility Contract",
    "",
    ...primitive.a11yContract.map((rule) => `- ${rule}`),
    "",
    "## Do and Don't",
    "",
    "| Do | Don't |",
    "| :--- | :--- |",
    ...primitive.doAndDont.map(
      (row) => `| ${escapeTableCell(row.do)} | ${escapeTableCell(row.dont)} |`
    ),
    "",
    "## Slots & Pairing",
    "",
    primitive.slotsAndPairing,
    "",
  ];

  return lines.filter((l) => l !== null).join("\n");
}

function buildRegistryJson(pkgJson, primitives) {
  const registryPrimitives = {};
  for (const item of primitives) {
    const entry = {
      path: item.path,
      docPath: item.docPath,
      category: item.category,
      definingConstraint: item.definingConstraint,
      whenToUse: item.whenToUse,
      whenNotToUse: item.whenNotToUse,
      anatomy: item.anatomy,
      dependencies: item.dependencies,
      exports: item.exports,
    };
    if (item.variants.length > 0) entry.variants = item.variants;
    if (item.sizes.length > 0) entry.sizes = item.sizes;
    registryPrimitives[item.slug] = entry;
  }

  return JSON.stringify(
    {
      $schema: "https://design-system.edge.internal/registry-schema.json",
      name: "antigravity-design-system",
      version: pkgJson.version,
      framework: "react-19",
      styling: "tailwindcss-v4",
      primitives: registryPrimitives,
    },
    null,
    2
  );
}

function buildLlmsTxt({ primitives, iconCount, skills }) {
  const byCategory = new Map(CATEGORY_ORDER.map((c) => [c, []]));
  for (const p of primitives) {
    const list = byCategory.get(p.category) ?? [];
    list.push(p);
    byCategory.set(p.category, list);
  }

  const lines = [
    "# Antigravity Design System",
    "",
    "> An agent-native, human-centric design system built at the intersection of visual precision, physical intuition, and rigorous engineering. Powered by React 19, Base UI, Motion, and Tailwind CSS v4.",
    "",
    "## Progressive Agent Retrieval",
    "",
    "- **Component Index**: Read `public/registry.json` or `public/llms.txt` first, then open only the required `public/docs/components/<slug>.md` manuals.",
    "- **Local MCP Server**: Run `npm run mcp` for tool-based `recommend_components`, `get_component_spec`, `search_icons`, and `validate_snippet` queries.",
    "",
    "## Component Selection Decision Matrix",
    "",
    "| Task / UI Intent | Primary Choice | Avoid Confusing With | Building-Block Spec |",
    "| :--- | :--- | :--- | :--- |",
    "| Destructive confirmation modal | `AlertDialog` | `Dialog` | `public/docs/components/alert-dialog.md` |",
    "| Standard secondary form modal | `Dialog` | `AlertDialog`, `Sheet` | `public/docs/components/dialog.md` |",
    "| Slide-over inspector or settings panel | `Sheet` | `Drawer`, `Dialog` | `public/docs/components/sheet.md` |",
    "| Compact 2 to 5 option view switcher | `SegmentedControl` | `Tabs`, `Select` | `public/docs/components/segmented-control.md` |",
    "| Multi-panel horizontal tab sections | `Tabs` | `SegmentedControl` | `public/docs/components/tabs.md` |",
    "| Searchable large option list | `Combobox` | `Select`, `Command` | `public/docs/components/combobox.md` |",
    "| Global `⌘K` action palette | `Command` | `Combobox` | `public/docs/components/command.md` |",
    "| Immediate live boolean setting | `Switch` | `Checkbox`, `Toggle` | `public/docs/components/switch.md` |",
    "| Validated form input wrapper | `Field` | `Callout` | `public/docs/components/field.md` |",
    "| Operational status / count chip | `Badge` | `Callout` | `public/docs/components/badge.md` |",
    "| Design invariant / warning callout | `Callout` | `Badge`, `Toast` | `public/docs/components/callout.md` |",
    "| Runnable UI fixture with Code view | `ComponentPreview` | `CodeBlock` | `public/docs/components/component-preview.md` |",
    "| Documentation shell & scroll-spy TOC | `DocLayout` | `NavigationBar` | `public/docs/components/doc-layout.md` |",
    "",
    "## Core Architectural Directives (18 Rules)",
    "",
    ...DIRECTIVES_SUMMARY.map(
      (d) => `- [Directive ${d.number}: ${d.title}](file:///AGENTS.md): ${d.rule}`
    ),
    "",
    `## UI Primitives Matrix (${primitives.length} Components)`,
    "",
  ];

  for (const category of CATEGORY_ORDER) {
    const items = byCategory.get(category) ?? [];
    if (items.length === 0) continue;
    lines.push(`### ${category} (${items.length})`);
    for (const item of items) {
      const moduleImport = item.path
        .replace(/^src\//, "@/")
        .replace(/\.tsx?$/, "")
        .replace(/\/index$/, "");
      lines.push(
        `- \`${item.name}\` (\`${moduleImport}\` | spec: \`${item.docPath}\`): ${item.summary}`
      );
    }
    lines.push("");
  }

  lines.push(`## Kinetic Icons (${iconCount} Primitives)`);
  lines.push("");
  lines.push(
    `Access ${iconCount} mechanical animated icons in \`@/components/icons\`. Always pass an explicit numeric \`size={...}\` prop matching 40% to 50% of parent control height.`
  );
  lines.push("");
  lines.push(`## Agent Skills (${skills.length} Registered Workflows)`);
  lines.push("");
  for (const skill of skills) {
    lines.push(`- \`${skill.name}\` (\`${skill.path}\`): ${skill.description}`);
  }
  lines.push("");
  lines.push("## Verification & Tooling Commands");
  lines.push("");
  lines.push(
    "- `npm run docs:build`: Regenerates docs-manifest.ts, 57 per-component markdown specs, registry.json, llms.txt, and llms-full.txt."
  );
  lines.push(
    "- `npm run docs:check`: Verifies generated documentation artifacts match current AST, ComponentSpecs, and CSS tokens."
  );
  lines.push(
    "- `npm run mcp`: Starts local stdio MCP server exposing component recommendations, specs, icon search, and snippet validation."
  );
  lines.push(
    "- `npm run check`: Executes docs:check, invariants gate, Oxlint, Vitest accessibility tests, and Vite production build."
  );
  lines.push("");

  return lines.join("\n");
}

function buildLlmsFullTxt({ primitives, iconCount, skills, contrastPairs }) {
  const lightPairs = contrastPairs.filter((p) => p.mode === "light");
  const darkPairs = contrastPairs.filter((p) => p.mode === "dark");

  const lines = [
    "# Antigravity Design System: Full Reference Manual",
    "",
    "> An agent-native, human-centric design system standard built for high visual precision, physical intuition, and rigorous software engineering.",
    "",
    "## 1. Eighteen Core Directives",
    "",
    ...DIRECTIVES_SUMMARY.map((d) => `${d.number}. ${d.title}: ${d.rule}`),
    "",
    "## 2. OKLCH Token & Dual-Engine Contrast Ledger",
    "",
    "### Light Mode Pairs",
    ...lightPairs.map(
      (p) =>
        `- ${p.label} (${p.foregroundToken} on ${p.backgroundToken}): ${p.foregroundValue} on ${p.backgroundValue} | WCAG 2.2 ${p.wcag2Ratio}:1 | APCA Lc ${p.absApcaLc} | ${p.dualPassed ? "PASS" : "CHECK"}`
    ),
    "",
    "### Dark Mode Pairs",
    ...darkPairs.map(
      (p) =>
        `- ${p.label} (${p.foregroundToken} on ${p.backgroundToken}): ${p.foregroundValue} on ${p.backgroundValue} | WCAG 2.2 ${p.wcag2Ratio}:1 | APCA Lc ${p.absApcaLc} | ${p.dualPassed ? "PASS" : "CHECK"}`
    ),
    "",
    "## 3. Fluid Motion Springs",
    "",
    '- Tactile: `{ type: "spring", stiffness: 600, damping: 30, mass: 0.8 }`',
    '- Dialog: `{ type: "spring", stiffness: 350, damping: 35, mass: 1.0 }`',
    '- Snappy: `{ type: "spring", stiffness: 550, damping: 35, mass: 0.6 }`',
    '- Micro: `{ type: "spring", stiffness: 700, damping: 40 }`',
    '- Squishy: `{ type: "spring", stiffness: 420, damping: 24, mass: 0.8 }`',
    "",
    `## 4. Primitive Building-Block Reference (${primitives.length} Components, ${iconCount} Kinetic Icons)`,
    "",
  ];

  for (const p of primitives) {
    const moduleImport = p.path
      .replace(/^src\//, "@/")
      .replace(/\.tsx?$/, "")
      .replace(/\/index$/, "");
    const variantsText = p.variants.length > 0 ? ` | Variants: ${p.variants.join(", ")}` : "";
    const sizesText = p.sizes.length > 0 ? ` | Sizes: ${p.sizes.join(", ")}` : "";
    const propsText =
      p.props.length > 0 ? ` | Props: ${p.props.slice(0, 8).map((x) => x.name).join(", ")}` : "";
    lines.push(
      `### ${p.name} (\`${moduleImport}\`)`,
      `- Spec: \`${p.docPath}\``,
      `- Defining Constraint: ${p.definingConstraint}`,
      `- Use When: ${p.whenToUse.join(" ")}`,
      `- Anatomy: \`${p.anatomy.replace(/\n\s*/g, " ")}\``,
      `- Metadata: ${p.summary}${variantsText}${sizesText}${propsText}`,
      ""
    );
  }

  lines.push(`## 5. Workspace Agent Skills (${skills.length})`);
  lines.push("");
  for (const s of skills) {
    lines.push(`- ${s.name} (${s.path}, v${s.version}): ${s.description}`);
  }
  lines.push("");

  return lines.join("\n");
}

function buildDocsManifestTs(manifest) {
  return [
    "// AUTO-GENERATED FILE BY scripts/build-docs.mjs. DO NOT EDIT MANUALLY.",
    "// Run `npm run docs:build` after adding or modifying UI primitives, specs, OKLCH tokens, or skills.",
    "",
    "export interface DocPropSpec {",
    "  name: string;",
    "  type: string;",
    "  required: boolean;",
    "  description: string;",
    "}",
    "",
    "export interface DocSiblingRule {",
    "  primitive: string;",
    "  reason: string;",
    "}",
    "",
    "export interface DocDoDontRule {",
    "  do: string;",
    "  dont: string;",
    "}",
    "",
    "export interface DocPrimitiveEntry {",
    "  slug: string;",
    "  name: string;",
    "  category: string;",
    "  path: string;",
    "  docPath: string;",
    "  summary: string;",
    "  definingConstraint: string;",
    "  whenToUse: string[];",
    "  whenNotToUse: DocSiblingRule[];",
    "  anatomy: string;",
    "  a11yContract: string[];",
    "  doAndDont: DocDoDontRule[];",
    "  slotsAndPairing: string;",
    "  exampleCode: string;",
    "  dependencies: string[];",
    "  exports: string[];",
    "  variants: string[];",
    "  sizes: string[];",
    "  props: DocPropSpec[];",
    "}",
    "",
    "export interface DocTokenContrastPair {",
    "  id: string;",
    '  mode: "light" | "dark";',
    "  label: string;",
    "  foregroundToken: string;",
    "  foregroundValue: string;",
    "  backgroundToken: string;",
    "  backgroundValue: string;",
    "  context: string;",
    "  wcag2Ratio: number;",
    "  wcag2PassAA: boolean;",
    "  apcaLc: number;",
    "  absApcaLc: number;",
    "  apcaPass: boolean;",
    "  dualPassed: boolean;",
    "}",
    "",
    "export interface DocSkillEntry {",
    "  name: string;",
    "  path: string;",
    "  version: string;",
    "  description: string;",
    "  tags: string[];",
    "}",
    "",
    "export interface DocMarkdownPage {",
    "  slug: string;",
    "  path: string;",
    "  title: string;",
    "  headings: string[];",
    "  wordCount: number;",
    "}",
    "",
    "export interface DocsManifest {",
    "  version: string;",
    "  primitiveCount: number;",
    "  iconCount: number;",
    "  skillCount: number;",
    "  categories: string[];",
    "  primitives: DocPrimitiveEntry[];",
    "  contrastPairs: DocTokenContrastPair[];",
    "  skills: DocSkillEntry[];",
    "  docsPages: DocMarkdownPage[];",
    "}",
    "",
    `export const docsManifest: DocsManifest = ${JSON.stringify(manifest, null, 2)};`,
    "",
  ].join("\n");
}

async function main() {
  const pkgJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const uiIndex = fs.readFileSync("src/components/ui/index.ts", "utf8");
  const slugs = [...uiIndex.matchAll(/export \* from "\.\/([^"]+)";/g)]
    .map((m) => m[1])
    .sort((a, b) => a.localeCompare(b));

  const specsBySlug = await loadComponentSpecs(slugs);
  const primitives = slugs.map((slug) => extractPrimitiveInfo(slug, specsBySlug[slug]));
  const allSlugsSet = new Set(slugs);

  const { contrastPairs } = extractCssTokensAndContrast();
  const skills = extractSkills();
  const docsPages = extractDocsPages();
  const iconCount = countKineticIcons();

  const manifest = {
    version: pkgJson.version,
    primitiveCount: primitives.length,
    iconCount,
    skillCount: skills.length,
    categories: CATEGORY_ORDER,
    primitives,
    contrastPairs,
    skills,
    docsPages,
  };

  const outputs = [
    {
      file: "src/generated/docs-manifest.ts",
      content: await formatWithPrettier(
        buildDocsManifestTs(manifest),
        "src/generated/docs-manifest.ts"
      ),
    },
    {
      file: "public/registry.json",
      content: await formatWithPrettier(
        buildRegistryJson(pkgJson, primitives),
        "public/registry.json"
      ),
    },
    {
      file: "public/llms.txt",
      content: buildLlmsTxt({ primitives, iconCount, skills }),
    },
    {
      file: "public/llms-full.txt",
      content: buildLlmsFullTxt({ primitives, iconCount, skills, contrastPairs }),
    },
  ];

  const componentDocsDir = "public/docs/components";
  const expectedComponentDocFiles = new Set();
  for (const prim of primitives) {
    const outPath = `${componentDocsDir}/${prim.slug}.md`;
    expectedComponentDocFiles.add(`${prim.slug}.md`);
    outputs.push({
      file: outPath,
      content: await formatWithPrettier(buildComponentMarkdown(prim, allSlugsSet), outPath),
    });
  }

  if (CHECK_MODE) {
    const stale = [];
    for (const out of outputs) {
      if (!fs.existsSync(out.file)) {
        stale.push(`${out.file} (missing)`);
        continue;
      }
      const current = fs.readFileSync(out.file, "utf8");
      if (current !== out.content) {
        stale.push(`${out.file} (out of date)`);
      }
    }

    if (fs.existsSync(componentDocsDir)) {
      for (const name of fs.readdirSync(componentDocsDir)) {
        if (!expectedComponentDocFiles.has(name)) {
          stale.push(`${componentDocsDir}/${name} (orphan file)`);
        }
      }
    }

    if (stale.length > 0) {
      console.error("\x1b[31m[DOCS DRIFT]\x1b[0m Generated documentation artifacts are stale:");
      for (const item of stale.slice(0, 15)) console.error(`  - ${item}`);
      if (stale.length > 15) console.error(`  ...and ${stale.length - 15} more.`);
      console.error("Run `npm run docs:build` to synchronise generated artifacts.");
      process.exit(1);
    }

    console.log(
      `\x1b[32m✔ Documentation manifest, ${primitives.length} component manuals, registry, and llms.txt artifacts are synchronised.\x1b[0m`
    );
    return;
  }

  if (fs.existsSync(componentDocsDir)) {
    for (const name of fs.readdirSync(componentDocsDir)) {
      if (!expectedComponentDocFiles.has(name)) {
        fs.unlinkSync(path.join(componentDocsDir, name));
      }
    }
  }

  for (const out of outputs) {
    fs.mkdirSync(path.dirname(out.file), { recursive: true });
    fs.writeFileSync(out.file, out.content, "utf8");
  }

  console.log(
    `\x1b[32m✔ Generated documentation artifacts (${primitives.length} primitives, ${primitives.length} component specs, ${contrastPairs.length} contrast pairs, ${skills.length} skills, ${iconCount} icons).\x1b[0m`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
