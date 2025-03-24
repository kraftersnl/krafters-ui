import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import Accordion from '~/../app/components/Accordion.vue';

describe('Accordion', async () => {
  const wrapper = await mountSuspended(Accordion, {
    props: {
      id: 'test',
      arrow: true,
    },
    slots: {
      trigger: () => 'Test Trigger',
      content: () => 'Test Content',
    },
  });

  it('has correct ARIA atrributes', async () => {
    const button = wrapper.find('button');
    const content = wrapper.find('#accordion-panel-test');

    expect(button.attributes('aria-controls')).toBe('accordion-panel-test');
    expect(button.attributes('aria-expanded')).toBe('false');
    expect(content.attributes('aria-hidden')).toBe('true');
    expect(content.attributes('aria-labelledby')).toBe(
      'accordion-trigger-test',
    );

    await button.trigger('click');
    expect(button.attributes('aria-expanded')).toBe('true');
    expect(content.attributes('aria-hidden')).toBe('false');
  });

  it('has no accessibility violations', async () => {
    const results = await axe(wrapper.html(), {
      rules: {
        // region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
