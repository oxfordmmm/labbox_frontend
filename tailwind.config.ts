/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from "tailwindcss";

// can not use the @ alias here
import { shadcnPreset } from "./src/lib/shadcn-preset";

const config = {
  presets: [shadcnPreset],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
} satisfies Config;

export default config;
