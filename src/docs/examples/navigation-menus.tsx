"use client";

import * as React from "react";
import { LayersIcon, ShieldCheckIcon } from "@/components/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavigationBar, type NavItemConfig } from "@/components/ui/navigation-bar";
import { Pagination } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SAMPLE_NAV_ITEMS: NavItemConfig[] = [
  {
    label: "Platform",
    type: "simple",
    links: [
      {
        title: "UI Primitives",
        description: "57 accessible components",
        href: "#primitives",
        icon: <LayersIcon size={16} />,
      },
      {
        title: "Compiler Invariants",
        description: "18 static checks",
        href: "#invariants",
        icon: <ShieldCheckIcon size={16} />,
      },
    ],
  },
  { label: "Documentation", href: "#docs" },
  { label: "Tokens", href: "#tokens" },
];

export function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#workbench">Workbench</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#docs">Primitives</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Button</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function NavigationBarExample() {
  return (
    <div className="w-full max-w-xl">
      <NavigationBar
        brand={<span className="text-sm font-semibold text-foreground">Design Standard</span>}
        items={SAMPLE_NAV_ITEMS}
        maxVisibleItems={3}
      />
    </div>
  );
}

export function PaginationExample() {
  const [page, setPage] = React.useState(2);

  return <Pagination currentPage={page} totalPages={6} onPageChange={setPage} />;
}

export function TabsExample() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="tokens">
        <TabsList>
          <TabsIndicator />
          <TabsTrigger value="tokens">OKLCH Tokens</TabsTrigger>
          <TabsTrigger value="physics">Spring Physics</TabsTrigger>
        </TabsList>
        <TabsContent value="tokens" className="pt-3 text-xs text-muted-foreground">
          All light and dark pairs satisfy WCAG 2.2 AA and APCA thresholds.
        </TabsContent>
        <TabsContent value="physics" className="pt-3 text-xs text-muted-foreground">
          Controls compress on pointerdown using calibrated spring curves.
        </TabsContent>
      </Tabs>
    </div>
  );
}
