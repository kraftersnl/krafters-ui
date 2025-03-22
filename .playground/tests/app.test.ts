import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import App from '../app.vue';

describe('Docs', () => {
  it('Changelog page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Colors page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/colors' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Text components page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/text' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Buttons page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/buttons' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Accordion page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/accordion' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Form page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/form' });
    const results = await axe(wrapper.element, {
      rules: {
        'aria-allowed-attr': { enabled: false }, // MultiSelect
      },
    });
    expect(results).toHaveNoViolations();
  });

  // it('Markdown page has no accessibility violations', async () => {
  //   const wrapper = await mountSuspended(App, { route: '/markdown' });
  //   const results = await axe(wrapper.element, {
  //     rules: {
  //       'aria-input-field-name': { enabled: false },
  //     },
  //   });
  //   expect(results).toHaveNoViolations();
  // });

  it('Meter page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/meter' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Tabs page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/tabs' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Table page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/table' });
    const results = await axe(wrapper.element, {
      rules: {
        'aria-allowed-attr': { enabled: false }, // MultiSelect
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('Toggletip/Popover page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/toggletip' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Dialog page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/dialog' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('Skeleton page has no accessibility violations', async () => {
    const wrapper = await mountSuspended(App, { route: '/skeleton' });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
