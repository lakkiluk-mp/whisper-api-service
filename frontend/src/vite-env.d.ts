/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_PORT: string;
  readonly VITE_DEV_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
