import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

// https://vitejs.dev/config/
export default ({ command, mode }) => {
    const isDevelopment = mode === 'development';
    return {
        base: isDevelopment ? '/' : 'https://shuoshubao.github.io/',
        build: {
            manifest: true
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        plugins: [createVuePlugin()]
    };
};
