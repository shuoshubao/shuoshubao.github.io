import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import Analyze from 'rollup-plugin-analyze'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isDevelopment = mode === 'development'
  return {
    build: {
      outDir: 'docs',
      target: 'chrome100',
      manifest: true,
      minify: isDevelopment ? false : 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [react(), Analyze({ filename: 'docs/stats.html' })]
  }
}
