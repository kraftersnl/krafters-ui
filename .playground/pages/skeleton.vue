<script setup lang="ts">
useHead({ title: 'Skeleton loading | Krafters UI' });

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

    <Card>
      <div class="section-topbar">
        <h2>Skeleton</h2>

        <Popover icon="cog" hide-label :max-width="480">
          <div class="popover-settings-content">
            <h2>Skeleton Props</h2>

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

        <Spacer size="lg" />
        <h2>Circle variant</h2>
        <div class="flex-wrapper">
          <Skeleton
            :animation="skeletonAnimation"
            size="xxl"
            variant="circle"
          />
          <Skeleton :animation="skeletonAnimation" size="xl" variant="circle" />
          <Skeleton :animation="skeletonAnimation" size="lg" variant="circle" />
          <Skeleton :animation="skeletonAnimation" size="md" variant="circle" />
          <Skeleton :animation="skeletonAnimation" size="sm" variant="circle" />
          <Skeleton :animation="skeletonAnimation" size="xs" variant="circle" />
          <Skeleton
            :animation="skeletonAnimation"
            size="xxs"
            variant="circle"
          />
        </div>

        <!-- Combinations -->

        <Spacer size="md" />
        <div class="flex-wrapper">
          <Skeleton :animation="skeletonAnimation" size="lg" variant="circle" />
          <div class="flex-wrapper">
            <Skeleton :animation="skeletonAnimation" size="sm" width="50%" />
          </div>
        </div>

        <Spacer size="md" />
        <div class="flex-wrapper">
          <Skeleton :animation="skeletonAnimation" size="xl" variant="circle" />
          <div class="flex-wrapper">
            <Skeleton :animation="skeletonAnimation" size="md" width="50%" />
            <Skeleton :animation="skeletonAnimation" size="md" width="50%" />
          </div>
        </div>

        <Spacer size="md" />
        <div class="flex-wrapper">
          <Skeleton
            :animation="skeletonAnimation"
            size="xxl"
            variant="circle"
          />
          <div class="flex-wrapper">
            <Skeleton :animation="skeletonAnimation" size="lg" width="50%" />
            <Skeleton :animation="skeletonAnimation" size="lg" width="50%" />
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style>
.skeleton-wrapper {
  display: grid;
  gap: 0.25rem;
}
</style>
