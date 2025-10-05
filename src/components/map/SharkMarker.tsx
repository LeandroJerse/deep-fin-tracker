import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'
import { renderToString } from 'react-dom/server'
import SharkInfoPopup from './SharkInfoPopup'

interface SharkMarkerProps {
  shark: RastreamentoTubaroes
  map: mapboxgl.Map
  onMarkerClick?: (shark: RastreamentoTubaroes) => void
}

const getBehaviorColor = (comportamento: string): string => {
  const colors: Record<string, string> = {
    'Transitando': '#3B82F6',  // Azul
    'Busca': '#F59E0B',        // Laranja
    'Forrageando': '#10B981',  // Verde
  }
  return colors[comportamento] || '#6B7280' // Cinza como fallback
}

const SharkMarker = ({ shark, map, onMarkerClick }: SharkMarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null)

  useEffect(() => {
    if (!map) return

    // Criar elemento do marcador
    const el = document.createElement('div')
    el.className = 'shark-marker'
    el.style.cssText = `
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${getBehaviorColor(shark.Comportamento)};
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `

    // Adicionar ícone de tubarão
    el.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    `

    // Efeito de hover
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.2)'
    })
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)'
    })

    // Criar popup com as informações do tubarão
    const popupContent = renderToString(<SharkInfoPopup shark={shark} />)
    
    const popup = new mapboxgl.Popup({ 
      offset: 25,
      closeButton: true,
      closeOnClick: false,
      maxWidth: '320px'
    }).setHTML(popupContent)

    // Criar marcador
    const marker = new mapboxgl.Marker(el)
      .setLngLat([shark.Lon, shark.Lat])
      .setPopup(popup)
      .addTo(map)

    // Adicionar evento de clique
    el.addEventListener('click', () => {
      if (onMarkerClick) {
        onMarkerClick(shark)
      }
    })

    markerRef.current = marker

    // Cleanup
    return () => {
      if (markerRef.current) {
        markerRef.current.remove()
        markerRef.current = null
      }
    }
  }, [shark, map, onMarkerClick])

  return null // Este componente não renderiza nada no DOM do React
}

export default SharkMarker

