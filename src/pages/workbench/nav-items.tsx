import type { NavItemConfig } from "@/components/ui/navigation-bar";
import {
  LayersIcon,
  SparklesIcon,
  ActivityIcon,
  PaletteIcon,
  TerminalIcon,
  CpuIcon,
  SlidersHorizontalIcon,
  EyeIcon,
  ShieldCheckIcon,
  ServerIcon,
  ZapIcon,
  UsersIcon,
  RotateCCWIcon,
} from "@/components/icons";

export function getDemoNavItems(navigateTo: (path: string) => void): NavItemConfig[] {
  return [
    {
      label: "Platform",
      type: "mega",
      badge: "v2.0",
      featured: {
        title: "Liquid Glass Materials",
        description: "Real-time physical shaders with chromatic lensing and specular rims.",
        href: "#spatial-materials",
        badge: "Highlight",
      },
      links: [
        {
          title: "UI Primitives",
          description: "37 accessible compound components",
          href: "#primitives",
          icon: <LayersIcon size={16} />,
          badge: "v2.0",
        },
        {
          title: "Kinetic Icons",
          description: "470+ icons with reversible physics",
          href: "#icons-spectrum",
          icon: <SparklesIcon size={16} />,
          badge: "470+",
        },
        {
          title: "Motion Physics",
          description: "Apple HIG spring dynamics with pointerdown yield",
          href: "#buttons",
          icon: <ActivityIcon size={16} />,
        },
        {
          title: "Theme Studio",
          description: "OKLCH dual-engine WCAG 2.2 colour tokens",
          href: "#theme-studio",
          icon: <PaletteIcon size={16} />,
        },
      ],
    },
    {
      label: "Resources",
      type: "columns",
      columns: [
        {
          category: "Developers",
          links: [
            {
              title: "CLI & Registry",
              description: "Copy-paste primitives into any project",
              href: "#cli",
              icon: <TerminalIcon size={16} />,
            },
            {
              title: "Compound Patterns",
              description: "Headless Base UI composition",
              href: "#docs",
              icon: <CpuIcon size={16} />,
            },
            {
              title: "Fluid Layouts",
              description: "Anti-crush container queries and safe bounds",
              href: "#layout",
              icon: <SlidersHorizontalIcon size={16} />,
            },
          ],
        },
        {
          category: "Manifesto & Safety",
          links: [
            {
              title: "Quiet Chrome",
              description: "Human-centric spatial typography",
              href: "/principles",
              icon: <EyeIcon size={16} />,
              onClick: (e) => {
                e.preventDefault();
                navigateTo("/principles");
              },
            },
            {
              title: "Accessibility Matrix",
              description: "WCAG 2.2 AA and APCA contrast invariants",
              href: "#a11y",
              icon: <ShieldCheckIcon size={16} />,
            },
            {
              title: "System Telemetry",
              description: "Real-time performance and zero CLS",
              href: "#telemetry",
              icon: <ServerIcon size={16} />,
            },
          ],
        },
      ],
    },
    {
      label: "Ecosystem",
      type: "simple",
      links: [
        {
          title: "Design Principles",
          description: "Anti-slop design engineering manifesto (v0.1 Draft)",
          href: "/principles",
          icon: <ZapIcon size={16} />,
          badge: "v0.1",
          onClick: (e) => {
            e.preventDefault();
            navigateTo("/principles");
          },
        },
        {
          title: "Team Permissions",
          description: "Role-based access and telemetry controls",
          href: "#teams",
          icon: <UsersIcon size={16} />,
        },
        {
          title: "Changelog",
          description: "Release v0.9.4 with turnkey navbars",
          href: "#changelog",
          icon: <RotateCCWIcon size={16} />,
          badge: "v0.9.4",
        },
      ],
    },
    {
      label: "Docs",
      href: "#documentation",
    },
    {
      label: "Pricing",
      href: "#pricing",
      badge: "Open Source",
    },
  ];
}
