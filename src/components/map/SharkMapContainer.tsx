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
  refreshInterval = 30000,
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
                Loading Shark Map
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Getting latest positions...
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
            <AlertTitle>Error loading data</AlertTitle>
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
                Trying again...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
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
              No shark found
            </h3>
            <p className="text-sm text-slate-600">
              No shark tracking data available at the moment.
            </p>
            <Button onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Update
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
      
      {/* Botão de atualização - Inferior Direito */}
      <div className="absolute bottom-6 right-6 z-[1000]">
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          size="sm"
          className="bg-white/95 backdrop-blur-md shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 rounded-xl border border-slate-200/50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''} text-blue-600`} />
          <span className="text-slate-700 font-medium">
            {isRefreshing ? 'Updating...' : 'Update'}
          </span>
        </Button>
      </div>

      {/* Indicador de erro flutuante */}
      {error && sharks.length > 0 && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[1000] max-w-md">
          <Alert variant="destructive" className="bg-white/95 backdrop-blur-md shadow-2xl border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Error updating: {error}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}

export default SharkMapContainer
