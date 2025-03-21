import 'vitest-axe/extend-expect';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

// mock i18n

mockNuxtImport('useI18n', () => () => ({
  t: (value: string) => value,
  locale: ref('nl'),
}));

// mock useAsyncData
const { mockAsyncData } = vi.hoisted(() => ({
  mockAsyncData: vi.fn(),
}));

mockNuxtImport('useAsyncData', () => mockAsyncData);

// create element for teleport
beforeEach(() => {
  const el = document.createElement('div');
  el.id = 'teleports';
  document.body.appendChild(el);
});

afterEach(() => {
  document.body.innerHTML = '';
  mockAsyncData.mockReset();
});

export { mockAsyncData };
