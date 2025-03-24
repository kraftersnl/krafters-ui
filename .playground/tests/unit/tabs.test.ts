import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import Tabs from '~/../app/components/Tabs.vue';

describe('Tabs', async () => {
  const wrapper = await mountSuspended(Tabs, {
    attachTo: document.body,
    props: {
      modelValue: 'a',
      ariaLabel: 'Test',
      tabs: [
        { value: 'a', label: 'Tab A' },
        { value: 'b', label: 'Tab B' },
      ],
    },
  });

  it('has correct ARIA atrributes', async () => {
    const tabsList = wrapper.find('.tablist');
    const tabs = wrapper.findAll('.tab');
    const tabpanels = wrapper.findAll('.tabpanel');

    expect(tabsList.attributes('role')).toBe('tablist');
    expect(tabsList.attributes('aria-label')).toBe('Test');

    expect(tabs[0]?.attributes('role')).toBe('tab');
    expect(tabs[1]?.attributes('role')).toBe('tab');
    expect(tabs[0]?.attributes('tabindex')).toBe('0');
    expect(tabs[1]?.attributes('tabindex')).toBe('-1');
    expect(tabs[0]?.attributes('aria-controls')).toBe('tabpanel-a');
    expect(tabs[1]?.attributes('aria-controls')).toBe('tabpanel-b');
    expect(tabs[0]?.attributes('aria-selected')).toBe('true');
    expect(tabs[1]?.attributes('aria-selected')).toBe('false');

    expect(tabpanels[0]?.attributes('role')).toBe('tabpanel');
    expect(tabpanels[1]?.attributes('role')).toBe('tabpanel');
    expect(tabpanels[0]?.attributes('aria-labelledby')).toBe('tab-a');
    expect(tabpanels[1]?.attributes('aria-labelledby')).toBe('tab-b');

    await tabs[1]?.trigger('click');
    expect(tabs[1]?.attributes('aria-selected')).toBe('true');
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
