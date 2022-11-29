import { resolve } from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isDevelopment = mode === 'development'
  return {
    build: {
      manifest: true,
      polyfillDynamicImport: false
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    configureWebpack: {
      externals: {
        vue: 'Vue',
        'element-ui': 'ElementUI',
        lodash: {
          commonjs: 'lodash',
          amd: 'lodash',
          root: '_'
        }
      }
    },
    plugins: [createVuePlugin()]
  }
}
