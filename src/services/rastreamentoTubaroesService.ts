import type { RastreamentoTubaroes, RastreamentoTubaroesDto } from '../types/rastreamentoTubaroes'
import { ApiUrlManager, buildUrl, API_ENDPOINTS } from '../config/api'
import { api } from './httpClient'
import { ApiResponse, PaginatedResponse } from '@/types/common'


export class RastreamentoTubaroesService {
  static async getAllRastreamentoTubaroes(
    pageNum?: number,
    itemsPerPage?: number,
    defFilter?: string,
    newOrderBy?: string,
    filter?: RastreamentoTubaroesDto
  ): Promise<PaginatedResponse<RastreamentoTubaroes>> {
    try {
      const params: Record<string, any> = {}

      if (pageNum !== undefined) params.pageNum = pageNum
      if (itemsPerPage !== undefined) params.itemsPerPage = itemsPerPage

      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params[key] = value
          }
        })
      }

      const url = buildUrl(API_ENDPOINTS.RASTEAMENTO_TUBAROES.LIST, params)
      const apiResponse = await api.get<ApiResponse<RastreamentoTubaroes>>(url)

      // Mapear os campos da API (minúsculos) para o formato TypeScript (PascalCase)
      const mappedItems = apiResponse.data.map((item: any) => ({
        Id: item.id,
        Tempo: item.tempo,
        Lat: item.lat,
        Lon: item.lon,
        TempCc: item.tempCc,
        PForrageio: item.pForrageio,
        Comportamento: item.comportamento,
        ChlorAAmbiente: item.chlorAAmbiente,
        SshaAmbiente: item.sshaAmbiente,
      }))

      return {
        items: mappedItems,
        totalRecords: apiResponse.pagination.totalRecords || mappedItems.length,
        pageNum: apiResponse.pagination.pageNum,
        itemsPerPage: apiResponse.pagination.itemsPerPage,
        totalPages: apiResponse.pagination.totalPages || Math.ceil(mappedItems.length / apiResponse.pagination.itemsPerPage),
      }
    } catch (error) {
      console.error('Erro ao buscar rastreamento de tubarões:', error)
      throw new Error('Falha ao carregar rastreamento de tubarões')
    }
  }

  static async getRastreamentoTubaroesById(id: string): Promise<RastreamentoTubaroes> {
    try {
      const url = buildUrl(API_ENDPOINTS.RASTEAMENTO_TUBAROES.BY_ID(id as unknown as number))
      const apiResponse = await api.get<ApiResponse<RastreamentoTubaroes>>(url)
      
      // Mapear os campos da API (minúsculos) para o formato TypeScript (PascalCase)
      const item = apiResponse.data[0]
      return {
        Id: item.id,
        Tempo: item.tempo,
        Lat: item.lat,
        Lon: item.lon,
        TempCc: item.tempCc,
        PForrageio: item.pForrageio,
        Comportamento: item.comportamento,
        ChlorAAmbiente: item.chlorAAmbiente,
        SshaAmbiente: item.sshaAmbiente,
      } as any
    } catch (error) {
      console.error('Erro ao buscar rastreamento de tubarões:', error)
      throw new Error('Falha ao buscar rastreamento de tubarões')
    }
  }

  static async getLatestposition(): Promise<PaginatedResponse<RastreamentoTubaroes>> {
    try {
      const url = buildUrl(API_ENDPOINTS.RASTEAMENTO_TUBAROES.LATEST_POSITION)
      console.log('🔍 [SERVICE] Buscando dados da API:', url)
      
      const apiResponse = await api.get<ApiResponse<RastreamentoTubaroes>>(url)
      
      console.log('📊 [SERVICE] Resposta completa da API:', apiResponse)
      console.log('📦 [SERVICE] apiResponse.data:', apiResponse.data)
      console.log('📈 [SERVICE] Quantidade de registros:', apiResponse.data?.length)
      console.log('🔢 [SERVICE] Pagination:', apiResponse.pagination)
      
      if (apiResponse.data && apiResponse.data.length > 0) {
        console.log('🦈 [SERVICE] Primeiro tubarão retornado:', apiResponse.data[0])
        console.log('🔑 [SERVICE] Chaves do primeiro tubarão:', Object.keys(apiResponse.data[0]))
        
        const firstShark = apiResponse.data[0]
        console.log('📍 [SERVICE] Coordenadas do primeiro:')
        console.log('   - Lat:', firstShark.Lat, typeof firstShark.Lat)
        console.log('   - Lon:', firstShark.Lon, typeof firstShark.Lon)
      }
      
      // Mapear os campos da API (minúsculos) para o formato TypeScript (PascalCase)
      const mappedItems = apiResponse.data.map((item: any) => ({
        Id: item.id,
        Tempo: item.tempo,
        Lat: item.lat,
        Lon: item.lon,
        TempCc: item.tempCc,
        PForrageio: item.pForrageio,
        Comportamento: item.comportamento,
        ChlorAAmbiente: item.chlorAAmbiente,
        SshaAmbiente: item.sshaAmbiente,
      }))
      
      console.log('🔄 [SERVICE] Dados mapeados:', mappedItems)
      if (mappedItems.length > 0) {
        console.log('✨ [SERVICE] Primeiro tubarão após mapeamento:', mappedItems[0])
      }
      
      const result = {
        items: mappedItems,
        totalRecords: apiResponse.pagination?.totalRecords || mappedItems.length,
        pageNum: apiResponse.pagination?.pageNum || 1,
        itemsPerPage: apiResponse.pagination?.itemsPerPage || mappedItems.length,
        totalPages: apiResponse.pagination?.totalPages || Math.ceil(mappedItems.length / (apiResponse.pagination?.itemsPerPage || mappedItems.length)),
      }
      
      console.log('✅ [SERVICE] Retornando resultado:', result)
      return result
    } catch (error) {
      console.error('❌ [SERVICE] Erro ao buscar rastreamento de tubarões:', error)
      throw new Error('Falha ao buscar rastreamento de tubarões')
    }
  }
}