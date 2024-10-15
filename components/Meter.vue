<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number;
    min?: number;
    max?: number;
    low?: number;
    high?: number;
    optimum?: number;
    size?: 'xs' | 'sm' | 'md' | 'lg';
  }>(),
  {
    min: 1,
    max: 100,
    low: undefined,
    high: undefined,
    optimum: undefined,
    size: 'sm',
  },
);
</script>

<template>
  <meter v-bind="props" :class="`meter meter-size--${size}`" />
</template>

<style>
.meter {
  --background: var(--color-accent-bg);
  --optimum: var(--color-accent);
  --sub-optimum: var(--color-accent);
  --sub-sub-optimum: var(--color-accent);

  /* The gray background in Firefox */
  background: var(--background);
  border-radius: var(--radius-full);
  display: block;
  margin-bottom: 1em;
  width: 100%;
}

.meter-size--xs {
  height: 0.125rem;
}
.meter-size--sm {
  height: 0.25rem;
}
.meter-size--sm {
  height: 0.5rem;
}
.meter-size--lg {
  height: 1rem;
}

/* The gray background in Chrome, etc. */
meter::-webkit-meter-bar {
  background: var(--background);
}

/* The green (optimum) bar in Firefox */
meter:-moz-meter-optimum::-moz-meter-bar {
  background: var(--optimum);
}

/* The green (optimum) bar in Chrome etc. */
meter::-webkit-meter-optimum-value {
  background: var(--optimum);
}

/* The yellow (sub-optimum) bar in Firefox */
meter:-moz-meter-sub-optimum::-moz-meter-bar {
  background: var(--sub-optimum);
}

/* The yellow (sub-optimum) bar in Chrome etc. */
meter::-webkit-meter-suboptimum-value {
  background: var(--sub-optimum);
}

/* The red (even less good) bar in Firefox */
meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
  background: var(--sub-sub-optimum);
}

/* The red (even less good) bar in Chrome etc. */
meter::-webkit-meter-even-less-good-value {
  background: var(--sub-sub-optimum);
}
</style>
