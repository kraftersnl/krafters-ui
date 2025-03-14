<script setup lang="ts">
import { version } from '../../package.json';

const route = useRoute();
const mobileMenuRef = useTemplateRef('mobileMenu');

watch(
  () => route.path,
  () => {
    if (mobileMenuRef.value?.isVisible) {
      mobileMenuRef.value?.closeDialog();
    }
  },
);
</script>

<template>
  <header class="app-header">
    <div class="app-header-content">
      <MobileMenu ref="mobileMenu" class="left-menu" position="inline-start">
        <MenuList :list="navList" button-variant="sidebar" />
      </MobileMenu>

      <div class="logo">Krafters UI {{ version }}</div>

      <MobileMenu position="inline-end" icon="adjustments-vertical">
        <div class="menu-content">
          <ThemeSelect />
          <hr />
          <LanguageSelect />
          <hr />
        </div>
      </MobileMenu>
    </div>

    <NuxtLoadingIndicator color="var(--color-accent)" />
  </header>
</template>

<style>
@media (min-width: 1024px) {
  .app-header-content .mobile-menu-wrapper:first-child {
    display: none;
  }
}

.app-header {
  position: relative;
  border-block-end: 1px solid var(--color-accent-bg);
  background-color: rgb(var(--rgb-app-nav) / 75%);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);

  @media (min-width: 360px) and (min-height: 360px) {
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
      font-weight: var(--font-weight-medium);

      &.router-link-active {
        color: var(--color-accent);
        text-decoration: none;
      }
    }
  }
}

.app-header-content {
  max-width: var(--app-max-width);
  margin-inline: auto;
  padding-inline: 1.25rem;
  min-height: 3.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  .logo {
    font-size: var(--font-size-s);
    color: var(--color-accent-text);
  }
}

.language-select {
  padding: 1rem;
  width: 100%;

  .language-options-list {
    width: 100%;
  }
}

.theme-select {
  padding: 1rem;
  width: 100%;

  .theme-options-list {
    width: 100%;
  }
}
</style>
