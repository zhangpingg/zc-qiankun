import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sub-vue',
  server: {
    port: 3002,
    cors: true,
    origin: 'http://localhost:3002',
  },
  plugins: [
    vue(),
    qiankun('sub-vue', {
      useDevMode: true,
    })
  ],
})
