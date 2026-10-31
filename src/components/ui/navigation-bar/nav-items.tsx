import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDownIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { springs } from "@/tokens/motion";
import { cn } from "@/lib/utils";
import type { NavBrandProps, NavItemProps, NavItemLinkProps } from "./types";
import { useNavigation } from "./nav-context";

export function NavBrand({ className, children, href = "/", ...props }: NavBrandProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-lg border border-transparent px-1 text-sm font-semibold tracking-tight text-foreground transition-all duration-150 outline-none select-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function NavList({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("m-0 flex list-none items-center gap-1 p-0", className)} {...props}>
      {children}
    </ul>
  );
}

const alignmentClasses: Record<"start" | "center" | "end", string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

export function NavItem({ id, label, badge, align = "start", children, className }: NavItemProps) {
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
    <li className={cn("relative", isOpen && "z-50", className)} onMouseEnter={handleMouseEnter}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={isOpen ? dropdownId : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "group inline-flex h-9 items-center gap-1.5 rounded-lg border border-transparent px-3 text-xs font-medium transition-all duration-150 outline-none select-none active:scale-[0.98]",
          "hover:bg-muted/70 hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          isOpen ? "bg-muted text-foreground" : "text-muted-foreground"
        )}
      >
        <span>{label}</span>
        {badge && (
          <Badge
            variant="outline"
            size="sm"
            className="shrink-0 border-border/80 px-1 py-0 font-mono text-[9px] whitespace-nowrap"
          >
            {badge}
          </Badge>
        )}
        <ChevronDownIcon
          size={12}
          className={cn(
            "pointer-events-none shrink-0 opacity-60 transition-transform duration-200 ease-out group-hover:opacity-100",
            isOpen && "rotate-180 text-foreground opacity-100"
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
            className={cn("absolute top-full z-50 pt-2 select-text", alignmentClasses[align])}
          >
            <div className="specular-rim max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border/80 bg-popover/95 p-4 text-popover-foreground shadow-2xl backdrop-blur-xl sm:p-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
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
          "inline-flex h-9 items-center gap-1.5 rounded-lg border border-transparent px-3 text-xs font-medium transition-all duration-150 outline-none select-none active:scale-[0.98]",
          "hover:bg-muted/70 hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          isActive ? "bg-muted text-foreground" : "text-muted-foreground",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {badge && (
          <Badge
            variant="outline"
            size="sm"
            className="shrink-0 border-border/80 px-1 py-0 font-mono text-[9px] whitespace-nowrap"
          >
            {badge}
          </Badge>
        )}
      </a>
    </li>
  );
}

export function NavActions({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}
