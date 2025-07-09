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

  devtools: { enabled: false },

  modules: ['@nuxt/test-utils/module'],

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
      icons: [
        'material-symbols:more-horiz',
        'material-symbols:light-mode-outline-rounded',
        'material-symbols:dark-mode-outline-rounded',
        'material-symbols:computer-outline-rounded',
        'material-symbols:open-in-new-rounded',
        'material-symbols:link-rounded',
        'material-symbols:check-rounded',
        'material-symbols:close-rounded',
        'material-symbols:search-rounded',
        'material-symbols:do-not-disturb-on-outline-rounded',
        'material-symbols:do-not-disturb-on-rounded',
        'material-symbols:info-outline-rounded',
        'material-symbols:info-rounded',
        'material-symbols:check-circle-outline-rounded',
        'material-symbols:check-circle-rounded',
        'material-symbols:cancel-outline-rounded',
        'material-symbols:cancel-rounded',
        'material-symbols:warning-outline-rounded',
        'material-symbols:warning-rounded',
        'material-symbols:help-rounded',
        'material-symbols:visibility-off',
        'material-symbols:visibility',
        'material-symbols:calendar-month-outline-rounded',
        'material-symbols:content-paste-rounded',
        'material-symbols:content-paste-go-rounded',
        'material-symbols:file-copy-outline-rounded',
        'material-symbols:content-copy-outline-rounded',
        'material-symbols:copy-all-outline-rounded',
        'material-symbols:library-add-check-outline-rounded',
        'material-symbols:settings-rounded',
        'material-symbols:note-stack-outline-rounded',
        'material-symbols:note-stack-add-outline-rounded',
        'material-symbols:upload-rounded',
        'material-symbols:download-rounded',
        'material-symbols:keyboard-arrow-down-rounded',
        'material-symbols:chevron-right-rounded',
        'material-symbols:chevron-left',
        'material-symbols:keyboard-double-arrow-right-rounded',
        'material-symbols:keyboard-double-arrow-left-rounded',
        'material-symbols:arrow-right-alt-rounded',
        'material-symbols:arrow-left-alt-rounded',
        'material-symbols:arrow-right-alt',
        'material-symbols:arrow-left-alt',
        'material-symbols:keyboard-command-key',
        'material-symbols:keyboard-option-key',
      ],
    },
  },

  devServer: {
    port: 3003,
  },

  compatibilityDate: '2025-03-19',
});
