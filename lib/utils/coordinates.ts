// Utility functions for coordinate rounding and caching optimization

/**
 * Round coordinates to 0.1 degree precision for weather caching efficiency
 * This reduces API calls by grouping nearby locations together
 * 0.1 degree ≈ 11km at equator, acceptable for weather accuracy
 */
export function roundCoordinates(
  lat: number,
  lon: number,
  precision = 0.1
): { lat: number; lon: number } {
  return {
    lat: Math.round(lat / precision) * precision,
    lon: Math.round(lon / precision) * precision,
  };
}

/**
 * Generate cache key for weather data based on rounded coordinates
 */
export function generateWeatherCacheKey(lat: number, lon: number): string {
  const { lat: roundedLat, lon: roundedLon } = roundCoordinates(lat, lon);
  return `weather:${roundedLat}:${roundedLon}`;
}

/**
 * Calculate distance between two coordinates in kilometers
 * Uses Haversine formula for accuracy
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
