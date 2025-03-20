<script setup lang="ts">
const route = useRoute();
const appRef = useTemplateRef('app');

watch(
  () => route.path,
  () => {
    appRef.value?.focus();
  },
);
</script>

<template>
  <div ref="app" tabindex="-1" class="app-focus-wrapper">
    <NuxtRouteAnnouncer />

    <SkipLink />

    <AppHeader />

    <div class="app-layout">
      <aside class="app-sidebar">
        <MenuList :list="navList" button-size="sm" button-variant="sidebar" />
      </aside>

      <main id="main">
        <NuxtPage />
      </main>
    </div>
  </div>

  <AxePopup />
</template>

<style>
:root {
  --app-max-width: 1280px;
}

.app-focus-wrapper {
  outline: 1px solid transparent;
}

.app-layout {
  padding: 2rem;
  max-width: var(--app-max-width);
  margin-inline: auto;
  min-height: calc(100dvh - 3.5rem - 1px);

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
  }
}

.app-sidebar {
  display: none;

  hr {
    max-width: 180px;
  }

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
  h1 {
    color: var(--color-accent);
  }
  h2 {
    color: var(--color-text);
  }
  h3 {
    color: var(--color-accent-text);
  }

  code,
  kbd {
    font-size: 0.9em;
  }

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
}
</style>
