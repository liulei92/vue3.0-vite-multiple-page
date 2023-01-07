import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@':fileURLToPath(new URL('./pages/client',import.meta.url)),
      '@1': fileURLToPath(new URL('./pages/admin', import.meta.url)),      
    }
  },
  server: {
  proxy: {
    "/api": {
      target: "http://localhost:5072/api", // 凡是遇到 /api 路径的请求，都映射到 target 属性
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""), // 重写 api 为 空，就是去掉它
    },
  },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
       input: {
        index: path.resolve(__dirname, 'index.html'),
        admin:path.resolve(__dirname,'admin.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1] 
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
})
