import { defaultIcons } from './utils/defaultIcons';

export default defineNuxtConfig({
  extends: ['..'],

  $production: {
    app: {
      baseURL: '/krafters-ui/',
    },

    image: {
      domains: ['i.ytimg.com'],
    },
  },

  fonts: {
    defaults: {
      weights: [400, 600],
      styles: ['normal', 'italic'],
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

  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/scripts'],

  css: ['~/assets/playground.css'],

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
      icons: defaultIcons,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        'markdown-it',
        'highlight.js/lib/core',
        'highlight.js/lib/languages/css',
        'highlight.js/lib/languages/javascript',
        'highlight.js/lib/languages/typescript',
        'highlight.js/lib/common',
        '@mdit/plugin-attrs',
        '@mdit/plugin-mark',
        'vue-axe',
        'vue-tippy',
        'date-fns/locale',
        '@vuepic/vue-datepicker',
        '@vueform/multiselect',
        'compressorjs',
      ],
    },
  },

  devServer: {
    port: 3003,
  },

  compatibilityDate: '2025-03-19',
});
