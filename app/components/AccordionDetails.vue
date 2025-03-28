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

  &:focus-visible {
    outline-offset: 2px;
    border-radius: var(--radius-xs);
    outline: 1px dotted var(--focus-color);
  }

  /* Hide marker in Firefox and Chrome */
  &::marker {
    content: none;
  }
  /* Hide marker in Safari */
  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: '▶';
    font-size: var(--font-size-xs);
    position: absolute;
    top: 0.25em;
    left: -1rem;
  }
}

.details-wrapper {
  &[open] {
    > .details-summary::before {
      content: '▼';
    }
  }
}
</style>
