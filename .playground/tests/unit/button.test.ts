import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import Button from '~/../app/components/Button.vue';

describe('Button', () => {
  it('is rendered as a link', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        label: 'Krafters website',
        to: 'https://krafters.nl',
        variant: 'link',
        target: '_blank',
        external: true,
      },
    });

    const link = wrapper.find('a');
    await link.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();

    const results = await axe(wrapper.html(), {
      rules: {
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });

  it('is rendered as a button', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        label: 'Click me',
      },
    });

    const button = wrapper.find('[type="button"]');
    await button.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();

    const results = await axe(wrapper.html(), {
      rules: {
        // region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
