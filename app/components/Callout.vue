<script setup lang="ts">
const {
  color = 'blue',
  fontSize = 'xs',
  iconSize = 'md',
  icon = undefined,
  content = undefined,
  ariaLabel = undefined,
} = defineProps<{
  color?: 'accent' | 'blue' | 'green' | 'red' | 'orange';
  fontSize?: FontSize;
  iconSize?: FontSize;
  icon?: string;
  content?: string;
  ariaLabel?: string;
}>();

const { t } = useI18n();

const computedStyle = computed(() => ({
  '--font-size': `var(--font-size-${fontSize})`,
  '--icon-size': `var(--font-size-${iconSize})`,
}));

const computedIcon = computed(() => {
  if (icon) {
    if (icon?.includes(':')) {
      return icon;
    }
    return `heroicons-solid:${icon}`;
  }

  if (color === 'blue') return 'heroicons-solid:information-circle';
  if (color === 'green') return 'heroicons-solid:check-circle';
  if (color === 'red') return 'heroicons-solid:x-circle';
  if (color === 'orange') return 'heroicons-solid:exclamation-circle';

  return `heroicons-solid:${icon}`;
});

const computedAriaLabel = computed(() => {
  if (ariaLabel) return ariaLabel;
  if (color === 'blue') return t('aria.callout-info');
  if (color === 'green') return t('aria.callout-success');
  if (color === 'red') return t('aria.callout-error');
  if (color === 'orange') return t('aria.callout-warning');
  return ariaLabel;
});
</script>

<template>
  <section
    :aria-label="computedAriaLabel"
    :class="['callout-wrapper', `callout-color--${color}`]"
    :style="computedStyle"
  >
    <div class="callout-content">
      <Icon :name="computedIcon" />

      <div v-if="content">{{ content }}</div>

      <div v-if="$slots.default" class="default-slot">
        <slot mdc-unwrap="p" />
      </div>
    </div>
  </section>
</template>

<style>
.callout-wrapper {
  display: inline-block;
  padding-inline: 0.75rem;
  padding-block: 0.75rem;
  border: 1px solid var(--color-grey-bg);
  border-radius: var(--radius-sm);
  font-size: var(--font-size);

  .callout-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .iconify {
      flex-shrink: 0;
      font-size: var(--icon-size);
    }
  }
}

.callout-color--accent {
  border-color: var(--color-accent);
  color: var(--color-accent-text);

  .iconify {
    color: var(--color-accent-graphic);
  }
}

.callout-color--red {
  border-color: var(--color-red);
  color: var(--color-red-text);

  .iconify {
    color: var(--color-red-graphic);
  }
}

.callout-color--orange {
  border-color: var(--color-orange);
  color: var(--color-orange-text);

  .iconify {
    color: var(--color-orange-graphic);
  }
}

.callout-color--green {
  border-color: var(--color-green);
  color: var(--color-green-text);

  .iconify {
    color: var(--color-green-graphic);
  }
}

.callout-color--blue {
  border-color: var(--color-blue);
  color: var(--color-blue-text);

  .iconify {
    color: var(--color-blue-graphic);
  }
}
</style>
