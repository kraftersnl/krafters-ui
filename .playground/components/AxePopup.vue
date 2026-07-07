<script setup lang="ts">
import { VueAxePopup } from 'vue-axe';
</script>

<template>
  <ClientOnly>
    <VueAxePopup />
  </ClientOnly>
</template>

<style>
.va-pt-1 {
  padding-block-start: 0.6rem !important;
}

.va-popup-btn {
  box-shadow: var(--shadow-1) !important;
}
</style>
