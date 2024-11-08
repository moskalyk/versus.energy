import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Prevent hashing for PNG images
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.png')) {
            return 'images/[name][extname]'; // Keep the original name and extension
          }
          return 'assets/[name]-[hash][extname]'; // Default naming for other assets
        }
      }
    }
  }
});
