import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Bu satırın ekli olduğundan emin olun

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Bu objenin ekli olduğundan emin olun
    },
  },
})