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
  display: grid !important;
  place-content: center !important;
}

.va-popup-btn {
  box-shadow: none !important;
}
</style>
