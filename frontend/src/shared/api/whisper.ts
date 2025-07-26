import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '300000')

export const whisperApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
})

export interface TranscribeResponse {
  text: string
  language?: string
}

export interface HealthResponse {
  status: string
  model_loaded: boolean
}

export const transcribeAudio = async (file: File): Promise<TranscribeResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await whisperApi.post<TranscribeResponse>('/transcribe/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await whisperApi.get<HealthResponse>('/health')
  return response.data
}