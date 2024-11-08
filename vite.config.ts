import { defineConfig } from 'vite'

export default defineConfig({
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
