import { useState } from 'react'
import { useSharkTracking } from '@/hooks/useSharkTracking'
import SharkTrackingMap from './SharkTrackingMap'
import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface SharkMapContainerProps {
  autoRefresh?: boolean
  refreshInterval?: number
  onSharkSelect?: (shark: RastreamentoTubaroes) => void
  className?: string
}

const SharkMapContainer = ({ 
  autoRefresh = false, 
  refreshInterval = 30000, // 30 segundos por padrão
  onSharkSelect,
  className = ''
}: SharkMapContainerProps) => {
  const { sharks, loading, error, refetch, totalRecords } = useSharkTracking(autoRefresh, refreshInterval)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }

  // Estado de carregamento inicial
  if (loading && sharks.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-slate-50 rounded-lg ${className}`}>
        <Card className="p-8 shadow-lg">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                Carregando Mapa de Tubarões
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Obtendo posições mais recentes...
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Estado de erro
  if (error && sharks.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-slate-50 rounded-lg ${className}`}>
        <Card className="max-w-md w-full p-6 shadow-lg">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao carregar dados</AlertTitle>
            <AlertDescription className="mt-2">
              {error}
            </AlertDescription>
          </Alert>
          <Button 
            onClick={handleRefresh} 
            className="w-full mt-4"
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tentando novamente...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar Novamente
              </>
            )}
          </Button>
        </Card>
      </div>
    )
  }

  // Estado sem dados
  if (!loading && sharks.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-slate-50 rounded-lg ${className}`}>
        <Card className="max-w-md w-full p-6 shadow-lg">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Nenhum tubarão encontrado
            </h3>
            <p className="text-sm text-slate-600">
              Não há dados de rastreamento disponíveis no momento.
            </p>
            <Button onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <SharkTrackingMap 
        sharks={sharks} 
        onSharkSelect={onSharkSelect}
      />
      
      {/* Botão de atualização flutuante */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="secondary"
          size="sm"
          className="bg-white/95 backdrop-blur-sm shadow-lg hover:bg-white"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Atualizando...' : 'Atualizar'}
        </Button>
      </div>

      {/* Indicador de erro flutuante (se houver dados mas erro na atualização) */}
      {error && sharks.length > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 max-w-md">
          <Alert variant="destructive" className="bg-white/95 backdrop-blur-sm shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Erro ao atualizar: {error}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Informação sobre total de registros */}
      <div className="absolute bottom-4 right-4 z-10">
        <Card className="px-3 py-2 bg-white/95 backdrop-blur-sm shadow-lg">
          <p className="text-xs text-slate-600">
            <span className="font-semibold">{totalRecords}</span> tubar
{totalRecords === 1 ? 'ão' : 'ões'} rastreado{totalRecords === 1 ? '' : 's'}
          </p>
        </Card>
      </div>
    </div>
  )
}

export default SharkMapContainer

