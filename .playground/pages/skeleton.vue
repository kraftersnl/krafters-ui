<script setup lang="ts">
useHead({ title: 'Skeleton loading screen' });

const skeletonAnimation = ref<'shimmer' | 'pulse'>('shimmer');

const skeletonAnimations = [
  {
    value: 'shimmer',
    label: 'shimmer',
  },
  {
    value: 'pulse',
    label: 'pulse',
  },
];
</script>

<template>
  <div class="demo-page skeleton-page">
    <h1>Skeleton screens</h1>

    <blockquote>
      <p>
        "A skeleton screen is used as a placeholder while users wait for a page
        to load. This progress indicator is used for full page loads and reduces
        the perception of a long loading time by providing clues for how the
        page will ultimately look."
      </p>

      <p class="fs-xxs mbe-2">
        Source:
        <NuxtLink
          to="https://www.nngroup.com/articles/skeleton-screens"
          target="_blank"
          external
          >Nielsen Norman Group</NuxtLink
        >
      </p>
    </blockquote>

    <div class="card-cols">
      <Card>
        <div class="section-topbar">
          <h2>Skeleton</h2>

          <Popover icon="cog" :max-width="480">
            <div class="popover-settings-content">
              <h2>Props</h2>

              <div class="props-wrapper">
                <Select
                  v-model="skeletonAnimation"
                  :options="skeletonAnimations"
                  label="animation"
                  size="sm"
                />

                <code>{{`<Skeleton animation="${skeletonAnimation}" />`}}</code>
              </div>
            </div>
          </Popover>
        </div>

        <div class="skeleton-wrapper">
          <div class="flex-wrapper">
            <Skeleton :animation="skeletonAnimation" size="md" width="30%" />
            <span />
            <Skeleton :animation="skeletonAnimation" size="md" width="60px" />
            <Skeleton :animation="skeletonAnimation" size="md" width="70px" />
          </div>
          <Spacer size="sm" />

          <Skeleton :animation="skeletonAnimation" size="sm" width="90%" />
          <Skeleton :animation="skeletonAnimation" size="sm" />
          <Skeleton :animation="skeletonAnimation" size="sm" width="95%" />
          <Skeleton :animation="skeletonAnimation" size="sm" />
          <Skeleton :animation="skeletonAnimation" size="sm" width="60%" />

          <Spacer size="md" />
          <Skeleton :animation="skeletonAnimation" size="sm" width="20%" />

          <Spacer size="xxs" />
          <Skeleton :animation="skeletonAnimation" size="xs" width="90%" />
          <Skeleton :animation="skeletonAnimation" size="xs" width="95%" />
          <Skeleton :animation="skeletonAnimation" size="xs" width="50%" />
        </div>
      </Card>

      <Card>
        <h2>Circle variant</h2>

        <div class="circle-skeleton-wrapper">
          <div class="flex-wrapper">
            <Skeleton
              :animation="skeletonAnimation"
              size="xxl"
              variant="circle"
            />
            <Skeleton
              :animation="skeletonAnimation"
              size="xl"
              variant="circle"
            />
            <Skeleton
              :animation="skeletonAnimation"
              size="lg"
              variant="circle"
            />
            <Skeleton
              :animation="skeletonAnimation"
              size="md"
              variant="circle"
            />
            <Skeleton
              :animation="skeletonAnimation"
              size="sm"
              variant="circle"
            />
            <Skeleton
              :animation="skeletonAnimation"
              size="xs"
              variant="circle"
            />
            <Skeleton
              :animation="skeletonAnimation"
              size="xxs"
              variant="circle"
            />
          </div>

          <div class="flex-wrapper">
            <Skeleton
              :animation="skeletonAnimation"
              size="lg"
              variant="circle"
            />
            <div class="flex-wrapper">
              <Skeleton :animation="skeletonAnimation" size="sm" />
            </div>
          </div>

          <div class="flex-wrapper">
            <div class="flex-wrapper">
              <Skeleton
                :animation="skeletonAnimation"
                size="xl"
                variant="circle"
              />
              <div class="flex-wrapper">
                <Skeleton :animation="skeletonAnimation" size="md" />
                <Skeleton :animation="skeletonAnimation" size="md" />
              </div>
            </div>
          </div>

          <div class="flex-wrapper">
            <div class="flex-wrapper">
              <Skeleton
                :animation="skeletonAnimation"
                size="xxl"
                variant="circle"
              />
              <div class="flex-wrapper">
                <Skeleton :animation="skeletonAnimation" size="lg" />
                <Skeleton :animation="skeletonAnimation" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style>
.demo-page.skeleton-page {
  .card-cols > :first-child {
    flex-grow: 9;
  }

  h2 {
    margin-block-end: 2rem;
  }

  .popover-content {
    h2 {
      margin-block-end: 1rem;
    }
  }
}

.skeleton-wrapper {
  display: grid;
  gap: 0.25rem;
}

.circle-skeleton-wrapper {
  display: grid;
  gap: 2rem;

  .flex-wrapper {
    /* width: calc(100% - 5rem); */
  }
}
</style>
