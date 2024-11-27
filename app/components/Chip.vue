<script setup lang="ts">
const { locale } = useI18n();

const props = withDefaults(
  defineProps<{
    label?: string | number;
    icon?: string;
    variant?: 'flat' | 'outline';
    color?: BaseColor;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    capitalize?: boolean;
  }>(),
  {
    variant: 'flat',
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
      chip-variant--${variant}
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
  border: 1px solid transparent;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.chip--capitalize .chip-text::first-letter {
  text-transform: capitalize;
}

/* Chip sizes */
.chip-size--xs {
  font-size: var(--font-size-xxxs);
  padding-inline: 0.2rem;
  padding-block: 0.03125rem;
  gap: 0.125rem;
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

/* Flat Chip */
.chip-variant--flat {
  background-color: var(--color-grey-bg);
}

.chip-variant--flat.chip-color--accent {
  color: var(--color-accent);
  background-color: var(--color-accent-bg);
}

.chip-variant--flat.chip-color--blue {
  color: var(--color-blue-text);
  background-color: var(--color-blue-bg);
}

.chip-variant--flat.chip-color--green {
  color: var(--color-green-text);
  background-color: var(--color-green-bg);
}

.chip-variant--flat.chip-color--orange {
  color: var(--color-orange-text);
  background-color: var(--color-orange-bg);
}

.chip-variant--flat.chip-color--red {
  color: var(--color-red-text);
  background-color: var(--color-red-bg);
}

.chip-variant--flat.chip-color--yellow {
  color: var(--color-yellow-text);
  background-color: var(--color-yellow-bg);
}

/* Outline Chip */

.chip-variant--outline {
  color: var(--color-grey-text);
  border-color: var(--color-grey-graphic);
  background-color: var(--color-white);
}

.chip-variant--outline.chip-color--accent {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.chip-variant--outline.chip-color--blue {
  color: var(--color-blue-text);
  border-color: var(--color-blue);
}

.chip-variant--outline.chip-color--green {
  color: var(--color-green-text);
  border-color: var(--color-green);
}

.chip-variant--outline.chip-color--orange {
  color: var(--color-orange-text);
  border-color: var(--color-orange);
}

.chip-variant--outline.chip-color--red {
  color: var(--color-red-text);
  border-color: var(--color-red);
}

.chip-variant--outline.chip-color--yellow {
  color: var(--color-yellow-text);
  border-color: var(--color-yellow);
}
</style>
