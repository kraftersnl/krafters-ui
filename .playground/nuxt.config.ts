export default defineNuxtConfig({
  extends: ['..'],

  modules: ['@nuxt/test-utils/module'],

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
      icons: ['heroicons-solid:x'],
    },
  },

  i18n: {
    baseUrl: 'https://kraftersnl.github.io/krafters-ui/',
    defaultLocale: 'en',
  },

  $production: {
    app: {
      baseURL: '/krafters-ui',
    },
  },

  app: {
    head: {
      title: 'Krafters UI',
      link: [{ rel: 'icon', href: 'favicon.svg', type: 'image/svg+xml' }],
    },
  },

  devServer: {
    port: 3003,
  },

  compatibilityDate: '2025-03-19',
});
