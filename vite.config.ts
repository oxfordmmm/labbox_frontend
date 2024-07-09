/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as fs from "fs";
import * as certPath from "path";

import react from "@vitejs/plugin-react-swc";
import * as dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "labbox.ouh.mmmoxford.uk",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://labbox.ouh.mmmoxford.uk:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    https: {
      key: fs.readFileSync(certPath.resolve(__dirname, "key.pem")),
      cert: fs.readFileSync(certPath.resolve(__dirname, "cert.pem")),
    },
    // configureServer: ({ middlewares }) => {
    //   middlewares.use((req, res, next) => {
    //     console.log("Proxied URL:", req.url);
    //     next();
    //   });
    // },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
  resolve: {
    alias: {
      "@": certPath.resolve(__dirname, "./src"),
      // components: certPath.resolve(__dirname, "./src/components"),
    },
  },
});
