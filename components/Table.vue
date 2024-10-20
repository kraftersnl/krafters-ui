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
  margin-block-start: 1rem;
  padding-inline: 1px;
  font-size: var(--font-size-sm);

  th {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
