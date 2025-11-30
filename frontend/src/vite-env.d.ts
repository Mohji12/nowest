/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_PWA?: string
  readonly VITE_ENABLE_DARK_MODE?: string
  readonly VITE_ENABLE_ADMIN_PANEL?: string
  readonly DEV: boolean
  readonly MODE: string
  readonly PROD: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


