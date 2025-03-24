import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import Tooltip from '~/../app/components/Tooltip.vue';

describe('Tooltip', async () => {
  const wrapper = await mountSuspended(Tooltip, {
    attachTo: document.body,
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
    expect(button.attributes('aria-controls')).toBe('test-id');

    await button?.trigger('click');
    const content = wrapper.find('#test-id');
    expect(content.text()).toBe('Test slot');
    expect(button.attributes('aria-expanded')).toBe('true');

    await button?.trigger('keyup', { key: 'Escape' });
    expect(button.attributes('aria-expanded')).toBe('false');
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
