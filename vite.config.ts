import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), "");
  console.log("env", env.VITE_API_URL);

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    define: {
      // Make env vars available to the client
      __ENV: {
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
        VITE_APP_URL: JSON.stringify(env.VITE_APP_URL),
        VITE_DEBUG_MODE: JSON.stringify(env.VITE_DEBUG_MODE),
        NODE_ENV: JSON.stringify(env.NODE_ENV),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      // Optional: Proxy API calls during development
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});