import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Filter, ZoomIn, ZoomOut, Maximize2, MapPin } from 'lucide-react'
import { useState } from 'react'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
  onFilterChange: (comportamento: string | null) => void
  totalSharks: number
  filteredCount: number
}

const MapControls = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onFilterChange,
  totalSharks,
  filteredCount
}: MapControlsProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  const handleFilterClick = (comportamento: string) => {
    const newFilter = selectedFilter === comportamento ? null : comportamento
    setSelectedFilter(newFilter)
    onFilterChange(newFilter)
  }

  const filters = [
    { label: 'Transitando', value: 'Transitando', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Busca', value: 'Busca', color: 'bg-orange-500 hover:bg-orange-600' },
    { label: 'Forrageando', value: 'Forrageando', color: 'bg-green-500 hover:bg-green-600' },
  ]

  return (
    <div className="absolute top-4 left-4 z-10 space-y-3">
      {/* Controles de Zoom */}
      <Card className="p-2 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onZoomIn}
            className="h-10 w-10"
            title="Ampliar"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onZoomOut}
            className="h-10 w-10"
            title="Reduzir"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onResetView}
            className="h-10 w-10"
            title="Resetar visualização"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Filtros de Comportamento */}
      <Card className="p-3 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <span className="text-sm font-semibold text-slate-900">Comportamento</span>
        </div>
        <div className="space-y-2">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterClick(filter.value)}
              className={`w-full justify-start ${
                selectedFilter === filter.value ? filter.color + ' text-white' : ''
              }`}
            >
              <span className={`h-3 w-3 rounded-full mr-2 ${filter.color.split(' ')[0]}`} />
              {filter.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Estatísticas */}
      <Card className="p-3 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-slate-600" />
          <span className="text-sm font-semibold text-slate-900">Estatísticas</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Total:</span>
            <Badge variant="secondary">{totalSharks}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Visíveis:</span>
            <Badge variant="default">{filteredCount}</Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default MapControls

