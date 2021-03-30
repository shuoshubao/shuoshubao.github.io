import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

console.log(111, __dirname, import.meta);

// https://vitejs.dev/config/
export default ({ command, mode }) => {
    console.log(222, command, mode);
    const isDevelopment = mode === 'development';
    return {
        root: isDevelopment ? __dirname : resolve(__dirname, 'docs'),
        base: isDevelopment ? '/' : 'https://foo.com/',
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        plugins: [createVuePlugin()]
    };
};
