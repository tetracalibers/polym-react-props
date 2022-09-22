import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@polym/react-props',
      fileName: (format) => `polym-react-props.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})
