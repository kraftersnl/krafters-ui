<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md';
  }>(),
  {
    size: 'sm',
  },
);
</script>

<template>
  <div :class="`table-wrapper table-size--${size}`">
    <table>
      <slot />
    </table>
  </div>
</template>

<style>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding-block-end: 1rem;
  margin-inline: -1rem;
  padding-inline: calc(1rem);

  table {
    width: 100%;
  }

  tbody tr:hover {
    background-color: var(--color-card-bg);
  }

  th {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}

.table-size--xs {
  font-size: var(--font-size-xs);
}
.table-size--sm {
  font-size: var(--font-size-sm);
}
.table-size--md {
  font-size: var(--font-size-md);
}
</style>
