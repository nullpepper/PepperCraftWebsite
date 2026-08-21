/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    host: true,
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/__tests__/setup.ts'],
    environmentOptions: {
      jsdom: {
        // 默认用测试文件的 file:// 路径当页面 URL，
        // 组件里的 <img src="/assets/..."> 会被解析成无盘符的
        // file:///assets/...，Windows 上 jsdom 读取时直接抛错。
        // 指定成 dev server 同源 URL，图片走普通请求失败即可。
        url: 'http://localhost:5173/',
      },
    },
  },
})
