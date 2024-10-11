<script setup lang="ts">
defineProps<{
  label?: string;
  icon?: string;
  color?: ChipColor;
}>();
</script>

<template>
  <div :class="`chip chip-color--${color}`">
    <Icon v-if="icon" :name="'heroicons-solid:' + icon" />

    <span v-if="label" class="chip-text">{{ label }}</span>

    <slot />
  </div>
</template>

<style>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding-block: 0.125rem;
  padding-inline: 0.4rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-grey-bg);
  font-weight: 500;
  font-size: var(--font-size-xs);
  font-variant-numeric: tabular-nums;

  .chip-text::first-letter {
    text-transform: uppercase;
  }
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
