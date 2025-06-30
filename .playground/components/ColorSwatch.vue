<script setup lang="ts">
defineProps<{
  color: string;
}>();
</script>

<template>
  <div class="color-swatch-wrapper" :style="`--color: var(--color-${color})`">
    <div :class="['color-swatch', `color-swatch--${color}`]" />

    <code class="swatch-name">--color-{{ color }}</code>
  </div>
</template>

<style>
.color-swatch-wrapper {
  display: grid;
  gap: 1rem;
  place-items: center;
  align-items: center;

  .color-swatch {
    width: 8rem;
    height: 8rem;
    margin-inline: -0.5rem;
    border-radius: var(--radius-full);
    background-color: var(--color);
  }

  code {
    font-size: 0.5rem;
  }

  .color-swatch--white {
    box-shadow: inset 0 0 0 2px var(--color-bg);
  }
}
</style>
