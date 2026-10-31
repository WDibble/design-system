import * as React from "react";
import {
  SparklesIcon,
  MoonIcon,
  SunIcon,
  LayersIcon,
  ShieldCheckIcon,
  ZapIcon,
  SearchIcon,
  ServerIcon,
  PaletteIcon,
  CompassIcon,
} from "@/components/icons";
import { PrinciplesPage } from "@/pages/principles";
import { WorkbenchPage, getDemoNavItems } from "@/pages/workbench";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToastProvider, useToast } from "@/components/ui/toast";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { disableTransitionsTemporarily, clearInlineThemeStyles } from "@/lib/theme";
import { ThemeStudio } from "@/components/theme-studio";

function AppContent() {
  const { toast } = useToast();
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Lightweight client-side router supporting both HTML5 pushState and hash fallback
  const [currentPath, setCurrentPath] = React.useState<string>(() => {
    if (typeof window === "undefined") return "/";
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === "/principles" || hash === "#principles" || hash === "#/principles") {
      return "/principles";
    }
    return "/";
  });

  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  React.useEffect(() => {
    clearInlineThemeStyles();
  }, []);

  React.useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === "/principles" || hash === "#principles" || hash === "#/principles") {
        setCurrentPath("/principles");
      } else {
        setCurrentPath("/");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigateTo = React.useCallback((to: string) => {
    if (to === "/principles") {
      window.history.pushState({}, "", "/principles");
      setCurrentPath("/principles");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.history.pushState({}, "", "/");
      setCurrentPath("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Global keyboard shortcuts (⌘K for command dialog, ⌘P for principles)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        navigateTo(currentPath === "/principles" ? "/" : "/principles");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateTo, currentPath]);

  const demoNavItems = React.useMemo(() => getDemoNavItems(navigateTo), [navigateTo]);

  const toggleTheme = (targetDark?: boolean) => {
    const restore = disableTransitionsTemporarily();
    setIsDark((prev) => {
      const next = targetDark !== undefined ? targetDark : !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
    restore();
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-12 text-foreground selection:bg-primary selection:text-primary-foreground sm:px-6 lg:px-8">
      {/* Skip to Main Content Link (WCAG 2.2 Level AA Landmark Invariant) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="flex w-full max-w-6xl flex-col gap-10">
        {/* Sticky Floating Liquid Glass Header powered by <NavigationBar> (Demo Workbench only) */}
        {currentPath !== "/principles" && (
          <NavigationBar
            sticky
            containerClassName="max-w-full px-2"
            className="glass-regular specular-rim isolation-isolate sticky top-4 z-50 transform-gpu rounded-2xl border-border/70 p-2 shadow-lg sm:px-4"
            brand={
              <button
                type="button"
                onClick={() => navigateTo("/")}
                className="group flex min-w-0 cursor-pointer items-center gap-3 text-left outline-none"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform group-hover:scale-105 active:scale-95">
                  <SparklesIcon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
                      Design System
                    </h1>
                    <Badge variant="outline" size="sm" dot className="hidden sm:inline-flex">
                      v2.0
                    </Badge>
                  </div>
                </div>
              </button>
            }
            items={demoNavItems}
            maxVisibleItems={4}
            actions={
              <>
                {/* Principles Manifesto Page Trigger */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateTo("/principles")}
                  className="h-9 gap-1.5 rounded-xl border-border/60 bg-muted/40 px-2.5 text-foreground transition-colors hover:bg-muted/70 sm:px-3"
                >
                  <CompassIcon size={14} className="text-primary" />
                  <span className="hidden text-xs font-medium sm:inline">Principles</span>
                  <kbd className="hidden items-center rounded border border-border/40 bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground xl:inline-flex">
                    ⌘P
                  </kbd>
                </Button>

                {/* Theme Studio Drawer Trigger */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-theme-studio"))}
                  aria-label="Open Theme Studio (⌘T)"
                  className="hidden h-9 gap-1.5 rounded-xl border-border/60 bg-muted/40 px-2.5 hover:bg-muted/70 sm:px-3 md:inline-flex"
                >
                  <PaletteIcon size={14} className="text-primary" />
                  <span className="hidden text-xs font-medium xl:inline">Themes</span>
                  <kbd className="hidden items-center rounded border border-border/40 bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground xl:inline-flex">
                    ⌘T
                  </kbd>
                </Button>

                {/* Quick Command Palette Trigger */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCommandOpen(true)}
                  className="h-9 gap-2 rounded-xl border-border/60 bg-muted/40 px-2.5 hover:bg-muted/70 sm:px-3"
                >
                  <SearchIcon size={14} className="opacity-70" />
                  <span className="hidden text-xs font-normal text-muted-foreground md:inline">
                    Command
                  </span>
                  <kbd className="hidden items-center gap-0.5 rounded border border-border/40 bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground xl:inline-flex">
                    ⌘K
                  </kbd>
                </Button>

                <ThemeToggle
                  isDark={isDark}
                  onToggleDark={(next) => toggleTheme(next)}
                  className="size-9 rounded-xl border-border/60"
                />
              </>
            }
          />
        )}

        {/* Main Content Landmark */}
        <main id="main-content" tabIndex={-1} className="flex flex-col gap-10 outline-none">
          {currentPath === "/principles" ? (
            <PrinciplesPage onBackToWorkbench={() => navigateTo("/")} />
          ) : (
            <WorkbenchPage
              isDark={isDark}
              onToggleDark={toggleTheme}
              onOpenCommand={() => setCommandOpen(true)}
              navigateTo={navigateTo}
            />
          )}
        </main>

        {/* Global Command Dialog (⌘K / Ctrl+K) */}
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <CommandInput />
          <CommandList>
            <CommandEmpty />
            <CommandGroup heading="Platform Navigation">
              <CommandItem
                onSelect={() => {
                  setCommandOpen(false);
                  navigateTo("/principles");
                }}
              >
                <CompassIcon size={14} />
                <span>Read Design Principles and Manifesto (v0.1 Draft)</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setCommandOpen(false);
                  navigateTo("/");
                }}
              >
                <LayersIcon size={14} />
                <span>Interactive Component Workbench</span>
                <CommandShortcut>⌘W</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setCommandOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <SparklesIcon size={14} />
                <span>Scroll to Top</span>
                <CommandShortcut>⌘↑</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setCommandOpen(false);
                  toggleTheme();
                }}
              >
                {isDark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
                <span>Toggle Colour Theme</span>
                <CommandShortcut>⌘T</CommandShortcut>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setCommandOpen(false);
                  toast({
                    title: "Instant Edge Deployment Triggered",
                    description: "Synchronised across 5 global Anycast nodes.",
                    type: "success",
                  });
                }}
              >
                <ZapIcon size={14} />
                <span>Instant Edge Deploy</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Components & Architecture">
              <CommandItem
                onSelect={() => {
                  setCommandOpen(false);
                  document.getElementById("icon-directory")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <SparklesIcon size={14} />
                <span>Browse Kinetic Icon Directory (470 Icons)</span>
                <CommandShortcut>⌘I</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <LayersIcon size={14} />
                <span>Explore Button Spectrum</span>
              </CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <ServerIcon size={14} />
                <span>Cluster Telemetry Table</span>
              </CommandItem>
              <CommandItem onSelect={() => setCommandOpen(false)}>
                <ShieldCheckIcon size={14} />
                <span>Architectural Invariants & Directives</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        {/* Micro Footer */}
        <footer
          role="contentinfo"
          className="flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 pb-12 text-xs text-muted-foreground sm:flex-row"
        >
          <p>© Design System · Human-Centric & Agent-Native Standard</p>
          <p className="font-mono">React 19 · Base UI · Motion · Tailwind CSS v4</p>
        </footer>

        {/* Live Theme Studio Drawer */}
        <ThemeStudio isDark={isDark} onToggleDark={(nextDark) => toggleTheme(nextDark)} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
