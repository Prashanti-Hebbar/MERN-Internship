import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward API calls to backend server running on port 3000
      '/user': 'http://localhost:3000',
      '/product': 'http://localhost:3000'
    }
  }
})
