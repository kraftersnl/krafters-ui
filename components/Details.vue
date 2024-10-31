<script setup lang="ts">
defineProps<{ name?: string }>();
</script>

<template>
  <details class="details-wrapper" :name="name">
    <summary class="summary">
      <slot name="summary" />
    </summary>

    <div class="details-content">
      <slot name="default" />
    </div>
  </details>
</template>

<style>
.details-wrapper {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-1);
  padding-block: 2rem;
  padding-inline: 1.25rem;

  .summary {
    cursor: pointer;
    margin-inline-start: 1.25rem;
    list-style-position: outside;
  }
}

.details-content {
  padding-block-start: 1rem;
  padding-inline: 1.25rem;
}
</style>
