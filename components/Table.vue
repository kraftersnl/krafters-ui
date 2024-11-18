<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md';
    ariaLabel?: string;
  }>(),
  {
    size: 'sm',
    ariaLabel: undefined,
  },
);
</script>

<template>
  <div :class="`table-wrapper table-size--${size}`">
    <table>
      <caption v-if="ariaLabel" class="visuallyhidden" v-text="ariaLabel" />

      <slot />
    </table>
  </div>
</template>

<style>
.table-wrapper {
  width: calc(100% + 2rem);
  margin-inline: -1rem;
  padding-inline: 1rem;
  padding-block-end: 1rem;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;

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

  th,
  td {
    padding-block: 0.5rem;
    padding-inline: 0.35rem;
  }
}

.table-size--sm {
  font-size: var(--font-size-sm);

  thead {
    font-size: var(--font-size-xs);
  }

  th,
  td {
    padding-block: 0.5rem;
    padding-inline: 0.5rem;
  }
}

.table-size--md {
  font-size: var(--font-size-md);

  thead {
    font-size: var(--font-size-sm);
  }

  th,
  td {
    padding-block: 0.5rem;
    padding-inline: 0.5rem;
  }
}
</style>
