<script setup lang="ts">
import { VueAxePopup } from 'vue-axe';
</script>

<template>
  <DevOnly>
    <ClientOnly>
      <VueAxePopup />
    </ClientOnly>
  </DevOnly>
</template>

<style>
.va-btn {
  display: grid !important;
  place-content: center !important;
}

.va-popup-btn {
  box-shadow: 2px 2px 3px 2px var(--color-grey-bg) !important;
}
</style>
