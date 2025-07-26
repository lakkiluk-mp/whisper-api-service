import { apiClient } from "./client";

export interface TranscribeResponse {
  text: string;
  language?: string;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
}

export const transcribeAudio = async (file: File): Promise<TranscribeResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<TranscribeResponse>("/transcribe/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get<HealthResponse>("/health");
  return response.data;
};
