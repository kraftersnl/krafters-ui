<script setup lang="ts">
const model = defineModel<number>();

const {
  min = 0,
  max = 100,
  step = 1,
  id = useId(),
} = defineProps<{
  label: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  showTicks?: boolean;
  hideLabel?: boolean;
  disabled?: boolean;
  required?: boolean;
  ariaValuetext?: string;
  tabindex?: string;
  id?: string;
}>();

const range = computed(() => max - min);

const ticksLength = computed(() => range.value / step + 1);

const ticksList = computed(() =>
  Array.from({ length: ticksLength.value }, (_, i) => i * step + min),
);
</script>

<template>
  <div
    class="form-field-wrapper range-input-wrapper"
    :style="[
      `--min: ${min}`,
      `--max: ${max}`,
      `--range: ${range}`,
      `--val: ${model}`,
    ]"
  >
    <label
      :for="id"
      :class="[hideLabel && 'visuallyhidden', disabled && 'disabled']"
    >
      <span>{{ label }} ({{ model }})</span>

      <Chip v-if="required" size="sm" :label="$t('form.required')" />
    </label>

    <input
      :id="id"
      ref="input"
      v-model.number="model"
      class="range-input"
      :name="name"
      :disabled="disabled"
      :aria-valuetext="ariaValuetext"
      :min="min"
      :max="max"
      :step="step"
      :tabindex="tabindex"
      type="range"
    />

    <div v-if="showTicks" class="range-input-ticks" aria-hidden="true">
      <span
        v-for="tick in ticksList"
        :key="tick"
        :class="['tick', model === tick && 'active']"
      >
        {{ tick }}
      </span>
    </div>
  </div>
</template>

<style>
.range-input-wrapper {
  --thumb-color: var(--color-accent);
  --thumb-width: 1.5rem;
  --thumb-height: 1.5rem;
  --thumb-border-size: 2px;
  --thumb-border-color: var(--color-white);
  --thumb-radius: var(--radius-full);

  --track-bg-color: var(--color-accent-bg);
  --track-progress-color: var(--color-accent);
  --track-radius: var(--radius-full);
  --track-height: 1rem;
  --track-width: 100%;

  width: var(--track-width);

  label {
    margin-block-end: 0.5rem;
  }
}

input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: transparent;
  margin: 0;
  width: var(--track-width);

  --ratio: calc((var(--val) - var(--min)) / var(--range));
  --sx: calc(
    var(--thumb-width) / 2 + var(--ratio) * (100% - var(--thumb-width))
  );
  --progress-gradient: linear-gradient(
      var(--track-progress-color),
      var(--track-progress-color)
    )
    0 / var(--sx) 100% no-repeat var(--track-bg-color);
}

/* slider track */
input[type='range']::-webkit-slider-runnable-track {
  background-color: var(--track-bg-color);
  background: var(--progress-gradient);
  border-radius: var(--track-radius);
  height: var(--track-height);
}

input[type='range']::-moz-range-track {
  background-color: var(--track-bg-color);
  background: var(--progress-gradient);
  border-radius: var(--track-radius);
  height: var(--track-height);
}

/* slider thumb */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  margin-top: calc((var(--track-height) / 2) - (var(--thumb-height) / 2));
  will-change: scale;
  transition: scale var(--duration-xs);
  background-color: var(--thumb-color);
  height: var(--thumb-height);
  width: var(--thumb-width);
  border-radius: var(--thumb-radius);
  border: var(--thumb-border-size, 0px) solid
    var(--thumb-border-color, transparent);
}

input[type='range']::-moz-range-thumb {
  will-change: scale;
  transition: scale var(--duration-xs);
  background-color: var(--thumb-color);
  height: calc(var(--thumb-height) - (var(--thumb-border-size, 0px) * 2));
  width: calc(var(--thumb-width) - (var(--thumb-border-size, 0px) * 2));

  border-radius: var(--thumb-radius);
  border: var(--thumb-border-size, 0px) solid
    var(--thumb-border-color, transparent);
}

input[type='range']:hover::-webkit-slider-thumb {
  scale: 1.2;
}
input[type='range']:hover::-moz-range-thumb {
  scale: 1.2;
}
input[type='range']:active::-webkit-slider-thumb {
  scale: 1.2;
}
input[type='range']:active::-moz-range-thumb {
  scale: 1.2;
}

/* slider focus */
input[type='range']:focus {
  outline: none;
}

input[type='range']:focus-visible {
  &::-webkit-slider-thumb {
    outline: 2px solid var(--focus-color);
    outline-offset: 0.125rem;
  }

  &::-moz-range-thumb {
    outline: 2px solid var(--focus-color);
    outline-offset: 0.125rem;
  }
}

/* slider ticks */
.range-input-ticks {
  font-size: var(--font-size-xxxs);
  color: var(--color-grey-text);
  display: flex;
  justify-content: space-between;
  padding-inline: calc((var(--thumb-width) / 2) - 1px);

  .tick {
    display: flex;
    justify-content: center;
    width: 1px;
    height: calc(var(--thumb-height) / 2);
    line-height: calc(var(--thumb-height) * 2);
    margin-bottom: calc(var(--thumb-height));
    background-color: var(--color-accent-bg);
    user-select: none;

    &.active {
      background-color: var(--thumb-color);
      font-weight: var(--font-weight-bold);
      color: var(--color-accent);
    }
  }
}
</style>
