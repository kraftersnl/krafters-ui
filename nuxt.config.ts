import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/html-validator',
    '@vueuse/nuxt',
  ],

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

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'nl',
    langDir: '../app/locales',
    locales: [
      { code: 'en', language: 'en', file: 'en.json' },
      { code: 'nl', language: 'nl', file: 'nl.json' },
    ],
  },

  image: {
    domains: ['i.ytimg.com', 'i.vimeocdn.com'],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'nl',
        style: 'background-color: #000',
      },
    },
  },

  css: [join(currentDir, './app/assets/main.css')],

  pages: true,

  devtools: { enabled: true },

  compatibilityDate: '2025-1-8',

  future: {
    compatibilityVersion: 4,
  },
});
