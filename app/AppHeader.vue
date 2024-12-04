<script setup lang="ts">
import AppHeaderMenu from './AppHeaderMenu.vue';
</script>

<template>
  <header class="app-header">
    <div class="app-header-content">
      <MobileMenu position="inline-start" />

      <nav>
        <div class="logo">Krafters UI</div>

        <ul role="list">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/test">Page</NuxtLink>
          </li>
        </ul>
      </nav>

      <MobileMenu position="inline-end" icon="menu-alt-3">
        <div class="menu-content">
          <ThemeSelect class="cat-theme" />
          <hr />

          <LanguageSelect class="cat-lang" />
          <hr />
        </div>
      </MobileMenu>

      <!-- <AppHeaderMenu /> -->
    </div>

    <NuxtLoadingIndicator color="var(--color-accent)" />
  </header>
</template>

<style>
.app-header {
  position: relative;
  border-block-end: 1px solid var(--color-accent-bg);
  background-color: var(--color-white);
  /* padding-inline-end: 3rem; */

  @media (min-width: 360px) {
    position: sticky;
    z-index: 2;
    top: 0;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

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
  justify-content: space-between;
  padding-inline: var(--app-padding-inline);
  max-width: var(--app-max-width);
  min-height: 3.5rem;
  width: 100%;
  height: 100%;

  .logo {
    font-size: var(--font-size-xs);
    color: var(--color-accent-text);
    margin-inline-end: 3rem;
  }
}
</style>
