import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/e-memo-job-reservation/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      // 1. Proxy untuk semua request HTTP API
      '/api/e-memo-job-reservation': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // 2. Proxy SPESIFIK untuk path WebSocket
      '/api/e-memo-job-reservation/ws': {
        target: 'ws://localhost:8080',
        ws: true,
      },
    }
  }
})