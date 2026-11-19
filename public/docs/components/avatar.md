# Avatar

> User identity emblem with deterministic OKLCH fallback and status pip.

- **Category**: Data & Feedback
- **Import**: `import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";`
- **Source**: `src/components/ui/avatar.tsx`
- **Dependencies**: `@base-ui/react`, `class-variance-authority`, `react`
- **Sizes**: `xs`, `sm`, `default`, `lg`, `xl`

## Defining Constraint

Deterministically computes harmonious OKLCH fallback colours from initials while cleanly supporting presence pips and overlapping AvatarGroup stacks.

## When to Use

- Team member identity badges, commit actor nodes, comment headers, and presence bars.
- Compact collaborator groups with deterministic fallback monograms.

## When Not to Use (Use Instead)

| Alternative       | Reason                                                                |
| :---------------- | :-------------------------------------------------------------------- |
| [badge](badge.md) | Use Badge for short system status pills rather than user identity.    |
| [image](image.md) | Use ProgressiveImage for rectangular content imagery and hero frames. |

## Anatomy

```tsx
<Avatar size="default">
  <AvatarFallback autoColor>WD</AvatarFallback>
  <AvatarBadge status="online" />
</Avatar>
```

## Verified Example

```tsx
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";

export function AvatarExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback autoColor>WD</AvatarFallback>
        <AvatarBadge status="online" />
      </Avatar>
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarFallback autoColor>AR</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback autoColor>MK</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  );
}
```

## Props Reference

| Prop        | Type                        | Required | Description                     |
| :---------- | :-------------------------- | :------- | :------------------------------ |
| `autoColor` | `boolean`                   | No       | Configures autoColor on Avatar. |
| `max`       | `number`                    | No       | Configures max on Avatar.       |
| `size`      | `"sm" \| "default" \| "lg"` | No       | Configures size on Avatar.      |
| `spacing`   | `"sm" \| "default" \| "lg"` | No       | Configures spacing on Avatar.   |
| `status`    | `PresenceStatus`            | No       | Configures status on Avatar.    |

## Accessibility Contract

- AvatarImage must supply meaningful alt text naming the person or organisation.
- AvatarBadge exposes status meaning without relying solely on colour.

## Do and Don't

| Do                                                                               | Don't                                                                    |
| :------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| Enable autoColor on AvatarFallback for consistent per-user OKLCH background hue. | Squeeze full full-name sentences into two-letter fallback initials.      |
| Use AvatarGroup when rendering 2 to 5 overlapping team collaborators.            | Render Avatar without fallback initials when image URLs can fail or lag. |

## Slots & Pairing

Pairs AvatarImage, AvatarFallback, AvatarBadge, and AvatarGroup.
