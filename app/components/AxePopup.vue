<script setup lang="ts">
import { VueAxePopup } from 'vue-axe';
</script>

<template>
  <ClientOnly>
    <VueAxePopup />
  </ClientOnly>
</template>

<style>
.va-btn {
  svg {
    display: inline;
  }
}

.va-popup-btn {
  box-shadow: none !important;
}
</style>
