import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure correct base for most static hosts
  build: {
    outDir: 'dist',
  },
  server: {
    // Remove historyApiFallback, not used by Vite server config
  },
})
