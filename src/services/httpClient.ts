import { ApiUrlManager, fetchWithTimeout } from '../config/api'

export interface HttpClientConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

export interface RequestConfig extends RequestInit {
  skipAuth?: boolean
  retryOnAuthError?: boolean
}

class HttpClient {
  private baseURL: string
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor(config: HttpClientConfig = {}) {
    this.baseURL = config.baseURL || ApiUrlManager.getUrl('')
    this.timeout = config.timeout || 10000
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.headers,
    }
  }


  /**
   * Processa a resposta da API
   */
  private async processResponse(response: Response): Promise<any> {
    if (!response.ok) {
      try {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      } catch {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
    }

    // For empty responses (204 No Content)
    if (response.status === 204) {
      return null
    }

    // Try to parse the response as JSON
    try {
      return await response.json()
    } catch {
      return await response.text()
    }
  }

  /**
   * Executes an HTTP request
   */
  private async request<T = any>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      skipAuth = false,
      retryOnAuthError = true,
      ...requestConfig
    } = config

    const headers = {
      ...this.defaultHeaders,
      ...requestConfig.headers,
    }

    try {
      const response = await fetchWithTimeout(
        url.startsWith('http') ? url : `${this.baseURL}${url}`,
        {
          ...requestConfig,
          headers,
        },
        this.timeout
      )

      return await this.processResponse(response)
    } catch (error) {
      if (error instanceof Error && error.message === 'TOKEN_REFRESHED' && retryOnAuthError) {
        // Token was refreshed, try the request again
        const retryHeaders = {
          ...this.defaultHeaders,
          ...requestConfig.headers,
        }

        const retryResponse = await fetchWithTimeout(
          url.startsWith('http') ? url : `${this.baseURL}${url}`,
          {
            ...requestConfig,
            headers: retryHeaders,
          },
          this.timeout
        )

        return await this.processResponse(retryResponse)
      }

      throw error
    }
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { method: 'GET', ...config })
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    })
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    })
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    })
  }

  /**
   * Upload file
   */
  async upload<T = any>(
    url: string,
    file: File,
    config?: RequestConfig
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const headers: Record<string, string> = {
      ...(config?.headers as Record<string, string> || {}),
    }

    // Remove Content-Type so the browser can define it automatically with boundary
    delete headers['Content-Type']

    return this.request<T>(url, {
      method: 'POST',
      body: formData,
      headers,
      ...config,
    })
  }

  /**
   * Download file
   */
  async download(url: string, filename?: string, config?: RequestConfig): Promise<void> {
    const response = await fetchWithTimeout(
      url.startsWith('http') ? url : `${this.baseURL}${url}`,
      {
        method: 'GET',
        headers: {
          ...config?.headers,
        },
        ...config,
      },
      this.timeout
    )

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
  }
}

// Singleton instance of the HTTP client
export const httpClient = new HttpClient()

// Export utility methods
export const api = {
  get: <T = any>(url: string, config?: RequestConfig) => httpClient.get<T>(url, config),
  post: <T = any>(url: string, data?: any, config?: RequestConfig) => httpClient.post<T>(url, data, config),
  put: <T = any>(url: string, data?: any, config?: RequestConfig) => httpClient.put<T>(url, data, config),
  patch: <T = any>(url: string, data?: any, config?: RequestConfig) => httpClient.patch<T>(url, data, config),
  upload: <T = any>(url: string, file: File, config?: RequestConfig) => 
    httpClient.upload<T>(url, file, config),
  download: (url: string, filename?: string, config?: RequestConfig) => 
    httpClient.download(url, filename, config),
} 