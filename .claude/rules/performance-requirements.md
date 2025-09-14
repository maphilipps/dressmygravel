---
description: Performance requirements and optimization strategies for DressMyGravel.com
author: DressMyGravel Development Team
version: 1.0
tags: ["performance", "optimization", "web-vitals", "caching", "mobile"]
globs: ["**/*.ts", "**/*.tsx", "**/api/**"]
creation_date: 2025-09-14
trigger: Mobile-first requirements and cost optimization needs
---

# Performance Requirements for DressMyGravel

**Objective:** Deliver instant, app-like performance on mobile devices while minimizing infrastructure costs through aggressive optimization.

## Core Web Vitals Targets

### Mobile Performance Metrics
**MUST** achieve these targets on 4G mobile connections:

```typescript
interface PerformanceTargets {
  LCP: 2.5,     // Largest Contentful Paint < 2.5s
  FID: 100,     // First Input Delay < 100ms
  CLS: 0.1,     // Cumulative Layout Shift < 0.1
  TTFB: 600,    // Time to First Byte < 600ms
  FCP: 1.8,     // First Contentful Paint < 1.8s
}
```

### Performance Budget
```typescript
const performanceBudget = {
  javascript: {
    initial: 170,     // 170KB initial JS
    total: 350,       // 350KB total JS
  },
  css: {
    initial: 30,      // 30KB initial CSS
    total: 60,        // 60KB total CSS
  },
  images: {
    perImage: 100,    // 100KB per image
    total: 500,       // 500KB total images per page
  },
  totalPageWeight: 1000,  // 1MB total page weight
};
```

## Next.js Optimization Strategies

### Static Generation Priority
```typescript
// CORRECT: Static generation for predictable content
export async function generateStaticParams() {
  // Pre-render common temperature/condition combinations
  const zones = ['HOT', 'WARM', 'COOL', 'COLD'];
  const conditions = ['sunny', 'cloudy', 'rainy', 'windy'];

  return zones.flatMap(zone =>
    conditions.map(condition => ({
      zone,
      condition,
    }))
  );
}

// Use ISR for semi-dynamic content
export const revalidate = 3600; // Revalidate every hour
```

### Route Segment Config
```typescript
// app/recommendations/[zone]/page.tsx
export const runtime = 'edge';  // Use Edge Runtime for faster responses
export const preferredRegion = 'auto';  // Deploy close to users
```

## Bundle Optimization

### Code Splitting Strategy
```typescript
// CORRECT: Dynamic imports for heavy components
const MapComponent = dynamic(
  () => import('@/components/map/MapView'),
  {
    loading: () => <MapSkeleton />,
    ssr: false,  // Maps don't need SSR
  }
);

// WRONG: Importing everything upfront
import MapView from '@/components/map/MapView';  // Blocks initial load
```

### Tree Shaking Rules
```typescript
// CORRECT: Import only what you need
import { Wind, Droplets, Thermometer } from 'lucide-react';

// WRONG: Importing entire library
import * as Icons from 'lucide-react';  // Includes ALL icons in bundle
```

## Image Optimization

### Next.js Image Requirements
```typescript
// CORRECT: Optimized image loading
<Image
  src="/clothing/jacket.webp"
  alt="Gravel cycling jacket"
  width={400}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL={generateBlurDataURL()}
/>

// Generate blur placeholders at build time
async function generateBlurDataURL() {
  const { getPlaiceholder } = await import('plaiceholder');
  const { base64 } = await getPlaiceholder(src);
  return base64;
}
```

### Image Format Strategy
```typescript
const imageFormats = {
  photos: 'webp',      // Use WebP for photos
  illustrations: 'svg', // SVG for icons/illustrations
  fallback: 'jpg',     // JPEG fallback for compatibility

  // Size limits
  maxWidth: 1920,
  maxHeight: 1080,
  quality: {
    thumbnail: 60,
    standard: 85,
    hero: 90,
  }
};
```

## Caching Strategy

### Multi-Layer Cache Architecture
```typescript
// 1. Browser Cache (Service Worker)
// public/sw.js
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/weather')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open('weather-v1').then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});

// 2. CDN Cache Headers
export async function GET(request: Request) {
  const response = NextResponse.json(data);

  // Cache at CDN edge for 1 hour
  response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  return response;
}

// 3. Application Cache (Redis/Upstash)
const cache = new Map();  // In-memory cache for development
const CACHE_TTL = 3 * 60 * 60 * 1000;  // 3 hours

async function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}
```

## Database Query Optimization

### Prisma Query Patterns
```typescript
// CORRECT: Efficient queries with selection
const recommendations = await prisma.clothingItem.findMany({
  where: {
    temperatureZone: zone,
    conditions: {
      has: condition,
    },
  },
  select: {
    id: true,
    name: true,
    imageUrl: true,
    priority: true,
  },
  orderBy: {
    priority: 'desc',
  },
  take: 10,  // Limit results
});

// WRONG: Fetching everything
const allItems = await prisma.clothingItem.findMany();  // Gets ALL data
const filtered = allItems.filter(...);  // Filtering in memory
```

## Mobile-Specific Optimizations

### Reduce JavaScript Execution
```typescript
// CORRECT: Defer non-critical JavaScript
<Script
  src="/analytics.js"
  strategy="afterInteractive"  // Load after page is interactive
/>

// Use CSS for animations instead of JavaScript
.loading-spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Touch Response Optimization
```typescript
// CORRECT: Use CSS touch-action for better scrolling
const SwipeableCard = styled.div`
  touch-action: pan-y;  /* Allow vertical scrolling only */
  -webkit-overflow-scrolling: touch;  /* Momentum scrolling on iOS */
`;

// Debounce expensive operations
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  []
);
```

## Monitoring & Metrics

### Performance Monitoring Setup
```typescript
// app/layout.tsx
import { WebVitalsReporter } from '@/lib/analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}

// lib/analytics.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === 'web-vital') {
    // Send to analytics
    analytics.track('Web Vital', {
      metric: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });

    // Alert on poor performance
    if (metric.rating === 'poor') {
      console.warn(`Poor ${metric.name}: ${metric.value}`);
    }
  }
}
```

## Build-Time Optimization

### Next.js Config
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  // Bundle analyzer for optimization
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
  },
};
```

## Related Patterns
- See `api-integration-patterns.md` for API response caching
- See `ui-component-patterns.md` for component optimization
- See `security-practices.md` for secure performance practices

## Validation Checklist
- [ ] LCP < 2.5s on mobile 4G
- [ ] JavaScript bundle < 350KB total
- [ ] Images optimized with Next.js Image
- [ ] Static generation for predictable content
- [ ] Caching at all layers (browser, CDN, app)
- [ ] Database queries use selection and limits
- [ ] Performance monitoring configured
- [ ] Bundle analyzer run before deployment