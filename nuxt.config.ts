import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2024-10-10',

  devtools: { enabled: true },

  css: [join(currentDir, './assets/main.css')],

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
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
      },
    },
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: typeof window !== 'undefined' ? navigator?.language : 'en',
    langDir: './locales',
    locales: [
      { code: 'nl', file: 'nl.json' },
      { code: 'en', file: 'en.json' },
    ],
    vueI18n: 'i18n.config.ts',
  },
});
