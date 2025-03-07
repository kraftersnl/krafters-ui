export default defineNuxtConfig({
  extends: ['..'],

  devServer: {
    port: 3003,
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },

  i18n: {
    baseUrl: 'https://kraftersnl.github.io/krafters-ui/',
    defaultLocale: 'en',
  },

  app: {
    baseURL: '/krafters-ui',
    head: {
      title: 'Krafters UI',
      link: [{ rel: 'icon', href: 'favicon.svg', type: 'image/svg+xml' }],
    },
  },
});
