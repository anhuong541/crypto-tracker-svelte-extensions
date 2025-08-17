type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestConfig {
  baseURL?: string
  headers?: Record<string, string>
}

interface RequestOptions extends Omit<RequestInit, 'headers' | 'method' | 'body'> {
  params?: Record<string, string>
  headers?: Record<string, string>
  body?: Record<string, string>
}

class ApiClient {
  private baseURL: string
  private headers: Record<string, string>

  constructor(config: RequestConfig = {}) {
    this.baseURL = config.baseURL || ''
    this.headers = config.headers || { 'Content-Type': 'application/json' }
  }

  private buildURL(url: string, params?: Record<string, string>): string {
    const fullUrl = `${this.baseURL}${url}`
    if (!params) return fullUrl
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return query ? `${fullUrl}?${query}` : fullUrl
  }

  private async request<T>(
    method: HttpMethod,
    url: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { params, headers, body, ...restOptions } = options

    const finalUrl = this.buildURL(url, params)
    const finalHeaders = { ...this.headers, ...headers }

    const response = await fetch(finalUrl, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      ...restOptions,
    })

    const contentType = response.headers.get('Content-Type')

    if (!response.ok) {
      const errorData = contentType?.includes('application/json')
        ? await response.json()
        : await response.text()
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`,
      )
    }

    return contentType?.includes('application/json')
      ? await response.json()
      : await (response.text() as unknown as T)
  }

  get<T>(url: string, options?: RequestOptions) {
    return this.request<T>('GET', url, options)
  }

  post<T>(url: string, body?: Record<string, string>, options?: RequestOptions) {
    return this.request<T>('POST', url, { ...options, body })
  }

  put<T>(url: string, body?: Record<string, string>, options?: RequestOptions) {
    return this.request<T>('PUT', url, { ...options, body })
  }

  delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>('DELETE', url, options)
  }
}

export default ApiClient
