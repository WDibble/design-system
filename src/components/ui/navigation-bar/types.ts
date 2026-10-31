import type * as React from "react";

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

export interface NavigationBarProps extends React.ComponentProps<"nav"> {
  brand?: React.ReactNode;
  items?: NavItemConfig[];
  actions?: React.ReactNode;
  mobileBrand?: React.ReactNode;
  mobileFooter?: React.ReactNode;
  sticky?: boolean;
  containerClassName?: string;
  /**
   * Maximum number of items rendered directly on desktop before folding into "More ▾".
   * Guarantees zero clashing with actions on the right regardless of how many items exist.
   * @default 4
   */
  maxVisibleItems?: number;
  /**
   * Custom label for the synthesized overflow dropdown trigger.
   * @default "More"
   */
  moreLabel?: string;
  /**
   * Custom badge for the synthesized overflow dropdown trigger.
   */
  moreBadge?: string;
}

export interface NavBrandProps extends React.ComponentProps<"a"> {
  children?: React.ReactNode;
}

export interface NavItemProps {
  id: string;
  label: string;
  badge?: string;
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
  className?: string;
}

export interface NavItemLinkProps extends React.ComponentProps<"a"> {
  badge?: string;
  isActive?: boolean;
}

export interface NavMenuLinkProps extends React.ComponentProps<"a"> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  isExternal?: boolean;
}

export interface NavMegaMenuProps {
  featured?: NavMegaFeatured;
  links?: NavMenuLinkItem[];
  className?: string;
}

export interface NavColumnsMenuProps {
  columns?: NavMenuColumn[];
  className?: string;
}

export interface NavSimpleMenuProps {
  links?: NavMenuLinkItem[];
  className?: string;
}
