import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import Analyze from 'rollup-plugin-analyze'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isDevelopment = mode === 'development'
  return {
    build: {
      outDir: 'docs',
      target: 'chrome100',
      manifest: true,
      minify: isDevelopment ? false : 'esbuild'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      react(),
      viteExternalsPlugin({
        react: 'React',
        'react-dom': 'ReactDOM',
        dayjs: 'dayjs',
        antd: 'antd',
        lodash: '_'
      }),
      monacoEditorPlugin({
        languageWorkers: ['editorWorkerService', 'css', 'html', 'typescript']
      }),
      Analyze({ filename: 'docs/stats.html' })
    ]
  }
}
