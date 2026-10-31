import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { SlidersHorizontalIcon, SearchIcon, BadgeAlertIcon, VolumeIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function FormsSpectrum() {
  const [emailValue, setEmailValue] = React.useState("team@acme");
  const [notesValue, setNotesValue] = React.useState(
    "Tactile pointerdown yield and zero layout shift on all interactive surfaces."
  );
  const [switchNotifications, setSwitchNotifications] = React.useState(true);
  const [switchLayoutShift, setSwitchLayoutShift] = React.useState(true);
  const [checkbox1, setCheckbox1] = React.useState(true);
  const [checkbox2, setCheckbox2] = React.useState(false);
  const [checkboxIndeterminate, setCheckboxIndeterminate] = React.useState<
    boolean | "indeterminate"
  >("indeterminate");
  const [sliderValue, setSliderValue] = React.useState(68);
  const [rangeValues, setRangeValues] = React.useState<number[]>([25, 75]);

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          <SlidersHorizontalIcon size={16} />
          Form & Input Primitives (Batch 2)
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Headless Base UI composition, 16px iOS zoom prevention, specular top rims, and fluid
          continuous tracking
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Column 1: Text Fields & Validation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" size="sm">
                Directive #2 & #4
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                Base UI Field · ARIA Coordination
              </span>
            </div>
            <CardTitle className="mt-2">Text Inputs & Accessible Fields</CardTitle>
            <CardDescription>
              Inputs enforce 16px font size on mobile viewports (&lt;640px) to prevent iOS
              auto-zoom, and feature 1px specular lighting.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {/* Search Input with Icon */}
            <Field>
              <FieldLabel>Repository Search</FieldLabel>
              <Input
                leftIcon={<SearchIcon size={16} />}
                placeholder="Search components, tokens, or skills..."
              />
              <FieldDescription>
                Search across all 470 animated icons and primitives.
              </FieldDescription>
            </Field>

            {/* Input with Prefix & Suffix */}
            <Field>
              <FieldLabel optional>Custom Domain</FieldLabel>
              <Input prefixText="https://" suffixText=".acme.design" placeholder="my-workspace" />
            </Field>

            {/* Input with Base UI Validation Error State */}
            <Field>
              <FieldLabel requiredIndicator>Work Email</FieldLabel>
              <Input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                error={!emailValue.includes("@") || !emailValue.includes(".")}
                placeholder="name@company.com"
              />
              {(!emailValue.includes("@") || !emailValue.includes(".")) && (
                <FieldError>
                  <BadgeAlertIcon size={14} className="shrink-0" />
                  Please enter a valid corporate email address.
                </FieldError>
              )}
              <FieldDescription>
                We will send your deployment webhook notifications here.
              </FieldDescription>
            </Field>

            {/* Textarea */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Commit Description</FieldLabel>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {notesValue.length}/140
                </span>
              </div>
              <Textarea
                rows={3}
                maxLength={140}
                value={notesValue}
                onChange={(e) => setNotesValue(e.target.value)}
                placeholder="Provide details about the tactile interface enhancements..."
              />
            </Field>
          </CardContent>
        </Card>

        {/* Column 2: Switches, Checkboxes & Sliders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" size="sm">
                Directive #1 & #3
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                Apple HIG Spring Easing
              </span>
            </div>
            <CardTitle className="mt-2">Tactile Switches, Checkboxes & Sliders</CardTitle>
            <CardDescription>
              44px accessible touch expansion, immediate physical yield on pointerdown, and zero
              horizontal jitter tabular numerals.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            {/* Switches Spectrum */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Fluid Switches
              </span>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40">
                <div className="flex flex-col">
                  <span className="text-sm leading-none font-medium">
                    Instant Push Notifications
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    Active spring compression on thumb press.
                  </span>
                </div>
                <Switch
                  checked={switchNotifications}
                  onCheckedChange={setSwitchNotifications}
                  aria-label="Toggle instant push notifications"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40">
                <div className="flex flex-col">
                  <span className="text-sm leading-none font-medium">
                    Enforce Zero-Shift Layouts
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    Small switch variant (sm).
                  </span>
                </div>
                <Switch
                  size="sm"
                  checked={switchLayoutShift}
                  onCheckedChange={setSwitchLayoutShift}
                  aria-label="Toggle strict zero-shift layouts"
                />
              </label>
            </div>

            {/* Checkbox Spectrum */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Accessible Checkboxes
              </span>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40">
                  <Checkbox
                    checked={checkbox1}
                    onCheckedChange={(c) => setCheckbox1(Boolean(c))}
                    aria-label="Checked option"
                  />
                  <span className="text-xs font-medium">Checked</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40">
                  <Checkbox
                    checked={checkbox2}
                    onCheckedChange={(c) => setCheckbox2(Boolean(c))}
                    aria-label="Unchecked option"
                  />
                  <span className="text-xs font-medium">Unchecked</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40">
                  <Checkbox
                    indeterminate={checkboxIndeterminate === "indeterminate"}
                    checked={checkboxIndeterminate === true}
                    onCheckedChange={() => {
                      setCheckboxIndeterminate((prev) => {
                        if (prev === "indeterminate") return true;
                        if (prev === true) return false;
                        return "indeterminate";
                      });
                    }}
                    aria-label="Indeterminate option"
                  />
                  <span className="text-xs font-medium">Indeterminate</span>
                </label>
              </div>
            </div>

            {/* Fluid Sliders Spectrum */}
            <div className="flex flex-col gap-5 pt-1">
              {/* Single Fluid Slider with Presets & Live Tooltip */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <VolumeIcon size={15} className="text-muted-foreground" />
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Haptic Volume
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Interactive Presets */}
                    <div className="flex items-center gap-1">
                      {[0, 25, 50, 75, 100].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSliderValue(preset)}
                          className={cn(
                            "cursor-pointer rounded-md border px-1.5 py-0.5 font-mono text-[10px] tabular-nums transition-colors select-none",
                            sliderValue === preset
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {preset}%
                        </button>
                      ))}
                    </div>
                    <span className="min-w-8 text-right font-mono text-xs font-semibold text-foreground tabular-nums">
                      {sliderValue}%
                    </span>
                  </div>
                </div>

                <Slider
                  value={sliderValue}
                  onValueChange={(val) => setSliderValue(val as number)}
                  min={0}
                  max={100}
                  step={1}
                  valueSuffix="%"
                  showTooltip
                  aria-label="Haptic sensitivity"
                />
                <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>0% (Silent)</span>
                  <span className="text-muted-foreground/60">
                    Hover or scrub thumb for animated pill
                  </span>
                  <span>100% (Maximum)</span>
                </div>
              </div>

              {/* Dual Thumb Range Slider */}
              <div className="flex flex-col gap-2.5 border-t border-border/40 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Frequency Bandwidth Range
                  </span>
                  <span className="font-mono text-xs font-semibold text-foreground tabular-nums">
                    {rangeValues[0]}Hz to {rangeValues[1]}Hz
                  </span>
                </div>

                <Slider
                  value={rangeValues}
                  onValueChange={(val) => setRangeValues(val as number[])}
                  min={0}
                  max={100}
                  step={1}
                  valueSuffix="Hz"
                  showTooltip
                  aria-label="Frequency bandwidth range"
                />
                <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>0Hz (Sub-bass)</span>
                  <span>100Hz (Upper treble)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
