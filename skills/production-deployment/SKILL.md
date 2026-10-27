---
name: production-deployment
description: Production web deployment engineering standards, edge caching contracts (SWR), Chrome Speculation Rules (prerendering), View Transitions API, safe-area mobile geometry, idempotency headers, and zero-CLS asset hydration. Use when preparing, configuring, or reviewing web applications for production deployment.
---

# Production Web Deployment & Performance Engineering

This skill codifies the architectural rules, platform APIs, and HTTP caching contracts required to take design system components from a local development environment into production without UX degradation, layout shifts, or race conditions.

---

## 🏛️ The 7 Production Deployment Invariants

1. **Speculation Rules over Brute Force Prefetching**: Use Chrome Speculation Rules API for sub-50ms instant navigation on same-site routes. Never speculate destructive, logout, or mutation endpoints.
2. **View Transitions $\le 300\text{ms}$ with Motion Reduction**: Cross-document and intra-document view transitions must be swift, compositor-driven, and automatically disabled when `prefers-reduced-motion: reduce` is active.
3. **Stale-While-Revalidate (SWR) Boundary Enforcement**: Cache aggressively at the edge for read-heavy public views, but strictly ban SWR on monetary, inventory, or security-sensitive transactions.
4. **Absolute Safe-Area Coverage**: Always specify `viewport-fit=cover` in HTML head metadata and pair sticky navigation, mobile sheets, and floating action buttons with `env(safe-area-inset-*)`.
5. **Client-Side Idempotency Contracts**: Mutating requests (payments, record creation, deployments) must issue a client-generated UUID `Idempotency-Key` header and lock the triggering control while the network request is inflight.
6. **Zero Cumulative Layout Shift (CLS $\le 0.05$)**: All dynamic images, banners, and asynchronous elements must reserve exact intrinsic aspect ratios before hydration using dimension placeholders (BlurHash/ThumbHash or Skeleton geometry).
7. **Immutable Static Hashing & Modern Codecs**: Static JS/CSS assets must carry content hashes (`[name]-[hash].js`) served with `Cache-Control: public, max-age=31536000, immutable`, compressed via Brotli/zstd.

---

## ⚡ 1. Chrome Speculation Rules (Instant Prerendering)

Modern Chromium browsers support the Speculation Rules API, enabling predictive background prerendering of pages before the user clicks.

### HTML Speculation Rules Configuration

Place this script tag in your document `<head>` or inject dynamically:

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "where": {
        "and": [
          { "href_matches": "/*" },
          { "not": { "href_matches": "/api/*" } },
          { "not": { "href_matches": "/auth/*" } },
          { "not": { "href_matches": "/checkout/*" } },
          { "not": { "href_matches": "/*logout*" } },
          { "not": { "selector_matches": "[data-no-prerender]" } }
        ]
      },
      "eagerness": "moderate"
    }
  ]
}
</script>
```

- **Eagerness Rules**:
  - `immediate`: Prerenders immediately upon page load (use sparingly, only for high-confidence funnels).
  - `moderate`: Prerenders on pointer hover ($\ge 200\text{ms}$) or `pointerdown`. **Recommended standard**.
  - `conservative`: Prerenders on `pointerdown` only.

---

## 🎬 2. Native View Transitions API

Provide seamless app-like transitions between pages and states without bloated JavaScript SPA transition libraries.

### Cross-Document Navigation (CSS)

Add to your global stylesheet (`index.css`):

```css
@view-transition {
  navigation: auto;
}

/* Fluid Apple-grade cross-fade under 250ms */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 220ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Respect Accessibility Invariant: Disable on reduced motion */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

### Same-Page State Changes (TypeScript)

```ts
export function performViewTransition(updateDom: () => void | Promise<void>) {
  if (!document.startViewTransition) {
    updateDom();
    return;
  }
  document.startViewTransition(updateDom);
}
```

---

## 🗄️ 3. Stale-While-Revalidate (SWR) & Edge Caching

Edge CDN caching delivers static speed with dynamic freshness.

### HTTP Response Header Blueprint

```http
Cache-Control: public, s-maxage=60, stale-while-revalidate=86400
```

- `s-maxage=60`: Edge CDN serves cached response for 60 seconds without querying origin.
- `stale-while-revalidate=86400`: For the subsequent 24 hours, the CDN serves stale data instantly while asynchronously refetching origin in the background.

> [!CAUTION]
> **The SWR Exclusion Law**: Never apply `stale-while-revalidate` to:
> - Account balances or billing checkout totals
> - Real-time seat reservations / inventory availability
> - Authentication tokens, CSRF tokens, or user session profiles

---

## 📱 4. Safe-Area Insets & Mobile Geometry

On iPhone, iPad, and modern Android flagships, the notch, Dynamic Island, and bottom home swipe indicator occlude edge content if unconfigured.

### 1. Viewport Meta Configuration
Always include `viewport-fit=cover` in `index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

### 2. Layout Inset Classes

```html
<!-- Fixed Mobile Header -->
<header class="fixed top-0 inset-x-0 pt-[env(safe-area-inset-top,0px)] bg-background/80 backdrop-blur-md z-40">
  <div class="h-14 px-4 flex items-center">...</div>
</header>

<!-- Bottom Navigation / Floating Sheets -->
<nav class="fixed bottom-0 inset-x-0 pb-[env(safe-area-inset-bottom,0px)] bg-background/80 backdrop-blur-md z-40">
  <div class="h-16 px-4 flex items-center justify-around">...</div>
</nav>
```

---

## 🔒 5. Idempotency Key Architecture

Prevent double charges, duplicate records, or ghost deployments during network timeouts or aggressive double-clicks.

### Client Implementation Contract

```ts
export async function sendIdempotentRequest(
  url: string,
  options: RequestInit = {}
) {
  // Generate RFC 4122 v4 UUID
  const idempotencyKey = crypto.randomUUID();

  const headers = new Headers(options.headers || {});
  if (!headers.has("Idempotency-Key")) {
    headers.set("Idempotency-Key", idempotencyKey);
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
```

- **UI Rule**: The triggering button must immediately switch to `state="loading"` and set `disabled` upon `pointerdown` so retries can only be triggered intentionally.

---

## 🖼️ 6. Zero-CLS Asset & Image Hydration

Prevent Cumulative Layout Shift (CLS) during image loading using aspect-ratio boxes and BlurHash / ThumbHash placeholders.

### Aspect Ratio Box Pattern

```tsx
export function AspectImage({ src, alt, aspectRatio = "16/9", blurhash, className }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      style={{ aspectRatio }}
    >
      {/* Optional ThumbHash / BlurHash SVG canvas */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted/80" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
```

---

## 📋 7. Pre-Deployment Verification Checklist

Before releasing to Vercel, Cloudflare Pages, Netlify, or AWS CloudFront:

- [ ] `index.html` includes `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`.
- [ ] Speculation Rules script defined with exclusion for logout/mutation routes.
- [ ] CSS includes `@view-transition { navigation: auto; }` and `prefers-reduced-motion` override.
- [ ] All table numbers, counters, and prices specify `tabular-nums`.
- [ ] Headings have `text-wrap: balance` and paragraphs have `text-wrap: pretty`.
- [ ] Icon-only buttons have explicit `aria-label` and $\ge 44\times 44\text{px}$ hit slop.
- [ ] `npm run build` generates 0 TypeScript errors and optimized chunk splits.
