import { defineConfig } from 'npm:vite@^7.1.12';
import react from 'npm:@vitejs/plugin-react@^5.1.0';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname!, './src'),
    },
  },
});
