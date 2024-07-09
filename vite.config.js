import react from '@vitejs/plugin-react'
import { ensureFileSync } from 'fs-extra'
import { resolve } from 'path'
import Analyze from 'rollup-plugin-analyze'
import { viteExternalsPlugin } from 'vite-plugin-externals'

ensureFileSync('docs/stats.html')

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
        moment: 'moment',
        dayjs: 'dayjs',
        antd: 'antd',
        lodash: '_'
      }),
      Analyze({ filename: 'docs/stats.html' })
    ]
  }
}
