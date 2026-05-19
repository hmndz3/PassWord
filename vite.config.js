import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// La configuración de Vitest vive en `vitest.config.js`
// para mantener separadas la configuración de build y testing.
export default defineConfig({
  plugins: [react()],
});
