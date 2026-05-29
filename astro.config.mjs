// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // tailwind integration
  vite: {
    plugins: [tailwindcss()],
  },

  // deploy on vercel
  adapter: vercel(),
});