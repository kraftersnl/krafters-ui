import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import CheckboxGroup from '~/../app/components/CheckboxGroup.vue';

describe('CheckboxGroup', async () => {
  const wrapper = await mountSuspended(CheckboxGroup, {
    props: {
      label: 'Test',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  });

  it('selects checkbox', async () => {
    const checkbox = wrapper.find('input[value="no"]');

    expect(checkbox.element.checked).toBeFalsy();
    await checkbox.trigger('click');
    expect(checkbox.element.checked).toBeTruthy();
  });

  it('has correct elements', async () => {
    const fieldset = wrapper.find('fieldset');
    expect(fieldset.exists()).toBe(true);

    const legend = wrapper.find('legend');
    expect(legend.exists()).toBe(true);
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
