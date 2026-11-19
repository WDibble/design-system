# Callout

> Editorial admonition surface with semantic OKLCH variants including defining constraints.

- **Category**: Documentation & Schematics
- **Import**: `import { Callout, calloutVariants } from "@/components/ui/callout";`
- **Source**: `src/components/ui/callout.tsx`
- **Dependencies**: `class-variance-authority`, `react`
- **Variants**: `note`, `tip`, `warning`, `caution`, `defining-constraint`

## Defining Constraint

Highlights non-negotiable architectural constraints, semantic tips, or operational warnings in OKLCH-tinted blocks without decorative eyebrow pill clutter.

## When to Use

- Calling out defining constraints, breaking invariant rules, tips, or caution notices inside guides.
- Surfacing high-signal validation reminders directly alongside runnable code examples.

## When Not to Use (Use Instead)

| Alternative       | Reason                                                        |
| :---------------- | :------------------------------------------------------------ |
| [badge](badge.md) | Use Badge for short single-value operational telemetry pills. |
| [toast](toast.md) | Use Toast for transient post-action notifications.            |

## Anatomy

```tsx
<Callout variant="defining-constraint" title="Zero Layout Shift">
  Reserve border width on resting states.
</Callout>
```

## Verified Example

```tsx
import { Callout } from "@/components/ui/callout";

export function CalloutExample() {
  return (
    <div className="w-full max-w-lg">
      <Callout variant="defining-constraint" title="Zero Layout Shift">
        Declare transparent resting borders so hover and focus states never alter geometry.
      </Callout>
    </div>
  );
}
```

## Props Reference

| Prop       | Type              | Required | Description                                                 |
| :--------- | :---------------- | :------- | :---------------------------------------------------------- |
| `children` | `React.ReactNode` | Yes      | Callout body copy or structured guidance                    |
| `icon`     | `React.ReactNode` | No       | Optional custom leading icon overriding the variant default |
| `title`    | `string`          | No       | Optional heading displayed above the callout body prose     |

## Accessibility Contract

- Uses role="alert" for warning/caution severities and role="note" for informational variants.
- Maintains APCA contrast headroom by pairing subtle translucent backgrounds with crisp foreground text.

## Do and Don't

| Do                                                                                          | Don't                                                                 |
| :------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| Choose variant="defining-constraint" when introducing a rule that overrides naive defaults. | Stack multiple consecutive Callouts back-to-back inside a short page. |
| Keep callout prose concise (1 to 3 sentences) with [text-wrap:pretty].                      | Embed full multi-column tables inside a Callout.                      |

## Slots & Pairing

Accepts title, variant (note, tip, warning, caution, defining-constraint), and optional custom icon.
