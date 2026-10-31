import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import oxlintPlugin from "vite-plugin-oxlint";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    oxlintPlugin({
      lintOnHotUpdate: true,
      failOnError: false,
    }),
  ],
  server: {
    port: 5173,
    watch: {
      ignored: ["**/inspiration/**", "**/logs/**"],
    },
  },
  optimizeDeps: {
    entries: ["./index.html"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
