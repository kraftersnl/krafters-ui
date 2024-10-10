import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2024-10-10',

  devtools: { enabled: true },

  css: [join(currentDir, './assets/main.css')],

  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxtjs/color-mode'],
});
