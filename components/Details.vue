<script setup lang="ts"></script>

<template>
  <details class="details">
    <summary class="summary">
      <slot name="summary" />
    </summary>

    <slot name="default" />
    <slot name="details" />
  </details>
</template>

<style>
.summary {
  cursor: pointer;

  > * {
    display: inline-block;
  }
}
</style>
