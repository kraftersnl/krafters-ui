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
        <MenuList :list="navList" button-size="md" button-variant="sidebar" />
      </aside>

      <main id="main">
        <NuxtPage />
      </main>

      <!-- <CookiesDialog
        description="This cookies dialog is for demo purposes only."
      /> -->
    </div>
  </div>

  <AxePopup />

  <ClientOnly>
    <ToastManager />
  </ClientOnly>
</template>

<style>
:root {
  --font-family: 'Atkinson Hyperlegible', sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 400;
  --font-weight-bold: 600;
  --line-height: 1.5;
  --line-height-heading: 1.2;

  /* Layout design tokens */
  --app-max-width: 1280px;
  --app-header-height: 4rem;
  --app-padding-block: 2.5rem;
  --app-padding-inline: 0.75rem;

  @media (min-width: 480px) {
    --app-padding-inline: 1.5rem;
  }
}

main {
  container-type: inline-size;
  scroll-margin-block: var(--app-header-height);
}

.section-topbar {
  align-items: center;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-heading);
}

h2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.app-focus-wrapper {
  outline: 1px solid transparent;
}

.app-layout {
  padding-inline: var(--app-padding-inline);
  padding-block: var(--app-padding-block);
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

  @media (min-width: 1024px) {
    display: block;
  }
}

h1 {
  margin-block-start: 0;
  font-weight: var(--font-weight-bold);
}

.demo-page {
  padding-block-end: 5rem;

  .section-topbar {
    flex-wrap: nowrap;

    &:has(h1) {
      margin-block-end: 1.5rem;
    }
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
    --gap: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;

    > * {
      flex-grow: 1;
      flex-basis: calc(50% - var(--gap));
      min-width: 240px;
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
      margin-block-end: 0.125rem;

      &::marker {
        color: var(--color-accent);
      }
    }
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
      font-size: var(--font-size-md);
      margin-block-start: 0;
      margin-block-end: 0.5rem;
    }

    :has(+ h2) {
      margin-block-end: 1.5rem;
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
