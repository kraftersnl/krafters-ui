<script setup lang="ts">
const navList = [
  {
    id: 'home',
    to: '/',
    label: 'Home',
  },
  {
    id: 'test',
    to: '/test',
    label: 'Page',
  },
];

const route = useRoute();
const mobileMenu = useTemplateRef('mobileMenu');

watch(
  () => route.path,
  () => {
    if (mobileMenu.value?.isVisible) {
      mobileMenu.value?.closeDialog();
    }
  },
);
</script>

<template>
  <header class="app-header">
    <div class="app-header-content">
      <MobileMenu
        ref="mobileMenu"
        position="inline-start"
        :nav-list="navList"
      />

      <div class="logo">Krafters UI</div>

      <MobileMenu position="inline-end" icon="menu-alt-3">
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
