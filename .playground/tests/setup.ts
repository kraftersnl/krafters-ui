import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import 'vitest-axe/extend-expect';

// mock i18n
mockNuxtImport('useI18n', () => {
  return () => ({
    t: (value: string) => value,
    locale: ref('nl'),
  });
});
