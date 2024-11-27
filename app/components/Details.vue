<script setup lang="ts">
defineProps<{
  open?: boolean;
  name?: string;
}>();
</script>

<template>
  <details :open="open" class="details-wrapper" :name="name">
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
  .summary {
    cursor: pointer;
    margin-inline-start: 1rem;
    list-style-position: outside;

    &:focus-visible {
      outline-offset: 2px;
      border-radius: var(--radius-xs);
      outline: 1px dotted var(--focus-color);
    }
  }
}

.details-content {
  padding-inline-start: 1rem;
}
</style>
