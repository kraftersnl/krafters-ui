import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import Popover from '~/../app/components/Popover.vue';

describe('Popover', async () => {
  const wrapper = await mountSuspended(Popover, {
    props: {
      label: 'Test',
    },
    slots: {
      default: () => 'Test',
    },
  });

  it('has no accessibility violations', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');

    const results = await axe(wrapper.html(), {
      rules: {
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
