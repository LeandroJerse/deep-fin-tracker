import SharkMapContainer from '@/components/map/SharkMapContainer'
import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'
import { Card } from '@/components/ui/card'
import { Waves } from 'lucide-react'

const SharkTrackingPage = () => {
  const handleSharkSelect = (shark: RastreamentoTubaroes) => {
    console.log('Tubarão selecionado:', shark)
    // Aqui você pode adicionar lógica adicional quando um tubarão for selecionado
    // Por exemplo, mostrar detalhes em um painel lateral, fazer zoom, etc.
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Cabeçalho */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Waves className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Rastreamento de Tubarões
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Visualização em tempo real das posições e comportamentos dos tubarões monitorados
              </p>
            </div>
          </div>
        </Card>

        {/* Mapa */}
        <div className="h-[calc(100vh-200px)] min-h-[600px]">
          <SharkMapContainer
            autoRefresh={false}
            refreshInterval={30000}
            onSharkSelect={handleSharkSelect}
            className="rounded-lg overflow-hidden shadow-xl"
          />
        </div>

        {/* Legenda */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-lg">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Legenda de Comportamentos</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow"></span>
              <span className="text-sm text-slate-700">Transitando</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-orange-500 border-2 border-white shadow"></span>
              <span className="text-sm text-slate-700">Busca</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-green-500 border-2 border-white shadow"></span>
              <span className="text-sm text-slate-700">Forrageando</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SharkTrackingPage

