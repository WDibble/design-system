/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import oxlintPlugin from "vite-plugin-oxlint";
import path from "node:path";

// Unified Vite configuration supporting App, Library, and Vitest modes
export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  if (isLib) {
    return {
      plugins: [react()],
      build: {
        outDir: "dist-lib",
        emptyOutDir: true,
        lib: {
          entry: path.resolve(import.meta.dirname, "src/index.ts"),
          name: "DesignSystem",
          formats: ["es"],
          fileName: () => "index.js",
        },
        rollupOptions: {
          external: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "@base-ui/react",
            "motion",
            "motion/react",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
            "lucide-react",
            "zod",
            "culori",
            "apca-w3",
          ],
          output: {
            preserveModules: false,
          },
        },
      },
      resolve: {
        alias: {
          "@": path.resolve(import.meta.dirname, "./src"),
        },
      },
    };
  }

  return {
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
        ignored: ["**/logs/**"],
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
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./tests/setup.ts"],
      include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.{ts,tsx}"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        include: ["src/components/ui/**"],
        exclude: ["src/components/ui/index.ts"],
      },
      css: false,
    },
  };
});
