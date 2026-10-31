"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import * as AllIcons from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/toast";
import { SearchIcon, SparklesIcon, CheckIcon } from "@/components/icons";
import { springs } from "@/tokens/motion";
import { cn } from "@/lib/utils";

// Filter out non-component exports (interfaces/types erased at runtime)
interface IconMeta {
  name: string;
  displayName: string;
  component: React.ComponentType<{
    size?: number;
    className?: string;
    ref?: React.Ref<unknown>;
    [key: string]: unknown;
  }>;
}

const ALL_ICONS_LIST: IconMeta[] = Object.entries(AllIcons)
  .filter(
    ([key, val]) =>
      key.endsWith("Icon") &&
      (typeof val === "function" || (typeof val === "object" && val !== null))
  )
  .map(([key, val]) => ({
    name: key,
    displayName: key.replace(/Icon$/, ""),
    component: val as React.ComponentType<{
      size?: number;
      className?: string;
      ref?: React.Ref<unknown>;
      [key: string]: unknown;
    }>,
  }))
  .sort((a, b) => a.displayName.localeCompare(b.displayName));

const CATEGORIES: { label: string; match: (name: string) => boolean }[] = [
  { label: "All", match: () => true },
  {
    label: "Actions & Status",
    match: (n) =>
      /check|plus|minus|x|ban|alert|info|help|cross|trash|bookmark|star|pin|flag|heart|thumbs/i.test(
        n
      ),
  },
  {
    label: "Arrows & Nav",
    match: (n) =>
      /arrow|chevron|corner|undo|redo|rotate|expand|shrink|move|navigation|compass/i.test(n),
  },
  {
    label: "Git & Developer",
    match: (n) =>
      /git|branch|commit|merge|pull|terminal|code|cpu|server|database|webhook|workflow/i.test(n),
  },
  {
    label: "Charts & Analytics",
    match: (n) => /chart|trending|activity|pulse|bar|line|pie|gauge|analytics/i.test(n),
  },
  {
    label: "Media & Audio",
    match: (n) => /volume|audio|speaker|music|play|pause|video|mic|camera|image|disc/i.test(n),
  },
  {
    label: "Commerce & Finance",
    match: (n) =>
      /dollar|euro|rupee|pound|yen|franc|ruble|lira|lari|peso|currency|cent|receipt|wallet|shopping|cart|credit/i.test(
        n
      ),
  },
  {
    label: "Communication",
    match: (n) => /mail|message|send|share|phone|chat|at-sign|bell|inbox/i.test(n),
  },
];

interface IconCardTileProps {
  icon: IconMeta;
  isCopied: boolean;
  onCopy: (icon: IconMeta) => void;
}

function IconCardTile({ icon, isCopied, onCopy }: IconCardTileProps) {
  const iconRef = React.useRef<{ startAnimation?: () => void; stopAnimation?: () => void } | null>(
    null
  );
  const IconComponent = icon.component;

  const handleMouseEnter = React.useCallback(() => {
    iconRef.current?.startAnimation?.();
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    iconRef.current?.stopAnimation?.();
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        render={
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={springs.tactile}
            onPointerDown={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onCopy(icon)}
            className={cn(
              "group relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border/50 bg-card text-foreground transition-colors select-none hover:border-foreground/20 hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none sm:size-10",
              isCopied && "border-primary bg-primary/10 ring-1 ring-primary/40"
            )}
            aria-label={`Copy ${icon.displayName} icon code`}
          />
        }
      >
        {/* Dynamic Icon */}
        <div className="pointer-events-none flex size-5 items-center justify-center text-foreground transition-colors group-hover:text-primary">
          <IconComponent ref={iconRef} size={18} />
        </div>

        {/* Copied Flash Overlay */}
        <AnimatePresence>
          {isCopied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springs.snappy}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/95 font-medium text-primary backdrop-blur-xs"
            >
              <CheckIcon size={13} />
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipTrigger>
      <TooltipContent side="top" className="font-mono text-xs">
        &lt;{icon.name} /&gt; · Click to copy
      </TooltipContent>
    </Tooltip>
  );
}

export function IconGallery() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [pageSize, setPageSize] = React.useState<number | "all">(60);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [copiedName, setCopiedName] = React.useState<string | null>(null);
  const { toast } = useToast();

  // Filter icons by category and search query
  const filteredIcons = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    const cat = CATEGORIES.find((c) => c.label === category) ?? CATEGORIES[0];

    return ALL_ICONS_LIST.filter((icon) => {
      if (!cat.match(icon.displayName)) return false;
      if (!q) return true;
      return icon.displayName.toLowerCase().includes(q);
    });
  }, [search, category]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, category, pageSize]);

  // Pagination slicing
  const totalPages = pageSize === "all" ? 1 : Math.ceil(filteredIcons.length / pageSize);
  const displayedIcons = React.useMemo(() => {
    if (pageSize === "all") return filteredIcons;
    const start = (currentPage - 1) * pageSize;
    return filteredIcons.slice(start, start + pageSize);
  }, [filteredIcons, currentPage, pageSize]);

  const handleCopy = (icon: IconMeta) => {
    const importCode = `import { ${icon.name} } from "@/components/icons";`;
    navigator.clipboard?.writeText(importCode);
    setCopiedName(icon.name);
    setTimeout(() => setCopiedName((curr) => (curr === icon.name ? null : curr)), 2000);

    toast({
      title: `Copied <${icon.name} />`,
      description: importCode,
      type: "success",
    });
  };

  return (
    <Card className="flex flex-col gap-4 overflow-hidden p-4 sm:p-5">
      <CardHeader className="flex flex-col gap-3 p-0">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <SparklesIcon size={16} className="text-primary" />
              <CardTitle className="text-base font-bold tracking-tight">
                Kinetic Icon Directory
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px] font-semibold tabular-nums">
                {ALL_ICONS_LIST.length} Animated Primitives
              </Badge>
            </div>
            <CardDescription className="mt-0.5 text-xs text-muted-foreground">
              Every icon features mechanical spring physics on hover with zero stroke-erasure
              gimmicks. Click any icon to copy its import snippet.
            </CardDescription>
          </div>

          <div
            className="flex items-center gap-1.5 self-start sm:self-auto"
            role="group"
            aria-label="Page density selector"
          >
            <Button
              variant={pageSize === 60 ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-2.5 text-xs"
              aria-pressed={pageSize === 60}
              onClick={() => setPageSize(60)}
            >
              60 / page
            </Button>
            <Button
              variant={pageSize === 120 ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-2.5 text-xs"
              aria-pressed={pageSize === 120}
              onClick={() => setPageSize(120)}
            >
              120 / page
            </Button>
            <Button
              variant={pageSize === "all" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-2.5 text-xs"
              aria-pressed={pageSize === "all"}
              onClick={() => setPageSize("all")}
            >
              Show All ({filteredIcons.length})
            </Button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <SearchIcon
              size={14}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by icon name (e.g. check, git, arrow, send)..."
              aria-label="Search icons by name"
              className="h-8.5 bg-muted/20 pr-8 pl-8.5 text-xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search query"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer p-0.5 text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results Count Pill */}
          <div className="shrink-0 self-center font-mono text-xs text-muted-foreground">
            Found{" "}
            <span className="font-semibold text-foreground tabular-nums">
              {filteredIcons.length}
            </span>{" "}
            icons
          </div>
        </div>

        {/* Category Pills Bar */}
        <div
          className="flex flex-wrap items-center gap-1.5 pt-0.5"
          role="group"
          aria-label="Icon categories"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setCategory(cat.label)}
                aria-pressed={isSelected}
                className={cn(
                  "cursor-pointer rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors select-none",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Compact Icon Grid: Fixed-height container to guarantee zero scroll jumps during pagination */}
        {displayedIcons.length === 0 ? (
          <div className="flex h-[180px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 bg-muted/10 py-12 text-center text-muted-foreground">
            <SearchIcon size={24} className="opacity-40" />
            <p className="text-sm font-medium">No icons match &ldquo;{search}&rdquo;</p>
            <p className="text-xs">Try searching for a different keyword or category.</p>
          </div>
        ) : (
          <TooltipProvider>
            <div
              className={cn(
                "flex flex-wrap content-start gap-1.5 rounded-xl border border-border/50 bg-muted/10 p-3 select-none",
                pageSize === "all" ? "max-h-96 overflow-y-auto" : "min-h-40 sm:min-h-36"
              )}
            >
              {displayedIcons.map((icon) => (
                <IconCardTile
                  key={icon.name}
                  icon={icon}
                  isCopied={copiedName === icon.name}
                  onCopy={handleCopy}
                />
              ))}
            </div>
          </TooltipProvider>
        )}

        {/* Dynamic Pagination Footer */}
        {pageSize !== "all" && totalPages > 1 && (
          <div className="mt-2 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-3 sm:flex-row">
            <span className="font-mono text-xs text-muted-foreground">
              Page <span className="font-semibold text-foreground tabular-nums">{currentPage}</span>{" "}
              of <span className="font-semibold text-foreground tabular-nums">{totalPages}</span> (
              {filteredIcons.length} items)
            </span>

            <Pagination
              className="mx-0 w-auto"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
