import { defineConfig } from 'npm:vite@^8.0.0';
import react from 'npm:@vitejs/plugin-react@^5.1.0';
import tailwindcss from 'npm:@tailwindcss/vite@^4.1.0';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname!, './src'),
    },
  },
});
