import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('A requisição demorou muito e foi cancelada.')
    } 
    
    if (error.response) {
      console.error(`Erro na API: ${error.response.status} - ${error.response.statusText}`)
    } else {
      console.error('Erro de rede ou servidor indisponível.')
    }

    return Promise.reject(error)
  }
)

export default api