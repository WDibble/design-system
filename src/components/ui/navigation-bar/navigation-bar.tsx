import * as React from "react";
import { MenuIcon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { NavigationBarProps, NavItemConfig, NavMenuLinkItem, NavMenuColumn } from "./types";
import { NavigationContext } from "./nav-context";
import { NavList, NavItem, NavItemLink } from "./nav-items";
import { NavMegaMenu, NavColumnsMenu, NavSimpleMenu } from "./nav-menus";

/**
 * Synthesizes an overflow menu configuration from excess items.
 */
function buildOverflowMenu(overflowItems: NavItemConfig[]): {
  type: "simple" | "columns";
  links?: NavMenuLinkItem[];
  columns?: NavMenuColumn[];
} {
  const hasComplexChildren = overflowItems.some(
    (item) => (item.columns && item.columns.length > 0) || (item.links && item.links.length > 1)
  );

  if (!hasComplexChildren) {
    const flatLinks: NavMenuLinkItem[] = overflowItems.flatMap((item) => {
      if (item.links && item.links.length > 0) {
        return item.links;
      }
      return [
        {
          title: item.label,
          href: item.href || "#",
          badge: item.badge,
          onClick: item.onClick,
        },
      ];
    });

    return {
      type: "simple",
      links: flatLinks,
    };
  }

  const columns: NavMenuColumn[] = [];
  const directLinks: NavMenuLinkItem[] = [];

  overflowItems.forEach((item) => {
    if (item.type === "columns" && item.columns) {
      columns.push(...item.columns);
    } else if (item.links && item.links.length > 0) {
      columns.push({
        category: item.label,
        links: item.links,
      });
    } else {
      directLinks.push({
        title: item.label,
        href: item.href || "#",
        badge: item.badge,
        onClick: item.onClick,
      });
    }
  });

  if (directLinks.length > 0) {
    columns.unshift({
      category: "Quick Links",
      links: directLinks,
    });
  }

  return {
    type: "columns",
    columns,
  };
}

export function NavigationBar({
  brand,
  items,
  actions,
  mobileBrand,
  mobileFooter,
  sticky = true,
  containerClassName,
  maxVisibleItems = 4,
  moreLabel = "More",
  moreBadge,
  className,
  children,
  ...props
}: NavigationBarProps) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSetActive = React.useCallback((id: string | null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveItem(id);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 180);
  }, []);

  const closeMenu = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveItem(null);
  }, []);

  // Keyboard navigation: Escape closes active menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  const isTurnkey = Boolean(items && items.length > 0 && !children);

  // Partition items into visible and overflow sets for collision-free layout
  const { visibleItems, overflowItems, hasOverflow } = React.useMemo(() => {
    if (!items || items.length === 0) {
      return { visibleItems: [], overflowItems: [], hasOverflow: false };
    }
    if (items.length > maxVisibleItems) {
      return {
        visibleItems: items.slice(0, maxVisibleItems),
        overflowItems: items.slice(maxVisibleItems),
        hasOverflow: true,
      };
    }
    return { visibleItems: items, overflowItems: [], hasOverflow: false };
  }, [items, maxVisibleItems]);

  const overflowMenu = React.useMemo(() => {
    if (!hasOverflow || overflowItems.length === 0) return null;
    return buildOverflowMenu(overflowItems);
  }, [hasOverflow, overflowItems]);

  return (
    <NavigationContext.Provider
      value={{
        activeItem,
        setActiveItem: handleSetActive,
        closeMenu,
      }}
    >
      <nav
        role="navigation"
        aria-label="Main Navigation"
        onMouseLeave={handleMouseLeave}
        className={cn(
          "@container/nav w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors duration-200 select-none supports-[backdrop-filter]:bg-background/60",
          sticky ? "sticky top-0 z-40" : "relative z-30",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
            containerClassName
          )}
        >
          {/* Brand Slot */}
          <div className="flex min-w-0 items-center gap-6">
            {brand && <div className="shrink-0">{brand}</div>}

            {/* Desktop Navigation List (Hidden on Mobile or constrained container) */}
            {isTurnkey ? (
              <NavList className="hidden lg:flex @[48rem]/nav:flex">
                {visibleItems.map((item, idx) => {
                  const itemId =
                    item.id || `nav-item-${idx}-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
                  if (
                    item.type === "link" ||
                    (!item.type && item.href && !item.links && !item.columns && !item.featured)
                  ) {
                    return (
                      <NavItemLink
                        key={itemId}
                        href={item.href || "#"}
                        badge={item.badge}
                        isActive={item.isActive}
                        onClick={item.onClick}
                      >
                        {item.label}
                      </NavItemLink>
                    );
                  }

                  return (
                    <NavItem
                      key={itemId}
                      id={itemId}
                      label={item.label}
                      badge={item.badge}
                      align={item.align}
                    >
                      {item.type === "mega" && (
                        <NavMegaMenu featured={item.featured} links={item.links} />
                      )}
                      {item.type === "columns" && <NavColumnsMenu columns={item.columns} />}
                      {(item.type === "simple" || (!item.type && item.links)) && (
                        <NavSimpleMenu links={item.links} />
                      )}
                    </NavItem>
                  );
                })}

                {/* Turnkey "More ▾" Overflow Dropdown Trigger (Directive 7 Anti-Crush) */}
                {hasOverflow && overflowMenu && (
                  <NavItem
                    key="nav-item-overflow-more"
                    id="nav-item-overflow-more"
                    label={moreLabel}
                    badge={moreBadge}
                    align="end"
                  >
                    {overflowMenu.type === "columns" && (
                      <NavColumnsMenu columns={overflowMenu.columns} />
                    )}
                    {overflowMenu.type === "simple" && <NavSimpleMenu links={overflowMenu.links} />}
                  </NavItem>
                )}
              </NavList>
            ) : (
              children
            )}
          </div>

          {/* Desktop Right Actions & Mobile Hamburger */}
          <div className="flex shrink-0 items-center gap-2">
            {actions && (
              <div className="hidden items-center gap-2 lg:flex @[48rem]/nav:flex">{actions}</div>
            )}

            {/* Mobile Sheet Trigger */}
            <div className="lg:hidden @[48rem]/nav:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Open mobile menu"
                      className="size-9 rounded-xl border-border/80"
                    >
                      <MenuIcon size={18} />
                    </Button>
                  }
                />

                <SheetContent
                  side="right"
                  className="flex w-[85vw] flex-col justify-between p-0 sm:w-96"
                >
                  <div>
                    <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/40 p-4">
                      <SheetTitle className="truncate text-sm font-semibold">
                        {mobileBrand ?? brand ?? "Navigation"}
                      </SheetTitle>
                      <SheetClose
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Close menu"
                            className="size-8 rounded-lg"
                          >
                            <XIcon size={16} />
                          </Button>
                        }
                      />
                    </SheetHeader>

                    {/* Mobile Navigation Links */}
                    <div className="max-h-[calc(100vh-160px)] space-y-4 overflow-y-auto p-4">
                      {isTurnkey && items ? (
                        <Accordion className="w-full">
                          {items.map((item, idx) => {
                            const itemId = `mobile-nav-${idx}`;
                            if (
                              item.type === "link" ||
                              (!item.links && !item.columns && !item.featured)
                            ) {
                              return (
                                <div key={itemId} className="border-b border-border/40 py-2">
                                  <a
                                    href={item.href || "#"}
                                    onClick={(e) => {
                                      setMobileOpen(false);
                                      item.onClick?.(e);
                                    }}
                                    className="flex items-center justify-between py-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
                                  >
                                    <span>{item.label}</span>
                                    {item.badge && (
                                      <Badge
                                        variant="secondary"
                                        size="sm"
                                        className="font-mono text-[10px]"
                                      >
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </a>
                                </div>
                              );
                            }

                            return (
                              <AccordionItem key={itemId} value={itemId}>
                                <AccordionTrigger className="py-3 text-sm font-medium hover:text-primary hover:no-underline">
                                  <div className="flex items-center gap-2">
                                    <span>{item.label}</span>
                                    {item.badge && (
                                      <Badge
                                        variant="outline"
                                        size="sm"
                                        className="font-mono text-[10px]"
                                      >
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2 pt-1 pb-3">
                                  {/* Mega Featured Card in Mobile */}
                                  {item.featured && (
                                    <a
                                      href={item.featured.href}
                                      onClick={(e) => {
                                        setMobileOpen(false);
                                        item.featured?.onClick?.(e);
                                      }}
                                      className="block rounded-xl border border-border/60 bg-muted/40 p-3 transition-colors hover:bg-muted/70"
                                    >
                                      {item.featured.badge && (
                                        <Badge
                                          variant="default"
                                          size="sm"
                                          className="mb-1 text-[10px]"
                                        >
                                          {item.featured.badge}
                                        </Badge>
                                      )}
                                      <div className="text-xs font-semibold text-foreground">
                                        {item.featured.title}
                                      </div>
                                      <div className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">
                                        {item.featured.description}
                                      </div>
                                    </a>
                                  )}

                                  {/* Links List in Mobile */}
                                  {item.links?.map((link, lIdx) => (
                                    <a
                                      key={`mobile-link-${lIdx}`}
                                      href={link.href}
                                      onClick={(e) => {
                                        setMobileOpen(false);
                                        link.onClick?.(e);
                                      }}
                                      className="flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-muted/60"
                                    >
                                      {link.icon && (
                                        <span className="mt-0.5 shrink-0 text-muted-foreground">
                                          {link.icon}
                                        </span>
                                      )}
                                      <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-foreground">
                                          <span>{link.title}</span>
                                          {link.badge && (
                                            <Badge
                                              variant="secondary"
                                              size="sm"
                                              className="shrink-0 px-1 py-0 text-[9px] whitespace-nowrap"
                                            >
                                              {link.badge}
                                            </Badge>
                                          )}
                                        </div>
                                        {link.description && (
                                          <div className="line-clamp-2 text-[11px] text-muted-foreground">
                                            {link.description}
                                          </div>
                                        )}
                                      </div>
                                    </a>
                                  ))}

                                  {/* Columns in Mobile */}
                                  {item.columns?.map((col, cIdx) => (
                                    <div key={`mobile-col-${cIdx}`} className="pt-2">
                                      <div className="px-2 pb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                                        {col.category}
                                      </div>
                                      {col.links.map((link, lIdx) => (
                                        <a
                                          key={`col-link-${cIdx}-${lIdx}`}
                                          href={link.href}
                                          onClick={(e) => {
                                            setMobileOpen(false);
                                            link.onClick?.(e);
                                          }}
                                          className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-foreground hover:bg-muted/60"
                                        >
                                          {link.icon && (
                                            <span className="text-muted-foreground">
                                              {link.icon}
                                            </span>
                                          )}
                                          <span>{link.title}</span>
                                        </a>
                                      ))}
                                    </div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      ) : null}
                    </div>
                  </div>

                  {/* Mobile Actions Footer */}
                  <div className="flex flex-col gap-3 border-t border-border/40 bg-muted/20 p-4">
                    {mobileFooter
                      ? mobileFooter
                      : actions && (
                          <div className="flex items-center justify-between gap-2">{actions}</div>
                        )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </NavigationContext.Provider>
  );
}
