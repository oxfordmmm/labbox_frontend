/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from "tailwindcss";
import * as animatePlugin from "tailwindcss-animate";

import { shadcnPlugin } from "./shadcn-plugin";

export const shadcnPreset = {
  darkMode: "class",
  content: [],
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;
