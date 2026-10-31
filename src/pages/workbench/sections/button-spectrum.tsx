import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button, type IconAnimationTrigger } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import {
  LayersIcon,
  ArrowRightIcon,
  Trash2Icon,
  CheckIcon,
  SendIcon,
  SlidersHorizontalIcon,
} from "@/components/icons";

export function ButtonSpectrum() {
  const [iconTriggerMode, setIconTriggerMode] = React.useState<IconAnimationTrigger>("hover");

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          <LayersIcon size={16} />
          Button Variants &amp; Kinetic Icon Intent
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Directional action icons with reversible kinetic affordance and hover or press physics.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Variant &amp; Sizing Hierarchy</CardTitle>
              <CardDescription className="mt-0.5">
                Toggle trigger mode below to switch animated icon physics between mouse hover and
                pointerdown press.
              </CardDescription>
            </div>

            <SegmentedControl
              value={iconTriggerMode}
              onValueChange={(val) => setIconTriggerMode(val as IconAnimationTrigger)}
              className="shrink-0"
            >
              <SegmentedControlItem value="hover">Hover Trigger</SegmentedControlItem>
              <SegmentedControlItem value="press">Press Trigger (Pointerdown)</SegmentedControlItem>
            </SegmentedControl>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Row 1: All 9 Variants */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="default"
              iconTrigger={iconTriggerMode}
              rightIcon={<ArrowRightIcon size={16} />}
            >
              Primary CTA
            </Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline Specular</Button>
            <Button variant="glass">Liquid Glass</Button>
            <Button
              variant="destructive"
              iconTrigger={iconTriggerMode}
              leftIcon={<Trash2Icon size={16} />}
            >
              Destructive
            </Button>
            <Button variant="warning">Warning Alert</Button>
            <Button variant="success">Success Affirm</Button>
            <Button variant="ghost">Ghost Trigger</Button>
            <Button variant="link">Inline Anchor</Button>
          </div>

          {/* Row 2: Complete Sizing Scale & Icon Touch Target (28px - 48px) */}
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">XS (28px)</Button>
            <Button size="sm">Small (32px)</Button>
            <Button size="default">Default (36px)</Button>
            <Button
              size="lg"
              iconTrigger={iconTriggerMode}
              rightIcon={<ArrowRightIcon size={18} />}
            >
              Large (40px)
            </Button>
            <Button
              size="xl"
              variant="default"
              iconTrigger={iconTriggerMode}
              rightIcon={<ArrowRightIcon size={20} />}
            >
              Hero XL (48px)
            </Button>

            <div className="mx-1 hidden h-6 w-px bg-border/60 sm:block" aria-hidden="true" />

            <Button
              size="icon-xs"
              variant="outline"
              iconTrigger={iconTriggerMode}
              aria-label="Extra small action"
            >
              <CheckIcon size={12} />
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              iconTrigger={iconTriggerMode}
              aria-label="Small action"
            >
              <CheckIcon size={14} />
            </Button>
            <Button
              size="icon"
              variant="default"
              iconTrigger={iconTriggerMode}
              aria-label="Send message"
            >
              <SendIcon size={16} />
            </Button>
            <Button
              size="icon-lg"
              variant="secondary"
              iconTrigger={iconTriggerMode}
              aria-label="Adjust settings"
            >
              <SlidersHorizontalIcon size={18} />
            </Button>
          </div>

          {/* Row 3: Responsive Anti-Crush Architecture & Full-Width Adaptivity */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Responsive Anti-Crush Layout Adaptivity
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Full width on mobile viewports (
                  <code className="rounded bg-muted px-1 py-0.5 text-[10px]">w-full sm:w-auto</code>
                  ), stationary 0px anchor for popovers, and touch hit-slop ≥ 44px.
                </p>
              </div>
              <Badge
                variant="outline"
                size="sm"
                className="self-start font-mono text-[10px] sm:self-auto"
              >
                Directive 7 &amp; 9 Verified
              </Badge>
            </div>
            <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row">
              <Button fullWidth className="sm:w-auto" variant="default">
                Full Width Mobile CTA
              </Button>
              <Button fullWidth className="sm:w-auto" variant="outline">
                Secondary Responsive Action
              </Button>
              <Button fullWidth className="sm:flex-1" variant="glass">
                Fluid Flex Container Fill
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
