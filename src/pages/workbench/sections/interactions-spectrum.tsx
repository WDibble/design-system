import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Progress, CircularProgress } from "@/components/ui/progress";
import { ProgressiveImage } from "@/components/ui/image";
import { useToast } from "@/components/ui/toast";
import {
  KeyIcon,
  CpuIcon,
  UsersIcon,
  GaugeIcon,
  SparklesIcon,
  RotateCCWIcon,
} from "@/components/icons";

export function InteractionsSpectrum() {
  const { toast } = useToast();
  const [otpValue, setOtpValue] = React.useState("924715");
  const [otpMask, setOtpMask] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState("gemini-2.5-pro");
  const [progressValue, setProgressValue] = React.useState(74);
  const [isIndeterminateProgress, setIsIndeterminateProgress] = React.useState(false);
  const [imageKey, setImageKey] = React.useState(0);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          <span className="flex size-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 font-mono text-xs font-semibold text-primary">
            09
          </span>
          Advanced Primitives: OTP, Headless Select, Avatars & Progressive Media
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Native segmented SMS autofill parsing (Detail #15), Base UI form select with liquid glass
          menus, presence-aware avatars, spring-calibrated gauges, and BlurHash zero-CLS hydration
          (Detail #8).
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {/* 1. One-Time-Code / OTP Input (Detail #15) */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <KeyIcon size={16} />
              One-Time-Code / OTP Input
            </CardTitle>
            <CardDescription>
              Segmented PIN boxes with native SMS autofill parsing (`autocomplete="one-time-code"`),
              clipboard extraction, and active caret animation.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border/40 bg-muted/20 p-6">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                mask={otpMask}
                onComplete={(code) => {
                  toast({
                    title: "Code Verified",
                    description: `Verification code ${code} authenticated successfully.`,
                    type: "success",
                  });
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tabular-nums">
                <span>Value:</span>
                <span className="rounded bg-muted px-2 py-0.5 font-semibold text-foreground">
                  {otpValue || "(empty)"}
                </span>
                {otpValue.length === 6 && (
                  <Badge
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/30 text-emerald-500"
                  >
                    Complete
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-1">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setOtpValue("849201")}
                  className="text-xs"
                >
                  Paste SMS ("#849201")
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setOtpValue("")}
                  className="text-xs text-muted-foreground"
                >
                  Clear
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Mask PIN</span>
                <Switch
                  size="sm"
                  checked={otpMask}
                  onCheckedChange={setOtpMask}
                  aria-label="Toggle PIN masking"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Base UI Headless Select */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CpuIcon size={16} />
              Headless Form Select
            </CardTitle>
            <CardDescription>
              Full WCAG 2.2 accessible select built on `@base-ui/react` with liquid glass popover
              and arrow key navigation.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
              <label className="text-xs font-medium text-foreground">Active Inference Model</label>
              <Select value={selectedModel} onValueChange={(val) => val && setSelectedModel(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose foundation model..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectGroupLabel>Frontier Architectures</SelectGroupLabel>
                    <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro (Adaptive CoT)</SelectItem>
                    <SelectItem value="claude-3.7-sonnet">Claude 3.7 Sonnet (Hybrid)</SelectItem>
                    <SelectItem value="gpt-4.5">GPT-4.5 Orion (Massive Context)</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectGroupLabel>High-Throughput Edge</SelectGroupLabel>
                    <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash (Sub-100ms)</SelectItem>
                    <SelectItem value="deepseek-r1">DeepSeek R1 (Open Distilled)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                <span>Selected token:</span>
                <span className="font-mono font-semibold text-primary">{selectedModel}</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/30 bg-card/50 p-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground">Compact Select Variant</p>
                <p className="text-[11px] text-muted-foreground">
                  32px height for high-density tables and toolbars
                </p>
              </div>
              <Select defaultValue="standard">
                <SelectTrigger size="sm" className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="quantised">Quantised</SelectItem>
                  <SelectItem value="fp16">FP16 Tensor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 3. Presence Avatars & Stacked Groups */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <UsersIcon size={16} />
              Presence Avatars & Stacked Groups
            </CardTitle>
            <CardDescription>
              Deterministic OKLCH initials hashing, concentric masking borders, and live presence
              status pips.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* Stacked Group */}
            <div className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 p-4">
              <div>
                <p className="text-xs font-medium text-foreground">Design Systems Core Team</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Stacked with concentric border masks
                </p>
              </div>
              <AvatarGroup max={4}>
                <Avatar>
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
                    alt="Elena Rostova"
                  />
                  <AvatarFallback autoColor>ER</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces"
                    alt="Marcus Chen"
                  />
                  <AvatarFallback autoColor>MC</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback autoColor>AK</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback autoColor>SL</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback autoColor>TW</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback autoColor>DH</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </div>

            {/* Status Badges & Sizes */}
            <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
              <p className="text-xs font-medium text-foreground">Status Pips & Scale Spectrum</p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar size="lg">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
                      alt="Elena"
                    />
                    <AvatarFallback autoColor>EL</AvatarFallback>
                  </Avatar>
                  <AvatarBadge status="online" size="lg" />
                </div>

                <div className="relative">
                  <Avatar size="default">
                    <AvatarFallback autoColor>MC</AvatarFallback>
                  </Avatar>
                  <AvatarBadge status="busy" size="default" />
                </div>

                <div className="relative">
                  <Avatar size="sm">
                    <AvatarFallback autoColor>DG</AvatarFallback>
                  </Avatar>
                  <AvatarBadge status="away" size="sm" />
                </div>

                <div className="relative">
                  <Avatar size="xs">
                    <AvatarFallback autoColor>AI</AvatarFallback>
                  </Avatar>
                  <AvatarBadge status="offline" size="sm" />
                </div>

                <div className="flex-1 text-right text-xs text-muted-foreground">
                  <span>Online · Busy · Away</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Spring Meters & Radial Gauges */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <GaugeIcon size={16} />
              Spring Meters & Radial Gauges
            </CardTitle>
            <CardDescription>
              Tabular percentage readouts, linear specular tracks, and animated SVG radial gauges.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center justify-around gap-6 rounded-xl border border-border/40 bg-muted/20 p-4">
              {/* Radial Gauge */}
              <div className="flex flex-col items-center gap-2">
                <CircularProgress
                  value={isIndeterminateProgress ? null : progressValue}
                  size={64}
                  strokeWidth={5}
                  showValue
                />
                <span className="text-[11px] font-medium text-muted-foreground">Hydration</span>
              </div>

              {/* Linear Bar */}
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Compute Allocation</span>
                  <span className="font-mono text-muted-foreground tabular-nums">
                    {isIndeterminateProgress ? "Calculating..." : `${progressValue}%`}
                  </span>
                </div>
                <Progress value={isIndeterminateProgress ? null : progressValue} size="default" />
                <Progress
                  value={isIndeterminateProgress ? null : Math.round(progressValue * 0.6)}
                  size="sm"
                  className="opacity-60"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-1">
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setProgressValue((p) => Math.max(0, p - 10))}
                  disabled={isIndeterminateProgress}
                >
                  -10%
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setProgressValue((p) => Math.min(100, p + 10))}
                  disabled={isIndeterminateProgress}
                >
                  +10%
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Indeterminate</span>
                <Switch
                  size="sm"
                  checked={isIndeterminateProgress}
                  onCheckedChange={setIsIndeterminateProgress}
                  aria-label="Toggle indeterminate progress"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Progressive Media Hydration (Detail #8) */}
        <Card className="h-full lg:col-span-2">
          <CardHeader className="flex flex-col gap-3 pb-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <SparklesIcon size={16} className="shrink-0" />
                <span>Zero-CLS Progressive Image Hydration (Detail #8)</span>
              </CardTitle>
              <CardDescription>
                Low-resolution BlurHash preview decoding into full resolution with specular shimmer
                and zero layout shift.
              </CardDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setImageKey((k) => k + 1)}
              className="w-full shrink-0 md:w-auto"
            >
              <RotateCCWIcon size={12} className="mr-1.5" /> Re-trigger Hydration
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <ProgressiveImage
                key={`img-1-${imageKey}`}
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
                placeholderSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=50&auto=format&fit=crop&q=20"
                alt="Abstract glass fluidity"
                aspectRatio="16/9"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  Spatial Fluidity (16:9 Reserved)
                </span>
                <span className="font-mono text-[11px]">Zero Layout Shift</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <ProgressiveImage
                key={`img-2-${imageKey}`}
                src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80"
                placeholderSrc="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=50&auto=format&fit=crop&q=20"
                alt="Optical refraction crystal"
                aspectRatio="16/9"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  Optical Refraction (16:9 Reserved)
                </span>
                <span className="font-mono text-[11px]">Specular Shimmer Exit</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
