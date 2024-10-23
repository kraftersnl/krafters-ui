<script setup lang="ts"></script>

<template>
  <div class="table-wrapper">
    <table>
      <slot />
    </table>
  </div>
</template>

<style>
.table-wrapper {
  overflow: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding-block-end: 1rem;
  margin-inline: -1rem;
  padding-inline: calc(1rem);

  tbody tr:hover {
    background-color: var(--color-card-bg);
  }

  th {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
