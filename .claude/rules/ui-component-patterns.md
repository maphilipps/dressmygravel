---
description: UI component patterns and best practices for DressMyGravel.com using Next.js 14 and Shadcn/ui
author: DressMyGravel Development Team
version: 1.0
tags: ["ui", "nextjs", "shadcn", "mobile-first", "components"]
globs: ["**/components/**", "**/app/**", "**/*.tsx"]
creation_date: 2025-09-14
trigger: Technology stack decision and dressmyrun.com UI analysis
---

# UI Component Patterns for DressMyGravel

**Objective:** Build a consistent, performant, mobile-first UI using Next.js 14 App Router and Shadcn/ui components without reinventing the wheel.

## Technology Stack Rules

### Framework: Next.js 14 with App Router
**DO:**
- Use App Router for all routing (not Pages Router)
- Implement Server Components by default
- Use Client Components only when needed (interactivity, browser APIs)
- Leverage React Server Components for data fetching
- Use `loading.tsx` and `error.tsx` for better UX

**DON'T:**
- Mix Pages Router and App Router patterns
- Make everything a Client Component
- Fetch data in Client Components when Server Components can handle it

### Component Library: Shadcn/ui
**CRITICAL:** Shadcn/ui provides ALL needed components - no custom UI needed

```typescript
// CORRECT: Use Shadcn/ui components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// WRONG: Don't create custom versions of existing components
// Don't: const CustomButton = styled.button`...`
// Don't: import { Button } from 'some-other-ui-library'
```

### Component Selection Map
Based on dressmyrun.com analysis, use these Shadcn/ui components:

```typescript
interface ComponentMapping {
  // Weather Display
  weatherCard: 'Card + Badge',
  temperatureDisplay: 'Card with custom content',
  conditions: 'Badge components',

  // Clothing Recommendations
  clothingGrid: 'Grid layout with Card components',
  clothingItem: 'Card + Avatar/Image',
  clothingDetails: 'Dialog or Sheet',

  // User Input
  locationSearch: 'Input + Command/Combobox',
  preferences: 'Form + Switch/Checkbox',

  // Navigation
  mainNav: 'NavigationMenu',
  mobileNav: 'Sheet with menu items',

  // Feedback
  loading: 'Skeleton components',
  errors: 'Alert + AlertDialog',
  success: 'Toast notifications'
}
```

## Mobile-First Development

### Responsive Design Rules
**MUST** design mobile-first, enhance for desktop:

```tsx
// CORRECT: Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="w-full">
    <CardContent className="p-4 md:p-6">
      {/* Content scales with screen size */}
    </CardContent>
  </Card>
</div>

// WRONG: Desktop-first approach
<div className="grid grid-cols-3 sm:grid-cols-1"> {/* Backwards */}
```

### Touch-Friendly Interactions
```tsx
// Minimum touch target sizes
const TouchRules = {
  minHeight: '44px',  // iOS Human Interface Guidelines
  minWidth: '44px',
  spacing: '8px',     // Minimum space between targets
}

// CORRECT: Touch-friendly button
<Button className="h-12 px-6 text-base">
  Get Recommendations
</Button>

// WRONG: Too small for mobile
<Button className="h-6 text-xs px-2">Tap me</Button>
```

## Component Organization

### File Structure Pattern
```
components/
├── ui/                 # Shadcn/ui components (don't modify)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── weather/           # Feature-specific components
│   ├── weather-card.tsx
│   ├── temperature-display.tsx
│   └── conditions-badge.tsx
├── clothing/          # Clothing recommendation components
│   ├── clothing-grid.tsx
│   ├── clothing-item.tsx
│   └── clothing-filter.tsx
└── layout/            # Layout components
    ├── header.tsx
    ├── footer.tsx
    └── mobile-nav.tsx
```

### Component Composition Pattern
```tsx
// CORRECT: Compose with Shadcn/ui primitives
export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{data.temperature}°C</h2>
          <Badge variant={getVariantForTemp(data.temperature)}>
            {getTemperatureZone(data.temperature)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            <span>{data.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            <span>{data.humidity}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Performance Patterns

### Image Optimization
```tsx
// CORRECT: Use Next.js Image component
import Image from 'next/image'

<Image
  src="/clothing/jacket.webp"
  alt="Cycling jacket"
  width={300}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>

// WRONG: Regular img tag
<img src="/clothing/jacket.jpg" />
```

### Loading States
**ALWAYS** show loading feedback using Shadcn/ui Skeleton:

```tsx
// CORRECT: Skeleton loading states
export function WeatherCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-24" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}
```

## Styling Rules

### Use Tailwind CSS with Shadcn/ui
**DO:**
- Use Tailwind utility classes for styling
- Follow Shadcn/ui's className patterns
- Use CSS variables for theming
- Leverage Tailwind's responsive modifiers

**DON'T:**
- Write custom CSS files unless absolutely necessary
- Use CSS-in-JS libraries
- Override Shadcn/ui base styles directly

### Theme Configuration
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Gravel-specific brand colors
        gravel: {
          50: '#faf9f7',
          500: '#8b7a6b',
          900: '#3d362f',
        },
      },
    },
  },
}
```

## Accessibility Requirements

### WCAG 2.1 AA Compliance
```tsx
// CORRECT: Accessible component
<Button
  aria-label="Get cycling recommendations for your location"
  aria-busy={isLoading}
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </>
  ) : (
    'Get Recommendations'
  )}
</Button>
```

## Related Patterns
- See `api-integration-patterns.md` for data fetching in components
- See `performance-requirements.md` for Core Web Vitals targets
- See `nextjs-architecture.md` for routing and data patterns

## Validation Checklist
- [ ] All components use Shadcn/ui primitives
- [ ] Mobile-first responsive design
- [ ] Touch targets minimum 44x44px
- [ ] Loading states with Skeleton components
- [ ] Proper Next.js Image usage
- [ ] Accessibility attributes included
- [ ] Server Components used by default