<script setup lang="ts">
import AppHeader from './AppHeader.vue';
</script>

<template>
  <AppHeader>
    <nav>
      <ul role="list">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/test">Different page</NuxtLink>
        </li>
      </ul>
    </nav>
  </AppHeader>

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

.app-header {
  nav {
    ul {
      height: 100%;
      display: inline-flex;
      align-items: center;
      gap: 1rem;
    }

    a {
      &.router-link-active {
        color: var(--color-accent);
        text-decoration: none;
      }
    }
  }
}
</style>
