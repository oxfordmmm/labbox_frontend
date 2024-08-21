import { defineConfig } from "vitest/config";
import { configDefaults } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [".vitest/setupTests.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: [...configDefaults.exclude],
    testTimeout: 10000, // Set global timeout to 10 seconds
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      root: "/",
    },
  },
});
