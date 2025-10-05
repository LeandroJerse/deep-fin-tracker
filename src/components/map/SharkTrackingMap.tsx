import { useState } from 'react'
import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'
import MapControls from './MapControls'
import LeafletMap from './LeafletMap'

interface SharkTrackingMapProps {
  sharks: RastreamentoTubaroes[]
  onSharkSelect?: (shark: RastreamentoTubaroes) => void
}

const SharkTrackingMap = ({ sharks, onSharkSelect }: SharkTrackingMapProps) => {
  const [selectedBehavior, setSelectedBehavior] = useState<string | null>(null)


  // Filtrar tubarões por comportamento
  const filteredSharks = selectedBehavior
    ? sharks.filter(shark => shark.Comportamento === selectedBehavior)
    : sharks

  const handleFilterChange = (comportamento: string | null) => {
    setSelectedBehavior(comportamento)
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <LeafletMap 
        sharks={filteredSharks}
        onSharkSelect={onSharkSelect}
        selectedBehavior={selectedBehavior}
      />
      
      <MapControls
        onZoomIn={() => {}}
        onZoomOut={() => {}}
        onResetView={() => {}}
        onFilterChange={handleFilterChange}
        totalSharks={sharks.length}
        filteredCount={filteredSharks.length}
      />
    </div>
  )
}

export default SharkTrackingMap

