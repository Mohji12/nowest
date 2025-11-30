import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      "@assets": fileURLToPath(new URL("./public/assets", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          utils: ['clsx', 'tailwind-merge', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    host: true,
  },
  css: {
    postcss: './postcss.config.js'
  }
});
