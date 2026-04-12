import { defineConfig } from 'npm:vite@^7.1.12';
import react from 'npm:@vitejs/plugin-react@^4.5.2';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
