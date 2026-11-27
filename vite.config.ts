import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // garde ici les autres clés déjà présentes (define, resolve, etc.)
});
