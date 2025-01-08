import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/html-validator',
    '@vueuse/nuxt',
  ],

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
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
      },
    },
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'nl',
    langDir: '../locales',
    locales: [
      { code: 'en', language: 'en', file: 'en.json' },
      { code: 'nl', language: 'nl', file: 'nl.json' },
    ],
    vueI18n: './i18n.config.ts',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: typeof window !== 'undefined' ? navigator?.language : 'en',
        style: 'background-color: #000',
      },
    },
  },

  css: [join(currentDir, './assets/main.css')],

  pages: true,

  devtools: { enabled: true },

  compatibilityDate: '2024-10-10',

  future: {
    compatibilityVersion: 4,
  },
});
