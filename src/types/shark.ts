export interface SharkData {
  id: number;
  lat: number; // Latitude em graus * 1e-4
  lon: number; // Longitude em graus * 1e-4
  temp_cC: number; // Temperatura em Celsius * 100
  p_forrageio: number; // Probabilidade de forrageio (0-1)
  comportamento: number; // 0=transitando, 1=busca, 2=forrageando
  chlor_a_ambiente: number; // Concentração de clorofila
  ssha_ambiente: number; // Altura da superfície do mar
}
