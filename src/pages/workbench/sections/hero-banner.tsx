import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardInner,
} from "@/components/ui/card";
import { Button, type ButtonState } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stepper } from "@/components/ui/stepper";
import { CopyButton } from "@/components/ui/copy-button";
import { ZapIcon, ArrowRightIcon, ActivityIcon } from "@/components/icons";

export function HeroBanner() {
  const [asyncBtnState, setAsyncBtnState] = React.useState<ButtonState>("idle");
  const [isCopied, setIsCopied] = React.useState(false);
  const [metric, setMetric] = React.useState(14820.75);
  const [quantity, setQuantity] = React.useState(3);

  const handleDeployFlow = () => {
    if (asyncBtnState !== "idle") return;
    setAsyncBtnState("loading");

    setTimeout(() => {
      setAsyncBtnState("success");
      setMetric((m) => +(m + 420.5).toFixed(2));

      setTimeout(() => {
        setAsyncBtnState("idle");
      }, 1800);
    }, 1200);
  };

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight [text-wrap:balance] text-foreground sm:text-2xl">
          <ZapIcon size={18} className="text-amber-500" />
          Kinetic Storytelling (Living State Transitions)
        </h2>
        <p className="mt-1 text-sm [text-wrap:pretty] text-muted-foreground">
          Components maintain continuous physical momentum between states rather than abruptly
          snapping.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Spotlight 1: Full Async Feedback Loop */}
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>Async Feedback Loop</CardTitle>
              <Badge variant="outline" size="sm" className="shrink-0 font-mono text-[10px]">
                Morph 01
              </Badge>
            </div>
            <CardDescription className="mt-1.5">
              Interactive kinetic feedback with pointerdown compression, async spinner, and spring
              checkmark.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <CardInner className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Pipeline Status
                  </p>
                  <p className="mt-0.5 truncate font-mono text-sm font-semibold">
                    production-edge-01
                  </p>
                </div>

                <Badge
                  variant={
                    asyncBtnState === "success"
                      ? "success"
                      : asyncBtnState === "loading"
                        ? "secondary"
                        : "outline"
                  }
                  size="sm"
                  dot
                  className="shrink-0"
                >
                  {asyncBtnState === "idle"
                    ? "Ready"
                    : asyncBtnState === "loading"
                      ? "Deploying"
                      : "Active"}
                </Badge>
              </div>

              <Button
                state={asyncBtnState}
                variant="default"
                className="mt-1 w-full"
                onClick={handleDeployFlow}
                loadingText="Deploying to Edge..."
                successText="Deployed to Edge!"
                rightIcon={<ArrowRightIcon size={16} />}
              >
                Deploy to Edge
              </Button>
            </CardInner>
          </CardContent>

          <CardFooter className="justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
            <span className="font-mono text-[11px]">Idle ➔ Load ➔ Success</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              Self-Contained Feedback
            </span>
          </CardFooter>
        </Card>

        {/* Spotlight 2: The Rolling Odometer Number Ticker */}
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>Rolling Odometer Ticker</CardTitle>
              <Badge variant="outline" size="sm" className="shrink-0 font-mono text-[10px]">
                Morph 02
              </Badge>
            </div>
            <CardDescription className="mt-1.5">
              Independent Y-axis digit rolling driven by calibrated spring physics with zero glyph
              jitter.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {/* 1. Compound Stepper with Balance Ticker */}
            <CardInner className="flex items-center justify-between gap-3">
              <Stepper
                value={metric}
                onValueChange={setMetric}
                step={150.25}
                min={0}
                prefix="$"
                decimalPlaces={2}
                className="w-full flex-wrap items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    <ActivityIcon size={14} className="inline-flex items-center text-primary" />
                    Balance Ticker
                  </p>
                  <Stepper.Value className="mt-0.5 font-mono text-xl font-bold tracking-tight sm:text-2xl" />
                </div>

                <Stepper.Controls className="shrink-0">
                  <Stepper.Increment aria-label="Increment balance" />
                  <Stepper.Decrement aria-label="Decrement balance" />
                </Stepper.Controls>
              </Stepper>
            </CardInner>

            {/* 2. Plug & Play Stepper */}
            <CardInner className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Plug & Play Stepper
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Hold to accelerate, auto boundary lock
                </p>
              </div>
              <Stepper
                value={quantity}
                onValueChange={setQuantity}
                min={1}
                max={20}
                step={1}
                className="shrink-0"
              />
            </CardInner>
          </CardContent>

          <CardFooter className="justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
            <span className="font-mono text-[11px]">springs.snappy</span>
            <span className="font-medium text-primary">Hold to accelerate</span>
          </CardFooter>
        </Card>

        {/* Spotlight 3: The Squishy Fluid Morph */}
        <Card className="md:col-span-2 xl:col-span-1">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>Squishy Fluid Morph</CardTitle>
              <Badge variant="outline" size="sm" className="shrink-0 font-mono text-[10px]">
                Morph 03
              </Badge>
            </div>
            <CardDescription className="mt-1.5">
              Elastic underdamped morphing between wide button and compact pill via GPU projection.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <CardInner className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Live API Secret
                  </p>
                  <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                    sk_live_98a…210f
                  </p>
                </div>
                <Badge variant="outline" size="sm" className="shrink-0">
                  Read Only
                </Badge>
              </div>

              <div className="flex justify-center pt-1">
                <CopyButton
                  variant="pill"
                  value="sk_live_98a44b91280f210f"
                  idleText="Copy API Token"
                  copiedText="Copied!"
                  copied={isCopied}
                  onCopiedChange={setIsCopied}
                />
              </div>
            </CardInner>
          </CardContent>

          <CardFooter className="justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
            <span className="font-mono text-[11px]">springs.squishy</span>
            <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
              Zero Layout Reflow
            </span>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
