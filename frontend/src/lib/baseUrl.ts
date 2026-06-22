// Base URL Configuration
// Default: production EC2 backend. Override in .env.local with VITE_API_URL for local backend.
const envApiUrl = import.meta.env.VITE_API_URL as string | undefined;

export const BASE_URL =
  envApiUrl?.replace(/\/$/, "") || "https://nowest.krintixsample.site";

if (import.meta.env.DEV) {
  console.log("Base URL loaded:", BASE_URL);
}

export default BASE_URL;
