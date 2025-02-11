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
      skeleton-animation--${animation}
      ${variant ? `skeleton-variant--${variant}` : undefined}
    `"
    :style="`
      --size: var(--size-${size});
      --width: ${width}
    `"
  />
</template>

<style>
.skeleton {
  width: var(--width, 100%);
  height: var(--size);
  border-radius: var(--radius-sm);
  background-color: var(--color-accent-bg);
}

.skeleton-variant--circle {
  border-radius: var(--radius-full);
  width: var(--size);
}

.skeleton-animation--pulse {
  animation: var(--animation-pulse);
}

.skeleton-animation--shimmer {
  --color-1: var(--color-accent-bg);
  --color-2: var(--color-bg);
  animation: var(--animation-shimmer);
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
