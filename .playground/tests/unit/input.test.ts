import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import Input from '~/../app/components/Input.vue';

describe('Input', async () => {
  const wrapper = await mountSuspended(Input, {
    // attachTo: document.body,
    props: {
      label: 'Test label',
    },
  });

  it('has no accessibility violations', async () => {
    const input = wrapper.find('input');

    await input.setValue('test value');

    const results = await axe(wrapper.html(), {
      rules: {
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
