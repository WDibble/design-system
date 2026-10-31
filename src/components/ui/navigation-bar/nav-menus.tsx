import { ChevronRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  NavMenuLinkProps,
  NavMegaMenuProps,
  NavColumnsMenuProps,
  NavSimpleMenuProps,
} from "./types";
import { useNavigation } from "./nav-context";

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
        "group flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-150 outline-none select-none active:scale-[0.99]",
        "hover:border-border/40 hover:bg-muted/70",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="pointer-events-none flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted/80 text-foreground transition-all duration-150 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold whitespace-nowrap text-foreground transition-colors group-hover:text-primary">
            {title}
          </span>
          {badge && (
            <Badge
              variant="secondary"
              size="sm"
              className="shrink-0 px-1 py-0 font-mono text-[9px] whitespace-nowrap"
            >
              {badge}
            </Badge>
          )}
          {isExternal && (
            <ChevronRightIcon
              size={12}
              className="pointer-events-none shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
            />
          )}
        </div>
        {description && (
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </a>
  );
}

export function NavMegaMenu({ featured, links, className }: NavMegaMenuProps) {
  const { closeMenu } = useNavigation();

  return (
    <div
      className={cn(
        "grid w-[660px] max-w-[calc(100vw-2.5rem)] grid-cols-12 gap-5 sm:w-[720px]",
        className
      )}
    >
      {/* Featured Promo Card (Directive #6 Concentric Radii) */}
      {featured && (
        <div className="col-span-5 flex flex-col justify-between rounded-xl border border-border/80 bg-gradient-to-b from-muted/60 via-muted/30 to-muted/10 p-4 shadow-xs">
          <div className="space-y-2">
            {featured.badge && (
              <Badge
                variant="default"
                size="sm"
                className="font-mono text-[10px] tracking-wider uppercase"
              >
                {featured.badge}
              </Badge>
            )}
            <div className="text-sm font-semibold tracking-tight text-foreground">
              {featured.title}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{featured.description}</p>
          </div>

          <div className="pt-4">
            <a href={featured.href} onClick={() => closeMenu()} className="block w-full">
              <Button variant="outline" size="sm" fullWidth className="group rounded-lg text-xs">
                <span>Explore Showcase</span>
                <ChevronRightIcon
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Links Grid */}
      <div
        className={cn(
          featured ? "col-span-7" : "col-span-12",
          "grid grid-cols-1 gap-1 sm:grid-cols-2"
        )}
      >
        {links?.map((link, idx) => (
          <NavMenuLink key={idx} {...link} />
        ))}
      </div>
    </div>
  );
}

export function NavColumnsMenu({ columns, className }: NavColumnsMenuProps) {
  if (!columns || columns.length === 0) return null;

  return (
    <div
      className={cn(
        "grid max-w-[calc(100vw-2.5rem)] gap-6",
        columns.length <= 1 && "w-72 grid-cols-1 sm:w-80",
        columns.length === 2 && "w-[540px] grid-cols-2 sm:w-[600px]",
        columns.length >= 3 && "w-[720px] grid-cols-3 sm:w-[780px]",
        className
      )}
    >
      {columns.map((col, cIdx) => (
        <div key={cIdx} className="space-y-2">
          <div className="px-2.5 font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
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

export function NavSimpleMenu({ links, className }: NavSimpleMenuProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className={cn("w-72 space-y-1 sm:w-80", className)}>
      {links.map((link, idx) => (
        <NavMenuLink key={idx} {...link} />
      ))}
    </div>
  );
}
