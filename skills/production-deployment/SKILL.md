---
name: production-deployment
description: Use when preparing web interfaces for production deployment. Enforces Speculation Rules, View Transitions, SWR edge caching, safe-area insets, and zero-CLS.
license: MIT
metadata:
  author: William Dibble
  version: "1.0.0"
  tags: [deployment, performance, caching, view-transitions, web-vitals]
---

# Production Web Deployment & Performance Engineering

This skill codifies the architectural rules, platform APIs, and HTTP caching contracts required to take design system components from a local development environment into production without UX degradation, layout shifts, or race conditions.

---

## Purpose

Establish deterministic browser performance, edge caching boundaries, mobile viewport safety, and idempotent mutation contracts before shipping web applications to production.

---

## Prerequisites

- **Target runtime**: Modern Chromium, Safari, or Firefox browsers supporting CSS `@view-transition`, `env(safe-area-inset-*)`, and `crypto.randomUUID()`.
- **Build tooling**: Content-hashing bundler (`vite build` or equivalent) producing immutable `[name]-[hash].js` bundles.
- **Verification**: Passing `npm run check` and `npm run build` with zero TypeScript or invariant errors before deployment.

---

## Instructions

Follow this release sequence before promoting any build to production:

1. **Set safe viewport metadata**: Add `viewport-fit=cover` to `index.html` and pair sticky top/bottom bars with `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
2. **Add Speculation Rules safely**: Use `eagerness: "moderate"` for same-origin navigation while excluding `/api/*`, `/auth/*`, `/checkout/*`, and logout routes.
3. **Pass View Transition overrides**: Use `@view-transition { navigation: auto; }` capped under `250ms` and disable animations unconditionally inside `@media (prefers-reduced-motion: reduce)`.
4. **Keep SWR boundaries strict**: Set `Cache-Control: public, s-maxage=60, stale-while-revalidate=86400` on public read pages only; never cache financial balances, inventory, or auth sessions.
5. **Run idempotency and CLS guards**: Pass an `Idempotency-Key` header on every mutating `fetch`, reserve `aspectRatio` containers on media, and handle network or image load errors gracefully.

---

## 🏛️ The 7 Production Deployment Invariants

1. **Speculation Rules over Brute Force Prefetching**: Use Chrome Speculation Rules API for sub-50ms instant navigation on same-site routes. Never speculate destructive, logout, or mutation endpoints.
2. **View Transitions `<= 300ms` with Motion Reduction**: Cross-document and intra-document view transitions must be swift, compositor-driven, and disabled automatically when `prefers-reduced-motion: reduce` is active.
3. **Stale-While-Revalidate (SWR) Boundary Enforcement**: Cache at the edge for read-heavy public views, but strictly ban SWR on monetary, inventory, or security-sensitive transactions.
4. **Absolute Safe-Area Coverage**: Always specify `viewport-fit=cover` in HTML head metadata and pair sticky navigation, mobile sheets, and floating action buttons with `env(safe-area-inset-*)`.
5. **Client-Side Idempotency Contracts**: Mutating requests (payments, record creation, deployments) must issue a client-generated UUID `Idempotency-Key` header and lock the triggering control while the network request is inflight.
6. **Zero Cumulative Layout Shift (`CLS <= 0.05`)**: All dynamic images, banners, and asynchronous elements must reserve exact intrinsic aspect ratios before hydration using dimension placeholders (BlurHash/ThumbHash or Skeleton geometry).
7. **Immutable Static Hashing & Modern Codecs**: Static JS/CSS assets must carry content hashes (`[name]-[hash].js`) served with `Cache-Control: public, max-age=31536000, immutable`, compressed via Brotli/zstd.

---

## ⚡ 1. Chrome Speculation Rules (Instant Prerendering)

Modern Chromium browsers support the Speculation Rules API, enabling predictive background prerendering of pages before the user clicks.

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
  - `moderate`: Prerenders on pointer hover (`>= 200ms`) or `pointerdown`. **Recommended standard**.
  - `conservative`: Prerenders on `pointerdown` only.

---

## 🎬 2. Native View Transitions API

Provide fluid transitions between pages and states without heavy JavaScript SPA transition libraries.

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 220ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

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

```http
Cache-Control: public, s-maxage=60, stale-while-revalidate=86400
```

- `s-maxage=60`: Edge CDN serves cached response for 60 seconds without querying origin.
- `stale-while-revalidate=86400`: For the subsequent 24 hours, the CDN serves stale data instantly while asynchronously refetching origin in the background.

> [!CAUTION]
> **The SWR Exclusion Law**: Never apply `stale-while-revalidate` to:
>
> - Account balances or billing checkout totals
> - Real-time seat reservations / inventory availability
> - Authentication tokens, CSRF tokens, or user session profiles

---

## 📱 4. Safe-Area Insets & Mobile Geometry

On modern edge-to-edge mobile displays, the notch and bottom home swipe indicator occlude edge content if unconfigured. Always include `viewport-fit=cover` in `index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

```html
<!-- Fixed Mobile Header -->
<header
  class="fixed inset-x-0 top-0 z-40 bg-background/80 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md"
>
  <div class="flex h-14 items-center px-4">...</div>
</header>

<!-- Bottom Navigation / Floating Sheets -->
<nav
  class="fixed inset-x-0 bottom-0 z-40 bg-background/80 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md"
>
  <div class="flex h-16 items-center justify-around px-4">...</div>
</nav>
```

---

## 🔒 5. Idempotency Key Architecture & Validation

Prevent double charges, duplicate records, or ghost deployments during network timeouts or double-clicks. Switch triggering buttons immediately to loading/disabled on `pointerdown` and handle network failures explicitly:

```ts
export async function sendIdempotentRequest(url: string, options: RequestInit = {}) {
  const idempotencyKey = crypto.randomUUID();
  const headers = new Headers(options.headers || {});
  if (!headers.has("Idempotency-Key")) {
    headers.set("Idempotency-Key", idempotencyKey);
  }

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response;
}
```

---

## 🖼️ 6. Zero-CLS Asset & Image Hydration

Reserve exact intrinsic aspect ratios before hydration using dimension placeholders: see `AspectImage` in [Examples](#examples).

---

## Examples

```tsx
export function AspectImage({ src, alt, aspectRatio = "16/9", className }) {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)} style={{ aspectRatio }}>
      {status === "loading" && <div className="absolute inset-0 animate-pulse bg-muted/80" />}
      {status === "error" ? (
        <div
          role="img"
          aria-label={alt}
          className="grid h-full w-full place-items-center text-xs text-muted-foreground"
        >
          Media unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            status === "loaded" ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
```

---

## 📋 7. Pre-Deployment Verification Checklist

- [ ] `index.html` includes `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`.
- [ ] Speculation Rules script excludes logout, checkout, and mutation routes.
- [ ] CSS includes `@view-transition { navigation: auto; }` and `prefers-reduced-motion` override.
- [ ] All table numbers, counters, and prices specify `tabular-nums`.
- [ ] Headings use `text-wrap: balance` and paragraphs use `text-wrap: pretty`.
- [ ] Icon-only buttons define `aria-label` and `>= 44x44px` hit slop.
- [ ] `npm run check` and `npm run build` pass with 0 TypeScript or invariant errors.

---

## Limitations

- **Browser API availability**: Chrome Speculation Rules and cross-document `@view-transition` progressively enhance Chromium browsers and gracefully fall back to standard navigation on older engines.
- **CDN header precedence**: Edge caching directives (`s-maxage`, `stale-while-revalidate`) require compatible proxy/CDN configuration and must be disabled on authenticated HTML documents.

---

## Troubleshooting

| Symptom                                                  | Cause                                                            | Solution                                                                                |
| :------------------------------------------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| Authenticated page serves another user's cached response | `Cache-Control: s-maxage` applied globally across dynamic routes | Exclude `/api/*`, `/auth/*`, and session cookies from SWR edge caching rules            |
| Prerender triggers unintended logout or side effects     | Broad `href_matches: "/*"` rule matches GET action URLs          | Add `"not": { "href_matches": "/*logout*" }` and `[data-no-prerender]` selectors        |
| Mobile bottom action bar hidden under iOS home indicator | Missing `viewport-fit=cover` or bottom inset padding             | Set `viewport-fit=cover` in `index.html` and add `pb-[env(safe-area-inset-bottom,0px)]` |
| Image grid jumps during initial scroll                   | Missing `aspectRatio` container box before decode                | Wrap every responsive `<img>` in an explicit `style={{ aspectRatio }}` frame            |
