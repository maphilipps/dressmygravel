// Weather-related type definitions for DressMyGravel

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windGust?: number;
  precipitation: number;
  precipitationType?: 'rain' | 'snow';
  visibility: number;
  uvIndex: number;
  conditions: WeatherCondition[];
  timestamp: number;
}

export interface LocationCoordinates {
  lat: number;
  lon: number;
  name?: string;
  country?: string;
}

export interface WeatherAPIResponse {
  weather: WeatherData;
  location: LocationCoordinates;
  source: 'openweather' | 'weatherapi';
  cachedAt: number;
}
