<script setup lang="ts">
const {
  value,
  min = 0,
  max = 100,
  size = 'xl',
  fontSize = 'sm',
  color = 'accent',
} = defineProps<{
  value: number;
  max?: number;
  min?: number;
  showValue?: boolean;
  fontSize?: FontSize;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'accent' | 'green' | 'orange' | 'red';
}>();

const id = useId();

const percentage = computed(() => ((value / max) * 100)?.toFixed());
</script>

<template>
  <div
    role="meter"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuetext="percentage + '%'"
    :aria-labelledby="id"
    :class="`
      progress-circle-wrapper
      progress-circle-size--${size}
      progress-circle-color--${color}
    `"
    :style="`
      --font-size: var(--font-size-${fontSize});
      --progress-circle-value: ${value};
      --progress-circle-max: ${max};
    `"
  >
    <div :id="id" class="progress-circle-label">
      {{ showValue ? value : percentage + '%' }}
    </div>

    <div class="progress-circle" aria-hidden="true">
      <svg>
        <circle class="bg" />
        <circle class="fg" />
      </svg>
    </div>
  </div>
</template>

<style>
.progress-circle-wrapper {
  --progress-circle-bg: transparent;
  --half-size: calc(var(--size) / 2);
  --radius: calc((var(--size) - var(--progress-stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc(
    (var(--progress-circle-value) * var(--circumference)) /
      var(--progress-circle-max)
  );

  position: relative;
  width: var(--size);
  height: var(--size);
  font-size: var(--font-size);
  font-weight: var(--font-weight-bold);
  display: grid;
  place-content: center;

  .progress-circle-label {
    z-index: 1;
    color: var(--progress-label-color);
  }

  .progress-circle {
    position: absolute;
    inset: 0;

    svg {
      width: var(--size);
      height: var(--size);
    }

    circle {
      cx: var(--half-size);
      cy: var(--half-size);
      r: var(--radius);
      fill: transparent;
      stroke-width: var(--progress-stroke-width);

      &.bg {
        stroke: var(--progress-stroke-bg);
        fill: var(--progress-circle-bg);
      }

      &.fg {
        stroke: var(--progress-stroke-color);
        stroke-width: var(--progress-stroke-width);
        stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
        transform: rotate(-90deg);
        transform-origin: var(--half-size) var(--half-size);
        transition:
          stroke var(--duration-sm) ease-in-out,
          stroke-dasharray var(--duration-lg) ease-out;
      }
    }
  }
}

.progress-circle-color--accent {
  --progress-label-color: var(--color-accent);
  --progress-stroke-color: var(--color-accent);
  --progress-stroke-bg: var(--color-accent-bg);
}

.progress-circle-color--green {
  --progress-label-color: var(--color-green-text);
  --progress-stroke-color: var(--color-green);
  --progress-stroke-bg: var(--color-green-bg);
}

.progress-circle-color--orange {
  --progress-label-color: var(--color-orange-text);
  --progress-stroke-color: var(--color-orange);
  --progress-stroke-bg: var(--color-orange-bg);
}

.progress-circle-color--red {
  --progress-label-color: var(--color-red-text);
  --progress-stroke-color: var(--color-red);
  --progress-stroke-bg: var(--color-red-bg);
}

.progress-circle-size--xl {
  --size: 8rem;
  --progress-stroke-width: 10px;
}

.progress-circle-size--lg {
  --size: 6rem;
  --progress-stroke-width: 8px;
}

.progress-circle-size--md {
  --size: 4rem;
  --progress-stroke-width: 5px;
}

.progress-circle-size--sm {
  --size: 3rem;
  --progress-stroke-width: 3px;
}

.progress-circle-size--xs {
  --size: 2rem;
  --progress-stroke-width: 1px;
}
</style>
