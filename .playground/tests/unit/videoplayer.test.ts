import { mountSuspended } from '@nuxt/test-utils/runtime';
import { axe } from 'vitest-axe';
import { mockAsyncData } from '~/tests/setup';
import { youtube } from '~/tests/mockData';
import VideoPlayer from '~/../app/components/VideoPlayer.vue';

describe('VideoPlayer', async () => {
  mockAsyncData.mockReturnValue({
    data: ref(youtube),
  });

  const wrapper = await mountSuspended(VideoPlayer, {
    props: {
      url: 'https://youtube.com/watch?v=2oiBKSjOOFE',
    },
  });

  it('YouTube video has no accessibility violations', async () => {
    const results = await axe(wrapper.element, {
      rules: {
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
