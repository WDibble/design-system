import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from "@/components/ui/context-menu";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CursorClickIcon, TerminalIcon } from "@/components/icons";

export function ContextualSurfacesCard() {
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [engineMode, setEngineMode] = React.useState("apca");

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="flex flex-col gap-1 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CursorClickIcon size={16} className="text-primary" />
          <span>Contextual Floating Surfaces</span>
        </CardTitle>
        <CardDescription className="text-xs">
          Desktop-grade right-click context menu, rich hover preview cards, and swipeable bottom
          drawer.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Desktop Context Menu */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-semibold text-foreground">
            <span>Right-Click Context Menu</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              Secondary click / Long press
            </span>
          </label>
          <ContextMenu>
            <ContextMenuTrigger
              aria-label="Interactive context menu demo surface. Secondary click or press Shift+F10 to trigger menu."
              className="flex h-28 w-full cursor-context-menu flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 text-center transition-colors select-none hover:bg-muted/40"
            >
              <CursorClickIcon size={20} className="mb-1.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">
                Right click inside this area
              </span>
              <span className="text-[11px] text-muted-foreground">
                Triggers native context menu with keyboard navigation
              </span>
            </ContextMenuTrigger>

            <ContextMenuContent>
              <ContextMenuItem>
                <span>Reload Page</span>
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <span>Save Bookmark</span>
                <ContextMenuShortcut>⌘D</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                Show Bookmarks Bar
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>Contrast Engine</ContextMenuSubTrigger>
                <ContextMenuContent className="w-44">
                  <ContextMenuRadioGroup value={engineMode} onValueChange={setEngineMode}>
                    <ContextMenuRadioItem value="apca">WCAG 3 APCA</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="aa">WCAG 2.2 AA</ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <span>Purge Cache</span>
                <ContextMenuShortcut>⇧⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

        {/* HoverCard Profile Preview */}
        <div className="space-y-2.5 border-t border-border/40 pt-3">
          <label className="text-xs font-semibold text-foreground">
            Rich Hover Preview (HoverCard)
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Hover over author:</span>
            <HoverCard>
              <HoverCardTrigger
                aria-label="View Antigravity engine profile preview"
                className="cursor-pointer text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
              >
                @antigravity
              </HoverCardTrigger>
              <HoverCardContent className="w-80 space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="size-10 border border-border/80">
                    <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                      AG
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-foreground">Antigravity Engine</p>
                      <Badge size="sm" variant="secondary" className="font-mono text-[9px]">
                        v0.1
                      </Badge>
                    </div>
                    <p className="text-[11px] leading-snug text-muted-foreground">
                      Human-centric, agent-native design system built with React 19, Base UI, and
                      physical motion springs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-t border-border/40 pt-1 font-mono text-[11px] text-muted-foreground tabular-nums">
                  <div>
                    <strong className="text-foreground">48</strong> Primitives
                  </div>
                  <div>
                    <strong className="text-foreground">470</strong> Icons
                  </div>
                  <div>
                    <strong className="text-foreground">100%</strong> WCAG
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Bottom Sheet Drawer */}
        <div className="space-y-2.5 border-t border-border/40 pt-3">
          <label className="text-xs font-semibold text-foreground">
            Mobile Bottom Sheet (Drawer)
          </label>
          <div>
            <Drawer>
              <DrawerTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="Open system telemetry bottom drawer"
                    className="gap-2"
                  >
                    <TerminalIcon size={14} />
                    <span>Open Bottom Drawer</span>
                  </Button>
                }
              />
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>System Telemetry Drawer</DrawerTitle>
                  <DrawerDescription>
                    Drag or click the handle, swipe down on touch, or click anywhere outside to
                    dismiss.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="space-y-3 py-2 text-xs text-muted-foreground">
                  <div className="space-y-1 rounded-lg border border-border/60 bg-muted/40 p-3">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span>Fluid Frame Budget</span>
                      <span className="font-semibold text-emerald-600 tabular-nums dark:text-emerald-400">
                        16.6ms (60 FPS)
                      </span>
                    </div>
                    <div className="flex justify-between font-mono text-[11px]">
                      <span>Speculation Pre-render</span>
                      <span className="font-semibold text-primary">Active</span>
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose
                    render={
                      <Button variant="default" size="sm" className="w-full">
                        Close Drawer
                      </Button>
                    }
                  />
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
