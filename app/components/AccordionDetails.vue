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
  list-style: none;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  [role='heading'] {
    display: inline-block;
  }

  /* Hide marker in Firefox and Chrome */
  &::marker {
    /* content: none; */
  }
  /* Hide marker in Safari */
  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: '▶' / '';
    font-size: smaller;
    padding-inline-end: 0.5em;
  }

  &:focus-visible {
    outline-offset: 2px;
    border-radius: var(--radius-xs);
    outline: 1px dotted var(--focus-color);
  }
}

.details-wrapper {
  &[open] {
    > .details-summary::before {
      content: '▼' / '';
    }
  }
}
</style>
