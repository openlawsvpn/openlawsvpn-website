import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://openlawsvpn.com',
  output: 'static',
  build: {
    format: 'directory'
  }
});
