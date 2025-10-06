import { Button } from '@/components/ui/button'
import { Activity, Waves, Fish } from 'lucide-react'
import { useState } from 'react'
import { getBehaviorInfo } from '@/utils/sharkTranslations'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
  onFilterChange: (comportamento: string | null) => void
  totalSharks: number
  filteredCount: number
}

const MapControls = ({
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
    { 
      label: 'Transiting', 
      value: 'transitando', 
      color: '#3B82F6',
      icon: Activity,
      bgClass: 'bg-blue-500/20 hover:bg-blue-500/30',
      borderClass: 'border-blue-500',
      textClass: 'text-blue-700'
    },
    { 
      label: 'Searching', 
      value: 'busca', 
      color: '#F59E0B',
      icon: Waves,
      bgClass: 'bg-orange-500/20 hover:bg-orange-500/30',
      borderClass: 'border-orange-500',
      textClass: 'text-orange-700'
    },
    { 
      label: 'Foraging', 
      value: 'forrageando', 
      color: '#10B981',
      icon: Fish,
      bgClass: 'bg-green-500/20 hover:bg-green-500/30',
      borderClass: 'border-green-500',
      textClass: 'text-green-700'
    },
  ]

  return (
    <>
      {/* Card de Estatísticas - Topo Direito */}
      <div className="absolute top-6 right-6 z-[1000] flex gap-3">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl px-5 py-3 border border-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900">{totalSharks}</span>
              <span className="text-xs text-slate-500 font-medium">Total</span>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-blue-600">{filteredCount}</span>
              <span className="text-xs text-slate-500 font-medium">Visible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros Compactos - Topo Central */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[1000]">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 border border-slate-200/50">
          <div className="flex gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon
              const isSelected = selectedFilter === filter.value
              
              return (
                <Button
                  key={filter.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFilterClick(filter.value)}
                  className={`
                    relative overflow-hidden transition-all duration-300 rounded-xl
                    ${isSelected 
                      ? `${filter.bgClass} ${filter.borderClass} border-2 ${filter.textClass} font-semibold` 
                      : 'hover:bg-slate-100 text-slate-600'
                    }
                  `}
                  style={isSelected ? {
                    boxShadow: `0 4px 20px ${filter.color}40`
                  } : {}}
                >
                  <Icon className={`h-4 w-4 mr-2 ${isSelected ? 'animate-pulse' : ''}`} />
                  {filter.label}
                  {isSelected && (
                    <span className="ml-2 px-2 py-0.5 bg-white/80 rounded-full text-xs font-bold">
                      {filteredCount}
                    </span>
                  )}
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Legenda Minimalista - Inferior Esquerdo */}
      {!selectedFilter && (
        <div className="absolute bottom-6 left-6 z-[1000]">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl px-4 py-3 border border-slate-200/50">
            <div className="flex items-center gap-4">
              {filters.map((filter) => (
                <div key={filter.value} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full shadow-md" 
                    style={{ backgroundColor: filter.color }}
                  ></div>
                  <span className="text-xs font-medium text-slate-700">{filter.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MapControls
