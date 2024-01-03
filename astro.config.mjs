import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
export default defineConfig({
  renderers: ['@astrojs/renderer-react'],
  integrations: [react(), tailwind(), astroImageTools],
  output: "server",
  adapter: netlify()
});