import { SharkData } from '@/types/shark';

// Mock data generator for testing
export const generateMockSharkData = (count: number = 8): SharkData[] => {
  const sharks: SharkData[] = [];
  
  // Brazilian coast coordinates range
  const latRange = { min: -330000, max: -50000 }; // -33° to -5° (multiply by 10000)
  const lonRange = { min: -550000, max: -340000 }; // -55° to -34° (multiply by 10000)
  
  for (let i = 0; i < count; i++) {
    sharks.push({
      id: 1000 + i,
      lat: Math.floor(Math.random() * (latRange.max - latRange.min) + latRange.min),
      lon: Math.floor(Math.random() * (lonRange.max - lonRange.min) + lonRange.min),
      temp_cC: Math.floor(Math.random() * 1000 + 1800), // 18-28°C
      p_forrageio: Math.random(),
      comportamento: Math.floor(Math.random() * 3), // 0, 1, or 2
      chlor_a_ambiente: Math.random() * 2 + 0.1,
      ssha_ambiente: Math.random() * 0.5 - 0.25,
    });
  }
  
  return sharks;
};
