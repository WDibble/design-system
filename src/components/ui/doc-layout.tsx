"use client";

import * as React from "react";
import { CircleCheckIcon, FileTextIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

export interface DocNavItem {
  id: string;
  label: string;
  badge?: string;
}

export interface DocNavGroup {
  title: string;
  items: DocNavItem[];
}

export interface DocHeadingItem {
  id: string;
  label: string;
  level?: 2 | 3;
}

export interface DocVerificationItem {
  label: string;
  command?: string;
}

export interface DocLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DocLayout = React.forwardRef<HTMLDivElement, DocLayoutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto grid w-full max-w-[1440px] min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_240px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DocLayout.displayName = "DocLayout";

export interface DocSidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  groups: DocNavGroup[];
  activeId: string;
  onSelect: (id: string) => void;
  header?: React.ReactNode;
}

export const DocSidebar = React.forwardRef<HTMLElement, DocSidebarProps>(
  ({ groups, activeId, onSelect, header, className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "min-w-0 rounded-2xl border border-border/60 bg-card/45 p-3 lg:sticky lg:top-24",
          className
        )}
        {...props}
      >
        {header && <div className="mb-3 border-b border-border/50 px-2 pb-3">{header}</div>}
        <nav aria-label="Documentation navigation" className="flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <div className="px-2.5 pb-1 font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                {group.title}
              </div>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive = item.id === activeId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onSelect(item.id)}
                        className={cn(
                          // Constant font-medium + border-transparent ensures zero horizontal jitter across states
                          "flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs font-medium transition-[background-color,color,transform] duration-150 select-none active:scale-[0.98]",
                          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        <span className="min-w-0 flex-1 [text-wrap:balance]">{item.label}</span>
                        {item.badge && (
                          <Badge variant="outline" size="sm">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    );
  }
);
DocSidebar.displayName = "DocSidebar";

export interface DocArticleProps extends React.HTMLAttributes<HTMLElement> {
  /** Raw Markdown representation of the active documentation section for LLM clipboard ingestion */
  markdownSource?: string;
  /** Optional relative path to machine-readable llms.txt index */
  llmsHref?: string;
  /** Optional left-side breadcrumb or navigation action */
  headerSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const DocArticle = React.forwardRef<HTMLElement, DocArticleProps>(
  ({ markdownSource, llmsHref = "/llms.txt", headerSlot, children, className, ...props }, ref) => {
    const showActionBar = Boolean(headerSlot || markdownSource || llmsHref);

    return (
      <article ref={ref} className={cn("w-full max-w-[72ch] min-w-0", className)} {...props}>
        {showActionBar && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
            <div className="min-w-0">{headerSlot}</div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {markdownSource && (
                <CopyButton
                  value={markdownSource}
                  size="sm"
                  variant="outline"
                  idleText="Copy page as Markdown"
                  copiedText="Markdown copied"
                  aria-label="Copy page as Markdown"
                />
              )}
              {llmsHref && (
                <a
                  href={llmsHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex h-7 items-center gap-1.5 rounded-md border border-border/80 bg-card px-2.5 text-xs font-medium text-foreground shadow-xs transition-[background-color,color,transform] duration-150 select-none active:scale-[0.98]",
                    "hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  )}
                >
                  <FileTextIcon size={13} aria-hidden="true" />
                  <span>llms.txt</span>
                </a>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-8">{children}</div>
      </article>
    );
  }
);
DocArticle.displayName = "DocArticle";

export interface DocTocProps extends React.HTMLAttributes<HTMLElement> {
  /** Section headings shown in the table of contents */
  headings: DocHeadingItem[];
  /** Concrete verification checklist items rendered in the confirmation card */
  verificationChecks?: DocVerificationItem[];
}

export const DocToc = React.forwardRef<HTMLElement, DocTocProps>(
  ({ headings, verificationChecks, className, ...props }, ref) => {
    const [activeHeading, setActiveHeading] = React.useState<string>(() => headings[0]?.id ?? "");

    const resolvedActiveId = React.useMemo(() => {
      if (headings.some((h) => h.id === activeHeading)) {
        return activeHeading;
      }
      return headings[0]?.id ?? "";
    }, [headings, activeHeading]);

    React.useEffect(() => {
      if (typeof IntersectionObserver === "undefined" || headings.length === 0) {
        return;
      }

      const elements = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible?.target.id) {
            setActiveHeading(visible.target.id);
          }
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0.1 }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, [headings]);

    return (
      <aside
        ref={ref}
        aria-label="On this page"
        className={cn("flex min-w-0 flex-col gap-5 xl:sticky xl:top-24", className)}
        {...props}
      >
        {headings.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              On This Page
            </div>
            <ul className="flex flex-col gap-1 border-l border-border/60 pl-3">
              {headings.map((heading) => {
                const isActive = heading.id === resolvedActiveId;
                return (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      onClick={() => setActiveHeading(heading.id)}
                      className={cn(
                        "block py-1 text-xs font-medium transition-colors duration-150",
                        heading.level === 3 && "pl-3",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {heading.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {verificationChecks && verificationChecks.length > 0 && (
          <div className="flex flex-col gap-2.5 rounded-2xl border border-border/70 bg-card/55 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-tight text-foreground">
              <CircleCheckIcon size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>It&apos;s Working If</span>
            </div>
            <ul className="flex flex-col gap-2">
              {verificationChecks.map((check) => (
                <li key={check.label} className="flex flex-col gap-1 text-xs">
                  <span className="[text-wrap:pretty] text-muted-foreground">{check.label}</span>
                  {check.command && (
                    <code className="w-fit rounded-md border border-border/50 bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                      {check.command}
                    </code>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    );
  }
);
DocToc.displayName = "DocToc";
