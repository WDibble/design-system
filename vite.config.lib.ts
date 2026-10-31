import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
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
});
