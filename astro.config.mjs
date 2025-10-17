// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // optional, helps with absolute paths in production
  publicDir: './public',       // make sure all CSS, images, and JS are in `public/`
  integrations: [react()],
  adapter: vercel({ mode: 'server' }), // server mode for SSR
  vite: {
    build: {
      minify: false,
      target: 'es2017', // prevents optional-catch-binding issues
    },
    server: {
      fs: {
        strict: false, // allows Vite to serve files outside root if needed
      }
    }
  }
});
