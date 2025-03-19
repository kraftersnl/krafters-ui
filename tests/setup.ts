import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import 'vitest-axe/extend-expect';

// mock i18n
mockNuxtImport('useI18n', () => {
  return () => ({
    t: (value: string) => value,
    locale: ref('nl'),
  });
});

// create element for teleport
beforeEach(() => {
  const el = document.createElement('div');
  el.id = 'teleports';
  document.body.appendChild(el);
});

afterEach(() => {
  document.body.innerHTML = '';
});
