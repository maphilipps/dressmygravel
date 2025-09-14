// Clothing recommendation types for DressMyGravel

export type TemperatureZone = 'hot' | 'warm' | 'cool' | 'cold';
export type WeatherModifier = 'rain' | 'wind' | 'sun' | 'humidity';

export interface ClothingItem {
  id: string;
  name: string;
  category:
    | 'helmet'
    | 'top'
    | 'bottom'
    | 'hands'
    | 'feet'
    | 'accessories'
    | 'eyewear';
  description: string;
  temperatureRange: {
    min: number; // Celsius
    max: number; // Celsius
  };
  weatherModifiers: WeatherModifier[];
  windResistant?: boolean;
  waterproof?: boolean;
  breathable?: boolean;
  affiliateLinks?: {
    [retailer: string]: string;
  };
}

export interface ClothingRecommendation {
  temperatureZone: TemperatureZone;
  items: ClothingItem[];
  reasoning: string;
  alternatives?: ClothingItem[];
  warnings?: string[];
}

export interface GravelSpecificGear extends ClothingItem {
  gravelFeatures: {
    dustProtection?: boolean;
    vibrationDamping?: boolean;
    storageCapacity?: boolean;
    durability?: 'high' | 'medium' | 'low';
  };
}
