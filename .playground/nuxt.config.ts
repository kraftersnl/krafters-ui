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

  devtools: { enabled: false },

  modules: ['@nuxt/test-utils/module'],

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
      icons: [
        'heroicons-solid:moon',
        'heroicons-solid:sun',
        'heroicons-solid:check-circle',
        'heroicons-solid:x-circle',
        'heroicons-solid:information-circle',
        'heroicons-solid:exclamation-circle',
        'heroicons-solid:question-mark-circle',
        'heroicons-solid:lightning-bolt',
        'heroicons-solid:exclamation',
        'heroicons-solid:calendar-days',
        'heroicons-solid:dots-horizontal',
        'heroicons-solid:check',
        'heroicons-solid:x',
        'heroicons-solid:arrow-left',
        'heroicons-solid:arrow-right',
        'heroicons-solid:search',
        'heroicons-solid:chevron-double-right',
        'heroicons-solid:chevron-double-left',
        'heroicons-solid:chevron-right',
        'heroicons-solid:chevron-left',
        'heroicons-solid:chevron-down',
        'solar:cloud-upload-linear',
        'solar:cloud-download-linear',
        'solar:square-bottom-up-linear',
        'solar:refresh-bold',
        'solar:copy-line-duotone',
        'solar:clipboard-check-line-duotone',
        'solar:settings-bold',
        'solar:add-square-linear',
        'heroicons-solid:adjustments-vertical',
        'mdi:github',
      ],
    },
  },

  devServer: {
    port: 3003,
  },

  compatibilityDate: '2025-03-19',
});
