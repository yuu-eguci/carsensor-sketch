import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/carsensor-sketch/',
  build: {
    outDir: 'docs',
  },
  server: {
    port: 8080,
    strictPort: true,
  },
})
