import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardInner,
} from "@/components/ui/card";
import { EyeIcon } from "@/components/icons";

export function CardsLighting() {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-2xl">
          <EyeIcon size={18} />
          Concentric Corner Radii Invariant
        </h2>
        <p className="mt-1 text-sm [text-wrap:pretty] text-muted-foreground">
          Testing the mathematical invariant: R_inner = max(0, R_outer - Padding).
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle>Concentric Geometric Continuity</CardTitle>
              <CardDescription className="mt-1.5">
                Outer card is rounded-2xl (16px). Inner nested card is rounded-lg (8px) with 8px
                padding. Corners share the same origin, eliminating lumpy, bulging corners.
              </CardDescription>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                Directive #6
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                R_out=16px, P=8px, R_in=8px
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <CardInner className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Concentric Nested Card
              </p>
              <p className="mt-0.5 text-sm font-medium">
                Smooth uniform optical padding across all four quadrants.
              </p>
            </div>
            <Badge variant="outline" size="sm" className="shrink-0">
              100% Parallel
            </Badge>
          </CardInner>
        </CardContent>

        <CardFooter className="justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
          <span>Quiet Chrome Doctrine: No card-in-card visual bloat</span>
          <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
            Verified Invariant
          </span>
        </CardFooter>
      </Card>
    </section>
  );
}
