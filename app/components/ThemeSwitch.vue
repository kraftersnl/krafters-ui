<script setup lang="ts">
const colorMode = useColorMode();

defineProps<{ fontSize?: FontSize }>();
</script>

<template>
  <ClientOnly>
    <button
      id="theme-toggle"
      type="button"
      class="theme-switch"
      :aria-pressed="colorMode.value === 'dark'"
      :style="[fontSize && `--font-size: var(--font-size-${fontSize})`]"
      @click.stop="
        colorMode.preference = colorMode.value == 'light' ? 'dark' : 'light'
      "
    >
      <Icon name="material-symbols:light-mode-outline-rounded" />
      <Icon name="material-symbols:dark-mode-outline-rounded" />

      <span class="visuallyhidden">{{ $t('theme.sr.dark') }}</span>
    </button>
  </ClientOnly>
</template>

<style>
.theme-switch {
  --color-shape: var(--color-grey-text);
  position: relative;
  background-color: transparent;
  gap: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid var(--color-grey-text);
  border-radius: var(--radius-lg);
  width: 4.5rem;
  height: 2.25rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition-property: color, background-color;
  transition-duration: var(--duration-sm);

  &::after {
    z-index: -1;
    content: '';
    position: absolute;
    left: -1px;
    z-index: 0;
    margin: auto;
    width: 2.25rem;
    height: 2.25rem;
    transform: translateX(0);
    border-radius: var(--radius-lg);
    background-color: var(--color-black);
    transition: transform var(--duration-sm);
  }

  .iconify {
    z-index: 1;
    color: var(--color-shape);
    font-size: var(--font-size, var(--font-size-md));
  }

  .iconify[class*='material-symbols:light-mode-outline-rounded'] {
    color: var(--color-white);
  }

  &:hover {
    border-color: var(--color-text);

    .iconify {
      filter: contrast(2);
    }
  }

  &:focus-visible {
    outline-color: var(--focus-color);
  }
}

.dark-mode {
  .theme-switch {
    &::after {
      transform: translateX(100%);
    }

    .iconify[class*='material-symbols:light-mode-outline-rounded'] {
      color: var(--color-black);
    }

    .iconify[class*='material-symbols:dark-mode-outline-rounded'] {
      color: var(--color-white);
    }
  }
}
</style>
