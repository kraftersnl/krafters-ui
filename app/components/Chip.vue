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
  variant?: ChipVariant;
  color?: BaseColor;
  size?: ChipSize;
  radius?: BorderRadius;
  capitalize?: boolean;
}>();

const computedStyle = computed(() => ({
  '--chip-radius': radius && `var(--radius-${radius})`,
  '--chip-font-size': fontSize && `var(--font-size-${fontSize})`,
  '--chip-icon-size': iconSize && `var(--font-size-${iconSize})`,
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
  gap: 0.25em;
  padding-inline: 0.5em;
  border-radius: var(--chip-radius, var(--radius-md));
  border: 1px solid transparent;
  font-weight: var(--font-weight-medium);
  font-variant-numeric: tabular-nums;

  .krafters-tooltip-content {
    font-weight: var(--font-weight-regular);
    font-size: var(--chip-font-size, var(--font-size-xs));
  }

  .iconify {
    font-size: var(--chip-icon-size, larger);
  }
}

.chip--capitalize .chip-text::first-letter {
  text-transform: capitalize;
}

/* Chip sizes */
.chip-size--xs {
  font-size: var(--chip-font-size, var(--font-size-xxxs));

  padding-block: 0.03125rem;
  gap: 0.125rem;
}

.chip-size--sm {
  font-size: var(--chip-font-size, var(--font-size-xxs));

  padding-block: 0.0625rem;
}

.chip-size--md {
  font-size: var(--chip-font-size, var(--font-size-xs));

  padding-block: 0.125rem;
}

.chip-size--lg {
  font-size: var(--chip-font-size, var(--font-size-sm));

  padding-block: 0.25rem;
}

.chip-size--xl {
  border-radius: var(--chip-radius, var(--radius-lg));
  border-width: 2px;
  font-size: var(--chip-font-size, var(--font-size-md));

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

/* Soft Chip */
.chip-variant--soft {
  color: var(--color-text);
  border-color: var(--color-grey-bg);
  background-color: var(--color-white);
}

.chip-variant--soft.chip-color--accent {
  color: var(--color-accent-text);
  border-color: var(--color-accent-bg);
}

.chip-variant--soft.chip-color--grey {
  color: var(--color-grey-text);
  border-color: var(--color-grey-bg);
}

.chip-variant--soft.chip-color--red {
  color: var(--color-red-text);
  border-color: var(--color-red-bg);
}

.chip-variant--soft.chip-color--orange {
  color: var(--color-orange-text);
  border-color: var(--color-orange-bg);
}

.chip-variant--soft.chip-color--yellow {
  color: var(--color-yellow-text);
  border-color: var(--color-yellow-bg);
}

.chip-variant--soft.chip-color--green {
  color: var(--color-green-text);
  border-color: var(--color-green-bg);
}

.chip-variant--soft.chip-color--blue {
  color: var(--color-blue-text);
  border-color: var(--color-blue-bg);
}

.chip-variant--soft.chip-color--purple {
  color: var(--color-purple-text);
  border-color: var(--color-purple-bg);
}

.chip-variant--soft.chip-color--pink {
  color: var(--color-pink-text);
  border-color: var(--color-pink-bg);
}

/* Outline Chip */

.chip-variant--outline {
  color: var(--color-text);
  border-color: var(--color-grey-graphic);
  background-color: var(--color-white);
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

.dark-mode {
  .card {
    .chip-variant--outline,
    .chip-variant--soft {
      background-color: var(--color-bg);
    }
  }
}
</style>
