"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import * as AllIcons from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  getPaginationItems,
} from "@/components/ui/pagination";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/toast";
import { SearchIcon, SparklesIcon, CheckIcon } from "@/components/icons";
import { springs } from "@/tokens/motion";
import { cn } from "@/lib/utils";

// Filter out non-component exports (interfaces/types erased at runtime)
interface IconMeta {
  name: string;
  displayName: string;
  component: React.ComponentType<{ size?: number; className?: string; ref?: React.Ref<unknown>; [key: string]: unknown }>;
}

const ALL_ICONS_LIST: IconMeta[] = Object.entries(AllIcons)
  .filter(([key, val]) => key.endsWith("Icon") && (typeof val === "function" || (typeof val === "object" && val !== null)))
  .map(([key, val]) => ({
    name: key,
    displayName: key.replace(/Icon$/, ""),
    component: val as React.ComponentType<{ size?: number; className?: string; ref?: React.Ref<unknown>; [key: string]: unknown }>,
  }))
  .sort((a, b) => a.displayName.localeCompare(b.displayName));

const CATEGORIES: { label: string; match: (name: string) => boolean }[] = [
  { label: "All", match: () => true },
  {
    label: "Actions & Status",
    match: (n) =>
      /check|plus|minus|x|ban|alert|info|help|cross|trash|bookmark|star|pin|flag|heart|thumbs/i.test(n),
  },
  {
    label: "Arrows & Nav",
    match: (n) => /arrow|chevron|corner|undo|redo|rotate|expand|shrink|move|navigation|compass/i.test(n),
  },
  {
    label: "Git & Developer",
    match: (n) => /git|branch|commit|merge|pull|terminal|code|cpu|server|database|webhook|workflow/i.test(n),
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
      /dollar|euro|rupee|pound|yen|franc|ruble|lira|lari|peso|currency|cent|receipt|wallet|shopping|cart|credit/i.test(n),
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
  const iconRef = React.useRef<{ startAnimation?: () => void; stopAnimation?: () => void } | null>(null);
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
              "group relative flex items-center justify-center size-9 sm:size-10 rounded-lg border border-border/50 bg-card hover:bg-muted/70 hover:border-foreground/20 transition-colors cursor-pointer select-none text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 shrink-0",
              isCopied && "border-primary bg-primary/10 ring-1 ring-primary/40"
            )}
            aria-label={`Copy ${icon.displayName} icon code`}
          />
        }
      >
        {/* Dynamic Icon */}
        <div className="flex size-5 items-center justify-center text-foreground group-hover:text-primary transition-colors pointer-events-none">
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
              className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/95 backdrop-blur-xs text-primary font-medium z-10"
            >
              <CheckIcon size={13} />
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs font-mono">
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
    <Card className="flex flex-col gap-4 p-4 sm:p-5 overflow-hidden">
      <CardHeader className="p-0 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <SparklesIcon size={16} className="text-primary" />
              <CardTitle className="text-base font-bold tracking-tight">
                Kinetic Icon Directory
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px] tabular-nums font-semibold">
                {ALL_ICONS_LIST.length} Animated Primitives
              </Badge>
            </div>
            <CardDescription className="text-xs mt-0.5 text-muted-foreground">
              Every icon features mechanical spring physics on hover with zero stroke-erasure gimmicks. Click any icon to copy its import snippet.
            </CardDescription>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <Button
              variant={pageSize === 60 ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-7 px-2.5"
              onClick={() => setPageSize(60)}
            >
              60 / page
            </Button>
            <Button
              variant={pageSize === 120 ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-7 px-2.5"
              onClick={() => setPageSize(120)}
            >
              120 / page
            </Button>
            <Button
              variant={pageSize === "all" ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-7 px-2.5"
              onClick={() => setPageSize("all")}
            >
              Show All ({filteredIcons.length})
            </Button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <SearchIcon
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by icon name (e.g. check, git, arrow, send)..."
              className="pl-8.5 pr-8 text-xs h-8.5 bg-muted/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results Count Pill */}
          <div className="text-xs text-muted-foreground font-mono shrink-0 self-center">
            Found <span className="font-semibold text-foreground tabular-nums">{filteredIcons.length}</span> icons
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setCategory(cat.label)}
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors border select-none cursor-pointer",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground"
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
          <div className="py-12 text-center text-muted-foreground flex flex-col items-center gap-2 h-[180px] justify-center border border-dashed border-border/60 rounded-xl bg-muted/10">
            <SearchIcon size={24} className="opacity-40" />
            <p className="text-sm font-medium">No icons match &ldquo;{search}&rdquo;</p>
            <p className="text-xs">Try searching for a different keyword or category.</p>
          </div>
        ) : (
          <TooltipProvider>
            <div
              className={cn(
                "flex flex-wrap gap-1.5 p-3 rounded-xl border border-border/50 bg-muted/10 content-start select-none",
                pageSize === "all"
                  ? "max-h-[380px] overflow-y-auto"
                  : "min-h-[160px] sm:min-h-[140px]"
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
          <div className="pt-3 mt-2 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground font-mono">
              Page <span className="font-semibold text-foreground tabular-nums">{currentPage}</span> of{" "}
              <span className="font-semibold text-foreground tabular-nums">{totalPages}</span> (
              {filteredIcons.length} items)
            </span>

            <Pagination className="w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>

                {getPaginationItems(currentPage, totalPages).map((item, idx) => {
                  if (typeof item === "string") {
                    return (
                      <PaginationItem key={`${item}-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return (
                    <PaginationItem key={item}>
                      <PaginationLink
                        isActive={currentPage === item}
                        onClick={() => setCurrentPage(item)}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
