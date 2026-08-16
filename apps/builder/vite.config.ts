import { defineConfig } from 'npm:vite@^8.0.0';
import react from 'npm:@vitejs/plugin-react@^5.1.0';
import tailwindcss from 'npm:@tailwindcss/vite@^4.1.0';

export default defineConfig({
  // Served from a sub-path in production (e.g. https://site/builder/);
  // overridable via BUILDER_BASE for standalone deploys.
  base: Deno.env.get('BUILDER_BASE') ?? '/builder/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
