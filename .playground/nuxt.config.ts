export default defineNuxtConfig({
  extends: ['github:kraftersnl/krafters-ui'],

  $development: {
    extends: ['..'],
  },

  devServer: {
    port: 3003,
  },

  i18n: {
    baseUrl: 'http://localhost:3003',
  },

  app: {
    head: {
      title: 'Krafters UI',
    },
  },
});
