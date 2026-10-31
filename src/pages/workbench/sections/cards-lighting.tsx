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
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          <EyeIcon size={16} />
          Concentric Corner Radii Invariant
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Testing the mathematical invariant: R_inner = max(0, R_outer - Padding).
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="outline" size="sm">
              Directive #6
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">
              R_out=16px · P=8px · R_in=8px
            </span>
          </div>
          <CardTitle className="mt-2">Concentric Geometric Continuity</CardTitle>
          <CardDescription>
            Outer card is rounded-2xl (16px). Inner nested card is rounded-lg (8px) with 8px
            padding. Corners share the same origin, eliminating lumpy, bulging corners.
          </CardDescription>
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
