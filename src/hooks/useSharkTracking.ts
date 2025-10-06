import { useState, useEffect } from 'react'
import { RastreamentoTubaroesService } from '@/services/rastreamentoTubaroesService'
import { RastreamentoTubaroes } from '@/types/rastreamentoTubaroes'

interface UseSharkTrackingReturn {
  sharks: RastreamentoTubaroes[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  totalRecords: number
}

export const useSharkTracking = (autoRefetch: boolean = false, refreshInterval?: number): UseSharkTrackingReturn => {
  const [sharks, setSharks] = useState<RastreamentoTubaroes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchSharks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await RastreamentoTubaroesService.getLatestposition()
      
      setSharks(response.items)
      setTotalRecords(response.totalRecords)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading shark tracking data: Unknown error'
      setError(errorMessage)
      console.error('Error loading shark tracking data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSharks()
  }, [])

  useEffect(() => {
    if (autoRefetch && refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => {
        fetchSharks()
      }, refreshInterval)

      return () => clearInterval(interval)
    }
  }, [autoRefetch, refreshInterval])

  return {
    sharks,
    loading,
    error,
    refetch: fetchSharks,
    totalRecords
  }
}

