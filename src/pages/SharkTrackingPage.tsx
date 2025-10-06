import SharkMapContainer from '@/components/map/SharkMapContainer'
import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Waves, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SharkTrackingPage = () => {
  const navigate = useNavigate()
  
  const handleSharkSelect = (shark: RastreamentoTubaroes) => {
    console.log('Selected shark:', shark)
    // Here you can add additional logic when a shark is selected
    // For example, show details in a side panel, zoom, etc.
  }

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-900 p-4">
      <div className="max-w-[98vw] mx-auto">
        {/* Cabeçalho Compacto */}
        <div className="mb-4">
          <Card className="p-4 bg-white/90 backdrop-blur-md shadow-2xl border border-slate-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Botão de Voltar Estratégico */}
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-xl border-2 border-slate-300 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg group"
                  aria-label="Back to home page"
                >
                  <ArrowLeft className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                </Button>
                
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <Waves className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Shark Tracking
                  </h1>
                  <p className="text-xs text-slate-500">
                    Real-time monitoring
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Mapa em Tela Cheia */}
        <div className="h-[calc(100vh-120px)]">
          <SharkMapContainer
            autoRefresh={false}
            refreshInterval={30000}
            onSharkSelect={handleSharkSelect}
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/30"
          />
        </div>
      </div>
    </div>
  )
}

export default SharkTrackingPage

