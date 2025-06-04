<script setup lang="ts">
const {
  size = 'sm',
  fontSize = 'sm',
  skeletonRows = 10,
  skeletonCols = 3,
  ariaLabel = undefined,
} = defineProps<{
  size?: TableSize;
  fontSize?: FontSize;
  ariaLabel?: string;
  loading?: boolean;
  skeleton?: boolean;
  skeletonRows?: number;
  skeletonCols?: number;
}>();
</script>

<template>
  <div
    :class="[
      'table-wrapper',
      `table-size--${size}`,
      loading && 'table--loading',
      skeleton && 'table--skeleton',
    ]"
    :style="`--font-size: var(--font-size-${fontSize})`"
  >
    <table>
      <caption v-if="ariaLabel" class="visuallyhidden" v-text="ariaLabel" />

      <tbody v-if="skeleton">
        <tr
          v-for="(_, rowIndex) in new Array(skeletonRows)"
          :key="rowIndex"
          class="table-loader-row"
        >
          <td v-for="(__, colIndex) in new Array(skeletonCols)" :key="colIndex">
            <Skeleton />
          </td>
        </tr>
      </tbody>

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

.table--skeleton tbody tr:not(.table-loader-row) {
  display: none;
}

.table--loading {
  tbody {
    pointer-events: none;

    td,
    th {
      opacity: 35%;
    }

    tr {
      --color-1: var(--color-card-bg);
      --color-2: var(--color-bg);
      animation: var(--animation-shimmer);
      animation-duration: var(--duration-xxl);
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
    height: 2rem;
  }
  th,
  td {
    padding-block: 0.4rem;
    padding-inline: 0.35rem;
  }
}

.table-size--sm {
  tbody tr {
    height: 3rem;
  }
  th,
  td {
    padding-block: 0.5rem;
    padding-inline: 0.5rem;
  }
}

.table-size--md {
  tbody tr {
    height: 3.25rem;
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
