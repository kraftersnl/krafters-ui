<script setup lang="ts">
const {
  size = 'md',
  width = '100%',
  radius = 'sm',
  animation = 'shimmer',
  variant = undefined,
} = defineProps<{
  size?: string;
  width?: string;
  radius?: string;
  variant?: 'default' | 'circle';
  animation?: string;
}>();

const computedStyle = computed(() => ({
  '--size': `var(--size-${size})`,
  '--width': width,
  '--radius': radius && `var(--radius-${radius})`,
}));
</script>

<template>
  <div
    :class="[
      'skeleton',
      `skeleton-animation--${animation}`,
      variant && `skeleton-variant--${variant}`,
    ]"
    :style="computedStyle"
  />
</template>

<style>
.skeleton {
  width: var(--width, 100%);
  height: var(--size);
  border-radius: var(--radius, var(--radius-sm));
  background-color: var(--color-grey-bg);
}

.skeleton-variant--circle {
  border-radius: var(--radius-full);
  width: var(--size);
}

.skeleton-animation--pulse {
  animation: pulse var(--duration-xl) cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-animation--shimmer {
  --color-1: var(--color-grey-bg);
  --color-2: var(--color-grey-light);
  animation: shimmer var(--duration-xl) linear infinite;
  background: linear-gradient(
    -45deg,
    var(--color-1) 30%,
    var(--color-2) 45%,
    var(--color-2) 55%,
    var(--color-1) 70%
  );
  background-size: 400% 400%;
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
