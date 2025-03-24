import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import MultiSelect from '~/../app/components/MultiSelect.vue';

describe('MultiSelect', async () => {
  const wrapper = await mountSuspended(MultiSelect, {
    props: {
      label: 'Test',
      placeholder: 'Test',
    },
  });

  it('has no accessibility violations', async () => {
    const results = await axe(wrapper.html(), {
      rules: {
        region: { enabled: false },
        'aria-allowed-attr': { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
