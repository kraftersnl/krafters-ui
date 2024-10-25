export default defineNuxtConfig({
  extends: ['..'],

  devServer: {
    port: 3001,
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
