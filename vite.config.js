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
            react: ['react', 'react-dom'],
            antd: ['antd'],
            highlight: [
              'highlight.js/lib/core',
              'highlight.js/lib/languages/javascript',
              'highlight.js/lib/languages/typescript',
              'highlight.js/lib/languages/xml',
              'highlight.js/lib/languages/css',
              'highlight.js/lib/languages/scss',
              'highlight.js/lib/languages/less',
              'highlight.js/lib/languages/json',
              'highlight.js/lib/languages/markdown',
              'highlight.js/lib/languages/plaintext',
              'highlight.js/lib/languages/shell',
              'highlight.js/lib/languages/bash',
              'highlight.js/lib/languages/php'
            ],
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
