import { defineConfig } from 'npm:vite@^8.0.0';
import react from 'npm:@vitejs/plugin-react@^6.0.0';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname!, './src'),
    },
  },
});
