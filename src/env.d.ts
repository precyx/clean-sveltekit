interface ImportMetaEnv {
    readonly VITE_STRAPI_API_URL: string;
    // Add other environment variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}