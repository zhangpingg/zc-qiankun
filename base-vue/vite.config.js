import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import proxy from './config/proxy';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8080,
        cors: true,
        origin: 'http://localhost:8080',
        open: true,
        proxy,
    },
    plugins: [
        vue(),
    ],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        extensions: ['.js', '.vue', '.json'],
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: '@import "@/styles/variable.less";',
                javascriptEnabled: true, // 如果你需要在 Less 中使用 JS 函数
            },
        },
    },
});
