<script setup lang="ts">
const {
  value,
  min = 0,
  max = 100,
  size = 'md',
  fontSize = 'sm',
} = defineProps<{
  label: string;
  hideLabel?: boolean;
  hideValue?: boolean;
  value: number;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  fontSize?: FontSize;
}>();

const id = useId();
</script>

<template>
  <div
    role="meter"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-labelledby="id"
    class="progress-meter-wrapper"
    :style="`--font-size: var(--font-size-${fontSize})`"
  >
    <div :id="id" :class="`meter-label ${hideLabel ? 'visuallyhidden' : ''}`">
      {{ label }}
    </div>

    <div :class="`meter-value  ${hideValue ? 'visuallyhidden' : ''}`">
      {{ $t('meter.value-of-max', { value: value, max: max }) }}
    </div>

    <div
      v-bind="$attrs"
      :class="`meter meter-size--${size}`"
      :style="`--width: ${(value / (max - min)) * 100 + '%'}`"
    />
  </div>
</template>

<style>
.progress-meter-wrapper {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  font-size: var(--font-size);

  .meter-label {
    font-weight: var(--font-weight-medium);
  }

  .meter-value {
    font-size: var(--font-size-xs);
  }

  .meter {
    grid-column: span 2;
    position: relative;
    background-color: var(--color-accent-bg);
    border-radius: var(--radius-full);
    overflow: hidden;
    display: block;
    width: 100%;
    margin-block-start: 0.25rem;

    &::after {
      content: '';
      height: 100%;
      background-color: var(--color-accent);
      position: absolute;
      inset: 0;
      width: var(--width);
      transition: width var(--duration-lg) ease-in-out;
    }
  }
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
