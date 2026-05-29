// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // canonical/OG absolute URLs (update to the production domain)
  site: "https://glottia.app",

  // tailwind integration
  vite: {
    plugins: [tailwindcss()],
  },

  // deploy on vercel
  adapter: vercel(),
});