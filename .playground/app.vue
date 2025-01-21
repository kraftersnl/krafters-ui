<script setup lang="ts">
const route = useRoute();
const head = useLocaleHead();
const { navList } = useDemo();
const appRef = useTemplateRef('app');

watch(
  () => route.path,
  () => {
    appRef.value?.focus();
  },
);
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang">
    <div ref="app" tabindex="-1" class="app-focus-wrapper">
      <NuxtRouteAnnouncer />

      <SkipLink />

      <AppHeader />

      <div class="app-layout">
        <aside class="demo-sidebar">
          <MenuList :list="navList" button-size="lg" button-variant="sidebar" />
        </aside>

        <main id="main">
          <NuxtPage class="playground" />
        </main>
      </div>
    </div>
  </Html>
</template>

<style>
.app-focus-wrapper {
  outline: 1px solid transparent;
}

.app-layout {
  padding: 2rem;
  max-width: var(--app-max-width);
  margin-inline: auto;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
  }
}

.demo-sidebar {
  display: none;

  @media (min-width: 1024px) {
    display: block;

    nav {
      position: sticky;
      top: 6rem;
    }
    .button-variant--sidebar {
      padding-inline-start: 0.5rem;
    }
  }
}

.demo-page {
  .card {
    margin-block-end: 1rem;
  }

  h1 {
    margin-block-start: 0;
  }

  p a {
    &:hover {
      color: var(--color-accent);
    }
  }

  .popover-settings-content {
    padding: 1.5rem;

    h2 {
      margin-block-start: 0;
    }

    .props-wrapper {
      display: grid;
      gap: 1rem;
    }
  }

  .demo-divider {
    margin-block: 2rem;
  }

  .section-topbar {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }
}
</style>
