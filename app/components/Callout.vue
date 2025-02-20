<script setup lang="ts">
const {
  color = 'blue',
  fontSize = 'xs',
  icon,
} = defineProps<{
  color?: 'accent' | 'blue' | 'green' | 'red' | 'orange';
  fontSize?: FontSize;
  icon?: string;
  content?: string;
}>();

const computedIcon = computed(() => {
  if (icon?.includes(':')) {
    return icon;
  }
  if (color === 'blue') return 'heroicons-solid:information-circle';
  if (color === 'green') return 'heroicons-solid:check-circle';
  if (color === 'red') return 'heroicons-solid:x-circle';
  if (color === 'orange') return 'heroicons-solid:exclamation-circle';
  return `heroicons-solid:${icon}`;
});
</script>

<template>
  <div
    :class="`callout-wrapper
      callout-color--${color}
    `"
    :style="`--font-size: var(--font-size-${fontSize})`"
  >
    <div class="callout-content">
      <Icon :name="computedIcon" />

      <span v-if="content">{{ content }}</span>

      <slot mdc-unwrap="p" />
    </div>
  </div>
</template>

<style>
.callout-wrapper {
  display: inline-block;
  padding-inline: 0.75rem;
  padding-block: 0.75rem;
  border-left: 0.35rem solid transparent;
  border-radius: var(--radius-sm);
  font-size: var(--font-size);
}

.callout-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .iconify {
    flex-shrink: 0;
    font-size: 1rem;
  }
}

.callout-color--accent {
  border-color: var(--color-accent);
  color: var(--color-accent-text);
  background-color: var(--color-accent-bg);

  .tooltip-trigger-button {
    color: var(--color-accent-text);
  }
}

.callout-color--blue {
  border-color: var(--color-blue);
  color: var(--color-blue-text);
  background-color: var(--color-blue-bg);

  .tooltip-trigger-button {
    color: var(--color-blue-text);
  }
}

.callout-color--green {
  border-color: var(--color-green);
  color: var(--color-green-text);
  background-color: var(--color-green-bg);

  .tooltip-trigger-button {
    color: var(--color-green-text);
  }
}

.callout-color--orange {
  border-color: var(--color-orange);
  color: var(--color-orange-text);
  background-color: var(--color-orange-bg);

  .tooltip-trigger-button {
    color: var(--color-orange-text);
  }
}

.callout-color--red {
  border-color: var(--color-red);
  color: var(--color-red-text);
  background-color: var(--color-red-bg);

  .tooltip-trigger-button {
    color: var(--color-red-text);
  }
}
</style>
