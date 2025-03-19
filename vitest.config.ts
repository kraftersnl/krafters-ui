import { defineVitestConfig } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'url';

export default defineVitestConfig({
  test: {
    globals: true,
    setupFiles: './tests/setup.ts',
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./.playground', import.meta.url)),
      },
    },
  },
});
