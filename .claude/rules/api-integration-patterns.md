---
description: API integration patterns and best practices for DressMyGravel.com, learned from production implementation
author: DressMyGravel Development Team
version: 1.0
tags: ["api", "weather", "caching", "performance", "cost-optimization"]
globs: ["**/api/**", "**/services/**", "**/lib/**"]
creation_date: 2025-09-14
trigger: Initial project setup and dressmyrun.com analysis
---

# API Integration Patterns for DressMyGravel

**Objective:** Implement robust, cost-effective API integrations with aggressive caching and fallback strategies to minimize external API calls while maintaining data freshness.

## Weather API Integration

### Primary Service: Apple Weather API
**DO:**
- Use Apple Weather API as primary weather service (proven reliable from dressmyrun.com)
- Implement coordinate rounding to 0.1 decimal places for cache key generation
- Cache weather data for minimum 3 hours (weather doesn't change significantly)
- Use environment variables for ALL API credentials (NEVER commit tokens)
- Implement exponential backoff for rate limit handling

**DON'T:**
- Make direct API calls from client components
- Store API responses without TTL
- Request weather data more frequently than every 3 hours for same location
- Use exact coordinates for caching (causes cache misses)

### Coordinate Caching Strategy
```typescript
// CORRECT: Round coordinates for effective caching
const getCacheKey = (lat: number, lon: number): string => {
  const roundedLat = Math.round(lat * 10) / 10;
  const roundedLon = Math.round(lon * 10) / 10;
  return `weather_${roundedLat}_${roundedLon}`;
};

// WRONG: Using exact coordinates
const badCacheKey = `weather_${lat}_${lon}`; // Creates infinite cache entries
```

### Temperature Zone Classification
**MUST** use consistent temperature zones across the application:
```typescript
enum TemperatureZone {
  HOT = 'HOT',       // > 25°C
  WARM = 'WARM',     // 15-25°C
  COOL = 'COOL',     // 5-15°C
  COLD = 'COLD'      // < 5°C
}

const getTemperatureZone = (temp: number): TemperatureZone => {
  if (temp > 25) return TemperatureZone.HOT;
  if (temp >= 15) return TemperatureZone.WARM;
  if (temp >= 5) return TemperatureZone.COOL;
  return TemperatureZone.COLD;
};
```

## Caching Implementation

### Multi-Layer Caching Strategy
**MUST** implement caching at multiple layers:

1. **Browser Cache**: Service Worker for offline support
2. **Memory Cache**: In-memory LRU cache for active session
3. **Redis/Upstash**: Distributed cache for API responses
4. **CDN Cache**: Edge caching for static recommendations

### Cache Invalidation Rules
```typescript
interface CacheConfig {
  weather: {
    ttl: 3 * 60 * 60 * 1000,  // 3 hours minimum
    staleWhileRevalidate: true,
    maxStale: 6 * 60 * 60 * 1000  // Use stale data up to 6 hours if API fails
  },
  recommendations: {
    ttl: 24 * 60 * 60 * 1000,  // 24 hours (recommendations rarely change)
    keyPattern: 'rec_{zone}_{conditions}'  // Cache by zone + conditions
  }
}
```

## Error Handling & Fallbacks

### Graceful Degradation Pattern
**ALWAYS** implement fallback strategies:

```typescript
// CORRECT: Multiple fallback layers
async function getWeatherData(lat: number, lon: number) {
  try {
    // 1. Try cache first
    const cached = await cache.get(getCacheKey(lat, lon));
    if (cached && !isStale(cached)) return cached;

    // 2. Try primary API
    const fresh = await fetchAppleWeather(lat, lon);
    await cache.set(getCacheKey(lat, lon), fresh);
    return fresh;
  } catch (error) {
    // 3. Return stale cache if available
    const stale = await cache.get(getCacheKey(lat, lon));
    if (stale) return { ...stale, isStale: true };

    // 4. Return nearest cached location
    const nearest = await findNearestCachedWeather(lat, lon);
    if (nearest) return { ...nearest, isApproximate: true };

    // 5. Return safe defaults
    return getDefaultWeatherData();
  }
}
```

## API Key Security

### Environment Variable Management
**CRITICAL** security practices learned from exposed token incident:

```typescript
// CORRECT: Use environment variables with validation
const config = {
  appleWeatherKey: process.env.APPLE_WEATHER_KEY!,
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
};

// Add startup validation
if (!config.appleWeatherKey) {
  throw new Error('APPLE_WEATHER_KEY is required');
}

// WRONG: Never hardcode API keys
const apiKey = "sk_live_xxxx"; // NEVER DO THIS
```

### Git Security Checklist
Before EVERY commit:
1. Run `git diff --cached` to review changes
2. Check for hardcoded API keys or tokens
3. Verify `.env` files are in `.gitignore`
4. Use `git-secrets` or similar tools for automated scanning

## Cost Optimization Rules

### API Call Minimization
**MUST** follow these patterns to minimize costs:

1. **Location Grouping**: Round coordinates to reduce unique locations
2. **Time Grouping**: Don't refresh more than every 3 hours
3. **Predictive Caching**: Pre-cache common locations during off-peak
4. **Request Batching**: Combine multiple data needs into single requests

### Monitoring & Alerts
```typescript
// Track API usage for cost control
interface ApiUsageTracker {
  dailyLimit: 1000,
  warningThreshold: 0.8,  // Alert at 80% usage
  hardStop: 0.95,  // Stop non-critical calls at 95%

  async trackCall(endpoint: string) {
    const usage = await this.getCurrentUsage();
    if (usage > this.hardStop) {
      throw new Error('API limit exceeded - using cache only');
    }
    // Log for monitoring
    logger.info('API call', { endpoint, usage, remaining: this.dailyLimit - usage });
  }
}
```

## Related Patterns
- See `ui-component-patterns.md` for loading states during API calls
- See `performance-requirements.md` for response time targets
- See `security-practices.md` for comprehensive security guidelines

## Validation Checklist
- [ ] All API keys in environment variables
- [ ] Caching implemented at all layers
- [ ] Coordinate rounding to 0.1 decimal places
- [ ] Minimum 3-hour cache TTL for weather
- [ ] Fallback strategies for API failures
- [ ] Cost monitoring and alerts configured
- [ ] No sensitive data in git history