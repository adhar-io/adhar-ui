import { defineConfig } from 'npm:vite@^7.1.12';
import react from 'npm:@vitejs/plugin-react@^4.5.2';

export default defineConfig({
  // Served from a sub-path in production (e.g. https://site/builder/);
  // overridable via BUILDER_BASE for standalone deploys.
  base: Deno.env.get('BUILDER_BASE') ?? '/builder/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
