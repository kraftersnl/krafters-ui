import { defaultIcons } from './utils/defaultIcons';

export default defineNuxtConfig({
  extends: ['..'],

  $production: {
    app: {
      baseURL: '/krafters-ui/',
    },
  },

  i18n: {
    baseUrl: 'https://kraftersnl.github.io/krafters-ui/',
    defaultLocale: 'en',
  },

  app: {
    head: {
      title: 'Krafters UI',
      link: [{ rel: 'icon', href: 'favicon.svg', type: 'image/svg+xml' }],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  css: ['~/assets/playground.css'],

  modules: ['@nuxt/scripts'],

  devtools: { enabled: false },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
      icons: defaultIcons,
    },
  },

  devServer: {
    port: 3003,
  },

  compatibilityDate: '2025-03-19',
});
