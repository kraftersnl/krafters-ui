<script setup lang="ts">
import AppHeaderMenu from './AppHeaderMenu.vue';
</script>

<template>
  <header class="app-header">
    <div class="app-header-content">
      <slot />

      <AppHeaderMenu />
    </div>

    <NuxtLoadingIndicator color="var(--color-accent)" />
  </header>
</template>

<style>
.app-header {
  position: relative;
  border-block-end: 1px solid var(--color-accent-bg);
  background-color: var(--color-white);

  @media (min-width: 360px) {
    position: sticky;
    z-index: 2;
    top: 0;
  }
}

.app-header-content {
  padding-inline: var(--app-padding-inline);
  max-width: var(--app-max-width);
  min-height: 3.5rem;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: nowrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
