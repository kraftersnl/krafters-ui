<script setup lang="ts">
const {
  size = 'md',
  width = '100%',
  animation = 'shimmer',
} = defineProps<{
  size?: string;
  width?: string;
  variant?: string;
  animation?: string;
}>();
</script>

<template>
  <div
    :class="`
      skeleton
      skeleton-size--${size}
      skeleton-animation--${animation}
      ${variant ? `skeleton-variant--${variant}` : undefined}
    `"
    :style="`--width: ${width}`"
  />
</template>

<style>
.skeleton {
  --color-1: var(--color-accent-bg);
  --color-2: var(--color-bg);

  width: var(--width, 100%);
  border-radius: var(--radius-sm);
  background-color: var(--color-accent-bg);
}

.skeleton-size--xxs {
  height: 0.5rem;
}
.skeleton-size--xs {
  height: 0.75rem;
}
.skeleton-size--sm {
  height: 1rem;
}
.skeleton-size--md {
  height: 1.25rem;
}
.skeleton-size--lg {
  height: 1.75rem;
}
.skeleton-size--xl {
  height: 2.5rem;
}
.skeleton-size--xxl {
  height: 4rem;
}

.skeleton-variant--circle {
  border-radius: var(--radius-full);
  height: 4rem;
  width: 4rem;
}

.skeleton-animation--pulse {
  animation: var(--animation-pulse);
}

.skeleton-animation--shimmer {
  animation-name: shimmer;
  animation-duration: var(--duration-xxl);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: linear-gradient(
    -45deg,
    var(--color-1) 30%,
    var(--color-2) 45%,
    var(--color-2) 55%,
    var(--color-1) 70%
  );
  background-size: 400% 400%;
}
</style>
