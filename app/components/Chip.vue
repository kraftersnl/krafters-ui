<script setup lang="ts">
const { locale } = useI18n();

const props = withDefaults(
  defineProps<{
    label?: string | number;
    icon?: string;
    variant?: 'flat' | 'outline';
    color?: BaseColor;
    size?: ChipSize;
    radius?: BorderRadius;
    capitalize?: boolean;
  }>(),
  {
    variant: 'flat',
    label: undefined,
    icon: undefined,
    color: undefined,
    size: 'md',
    radius: 'sm',
  },
);

const computedIcon = computed(() => {
  if (props.icon?.includes(':')) {
    return props.icon;
  }
  return `heroicons-solid:${props.icon}`;
});

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
    :style="`--radius: var(--radius-${radius})`"
  >
    <Icon v-if="icon" :name="computedIcon" />

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
  border-radius: var(--radius);
  border: 1px solid transparent;
  font-weight: var(--font-weight-medium);
  font-variant-numeric: tabular-nums;

  .krafters-tooltip-content {
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-xs);
  }
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

  .krafters-tooltip-wrapper {
    --icon-size: 0.5rem !important;
  }
}

.chip-size--sm {
  font-size: var(--font-size-xxs);
  padding-inline: 0.3rem;
  padding-block: 0.0625rem;

  .krafters-tooltip-wrapper {
    --icon-size: 0.75rem !important;
  }
}

.chip-size--md {
  font-size: var(--font-size-xs);
  padding-inline: 0.35rem;
  padding-block: 0.125rem;

  .krafters-tooltip-wrapper {
    --icon-size: 1rem !important;
  }
}

.chip-size--lg {
  font-size: var(--font-size-md);
  padding-inline: 0.5rem;
  padding-block: 0.25rem;

  .krafters-tooltip-wrapper {
    --icon-size: 1.25rem !important;
  }
}

.chip-size--xl {
  border-width: 2px;
  font-size: var(--font-size-lg);
  padding-inline: 0.75rem;
  padding-block: 0.25rem;

  .krafters-tooltip-wrapper {
    --icon-size: 1.5rem !important;
  }
}

/* Flat Chip */
.chip-variant--flat {
  background-color: var(--color-grey-bg);
}

.chip-variant--flat.chip-color--accent {
  color: var(--color-accent-text);
  background-color: var(--color-accent-bg);

  .tooltip-trigger-button {
    color: var(--color-accent);
  }
}

.chip-variant--flat.chip-color--blue {
  color: var(--color-blue-text);
  background-color: var(--color-blue-bg);

  .tooltip-trigger-button {
    color: var(--color-blue-text);
  }
}

.chip-variant--flat.chip-color--green {
  color: var(--color-green-text);
  background-color: var(--color-green-bg);

  .tooltip-trigger-button {
    color: var(--color-green-text);
  }
}

.chip-variant--flat.chip-color--orange {
  color: var(--color-orange-text);
  background-color: var(--color-orange-bg);

  .tooltip-trigger-button {
    color: var(--color-orange-text);
  }
}

.chip-variant--flat.chip-color--red {
  color: var(--color-red-text);
  background-color: var(--color-red-bg);

  .tooltip-trigger-button {
    color: var(--color-red-text);
  }
}

.chip-variant--flat.chip-color--yellow {
  color: var(--color-yellow-text);
  background-color: var(--color-yellow-bg);

  .tooltip-trigger-button {
    color: var(--color-yellow-text);
  }
}

/* Outline Chip */

.chip-variant--outline {
  color: var(--color-grey-text);
  border-color: var(--color-grey-graphic);
  background-color: var(--color-white);
}

.chip-variant--outline.chip-color--accent {
  color: var(--color-accent-text);
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
  color: var(--color-text);
  border-color: var(--color-yellow);
}
</style>
