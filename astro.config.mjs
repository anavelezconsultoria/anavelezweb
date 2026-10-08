import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://anavelezconsultora.com',
  trailingSlash: 'never',
  build: { format: 'file' },
});
