import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  $development: {
    modules: ['@nuxtjs/html-validator'],
  },

  pages: true,

  css: [join(currentDir, './app/assets/main.css')],

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],

  typescript: {
    includeWorkspace: true,
  },

  colorMode: {
    classSuffix: '-mode',
  },

  i18n: {
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    defaultLocale: 'nl',
    locales: [
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
      { code: 'nl', language: 'nl', file: 'nl.json', name: 'Nederlands' },
    ],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'nl',
        style: 'background-color: #000;',
      },
    },
  },

  htmlValidator: {
    usePrettier: true,
    options: {
      rules: {
        'no-redundant-role': 'off',
        'no-implicit-input-type': 'off',
        'heading-level': 'off',
        'unique-landmark': 'off',
        'prefer-native-element': 'off',
        'no-missing-references': 'off',
        'long-title': 'off',
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-01-08',
});
