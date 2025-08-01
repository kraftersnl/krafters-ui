<script setup lang="ts">
const {
  color = 'accent',
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
  if (icon) return icon;

  if (color === 'blue') return 'material-symbols:info-outline-rounded';
  if (color === 'green') return 'material-symbols:check-circle-outline-rounded';
  if (color === 'red') return 'material-symbols:cancel-outline-rounded';
  if (color === 'orange') return 'material-symbols:warning-outline-rounded';

  return icon;
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
      <Icon v-if="computedIcon" :name="computedIcon" />

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
  padding-block: 0.5rem;
  border-radius: var(--radius-sm);
  font-size: var(--font-size);

  .callout-content {
    display: flex;
    align-items: center;
    gap: 0.75em;

    .iconify {
      flex-shrink: 0;
      font-size: var(--icon-size);
    }
  }

  .default-slot {
    flex-grow: 1;
  }
}

.callout-color--accent {
  background-color: var(--color-accent-bg);
  color: var(--color-accent-text);

  .iconify {
    color: var(--color-accent-graphic);
  }
}

.callout-color--red {
  background-color: var(--color-red-bg);
  color: var(--color-red-text);

  .iconify {
    color: var(--color-red-graphic);
  }
}

.callout-color--orange {
  background-color: var(--color-orange-bg);
  color: var(--color-orange-text);

  .iconify {
    color: var(--color-orange-graphic);
  }
}

.callout-color--green {
  background-color: var(--color-green-bg);
  color: var(--color-green-text);

  .iconify {
    color: var(--color-green-graphic);
  }
}

.callout-color--blue {
  background-color: var(--color-blue-bg);
  color: var(--color-blue-text);

  .iconify {
    color: var(--color-blue-graphic);
  }
}
</style>
