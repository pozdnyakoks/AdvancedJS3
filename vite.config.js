import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pages: resolve(__dirname, 'src/pages/modules.html'),
      },
    },
  },
})