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
      console.error('Error loading shark tracking data:', error)
      throw new Error('Error loading shark tracking data')
    }
  }

  static async getRastreamentoTubaroesById(id: string): Promise<RastreamentoTubaroes> {
    try {
      const url = buildUrl(API_ENDPOINTS.RASTEAMENTO_TUBAROES.BY_ID(id as unknown as number))
      const apiResponse = await api.get<ApiResponse<RastreamentoTubaroes>>(url)
      
      // Mapear os campos da API (minúsculos) para o formato TypeScript (PascalCase)
      const item = apiResponse.data[0] as any
      return {
        Id: item['id'],
        Tempo: item['tempo'],
        Lat: item['lat'],
        Lon: item['lon'],
        TempCc: item['tempCc'],
        PForrageio: item['pForrageio'],
        Comportamento: item['comportamento'],
        ChlorAAmbiente: item['chlorAAmbiente'],
        SshaAmbiente: item['sshaAmbiente'],
      } as RastreamentoTubaroes
    } catch (error) {
      console.error('Error loading shark tracking data:', error)
      throw new Error('Error loading shark tracking data')
    }
  }

  static async getLatestposition(): Promise<PaginatedResponse<RastreamentoTubaroes>> {
    try {
      const url = buildUrl(API_ENDPOINTS.RASTEAMENTO_TUBAROES.LATEST_POSITION)
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
        totalRecords: apiResponse.pagination?.totalRecords || mappedItems.length,
        pageNum: apiResponse.pagination?.pageNum || 1,
        itemsPerPage: apiResponse.pagination?.itemsPerPage || mappedItems.length,
        totalPages: apiResponse.pagination?.totalPages || Math.ceil(mappedItems.length / (apiResponse.pagination?.itemsPerPage || mappedItems.length)),
      }
    } catch (error) {
      console.error('Error loading shark tracking data:', error)
      throw new Error('Error loading shark tracking data')
    }
  }
}