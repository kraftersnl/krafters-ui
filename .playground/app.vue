<script setup lang="ts">
const route = useRoute();
const appRef = useTemplateRef('app');

watch(
  () => route.path,
  () => {
    appRef.value?.focus();
  },
);

useHead({ titleTemplate: '%s | Krafters UI' });
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

h1 {
  margin-block-start: 0;
  color: var(--color-accent);
}

.demo-page {
  padding-block-end: 5rem;

  .section-topbar {
    flex-wrap: nowrap;
  }

  ul > li > ul {
    margin-block: 0.25rem;
  }

  blockquote {
    p {
      font-style: normal;
    }
  }

  .card-cols {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;

    > * {
      flex-grow: 1;
      flex-basis: calc(50% - var(--gap));
    }
  }

  .c-grey-text {
    .button {
      color: var(--color-text);

      &:hover {
        color: var(--color-accent);
      }
    }
  }

  .a11y-list {
    > li {
      margin-bottom: 0.125rem;

      &::marker {
        color: var(--color-accent);
      }
    }
  }

  kbd {
    font-size: 0.8em;
  }

  .card {
    margin-block-end: 1.5rem;
  }

  p {
    max-width: 78ch;

    a {
      &:hover {
        color: var(--color-accent);
      }
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
