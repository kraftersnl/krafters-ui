<script setup lang="ts">
const { locale } = useI18n();

const {
  label = undefined,
  icon = undefined,
  color = undefined,
  radius = undefined,
  variant = 'flat',
  size = 'md',
  fontSize = undefined,
  iconSize = undefined,
} = defineProps<{
  label?: string | number;
  icon?: string;
  fontSize?: FontSize;
  iconSize?: FontSize;
  variant?: 'flat' | 'outline';
  color?: BaseColor;
  size?: ChipSize;
  radius?: BorderRadius;
  capitalize?: boolean;
}>();

const computedStyle = computed(() => ({
  '--radius': radius && `var(--radius-${radius})`,
  '--font-size': fontSize && `var(--font-size-${fontSize})`,
  '--icon-size': iconSize && `var(--icon-size-${iconSize})`,
}));

const formattedLabel = computed(() =>
  typeof label === 'number' ? label.toLocaleString(locale.value) : label,
);
</script>

<template>
  <span
    :class="[
      'chip',
      `chip-variant--${variant}`,
      `chip-color--${color}`,
      `chip-size--${size}`,
      `${capitalize ? 'chip--capitalize' : ''}
    `,
    ]"
    :style="computedStyle"
  >
    <Icon v-if="icon" :name="icon" />

    <span v-if="label !== undefined" class="chip-text">{{
      formattedLabel
    }}</span>

    <slot mdc-unwrap="p" />
  </span>
</template>

<style>
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  gap: 0.25rem;
  border-radius: var(--radius, var(--radius-md));
  border: 1px solid transparent;
  font-weight: var(--font-weight-medium);
  font-variant-numeric: tabular-nums;

  .krafters-tooltip-content {
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size, var(--font-size-xs));
  }

  .iconify {
    font-size: var(--icon-size, larger);
  }
}

.chip--capitalize .chip-text::first-letter {
  text-transform: capitalize;
}

/* Chip sizes */
.chip-size--xs {
  font-size: var(--font-size, var(--font-size-xxxs));
  padding-inline: 0.2rem;
  padding-block: 0.03125rem;
  gap: 0.125rem;
}

.chip-size--sm {
  font-size: var(--font-size, var(--font-size-xxs));
  padding-inline: 0.3rem;
  padding-block: 0.0625rem;
}

.chip-size--md {
  font-size: var(--font-size, var(--font-size-xs));
  padding-inline: 0.35rem;
  padding-block: 0.125rem;
}

.chip-size--lg {
  font-size: var(--font-size, var(--font-size-sm));
  padding-inline: 0.5rem;
  padding-block: 0.25rem;
}

.chip-size--xl {
  --radius: var(--radius-md);
  border-width: 2px;
  font-size: var(--font-size, var(--font-size-lg));
  padding-inline: 0.75rem;
  padding-block: 0.25rem;
}

/* Flat Chip */
.chip-variant--flat {
  background-color: var(--color-grey-bg);
}

.chip-variant--flat.chip-color--accent {
  color: var(--color-accent-text);
  background-color: var(--color-accent-bg);
}

.chip-variant--flat.chip-color--grey {
  color: var(--color-grey-text);
  background-color: var(--color-grey-bg);
}

.chip-variant--flat.chip-color--red {
  color: var(--color-red-text);
  background-color: var(--color-red-bg);
}

.chip-variant--flat.chip-color--orange {
  color: var(--color-orange-text);
  background-color: var(--color-orange-bg);
}

.chip-variant--flat.chip-color--yellow {
  color: var(--color-yellow-text);
  background-color: var(--color-yellow-bg);
}

.chip-variant--flat.chip-color--green {
  color: var(--color-green-text);
  background-color: var(--color-green-bg);
}

.chip-variant--flat.chip-color--blue {
  color: var(--color-blue-text);
  background-color: var(--color-blue-bg);
}

.chip-variant--flat.chip-color--purple {
  color: var(--color-purple-text);
  background-color: var(--color-purple-bg);
}

.chip-variant--flat.chip-color--pink {
  color: var(--color-pink-text);
  background-color: var(--color-pink-bg);
}

/* Outline Chip */

.chip-variant--outline {
  color: var(--color-text);
  border-color: var(--color-grey-graphic);
}

.chip-variant--outline.chip-color--accent {
  color: var(--color-accent-text);
  border-color: var(--color-accent-graphic);
}

.chip-variant--outline.chip-color--grey {
  color: var(--color-grey-text);
  border-color: var(--color-grey-bg);
}

.chip-variant--outline.chip-color--red {
  color: var(--color-red-text);
  border-color: var(--color-red-graphic);
}

.chip-variant--outline.chip-color--orange {
  color: var(--color-orange-text);
  border-color: var(--color-orange-graphic);
}

.chip-variant--outline.chip-color--yellow {
  color: var(--color-yellow-text);
  border-color: var(--color-yellow-graphic);
}

.chip-variant--outline.chip-color--green {
  color: var(--color-green-text);
  border-color: var(--color-green-graphic);

  .iconify {
    color: var(--color-green-graphic);
  }
}

.chip-variant--outline.chip-color--blue {
  color: var(--color-blue-text);
  border-color: var(--color-blue-graphic);
}

.chip-variant--outline.chip-color--purple {
  color: var(--color-purple-text);
  border-color: var(--color-purple-graphic);
}

.chip-variant--outline.chip-color--pink {
  color: var(--color-pink-text);
  border-color: var(--color-pink-graphic);
}
</style>
