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

    console.log('🗺️ LeafletMap - Atualizando marcadores')
    console.log('📊 Total de tubarões recebidos:', sharks.length)
    console.log('🦈 Dados dos tubarões:', sharks)
    
    if (sharks.length > 0) {
      console.log('📍 Primeiro tubarão completo:', sharks[0])
      console.log('🔑 Chaves do objeto:', Object.keys(sharks[0]))
      console.log('📐 Lat do primeiro:', sharks[0].Lat)
      console.log('📐 Lon do primeiro:', sharks[0].Lon)
    }

    // Remover marcadores anteriores
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Filtrar tubarões se necessário
    const filteredSharks = selectedBehavior
      ? sharks.filter(shark => shark.Comportamento === selectedBehavior)
      : sharks

    console.log('🔍 Tubarões após filtro:', filteredSharks.length)

    if (filteredSharks.length === 0) return

    // Criar bounds para ajustar o zoom
    const bounds = L.latLngBounds([])

    // Adicionar marcadores
    filteredSharks.forEach((shark, index) => {
      console.log(`\n🦈 Processando tubarão ${index + 1}:`)
      console.log('  - Objeto completo:', shark)
      console.log('  - Id:', shark.Id)
      console.log('  - Lat:', shark.Lat, '(tipo:', typeof shark.Lat, ')')
      console.log('  - Lon:', shark.Lon, '(tipo:', typeof shark.Lon, ')')
      console.log('  - Comportamento:', shark.Comportamento)
      
      // Validar coordenadas antes de criar marcador
      if (!shark.Lat || !shark.Lon || isNaN(shark.Lat) || isNaN(shark.Lon)) {
        console.warn(`❌ Tubarão #${shark.Id} tem coordenadas inválidas:`, shark.Lat, shark.Lon)
        console.warn('   Todas as propriedades:', Object.entries(shark))
        return
      }
      
      console.log('✅ Coordenadas válidas! Criando marcador...')

      const color = getBehaviorColor(shark.Comportamento)
      
      // Criar ícone customizado com formato de tubarão
      const icon = L.divIcon({
        className: 'custom-shark-marker',
        html: `
          <div style="
            width: 45px;
            height: 45px;
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 3px 10px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease;
            cursor: pointer;
          ">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 512 512" 
              fill="white"
              style="transform: rotate(45deg);"
            >
              <!-- Ícone de tubarão SVG -->
              <path d="M120.6 153.3L96 128l24.6-25.3c6.2-6.4 16.4-6.4 22.6 0l25.3 26 25.3-26c6.2-6.4 16.4-6.4 22.6 0L241 128l-24.6 25.3c-6.2 6.4-16.4 6.4-22.6 0l-25.3-26-25.3 26c-6.2 6.4-16.4 6.4-22.6 0zM313.4 102.7c6.2-6.4 16.4-6.4 22.6 0l25.3 26 25.3-26c6.2-6.4 16.4-6.4 22.6 0L434 128l-24.6 25.3c-6.2 6.4-16.4 6.4-22.6 0l-25.3-26-25.3 26c-6.2 6.4-16.4 6.4-22.6 0L289 128l24.4-25.3zM256 224c-17.7 0-32 14.3-32 32c0 13.3 10.7 24 24 24h272c13.3 0 24-10.7 24-24c0-17.7-14.3-32-32-32H256zM196.8 371.2C164.7 403.3 148.7 448 148.7 496c0 8.8 7.2 16 16 16s16-7.2 16-16c0-39.1 13-75.7 38.1-104.7c6.3-7.3 5.5-18.3-1.8-24.6s-18.3-5.5-24.6 1.8c.4-.4.8-.8 1.2-1.2z"/>
            </svg>
          </div>
        `,
        iconSize: [45, 45],
        iconAnchor: [22, 22],
        popupAnchor: [0, -25]
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
              <span style="color: #64748B; font-weight: 500;">P. Forrageio:</span>
              <span style="color: #0F172A; font-weight: 600;">${safeValue(shark.PForrageio ? shark.PForrageio * 100 : null, 0)}%</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0;">
              <span style="color: #64748B; font-weight: 500;">Clorofila-a:</span>
              <span style="color: #0F172A;">${safeValue(shark.ChlorAAmbiente, 2)}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #E2E8F0;">
              <span style="color: #64748B; font-weight: 500;">SSHA:</span>
              <span style="color: #0F172A;">${safeValue(shark.SshaAmbiente, 2)}</span>
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
      console.warn('Nenhum tubarão possui coordenadas válidas para exibir no mapa')
      setHasValidSharks(false)
    } else if (filteredSharks.length === 0) {
      setHasValidSharks(true) // Reset quando não há filtros
    }
  }, [sharks, selectedBehavior, onSharkSelect])

  return (
    <>
      <style>{`
        .custom-shark-marker {
          background: transparent !important;
          border: none !important;
        }
        .custom-shark-marker > div {
          animation: float 3s ease-in-out infinite;
        }
        .custom-shark-marker > div:hover {
          transform: rotate(-45deg) scale(1.3) !important;
          animation: none;
        }
        @keyframes float {
          0%, 100% {
            transform: rotate(-45deg) translateY(0px);
          }
          50% {
            transform: rotate(-45deg) translateY(-5px);
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

