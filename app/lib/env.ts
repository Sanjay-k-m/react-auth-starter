
interface EnvConfig {
  API_URL: string;
  APP_URL: string;
  NODE_ENV: string;
  DEBUG_MODE: boolean;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
}

export const env: EnvConfig = {
  API_URL: import.meta.env["VITE_API_URL"],
  APP_URL: import.meta.env["VITE_APP_URL"],
  NODE_ENV: import.meta.env["NODE_ENV"],
  DEBUG_MODE:import.meta.env["VITE_DEBUG_MODE"],
  IS_PRODUCTION: import.meta.env["NODE_ENV"] === "production",
  IS_DEVELOPMENT: import.meta.env["NODE_ENV"] === "development",
};

// Debug helper
export function debugLog(message: string, data?: any) {
  if (import.meta.env.DEBUG_MODE) {
    console.log(`🔍 [DEBUG] ${message}`, data || "");
  }
}