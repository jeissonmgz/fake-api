/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
    readonly API_URL_CLIENT: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }