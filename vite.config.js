import { resolve } from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isDevelopment = mode === 'development'
  return {
    base: isDevelopment ? '/' : 'https://shuoshubao.github.io/',
    build: {
      manifest: true,
      polyfillDynamicImport: false
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [createVuePlugin()]
  }
}
