import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

// https://vitejs.dev/config/
export default ({ command, mode }) => {
    const isDevelopment = mode === 'development';
    return {
        root: isDevelopment ? __dirname : resolve(__dirname, 'docs'),
        base: isDevelopment ? '/' : 'https://shuoshubao.github.io/dist/',
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        plugins: [createVuePlugin()]
    };
};
