import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';
import path from 'path';
import proxy from './config/proxy';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    server: {
        port: 8082,
        cors: true,
        origin: 'http://localhost:8082',
        proxy,
    },
    plugins: [
        vue(),
        qiankun('sub-vue3', {
            useDevMode: true,
        }),
    ],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        extensions: ['.js', '.vue', '.json'],
    },
});
