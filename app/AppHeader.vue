<script setup lang="ts">
import AppHeaderMenu from './AppHeaderMenu.vue';
</script>

<template>
  <header class="app-header">
    <div class="app-header-content">
      <div class="logo">Krafters UI</div>

      <nav>
        <ul role="list">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/test">Page</NuxtLink>
          </li>
        </ul>
      </nav>

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

  nav {
    ul {
      height: 100%;
      display: inline-flex;
      align-items: center;
      gap: 1rem;
    }

    a {
      font-size: var(--font-size-sm);
      font-weight: 500;

      &.router-link-active {
        color: var(--color-accent);
        text-decoration: none;
      }
    }
  }
}

.app-header-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  padding-inline: var(--app-padding-inline);
  max-width: var(--app-max-width);
  min-height: 3.5rem;
  width: 100%;
  height: 100%;

  .logo {
    font-size: var(--font-size-xs);
    /* font-weight: 700; */
    color: var(--color-accent-text);
    margin-inline-end: 1.5rem;
  }
}
</style>
