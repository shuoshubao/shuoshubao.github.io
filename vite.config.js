import { resolve } from 'path'
import react from '@vitejs/plugin-react'

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
            markdown: ['markdown-it', 'markdown-it-anchor', 'markdown-it-attrs', 'markdown-it-task-lists'],
            mermaid: ['mermaid'],
            katex: ['katex']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    configureWebpack: {
      externals: {}
    },
    plugins: [react()]
  }
}
