import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      });
    },
    '@nuxt/eslint'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  app: {
    head: {
      title: 'Nitsnets - Prueba técnica',
      htmlAttrs: {
        lang: 'es'
      }
    }
  }
});
