export default defineNuxtConfig({
  extends: ['..'],

  devServer: {
    port: 3003,
  },

  i18n: {
    baseUrl: 'https://kraftersnl.github.io/krafters-ui/',
  },

  app: {
    baseURL: '/krafters-ui',
    head: {
      title: 'Krafters UI',
    },
  },
});
