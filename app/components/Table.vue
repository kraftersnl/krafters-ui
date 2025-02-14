<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: TableSize;
    fontSize?: FontSize;
    ariaLabel?: string;
    loading?: boolean;
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
    :class="`table-wrapper
      table-size--${size}
      ${loading ? 'table--loading' : ''}
    `"
    :style="`--font-size: var(--font-size-${fontSize})`"
  >
    <table>
      <caption v-if="ariaLabel" class="visuallyhidden" v-text="ariaLabel" />

      <slot />
    </table>
  </div>
</template>

<style>
.table-wrapper {
  padding-block-end: 1rem;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  font-size: var(--font-size);

  table {
    width: 100%;
  }

  th {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}

.table--loading {
  tbody {
    pointer-events: none;

    td {
      opacity: 35%;
    }

    tr {
      --color-1: var(--color-card-bg);
      --color-2: var(--color-bg);
      animation: var(--animation-shimmer);
      animation-duration: var(--duration-xl);
      background: linear-gradient(
        -45deg,
        var(--color-1) 30%,
        var(--color-2) 45%,
        var(--color-2) 55%,
        var(--color-1) 70%
      );
      background-size: 400% 400%;
    }
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

.table-size--lg {
  tbody tr {
    height: 3.5rem;
  }
  th,
  td {
    padding-block: 0.6rem;
    padding-inline: 0.5rem;
  }
}
</style>
