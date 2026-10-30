"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
} from "@/components/icons";
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
import { springs } from "@/tokens/motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * Types & Configuration Schemas
 * -----------------------------------------------------------------------------------------------*/

export interface NavMenuLinkItem {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  isExternal?: boolean;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface NavMenuColumn {
  category: string;
  links: NavMenuLinkItem[];
}

export interface NavMegaFeatured {
  title: string;
  description: string;
  href: string;
  badge?: string;
  icon?: React.ReactNode;
  tag?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface NavItemConfig {
  id?: string;
  label: string;
  href?: string;
  type?: "link" | "mega" | "columns" | "simple";
  align?: "start" | "center" | "end";
  badge?: string;
  featured?: NavMegaFeatured;
  links?: NavMenuLinkItem[];
  columns?: NavMenuColumn[];
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/* -------------------------------------------------------------------------------------------------
 * Navigation Context
 * -----------------------------------------------------------------------------------------------*/

interface NavigationContextValue {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
  closeMenu: () => void;
}

const NavigationContext = React.createContext<NavigationContextValue | null>(null);

function useNavigation() {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a <NavigationBar>");
  }
  return context;
}

/* -------------------------------------------------------------------------------------------------
 * Root NavigationBar
 * -----------------------------------------------------------------------------------------------*/

export interface NavigationBarProps extends React.ComponentProps<"nav"> {
  brand?: React.ReactNode;
  items?: NavItemConfig[];
  actions?: React.ReactNode;
  mobileBrand?: React.ReactNode;
  mobileFooter?: React.ReactNode;
  sticky?: boolean;
  containerClassName?: string;
}

export function NavigationBar({
  brand,
  items,
  actions,
  mobileBrand,
  mobileFooter,
  sticky = true,
  containerClassName,
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
          "w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-colors duration-200 select-none",
          sticky ? "sticky top-0 z-40" : "relative z-30",
          className
        )}
        {...props}
      >
        <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4", containerClassName)}>
          {/* Brand Slot */}
          <div className="flex items-center gap-6 min-w-0">
            {brand && <div className="shrink-0">{brand}</div>}

            {/* Desktop Navigation List (Hidden on Mobile) */}
            {isTurnkey ? (
              <NavList className="hidden lg:flex">
                {items!.map((item, idx) => {
                  const itemId = item.id || `nav-item-${idx}-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
                  if (item.type === "link" || (!item.type && item.href && !item.links && !item.columns && !item.featured)) {
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
                      {item.type === "columns" && (
                        <NavColumnsMenu columns={item.columns} />
                      )}
                      {(item.type === "simple" || (!item.type && item.links)) && (
                        <NavSimpleMenu links={item.links} />
                      )}
                    </NavItem>
                  );
                })}
              </NavList>
            ) : (
              children
            )}
          </div>

          {/* Desktop Right Actions & Mobile Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {actions && <div className="hidden lg:flex items-center gap-2">{actions}</div>}

            {/* Mobile Sheet Trigger */}
            <div className="lg:hidden">
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

                <SheetContent side="right" className="w-[85vw] sm:w-96 p-0 flex flex-col justify-between">
                  <div>
                    <SheetHeader className="p-4 border-b border-border/40 flex flex-row items-center justify-between space-y-0">
                      <SheetTitle className="text-sm font-semibold truncate">
                        {mobileBrand ?? brand ?? "Navigation"}
                      </SheetTitle>
                      <SheetClose
                        render={
                          <Button variant="ghost" size="icon" aria-label="Close menu" className="size-8 rounded-lg">
                            <XIcon size={16} />
                          </Button>
                        }
                      />
                    </SheetHeader>

                    {/* Mobile Navigation Links */}
                    <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)]">
                      {isTurnkey && items ? (
                        <Accordion className="w-full">
                          {items.map((item, idx) => {
                            const itemId = `mobile-nav-${idx}`;
                            if (item.type === "link" || (!item.links && !item.columns && !item.featured)) {
                              return (
                                <div key={itemId} className="py-2 border-b border-border/40">
                                  <a
                                    href={item.href || "#"}
                                    onClick={(e) => {
                                      setMobileOpen(false);
                                      item.onClick?.(e);
                                    }}
                                    className="flex items-center justify-between text-sm font-medium py-1 text-foreground hover:text-primary transition-colors"
                                  >
                                    <span>{item.label}</span>
                                    {item.badge && (
                                      <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </a>
                                </div>
                              );
                            }

                            return (
                              <AccordionItem key={itemId} value={itemId}>
                                <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline hover:text-primary">
                                  <div className="flex items-center gap-2">
                                    <span>{item.label}</span>
                                    {item.badge && (
                                      <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-3 pt-1 space-y-2">
                                  {/* Mega Featured Card in Mobile */}
                                  {item.featured && (
                                    <a
                                      href={item.featured.href}
                                      onClick={(e) => {
                                        setMobileOpen(false);
                                        item.featured?.onClick?.(e);
                                      }}
                                      className="block p-3 rounded-xl bg-muted/40 border border-border/60 hover:bg-muted/70 transition-colors"
                                    >
                                      {item.featured.badge && (
                                        <Badge variant="default" size="sm" className="mb-1 text-[10px]">
                                          {item.featured.badge}
                                        </Badge>
                                      )}
                                      <div className="text-xs font-semibold text-foreground">
                                        {item.featured.title}
                                      </div>
                                      <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
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
                                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors"
                                    >
                                      {link.icon && (
                                        <span className="shrink-0 mt-0.5 text-muted-foreground">
                                          {link.icon}
                                        </span>
                                      )}
                                      <div className="min-w-0 flex-1">
                                        <div className="text-xs font-medium text-foreground flex items-center gap-1.5 flex-wrap">
                                          <span>{link.title}</span>
                                          {link.badge && (
                                            <Badge variant="secondary" size="sm" className="text-[9px] py-0 px-1 shrink-0 whitespace-nowrap">
                                              {link.badge}
                                            </Badge>
                                          )}
                                        </div>
                                        {link.description && (
                                          <div className="text-[11px] text-muted-foreground line-clamp-2">
                                            {link.description}
                                          </div>
                                        )}
                                      </div>
                                    </a>
                                  ))}

                                  {/* Columns in Mobile */}
                                  {item.columns?.map((col, cIdx) => (
                                    <div key={`mobile-col-${cIdx}`} className="pt-2">
                                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 pb-1">
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
                                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/60 text-xs font-medium text-foreground"
                                        >
                                          {link.icon && <span className="text-muted-foreground">{link.icon}</span>}
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
                  <div className="p-4 border-t border-border/40 bg-muted/20 flex flex-col gap-3">
                    {mobileFooter ? (
                      mobileFooter
                    ) : (
                      actions && <div className="flex items-center justify-between gap-2">{actions}</div>
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

/* -------------------------------------------------------------------------------------------------
 * NavBrand
 * -----------------------------------------------------------------------------------------------*/

export interface NavBrandProps extends React.ComponentProps<"a"> {
  children?: React.ReactNode;
}

export function NavBrand({ className, children, href = "/", ...props }: NavBrandProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-2.5 font-semibold text-sm tracking-tight text-foreground border border-transparent transition-all duration-150 active:scale-[0.98] hover:opacity-80 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg px-1 select-none",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------------------------------
 * NavList
 * -----------------------------------------------------------------------------------------------*/

export function NavList({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("flex items-center gap-1 list-none m-0 p-0", className)} {...props}>
      {children}
    </ul>
  );
}

/* -------------------------------------------------------------------------------------------------
 * NavItem (Dropdown Trigger)
 * -----------------------------------------------------------------------------------------------*/

export interface NavItemProps {
  id: string;
  label: string;
  badge?: string;
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
  className?: string;
}

const alignmentClasses: Record<"start" | "center" | "end", string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

export function NavItem({
  id,
  label,
  badge,
  align = "start",
  children,
  className,
}: NavItemProps) {
  const { activeItem, setActiveItem } = useNavigation();
  const isOpen = activeItem === id;
  const uniqueId = React.useId();
  const dropdownId = `nav-dropdown-${uniqueId}`;

  const handleMouseEnter = () => {
    setActiveItem(id);
  };

  const handleClick = () => {
    setActiveItem(isOpen ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveItem(isOpen ? null : id);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveItem(id);
    }
  };

  return (
    <li
      className={cn("relative", isOpen && "z-50", className)}
      onMouseEnter={handleMouseEnter}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={isOpen ? dropdownId : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "group inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium border border-transparent transition-all duration-150 active:scale-[0.98] outline-none select-none",
          "hover:bg-muted/70 hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          isOpen
            ? "bg-muted text-foreground"
            : "text-muted-foreground"
        )}
      >
        <span>{label}</span>
        {badge && (
          <Badge
            variant="outline"
            size="sm"
            className="font-mono text-[9px] py-0 px-1 border-border/80 shrink-0 whitespace-nowrap"
          >
            {badge}
          </Badge>
        )}
        <ChevronDownIcon
          size={12}
          className={cn(
            "shrink-0 opacity-60 pointer-events-none transition-transform duration-200 ease-out group-hover:opacity-100",
            isOpen && "rotate-180 opacity-100 text-foreground"
          )}
        />
      </button>

      {/* Floating Dropdown Surface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={dropdownId}
            role="region"
            aria-label={`${label} navigation menu`}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={springs.snappy}
            className={cn("absolute top-full pt-2 z-50 select-text", alignmentClasses[align])}
          >
            <div className="rounded-2xl border border-border/80 bg-popover/95 text-popover-foreground shadow-2xl backdrop-blur-xl specular-rim overflow-hidden p-4 sm:p-5 max-w-[calc(100vw-2rem)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* -------------------------------------------------------------------------------------------------
 * NavItemLink (Direct Link)
 * -----------------------------------------------------------------------------------------------*/

export interface NavItemLinkProps extends React.ComponentProps<"a"> {
  badge?: string;
  isActive?: boolean;
}

export function NavItemLink({
  href,
  badge,
  isActive,
  className,
  children,
  ...props
}: NavItemLinkProps) {
  const { closeMenu } = useNavigation();

  return (
    <li>
      <a
        href={href}
        onMouseEnter={() => closeMenu()}
        className={cn(
          "inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium border border-transparent transition-all duration-150 active:scale-[0.98] outline-none select-none",
          "hover:bg-muted/70 hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          isActive
            ? "bg-muted text-foreground"
            : "text-muted-foreground",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {badge && (
          <Badge
            variant="outline"
            size="sm"
            className="font-mono text-[9px] py-0 px-1 border-border/80 shrink-0 whitespace-nowrap"
          >
            {badge}
          </Badge>
        )}
      </a>
    </li>
  );
}

/* -------------------------------------------------------------------------------------------------
 * NavMenuLink (Rich Link Item)
 * -----------------------------------------------------------------------------------------------*/

export interface NavMenuLinkProps extends React.ComponentProps<"a"> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  isExternal?: boolean;
}

export function NavMenuLink({
  title,
  description,
  icon,
  badge,
  isExternal,
  href,
  className,
  ...props
}: NavMenuLinkProps) {
  const { closeMenu } = useNavigation();

  return (
    <a
      href={href}
      onClick={(e) => {
        closeMenu();
        props.onClick?.(e);
      }}
      className={cn(
        "group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 border border-transparent active:scale-[0.99] outline-none select-none",
        "hover:bg-muted/70 hover:border-border/40",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="size-9 rounded-lg bg-muted/80 border border-border/50 flex items-center justify-center shrink-0 text-foreground transition-all duration-150 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 pointer-events-none">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
            {title}
          </span>
          {badge && (
            <Badge variant="secondary" size="sm" className="text-[9px] py-0 px-1 font-mono shrink-0 whitespace-nowrap">
              {badge}
            </Badge>
          )}
          {isExternal && (
            <ChevronRightIcon size={12} className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0 pointer-events-none" />
          )}
        </div>
        {description && (
          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </a>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Archetype A: NavMegaMenu (Split Featured + Link Grid)
 * -----------------------------------------------------------------------------------------------*/

export interface NavMegaMenuProps {
  featured?: NavMegaFeatured;
  links?: NavMenuLinkItem[];
  className?: string;
}

export function NavMegaMenu({ featured, links, className }: NavMegaMenuProps) {
  const { closeMenu } = useNavigation();

  return (
    <div className={cn("w-[660px] sm:w-[720px] max-w-[calc(100vw-2.5rem)] grid grid-cols-12 gap-5", className)}>
      {/* Featured Promo Card (Directive #6 Concentric Radii) */}
      {featured && (
        <div className="col-span-5 flex flex-col justify-between p-4 rounded-xl bg-gradient-to-b from-muted/60 via-muted/30 to-muted/10 border border-border/80 shadow-xs">
          <div className="space-y-2">
            {featured.badge && (
              <Badge variant="default" size="sm" className="text-[10px] uppercase font-mono tracking-wider">
                {featured.badge}
              </Badge>
            )}
            <div className="text-sm font-semibold text-foreground tracking-tight">
              {featured.title}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {featured.description}
            </p>
          </div>

          <div className="pt-4">
            <a href={featured.href} onClick={() => closeMenu()} className="block w-full">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="text-xs rounded-lg group"
              >
                <span>Explore Showcase</span>
                <ChevronRightIcon size={12} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Links Grid */}
      <div className={cn(featured ? "col-span-7" : "col-span-12", "grid grid-cols-1 sm:grid-cols-2 gap-1")}>
        {links?.map((link, idx) => (
          <NavMenuLink key={idx} {...link} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Archetype B: NavColumnsMenu (Categorized Directory Columns)
 * -----------------------------------------------------------------------------------------------*/

export interface NavColumnsMenuProps {
  columns?: NavMenuColumn[];
  className?: string;
}

export function NavColumnsMenu({ columns, className }: NavColumnsMenuProps) {
  if (!columns || columns.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-6 max-w-[calc(100vw-2.5rem)]",
        columns.length === 2 && "w-[540px] sm:w-[600px] grid-cols-2",
        columns.length >= 3 && "w-[720px] sm:w-[780px] grid-cols-3",
        className
      )}
    >
      {columns.map((col, cIdx) => (
        <div key={cIdx} className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground px-2.5 font-medium">
            {col.category}
          </div>
          <div className="space-y-1">
            {col.links.map((link, lIdx) => (
              <NavMenuLink key={lIdx} {...link} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Archetype C: NavSimpleMenu (Compact Flyout List)
 * -----------------------------------------------------------------------------------------------*/

export interface NavSimpleMenuProps {
  links?: NavMenuLinkItem[];
  className?: string;
}

export function NavSimpleMenu({ links, className }: NavSimpleMenuProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className={cn("w-72 sm:w-80 space-y-1", className)}>
      {links.map((link, idx) => (
        <NavMenuLink key={idx} {...link} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * NavActions Container
 * -----------------------------------------------------------------------------------------------*/

export function NavActions({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-2 shrink-0", className)} {...props}>
      {children}
    </div>
  );
}
