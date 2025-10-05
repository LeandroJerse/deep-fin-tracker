// Configurações de ambiente
const ENV = import.meta.env.MODE || 'development'

// Configurações por ambiente
const ENV_CONFIG = {
  development: {
    BASE_URL: 'http://localhost:5013',
    TIMEOUT: 10000,
  },
  staging: {
    BASE_URL: 'https://fb457da07468.ngrok-free.app/',
    TIMEOUT: 15000,
  },
  production: {
    BASE_URL: 'https://api.lavatudo.com',
    TIMEOUT: 20000,
  },
} as const

// Endpoints da API
export const API_ENDPOINTS = {
  INFO: {
    BASE: '/api/Info',
    VERSION: '/api/Info/v1',
  },
  RASTEAMENTO_TUBAROES: {
    BASE: '/api/RastreamentoTubaroes',
    LIST: '/api/RastreamentoTubaroes/v1',
    LATEST_POSITION: '/api/RastreamentoTubaroes/v1/latest-positions',
    BY_ID: (id: number) => `/api/RastreamentoTubaroes/v1/${id}`,
  },
  HISTORICO_AGREGADO: {
    BASE: '/api/HistoricoAgregado',
    LIST: '/api/HistoricoAgregado/v1',
    BY_ID: (id: number, dateData: string, hour: string) => `/api/HistoricoAgregado/v1/${id}/${dateData}/${hour}`,
  }
} as const

// Configuração principal da API
export const API_CONFIG = {
  ...ENV_CONFIG[ENV as keyof typeof ENV_CONFIG],
  ENDPOINTS: API_ENDPOINTS,
} as const

// Classe para gerenciar URLs da API
export class ApiUrlManager {
  private static baseUrl = API_CONFIG.BASE_URL

  static getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`
  }

  static getRastreamentoTubaroesUrl(endpoint: string = ''): string {
    return this.getUrl(`${API_ENDPOINTS.RASTEAMENTO_TUBAROES.BASE}${endpoint}`)
  }

  static getHistoricoAgregadoUrl(endpoint: string = ''): string {
    return this.getUrl(`${API_ENDPOINTS.HISTORICO_AGREGADO.BASE}${endpoint}`)
  }
}

// Função utilitária para construir URLs com parâmetros
export const buildUrl = (baseUrl: string, params?: Record<string, any>): string => {
  if (!params) return baseUrl

  const url = new URL(baseUrl, API_CONFIG.BASE_URL)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value.toString())
    }
  })

  return url.toString()
}

// Headers padrão para requisições
export const getDefaultHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
})

// Configuração de timeout para fetch
export const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}, 
  timeout: number = API_CONFIG.TIMEOUT
): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Timeout: A requisição demorou mais de ${timeout}ms`)
    }
    throw error
  }
}

// Função para verificar se a API está online
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetchWithTimeout(
      ApiUrlManager.getUrl('/api/health'),
      { method: 'GET' },
      5000
    )
    return response.ok
  } catch {
    return false
  }
}

// Exportações para compatibilidade
export const getApiUrl = (endpoint: string) => ApiUrlManager.getUrl(endpoint) 