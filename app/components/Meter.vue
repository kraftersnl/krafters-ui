<script setup lang="ts">
const {
  min = 0,
  max = 100,
  size = 'md',
} = defineProps<{
  label: string;
  value: number;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}>();
</script>

<template>
  <div class="meter-wrapper">
    <div class="meter-label">{{ label }}</div>

    <div class="meter-value">
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
.meter-wrapper {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;

  .meter-label {
    font-size: var(--font-size-sm);
    font-weight: 600;
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
