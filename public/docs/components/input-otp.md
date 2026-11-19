# InputOTP

> Segmented PIN code input with clipboard autofill and digit focus stepping.

- **Category**: Forms & Input
- **Import**: `import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";`
- **Source**: `src/components/ui/input-otp.tsx`
- **Dependencies**: `motion`, `react`

## Defining Constraint

Renders visual individual PIN character boxes over a single hidden accessible text input supporting one-paste autofill across all slots.

## When to Use

- Two-factor authenticator codes, email verification PINs, or SMS 6-digit passcodes.
- Structured fixed-length token verification flows supporting clipboard auto-fill.

## When Not to Use (Use Instead)

| Alternative       | Reason                                                                |
| :---------------- | :-------------------------------------------------------------------- |
| [input](input.md) | Use standard Input for freeform passwords, usernames, or promo codes. |

## Anatomy

```tsx
<InputOTP maxLength={6} aria-label="Verification code">
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
```

## Verified Example

```tsx
import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
```

## Props Reference

| Prop                 | Type                      | Required | Description                                |
| :------------------- | :------------------------ | :------- | :----------------------------------------- |
| `index`              | `number`                  | Yes      | Configures index on InputOTP.              |
| `containerClassName` | `string`                  | No       | Configures containerClassName on InputOTP. |
| `defaultValue`       | `string`                  | No       | Configures defaultValue on InputOTP.       |
| `mask`               | `boolean`                 | No       | Configures mask on InputOTP.               |
| `maxLength`          | `number`                  | No       | Configures maxLength on InputOTP.          |
| `onChange`           | `(value: string) => void` | No       | Configures onChange on InputOTP.           |
| `onComplete`         | `(value: string) => void` | No       | Configures onComplete on InputOTP.         |
| `value`              | `string`                  | No       | Configures value on InputOTP.              |

## Accessibility Contract

- Single underlying textbox exposes complete value for screen readers and password managers.
- Requires explicit aria-label or wrapping <label>.

## Do and Don't

| Do                                                                        | Don't                                                                                |
| :------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| Match total InputOTPSlot indices sequentially from 0 to maxLength - 1.    | Render separate HTML <input> tags that break clipboard paste and backspace stepping. |
| Separate 6-digit groups visually with InputOTPSeparator for scannability. | Use InputOTP for variable-length secrets or recovery passphrases.                    |

## Slots & Pairing

Group slots inside InputOTPGroup pairs divided by InputOTPSeparator.
