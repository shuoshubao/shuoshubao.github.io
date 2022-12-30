import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default () => {
  return {
    build: {
      manifest: true,
      outDir: 'docs'
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
