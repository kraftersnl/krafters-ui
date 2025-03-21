<script setup lang="ts">
const {
  is = 'div',
  borderWidth = 1,
  borderRadius = 'md',
} = defineProps<{
  is?: string;
  borderWidth?: number;
  borderRadius?: BorderRadius;
}>();
</script>

<template>
  <component
    :is="is"
    class="card"
    :style="`
      --border-width: ${borderWidth}px;
      --border-radius: var(--radius-${borderRadius});
    `"
  >
    <slot />
  </component>
</template>

<style>
.card {
  position: relative;
  padding-block: 1.25rem;
  padding-inline: 1.5rem;
  background-color: var(--color-card-bg);
  border: var(--border-width, 1px) solid var(--color-card-border);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-1);

  @media (min-width: 480px) {
    padding-block: 1.5rem;
    padding-inline: 2rem;
  }

  h1,
  h2,
  h3,
  h4 {
    margin-block-start: 0;
  }
}
</style>
