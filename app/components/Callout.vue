<script setup lang="ts">
const { color = 'blue', icon } = defineProps<{
  color?: 'blue' | 'green' | 'red' | 'orange';
  icon?: string;
}>();

const computedIcon = computed(() => {
  if (icon) return icon;
  if (color === 'blue') return 'information-circle';
  if (color === 'green') return 'check-circle';
  if (color === 'red') return 'x-circle';
  if (color === 'orange') return 'exclamation-circle';
  return icon;
});
</script>

<template>
  <div :class="`callout-wrapper callout-color--${color}`">
    <div class="callout-content">
      <Icon :name="'heroicons-solid:' + computedIcon" />
      <slot />
    </div>
  </div>
</template>

<style>
.callout-wrapper {
  display: inline-block;
  padding-inline: 1rem;
  padding-block: 0.75rem;
  border-left: 0.35rem solid transparent;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.callout-content {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  .iconify {
    font-size: 1rem;
    /* vertical-align: middle; */
  }
}

.callout-color--blue {
  border-color: var(--color-blue);
  color: var(--color-blue-text);
  background-color: var(--color-blue-bg);
}

.callout-color--green {
  border-color: var(--color-green);
  color: var(--color-green-text);
  background-color: var(--color-green-bg);
}

.callout-color--orange {
  border-color: var(--color-orange);
  color: var(--color-orange-text);
  background-color: var(--color-orange-bg);
}

.callout-color--red {
  border-color: var(--color-red);
  color: var(--color-red-text);
  background-color: var(--color-red-bg);
}
</style>
