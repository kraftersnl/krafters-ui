<script setup lang="ts">
const menuContent = ref<HTMLElement>();
const menuTrigger = ref<HTMLElement>();

const showMenu = ref(false);

onMounted(() => window.addEventListener('click', handleWindowClick));
onUnmounted(() => window.removeEventListener('click', handleWindowClick));

function handleWindowClick(event: Event) {
  const target = event.target as HTMLElement;
  if (
    !menuContent.value?.contains(target) &&
    !menuTrigger.value?.contains(target)
  ) {
    showMenu.value = false;
  }
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function handleEscapeKey() {
  showMenu.value = false;
  menuTrigger.value?.focus();
}
</script>

<template>
  <div class="user-menu-wrapper">
    <button
      ref="menuTrigger"
      type="button"
      class="menu-trigger"
      aria-controls="user-menu"
      :aria-expanded="showMenu"
      :aria-label="$t('aria.user-menu')"
      @click="toggleMenu"
      @keydown.esc="handleEscapeKey"
    >
      <Icon name="heroicons-solid:user" />
    </button>

    <div
      v-show="showMenu"
      id="user-menu"
      ref="menuContent"
      class="user-menu"
      @keydown.esc="handleEscapeKey"
    >
      <div class="menu-content">
        <ThemeSelect class="cat-theme" />

        <hr />

        <LanguageSelect class="cat-lang" />
      </div>
    </div>
  </div>
</template>

<style>
.user-menu-wrapper {
  --user-menu-padding: 0.5rem;
  margin-inline-start: auto;
  position: absolute;
  right: 1rem;
  top: var(--user-menu-padding);
}

.menu-trigger {
  border: none;
  display: grid;
  place-content: center;
  color: var(--color-accent);
  background-color: var(--color-accent-bg);
  height: 2.5rem;
  width: 2.5rem;
  border-radius: var(--radius-full);
  text-transform: capitalize;

  .iconify {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.user-menu {
  z-index: 1;
  text-align: left;
  position: absolute;
  width: 300px;
  inset: auto;
  top: var(--user-menu-position-top, calc(100% + var(--user-menu-padding)));
  right: 0;
  border: 1px solid var(--color-accent-bg);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  background-color: var(--color-white);

  .menu-content {
    .user-info {
      padding-block: 1rem 0.75rem;
      padding-inline: 1rem;

      h2 {
        font-size: var(--font-size-xs);
      }

      span {
        color: var(--color-grey-text);
        font-size: var(--font-size-xs);
      }
    }
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
