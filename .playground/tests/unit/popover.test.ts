import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import Popover from '~/../app/components/Popover.vue';

describe('Popover', async () => {
  const wrapper = await mountSuspended(Popover, {
    props: {
      label: 'Test',
      id: 'test-id',
    },
    slots: {
      default: () => 'Test slot',
    },
  });

  it('has correct ARIA atrributes', async () => {
    const button = wrapper.find('[type="button"]');

    expect(button.attributes('aria-expanded')).toBe('false');
    expect(button.attributes('aria-controls')).toBe('popover-content-test-id');

    await button?.trigger('click');
    const content = wrapper.find('#popover-content-test-id');
    expect(content.text()).toBe('Test slot');
    expect(button.attributes('aria-expanded')).toBe('true');

    // await button?.trigger('keyup', { key: 'Escape' });
    // expect(button.attributes('aria-expanded')).toBe('false');
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
