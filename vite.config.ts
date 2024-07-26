/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as certPath from "path";

import react from "@vitejs/plugin-react-swc";
import * as dotenv from "dotenv";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": certPath.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Splits out node_modules into separate chunks
            const modules = id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0];
            // putting react and react-dom in the same chunk called 'react'
            if (modules === "react" || modules === "react-dom") {
              return "react";
            }
            // Other node_modules are split based on the package name
            return modules;
          }
          // Return undefined for all other modules, letting Rollup handle them automatically
          return undefined;
        },
      },
    },
  },
});
