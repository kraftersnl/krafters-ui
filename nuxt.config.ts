import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  devtools: { enabled: true },

  pages: true,

  css: [join(currentDir, './app/assets/main.css')],

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/html-validator',
    '@vueuse/nuxt',
  ],

  i18n: {
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    defaultLocale: 'nl',
    locales: [
      { code: 'en', language: 'en', file: 'en.json' },
      { code: 'nl', language: 'nl', file: 'nl.json' },
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'nl',
        style: 'background-color: #000',
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

  compatibilityDate: '2025-01-08',

  future: {
    compatibilityVersion: 4,
  },
});
