import { API_ENDPOINTS, buildUrl, API_CONFIG } from '../config/api'
import { api } from './httpClient'

export interface ApiHealthStatus {
  isHealthy: boolean
  endpoint: string
  responseTime: number
  statusCode?: number
  error?: string
  data?: any
}

export class ApiTestService {
  /**
   * Testa o endpoint /api/Info/v1
   */
  static async testInfoEndpoint(): Promise<ApiHealthStatus> {
    const startTime = performance.now()
    const endpoint = API_ENDPOINTS.INFO.VERSION
    
    try {
      const url = buildUrl(endpoint)
      console.log('🔍 Testando endpoint:', url)
      
      const response = await api.get<any>(url)
      const responseTime = performance.now() - startTime
      
      return {
        isHealthy: true,
        endpoint: url,
        responseTime: Math.round(responseTime),
        statusCode: 200,
        data: response
      }
    } catch (error: any) {
      const responseTime = performance.now() - startTime
      
      return {
        isHealthy: false,
        endpoint: buildUrl(endpoint),
        responseTime: Math.round(responseTime),
        statusCode: error.response?.status,
        error: error.message || 'Erro desconhecido'
      }
    }
  }

  /**
   * Testa conectividade básica com a API
   */
  static async testBasicConnectivity(): Promise<ApiHealthStatus> {
    const startTime = performance.now()
    const baseUrl = API_CONFIG.BASE_URL
    
    try {
      console.log('🔍 Testando conectividade com:', baseUrl)
      
      const response = await fetch(baseUrl, {
        method: 'GET',
        mode: 'cors',
      })
      
      const responseTime = performance.now() - startTime
      
      return {
        isHealthy: response.ok,
        endpoint: baseUrl,
        responseTime: Math.round(responseTime),
        statusCode: response.status,
        data: response.statusText
      }
    } catch (error: any) {
      const responseTime = performance.now() - startTime
      
      return {
        isHealthy: false,
        endpoint: baseUrl,
        responseTime: Math.round(responseTime),
        error: error.message || 'Erro de conectividade'
      }
    }
  }

  /**
   * Testa endpoint de rastreamento de tubarões
   */
  static async testSharkTrackingEndpoint(): Promise<ApiHealthStatus> {
    const startTime = performance.now()
    const endpoint = API_ENDPOINTS.RASTEAMENTO_TUBAROES.LIST
    
    try {
      const url = buildUrl(endpoint, { pageNum: 1, itemsPerPage: 1 })
      console.log('🔍 Testando endpoint de tubarões:', url)
      
      const response = await api.get<any>(url)
      const responseTime = performance.now() - startTime
      
      return {
        isHealthy: true,
        endpoint: url,
        responseTime: Math.round(responseTime),
        statusCode: 200,
        data: response
      }
    } catch (error: any) {
      const responseTime = performance.now() - startTime
      
      return {
        isHealthy: false,
        endpoint: buildUrl(endpoint),
        responseTime: Math.round(responseTime),
        statusCode: error.response?.status,
        error: error.message || 'Erro ao acessar tubarões'
      }
    }
  }

  /**
   * Testa endpoint de latest position
   */
  static async testLatestPositionEndpoint(): Promise<ApiHealthStatus> {
    const startTime = performance.now()
    const endpoint = API_ENDPOINTS.RASTEAMENTO_TUBAROES.LATEST_POSITION
    
    try {
      const url = buildUrl(endpoint)
      console.log('🔍 Testando latest position:', url)
      
      const response = await api.get<any>(url)
      const responseTime = performance.now() - startTime
      
      return {
        isHealthy: true,
        endpoint: url,
        responseTime: Math.round(responseTime),
        statusCode: 200,
        data: response
      }
    } catch (error: any) {
      const responseTime = performance.now() - startTime
      
      return {
        isHealthy: false,
        endpoint: buildUrl(endpoint),
        responseTime: Math.round(responseTime),
        statusCode: error.response?.status,
        error: error.message || 'Erro ao acessar latest position'
      }
    }
  }

  /**
   * Executa todos os testes
   */
  static async runAllTests() {
    console.log('🚀 Iniciando testes de API...')
    
    const results = {
      baseUrl: API_CONFIG.BASE_URL,
      timestamp: new Date().toISOString(),
      tests: {
        connectivity: await this.testBasicConnectivity(),
        infoEndpoint: await this.testInfoEndpoint(),
        sharkTracking: await this.testSharkTrackingEndpoint(),
        latestPosition: await this.testLatestPositionEndpoint(),
      }
    }
    
    console.log('✅ Testes concluídos:', results)
    return results
  }

  /**
   * Teste simples de CORS
   */
  static async testCORS(): Promise<{success: boolean, error?: string}> {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.INFO.VERSION}`
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      return { success: response.ok }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message.includes('CORS') 
          ? 'Erro de CORS detectado' 
          : error.message 
      }
    }
  }
}

