<script setup lang="ts">
const { is = 'div' } = defineProps<{
  is?: string;
}>();
</script>

<template>
  <component :is="is" class="card">
    <slot mdc-unwrap="p" />
  </component>
</template>

<style>
.card {
  position: relative;
  padding-block: 1.25rem;
  padding-inline: 1.5rem;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
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
