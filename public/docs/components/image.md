# Image

> Zero-CLS progressive media loader with smooth decoding fade.

- **Category**: Data & Feedback
- **Import**: `import { ProgressiveImage } from "@/components/ui/image";`
- **Source**: `src/components/ui/image.tsx`
- **Dependencies**: `lucide-react`, `motion`, `react`

## Defining Constraint

Eliminates cumulative layout shift by locking aspectRatio geometry upfront and cross-fading smoothly once decoded.

## When to Use

- Editorial photography, product screenshots, and media thumbnails inside cards or hero banners.
- Aspect-locked media panels guaranteeing zero layout shift during async image decoding.

## When Not to Use (Use Instead)

| Alternative                       | Reason                                                  |
| :-------------------------------- | :------------------------------------------------------ |
| [avatar](avatar.md)               | Use Avatar for circular user or organisation portraits. |
| [diagram-frame](diagram-frame.md) | Use DiagramFrame for interactive vector SVGs.           |

## Anatomy

```tsx
<ProgressiveImage src={assetSrc} alt="Verified surface specimen" aspectRatio="16/9" />
```

## Verified Example

```tsx
import { ProgressiveImage } from "@/components/ui/image";

const SPECIMEN_IMAGE_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="#171717"/><circle cx="320" cy="180" r="96" fill="none" stroke="#e5e5e5" stroke-width="2"/><rect x="224" y="136" width="192" height="88" rx="16" fill="none" stroke="#a3a3a3" stroke-width="1.5"/></svg>'
  );

export function ImageExample() {
  return (
    <div className="w-full max-w-sm">
      <ProgressiveImage
        src={SPECIMEN_IMAGE_URI}
        alt="Geometric design token proportion diagram"
        aspectRatio="16/9"
        className="rounded-xl border border-border/60"
      />
    </div>
  );
}
```

## Props Reference

| Prop                 | Type     | Required | Description                             |
| :------------------- | :------- | :------- | :-------------------------------------- |
| `aspectRatio`        | `string` | No       | Configures aspectRatio on Image.        |
| `containerClassName` | `string` | No       | Configures containerClassName on Image. |
| `placeholderSrc`     | `string` | No       | Configures placeholderSrc on Image.     |

## Accessibility Contract

- Always provide descriptive alt text explaining meaningful imagery, or empty alt="" with aria-hidden when decorative.
- Reserves intrinsic aspectRatio box prior to load for zero CLS.

## Do and Don't

| Do                                                                          | Don't                                                               |
| :-------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| Specify explicit aspectRatio matching natural media framing.                | Render broken external hotlinks or empty unlabelled <img> elements. |
| Respect rounded concentric corners when embedding inside Card or CardInner. | Distort image proportions without object-cover clipping.            |

## Slots & Pairing

Accepts aspectRatio, priority loading options, and concentric rounded container classes.
