<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md';
    fontSize?: 'xs' | 'sm' | 'md';
    ariaLabel?: string;
  }>(),
  {
    size: 'sm',
    fontSize: 'sm',
    ariaLabel: undefined,
  },
);
</script>

<template>
  <div
    :class="`table-wrapper table-size--${size} table-font-size--${fontSize}`"
  >
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

  th {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}

.table-font-size--xs {
  font-size: var(--font-size-xs);
  thead {
    font-size: var(--font-size-xxs);
  }
}

.table-font-size--sm {
  font-size: var(--font-size-sm);
  thead {
    font-size: var(--font-size-xs);
  }
}

.table-font-size--md {
  font-size: var(--font-size-md);
  thead {
    font-size: var(--font-size-sm);
  }
}

.table-size--xs {
  tbody tr {
    min-height: 2rem;
  }
  th,
  td {
    padding-block: 0.4rem;
    padding-inline: 0.35rem;
  }
}

.table-size--sm {
  tbody tr {
    height: 2.5rem;
  }
  th,
  td {
    padding-block: 0.5rem;
    padding-inline: 0.5rem;
  }
}

.table-size--md {
  tbody tr {
    height: 3rem;
  }
  th,
  td {
    padding-block: 0.6rem;
    padding-inline: 0.5rem;
  }
}
</style>
