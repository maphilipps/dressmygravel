---
description: Clothing recommendation logic and patterns for gravel cycling based on weather conditions
author: DressMyGravel Development Team
version: 1.0
tags: ["recommendations", "clothing", "weather", "gravel-cycling", "business-logic"]
globs: ["**/recommendations/**", "**/lib/clothing/**", "**/data/**"]
creation_date: 2025-09-14
trigger: Analysis of dressmyrun.com and adaptation for gravel cycling requirements
---

# Clothing Recommendation Logic for DressMyGravel

**Objective:** Provide accurate, gravel-specific cycling clothing recommendations based on weather conditions, following patterns extracted from dressmyrun.com but adapted for cycling needs.

## Core Temperature Zones

### Temperature Classification System
**MUST** use these exact temperature zones consistently:

```typescript
enum TemperatureZone {
  HOT = 'HOT',       // > 25°C (> 77°F)
  WARM = 'WARM',     // 15-25°C (59-77°F)
  COOL = 'COOL',     // 5-15°C (41-59°F)
  COLD = 'COLD'      // < 5°C (< 41°F)
}

// Standardized classification function
export function getTemperatureZone(celsius: number): TemperatureZone {
  if (celsius > 25) return TemperatureZone.HOT;
  if (celsius >= 15) return TemperatureZone.WARM;
  if (celsius >= 5) return TemperatureZone.COOL;
  return TemperatureZone.COLD;
}

// Include wind chill adjustment for cycling
export function getEffectiveTemperature(temp: number, windSpeed: number): number {
  // Wind chill is more significant for cycling due to speed
  const cyclingSpeed = 25; // Average gravel cycling speed km/h
  const totalWind = windSpeed + cyclingSpeed;

  // Simplified wind chill calculation
  if (temp < 10 && totalWind > 10) {
    return temp - (totalWind * 0.2); // Rough approximation
  }
  return temp;
}
```

## Clothing Categories

### Gravel-Specific Clothing Items
Based on dressmyrun.com analysis, adapted for gravel cycling:

```typescript
interface ClothingCategory {
  base_layer: {
    HOT: ['Lightweight mesh base layer', 'None'],
    WARM: ['Short-sleeve base layer', 'Lightweight base'],
    COOL: ['Long-sleeve base layer', 'Merino wool base'],
    COLD: ['Thermal base layer', 'Merino wool base'],
  },

  jersey: {
    HOT: ['Lightweight jersey', 'Mesh jersey'],
    WARM: ['Short-sleeve jersey', 'Standard jersey'],
    COOL: ['Long-sleeve jersey', 'Thermal jersey'],
    COLD: ['Thermal jersey', 'Softshell jersey'],
  },

  outerwear: {
    HOT: null,
    WARM: ['Light vest (optional)', 'Wind vest'],
    COOL: ['Cycling jacket', 'Wind jacket', 'Vest'],
    COLD: ['Winter jacket', 'Softshell jacket', 'Insulated jacket'],
  },

  bottoms: {
    HOT: ['Bib shorts', 'Shorts'],
    WARM: ['Bib shorts', 'Shorts'],
    COOL: ['Bib tights', '3/4 bibs', 'Leg warmers + shorts'],
    COLD: ['Thermal bib tights', 'Winter tights'],
  },

  extremities: {
    HOT: ['Cycling cap', 'Fingerless gloves'],
    WARM: ['Light gloves', 'Cycling cap'],
    COOL: ['Full-finger gloves', 'Headband', 'Arm warmers'],
    COLD: ['Winter gloves', 'Thermal cap', 'Neck warmer', 'Shoe covers'],
  },

  accessories: {
    HOT: ['Sunglasses', 'Sunscreen', 'Extra water bottles'],
    WARM: ['Sunglasses', 'Light sunscreen'],
    COOL: ['Clear/yellow glasses', 'Buff'],
    COLD: ['Clear glasses', 'Balaclava', 'Hand warmers'],
  }
}
```

## Weather Condition Modifiers

### Condition-Based Adjustments
```typescript
interface WeatherModifiers {
  rain: {
    add: ['Rain jacket', 'Waterproof gloves', 'Shoe covers', 'Cap under helmet'],
    remove: ['Cotton items'],
    upgrade: {
      'Cycling jacket': 'Waterproof jacket',
      'Regular gloves': 'Waterproof gloves',
    }
  },

  wind: {
    // Wind speed > 20 km/h
    add: ['Wind vest/jacket', 'Wind-proof gloves'],
    adjustTemperature: -2, // Feels 2°C colder
  },

  humidity: {
    // Humidity > 70%
    high: {
      add: ['Extra hydration', 'Moisture-wicking focus'],
      avoid: ['Heavy layers'],
    },
    // Humidity < 30%
    low: {
      add: ['Lip balm', 'Extra hydration'],
    }
  },

  sun_intensity: {
    high: {
      add: ['Sunscreen SPF 50+', 'UV arm sleeves', 'Light colors'],
      avoid: ['Dark colors'],
    }
  }
}
```

## Recommendation Algorithm

### Priority-Based Selection
```typescript
interface RecommendationEngine {
  // Priority levels for clothing items
  priority: {
    ESSENTIAL: 100,      // Must have (base layer, jersey, shorts)
    RECOMMENDED: 75,     // Strongly suggested (gloves, cap)
    OPTIONAL: 50,        // Nice to have (arm warmers)
    SITUATIONAL: 25,     // Condition-specific (rain jacket)
  }
}

export function getRecommendations(
  temperature: number,
  conditions: WeatherConditions
): ClothingRecommendation[] {
  const zone = getTemperatureZone(temperature);
  const effectiveTemp = getEffectiveTemperature(temperature, conditions.windSpeed);
  const effectiveZone = getTemperatureZone(effectiveTemp);

  const recommendations: ClothingRecommendation[] = [];

  // 1. Add base recommendations for temperature zone
  recommendations.push(...getBaseClothing(effectiveZone));

  // 2. Apply weather modifiers
  if (conditions.precipitation > 0) {
    recommendations.push(...getRainGear(effectiveZone));
  }

  if (conditions.windSpeed > 20) {
    recommendations.push(...getWindProtection(effectiveZone));
  }

  // 3. Sort by priority
  return recommendations.sort((a, b) => b.priority - a.priority);
}
```

## Gravel-Specific Considerations

### Terrain and Duration Factors
```typescript
interface GravelSpecificFactors {
  terrain: {
    technical: {
      add: ['Padded gloves', 'Extra cushioned shorts'],
      reason: 'More vibration and hand pressure on rough terrain',
    },
    muddy: {
      add: ['Shoe covers', 'Extra socks', 'Fenders'],
      reason: 'Mud protection and warmth',
    },
    dusty: {
      add: ['Buff/neck gaiter', 'Glasses'],
      reason: 'Dust protection',
    }
  },

  duration: {
    short: { // < 2 hours
      flexibility: 'Can push comfort boundaries',
    },
    medium: { // 2-4 hours
      add: ['Extra layer in pocket', 'Snacks'],
    },
    long: { // > 4 hours
      add: ['Multiple layers', 'Weather variability preparation'],
      consideration: 'Weather can change significantly',
    }
  },

  time_of_day: {
    early_morning: {
      add: ['Extra layer', 'Lights', 'Reflective elements'],
      note: 'Temperature will likely rise',
    },
    evening: {
      add: ['Warm layer for cooling', 'Lights'],
      note: 'Temperature will drop',
    }
  }
}
```

## Display Logic

### Recommendation Presentation
```typescript
interface ClothingDisplay {
  // Group by body area
  sections: {
    'Head & Neck': ['cap', 'headband', 'balaclava', 'buff'],
    'Upper Body': ['base_layer', 'jersey', 'jacket', 'vest'],
    'Arms & Hands': ['arm_warmers', 'gloves'],
    'Lower Body': ['shorts', 'bibs', 'tights', 'leg_warmers'],
    'Feet': ['socks', 'shoe_covers', 'shoes'],
    'Accessories': ['glasses', 'lights', 'hydration'],
  },

  // Visual indicators
  indicators: {
    essential: '🔴',     // Must have
    recommended: '🟡',   // Strongly suggested
    optional: '🟢',      // Nice to have
    weather: '🌧️',      // Weather-specific
  }
}

// Example display component structure
export function ClothingRecommendation({ item }: { item: ClothingItem }) {
  return (
    <Card>
      <CardHeader>
        <Badge variant={getPriorityVariant(item.priority)}>
          {item.priority >= 75 ? 'Essential' : 'Optional'}
        </Badge>
        <h3>{item.name}</h3>
      </CardHeader>
      <CardContent>
        <Image src={item.image} alt={item.name} />
        <p>{item.reason}</p>
        {item.alternates && (
          <p className="text-sm text-gray-600">
            Or: {item.alternates.join(', ')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

## Data Structure

### Clothing Item Schema
```typescript
interface ClothingItem {
  id: string;
  name: string;
  category: 'base_layer' | 'jersey' | 'outerwear' | 'bottoms' | 'extremities' | 'accessories';
  temperatureZones: TemperatureZone[];
  conditions?: ('rain' | 'wind' | 'sun' | 'cold')[];
  priority: number; // 0-100
  image: string;
  description: string;
  reason: string; // Why this item for these conditions
  alternates?: string[]; // Alternative items
  brands?: string[]; // Recommended brands
  features?: string[]; // Key features to look for
}

// Example data
const clothingDatabase: ClothingItem[] = [
  {
    id: 'thermal-base-layer',
    name: 'Merino Wool Base Layer',
    category: 'base_layer',
    temperatureZones: ['COLD', 'COOL'],
    priority: 100,
    image: '/clothing/merino-base.webp',
    description: 'Insulating base layer for cold conditions',
    reason: 'Provides warmth while wicking moisture',
    alternates: ['Synthetic thermal base'],
    brands: ['Smartwool', 'Icebreaker', 'Rapha'],
    features: ['Moisture-wicking', 'Odor-resistant', 'Temperature regulation'],
  },
  // ... more items
];
```

## Testing Scenarios

### Edge Cases to Handle
```typescript
const testScenarios = [
  {
    name: 'Hot and Rainy',
    temp: 28,
    conditions: { rain: true },
    expected: ['Light rain jacket', 'Waterproof essentials only'],
  },
  {
    name: 'Cool Morning warming to Warm',
    temp: 12,
    trend: 'rising',
    expected: ['Layering system', 'Packable items'],
  },
  {
    name: 'Wind Chill Factor',
    temp: 18,
    windSpeed: 30,
    expected: ['Wind protection despite warm temp'],
  },
  {
    name: 'Rapid Weather Change',
    variability: 'high',
    expected: ['Versatile layers', 'Packable rain gear'],
  },
];
```

## Related Patterns
- See `api-integration-patterns.md` for weather data fetching
- See `ui-component-patterns.md` for display components
- See `performance-requirements.md` for recommendation caching

## Implementation Checklist
- [ ] Temperature zones correctly implemented
- [ ] Wind chill calculations included
- [ ] All clothing categories covered
- [ ] Weather modifiers applied
- [ ] Priority system working
- [ ] Gravel-specific factors considered
- [ ] Display logic groups items logically
- [ ] Edge cases handled
- [ ] Recommendations cached appropriately