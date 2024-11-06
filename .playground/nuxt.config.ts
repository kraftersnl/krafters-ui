export default defineNuxtConfig({
  extends: ['..'],

  devServer: {
    port: 3003,
  },

  app: {
    head: {
      title: 'Krafters UI',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
});
