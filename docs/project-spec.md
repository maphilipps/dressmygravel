# DressMyGravel.com - Project Specification

## 1. Executive Summary

DressMyGravel.com is a weather-based clothing recommendation platform specifically designed for gravel cyclists. It adapts the proven concept of DressMyRun.com to the unique needs of gravel biking, providing personalized gear recommendations based on current weather conditions, ride duration, and individual preferences.

### Key Differentiators
- **Gravel-specific**: Tailored for longer rides, varied terrain, and cycling-specific gear
- **Intelligent caching**: Minimal API calls to reduce costs
- **Monetization ready**: Integrated affiliate system with A/B testing
- **Mobile-first**: PWA with offline capabilities

## 2. Technical Architecture

### 2.1 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **UI Components**: Shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: SWR with aggressive caching
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4
- **Error Tracking**: Sentry
- **TypeScript**: Full type safety

### 2.2 Project Structure
```
dressmygravel/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Main application page
│   ├── api/
│   │   ├── location/
│   │   │   └── detect/route.ts   # IP geolocation endpoint
│   │   ├── weather/
│   │   │   └── [coords]/route.ts # Weather data endpoint
│   │   └── affiliate/
│   │       └── track/route.ts    # Affiliate click tracking
│   └── globals.css               # Tailwind directives
├── components/
│   ├── ui/                       # Shadcn components
│   ├── weather/
│   │   ├── weather-display.tsx   # Current weather widget
│   │   └── weather-forecast.tsx  # Hourly/daily forecast
│   ├── clothing/
│   │   ├── clothing-grid.tsx     # Recommendations grid
│   │   ├── clothing-card.tsx     # Individual item card
│   │   └── product-modal.tsx     # Affiliate product details
│   ├── location/
│   │   ├── location-selector.tsx # Location search/select
│   │   └── saved-locations.tsx   # Favorite locations
│   └── settings/
│       ├── settings-sheet.tsx    # Settings panel
│       └── preference-form.tsx   # User preferences
├── lib/
│   ├── clothing/
│   │   ├── engine.ts             # Core recommendation logic
│   │   ├── gravel-rules.ts      # Gravel-specific rules
│   │   └── temperature-zones.ts  # Temperature mappings
│   ├── weather/
│   │   ├── service.ts           # Weather API client
│   │   ├── cache.ts             # Caching strategy
│   │   └── types.ts             # Weather type definitions
│   ├── affiliate/
│   │   ├── products.ts          # Product database
│   │   └── tracking.ts          # Analytics integration
│   └── utils/
│       ├── cn.ts                # Tailwind merge utility
│       └── constants.ts         # App constants
├── data/
│   ├── clothing-items.json      # Clothing database
│   └── affiliate-products.json  # Affiliate links
└── public/
    ├── images/                   # Product images
    └── icons/                    # PWA icons
```

## 3. Core Features

### 3.1 Weather Integration
- **Primary API**: OpenWeatherMap (1000 calls/day free tier)
- **Fallback**: WeatherAPI.com
- **Data Points**:
  - Current temperature & "feels like"
  - Precipitation (type, intensity, probability)
  - Wind (speed, gusts, direction)
  - Humidity & UV index
  - Sunrise/sunset times
  - 24-hour forecast

### 3.2 Location Services
- **Auto-detection**: IP-based geolocation (ipapi.co)
- **Manual search**: City/postal code lookup
- **Saved locations**: LocalStorage persistence
- **Coordinate rounding**: 0.1° precision for cache efficiency

### 3.3 Clothing Recommendation Engine

#### Temperature Zones
```typescript
enum TempZone {
  HOT = '>25°C',      // Mesh jersey, bib shorts
  WARM = '15-25°C',   // Short sleeve, shorts
  COOL = '5-15°C',    // Long sleeve, leg warmers
  COLD = '<5°C'       // Thermal layers, winter gear
}
```

#### Gravel-Specific Items
```typescript
interface GravelEssentials {
  helmet: Required;           // Always required
  gloves: PaddedCycling;      // Vibration dampening
  eyewear: Protective;        // Stone chip protection
  bibs: WithChamois;          // Long-ride comfort
  jersey: WithPockets;        // Storage for nutrition
  shoes: GravelSpecific;      // SPD compatible
}
```

#### Condition Modifiers
- **Rain**: +waterproof jacket, +overshoes
- **Wind >20km/h**: +windproof layer
- **Night/Low light**: +reflective vest, +lights
- **Dust/Gravel**: +buff/neck gaiter, +protective eyewear
- **Long ride (>3h)**: +extra layer, +nutrition storage

### 3.4 User Preferences
- **Temperature preference**: -4 to +4°C adjustment
- **Ride duration**: Affects layering recommendations
- **Riding intensity**: Adjusts perceived temperature
- **Units**: Metric/Imperial toggle
- **Saved gear**: Mark owned items

### 3.5 Affiliate System
- **Multi-vendor support**: Amazon, Bergfreunde, Bike24, Rose
- **Product rotation**: A/B testing for optimal conversion
- **Click tracking**: GA4 event tracking
- **Dynamic pricing**: Price comparison widget (Phase 2)
- **Admin interface**: Simple JSON-based management

## 4. API Specifications

### 4.1 Location Detection
```typescript
GET /api/location/detect

Response:
{
  "data": {
    "id": "unique-identifier",
    "name": "Munich, Bavaria, Germany",
    "latitude": 48.1351,
    "longitude": 11.5820,
    "timeZone": "Europe/Berlin"
  },
  "meta": {
    "cacheUntil": "2025-01-15T12:00:00Z",
    "ipAddress": "93.193.12.88"
  }
}
```

### 4.2 Weather & Recommendations
```typescript
GET /api/weather/{lat},{lon}

Response:
{
  "weather": {
    "current": {
      "temp": 18.5,
      "feelsLike": 17.2,
      "conditions": "partly_cloudy",
      "wind": { "speed": 15, "gust": 22, "direction": "NW" },
      "precipitation": { "probability": 20, "type": null },
      "humidity": 65,
      "uvIndex": 3
    },
    "forecast": [...] // 24-hour array
  },
  "recommendations": {
    "essential": [...],
    "upper": [...],
    "lower": [...],
    "accessories": [...]
  }
}
```

## 5. Caching Strategy

### 5.1 Cache Layers
1. **Browser**: LocalStorage for preferences, recent locations
2. **SWR**: In-memory cache with stale-while-revalidate
3. **API**: Redis/file cache on server
4. **CDN**: Static assets with long expiry

### 5.2 Cache Keys & TTL
- Weather data: `weather:{roundedLat}:{roundedLon}:{hour}` - 3 hours
- Location lookup: `location:{ip}` - 24 hours
- Product data: `products:{category}` - 7 days
- User preferences: No expiry (LocalStorage)

## 6. UI/UX Design

### 6.1 Design System
- **Theme**: Earth tones (gravel aesthetic)
- **Typography**: System fonts for performance
- **Spacing**: 4px grid system
- **Breakpoints**: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)

### 6.2 Component Library (Shadcn)
- Card: Weather display, clothing items
- Sheet: Settings panel
- Command: Location search
- Tabs: Forecast views
- Slider: Temperature preference
- Button: CTAs, affiliate links
- Badge: Weather conditions, gear categories
- Tooltip: Explanations, help text

### 6.3 Responsive Layout
```
Mobile (default):        Tablet:                Desktop:
┌──────────────┐        ┌────────┬────────┐    ┌────────┬────────┬────────┐
│   Location   │        │Location│Weather │    │Location│Weather │Settings│
├──────────────┤        ├────────┴────────┤    ├────────┼────────┴────────┤
│   Weather    │        │                 │    │        │                 │
├──────────────┤        │   Clothing      │    │Clothing│   Clothing      │
│              │        │   Grid          │    │ Grid   │   Details       │
│   Clothing   │        │                 │    │        │                 │
│              │        └─────────────────┘    └────────┴─────────────────┘
└──────────────┘
```

## 7. Performance Requirements

### 7.1 Core Web Vitals
- **LCP**: <2.5s (Largest Contentful Paint)
- **FID**: <100ms (First Input Delay)
- **CLS**: <0.1 (Cumulative Layout Shift)
- **Lighthouse Score**: >90

### 7.2 Optimization Techniques
- Static generation where possible
- Dynamic imports for heavy components
- Image optimization (WebP with fallback)
- Font subsetting
- Tree shaking unused code
- Compression (gzip/brotli)

## 8. Analytics & Tracking

### 8.1 GA4 Events
```typescript
// Page views with context
gtag('event', 'page_view', {
  weather_temp: temperature,
  weather_conditions: conditions,
  location: cityName
});

// Clothing recommendations
gtag('event', 'recommendations_shown', {
  temp_zone: zone,
  item_count: items.length,
  conditions: modifiers
});

// Affiliate clicks
gtag('event', 'affiliate_click', {
  product_id: productId,
  vendor: vendorName,
  category: category,
  price_range: range
});

// User preferences
gtag('event', 'preference_changed', {
  preference_type: type,
  old_value: oldVal,
  new_value: newVal
});
```

### 8.2 A/B Testing
- Layout variations (grid vs list)
- Affiliate button placement
- Temperature algorithm tweaks
- Color schemes
- CTA copy variations

## 9. Security & Privacy

### 9.1 Security Measures
- Environment variables for API keys
- Rate limiting on API endpoints
- Input validation with Zod
- XSS protection via React
- HTTPS only
- CSP headers

### 9.2 Privacy
- No personal data storage
- Anonymous analytics
- Cookie consent for EU
- Local storage for preferences
- Clear data deletion option

## 10. Development Phases

### Phase 1: MVP (Week 1)
- Basic weather fetching
- Core clothing logic
- Simple UI with Shadcn
- Location detection
- Mobile responsive

### Phase 2: Enhancement (Week 2)
- Affiliate integration
- Analytics setup
- PWA features
- Performance optimization
- Settings persistence

### Phase 3: Polish (Week 3)
- UI refinements
- A/B testing setup
- Error handling
- Documentation
- Launch preparation

## 11. Success Metrics

### 11.1 Technical KPIs
- API calls <500/day
- Cache hit rate >80%
- Page load time <2s
- Error rate <1%

### 11.2 Business KPIs
- User engagement >2min
- Affiliate CTR >5%
- Return visitor rate >30%
- Mobile usage >60%

## 12. Future Enhancements

### Planned Features
- Strava integration
- GPX route weather analysis
- Gear closet management
- Social sharing
- Weather alerts
- Ride planning tools
- Community recommendations
- Premium features (ad-free, detailed forecasts)

## 13. Technical Decisions

### 13.1 Why Next.js over Vite?
- Better suited for Shadcn/ui
- Built-in API routes
- Server-side rendering option
- Better SEO capabilities
- Vercel deployment optimization

### 13.2 Why Shadcn over Material UI?
- Copy & paste ownership
- Smaller bundle size
- Better customization
- Modern Radix UI primitives
- Tailwind integration

### 13.3 Why Zustand over Redux?
- Simpler API
- Smaller bundle (8kb vs 60kb)
- Less boilerplate
- TypeScript friendly
- Perfect for app size

---

This specification serves as the single source of truth for the DressMyGravel.com project. All implementation decisions should reference this document.