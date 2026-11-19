"use client";

import * as React from "react";
import { SearchIcon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Stepper } from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const FRAMEWORK_ITEMS = ["React 19", "Next.js", "Vite", "Astro", "Remix"];

export function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);

  return (
    <label className="inline-flex items-center gap-2.5 text-sm text-foreground">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <span>Enforce APCA contrast check on build</span>
    </label>
  );
}

export function ComboboxExample() {
  const [framework, setFramework] = React.useState<string | null>("Vite");

  return (
    <div className="w-full max-w-xs">
      <Field>
        <FieldLabel>Target Runtime</FieldLabel>
        <Combobox items={FRAMEWORK_ITEMS} value={framework} onValueChange={setFramework}>
          <ComboboxInput placeholder="Search runtime..." aria-label="Select target runtime" />
          <ComboboxContent>
            <ComboboxList>
              {FRAMEWORK_ITEMS.map((item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              ))}
              <ComboboxEmpty>No matching runtime.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  );
}

export function FieldExample() {
  const [slug, setSlug] = React.useState("edge-gateway");
  const isInvalid = slug.trim().length < 3;

  return (
    <div className="w-full max-w-sm">
      <Field invalid={isInvalid}>
        <FieldLabel requiredIndicator>Workspace Slug</FieldLabel>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="workspace-slug"
          error={isInvalid}
        />
        <FieldDescription>Used inside stable documentation routes.</FieldDescription>
        <FieldError match={isInvalid}>Minimum 3 characters required.</FieldError>
      </Field>
    </div>
  );
}

export function FileUploadExample() {
  return (
    <div className="w-full max-w-md">
      <FileUpload
        title="Upload OKLCH theme preset"
        description="JSON token bundles up to 2MB"
        accept=".json"
        aria-label="Upload OKLCH theme preset file"
      />
    </div>
  );
}

export function InputExample() {
  const [query, setQuery] = React.useState("");

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>Filter Primitives</FieldLabel>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search buttons, forms, tokens..."
          leftIcon={<SearchIcon size={16} aria-hidden="true" />}
        />
      </Field>
    </div>
  );
}

export function InputOTPExample() {
  const [code, setCode] = React.useState("482910");

  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP
        maxLength={6}
        value={code}
        onChange={setCode}
        aria-label="Six-digit verification code"
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
      <span className="font-mono text-xs text-muted-foreground tabular-nums">
        Entered value: {code || "------"}
      </span>
    </div>
  );
}

export function RadioGroupExample() {
  const [tier, setTier] = React.useState("standard");

  return (
    <RadioGroup
      value={tier}
      onValueChange={(next) => setTier(String(next))}
      aria-label="Contrast verification threshold"
      className="flex flex-col gap-2"
    >
      <label className="inline-flex items-center gap-2.5 text-sm text-foreground">
        <RadioGroupItem value="standard" />
        <span>WCAG 2.2 AA + APCA Standard</span>
      </label>
      <label className="inline-flex items-center gap-2.5 text-sm text-foreground">
        <RadioGroupItem value="strict" />
        <span>WCAG 2.2 AAA + APCA 75+ Editorial</span>
      </label>
    </RadioGroup>
  );
}

export function SelectExample() {
  const [region, setRegion] = React.useState("eu-west-2");

  return (
    <div className="w-full max-w-xs">
      <Select value={region} onValueChange={(next) => setRegion(next ?? "eu-west-2")}>
        <SelectTrigger aria-label="Edge region selector">
          <SelectValue placeholder="Choose region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="eu-west-2">London (eu-west-2)</SelectItem>
          <SelectItem value="us-east-1">Virginia (us-east-1)</SelectItem>
          <SelectItem value="ap-northeast-1">Tokyo (ap-northeast-1)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SliderExample() {
  const [lightness, setLightness] = React.useState(62);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">OKLCH Lightness Target</span>
        <span className="font-mono text-muted-foreground tabular-nums">{lightness}%</span>
      </div>
      <Slider
        aria-label="OKLCH Lightness Target"
        value={lightness}
        onValueChange={(next) => setLightness(Array.isArray(next) ? next[0] : next)}
        min={0}
        max={100}
      />
    </div>
  );
}

export function StepperExample() {
  const [replicas, setReplicas] = React.useState(4);

  return (
    <Stepper value={replicas} onValueChange={setReplicas} min={1} max={12}>
      <Stepper.Decrement aria-label="Decrease replicas" />
      <Stepper.Value />
      <Stepper.Increment aria-label="Increase replicas" />
    </Stepper>
  );
}

export function SwitchExample() {
  const [strictGate, setStrictGate] = React.useState(true);

  return (
    <label className="inline-flex items-center gap-3 text-sm text-foreground">
      <Switch
        checked={strictGate}
        onCheckedChange={setStrictGate}
        aria-label="Automatic AST docs verification"
      />
      <span>Automatic AST docs gate</span>
    </label>
  );
}

export function TextareaExample() {
  const [notes, setNotes] = React.useState(
    "Concentric card radius calibrated cleanly with zero layout shift."
  );

  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldLabel>Architecture Decision Notes</FieldLabel>
        <Textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Document the structural constraint..."
        />
      </Field>
    </div>
  );
}
