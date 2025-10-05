import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'

// Fix para os ícones padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface LeafletMapProps {
  sharks: RastreamentoTubaroes[]
  onSharkSelect?: (shark: RastreamentoTubaroes) => void
  selectedBehavior?: string | null
}

const getBehaviorColor = (comportamento: string): string => {
  const colors: Record<string, string> = {
    'Transitando': '#3B82F6',  // Azul
    'Busca': '#F59E0B',        // Laranja
    'Forrageando': '#10B981',  // Verde
  }
  return colors[comportamento] || '#6B7280'
}

const LeafletMap = ({ sharks, onSharkSelect, selectedBehavior }: LeafletMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [hasValidSharks, setHasValidSharks] = useState(true)

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    // Criar mapa com zoom mais afastado
    const map = L.map(mapContainer.current, {
      center: [-15, -40], // Centro do Brasil
      zoom: 3, // Zoom mais afastado (era 4)
      zoomControl: true,
    })

    // Adicionar camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Atualizar marcadores
  useEffect(() => {
    if (!mapRef.current) return

    // Remover marcadores anteriores
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Filtrar tubarões se necessário
    const filteredSharks = selectedBehavior
      ? sharks.filter(shark => shark.Comportamento === selectedBehavior)
      : sharks

    if (filteredSharks.length === 0) return

    // Criar bounds para ajustar o zoom
    const bounds = L.latLngBounds([])

    // Adicionar marcadores
    filteredSharks.forEach((shark) => {
      // Validar coordenadas antes de criar marcador
      if (!shark.Lat || !shark.Lon || isNaN(shark.Lat) || isNaN(shark.Lon)) {
        return
      }

      const color = getBehaviorColor(shark.Comportamento)
      
      // Criar ícone customizado com tubarão mais bonito e detalhado
      const icon = L.divIcon({
        className: 'custom-shark-marker',
        html: `
          <div class="shark-icon-wrapper" style="
            width: 50px;
            height: 50px;
            position: relative;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
          ">
            <!-- Círculo de fundo com gradiente -->
            <div style="
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
              border-radius: 50%;
              border: 3px solid white;
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
            ">
              <!-- SVG do Tubarão detalhado -->
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 64 64" 
                fill="none"
                style="position: relative; z-index: 2;"
              >
                <!-- Corpo do tubarão -->
                <path 
                  d="M8 32 Q8 28, 12 26 L40 26 Q45 26, 48 28 L56 32 Q58 34, 56 36 L48 40 Q45 42, 40 42 L12 42 Q8 40, 8 36 Z" 
                  fill="white"
                  opacity="0.95"
                />
                <!-- Barbatana dorsal -->
                <path 
                  d="M28 20 L32 12 L36 20 Q34 24, 32 24 Q30 24, 28 20 Z" 
                  fill="white"
                  opacity="0.9"
                />
                <!-- Barbatana caudal -->
                <path 
                  d="M4 28 L8 32 L4 36 Q2 34, 4 28 Z" 
                  fill="white"
                  opacity="0.85"
                />
                <!-- Barbatanas laterais -->
                <path 
                  d="M38 26 L44 22 L42 28 Z" 
                  fill="white"
                  opacity="0.8"
                />
                <path 
                  d="M38 42 L44 46 L42 40 Z" 
                  fill="white"
                  opacity="0.8"
                />
                <!-- Olho -->
                <circle cx="44" cy="30" r="1.5" fill="${color}" opacity="0.8"/>
                <!-- Guelras -->
                <line x1="36" y1="28" x2="34" y2="28" stroke="white" stroke-width="0.8" opacity="0.6"/>
                <line x1="36" y1="32" x2="34" y2="32" stroke="white" stroke-width="0.8" opacity="0.6"/>
                <line x1="36" y1="36" x2="34" y2="36" stroke="white" stroke-width="0.8" opacity="0.6"/>
              </svg>
            </div>
            
            <!-- Indicador de pulso (opcional) -->
            <div class="pulse-ring" style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
              border-radius: 50%;
              border: 2px solid ${color};
              opacity: 0;
              animation: pulse 2s ease-out infinite;
            "></div>
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -28]
      })

      // Criar popup com verificações de segurança
      const safeValue = (value: any, decimals: number = 2, defaultValue: string = 'N/A'): string => {
        if (value === null || value === undefined || isNaN(value)) return defaultValue
        return Number(value).toFixed(decimals)
      }

      const popupContent = `
        <div style="padding: 8px; min-width: 250px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="margin: 0; font-weight: 700; color: #0F172A; font-size: 16px;">
              Tubarão #${shark.Id || 'N/A'}
            </h3>
            <span style="
              background-color: ${color}; 
              color: white; 
              padding: 4px 8px; 
              border-radius: 12px; 
              font-size: 11px;
              font-weight: 600;
            ">
              ${shark.Comportamento || 'Desconhecido'}
            </span>
          </div>
          
          <div style="display: grid; gap: 8px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0;">
              <span style="color: #64748B; font-weight: 500;">Coordenadas:</span>
              <span style="color: #0F172A; font-family: monospace;">${safeValue(shark.Lat, 4)}°, ${safeValue(shark.Lon, 4)}°</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0;">
              <span style="color: #64748B; font-weight: 500;">Temperatura:</span>
              <span style="color: #0F172A; font-weight: 600;">${safeValue(shark.TempCc, 1)}°C</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0;">
              <span style="color: #64748B; font-weight: 500;">Probabilidade de Forrageio:</span>
              <span style="color: #0F172A; font-weight: 600;">${safeValue(shark.PForrageio ? shark.PForrageio * 100 : null, 0)}%</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0;">
              <span style="color: #64748B; font-weight: 500;">Clorofila Ambiente:</span>
              <span style="color: #0F172A;">${safeValue(shark.ChlorAAmbiente, 2)}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0;">
              <span style="color: #64748B; font-weight: 500;">Anomalida do Nível do Mar:</span>
              <span style="color: #0F172A;">${safeValue(shark.SshaAmbiente, 2) } cm</span>
            </div>
            
            <div style="padding-top: 8px; border-top: 2px solid #E2E8F0;">
              <span style="color: #94A3B8; font-size: 11px;">
                ${shark.Tempo ? new Date(shark.Tempo).toLocaleString('pt-BR') : 'Data desconhecida'}
              </span>
            </div>
          </div>
        </div>
      `

      const marker = L.marker([shark.Lat, shark.Lon], { icon })
        .bindPopup(popupContent, {
          maxWidth: 320,
          className: 'shark-popup'
        })
        .addTo(mapRef.current!)

      // Adicionar evento de clique
      marker.on('click', () => {
        if (onSharkSelect) {
          onSharkSelect(shark)
        }
      })

      markersRef.current.push(marker)
      bounds.extend([shark.Lat, shark.Lon])
    })

    // Ajustar zoom para mostrar todos os marcadores (apenas se houver marcadores válidos)
    if (markersRef.current.length > 0 && bounds.isValid()) {
      mapRef.current.fitBounds(bounds, {
        padding: [80, 80], // Mais espaço nas bordas
        maxZoom: 8 // Zoom máximo mais afastado (era 15)
      })
      setHasValidSharks(true)
    } else if (filteredSharks.length > 0 && markersRef.current.length === 0) {
      setHasValidSharks(false)
    } else if (filteredSharks.length === 0) {
      setHasValidSharks(true)
    }
  }, [sharks, selectedBehavior, onSharkSelect])

  return (
    <>
      <style>{`
        .custom-shark-marker {
          background: transparent !important;
          border: none !important;
        }
        
        /* Animação de flutuação suave */
        .shark-icon-wrapper {
          animation: sharkFloat 3s ease-in-out infinite;
          cursor: pointer;
        }
        
        @keyframes sharkFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-3px) rotate(-2deg);
          }
          75% {
            transform: translateY(-3px) rotate(2deg);
          }
        }
        
        /* Efeito de hover mais suave */
        .custom-shark-marker:hover .shark-icon-wrapper {
          animation: none;
          transform: scale(1.15) !important;
        }
        
        .custom-shark-marker:hover .shark-icon-wrapper > div:first-child {
          box-shadow: 0 0 20px currentColor;
          transform: scale(1.05);
        }
        
        /* Animação de pulso */
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        
        /* Efeito de onda ao clicar */
        .custom-shark-marker:active .shark-icon-wrapper {
          animation: ripple 0.6s ease-out;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
        .shark-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .shark-popup .leaflet-popup-content {
          margin: 0;
        }
        .shark-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
      <div className="relative w-full h-full">
        <div 
          ref={mapContainer} 
          className="w-full h-full rounded-lg shadow-lg"
          style={{ minHeight: '400px' }}
        />
        
        {/* Mensagem quando não há dados válidos */}
        {!hasValidSharks && sharks.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 max-w-md mx-4 pointer-events-auto">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Dados Incompletos
                </h3>
                <p className="text-sm text-slate-600">
                  Os tubarões neste conjunto não possuem coordenadas válidas para exibição no mapa.
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Verifique a API ou tente outro filtro.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default LeafletMap

