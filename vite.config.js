// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      name: 'typetestr',
      // the proper extensions will be added
      fileName: 'typetestr',
      formats: ['es'],
      entry: resolve(__dirname, 'src/typetestr.ts'),
    },
    
  },
})