<script setup lang="ts">
defineProps<{
  open?: boolean;
  name?: string;
}>();
</script>

<template>
  <details :open="open" class="details-wrapper" :name="name">
    <summary class="summary">
      <slot name="trigger" mdc-unwrap="p" />
    </summary>

    <div class="details-content">
      <slot name="content" mdc-unwrap="p" />
    </div>
  </details>
</template>

<style>
.details-wrapper {
  .summary {
    cursor: pointer;
    position: relative;

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

    &:focus-visible {
      outline-offset: 2px;
      border-radius: var(--radius-xs);
      outline: 1px dotted var(--focus-color);
    }
  }

  &[open] {
    > .summary::before {
      content: '▼';
    }
  }
}
</style>
