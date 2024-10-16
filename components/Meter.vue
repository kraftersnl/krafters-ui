<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    value: number;
    min?: number;
    max?: number;
    low?: number;
    high?: number;
    optimum?: number;
    size?: 'xs' | 'sm' | 'md' | 'lg';
  }>(),
  {
    min: 0,
    max: 100,
    low: undefined,
    high: undefined,
    optimum: undefined,
    size: 'md',
  },
);

const id = useId();
</script>

<template>
  <div class="meter-wrapper">
    <label :for="id">{{ label }}</label>

    <div class="meter-value">
      {{ $t('meter.value-of-max', { value: value, max: max }) }}
    </div>

    <meter v-bind="props" :id="id" :class="`meter-size--${size}`" />
  </div>
</template>

<style>
.meter-wrapper {
  --background: var(--color-accent-bg);
  --optimum: var(--color-accent);
  --sub-optimum: var(--color-accent);
  --sub-sub-optimum: var(--color-accent);

  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;

  label {
    font-size: var(--font-size-sm);
    font-weight: 600;
  }

  .meter-value {
    font-size: var(--font-size-xs);
  }

  meter {
    grid-column: span 2;
    margin-top: 0.25rem;
  }

  meter {
    /* The gray background in Firefox */
    background: var(--background);
    border-radius: var(--radius-full);
    display: block;
    margin-bottom: 1em;
    width: 100%;
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
}

.meter-size--xs {
  height: 0.2rem;
}
.meter-size--sm {
  height: 0.25rem;
}
.meter-size--md {
  height: 0.5rem;
}
.meter-size--lg {
  height: 1rem;
}
</style>
