import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_APP_API_URL || 'https://api.alloo.cc',
      APPID_FB: process.env.VITE_APPID_FB
    }
  },
  srcDir: 'src',
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['@/assets/scss/base'],
          additionalData: `
            @use "sass:math";
            @import "@/assets/scss/base/_fonts.scss";
            @import "@/assets/scss/base/_variables.scss";
          `
        }
      }
    },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui']
          : []
    }
  },
  alias: {
    '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
    '@style': fileURLToPath(new URL('./src/assets/scss', import.meta.url)),
    '@': fileURLToPath(new URL('./src', import.meta.url))
  },
  css: ['@/assets/css/tailwind.css', '@/assets/scss/main.scss'],
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    '@nuxt/image-edge',
    '@formkit/nuxt'
  ],
  formkit: {
    configFile: './formkit.config.js'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1.0',
      title: '통합로그인'
      // script: [
      //   { src: `https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v15.0&appId=${process.env.VITE_APPID_FB}&autoLogAppEvents=1`, async: true, defer: true, crossorigin: 'anonymous', nonce: 'wBJjpBHM', body: true }
      // ]
    }
  }
})
