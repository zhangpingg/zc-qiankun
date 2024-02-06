import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    server: {
        port: 8082,
        cors: true,
        origin: 'http://localhost:8082',
    },
    plugins: [
        vue(),
        qiankun('sub-vue3', {
            useDevMode: true,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
