<script setup lang="ts">
import AppHeader from './AppHeader.vue';
</script>

<template>
  <AppHeader />

  <div class="app-layout">
    <main>
      <h1 class="visuallyhidden">Playground</h1>

      <NuxtPage class="playground" />
    </main>
  </div>
</template>

<style>
:root {
  --app-padding-inline: 2rem;
}

.app-layout {
  padding: 2rem;
}
</style>
