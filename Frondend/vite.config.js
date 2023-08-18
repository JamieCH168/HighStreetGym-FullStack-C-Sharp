import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vitejs.dev/config/
export default defineConfig({
  plugins:
    [
      react(),
      macrosPlugin(),],
  define: {
    'process.env': process.env
  },
  resolve: {
    'util': 'util/util.js',
    'buffer': 'buffer/index.js'
  }
})

