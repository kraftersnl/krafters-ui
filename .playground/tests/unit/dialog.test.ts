import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import Dialog from '~/../app/components/Dialog.vue';

describe.skip('Dialog', async () => {
  const wrapper = await mountSuspended(Dialog, {
    attachTo: document.body,
    props: {
      label: 'Test',
      id: 'test-id',
    },
    slots: {
      default: () => 'Test slot',
    },
  });

  wrapper?.vm.openDialog();

  it('has correct ARIA atrributes', async () => {
    const dialog = wrapper.find('dialog');

    expect(dialog.attributes('aria-labelledby')).toBe('test-id');
  });

  it('has no accessibility violations', async () => {
    const results = await axe(wrapper.html(), {
      rules: {
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
