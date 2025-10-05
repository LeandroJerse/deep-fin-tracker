import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SharkData } from '@/types/shark';

interface SharkMapProps {
  sharks: SharkData[];
  selectedBehavior?: number;
}

const SharkMap = ({ sharks, selectedBehavior }: SharkMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-40, -15],
      zoom: 3,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current) return;

    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    const filteredSharks = selectedBehavior !== undefined
      ? sharks.filter(s => s.comportamento === selectedBehavior)
      : sharks;

    filteredSharks.forEach(shark => {
      const lat = shark.lat / 10000;
      const lon = shark.lon / 10000;

      const behaviorColors = {
        0: '#3B82F6', // Transitando - Azul
        1: '#F59E0B', // Busca - Laranja
        2: '#10B981', // Forrageando - Verde
      };

      const behaviorNames = {
        0: 'Transitando',
        1: 'Busca',
        2: 'Forrageando',
      };

      const el = document.createElement('div');
      el.className = 'shark-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = behaviorColors[shark.comportamento as keyof typeof behaviorColors];
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      el.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #0A2E4D;">Tubarão #${shark.id}</h3>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Comportamento:</strong> ${behaviorNames[shark.comportamento as keyof typeof behaviorNames]}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Temperatura:</strong> ${(shark.temp_cC / 100).toFixed(1)}°C</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>P. Forrageio:</strong> ${(shark.p_forrageio * 100).toFixed(0)}%</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Clorofila-a:</strong> ${shark.chlor_a_ambiente.toFixed(2)}</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([lon, lat])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [sharks, selectedBehavior]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-card rounded-lg border-2 border-dashed border-border p-8">
        <div className="text-center max-w-md">
          <h3 className="text-lg font-semibold mb-2">Configuração do Mapa</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Para visualizar o mapa, insira seu token público do Mapbox
          </p>
          <input
            type="text"
            placeholder="Cole seu token do Mapbox aqui"
            className="w-full px-4 py-2 border border-input rounded-md mb-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setMapboxToken(e.currentTarget.value);
              }
            }}
          />
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:underline"
          >
            Obter token gratuito no Mapbox →
          </a>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-full rounded-lg shadow-lg" />;
};

export default SharkMap;
