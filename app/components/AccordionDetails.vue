<script setup lang="ts">
defineProps<{
  open?: boolean;
  name?: string;
}>();
</script>

<template>
  <details :open="open" class="details-wrapper" :name="name">
    <summary class="details-summary">
      <slot name="trigger" mdc-unwrap="p" />
    </summary>

    <div class="details-panel">
      <slot name="content" mdc-unwrap="p" />
    </div>
  </details>
</template>

<style>
.details-summary {
  cursor: default;
  position: relative;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  [role='heading'] {
    display: inline-block;
  }

  &:focus-visible {
    outline-offset: 2px;
    border-radius: var(--radius-xs);
    outline: 2px dotted var(--focus-color);
  }

  &:hover {
    color: var(--color-accent-graphic);

    &::marker {
      color: var(--color-accent-graphic);
    }
  }
}
</style>
