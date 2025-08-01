<script setup lang="ts">
const {
  value,
  min = 0,
  max = 100,
  size = 'md',
  fontSize = 'sm',
  color = 'accent',
  role = 'meter',
  id = useId(),
} = defineProps<{
  label: string;
  hideLabel?: boolean;
  hideValue?: boolean;
  showPercentage?: boolean;
  value: number;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  fontSize?: FontSize;
  color?: 'accent' | 'green' | 'orange' | 'red';
  role?: 'meter' | 'progressbar';
  id?: string;
}>();

const percentage = computed(() => (value / (max - min)) * 100);
</script>

<template>
  <div
    :role="role"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-labelledby="id"
    :aria-busy="role === 'progressbar' && value < max"
    :class="['progress-meter-wrapper', `progress-meter-color--${color}`]"
    :style="`--font-size: var(--font-size-${fontSize})`"
  >
    <div :id="id" :class="['meter-label', hideLabel && 'visuallyhidden']">
      {{ label }}
    </div>

    <div :class="['meter-value', hideValue && 'visuallyhidden']">
      <span v-if="showPercentage">{{ percentage }}%</span>
      <span v-else>
        {{ $t('meter.value-of-max', { value: value, max: max }) }}
      </span>
    </div>

    <div
      v-bind="$attrs"
      :class="['meter', `meter-size--${size}`]"
      :style="`--width: ${percentage}%`"
    />
  </div>
</template>

<style>
.progress-meter-wrapper {
  display: grid;
  grid-template-columns: 1fr auto;
  justify-items: space-between;
  font-size: var(--font-size);

  .meter-label {
    font-weight: var(--font-weight-medium);
  }

  .meter-value {
    justify-self: end;
  }

  .meter {
    grid-column: 1 / -1;
    position: relative;
    background-color: var(--progress-stroke-bg);
    border-radius: var(--radius-full);
    overflow: hidden;
    display: block;
    width: 100%;
    margin-block-start: 0.25rem;

    &::after {
      content: '';
      height: 100%;
      background-color: var(--progress-stroke-color);
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

.progress-meter-color--accent {
  --progress-stroke-color: var(--color-accent);
  --progress-stroke-bg: var(--color-accent-bg);
}

.progress-meter-color--green {
  --progress-stroke-color: var(--color-green);
  --progress-stroke-bg: var(--color-green-bg);
}

.progress-meter-color--orange {
  --progress-stroke-color: var(--color-orange);
  --progress-stroke-bg: var(--color-orange-bg);
}

.progress-meter-color--red {
  --progress-stroke-color: var(--color-red);
  --progress-stroke-bg: var(--color-red-bg);
}
</style>
