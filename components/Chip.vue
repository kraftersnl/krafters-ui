<script setup lang="ts">
const { locale } = useI18n();

const props = withDefaults(
  defineProps<{
    label?: string | number;
    icon?: string;
    color?: ChipColor;
    size?: 'sm' | 'md' | 'lg';
    capitalize?: boolean;
  }>(),
  {
    label: undefined,
    icon: undefined,
    color: undefined,
    size: 'md',
  },
);

const formattedLabel = computed(() =>
  typeof props.label === 'number'
    ? props.label.toLocaleString(locale.value)
    : props.label,
);
</script>

<template>
  <span
    :class="`
      chip
      chip-color--${color}
      chip-size--${size}
      ${capitalize ? 'chip--capitalize' : ''}
    `"
  >
    <Icon v-if="icon" :name="'heroicons-solid:' + icon" />

    <slot />

    <span v-if="label !== undefined" class="chip-text">{{
      formattedLabel
    }}</span>
  </span>
</template>

<style>
.chip {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  gap: 0.25rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-grey-bg);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.chip--capitalize .chip-text::first-letter {
  text-transform: capitalize;
}

.chip-size--sm {
  font-size: var(--font-size-xxs);
  padding-inline: 0.25rem;
  padding-block: 0.0625rem;
}

.chip-size--md {
  font-size: var(--font-size-xs);
  padding-inline: 0.35rem;
  padding-block: 0.125rem;
}

.chip-size--lg {
  font-size: var(--font-size-md);
  padding-inline: 0.5rem;
  padding-block: 0.25rem;
}

.chip-color--accent {
  color: var(--color-accent-text);
  background-color: var(--color-accent-bg);
}

.chip-color--blue {
  color: var(--color-blue-text);
  background-color: var(--color-blue-bg);
}

.chip-color--green {
  color: var(--color-green-text);
  background-color: var(--color-green-bg);
}

.chip-color--orange {
  color: var(--color-orange-text);
  background-color: var(--color-orange-bg);
}

.chip-color--red {
  color: var(--color-red-text);
  background-color: var(--color-red-bg);
}

.chip-color--yellow {
  color: var(--color-yellow-text);
  background-color: var(--color-yellow-bg);
}
</style>
