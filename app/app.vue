<script setup lang="ts">
import AppHeader from './AppHeader.vue';

const head = useLocaleHead();
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang">
    <NuxtRouteAnnouncer />
    <SkipLink />

    <AppHeader />

    <div class="app-layout">
      <main>
        <h1 class="visuallyhidden">Playground</h1>

        <NuxtPage class="playground" />
      </main>
    </div>
  </Html>
</template>

<style>
.app-layout {
  padding: 2rem;
  max-width: var(--app-max-width);
}
</style>
